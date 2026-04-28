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
          padding: 140px 10% 40px;
          position: relative;
          background: #fff;
          overflow: hidden;
          display: flex;
          gap: 4rem;
          align-items: center;
          border-bottom: 1px solid #eee;
        }
        .courses-header::before {
          content: "";
          position: absolute; top: 0; left: 0; width: 100%; height: 100%;
          background-image:
            linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px);
          background-size: 40px 40px; z-index: 1;
        }
        .header-visual { position: relative; width: 45%; z-index: 3; }
        .main-header-img {
          width: 100%; height: 320px;
          background-image: url('https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=1200');
          background-size: cover; background-position: center;
          border-radius: 20px; border: 1px solid #eee;
          box-shadow: 0 30px 60px rgba(0,0,0,0.1);
        }
        .header-content { width: 50%; position: relative; z-index: 3; }
        .courses-header h1 {
          font-size: 4rem; font-weight: 900;
          letter-spacing: -3px; line-height: 0.95;
          margin-bottom: 2rem; color: #000;
        }
        .tech-badge {
          position: absolute;
          background: rgba(255,255,255,0.95);
          backdrop-filter: blur(10px);
          border: 1px solid #eee;
          padding: 0.8rem 1.2rem; border-radius: 50px;
          font-size: 0.65rem; font-weight: 800;
          text-transform: uppercase; letter-spacing: 1px;
          display: flex; align-items: center; gap: 10px;
          box-shadow: 0 15px 35px rgba(0,0,0,0.08); z-index: 4;
          animation: float-badge 5s ease-in-out infinite alternate;
        }
        .tech-badge .material-symbols-outlined { font-size: 1.4rem; }
        .badge-tl { top: -20px; left: -20px; }
        .badge-tr { top: 30px; right: -40px; animation-delay: -2s; }
        .badge-bl { bottom: -25px; left: 20px; animation-delay: -4s; }
        .badge-br { bottom: 50px; right: -30px; animation-delay: -6s; }
        @keyframes float-badge {
          from { transform: translateY(0) scale(1); }
          to { transform: translateY(-10px) scale(1.05); }
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
          .courses-header { flex-direction: column-reverse; padding-top: 140px; text-align: center; }
          .header-visual, .header-content { width: 100%; }
          .main-header-img { height: 300px; }
          .courses-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 768px) {
          .courses-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <header className="courses-header">
        <div className="header-visual">
          <div className="main-header-img" data-aos="zoom-in"></div>
          <div className="tech-badge badge-tl" data-aos="fade-down" data-aos-delay="200">
            <span className="material-symbols-outlined" style={{ color: '#00d2ff' }}>bolt</span>
            Industry Integrated
          </div>
          <div className="tech-badge badge-tr" data-aos="fade-left" data-aos-delay="300">
            <span className="material-symbols-outlined" style={{ color: '#ffd700' }}>verified</span>
            Expert Certified
          </div>
          <div className="tech-badge badge-bl" data-aos="fade-up" data-aos-delay="400">
            <span className="material-symbols-outlined" style={{ color: '#ff5722' }}>rocket_launch</span>
            Career Focused
          </div>
          <div className="tech-badge badge-br" data-aos="fade-left" data-aos-delay="500">
            <span className="material-symbols-outlined" style={{ color: '#3f51b5' }}>public</span>
            Global Recognition
          </div>
        </div>
        <div className="header-content">
          <h1 data-aos="fade-left">Professional<br />Curriculum.</h1>
          <p data-aos="fade-left" data-aos-delay="100" style={{ color: '#666' }}>
            Expert-led technical training designed to bridge the gap between education and industrial performance. Join the visionaries of tomorrow.
          </p>
        </div>
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
