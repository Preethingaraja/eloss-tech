import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

import techStudents from '../assets/tech_students_1779783922400.png';
import techOffice from '../assets/tech_office_1779783947862.png';
import abstractCode from '../assets/abstract_code_1779783974989.png';

const carouselImages = [
  techStudents,
  techOffice,
  abstractCode,
];

export default function Home() {
  const trackRef = useRef(null);
  const slideCount = carouselImages.length;

  useEffect(() => {
    AOS.init({ duration: 200, once: true });

    let currentSlide = 0;
    const interval = setInterval(() => {
      currentSlide = (currentSlide + 1) % slideCount;
      if (trackRef.current) {
        trackRef.current.style.transform = `translateX(-${currentSlide * (100 / slideCount)}%)`;
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [slideCount]);

  return (
    <>
      <style>{`
        .hero {
          height: 85vh;
          min-height: 650px;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          position: relative;
          overflow: hidden;
          background: #000;
          padding-top: 120px;
        }
        .hero-carousel {
          position: absolute;
          right: 0; top: 0;
          width: 100%; height: 100%;
          z-index: 1;
        }
        .hero-carousel::after {
          content: '';
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
          background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.85));
          z-index: 2;
        }
        .hero-content {
          width: 100%;
          max-width: 900px;
          padding: 5% 8%;
          z-index: 3;
          position: relative;
        }
        .hero h1 {
          font-size: 5.5rem;
          font-weight: 900;
          line-height: 0.95;
          letter-spacing: -4px;
          color: #fff;
          margin-bottom: 1rem;
        }
        .carousel-track {
          display: flex;
          width: ${slideCount * 100}%;
          height: 100%;
          transition: transform 1.2s cubic-bezier(0.65, 0, 0.35, 1);
        }
        .carousel-slide {
          flex: 0 0 ${100 / slideCount}%;
          height: 100%;
          background-size: cover;
          background-position: center;
        }
        .hero p {
          font-size: 1.1rem;
          color: #eee;
          max-width: 600px;
          margin-bottom: 1.5rem;
          line-height: 1.5;
          text-align: justify;
        }
        .preview-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 3rem;
          margin-top: 1.5rem;
        }
        .stat-box h3 { font-size: 2.5rem; font-weight: 900; margin-bottom: 0.5rem; color: #fff; }
        .stat-box p { font-weight: 700; text-transform: uppercase; font-size: 0.7rem; color: #aaa; letter-spacing: 2px; }
        .floating-shape {
          position: absolute;
          background: rgba(0,0,0,0.03);
          border: 1px solid rgba(0,0,0,0.05);
          border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
          z-index: 1;
          pointer-events: none;
          animation: morph 15s linear infinite alternate, float-shape 20s ease-in-out infinite;
        }
        .shape-1 { width: 400px; height: 400px; top: -100px; left: -100px; }
        .shape-2 { width: 300px; height: 300px; bottom: 10%; left: 20%; animation-delay: -5s; }
        @keyframes morph {
          0% { border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; }
          100% { border-radius: 50% 50% 33% 67% / 55% 27% 73% 45%; }
        }
        @keyframes float-shape {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(30px, 50px) rotate(5deg); }
          66% { transform: translate(-20px, 20px) rotate(-5deg); }
        }
        .hero-buttons {
          display: flex; gap: 1.5rem; margin-bottom: 2rem;
        }
        .btn-cta-white {
          background: #fff; color: #000; padding: 0.6rem 1.5rem; border-radius: 12px; font-weight: 700; font-size: 0.7rem; text-transform: uppercase; letter-spacing: 1px; transition: 0.3s; text-decoration: none; display: inline-flex; justify-content: center; align-items: center; width: max-content; white-space: nowrap;
        }
        .btn-cta-white:hover {
          background: #e2e8f0;
        }
        .btn-large {
          padding: 1.2rem 4rem;
          font-size: 1rem;
        }
        .btn-cta-alt {
          background: transparent; color: #fff; border: 2px solid #fff; padding: 0.6rem 1.5rem; border-radius: 12px; font-weight: 700; font-size: 0.7rem; text-transform: uppercase; letter-spacing: 1px; transition: 0.3s; text-decoration: none; display: inline-flex; justify-content: center; align-items: center; width: max-content; white-space: nowrap;
        }
        .btn-cta-alt:hover {
          background: #fff; color: #000;
        }
        @media (max-width: 1024px) {
          .hero { text-align: center; justify-content: center; min-height: 100vh; height: auto; padding-top: 120px; padding-bottom: 60px; }
          .hero-content { width: 100%; padding: 0 5%; display: flex; flex-direction: column; align-items: center; }
          .hero-carousel { width: 100%; height: 100%; margin-top: 0; position: absolute; top: 0; left: 0; }
          .hero h1 { font-size: 4rem; }
          .hero p { text-align: center; }
          .hero-buttons { justify-content: center; flex-wrap: wrap; }
        }

        /* --- Ecosystem Grid --- */
        .ecosystem-section {
          padding: 100px 5%;
          background: #000;
          color: #fff;
          position: relative;
          overflow: hidden;
        }
        .ecosystem-header {
          margin-bottom: 4rem;
          max-width: 800px;
        }
        .ecosystem-header h2 {
          font-size: 3.5rem;
          font-weight: 900;
          letter-spacing: -2px;
          line-height: 1;
          margin-bottom: 1.5rem;
        }
        .ecosystem-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }
        .eco-card {
          padding: 3rem;
          background: #111;
          border: 1px solid #222;
          border-radius: 24px;
          transition: 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }
        .eco-card:hover {
          background: #1a1a1a;
          border-color: #444;
          transform: translateY(-15px);
        }
        .eco-card h3 {
          font-size: 1.8rem;
          font-weight: 800;
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          gap: 15px;
        }
        .eco-card p {
          color: #888;
          font-size: 0.95rem;
          line-height: 1.6;
          text-align: justify;
          margin-bottom: 0;
        }
        .eco-icon {
          font-size: 2.5rem;
          color: #00d2ff;
        }
        .eco-bg-number {
          position: absolute;
          bottom: -20px;
          right: -10px;
          font-size: 8rem;
          font-weight: 900;
          color: rgba(255,255,255,0.02);
          line-height: 1;
          pointer-events: none;
        }

        /* --- Marquee Section --- */
        .marquee-container {
          background: #fff;
          padding: 60px 0;
          border-top: 1px solid #eee;
          border-bottom: 1px solid #eee;
          overflow: hidden;
          white-space: nowrap;
          position: relative;
        }
        .marquee-track {
          display: inline-flex;
          animation: marquee 30s linear infinite;
        }
        .marquee-item {
          font-size: 5rem;
          font-weight: 900;
          letter-spacing: -2px;
          padding: 0 40px;
          color: #000;
          display: flex;
          align-items: center;
          gap: 20px;
        }
        .marquee-item span {
          color: #eee;
          -webkit-text-stroke: 1px #000;
          -webkit-text-fill-color: transparent;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        /* --- Integration Section --- */
        .integration-section {
          padding: 120px 5%;
          display: flex;
          gap: 6rem;
          align-items: center;
          background: #fff;
        }
        .integration-visual {
          width: 45%;
          position: relative;
        }
        .integration-content {
          width: 55%;
        }
        .tech-orb {
          width: 450px;
          height: 450px;
          background: radial-gradient(circle at center, #00d2ff, #3449c2);
          border-radius: 50%;
          position: relative;
          box-shadow: 0 0 100px rgba(0,210,255,0.3);
          animation: orb-float 8s ease-in-out infinite;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .tech-orb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 50%;
          opacity: 0.8;
          mix-blend-mode: multiply;
        }
        .orb-label {
          position: absolute;
          background: #fff;
          padding: 0.8rem 1.5rem;
          border-radius: 50px;
          font-weight: 900;
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 2px;
          box-shadow: 0 15px 35px rgba(0,0,0,0.1);
          border: 1px solid #eee;
        }
        @keyframes orb-float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(20px, -30px) scale(1.05); }
        }

        .integration-features {
          display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; text-align: left;
        }
        .integration-heading {
          font-size: 4rem; font-weight: 900; letter-spacing: -3px; line-height: 1; margin-bottom: 2rem;
        }
        .cta-heading {
          font-size: 4.5rem; font-weight: 900; letter-spacing: -3px; margin-bottom: 2rem;
        }

        @media (max-width: 1024px) {
          .ecosystem-grid { grid-template-columns: 1fr; }
          .integration-section { flex-direction: column; text-align: center; }
          .integration-visual, .integration-content { width: 100%; }
          .tech-orb { width: 300px; height: 300px; margin: 0 auto; }
          .marquee-item { font-size: 3rem; }
          .integration-features { text-align: center; }
        }
        
        @media (max-width: 768px) {
          .preview-grid { justify-content: space-between; gap: 0; flex-wrap: nowrap; width: 100%; }
          .stat-box h3 { font-size: 1.6rem; }
          .stat-box p { font-size: 0.5rem; letter-spacing: 0; }
          .hero h1 { font-size: 3.2rem; margin-bottom: 0.8rem; }
          .hero p { font-size: 1rem; margin-bottom: 1.2rem; }
          .hero-buttons { margin-bottom: 1.5rem; gap: 1rem; }
          .btn-large { padding: 1rem 2rem; width: max-content; display: inline-block; margin: 0 auto; text-align: center; white-space: nowrap; }
          .integration-features { grid-template-columns: 1fr; }
          .cta-heading { font-size: 3.2rem; }
          .ecosystem-header h2 { font-size: 2.8rem; }
          .integration-heading { font-size: 3rem; }
          .hero { padding-top: 140px; height: auto; padding-bottom: 60px; }
        }
      `}</style>

      <section className="hero">

        <div className="hero-content" data-aos="fade-right">
          <h1>Future<br />Focused.</h1>
          <p>Empowering the next generation of digital architects through elite technical education and industry-integrated training. Transforming ambitious minds into global tech leaders, right from the heart of Bangalore.</p>
          <div className="hero-buttons">
            <Link to="/courses" className="btn-cta-white">Explore Programs</Link>
            <Link to="/contact" className="btn-cta-alt">Get Started</Link>
          </div>

          <div className="preview-grid">
            <div className="stat-box"><h3>10K+</h3><p>ALUMNI</p></div>
            <div className="stat-box"><h3>95%</h3><p>PLACEMENTS</p></div>
            <div className="stat-box"><h3>500+</h3><p>PARTNERS</p></div>
          </div>
        </div>

        <div className="hero-carousel">
          <div className="carousel-track" ref={trackRef}>
            {carouselImages.map((img, i) => (
              <div
                key={i}
                className="carousel-slide"
                style={{ backgroundImage: `url('${img}')` }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Ecosystem Pillars */}
      <section className="ecosystem-section">
        <div className="ecosystem-header" data-aos="fade-up">
          <span className="section-tag">Strategic Foundation</span>
          <h2>The Digital Architecture of Eloss.</h2>
          <p style={{ color: '#888' }}>We operate at the intersection of technical mastery and professional excellence, providing a 360-degree ecosystem for the modern technologist.</p>
        </div>

        <div className="ecosystem-grid">
          {[
            { num: '01', icon: 'school', title: 'Elite Training', desc: 'Custom-crafted technical curriculum designed to bridge the gap between academic theory and industrial performance.' },
            { num: '02', icon: 'code_blocks', title: 'Live Labs', desc: 'Project-based immersive learning where students build real-world products under the guidance of industry architects.' },
            { num: '03', icon: 'rocket_launch', title: 'Career Launch', desc: 'Exclusive placement ecosystem with over 500+ global tech partners, ensuring our alumni lead the industry.' },
          ].map((eco, i) => (
            <div className="eco-card" key={i} data-aos="fade-up" data-aos-delay={i * 100}>
              <span className="eco-bg-number">{eco.num}</span>
              <span className="material-symbols-outlined eco-icon">{eco.icon}</span>
              <h3>{eco.title}</h3>
              <p>{eco.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Visionary Programs Marquee */}
      <section className="marquee-container">
        <div className="marquee-track">
          {[...Array(2)].map((_, i) => (
            <div className="marquee-item" key={i}>
              PYTHON <span>//</span> WEB DEV <span>//</span> TALLY ERP9 <span>//</span> GRAPHIC DESIGN <span>//</span> VIDEO EDITING <span>//</span> AI LABS <span>//</span>
            </div>
          ))}
        </div>
      </section>

      {/* Industry Integration Section */}
      <section className="integration-section">
        <div className="integration-visual" data-aos="zoom-in">
          <div className="tech-orb">
            <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800" alt="Tech" />
            <div className="orb-label" style={{ top: '10%', right: '-10%' }}>Real-time Collaboration</div>
            <div className="orb-label" style={{ bottom: '20%', left: '-15%' }}>Industrial Standards</div>
            <div className="orb-label" style={{ top: '50%', left: '-20%' }}>Global Network</div>
          </div>
        </div>
        <div className="integration-content" data-aos="fade-left">
          <span className="section-tag">Industrial Synergy</span>
          <h2 className="integration-heading">Engineered for<br />the 2030 Landscape.</h2>
          <p style={{ fontSize: '1.2rem', color: '#444', textAlign: 'justify', lineHeight: 1.8, marginBottom: '3rem' }}>
            We don't just teach code; we architect careers. Our methodology integrates current industrial workflows directly into the learning process, ensuring every Eloss graduate is "Day One Ready" for the world's most demanding tech environments.
          </p>
          <div className="integration-features">
            <div>
              <h4 style={{ fontWeight: 900, textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '2px', marginBottom: '1rem' }}>Expert-Led</h4>
              <p style={{ fontSize: '0.9rem', color: '#666' }}>Guided by senior architects with decades of experience in global tech delivery.</p>
            </div>
            <div>
              <h4 style={{ fontWeight: 900, textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '2px', marginBottom: '1rem' }}>Global Scope</h4>
              <p style={{ fontSize: '0.9rem', color: '#666' }}>Curriculum aligned with standards used by Fortune 500 companies and elite startups.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section style={{ padding: '120px 5%', textAlign: 'center', background: '#000', color: '#fff', overflow: 'hidden', position: 'relative' }}>
        <div className="floating-shape" style={{ width: '600px', height: '600px', bottom: '-300px', left: '50%', transform: 'translateX(-50%)', opacity: 0.1, background: '#00d2ff' }}></div>
        <div data-aos="zoom-in" style={{ position: 'relative', zIndex: 2 }}>
          <span className="section-tag" style={{ color: '#00d2ff' }}>Direct Trajectory</span>
          <h2 className="cta-heading">Begin Your<br />Transformation.</h2>
          <p style={{ maxWidth: '700px', margin: '0 auto 3rem', color: '#aaa', fontSize: '1.1rem' }}>
            The future belongs to those who build it. Join Eloss Technologies today and architect your legacy in the global digital landscape.
          </p>
          <Link to="/contact" className="btn-cta-white btn-large">Apply for Admission</Link>
        </div>
      </section>
    </>
  );
}

