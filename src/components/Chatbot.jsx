import { useState } from 'react';

export default function Chatbot() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div id="chat-window" className={`chat-window${open ? ' active' : ''}`}>
        <div className="chat-header">
          <div className="admin-info">
            <div className="admin-status"></div>
            <span style={{ fontWeight: 800, fontSize: '0.8rem', textTransform: 'uppercase' }}>Admin Support</span>
          </div>
          <button
            onClick={() => setOpen(false)}
            style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '1.2rem', lineHeight: 1 }}
          >
            ✕
          </button>
        </div>
        <div className="chat-body">
          <div className="chat-msg">
            Hello! Welcome to ELOSS Technologies. How can we help you today?
          </div>
          <a href="https://wa.me/911234567890" target="_blank" rel="noreferrer" className="btn-whatsapp">
            <span className="material-symbols-outlined">chat</span>
            Chat on WhatsApp
          </a>
        </div>
      </div>

      <a href="#" className="chatbot-trigger" onClick={(e) => { e.preventDefault(); setOpen(!open); }}>
        <div className="chat-bubble-pink"></div>
        <div className="live-chat-pill">
          <span>Direct</span>
          LIVE CHAT
        </div>
      </a>
    </>
  );
}
