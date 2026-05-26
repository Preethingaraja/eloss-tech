import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import { API_URL as API } from '../config';

export default function Login() {
  const [mode, setMode] = useState('login'); // 'login' | 'signup'
  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '' });
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setError(''); setLoading(true);
    try {
      const endpoint = mode === 'login' ? '/auth/login' : '/auth/signup';
      const body = mode === 'login'
        ? { email: form.email, password: form.password }
        : { name: form.name, email: form.email, password: form.password, phone: form.phone };
      const r = await fetch(API + endpoint, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      const data = await r.json();
      if (r.status === 403 && data.error === 'BLOCKED') {
        setError('BLOCKED:' + (data.message || 'Your account has been blocked by the administrator.'));
        setLoading(false); return;
      }
      if (!r.ok) { setError(data.error || 'Something went wrong'); setLoading(false); return; }
      // Clear previous customer's chat session — prevents session bleed between users
      localStorage.removeItem('eloss_chat_session');
      localStorage.removeItem('eloss_chat_name');
      localStorage.setItem('eloss_user', JSON.stringify(data.user || { name: data.name }));
      navigate('/');
    } catch {
      setError('Cannot connect to server. Please try again.');
    }
    setLoading(false);
  };

  return (
    <>
      <style>{`
        .auth-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f4f6f9;
          font-family: 'DM Sans', sans-serif;
          padding: 2rem;
        }
        .auth-container {
          display: flex;
          width: 900px;
          max-width: 100%;
          background: #fff;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }
        /* LEFT — video/brand panel */
        .auth-left {
          flex: 1;
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 3rem;
          background: #000;
        }
        .auth-left video {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          object-fit: cover;
          opacity: 0.4;
        }
        .auth-left-content { position: relative; z-index: 2; text-align: center; color: #fff; }
        .auth-logo {
          width: 60px; height: 60px; border-radius: 50%;
          border: 2px solid #fff; margin-bottom: 2rem;
          object-fit: cover; display: inline-block;
        }
        .auth-left h2 {
          font-size: 2.2rem; font-weight: 900; letter-spacing: -1.5px;
          line-height: 1.1; margin-bottom: 1.2rem;
        }
        .auth-left h2 span { color: #00d2ff; }
        .auth-left p { color: #ccc; font-size: 0.85rem; line-height: 1.6; max-width: 300px; margin: 0 auto; }
        .auth-stats {
          display: flex; gap: 1.5rem; margin-top: 2rem; justify-content: center;
        }
        .auth-stat { text-align: center; }
        .auth-stat strong { display: block; font-size: 1.4rem; font-weight: 900; color: #fff; }
        .auth-stat span { font-size: 0.6rem; color: #aaa; text-transform: uppercase; letter-spacing: 1px; }

        /* RIGHT — form panel */
        .auth-right {
          width: 400px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #fff;
          padding: 2.5rem;
        }
        .auth-form-box { width: 100%; }
        .auth-form-box h3 {
          font-size: 1.5rem; font-weight: 900; color: #000;
          margin-bottom: 0.2rem; letter-spacing: -0.5px;
        }
        .auth-form-box p { color: #888; font-size: 0.8rem; margin-bottom: 1.2rem; }
        .auth-tabs {
          display: flex; border: 1.5px solid #eee; border-radius: 10px;
          overflow: hidden; margin-bottom: 1.2rem;
        }
        .auth-tab {
          flex: 1; padding: 0.6rem; text-align: center;
          font-size: 0.7rem; font-weight: 800; text-transform: uppercase;
          letter-spacing: 1px; cursor: pointer; border: none;
          background: transparent; color: #999; transition: 0.3s;
        }
        .auth-tab.active { background: #000; color: #fff; }
        .form-group { margin-bottom: 0.8rem; }
        .form-group label {
          display: block; font-size: 0.65rem; font-weight: 800;
          text-transform: uppercase; letter-spacing: 1px; color: #555; margin-bottom: 0.2rem;
        }
        .form-group input {
          width: 100%; padding: 0.65rem 0.9rem; border: 1.5px solid #eee;
          border-radius: 8px; font-size: 0.85rem; font-family: 'DM Sans', sans-serif;
          transition: 0.3s; outline: none; background: #fafafa; color: #000;
        }
        .form-group input:focus { border-color: #000; background: #fff; }
        .auth-error {
          background: #fff0f0; border: 1px solid #ffcccc; color: #c00;
          padding: 0.6rem 0.8rem; border-radius: 8px; font-size: 0.75rem;
          margin-bottom: 1rem;
        }
        .form-checkbox {
          display: flex; align-items: flex-start; gap: 8px;
          margin: 0.5rem 0 1.5rem;
        }
        .form-checkbox input[type="checkbox"] {
          width: auto; margin-top: 2px; cursor: pointer;
        }
        .form-checkbox label {
          font-size: 0.75rem; color: #666; line-height: 1.4;
          text-transform: none; letter-spacing: normal; font-weight: 500;
          display: inline;
        }
        .form-checkbox label a {
          color: #0088aa; text-decoration: none; font-weight: 700;
        }
        .form-checkbox label a:hover { text-decoration: underline; }
        .btn-auth {
          width: 100%; padding: 0.85rem; background: #000; color: #fff;
          border: none; border-radius: 8px; font-size: 0.75rem; font-weight: 800;
          text-transform: uppercase; letter-spacing: 1.5px; cursor: pointer;
          transition: 0.3s; font-family: 'DM Sans', sans-serif;
        }
        .btn-auth:hover { background: #222; transform: translateY(-2px); }
        .btn-auth:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
        .auth-footer { text-align: center; margin-top: 1.2rem; font-size: 0.75rem; color: #999; }
        .auth-footer a { color: #000; font-weight: 700; cursor: pointer; }

        @media (max-width: 800px) {
          .auth-container { width: 100%; max-width: 400px; }
          .auth-left { display: none; }
        }
      `}</style>

      <div className="auth-page">
        <div className="auth-container">
          {/* LEFT */}
          <div className="auth-left">
            <video autoPlay muted loop playsInline
              src="https://assets.mixkit.co/videos/preview/mixkit-people-working-at-a-coworking-space-2837-large.mp4">
            </video>
            <div className="auth-left-content">
              <img src={logo} alt="ELOSS Technologies" className="auth-logo" />
              <h2>Build Your<br /><span>Digital Future</span><br />With Us</h2>
              <p>Join 5,000+ students learning cutting-edge technology, business, and creative skills at ELOSS Technologies.</p>
              <div className="auth-stats">
                <div className="auth-stat"><strong>12+</strong><span>Courses</span></div>
                <div className="auth-stat"><strong>5K+</strong><span>Students</span></div>
                <div className="auth-stat"><strong>98%</strong><span>Placement</span></div>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="auth-right">
            <div className="auth-form-box">
              <h3>{mode === 'login' ? 'Welcome Back' : 'Get Started'}</h3>
              <p>{mode === 'login' ? 'Sign in to access your courses.' : 'Create your free account today.'}</p>

              <div className="auth-tabs">
                <button className={`auth-tab${mode === 'login' ? ' active' : ''}`} onClick={() => { setMode('login'); setError(''); }}>Login</button>
                <button className={`auth-tab${mode === 'signup' ? ' active' : ''}`} onClick={() => { setMode('signup'); setError(''); }}>Sign Up</button>
              </div>

              {error && error.startsWith('BLOCKED:') ? (
                <div style={{
                  background:'#fef2f2', border:'1px solid #fecaca',
                  borderRadius:12, padding:'14px 16px', marginBottom:16,
                  display:'flex', gap:10, alignItems:'flex-start',
                }}>
                  <span style={{fontSize:'1.3rem'}}>🔒</span>
                  <div>
                    <div style={{fontWeight:800, color:'#dc2626', fontSize:'0.85rem', marginBottom:2}}>
                      Account Blocked
                    </div>
                    <div style={{color:'#991b1b', fontSize:'0.8rem', lineHeight:1.5}}>
                      {error.replace('BLOCKED:', '')}
                    </div>
                  </div>
                </div>
              ) : error ? (
                <div className="auth-error">{error}</div>
              ) : null}

              <form onSubmit={submit}>
                {mode === 'signup' && (
                  <div className="form-group">
                    <label>Full Name</label>
                    <input name="name" placeholder="John Doe" value={form.name} onChange={handle} required />
                  </div>
                )}
                <div className="form-group">
                  <label>Email Address</label>
                  <input name="email" type="email" placeholder="you@example.com" value={form.email} onChange={handle} required />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input name="password" type="password" placeholder="••••••••" value={form.password} onChange={handle} required />
                </div>
                {mode === 'signup' && (
                  <div className="form-group">
                    <label>Phone (Optional)</label>
                    <input name="phone" placeholder="+91 00000 00000" value={form.phone} onChange={handle} />
                  </div>
                )}
                {mode === 'signup' && (
                  <div className="form-checkbox">
                    <input type="checkbox" id="terms-agree" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} required />
                    <label htmlFor="terms-agree">
                      I agree to the <a href="/refund-policy" target="_blank" rel="noreferrer">Refund & Return Policy</a>, <a href="/terms" target="_blank" rel="noreferrer">Terms & Conditions</a>, and <a href="/privacy" target="_blank" rel="noreferrer">Privacy Policy</a>.
                    </label>
                  </div>
                )}
                <button className="btn-auth" disabled={loading || (mode === 'signup' && !agreed)}>
                  {loading ? 'Please wait...' : mode === 'login' ? 'Sign In' : 'Create Account'}
                </button>
              </form>

              <div className="auth-footer">
                {mode === 'login'
                  ? <>Don't have an account? <a onClick={() => { setMode('signup'); setError(''); }}>Sign Up</a></>
                  : <>Already have an account? <a onClick={() => { setMode('login'); setError(''); }}>Login</a></>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
