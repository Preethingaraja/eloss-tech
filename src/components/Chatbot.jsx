import { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

const BACKEND = `http://${window.location.hostname}:5000`;

export default function Chatbot() {
  const [open, setOpen]           = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [phase, setPhase]         = useState('init'); // 'init' | 'name' | 'chat'
  const [guestName, setGuestName] = useState('');
  const [messages, setMessages]   = useState([]);
  const [input, setInput]         = useState('');
  const [connected, setConnected] = useState(false);
  const [closed, setClosed]       = useState(false);

  const socketRef   = useRef(null);
  const sessionRef  = useRef(null); // Always in sync — avoids stale closure
  const bodyRef     = useRef(null);
  const sentSet     = useRef(new Set()); // Tracks locally-sent msg texts to prevent echo duplicates

  // Keep sessionRef in sync
  useEffect(() => { sessionRef.current = sessionId; }, [sessionId]);

  // Parse logged-in user once
  const user = (() => { try { return JSON.parse(localStorage.getItem('eloss_user')); } catch { return null; } })();

  // ── GUARD: If the saved session was created by a DIFFERENT user, clear it ──
  // This prevents Customer B from seeing Customer A's chat after switching accounts.
  useEffect(() => {
    const savedUid  = localStorage.getItem('eloss_chat_uid');   // user ID who owns the session
    const currentUid = user?.id ? String(user.id) : null;

    if (savedUid && currentUid && savedUid !== currentUid) {
      // Different user — wipe the old session completely
      localStorage.removeItem('eloss_chat_session');
      localStorage.removeItem('eloss_chat_name');
      localStorage.removeItem('eloss_chat_uid');
    }

    // Save current user's ID alongside the session so we can detect mismatches next time
    if (currentUid) {
      localStorage.setItem('eloss_chat_uid', currentUid);
    }
  }, []);
  // ── Socket setup ─────────────────────────────────────
  useEffect(() => {
    const socket = io(BACKEND, { transports: ['websocket'], reconnectionAttempts: 5 });
    socketRef.current = socket;

    socket.on('connect', () => {
      setConnected(true);
      const savedSid = localStorage.getItem('eloss_chat_session');

      if (savedSid) {
        // Resume existing session
        sessionRef.current = savedSid;
        setSessionId(savedSid);
        setPhase('chat');
        socket.emit('user_join', {
          sessionId: savedSid,
          guestName: user?.name || localStorage.getItem('eloss_chat_name') || 'Guest',
          userId: user?.id || null,
        });
      } else if (user) {
        // Logged-in user: auto-create session
        setPhase('chat');
        socket.emit('user_join', { sessionId: null, guestName: user.name, userId: user.id });
      } else {
        // Guest: show name form
        setPhase('name');
      }
    });

    socket.on('disconnect', () => setConnected(false));

    // Server created/resumed a session — save it with owner ID
    socket.on('session_created', ({ sessionId: sid }) => {
      sessionRef.current = sid;
      setSessionId(sid);
      localStorage.setItem('eloss_chat_session', sid);
      if (user?.id) localStorage.setItem('eloss_chat_uid', String(user.id));
    });

    // Full message history on join
    socket.on('chat_history', (msgs) => {
      setMessages(Array.isArray(msgs) ? msgs : []);
    });

    // Server broadcasts a new message to the room
    socket.on('new_message', (msg) => {
      if (msg.sender === 'user') {
        // This is our own message echoed back — skip if already shown optimistically
        const key = msg.message + '|' + msg.sender;
        if (sentSet.current.has(key)) {
          sentSet.current.delete(key);
          return; // Already shown, don't duplicate
        }
      }
      // Admin reply or un-tracked message — show it
      setMessages(prev => [...prev, msg]);
    });

    socket.on('chat_closed', () => {
      setClosed(true);
      setMessages(prev => [...prev, {
        sender: 'system', message: 'This chat session has been closed.',
        sent_at: new Date(),
      }]);
    });

    return () => socket.disconnect();
  }, []);

  // Auto-scroll to newest message
  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [messages]);

  // ── Guest: enter name and start session ──────────────
  const startGuestChat = () => {
    const name = guestName.trim();
    if (!name) return;
    localStorage.setItem('eloss_chat_name', name);
    setPhase('chat');
    socketRef.current.emit('user_join', { sessionId: null, guestName: name, userId: null });
  };

  // ── Send a message ────────────────────────────────────
  const sendMsg = () => {
    const text = input.trim();
    const sid  = sessionRef.current; // Always use the ref — state may be stale in closure
    if (!text || !sid || closed) return;

    // ── OPTIMISTIC UPDATE: show immediately, don't wait for server ──
    const optimistic = { sender: 'user', message: text, sent_at: new Date(), _local: true };
    setMessages(prev => [...prev, optimistic]);
    sentSet.current.add(text + '|user'); // Mark so server echo is ignored
    setInput('');

    // Send to server (saves to DB + broadcasts to room)
    socketRef.current.emit('send_message', { sessionId: sid, message: text, sender: 'user' });
  };

  const clearChat = () => {
    const sid = sessionRef.current;
    if (!sid || !window.confirm('Clear all chat history?')) return;
    socketRef.current.emit('clear_chat', { sessionId: sid });
    setMessages([]);
  };

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good Morning' : hour < 17 ? 'Good Afternoon' : hour < 21 ? 'Good Evening' : 'Good Night';
  const displayName = user?.name || guestName || 'there';

  // ── Render ────────────────────────────────────────────
  if (!user) return null;

  return (
    <>
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Round" rel="stylesheet" />
      <style>{`
        .cb-wrap { position:fixed; bottom:28px; right:28px; z-index:9999; font-family:'Plus Jakarta Sans',sans-serif; }
        .cb-fab {
          width:58px; height:58px; background:#ffffff; border-radius:18px; color:#0f172a;
          display:flex; align-items:center; justify-content:center; cursor:pointer;
          box-shadow:0 8px 28px rgba(0,0,0,0.15); border: 1px solid #e2e8f0; transition:0.3s; position:relative;
        }
        .cb-fab:hover { transform:translateY(-3px) scale(1.05); }
        .cb-fab-ring {
          position:absolute; inset:-6px; border-radius:24px;
          border:2px solid rgba(15,23,42,0.15); animation:cbRing 2s infinite;
        }
        @keyframes cbRing { to { transform:scale(1.6); opacity:0; } }
        .cb-box {
          position:absolute; bottom:72px; right:0; width:375px; height:580px;
          max-height:calc(100vh - 110px); background:#fff; border-radius:26px;
          box-shadow:0 24px 64px rgba(0,0,0,0.2); display:flex; flex-direction:column;
          overflow:hidden; border:1px solid #f1f5f9;
          animation:cbOpen 0.35s cubic-bezier(0.34,1.56,0.64,1);
        }
        @keyframes cbOpen { from{opacity:0;transform:scale(0.85) translateY(20px)} to{opacity:1;transform:none} }

        /* Header */
        .cb-head { background:#0f172a; color:#fff; padding:18px 22px; display:flex; justify-content:space-between; align-items:center; flex-shrink:0; }
        .cb-head-title { font-size:0.92rem; font-weight:800; }
        .cb-head-sub { font-size:0.63rem; font-weight:600; margin-top:2px; }
        .cb-head-sub.online { color:#10b981; }
        .cb-head-sub.offline { color:#94a3b8; }
        .cb-hbtn { background:rgba(255,255,255,0.1); border:none; color:#fff; width:30px; height:30px; border-radius:8px; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:0.2s; }
        .cb-hbtn:hover { background:rgba(255,255,255,0.2); }

        /* Name form */
        .cb-name-wrap { flex:1; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:16px; padding:28px; }
        .cb-name-wrap input { width:100%; padding:12px 16px; border:1.5px solid #e2e8f0; border-radius:12px; font-family:inherit; font-size:0.88rem; outline:none; text-align:center; transition:0.2s; }
        .cb-name-wrap input:focus { border-color:#0f172a; }
        .cb-start { width:100%; padding:12px; background:#0f172a; color:#fff; border:none; border-radius:12px; font-weight:800; font-size:0.88rem; cursor:pointer; transition:0.2s; }
        .cb-start:hover { background:#1e293b; }

        /* Messages */
        .cb-body { flex:1; overflow-y:auto; padding:18px; background:#f8fafc; display:flex; flex-direction:column; gap:10px; scrollbar-width:none; }
        .cb-body::-webkit-scrollbar { display:none; }
        .cb-greet { background:#fff; border-radius:16px; padding:14px 16px; border:1px solid #f1f5f9; font-size:0.82rem; }
        .cb-greet strong { display:block; font-size:0.95rem; font-weight:800; color:#0f172a; margin-bottom:3px; }
        .cb-greet span { color:#64748b; }

        .cb-bubble { max-width:82%; padding:10px 14px; font-size:0.85rem; line-height:1.55; border-radius:18px; word-break:break-word; }
        .cb-bubble.user  { align-self:flex-end; background:#0f172a; color:#fff; border-bottom-right-radius:4px; }
        .cb-bubble.admin { align-self:flex-start; background:#fff; color:#1e293b; border-bottom-left-radius:4px; border:1px solid #f1f5f9; box-shadow:0 2px 6px rgba(0,0,0,0.03); }
        .cb-bubble.system { align-self:center; background:#fef2f2; color:#ef4444; font-size:0.74rem; border-radius:10px; padding:6px 14px; }

        /* Input */
        .cb-foot { padding:14px; border-top:1px solid #f1f5f9; background:#fff; flex-shrink:0; }
        .cb-irow { display:flex; gap:10px; align-items:center; background:#f1f5f9; border-radius:14px; padding:6px 8px 6px 14px; }
        .cb-irow input { flex:1; border:none; background:transparent; outline:none; font-size:0.85rem; font-family:inherit; }
        .cb-isend { background:#0f172a; color:#fff; border:none; width:36px; height:36px; border-radius:10px; cursor:pointer; display:flex; align-items:center; justify-content:center; flex-shrink:0; transition:0.2s; }
        .cb-isend:hover { transform:scale(1.08); background:#1e293b; }

        @media(max-width:480px) { .cb-box { width:calc(100vw - 32px); right:-12px; } }
      `}</style>

      <div className="cb-wrap">
        {open && (
          <div className="cb-box">
            {/* Header */}
            <div className="cb-head">
              <div>
                <div className="cb-head-title">Support Concierge</div>
                <div className={`cb-head-sub ${connected ? 'online' : 'offline'}`}>
                  {connected ? '● Online — We reply quickly' : '○ Connecting…'}
                </div>
              </div>
              <div style={{display:'flex', gap:8}}>
                {phase === 'chat' && (
                  <button className="cb-hbtn" onClick={clearChat} title="Clear">
                    <span className="material-icons-round" style={{fontSize:'1rem'}}>delete_sweep</span>
                  </button>
                )}
                <button className="cb-hbtn" onClick={() => setOpen(false)}>
                  <span className="material-icons-round" style={{fontSize:'1rem'}}>close</span>
                </button>
              </div>
            </div>

            {/* Phase: name form for guests */}
            {phase === 'name' && (
              <div className="cb-name-wrap">
                <span className="material-icons-round" style={{fontSize:'3.5rem', color:'#e2e8f0'}}>account_circle</span>
                <p style={{fontSize:'0.85rem', color:'#64748b', textAlign:'center', margin:0}}>
                  How should we address you?
                </p>
                <input
                  placeholder="Your name…"
                  value={guestName}
                  onChange={e => setGuestName(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && startGuestChat()}
                  autoFocus
                />
                <button className="cb-start" onClick={startGuestChat}>Start Chat →</button>
              </div>
            )}

            {/* Phase: chat */}
            {phase === 'chat' && (
              <>
                <div className="cb-body" ref={bodyRef}>
                  <div className="cb-greet">
                    <strong>{greeting}, {displayName}! 👋</strong>
                    <span>Unlock your potential — we're here to help.</span>
                  </div>
                  {messages.length === 0 && (
                    <div className="cb-bubble admin">Hello! How can we help you today?</div>
                  )}
                  {messages.map((m, i) => (
                    <div key={i} className={`cb-bubble ${m.sender}`}>
                      {m.message}
                    </div>
                  ))}
                </div>

                <div className="cb-foot">
                  {!closed ? (
                    <div className="cb-irow">
                      <input
                        placeholder="Type your message…"
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && sendMsg()}
                        autoFocus
                      />
                      <button className="cb-isend" onClick={sendMsg}>
                        <span className="material-icons-round" style={{fontSize:'1.1rem'}}>send</span>
                      </button>
                    </div>
                  ) : (
                    <p style={{textAlign:'center', fontSize:'0.74rem', color:'#94a3b8', margin:0}}>
                      Session ended
                    </p>
                  )}
                </div>
              </>
            )}

            {/* Phase: init (connecting) */}
            {phase === 'init' && (
              <div style={{flex:1, display:'flex', alignItems:'center', justifyContent:'center', color:'#94a3b8', fontSize:'0.85rem'}}>
                Connecting…
              </div>
            )}
          </div>
        )}

        {/* FAB button */}
        <div className="cb-fab" onClick={() => setOpen(o => !o)}>
          <div className="cb-fab-ring"></div>
          <span className="material-icons-round" style={{fontSize:'1.7rem'}}>
            {open ? 'keyboard_arrow_down' : 'forum'}
          </span>
        </div>
      </div>
    </>
  );
}
