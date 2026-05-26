import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

const leaders = [
  { name: 'Medavaram Hrishikesh', role: 'Founder / C.E.O / President' },
  { name: 'Naveen Gobidesi', role: 'Accounts Executive' },
  { name: 'Employer Name', role: 'Designation' },
];

export default function Leaders() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <>
      <style>{`
        .leaders-hero {
          padding: 140px 10% 100px;
          background: linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=2000') center/cover;
          text-align: center;
          position: relative;
          color: #fff;
        }
        .glass-badge {
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.2);
          padding: 0.6rem 1.5rem;
          border-radius: 50px;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-weight: 900;
          font-size: 0.65rem;
          text-transform: uppercase;
          letter-spacing: 3px;
          color: #fff;
          margin-bottom: 2rem;
        }
        .leaders-hero h1 {
          font-size: 4rem;
          font-weight: 900;
          letter-spacing: -3px;
          line-height: 1;
          margin: 0;
          color: #fff;
        }
        .leaders-hero h1 span { color: #eee; margin: 0 15px; }
        .hero-beam {
          position: absolute;
          bottom: 0; left: 50%;
          transform: translateX(-50%);
          width: 200px; height: 4px;
          background: #00d2ff;
          box-shadow: 0 0 20px rgba(0,210,255,0.5);
        }
        .leaders-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2.5rem;
          padding: 80px 5%;
          background: #fff;
        }
        .leader-glass-card {
          background: rgba(255,255,255,0.8);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(0,0,0,0.05);
          border-radius: 35px;
          padding: 2rem 1.5rem;
          text-align: center;
          transition: 0.5s cubic-bezier(0.4,0,0.2,1);
          position: relative;
          box-shadow: 0 30px 60px rgba(0,0,0,0.03);
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .leader-glass-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 40px 80px rgba(0,210,255,0.1);
          border-color: #00d2ff;
        }
        .aura-avatar {
          width: 100px; height: 100px;
          margin-bottom: 1.5rem;
          background: #fcfcfc;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          z-index: 2;
          border: 1px solid #eee;
        }
        .aura-avatar::before {
          content: "";
          position: absolute;
          width: 120%; height: 120%;
          background: radial-gradient(circle, rgba(0,210,255,0.1) 0%, transparent 70%);
          border-radius: 50%; z-index: -1;
          animation: aura-float 4s infinite alternate;
        }
        @keyframes aura-float {
          from { transform: scale(0.95); opacity: 0.5; }
          to { transform: scale(1.1); opacity: 1; }
        }
        .aura-avatar svg { width: 60%; height: auto; fill: #000; }
        .leader-glass-card h3 {
          font-size: 1.5rem; font-weight: 900;
          letter-spacing: -1px; color: #000;
          margin-bottom: 0.3rem;
          white-space: nowrap;
        }
        .leader-glass-card .role {
          font-size: 0.8rem; font-weight: 600;
          color: #888; margin-bottom: 1.5rem;
          display: block;
        }
        .btn-pulse {
          display: inline-flex; align-items: center; gap: 10px;
          background: #000; color: #fff;
          padding: 0.8rem 1.5rem;
          border-radius: 50px;
          text-decoration: none;
          font-weight: 800; font-size: 0.75rem;
          transition: 0.4s;
        }
        .btn-pulse:hover {
          background: #00d2ff;
          box-shadow: 0 15px 30px rgba(0,210,255,0.3);
          transform: scale(1.05);
        }
        .philosophy-section {
          background: #000; color: #fff;
          padding: 120px 5%;
          position: relative; overflow: hidden;
          display: flex; flex-direction: column;
          align-items: center; text-align: center;
        }
        .philosophy-bg-text {
          position: absolute; top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: 100%; font-size: 13rem;
          font-weight: 900; opacity: 0.25;
          pointer-events: none; white-space: nowrap;
          background: url('https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&auto=format&fit=crop&q=80') center;
          background-size: cover;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          letter-spacing: 15px;
          display: flex; justify-content: center;
        }
        .philosophy-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; text-align: left; }
        .philosophy-heading { font-size: 4rem; font-weight: 900; letter-spacing: -2px; margin-bottom: 2rem; line-height: 1; }
        @media (max-width: 1024px) {
          .leaders-grid { grid-template-columns: 1fr 1fr; }
          .philosophy-bg-text { font-size: 6rem; letter-spacing: 5px; top: 10%; transform: rotate(0); left: 0; }
        }
        @media (max-width: 768px) {
          .leaders-hero { padding: 100px 5% 60px; }
          .leaders-hero h1 { font-size: 2.5rem; }
          .leaders-grid { grid-template-columns: 1fr; padding: 40px 5%; }
          .philosophy-grid { grid-template-columns: 1fr; gap: 2rem; }
          .philosophy-heading { font-size: 2.5rem; }
        }
      `}</style>

      {/* Hero */}
      <section className="leaders-hero">
        <div className="glass-badge" data-aos="fade-down">
          <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>account_tree</span>
          Governance Hub
        </div>
        <h1 data-aos="zoom-in" data-aos-delay="100">The Core <span>//</span> Architects</h1>
        <div className="hero-beam" data-aos="fade-up" data-aos-delay="300"></div>
      </section>

      {/* Leaders Grid */}
      <section className="leaders-grid">
        {leaders.map((leader, i) => (
          <div className="leader-glass-card" key={i} data-aos="fade-up" data-aos-delay={`${i * 100}`}>
            <div className="aura-avatar">
              <svg viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </div>
            <h3>{leader.name}</h3>
            <span className="role">{leader.role}</span>
            <Link to="/contact" className="btn-pulse">
              Connect Now
              <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>north_east</span>
            </Link>
          </div>
        ))}
      </section>

      {/* Philosophy */}
      <section className="philosophy-section">
        <div className="philosophy-bg-text">MINDSET</div>
        <div style={{ maxWidth: '900px', position: 'relative', zIndex: 2 }}>
          <span className="section-tag" style={{ color: '#00d2ff', marginBottom: '2rem' }}>Strategic Intent</span>
          <h2 className="philosophy-heading">Infrastructure for the Mind.</h2>
          <p style={{ color: '#888', fontSize: '1.2rem', lineHeight: 1.8, textAlign: 'justify', marginBottom: '4rem' }}>
            Our leadership doesn't just manage people; we architect growth. We believe that true technology leadership requires a balance of raw technical precision and humanist empathy. Every decision we make is designed to strengthen the digital foundations of our students and partners, ensuring they are built to last in an ever-shifting global landscape.
          </p>
          <div className="philosophy-grid">
            <div data-aos="fade-up">
              <h4 style={{ color: '#fff', marginBottom: '1rem', fontWeight: 800, letterSpacing: '1px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ width: '20px', height: '2px', background: '#00d2ff', display: 'inline-block' }}></span>
                Visionary Precision
              </h4>
              <p style={{ fontSize: '0.9rem', color: '#666', textAlign: 'justify' }}>We look beyond current trends to build solutions that remain relevant for decades, not just seasons.</p>
            </div>
            <div data-aos="fade-up" data-aos-delay="100">
              <h4 style={{ color: '#fff', marginBottom: '1rem', fontWeight: 800, letterSpacing: '1px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ width: '20px', height: '2px', background: '#00d2ff', display: 'inline-block' }}></span>
                Humanist Ethics
              </h4>
              <p style={{ fontSize: '0.9rem', color: '#666', textAlign: 'justify' }}>Technology is a tool for empowerment. We ensure our leadership reflects a deep commitment to ethical innovation.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Strategic Alliance */}
      <section style={{ padding: '100px 5%', textAlign: 'center', background: '#fff' }}>
        <div data-aos="zoom-in">
          <span className="section-tag">Direct Access</span>
          <h2 style={{ fontSize: '3rem', fontWeight: 900, letterSpacing: '-2px', marginBottom: '1.5rem' }}>Forge a Strategic Alliance.</h2>
          <p style={{ maxWidth: '700px', margin: '0 auto 3rem', color: '#666' }}>
            Interested in institutional partnerships or corporate training? Connect directly with our core architects to redefine your organization's digital trajectory.
          </p>
          <Link to="/contact" className="btn-pulse" style={{ padding: '1rem 3rem', fontSize: '0.9rem', display: 'inline-flex' }}>
            Inquire for Partnership
          </Link>
        </div>
      </section>
    </>
  );
}
