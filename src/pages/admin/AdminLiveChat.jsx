import { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { BACKEND_URL as BACKEND, API_URL } from '../../config';


export default function AdminLiveChat() {
  const [sessions,  setSessions]  = useState([]);
  const [active,    setActive]    = useState(null);
  const [messages,  setMessages]  = useState([]);
  const [input,     setInput]     = useState('');
  const [toasts,    setToasts]    = useState([]);
  const [search,    setSearch]    = useState('');
  const [connected, setConnected] = useState(false);
  const [loading,   setLoading]   = useState(true);
  const [onlineSet, setOnlineSet] = useState(new Set());

  const socketRef  = useRef(null);
  const bodyRef    = useRef(null);
  const activeRef  = useRef(null);   // Always updated synchronously in openSession
  const sentSet    = useRef(new Set()); // Track admin's own optimistic messages

  // ── Socket: ONE connection, never re-created ──────────────
  useEffect(() => {
    const socket = io(BACKEND, { transports: ['websocket'], reconnectionAttempts: 10 });
    socketRef.current = socket;

    // ── On connect: tell server this is an admin ──
    socket.on('connect', () => {
      setConnected(true);
      socket.emit('admin_join');
    });
    socket.on('disconnect', () => setConnected(false));

    // ── Full session list from server ──
    socket.on('all_sessions', (data) => {
      setSessions(data.map(s => ({
        ...s,
        unread: Number(s.unread_count || s.unread || 0),
      })));
      setLoading(false);
    });

    // ── Presence snapshot and real-time updates ──
    socket.on('online_sessions', (ids) => setOnlineSet(new Set(ids)));
    socket.on('user_presence', ({ sessionId, online }) => {
      setOnlineSet(prev => {
        const next = new Set(prev);
        online ? next.add(sessionId) : next.delete(sessionId);
        return next;
      });
    });

    // ── A new customer opened a chat ──
    socket.on('new_chat_session', (sess) => {
      setSessions(prev => {
        if (prev.some(s => s.session_id === sess.session_id)) return prev;
        return [{ ...sess, unread: 0 }, ...prev];
      });
      addToast(`🆕 New chat: ${sess.guest_name || 'Guest'}`, 'new');
    });

    // ── Customer sent a message (sidebar badge update) ──
    socket.on('user_message_alert', (msg) => {
      setSessions(prev => prev.map(s => {
        if (s.session_id !== msg.sessionId) return s;
        const isViewing = activeRef.current?.session_id === msg.sessionId;
        return {
          ...s,
          last_message: msg.message,
          unread: isViewing ? 0 : (s.unread || 0) + 1,
        };
      }));
      // Toast only when not currently viewing that session
      if (activeRef.current?.session_id !== msg.sessionId) {
        addToast(`💬 ${msg.message.slice(0, 55)}`, 'msg');
      }
    });

    // ── History loaded when admin opens a session ──
    // sessionId is included so we can safely ignore stale responses
    socket.on('admin_chat_history', ({ sessionId, messages: msgs }) => {
      if (activeRef.current?.session_id === sessionId) {
        setMessages(Array.isArray(msgs) ? msgs : []);
      }
    });

    // ── Real-time new message in any session ──
    socket.on('new_message', (msg) => {
      // Always update sidebar preview
      setSessions(prev => prev.map(s =>
        s.session_id === msg.sessionId
          ? { ...s, last_message: msg.message }
          : s
      ));

      // Only add to message view if this is the active session
      if (activeRef.current?.session_id !== msg.sessionId) return;

      if (msg.sender === 'admin') {
        // Skip server echo of our own optimistic message
        const key = msg.message + '||admin';
        if (sentSet.current.has(key)) {
          sentSet.current.delete(key);
          return;
        }
      }
      // Show customer message OR un-tracked admin message
      setMessages(prev => [...prev, msg]);
    });

    // ── Session closed by API call ──
    socket.on('chat_closed', () => {
      if (activeRef.current) {
        setSessions(prev => prev.map(s =>
          s.session_id === activeRef.current.session_id
            ? { ...s, status: 'closed' } : s
        ));
        setActive(prev => prev ? { ...prev, status: 'closed' } : null);
      }
    });

    // HTTP fallback — loads sessions in case socket all_sessions was empty
    fetch(`${BACKEND}/api/admin/chats`)
      .then(r => r.json())
      .then(data => {
        if (!Array.isArray(data)) return;
        setSessions(prev => {
          // Only override if socket gave us nothing
          if (prev.length > 0) return prev;
          return data.map(s => ({ ...s, unread: Number(s.unread_count || s.unread || 0) }));
        });
        setLoading(false);
      })
      .catch(() => setLoading(false));

    return () => { socket.disconnect(); };
  }, []);

  // Auto-scroll messages to bottom
  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [messages]);

  // ── Toast helper ──────────────────────────────────────────
  const addToast = (text, type = 'info') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, text, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 5000);
  };

  // ── Open a customer session ───────────────────────────────
  const openSession = (sess) => {
    sentSet.current = new Set();         // reset echo-tracking per session
    activeRef.current = sess;            // SYNC update before emit — prevents race condition
    setActive(sess);
    setMessages([]);                     // clear previous session's messages immediately
    setSessions(prev => prev.map(s =>
      s.session_id === sess.session_id ? { ...s, unread: 0 } : s
    ));
    socketRef.current.emit('admin_join_session', { sessionId: sess.session_id });
  };

  // ── Admin sends a reply ───────────────────────────────────
  const sendMsg = () => {
    const text = input.trim();
    const sess = activeRef.current;      // Use ref — state may be stale in closure
    if (!text || !sess || sess.status === 'closed') return;

    // Show message IMMEDIATELY (optimistic)
    const now = new Date();
    setMessages(prev => [...prev, {
      sender: 'admin', message: text,
      sent_at: now, sessionId: sess.session_id, _opt: true,
    }]);
    setSessions(prev => prev.map(s =>
      s.session_id === sess.session_id ? { ...s, last_message: text } : s
    ));
    sentSet.current.add(text + '||admin'); // mark so server echo is skipped
    setInput('');

    // Emit to server → saved to DB → broadcast to customer
    socketRef.current.emit('send_message', {
      sessionId: sess.session_id,
      message:   text,
      sender:    'admin',
    });
  };

  // ── Close / archive a session ─────────────────────────────
  const closeSession = async () => {
    if (!active) return;
    try {
      await fetch(`${BACKEND}/api/chat/${active.session_id}/close`, { method: 'PUT' });
      setSessions(prev => prev.map(s =>
        s.session_id === active.session_id ? { ...s, status: 'closed' } : s
      ));
      setActive(prev => prev ? { ...prev, status: 'closed' } : null);
      activeRef.current = activeRef.current
        ? { ...activeRef.current, status: 'closed' }
        : null;
      addToast('Session closed successfully.', 'ok');
    } catch {
      addToast('Failed to close session.', 'err');
    }
  };

  const filtered = sessions.filter(s =>
    `${s.guest_name} ${s.last_message}`.toLowerCase().includes(search.toLowerCase())
  );

  const STATUS_COLOR = { waiting: '#f59e0b', active: '#10b981', closed: '#94a3b8' };
  const TOAST_ICON   = { new: 'person_add', msg: 'chat_bubble', ok: 'check_circle', err: 'error', info: 'info' };
  const TOAST_COLOR  = { new: '#f59e0b', msg: '#38bdf8', ok: '#10b981', err: '#ef4444', info: '#64748b' };

  // ══════════════════════════════════════════════════════════
  //  RENDER
  // ══════════════════════════════════════════════════════════
  return (
    <div style={{
      display: 'flex', gap: 20, height: 720,
      fontFamily: "'Plus Jakarta Sans', sans-serif",
    }}>
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Round" rel="stylesheet" />
      <style>{`
        /* ── Sidebar ── */
        .alc-sb {
          width: 300px; flex-shrink: 0;
          background: #fff; border-radius: 24px;
          border: 1px solid #f1f5f9; display: flex;
          flex-direction: column; overflow: hidden;
          box-shadow: 0 4px 20px rgba(0,0,0,0.04);
        }
        .alc-sbh {
          padding: 20px 18px 14px;
          border-bottom: 1px solid #f1f5f9;
        }
        .alc-sbh-title {
          display: flex; align-items: center; gap: 10px;
          font-size: 0.95rem; font-weight: 800;
          color: #0f172a; margin-bottom: 12px;
        }
        .alc-dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: #cbd5e1; transition: 0.3s;
          flex-shrink: 0;
        }
        .alc-dot.live {
          background: #10b981;
          box-shadow: 0 0 0 3px rgba(16,185,129,0.15);
        }
        .alc-search {
          background: #f8fafc; border: 1px solid #f1f5f9;
          border-radius: 10px; padding: 8px 12px;
          display: flex; align-items: center; gap: 8px;
        }
        .alc-search input {
          flex: 1; border: none; background: transparent;
          outline: none; font-size: 0.82rem; font-family: inherit;
        }
        .alc-list {
          flex: 1; overflow-y: auto; padding: 10px;
        }
        .alc-list::-webkit-scrollbar { width: 3px; }
        .alc-list::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }

        .alc-card {
          padding: 13px 15px; border-radius: 14px; cursor: pointer;
          margin-bottom: 6px; border: 1.5px solid transparent;
          background: #fafafa; transition: all 0.18s;
        }
        .alc-card:hover { background: #f1f5f9; }
        .alc-card.active-card {
          background: #0f172a; border-color: #0f172a;
        }
        .alc-card.active-card .alc-card-name { color: #fff; }
        .alc-card.active-card .alc-card-prev { color: #64748b; }
        .alc-card-row { display: flex; justify-content: space-between; align-items: center; }
        .alc-card-name { font-size: 0.87rem; font-weight: 700; color: #1e293b; }
        .alc-card-prev {
          font-size: 0.72rem; color: #94a3b8;
          white-space: nowrap; overflow: hidden;
          text-overflow: ellipsis; max-width: 150px;
        }
        .alc-pres {
          font-size: 0.6rem; font-weight: 800; padding: 2px 7px;
          border-radius: 20px; white-space: nowrap; flex-shrink: 0;
        }
        .alc-unread {
          background: #ef4444; color: #fff;
          font-size: 0.6rem; font-weight: 800;
          padding: 1px 6px; border-radius: 20px;
        }
        .alc-loading {
          flex: 1; display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          gap: 10px; color: #94a3b8; font-size: 0.82rem;
        }

        /* ── Main panel ── */
        .alc-main {
          flex: 1; background: #fff; border-radius: 24px;
          border: 1px solid #f1f5f9; display: flex;
          flex-direction: column; overflow: hidden;
          box-shadow: 0 4px 20px rgba(0,0,0,0.04);
        }
        .alc-mhead {
          padding: 18px 24px; border-bottom: 1px solid #f1f5f9;
          display: flex; justify-content: space-between;
          align-items: center; flex-shrink: 0;
        }
        .alc-mname { font-size: 1rem; font-weight: 800; color: #0f172a; }
        .alc-mmeta { display: flex; gap: 8px; align-items: center; margin-top: 4px; }

        /* ── Message area ── */
        .alc-msgs {
          flex: 1; overflow-y: auto; padding: 20px 24px;
          background: #f8fafc; display: flex;
          flex-direction: column; gap: 10px;
        }
        .alc-msgs::-webkit-scrollbar { width: 3px; }
        .alc-msgs::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }

        /* Each message row */
        .alc-row { display: flex; flex-direction: column; }
        .alc-row.admin-row { align-items: flex-end; }
        .alc-row.user-row  { align-items: flex-start; }

        /* Bubble labels */
        .alc-label {
          font-size: 0.6rem; font-weight: 700;
          color: #94a3b8; margin-bottom: 3px;
          text-transform: uppercase; letter-spacing: 0.5px;
        }

        /* Bubble itself */
        .alc-bub {
          max-width: 70%; padding: 11px 16px;
          font-size: 0.88rem; line-height: 1.58;
          border-radius: 18px; word-break: break-word;
          animation: bIn 0.2s ease;
        }
        @keyframes bIn { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:none} }
        .alc-bub.admin-bub {
          background: #0f172a; color: #fff;
          border-bottom-right-radius: 4px;
        }
        .alc-bub.user-bub {
          background: #fff; color: #1e293b;
          border: 1px solid #e2e8f0;
          border-bottom-left-radius: 4px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.03);
        }
        .alc-time {
          font-size: 0.6rem; color: #94a3b8; margin-top: 4px;
        }

        /* Empty state */
        .alc-empty {
          flex: 1; display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          gap: 10px; color: #94a3b8;
        }
        .alc-empty .material-icons-round { font-size: 3.5rem; color: #e2e8f0; }

        /* Input bar */
        .alc-ibar {
          padding: 14px 20px; border-top: 1px solid #f1f5f9;
          display: flex; gap: 12px; align-items: center;
          background: #fff; flex-shrink: 0;
        }
        .alc-input {
          flex: 1; padding: 12px 18px;
          border: 1.5px solid #f1f5f9; border-radius: 14px;
          font-size: 0.87rem; outline: none;
          background: #f8fafc; font-family: inherit;
          transition: 0.2s;
        }
        .alc-input:focus {
          border-color: #0f172a; background: #fff;
          box-shadow: 0 0 0 3px rgba(15,23,42,0.06);
        }
        .alc-sendbtn {
          width: 44px; height: 44px; border-radius: 12px;
          background: #0f172a; color: #fff; border: none;
          cursor: pointer; display: flex; align-items: center;
          justify-content: center; transition: 0.2s; flex-shrink: 0;
        }
        .alc-sendbtn:hover { transform: scale(1.07); background: #1e293b; }
        .alc-closebtn {
          padding: 8px 16px; border-radius: 10px;
          background: #fff1f2; color: #e11d48;
          border: none; font-size: 0.73rem; font-weight: 800;
          cursor: pointer; transition: 0.2s; white-space: nowrap;
        }
        .alc-closebtn:hover { background: #ffe4e6; }

        /* Toasts */
        .alc-toasts {
          position: fixed; top: 20px; right: 20px;
          z-index: 99999; display: flex; flex-direction: column; gap: 8px;
          pointer-events: none;
        }
        .alc-toast {
          background: #0f172a; color: #fff;
          padding: 12px 18px; border-radius: 14px;
          font-size: 0.82rem; font-weight: 600;
          display: flex; align-items: center; gap: 12px;
          min-width: 260px; max-width: 360px;
          box-shadow: 0 8px 30px rgba(0,0,0,0.2);
          animation: tIn 0.35s cubic-bezier(0.34,1.56,0.64,1);
          border-left: 4px solid #38bdf8;
        }
        @keyframes tIn { from{transform:translateX(110%);opacity:0} to{transform:none;opacity:1} }
      `}</style>

      {/* ── Toast Notifications ── */}
      <div className="alc-toasts">
        {toasts.map(t => (
          <div className="alc-toast" key={t.id} style={{borderLeftColor: TOAST_COLOR[t.type]}}>
            <span className="material-icons-round" style={{fontSize:'1.1rem', color: TOAST_COLOR[t.type]}}>
              {TOAST_ICON[t.type]}
            </span>
            <span style={{overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'}}>
              {t.text}
            </span>
          </div>
        ))}
      </div>

      {/* ══════════════════ SIDEBAR ══════════════════ */}
      <div className="alc-sb">
        <div className="alc-sbh">
          <div className="alc-sbh-title">
            <div className={`alc-dot ${connected ? 'live' : ''}`} />
            Live Support
          </div>
          <div className="alc-search">
            <span className="material-icons-round" style={{fontSize:'1rem', color:'#94a3b8'}}>search</span>
            <input
              placeholder="Search customer…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="alc-list">
          {loading ? (
            <div className="alc-loading">
              <span className="material-icons-round" style={{color:'#e2e8f0', fontSize:'2.5rem'}}>hourglass_empty</span>
              Loading sessions…
            </div>
          ) : filtered.length === 0 ? (
            <div className="alc-loading">
              <span className="material-icons-round" style={{color:'#e2e8f0', fontSize:'2.5rem'}}>inbox</span>
              No active sessions
            </div>
          ) : filtered.map(s => {
            const online = onlineSet.has(s.session_id);
            const isSel  = active?.session_id === s.session_id;
            return (
              <div
                key={s.session_id}
                className={`alc-card ${isSel ? 'active-card' : ''}`}
                onClick={() => openSession(s)}
              >
                <div className="alc-card-row" style={{marginBottom: 4}}>
                  <div style={{display:'flex', flexDirection:'column', gap:2}}>
                    <span className="alc-card-name">{s.guest_name || 'Guest'}</span>
                    {s.user_email && (
                      <span style={{fontSize:'0.65rem', color: isSel ? '#64748b' : '#94a3b8'}}>{s.user_email}</span>
                    )}
                  </div>
                  <span className="alc-pres" style={{
                    background: online ? 'rgba(16,185,129,0.12)' : 'rgba(148,163,184,0.1)',
                    color: online ? '#10b981' : '#94a3b8',
                  }}>
                    {online ? '● Active' : '○ Away'}
                  </span>
                </div>
                <div className="alc-card-row">
                  <span className="alc-card-prev">{s.last_message || 'No messages yet…'}</span>
                  <div style={{display:'flex', alignItems:'center', gap:4}}>
                    <span style={{
                      fontSize:'0.55rem', padding:'1px 5px', borderRadius:4, fontWeight:700,
                      background: s.user_id ? '#eff6ff' : '#f8fafc',
                      color: s.user_id ? '#3b82f6' : '#94a3b8',
                    }}>
                      {s.user_id ? 'REG' : 'GUEST'}
                    </span>
                    {s.unread > 0 && <span className="alc-unread">{s.unread}</span>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ══════════════════ MAIN PANEL ══════════════════ */}
      <div className="alc-main">
        {!active ? (
          <div className="alc-empty">
            <span className="material-icons-round">support_agent</span>
            <strong style={{color:'#1e293b', fontSize:'0.95rem'}}>Select a Conversation</strong>
            <span style={{fontSize:'0.82rem'}}>Customer messages will appear here</span>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="alc-mhead">
              <div>
                <div className="alc-mname">{active.guest_name || 'Guest'}</div>
                {active.user_email && (
                  <div style={{fontSize:'0.72rem', color:'#64748b', marginTop:2}}>{active.user_email}</div>
                )}
                <div className="alc-mmeta">
                  <span style={{
                    fontSize:'0.58rem', fontWeight:700, padding:'2px 6px',
                    borderRadius:4,
                    background: active.user_id ? '#eff6ff' : '#f8fafc',
                    color: active.user_id ? '#3b82f6' : '#64748b',
                  }}>
                    {active.user_id ? '👤 Registered User' : '👥 Guest'}
                  </span>
                  <span className="alc-pres" style={{
                    background: onlineSet.has(active.session_id) ? 'rgba(16,185,129,0.12)' : 'rgba(148,163,184,0.1)',
                    color: onlineSet.has(active.session_id) ? '#10b981' : '#94a3b8',
                  }}>
                    {onlineSet.has(active.session_id) ? '● Active on site' : '○ Offline'}
                  </span>
                  <span style={{fontSize:'0.65rem', fontWeight:700, color: STATUS_COLOR[active.status]}}>
                    {active.status?.toUpperCase()}
                  </span>
                </div>
              </div>
              {active.status !== 'closed' && (
                <button className="alc-closebtn" onClick={closeSession}>End Chat</button>
              )}
            </div>

            {/* Messages */}
            <div className="alc-msgs" ref={bodyRef}>
              {messages.length === 0 ? (
                <div className="alc-empty">
                  <span className="material-icons-round">chat_bubble_outline</span>
                  <span style={{fontSize:'0.82rem'}}>No messages yet in this session</span>
                </div>
              ) : (
                messages.map((m, i) => {
                  const isAdmin = m.sender === 'admin';
                  return (
                    <div key={i} className={`alc-row ${isAdmin ? 'admin-row' : 'user-row'}`}>
                      <div className="alc-label">{isAdmin ? 'You' : (active.guest_name || 'Customer')}</div>
                      <div className={`alc-bub ${isAdmin ? 'admin-bub' : 'user-bub'}`}>
                        {m.message}
                      </div>
                      <div className="alc-time">
                        {m.sent_at
                          ? new Date(m.sent_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                          : ''}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Input */}
            {active.status !== 'closed' ? (
              <div className="alc-ibar">
                <input
                  className="alc-input"
                  placeholder={`Reply to ${active.guest_name || 'customer'}…`}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMsg()}
                  autoFocus
                />
                <button className="alc-sendbtn" onClick={sendMsg}>
                  <span className="material-icons-round">send</span>
                </button>
              </div>
            ) : (
              <div style={{
                padding: '14px', textAlign: 'center',
                fontSize: '0.76rem', color: '#94a3b8',
                borderTop: '1px solid #f1f5f9',
              }}>
                Session archived — read only
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
