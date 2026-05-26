import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';

const API = `http://${window.location.hostname}:5000/api`;

export default function AdminLogin() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault(); setError(''); setLoading(true);
    try {
      const r = await fetch(`${API}/admin/login`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const d = await r.json();
      if (!r.ok) { setError(d.error || 'Invalid credentials'); setLoading(false); return; }
      localStorage.setItem('eloss_admin', JSON.stringify(d.admin));
      navigate('/admin/dashboard');
    } catch { setError('Cannot connect to server.'); }
    setLoading(false);
  };

  return (
    <>
      <style>{`
        .adm-login { min-height:100vh; display:flex; align-items:center; justify-content:center; background:linear-gradient(135deg,#0a0a0a 0%,#1a1a2e 100%); font-family:'DM Sans',sans-serif; }
        .adm-box { background:#fff; border-radius:20px; padding:3rem; width:90%; max-width:400px; box-shadow:0 40px 80px rgba(0,0,0,0.4); }
        .adm-box-top { margin-bottom:2rem; }
        .adm-logo { width:60px; height:60px; border-radius:50%; margin-bottom:1.5rem; border:2px solid #000; object-fit:cover; display:inline-block; }
        .adm-box h2 { font-size:1.8rem; font-weight:900; letter-spacing:-1px; }
        .adm-box p { color:#999; font-size:0.82rem; margin-top:0.3rem; }
        .adm-field { margin-bottom:1.2rem; }
        .adm-field label { display:block; font-size:0.68rem; font-weight:800; text-transform:uppercase; letter-spacing:1.5px; color:#666; margin-bottom:0.4rem; }
        .adm-field input { width:100%; padding:0.85rem 1rem; border:1.5px solid #eee; border-radius:10px; font-size:0.9rem; font-family:'DM Sans',sans-serif; outline:none; background:#fafafa; }
        .adm-field input:focus { border-color:#000; background:#fff; }
        .adm-err { background:#fff0f0; border:1px solid #ffcdd2; color:#c62828; padding:0.7rem 1rem; border-radius:8px; font-size:0.8rem; margin-bottom:1rem; }
        .adm-hint { background:#f0f4ff; border:1px solid #c5cae9; color:#3949ab; padding:0.7rem 1rem; border-radius:8px; font-size:0.78rem; margin-bottom:1.2rem; line-height:1.5; }
        .adm-hint strong { display:block; font-size:0.65rem; text-transform:uppercase; letter-spacing:1px; margin-bottom:0.2rem; }
        .btn-adm-login { width:100%; padding:0.95rem; background:#000; color:#fff; border:none; border-radius:10px; font-size:0.8rem; font-weight:800; text-transform:uppercase; letter-spacing:2px; cursor:pointer; font-family:'DM Sans',sans-serif; transition:0.3s; }
        .btn-adm-login:hover { background:#222; transform:translateY(-2px); }
        .btn-adm-login:disabled { opacity:0.5; cursor:not-allowed; transform:none; }
      `}</style>
      <div className="adm-login">
        <div className="adm-box">
          <div className="adm-box-top">
            <img src={logo} alt="ELOSS Technologies" className="adm-logo" />
            <h2>Admin Panel</h2>
            <p>Sign in to manage your platform.</p>
          </div>
          <div className="adm-hint">
            <strong>Default Credentials</strong>
            Username: <b>eloss</b> &nbsp;|&nbsp; Password: <b>admin@12</b>
          </div>
          {error && <div className="adm-err">{error}</div>}
          <form onSubmit={submit}>
            <div className="adm-field">
              <label>Username</label>
              <input placeholder="eloss" value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} required />
            </div>
            <div className="adm-field">
              <label>Password</label>
              <input type="password" placeholder="••••••••" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required />
            </div>
            <button className="btn-adm-login" disabled={loading}>{loading ? 'Signing in...' : 'Sign In →'}</button>
          </form>
        </div>
      </div>
    </>
  );
}
