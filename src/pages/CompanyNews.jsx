import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function CompanyNews() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <>
      <style>{`
        .news-header {
          padding: 140px 10% 100px;
          text-align: center;
          background: linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=2000') center/cover;
          color: #fff;
          position: relative;
        }
        .news-header h1 {
          font-size: 4rem;
          font-weight: 900;
          letter-spacing: -2px;
          margin-bottom: 1rem;
          color: #fff;
        }
        .news-header p {
          color: #e0e0e0;
          font-size: 1.1rem;
          max-width: 600px;
          margin: 0 auto;
          text-align: center;
        }
        .news-content {
          padding: 120px 5%;
          text-align: center;
          min-height: 40vh;
        }
        @media (max-width: 768px) {
          .news-header { padding: 100px 5% 60px; }
          .news-header h1 { font-size: 2.5rem; }
          .news-header p { font-size: 1rem; }
          .news-content { padding: 60px 5%; }
        }
      `}</style>
      <header className="news-header">
        <h1 data-aos="fade-up">Company News.</h1>
        <p data-aos="fade-up" data-aos-delay="100">Latest updates, product launches, and news from Eloss Technologies.</p>
      </header>
      <section className="news-content">
        <h2>Stay tuned for our upcoming announcements!</h2>
      </section>
    </>
  );
}
