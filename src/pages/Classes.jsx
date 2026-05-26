import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Classes() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <>
      <style>{`
        .classes-header {
          padding: 140px 10% 100px;
          text-align: center;
          background: linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=2000') center/cover;
          color: #fff;
          position: relative;
        }
        .classes-header h1 {
          font-size: 4rem;
          font-weight: 900;
          letter-spacing: -2px;
          margin-bottom: 1rem;
          color: #fff;
        }
        .classes-header p {
          color: #e0e0e0;
          font-size: 1.1rem;
          max-width: 600px;
          margin: 0 auto;
          text-align: center;
        }
        .classes-content {
          padding: 120px 5%;
          text-align: center;
          min-height: 40vh;
        }
        @media (max-width: 768px) {
          .classes-header { padding: 100px 5% 60px; }
          .classes-header h1 { font-size: 2.5rem; }
          .classes-header p { font-size: 1rem; }
          .classes-content { padding: 60px 5%; }
        }
      `}</style>

      <header className="classes-header">
        <h1 data-aos="fade-up">Professional Classes.</h1>
        <p data-aos="fade-up" data-aos-delay="100">
          Intensive, hands-on classes designed to elevate your technical skills.
        </p>
      </header>

      <section className="classes-content">
        <h2 data-aos="fade-up">New classes coming soon.</h2>
      </section>
    </>
  );
}
