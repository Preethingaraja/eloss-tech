import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLiveChart from './AdminLiveChart';
import AdminCustomers from './AdminCustomers';
import AdminLiveChat from './AdminLiveChat';
import logo from '../../assets/logo.png';

const NAV = [
  { key: 'chart',     label: 'Dashboard',         icon: 'dashboard' },
  { key: 'customers', label: 'Users & Behaviour', icon: 'people' },
  { key: 'chat',      label: 'Live Support',      icon: 'forum' },
];

export default function AdminDashboard() {
  const [tab, setTab] = useState('chart');
  const [admin, setAdmin] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const a = localStorage.getItem('eloss_admin');
    if (!a) { navigate('/admin'); return; }
    setAdmin(JSON.parse(a));
  }, [navigate]);

  const logout = () => { localStorage.removeItem('eloss_admin'); navigate('/admin'); };

  if (!admin) return null;

  return (
    <>
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Round" rel="stylesheet" />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
        
        :root {
          --adm-bg: #f8fafc;
          --sidebar-bg: #0f172a;
          --accent: #38bdf8;
          --text-main: #1e293b;
          --text-muted: #64748b;
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }
        
        /* Hide ALL scrollbars in admin dashboard */
        html, body { scrollbar-width: none; -ms-overflow-style: none; }
        html::-webkit-scrollbar, body::-webkit-scrollbar { display: none; }
        
        body { background: var(--adm-bg); color: var(--text-main); font-family: 'Plus Jakarta Sans', sans-serif; }

        .adm-layout { display: flex; min-height: 100vh; }

        /* Sidebar Overlay for Mobile */
        .sidebar-overlay { display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 90; }

        /* Sidebar */
        .adm-sidebar { 
          width: 280px; 
          background: var(--sidebar-bg); 
          color: #fff; 
          display: flex; 
          flex-direction: column; 
          position: fixed; 
          top: 0; left: 0; bottom: 0;
          z-index: 100;
          overflow: hidden;
          scrollbar-width: none;
          -ms-overflow-style: none;
          transition: transform 0.3s ease;
        }
        .adm-sidebar::-webkit-scrollbar { display: none !important; width: 0 !important; }
        
        .adm-sidebar-header { 
          padding: 2.5rem 2rem; 
          display: flex; 
          align-items: center; 
          gap: 12px;
        }
        .logo-box {
          width: 40px; height: 40px; 
          border-radius: 50%;
          object-fit: cover;
          background: #fff;
        }
        .adm-sidebar-header h2 { font-size: 1.1rem; font-weight: 700; letter-spacing: -0.5px; }

        .adm-nav { flex: 1; padding: 0.5rem 1.2rem; overflow-y: auto; scrollbar-width: none; }
        .adm-nav::-webkit-scrollbar { display: none; }
        .nav-label { 
          font-size: 0.65rem; color: #475569; 
          text-transform: uppercase; letter-spacing: 1.5px; 
          margin: 1.5rem 0 0.8rem 0.8rem; font-weight: 700; 
        }

        .adm-nav-item { 
          display: flex; align-items: center; gap: 12px; 
          padding: 0.8rem 1rem; margin-bottom: 4px;
          cursor: pointer; font-size: 0.85rem; font-weight: 500; 
          color: #94a3b8; transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1); 
          border-radius: 12px;
        }
        .adm-nav-item:hover { color: #fff; background: rgba(255,255,255,0.05); }
        .adm-nav-item.active { 
          color: #fff; 
          background: linear-gradient(135deg, rgba(56, 189, 248, 0.15) 0%, rgba(56, 189, 248, 0.05) 100%);
          box-shadow: inset 0 0 0 1px rgba(56, 189, 248, 0.2);
        }
        .adm-nav-item.active .nav-icon { color: var(--accent); }
        .nav-icon { font-size: 1.3rem; }

        .adm-sidebar-footer { 
          padding: 1.5rem; 
          border-top: 1px solid rgba(255,255,255,0.05); 
          background: rgba(0,0,0,0.2);
        }
        .adm-user-card { 
          display: flex; align-items: center; gap: 12px; 
          padding: 0.8rem; background: rgba(255,255,255,0.03); 
          border-radius: 12px; margin-bottom: 1rem;
        }
        .adm-avatar { 
          width: 38px; height: 38px; border-radius: 10px; 
          background: var(--accent); color: #fff; 
          display: flex; align-items: center; justify-content: center; 
          font-weight: 700; font-size: 1rem; 
        }
        .adm-user-info p { font-size: 0.85rem; font-weight: 600; }
        .adm-user-info span { font-size: 0.7rem; color: #64748b; display: block; }
        
        .btn-logout { 
          width: 100%; display: flex; align-items: center; justify-content: center; gap: 8px;
          background: transparent; border: 1px solid rgba(255,255,255,0.1); 
          color: #94a3b8; padding: 0.7rem; border-radius: 10px; 
          cursor: pointer; font-size: 0.75rem; font-weight: 600; 
          transition: 0.2s; 
        }
        .btn-logout:hover { background: #ef4444; color: #fff; border-color: #ef4444; }

        /* Main Content */
        .adm-main { 
          margin-left: 280px; 
          flex: 1; 
          display: flex; 
          flex-direction: column; 
          min-height: 100vh; 
          padding: 1.5rem;
        }

        .adm-top-header {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: 2rem; padding: 0.5rem;
        }
        .header-title h1 { font-size: 1.5rem; font-weight: 800; letter-spacing: -0.5px; }
        .header-title p { font-size: 0.85rem; color: var(--text-muted); margin-top: 2px; }

        .top-actions { display: flex; align-items: center; gap: 1rem; }
        .live-status {
          display: flex; align-items: center; gap: 8px;
          background: #fff; padding: 0.5rem 1rem; border-radius: 12px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.05);
          font-size: 0.75rem; font-weight: 700; color: #10b981;
        }
        .pulse-ring { 
          width: 8px; height: 8px; background: #10b981; border-radius: 50%; 
          position: relative; 
        }
        .pulse-ring::after {
          content: ''; position: absolute; inset: -4px; 
          border: 2px solid #10b981; border-radius: 50%;
          animation: pulse 2s infinite;
        }
        @keyframes pulse { 0% { transform: scale(1); opacity: 1; } 100% { transform: scale(2.5); opacity: 0; } }

        .adm-card-container {
          background: #fff; border-radius: 24px; 
          box-shadow: 0 4px 6px -1px rgba(0,0,0,0.02), 0 10px 15px -3px rgba(0,0,0,0.03);
          border: 1px solid rgba(0,0,0,0.03);
          padding: 2rem; min-height: 500px;
        }

        @media(max-width: 1024px) {
          .adm-sidebar { width: 240px; transform: translateX(-100%); }
          .adm-sidebar.open { transform: translateX(0); }
          .adm-main { margin-left: 0; padding: 1rem; }
          .sidebar-overlay.open { display: block; }
        }
      `}</style>

      <div className="adm-layout">
        <div className={`sidebar-overlay ${false ? 'open' : ''}`}></div>
        
        {/* Sidebar */}
        <aside className="adm-sidebar">
          <div className="adm-sidebar-header">
            <img src={logo} alt="ELOSS Admin" className="logo-box" />
            <h2>ELOSS Admin</h2>
          </div>

          <div className="adm-nav">
            <p className="nav-label">Main Menu</p>
            {NAV.map(n => (
              <div key={n.key}
                className={`adm-nav-item${tab === n.key ? ' active' : ''}`}
                onClick={() => setTab(n.key)}>
                <span className="material-icons-round nav-icon">{n.icon}</span>
                {n.label}
              </div>
            ))}
          </div>

          <div className="adm-sidebar-footer">
            <div className="adm-user-card">
              <div className="adm-avatar">{admin.username?.[0]?.toUpperCase()}</div>
              <div className="adm-user-info">
                <p>{admin.username}</p>
                <span>System Administrator</span>
              </div>
            </div>
            <button className="btn-logout" onClick={logout}>
              <span className="material-icons-round" style={{fontSize:'1.1rem'}}>logout</span>
              Sign Out
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="adm-main">
          <header className="adm-top-header">
            <div className="header-title">
              <h1>{NAV.find(n => n.key === tab)?.label}</h1>
              <p>Welcome back, here's what's happening today.</p>
            </div>
            <div className="top-actions">
              <div className="live-status">
                <div className="pulse-ring"></div>
                SYSTEM LIVE
              </div>
            </div>
          </header>

          <div className="adm-card-container">
            {tab === 'chart'     && <AdminLiveChart />}
            {tab === 'customers' && <AdminCustomers />}
            {tab === 'chat'      && <AdminLiveChat />}
          </div>
        </main>
      </div>
    </>
  );
}
