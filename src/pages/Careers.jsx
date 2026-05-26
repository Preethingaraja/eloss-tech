import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Careers() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <>
      <style>{`
        .careers-header {
          padding: 140px 10% 100px;
          text-align: center;
          background: linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=2000') center/cover;
          color: #fff;
          position: relative;
        }
        .careers-header h1 {
          font-size: 4rem;
          font-weight: 900;
          letter-spacing: -2px;
          margin-bottom: 1rem;
          color: #fff;
        }
        .careers-header p {
          color: #e0e0e0;
          font-size: 1.1rem;
          max-width: 600px;
          margin: 0 auto;
          text-align: center;
        }
        .careers-content {
          padding: 120px 5%;
          text-align: center;
          min-height: 40vh;
        }
        @media (max-width: 768px) {
          .careers-header { padding: 100px 5% 60px; }
          .careers-header h1 { font-size: 2.5rem; }
          .careers-header p { font-size: 1rem; }
          .careers-content { padding: 60px 5%; }
        }
      `}</style>
      <header className="careers-header">
        <h1 data-aos="fade-up">Careers.</h1>
        <p data-aos="fade-up" data-aos-delay="100">Join our team of visionaries and builders.</p>
      </header>
      <section className="careers-content">
        <h2>Currently no open positions. Check back later!</h2>
      </section>
    </>
  );
}
