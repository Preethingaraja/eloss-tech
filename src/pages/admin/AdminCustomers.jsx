import { useState, useEffect, useRef } from 'react';
import { API_URL as API } from '../../config';

export default function AdminCustomers() {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch]       = useState('');
  const [dropdown, setDropdown]   = useState(null); // customer id with open menu
  const dropRef = useRef(null);

  const load = () =>
    fetch(`${API}/admin/customers`)
      .then(r => r.json()).then(setCustomers).catch(() => {});

  useEffect(() => { load(); }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) setDropdown(null);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const filtered = customers.filter(c =>
    c.name?.toLowerCase().includes(search.toLowerCase()) ||
    c.email?.toLowerCase().includes(search.toLowerCase())
  );

  // ── Actions ──────────────────────────────────────────────
  const blockUser = async (c) => {
    if (!window.confirm(`Block "${c.name}"? They will be unable to login.`)) return;
    await fetch(`${API}/admin/users/${c.id}/block`, { method: 'PUT' });
    setCustomers(prev => prev.map(u => u.id === c.id ? { ...u, status: 'blocked' } : u));
    setDropdown(null);
  };

  const revokeUser = async (c) => {
    if (!window.confirm(`Revoke block for "${c.name}"? They will be able to login again.`)) return;
    await fetch(`${API}/admin/users/${c.id}/revoke`, { method: 'PUT' });
    setCustomers(prev => prev.map(u => u.id === c.id ? { ...u, status: 'active' } : u));
    setDropdown(null);
  };

  const deleteUser = async (c) => {
    if (!window.confirm(`Permanently DELETE "${c.name}"? This removes ALL their data including messages and enrollments. This CANNOT be undone.`)) return;
    await fetch(`${API}/admin/users/${c.id}`, { method: 'DELETE' });
    setCustomers(prev => prev.filter(u => u.id !== c.id));
    setDropdown(null);
  };

  return (
    <div>
      <style>{`
        .cust-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:2rem; }
        .search-box { position:relative; width:320px; }
        .search-box input { width:100%; padding:0.75rem 1rem 0.75rem 2.5rem; border:1px solid #e2e8f0; border-radius:12px; font-size:0.85rem; outline:none; transition:0.2s; background:#f8fafc; }
        .search-box input:focus { border-color:#38bdf8; background:#fff; box-shadow:0 0 0 4px rgba(56,189,248,0.1); }
        .search-box .material-icons-round { position:absolute; left:0.8rem; top:50%; transform:translateY(-50%); color:#94a3b8; font-size:1.2rem; }

        .table-wrap { width:100%; overflow-x:auto; border-radius:16px; border:1px solid #e2e8f0; }
        .cust-table { width:100%; border-collapse:collapse; background:#fff; }
        .cust-table th { background:#f8fafc; padding:1rem; text-align:left; font-size:0.7rem; text-transform:uppercase; letter-spacing:1px; font-weight:700; color:#64748b; border-bottom:1px solid #e2e8f0; }
        .cust-table td { padding:1rem; border-bottom:1px solid #f1f5f9; font-size:0.85rem; color:#334155; vertical-align:middle; }
        .cust-table tr:last-child td { border-bottom:none; }
        .cust-table tr:hover td { background:#f8fafc; }

        .user-cell { display:flex; align-items:center; gap:12px; }
        .user-avatar { width:36px; height:36px; border-radius:10px; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:0.9rem; flex-shrink:0; }
        .user-info .name { display:block; font-weight:700; color:#1e293b; margin-bottom:2px; }
        .user-info .email { font-size:0.75rem; color:#64748b; }

        .stat-badge { display:inline-flex; align-items:center; gap:5px; padding:0.3rem 0.8rem; border-radius:8px; font-size:0.75rem; font-weight:700; }
        .badge-enroll { background:#f0fdf4; color:#166534; }
        .badge-msg { background:#eff6ff; color:#1e40af; }
        .date-cell { font-size:0.8rem; color:#64748b; }

        /* Status badge */
        .status-pill { 
          display:inline-flex; align-items:center; gap:5px;
          padding:0.25rem 0.75rem; border-radius:20px;
          font-size:0.7rem; font-weight:800; text-transform:uppercase; letter-spacing:0.5px;
        }
        .status-pill.active { background:#f0fdf4; color:#16a34a; }
        .status-pill.blocked { background:#fef2f2; color:#dc2626; }

        /* Action dropdown */
        .action-wrap { position:relative; }
        .action-trigger {
          width:34px; height:34px; border-radius:10px; border:1px solid #e2e8f0;
          background:#fff; cursor:pointer; display:flex; align-items:center;
          justify-content:center; transition:0.2s; color:#64748b;
        }
        .action-trigger:hover { background:#f1f5f9; border-color:#cbd5e1; color:#1e293b; }
        .action-trigger.open { background:#0f172a; border-color:#0f172a; color:#fff; }

        .action-menu {
          position:absolute; right:0; top:calc(100% + 6px); z-index:999;
          background:#fff; border:1px solid #e2e8f0; border-radius:14px;
          box-shadow:0 10px 30px rgba(0,0,0,0.12); min-width:160px; overflow:hidden;
          animation:menuIn 0.15s ease;
        }
        @keyframes menuIn { from{opacity:0;transform:scale(0.95) translateY(-4px)} to{opacity:1;transform:none} }

        .action-item {
          display:flex; align-items:center; gap:10px;
          padding:11px 16px; cursor:pointer; font-size:0.82rem; font-weight:600;
          transition:0.15s; color:#334155;
        }
        .action-item:hover { background:#f8fafc; }
        .action-item .material-icons-round { font-size:1.05rem; }
        .action-item.block { color:#d97706; }
        .action-item.block:hover { background:#fffbeb; }
        .action-item.revoke { color:#16a34a; }
        .action-item.revoke:hover { background:#f0fdf4; }
        .action-item.delete { color:#dc2626; }
        .action-item.delete:hover { background:#fef2f2; }
        .action-divider { height:1px; background:#f1f5f9; margin:4px 0; }

        .empty-state { text-align:center; padding:4rem 2rem; }
        .empty-state p { color:#94a3b8; font-size:0.9rem; }
      `}</style>

      <div className="cust-header">
        <div className="search-box">
          <span className="material-icons-round">search</span>
          <input
            placeholder="Search users by name or email…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <span style={{fontSize:'0.8rem', color:'#94a3b8', fontWeight:600}}>
          {filtered.length} user{filtered.length !== 1 ? 's' : ''}
        </span>
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state"><p>No customers found.</p></div>
      ) : (
        <div className="table-wrap" ref={dropRef}>
          <table className="cust-table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Phone</th>
                <th>Messages</th>
                <th>Status</th>
                <th>Joined</th>
                <th>Last Login</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(c => {
                const isBlocked = c.status === 'blocked';
                const avatarBg  = isBlocked ? '#fef2f2' : '#eff6ff';
                const avatarClr = isBlocked ? '#dc2626' : '#3b82f6';
                return (
                  <tr key={c.id}>
                    {/* Customer */}
                    <td>
                      <div className="user-cell">
                        <div className="user-avatar" style={{background:avatarBg, color:avatarClr}}>
                          {c.name?.[0]?.toUpperCase() || 'U'}
                        </div>
                        <div className="user-info">
                          <span className="name">{c.name}</span>
                          <span className="email">{c.email}</span>
                        </div>
                      </div>
                    </td>

                    {/* Phone */}
                    <td>{c.phone || '—'}</td>

                    {/* Messages */}
                    <td>
                      <span className="stat-badge badge-msg">
                        <span className="material-icons-round" style={{fontSize:'1rem'}}>forum</span>
                        {c.messages}
                      </span>
                    </td>

                    {/* Status */}
                    <td>
                      <span className={`status-pill ${isBlocked ? 'blocked' : 'active'}`}>
                        {isBlocked ? '🔒 Blocked' : '✓ Active'}
                      </span>
                    </td>

                    {/* Joined */}
                    <td className="date-cell">
                      {c.created_at
                        ? new Date(c.created_at).toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'})
                        : '—'}
                    </td>

                    {/* Last Login */}
                    <td className="date-cell">
                      {c.last_login
                        ? new Date(c.last_login).toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'})
                        : 'Never'}
                    </td>

                    {/* Actions */}
                    <td>
                      <div className="action-wrap">
                        <button
                          className={`action-trigger ${dropdown === c.id ? 'open' : ''}`}
                          onClick={() => setDropdown(dropdown === c.id ? null : c.id)}
                        >
                          <span className="material-icons-round" style={{fontSize:'1.1rem'}}>more_vert</span>
                        </button>

                        {dropdown === c.id && (
                          <div className="action-menu">
                            {/* Block — only if not already blocked */}
                            {!isBlocked && (
                              <div className="action-item block" onClick={() => blockUser(c)}>
                                <span className="material-icons-round">block</span>
                                Block User
                              </div>
                            )}

                            {/* Revoke — only if currently blocked */}
                            {isBlocked && (
                              <div className="action-item revoke" onClick={() => revokeUser(c)}>
                                <span className="material-icons-round">check_circle</span>
                                Revoke Block
                              </div>
                            )}

                            <div className="action-divider" />

                            {/* Delete — always available */}
                            <div className="action-item delete" onClick={() => deleteUser(c)}>
                              <span className="material-icons-round">delete_forever</span>
                              Delete User
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
