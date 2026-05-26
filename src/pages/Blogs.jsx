import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';


const upcomingCourses = [
  {
    title: 'Photography',
    price: '₨: ₹₹₹/-',
    buttonText: 'enquiry now',
    img: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=800'
  },
  {
    title: 'App Development',
    price: '₨: ₹₹₹/-',
    buttonText: 'Enquiry now',
    img: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800'
  },
  {
    title: 'My SQL',
    price: '₨: ₹₹₹/-',
    buttonText: 'Enquiry Now',
    img: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&q=80&w=800'
  }
];

export default function Blogs() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <>
      <style>{`
        /* Blog Header */
        .blog-header {
          padding: 140px 10% 100px;
          text-align: center;
          background: linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=2000') center/cover;
          color: #fff;
          position: relative;
        }
        .blog-header h1 {
          font-size: 4rem;
          font-weight: 900;
          letter-spacing: -2px;
          margin-bottom: 1rem;
          color: #fff;
        }

        /* Up-Coming Courses Section */
        .upcoming-section {
          background: #f4f4f4;
          padding: 80px 5%;
          text-align: center;
        }
        .upcoming-title {
          font-family: 'Georgia', serif;
          font-size: 2.5rem;
          font-weight: 800;
          color: #222;
          margin-bottom: 50px;
        }
        .upcoming-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
          max-width: 1200px;
          margin: 0 auto;
        }
        .upcoming-card {
          background: transparent;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .upcoming-img {
          width: 100%;
          height: 220px;
          object-fit: cover;
          margin-bottom: 20px;
          background-color: #fff;
        }
        .upcoming-card h4 {
          font-family: 'Georgia', serif;
          font-size: 1.8rem;
          font-weight: 800;
          color: #222;
          margin-bottom: 25px;
        }
        .upcoming-price {
          font-size: 1rem;
          font-weight: 800;
          color: #000;
          margin-bottom: 20px;
        }
        .btn-enquire {
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
        .btn-enquire:hover {
          background: #333;
        }
        @media (max-width: 768px) {
          .blog-header { padding: 100px 5% 60px; }
          .blog-header h1 { font-size: 2.5rem; }
          .upcoming-title { font-size: 2rem; margin-bottom: 30px; }
          .upcoming-grid { grid-template-columns: 1fr; gap: 40px; }
        }
      `}</style>

      <header className="blog-header">
        <h1 data-aos="fade-up">Our Blog.</h1>
      </header>

      <section className="upcoming-section">
        <h2 className="upcoming-title">Up-Coming Courses</h2>
        <div className="upcoming-grid">
          {upcomingCourses.map((course, i) => (
            <div className="upcoming-card" key={i} data-aos="fade-up" data-aos-delay={i * 100}>
              <img src={course.img} alt={course.title} className="upcoming-img" />
              <h4>{course.title}</h4>
              <p className="upcoming-price"><strong>{course.price}</strong></p>
              <a href="/contact" className="btn-enquire">{course.buttonText}</a>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
