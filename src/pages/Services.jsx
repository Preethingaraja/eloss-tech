import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const servicesList = [
  {
    title: 'ATS Friendly Resume/CV Building',
    price: '₨: ₹₹₹/-',
    buttonText: 'Buy Now',
    img: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=800'
  },
  {
    title: 'Mini And Major Project Documentation',
    price: '₨: ₹₹₹/-',
    buttonText: 'Buy Now',
    img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800'
  },
  {
    title: 'Start-Ups Organization Documentation',
    price: '₨: ₹₹₹/-',
    buttonText: 'Buy Now',
    img: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&q=80&w=800'
  },
  {
    title: 'Web Development',
    price: '₨: ₹₹₹/-',
    buttonText: 'Buy Now',
    img: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800'
  }
];

export default function Services() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <>
      <style>{`
        .services-header {
          padding: 140px 10% 100px;
          text-align: center;
          background: linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=2000') center/cover;
          color: #fff;
        }
        .services-header h1 {
          font-size: 4rem;
          font-weight: 900;
          letter-spacing: -2px;
          margin-bottom: 1rem;
          color: #fff;
        }
        .services-header p {
          color: #e0e0e0;
          font-size: 1.1rem;
          max-width: 600px;
          margin: 0 auto;
          text-align: center;
        }
        
        /* Services Section */
        .services-section {
          background: #f4f4f4;
          padding: 50px 5% 80px;
        }
        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 30px;
          max-width: 1200px;
          margin: 0 auto;
        }
        .service-card {
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
        .service-card:hover {
          transform: translateY(-5px);
        }
        .service-img {
          width: 100%;
          height: 200px;
          object-fit: cover;
          border-bottom: 1px solid #eee;
        }
        .service-content {
          padding: 30px 20px;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          flex-grow: 1;
        }
        .service-card h4 {
          font-family: 'Georgia', serif;
          font-size: 1.4rem;
          font-weight: 800;
          color: #222;
          margin-bottom: 20px;
          line-height: 1.3;
        }
        .service-price {
          font-size: 1.1rem;
          font-weight: 800;
          color: #000;
          margin-top: auto;
          margin-bottom: 20px;
        }
        .btn-buy-service {
          background: #050505;
          color: #fff;
          width: 100%;
          padding: 12px 0;
          text-decoration: none;
          font-size: 0.95rem;
          font-weight: 600;
          border-radius: 4px;
          transition: background 0.3s;
        }
        .btn-buy-service:hover {
          background: #333;
        }
        @media (max-width: 768px) {
          .services-header { padding: 100px 5% 60px; }
          .services-header h1 { font-size: 2.5rem; }
          .services-header p { font-size: 1rem; }
          .services-section { padding: 40px 5% 60px; }
        }
      `}</style>

      <header className="services-header">
        <h1 data-aos="fade-up">Our Services.</h1>
        <p data-aos="fade-up" data-aos-delay="100">
          Professional solutions tailored to accelerate your career and streamline your business operations.
        </p>
      </header>

      <section className="services-section">
        <div className="services-grid">
          {servicesList.map((svc, i) => (
            <div className="service-card" key={i} data-aos="fade-up" data-aos-delay={i * 100}>
              <img src={svc.img} alt={svc.title} className="service-img" />
              <div className="service-content">
                <h4>{svc.title}</h4>
                <p className="service-price"><strong>{svc.price}</strong></p>
                <a href="/contact" className="btn-buy-service">{svc.buttonText}</a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
