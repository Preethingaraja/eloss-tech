import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const portfolioItems = [
  {
    title: 'Photography',
    price: '₨: ₹₹₹/-',
    buttonText: 'Enquiry now',
    img: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=800'
  }
];

export default function Portfolio() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <>
      <style>{`
        .portfolio-header {
          padding: 140px 10% 100px;
          text-align: center;
          background: linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2000') center/cover;
          color: #fff;
        }
        .portfolio-header h1 {
          font-size: 4rem;
          font-weight: 900;
          letter-spacing: -2px;
          margin-bottom: 1rem;
          color: #fff;
        }
        .portfolio-header p {
          color: #e0e0e0;
          font-size: 1.1rem;
          max-width: 600px;
          margin: 0 auto;
          text-align: center;
        }
        
        .portfolio-section {
          background: #f4f4f4;
          padding: 80px 5%;
        }
        .portfolio-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 350px));
          gap: 40px;
          justify-content: center;
          max-width: 1200px;
          margin: 0 auto;
        }
        .portfolio-card {
          background: #fff;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0,0,0,0.05);
          transition: transform 0.3s;
        }
        .portfolio-card:hover {
          transform: translateY(-5px);
        }
        .portfolio-img {
          width: 100%;
          height: 250px;
          object-fit: cover;
          border-bottom: 1px solid #eee;
        }
        .portfolio-content {
          padding: 30px 20px;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          flex-grow: 1;
        }
        .portfolio-card h4 {
          font-family: 'Georgia', serif;
          font-size: 1.6rem;
          font-weight: 800;
          color: #222;
          margin-bottom: 20px;
        }
        .portfolio-price {
          font-size: 1.2rem;
          font-weight: 800;
          color: #000;
          margin-top: auto;
          margin-bottom: 25px;
        }
        .btn-enquire-portfolio {
          background: #050505;
          color: #fff;
          width: 100%;
          padding: 14px 0;
          text-decoration: none;
          font-size: 1rem;
          font-weight: 600;
          border-radius: 4px;
          transition: background 0.3s;
        }
        .btn-enquire-portfolio:hover {
          background: #333;
        }
        @media (max-width: 768px) {
          .portfolio-header { padding: 100px 5% 60px; }
          .portfolio-header h1 { font-size: 2.5rem; }
          .portfolio-header p { font-size: 1rem; }
          .portfolio-section { padding: 40px 5% 60px; }
        }
      `}</style>

      <header className="portfolio-header">
        <h1 data-aos="fade-up">Our Portfolio.</h1>
        <p data-aos="fade-up" data-aos-delay="100">
          A showcase of our exceptional creative and technical projects.
        </p>
      </header>

      <section className="portfolio-section">
        <div className="portfolio-grid">
          {portfolioItems.map((item, i) => (
            <div className="portfolio-card" key={i} data-aos="fade-up" data-aos-delay={i * 100}>
              <img src={item.img} alt={item.title} className="portfolio-img" />
              <div className="portfolio-content">
                <h4>{item.title}</h4>
                <p className="portfolio-price"><strong>{item.price}</strong></p>
                <a href="/contact" className="btn-enquire-portfolio">{item.buttonText}</a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
