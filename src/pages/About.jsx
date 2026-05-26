import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import aboutHeroImg from '../assets/about_hero.png';
import aboutMissionImg from '../assets/about_mission.png';
export default function About() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true, offset: 100 });
  }, []);

  return (
    <>
      <style>{`
        .about-hero {
          padding: 140px 5% 60px;
          background: #fff;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          gap: 5rem;
          border-bottom: 1px solid #eee;
        }
        .about-hero::before {
          content: "";
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
          background-image: radial-gradient(circle at 2px 2px, #eee 1px, transparent 0);
          background-size: 40px 40px;
          z-index: 1;
        }
        .hero-text { position: relative; z-index: 2; width: 60%; }
        .hero-visual { position: relative; z-index: 2; width: 40%; }
        .about-hero h1 {
          font-size: 5rem;
          font-weight: 900;
          letter-spacing: -4px;
          line-height: 0.9;
          margin-bottom: 1.5rem;
        }
        .about-hero p { font-size: 1.1rem; color: #444; text-align: justify; max-width: 600px; line-height: 1.8; }
        .hq-badge {
          background: #000;
          color: #fff;
          padding: 0.8rem 1.5rem;
          border-radius: 50px;
          display: inline-flex;
          align-items: center;
          gap: 12px;
          font-weight: 800;
          font-size: 0.65rem;
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-bottom: 1.5rem;
        }
        .mission-section {
          padding: 60px 5%;
          background: #000;
          color: #fff;
          position: relative;
        }
        .mission-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 6rem;
          align-items: center;
        }
        .mission-content h2 { font-size: 3rem; font-weight: 900; margin-bottom: 1.5rem; letter-spacing: -2px; }
        .mission-content p { color: #aaa; font-size: 1.2rem; text-align: justify; line-height: 1.7; }
        .capabilities-section { padding: 80px 5% 60px; background: #fff; }
        .cap-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 3rem; margin-top: 3rem; }
        .cap-card {
          padding: 2.5rem;
          border: 1px solid #eee;
          border-radius: 20px;
          transition: 0.4s;
          position: relative;
          overflow: hidden;
        }
        .cap-card:hover { border-color: #000; transform: translateY(-10px); }
        .cap-card h3 { font-size: 1.4rem; font-weight: 800; margin-bottom: 1.2rem; display: flex; align-items: center; gap: 15px; }
        .cap-card p { color: #666; font-size: 0.95rem; text-align: justify; margin-bottom: 0; }
        .cap-number { position: absolute; top: 20px; right: 30px; font-size: 4rem; font-weight: 900; color: rgba(0,0,0,0.08); line-height: 1; }
        .value-pillar {
          padding: 3rem;
          background: #111;
          border: 1px solid #222;
          border-radius: 24px;
          transition: 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }
        .value-pillar:hover { background: #1a1a1a; border-color: #333; transform: translateY(-15px); }
        .pillar-line { position: absolute; top: 0; left: 0; width: 4px; height: 0; background: #00d2ff; transition: 0.5s; }
        .value-pillar:hover .pillar-line { height: 100%; }
        .value-pillar h3 { font-size: 1.4rem; font-weight: 800; margin-bottom: 1rem; color: #fff; }
        .value-pillar p { color: #888; font-size: 0.95rem; line-height: 1.6; text-align: justify; }
        .timeline-item { padding: 0 0 4rem 3rem; border-left: 2px solid #eee; position: relative; }
        .timeline-item::after {
          content: "";
          position: absolute;
          left: -9px; top: 0;
          width: 16px; height: 16px;
          background: #fff;
          border: 4px solid #000;
          border-radius: 50%;
        }
        .timeline-item .year { font-weight: 900; font-size: 1.2rem; color: #00d2ff; display: block; margin-bottom: 0.5rem; }
        .timeline-item h4 { font-size: 1.6rem; font-weight: 800; margin-bottom: 1rem; }
        .timeline-item p { color: #666; text-align: justify; line-height: 1.7; }
        .edge-section { padding: 100px 5%; background: #000; position: relative; overflow: hidden; color: #fff; }
        .edge-bg-text {
          position: absolute; top: 50%; left: -5%;
          transform: translateY(-50%) rotate(-90deg);
          font-size: 15rem; font-weight: 900;
          color: rgba(255,255,255,0.02); z-index: 1;
          letter-spacing: 20px; pointer-events: none;
        }
        .edge-container { display: flex; gap: 5rem; align-items: center; position: relative; z-index: 2; }
        .edge-content { width: 55%; }
        .edge-visual { width: 45%; }
        .advantage-stack { display: flex; flex-direction: column; gap: 2.5rem; }
        .adv-item {
          display: flex; gap: 20px; padding: 2rem;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 20px; transition: 0.3s;
        }
        .adv-item:hover { background: rgba(255,255,255,0.05); border-color: #00d2ff; transform: translateX(10px); }
        .adv-icon { width: 50px; height: 50px; background: #fff; color: #000; border-radius: 12px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .adv-text h3 { font-size: 1.2rem; font-weight: 800; margin-bottom: 0.5rem; }
        .adv-text p { font-size: 0.9rem; color: #888; text-align: justify; margin: 0; }
        .commitment-card {
          padding: 3rem;
          background: linear-gradient(135deg, #111, #000);
          border: 1px solid #333; border-radius: 30px;
          position: relative; box-shadow: 0 40px 100px rgba(0,0,0,0.5);
        }
        .commitment-card::before {
          content: ""; position: absolute;
          top: -2px; left: -2px; right: -2px; bottom: -2px;
          background: linear-gradient(45deg, #00d2ff, transparent, #4caf50);
          z-index: -1; border-radius: 32px; opacity: 0.3;
        }
        .card-header { display: flex; align-items: center; gap: 10px; margin-bottom: 2rem; font-family: monospace; font-size: 0.7rem; text-transform: uppercase; color: #4caf50; }
        .status-dot-green { width: 8px; height: 8px; background: #4caf50; border-radius: 50%; animation: pulse-green 2s infinite; }
        @keyframes pulse-green {
          0% { box-shadow: 0 0 0 0 rgba(76,175,80,0.4); }
          70% { box-shadow: 0 0 0 10px rgba(76,175,80,0); }
          100% { box-shadow: 0 0 0 0 rgba(76,175,80,0); }
        }
        .commitment-card p { font-size: 1.8rem; font-weight: 800; line-height: 1.3; color: #fff; margin-bottom: 2rem; }
        .card-footer-grid {
          display: flex; justify-content: space-between;
          font-family: monospace; font-size: 0.65rem; color: #444;
          border-top: 1px solid #222; padding-top: 1.5rem;
        }
        .floating-blob {
          position: absolute; width: 400px; height: 400px;
          background: rgba(0,210,255,0.05); filter: blur(100px);
          border-radius: 50%; z-index: 1; animation: move-blob 20s infinite alternate;
        }
        @keyframes move-blob {
          from { transform: translate(0, 0); }
          to { transform: translate(100px, 100px); }
        }
        .pillars-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; }
        .journey-container { display: flex; gap: 6rem; align-items: flex-start; }
        .journey-left { width: 40%; position: sticky; top: 120px; }
        .journey-right { width: 60%; }
        .edge-heading { font-size: 4rem; font-weight: 900; color: #fff; line-height: 1; margin-bottom: 3rem; }
        @media (max-width: 1024px) {
          .about-hero, .mission-grid, .cap-grid, .pillars-grid { flex-direction: column; grid-template-columns: 1fr; }
          .hero-text, .hero-visual { width: 100%; }
          .about-hero h1 { font-size: 3.5rem; }
          .journey-container { flex-direction: column; gap: 3rem; }
          .journey-left, .journey-right { width: 100%; position: relative; top: 0; }
          .edge-container { flex-direction: column; }
          .edge-content, .edge-visual { width: 100%; }
          .edge-bg-text { font-size: 6rem; letter-spacing: 5px; top: 10%; transform: rotate(0); left: 0; }
        }
        @media (max-width: 768px) {
          .edge-heading { font-size: 2.8rem; }
        }
      `}</style>

      <div className="floating-blob" style={{ top: '5%', right: '5%' }}></div>

      {/* Hero */}
      <section className="about-hero">
        <div className="hero-text">
          <div className="hq-badge" data-aos="fade-right">
            <span className="material-symbols-outlined">location_on</span>
            Bengaluru, India
          </div>
          <h1 data-aos="fade-right" data-aos-delay="100">Visionary<br />Architecture.</h1>
          <p data-aos="fade-right" data-aos-delay="200">
            At ELOSS Technologies, we're not just a technology company; we're your dedicated partner in navigating the complexities of the digital world. Based in Bengaluru, Karnataka, India, we bring years of collective expertise in software development, IT consulting, and digital transformation to businesses across the globe. Our passion lies in helping organizations like yours harness the power of technology to unlock new opportunities, streamline operations, and achieve ambitious goals.
          </p>
        </div>
        <div className="hero-visual" data-aos="zoom-in">
          <img
            src={aboutHeroImg}
            alt="Architecture"
            style={{ width: '100%', borderRadius: '24px', boxShadow: '0 40px 80px rgba(0,0,0,0.1)', border: '1px solid #eee' }}
          />
        </div>
      </section>

      {/* Mission */}
      <section className="mission-section">
        <div className="mission-grid">
          <div className="mission-visual" data-aos="fade-right">
            <img
              src={aboutMissionImg}
              alt="Empowering Growth"
              style={{ width: '100%', height: '450px', objectFit: 'cover', borderRadius: '20px', boxShadow: '0 30px 60px rgba(0,0,0,0.15)', border: '1px solid #eee' }}
            />
          </div>
          <div className="mission-content" data-aos="fade-left">
            <span className="section-tag">Our Core Mission</span>
            <h2>Empowering Growth Through Innovation.</h2>
            <p>
              Our mission is simple yet profound: to deliver high-quality, customized technology solutions that empower businesses to thrive and succeed in an ever-evolving digital landscape. We believe that every business, regardless of its size or industry, deserves access to cutting-edge tools and expert guidance to stay competitive and grow.
            </p>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="capabilities-section">
        <div style={{ maxWidth: '800px' }}>
          <span className="section-tag" data-aos="fade-up">Strategic Imperative</span>
          <h2 data-aos="fade-up" data-aos-delay="100" style={{ fontSize: '3.5rem', fontWeight: 900, letterSpacing: '-2px' }}>What We Do.</h2>
          <p data-aos="fade-up" data-aos-delay="200" style={{ marginTop: '2rem', color: '#666', fontSize: '1.1rem' }}>
            We understand that in today's fast-paced environment, technology is not just a support function—it's a strategic imperative. That's why we offer a comprehensive suite of services designed to address your unique needs:
          </p>
        </div>
        <div className="cap-grid">
          {[
            { num: '01', icon: 'code', color: '#00d2ff', title: 'Software Solutions', desc: 'From bespoke application development to enterprise-level software integration, we build robust and scalable solutions tailored to your specific requirements.' },
            { num: '02', icon: 'dns', color: '#4caf50', title: 'Robust IT Infrastructure', desc: 'We design, implement, and manage secure and efficient IT infrastructures that form the backbone of your operations, ensuring seamless connectivity and optimal performance.' },
            { num: '03', icon: 'psychology', color: '#ffc107', title: 'Expert Tech Consultancy', desc: 'Our seasoned consultants provide strategic guidance, helping you make informed technology decisions that align with your business objectives and drive sustainable growth.' },
            { num: '04', icon: 'rocket_launch', color: '#ff5722', title: 'Digital Transformation', desc: 'We guide you through the journey of embracing digital technologies, optimizing processes, and fostering a culture of innovation to revolutionize your business model.' },
          ].map((cap, i) => (
            <div className="cap-card" key={i} data-aos="fade-up" data-aos-delay={i % 2 === 1 ? '100' : '0'}>
              <span className="cap-number">{cap.num}</span>
              <h3>
                <span className="material-symbols-outlined" style={{ color: cap.color }}>{cap.icon}</span>
                {cap.title}
              </h3>
              <p>{cap.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pillars */}
      <section style={{ padding: '80px 5%', background: '#000', color: '#fff', overflow: 'hidden' }}>
        <span className="section-tag" data-aos="fade-up">Foundation</span>
        <h2 data-aos="fade-up" data-aos-delay="100" style={{ fontSize: '3.5rem', fontWeight: 900, letterSpacing: '-2px', marginBottom: '3rem' }}>Pillars of Excellence.</h2>
        <div className="pillars-grid">
          {[
            { icon: 'military_tech', color: '#00d2ff', title: 'Uncompromising Integrity', desc: 'We build trust through transparent operations and ethical engineering, ensuring every partnership is founded on a rock-solid moral core.', delay: '200' },
            { icon: 'biotech', color: '#4caf50', title: 'Relentless Innovation', desc: 'Stagnation is not an option. We constantly re-evaluate current technologies to bridge the gap between traditional education and future tech.', delay: '300' },
            { icon: 'diversity_3', color: '#ff9800', title: 'Inclusive Growth', desc: 'We believe technology should be accessible. Our ecosystem is designed to empower diverse minds from all backgrounds to lead the digital age.', delay: '400' },
          ].map((p, i) => (
            <div className="value-pillar" key={i} data-aos="fade-up" data-aos-delay={p.delay}>
              <div className="pillar-line"></div>
              <span className="material-symbols-outlined" style={{ fontSize: '3rem', color: p.color, marginBottom: '2rem', display: 'block' }}>{p.icon}</span>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Journey Timeline */}
      <section style={{ padding: '80px 5%', background: '#fff', position: 'relative' }}>
        <div className="journey-container">
          <div className="journey-left">
            <span className="section-tag">Evolution</span>
            <h2 style={{ fontSize: '3.5rem', fontWeight: 900, letterSpacing: '-2px', lineHeight: 1 }}>Our Journey Through Time.</h2>
            <div style={{ marginTop: '2rem', padding: '2rem', background: '#f9f9f9', borderRadius: '20px', border: '1px solid #eee' }}>
              <p style={{ fontStyle: 'italic', color: '#666' }}>"From a small vision in Bengaluru to a global technological partner. Every milestone is a testament to our commitment."</p>
            </div>
          </div>
          <div className="journey-right">
            {[
              { year: '2018', title: 'The Blueprint', desc: 'ELOSS Technologies was founded in Bengaluru with a singular vision: to revolutionize technical training through industrial integration.' },
              { year: '2020', title: 'Digital Pivot', desc: 'Navigating the global shift, we expanded our consulting arm, helping 200+ businesses achieve digital transformation during critical times.' },
              { year: '2022', title: 'Global Reach', desc: 'Established strategic partnerships across Europe and Southeast Asia, bringing Bengaluru\'s tech expertise to the international stage.' },
              { year: '2024', title: 'Future-Ready', desc: 'Launching our Advanced AI and Infrastructure labs, training the next generation of digital architects for the 2030 tech landscape.' },
            ].map((item, i) => (
              <div className="timeline-item" key={i} data-aos="fade-left" data-aos-delay={`${i * 100}`}>
                <span className="year">{item.year}</span>
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Eloss Edge */}
      <section className="edge-section">
        <div className="edge-bg-text">ADVANTAGE</div>
        <div className="edge-container">
          <div className="edge-content" data-aos="fade-right">
            <span className="section-tag" style={{ color: '#00d2ff' }}>The Eloss Edge</span>
            <h2 className="edge-heading">Engineered for<br />Superiority.</h2>
            <div className="advantage-stack">
              <div className="adv-item">
                <div className="adv-icon"><span className="material-symbols-outlined">verified</span></div>
                <div className="adv-text">
                  <h3>Unmatched Expertise</h3>
                  <p>Global-scale digital delivery powered by years of collective architectural experience.</p>
                </div>
              </div>
              <div className="adv-item">
                <div className="adv-icon"><span className="material-symbols-outlined">hub</span></div>
                <div className="adv-text">
                  <h3>Strategic Partnership</h3>
                  <p>We don't just build code; we engineer business solutions that drive real structural growth.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="edge-visual" data-aos="zoom-in">
            <div className="commitment-card">
              <div className="card-header">
                <div className="status-dot-green"></div>
                <span>Live Commitment</span>
              </div>
              <p>"Your trusted partner in technology solutions, empowering businesses to thrive in the heart of Bengaluru."</p>
              <div className="card-footer-grid">
                <span>ELOSS TECHNOLOGIES</span>
                <span>v2.0_STABLE</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
