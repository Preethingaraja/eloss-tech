import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const courses = [
  { title: 'Computer Basics', desc: 'Master fundamental computer operations, Windows environment, and the MS Office Suite.', img: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=800', status: 'available', statusLabel: 'Available' },
  { title: 'Tally ERP9', desc: 'Comprehensive training in leading business management software. Master GST and accounting.', img: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=800', status: 'multiple', statusLabel: 'Multiple' },
  { title: 'Graphic Design', desc: 'Master visual communication and tools like Photoshop, Illustrator, and Canva.', img: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=800', status: 'limited', statusLabel: 'Limited' },
  { title: 'Video Editing', desc: 'Master professional video editing workflows, color grading, and special effects.', img: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&q=80&w=800', status: 'full', statusLabel: 'Full' },
  { title: 'Business Development', desc: 'Learn strategic planning, market analysis, networking, and high-conversion sales.', img: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800', status: 'available', statusLabel: 'Available' },
  { title: 'Entrepreneurship', desc: 'Build your startup foundation. Cover leadership, financial planning, and risk management.', img: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&q=80&w=800', status: 'multiple', statusLabel: 'Multiple' },
  { title: 'Website Development', desc: 'Full-stack training in HTML5, CSS3, JavaScript, and modern frameworks.', img: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800', status: 'limited', statusLabel: 'Limited' },
  { title: 'Digital Marketing', desc: 'Dominate the digital space. Learn SEO, Social Media Marketing, PPC, and Content Strategy.', img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800', status: 'available', statusLabel: 'Available' },
  { title: 'Python Programming', desc: 'The language of AI. Comprehensive Python training from basic syntax to advanced ML.', img: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800', status: 'full', statusLabel: 'Full' },
  { title: 'Medical Billing', desc: 'Specialize in healthcare admin. Learn medical coding and insurance processing.', img: 'https://images.unsplash.com/photo-1708449903767-c4e97772c26e?w=500&auto=format&fit=crop&q=60', status: 'available', statusLabel: 'Available' },
  { title: 'Spiritual Reality', desc: 'Explore meditation techniques, mindfulness, and principles of inner well-being.', img: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800', status: 'multiple', statusLabel: 'Multiple' },
  { title: 'Yoga', desc: 'Traditional yoga classes focusing on asanas, pranayama, and holistic health.', img: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800', status: 'available', statusLabel: 'Available' },
];

export default function Courses() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <>
      <style>{`
        .courses-header {
          padding: 140px 10% 100px;
          text-align: center;
          background: linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=2000') center/cover;
          color: #fff;
          position: relative;
        }
        .courses-header h1 {
          font-size: 4rem;
          font-weight: 900;
          letter-spacing: -2px;
          margin-bottom: 1rem;
          color: #fff;
        }
        .courses-header p {
          color: #e0e0e0;
          font-size: 1.1rem;
          max-width: 600px;
          margin: 0 auto;
          text-align: center;
        }
        .courses-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 3rem;
          padding: 80px 5%;
        }
        .course-card {
          background: #fff; border: 1px solid #eee;
          border-radius: 12px; overflow: hidden;
          transition: 0.4s cubic-bezier(0.4,0,0.2,1);
          display: flex; flex-direction: column; cursor: pointer;
        }
        .course-card:hover { transform: translateY(-5px); border-color: #000; }
        .course-img {
          width: 100%; height: 220px;
          background-size: cover; background-position: center;
          transition: 0.6s ease; border-bottom: 1px solid #eee;
          filter: grayscale(0%);
        }
        .course-card:hover .course-img { filter: grayscale(100%); }
        .course-info { padding: 2rem; flex-grow: 1; display: flex; flex-direction: column; }
        .course-info h3 { font-size: 1.4rem; font-weight: 800; text-transform: uppercase; margin-bottom: 0.8rem; color: #000; }
        .course-info p { color: #666; font-size: 0.9rem; line-height: 1.5; margin-bottom: 1.5rem; flex-grow: 1; text-align: justify; }
        .course-meta { display: flex; justify-content: space-between; align-items: center; padding-top: 1rem; border-top: 1px solid #eee; margin-bottom: 1rem; }
        .slot-status { display: flex; align-items: center; gap: 6px; font-size: 0.65rem; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; }
        .status-dot { width: 8px; height: 8px; border-radius: 50%; }
        .status-available { color: #00d2ff; }
        .status-available .status-dot { background: #00d2ff; box-shadow: 0 0 10px rgba(0,210,255,0.4); }
        .status-multiple { color: #4caf50; }
        .status-multiple .status-dot { background: #4caf50; box-shadow: 0 0 10px rgba(76,175,80,0.4); }
        .status-limited { color: #ffc107; }
        .status-limited .status-dot { background: #ffc107; box-shadow: 0 0 10px rgba(255,193,7,0.4); }
        .status-full { color: #f44336; }
        .status-full .status-dot { background: #f44336; box-shadow: 0 0 10px rgba(244,67,54,0.4); }
        .price { font-weight: 900; font-size: 1.1rem; color: #000; }
        .btn-buy {
          background: #000; color: #fff;
          display: inline-block; width: fit-content;
          padding: 0.4rem 0.8rem; border-radius: 4px;
          text-decoration: none; font-weight: 800;
          text-transform: uppercase; letter-spacing: 1px;
          font-size: 0.7rem; transition: 0.3s; align-self: center;
        }
        @media (max-width: 1024px) {
          .courses-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 768px) {
          .courses-header { padding: 100px 5% 60px; }
          .courses-header h1 { font-size: 2.5rem; }
          .courses-header p { font-size: 1rem; }
          .courses-grid { grid-template-columns: 1fr; padding: 40px 5%; }
        }
      `}</style>

      <header className="courses-header">
        <h1 data-aos="fade-up">Professional Courses.</h1>
        <p data-aos="fade-up" data-aos-delay="100">
          Expert-led technical training designed to bridge the gap between education and industrial performance.
        </p>
      </header>

      <section className="courses-grid">
        {courses.map((course, i) => (
          <div className="course-card" key={i}>
            <div className="course-img" style={{ backgroundImage: `url('${course.img}')` }}></div>
            <div className="course-info">
              <h3>{course.title}</h3>
              <p>{course.desc}</p>
              <div className="course-meta">
                <span className="price">₹₹₹/-</span>
                <div className={`slot-status status-${course.status}`}>
                  <span className="status-dot"></span>{course.statusLabel}
                </div>
              </div>
              <a href="#" className="btn-buy">Enroll Now</a>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
