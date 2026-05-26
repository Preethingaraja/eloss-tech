import { useState, useEffect, useRef } from 'react';
import { API_URL as API } from '../../config';

function ProgressBar({ value, max, color }) {
  const pct = max ? Math.round((value / max) * 100) : 0;
  return (
    <div style={{ background: '#f1f5f9', borderRadius: 8, height: 8, overflow: 'hidden', flex: 1 }}>
      <div style={{ width: `${pct}%`, height: '100%', background: color, borderRadius: 8, transition: 'width 1s cubic-bezier(0.4, 0, 0.2, 1)' }} />
    </div>
  );
}

export default function AdminLiveChart() {
  const [stats, setStats] = useState(null);
  const intervalRef = useRef(null);

  const fetchStats = async () => {
    try {
      const r = await fetch(`${API}/admin/stats`);
      const d = await r.json();
      setStats(d);
    } catch {}
  };

  useEffect(() => {
    fetchStats();
    intervalRef.current = setInterval(fetchStats, 10000);
    return () => clearInterval(intervalRef.current);
  }, []);

  if (!stats) return <div className="loading-state">Syncing with server...</div>;

  const signupDays = stats.signupsChart || [];
  const maxSignup  = Math.max(...signupDays.map(d => d.count), 1);

  const kpis = [
    { label: 'Total Members',   value: stats.totalUsers,       icon: 'group',          color: '#3b82f6', bg: '#eff6ff' },
    { label: 'Active Support',  value: stats.activeChats,      icon: 'support_agent',  color: '#8b5cf6', bg: '#f5f3ff' },
  ];

  return (
    <div className="dash-view">
      <style>{`
        .dash-view { animation: fadeIn 0.5s ease; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

        .kpi-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; margin-bottom: 2.5rem; }
        .kpi-card { 
          background: #fff; padding: 1.5rem; border-radius: 20px; 
          border: 1px solid #f1f5f9; transition: 0.3s;
          display: flex; align-items: center; gap: 1.2rem;
        }
        .kpi-card:hover { transform: translateY(-5px); box-shadow: 0 10px 25px -5px rgba(0,0,0,0.05); }
        .kpi-icon-box { 
          width: 50px; height: 50px; border-radius: 14px; 
          display: flex; align-items: center; justify-content: center; 
        }
        .kpi-icon-box .material-icons-round { font-size: 1.5rem; }
        .kpi-info h3 { font-size: 1.5rem; font-weight: 800; color: #1e293b; line-height: 1.2; }
        .kpi-info p { font-size: 0.7rem; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px; }

        .charts-main { display: grid; grid-template-columns: 1.5fr 1fr; gap: 1.5rem; }
        .chart-box { 
          background: #fff; padding: 1.8rem; border-radius: 24px; 
          border: 1px solid #f1f5f9; 
        }
        .chart-box h4 { 
          font-size: 0.9rem; font-weight: 800; color: #1e293b; 
          margin-bottom: 2rem; display: flex; align-items: center; gap: 10px;
        }
        .chart-box h4 .dot { width: 8px; height: 8px; border-radius: 50%; background: #38bdf8; }

        /* Bar Chart */
        .bar-container { display: flex; align-items: flex-end; gap: 12px; height: 180px; padding-bottom: 1rem; }
        .bar-wrapper { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 8px; height: 100%; justify-content: flex-end; }
        .bar-fill { 
          width: 100%; border-radius: 8px 8px 4px 4px; 
          transition: height 1.2s cubic-bezier(0.34, 1.56, 0.64, 1); 
          position: relative;
        }
        .bar-wrapper:hover .bar-fill { filter: brightness(1.1); }
        .bar-tooltip { 
          position: absolute; top: -25px; left: 50%; transform: translateX(-50%);
          background: #1e293b; color: #fff; font-size: 0.65rem; font-weight: 700;
          padding: 2px 6px; border-radius: 4px; opacity: 0; transition: 0.2s;
        }
        .bar-wrapper:hover .bar-tooltip { opacity: 1; }
        .bar-label { font-size: 0.7rem; font-weight: 600; color: #94a3b8; }

        /* List Rows */
        .list-stack { display: flex; flex-direction: column; gap: 1.2rem; }
        .list-row { display: flex; align-items: center; gap: 15px; }
        .list-label { font-size: 0.8rem; font-weight: 600; color: #475569; width: 120px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .list-val { font-size: 0.8rem; font-weight: 800; color: #1e293b; min-width: 25px; text-align: right; }

        .device-card { display: flex; align-items: center; justify-content: space-between; padding: 0.8rem; background: #f8fafc; border-radius: 12px; margin-bottom: 0.8rem; }
        .device-info { display: flex; align-items: center; gap: 12px; }
        .device-info .material-icons-round { color: #64748b; }
        .device-name { font-size: 0.8rem; font-weight: 700; color: #334155; text-transform: capitalize; }
        .device-count { font-size: 0.85rem; font-weight: 800; color: #1e293b; }

        .loading-state { padding: 4rem; text-align: center; color: #94a3b8; font-weight: 600; }
        
        @media(max-width: 1200px) { .kpi-row { grid-template-columns: repeat(2, 1fr); } .charts-main { grid-template-columns: 1fr; } }
      `}</style>

      {/* KPI Cards */}
      <div className="kpi-row">
        {kpis.map(k => (
          <div className="kpi-card" key={k.label}>
            <div className="kpi-icon-box" style={{ background: k.bg, color: k.color }}>
              <span className="material-icons-round">{k.icon}</span>
            </div>
            <div className="kpi-info">
              <p>{k.label}</p>
              <h3>{k.value ?? 0}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="charts-main">
        {/* Growth Chart */}
        <div className="chart-box">
          <h4><div className="dot"></div> Platform Growth (Last 7 Days)</h4>
          <div className="bar-container">
            {signupDays.map((d, i) => {
              const h = Math.round((d.count / maxSignup) * 100);
              return (
                <div className="bar-wrapper" key={i}>
                  <div className="bar-fill" style={{ height: `${h || 5}%`, background: 'linear-gradient(to top, #3b82f6, #60a5fa)' }}>
                    <div className="bar-tooltip">{d.count}</div>
                  </div>
                  <span className="bar-label">{new Date(d.day).toLocaleDateString('en',{weekday:'short'})}</span>
                </div>
              );
            })}
          </div>
        </div>



      </div>
    </div>
  );
}
