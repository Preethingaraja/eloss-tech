import { useEffect, useRef } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Contact() {
  const nameRef = useRef(null);
  const courseRef = useRef(null);
  const messageRef = useRef(null);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  function sendToWhatsApp() {
    const name = nameRef.current.value;
    const course = courseRef.current.value;
    const message = messageRef.current.value;
    const phoneNumber = '919380484775';

    if (!name || !message) {
      alert('Please define your identity and message.');
      return;
    }

    const text = `*New Enquiry from ELOSS Site*%0A%0A*Name:* ${name}%0A*Interest:* ${course}%0A*Message:* ${message}`;
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${text}`;
    window.open(whatsappURL, '_blank');
  }

  return (
    <>
      <style>{`
        .contact-hero {
          padding: 160px 5% 80px;
          background: #fff;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 6rem;
          align-items: flex-start;
        }
        .contact-info h1 {
          font-size: 5rem; font-weight: 900;
          letter-spacing: -4px; line-height: 0.9; margin-bottom: 2rem;
        }
        .info-block { margin-top: 3rem; display: flex; flex-direction: column; gap: 2rem; }
        .info-item { display: flex; gap: 20px; align-items: flex-start; }
        .info-item .material-symbols-outlined { font-size: 2rem; color: #000; }
        .info-item div h4 { font-size: 0.7rem; font-weight: 900; text-transform: uppercase; letter-spacing: 2px; color: #999; margin-bottom: 5px; }
        .info-item div p { font-size: 1.1rem; font-weight: 600; color: #000; margin: 0; }
        .enquiry-card {
          background: #f9f9f9; padding: 3.5rem;
          border-radius: 30px; border: 1px solid #eee;
          box-shadow: 0 40px 80px rgba(0,0,0,0.05);
        }
        .form-group { margin-bottom: 2rem; position: relative; }
        .form-group label { display: block; font-size: 0.7rem; font-weight: 900; text-transform: uppercase; letter-spacing: 2px; color: #666; margin-bottom: 10px; }
        .form-group input, .form-group select, .form-group textarea {
          width: 100%; background: none; border: none;
          border-bottom: 2px solid #ddd; padding: 10px 0;
          font-size: 1rem; font-family: inherit; color: #000;
          outline: none; transition: 0.3s;
        }
        .form-group input:focus, .form-group select:focus, .form-group textarea:focus { border-color: #000; }
        .btn-send {
          width: fit-content; background: #000; color: #fff;
          padding: 1rem 2rem; border: none; border-radius: 12px;
          font-weight: 900; text-transform: uppercase; letter-spacing: 2px;
          cursor: pointer; display: flex; align-items: center;
          justify-content: center; gap: 12px; transition: 0.4s;
          font-family: inherit; font-size: 0.9rem;
        }
        .btn-send:hover { transform: translateY(-5px); box-shadow: 0 20px 40px rgba(0,0,0,0.2); background: #25d366; }
        .map-section { padding: 0 5% 80px; }
        .map-wrapper {
          width: 100%; height: 400px; background: #eee;
          border-radius: 30px; display: flex; align-items: center;
          justify-content: center; overflow: hidden; border: 1px solid #ddd;
          position: relative;
        }
        .map-wrapper img { width: 100%; height: 100%; object-fit: cover; filter: grayscale(100%) brightness(0.8); }
        .map-label {
          position: absolute; background: #000; color: #fff;
          padding: 1rem 2rem; border-radius: 12px;
          font-weight: 800; font-size: 0.8rem; letter-spacing: 2px;
        }
        @media (max-width: 1024px) {
          .contact-hero { grid-template-columns: 1fr; gap: 4rem; }
          .contact-info h1 { font-size: 3.5rem; }
        }
      `}</style>

      <section className="contact-hero">
        <div className="contact-info" data-aos="fade-right">
          <span className="section-tag">Connection</span>
          <h1>Direct<br />Interface.</h1>
          <p style={{ color: '#666', marginTop: '1.5rem', textAlign: 'justify' }}>
            Reach out to the architects of ELOSS Technologies. Whether you're an aspiring student or a business visionary, we're here to facilitate your digital journey.
          </p>
          <div className="info-block">
            <div className="info-item">
              <span className="material-symbols-outlined">location_on</span>
              <div><h4>Headquarters</h4><p>Bengaluru, Karnataka, India</p></div>
            </div>
            <div className="info-item">
              <span className="material-symbols-outlined">call</span>
              <div><h4>Direct Line</h4><p>+91 93804 84775</p></div>
            </div>
            <div className="info-item">
              <span className="material-symbols-outlined">mail</span>
              <div><h4>Digital Mail</h4><p>elosstechnologies@gmail.com</p></div>
            </div>
          </div>
        </div>

        <div className="enquiry-card" data-aos="fade-left">
          <h3 style={{ fontWeight: 900, fontSize: '1.8rem', marginBottom: '2rem', letterSpacing: '-1px' }}>Send Enquiry</h3>

          <div className="form-group">
            <label>Full Name</label>
            <input type="text" ref={nameRef} placeholder="Architect Name" />
          </div>

          <div className="form-group">
            <label>Course of Interest</label>
            <select ref={courseRef}>
              <option value="General Inquiry">Select Program</option>
              <option value="Computer Basics">Computer Basics</option>
              <option value="Tally ERP9">Tally ERP9</option>
              <option value="Graphic Design">Graphic Design</option>
              <option value="Video Editing">Video Editing</option>
              <option value="Python Programming">Python Programming</option>
            </select>
          </div>

          <div className="form-group">
            <label>Your Message</label>
            <textarea ref={messageRef} rows="3" placeholder="Define your vision..."></textarea>
          </div>

          <button className="btn-send" onClick={sendToWhatsApp}>
            <span className="material-symbols-outlined">chat</span>
            Send via WhatsApp
          </button>

          <p style={{ fontSize: '0.7rem', color: '#999', marginTop: '1.5rem', textAlign: 'center', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Secure One-to-One Communication Active
          </p>
        </div>
      </section>

      <section className="map-section" data-aos="zoom-in">
        <div className="map-wrapper">
          <img
            src="https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&q=80&w=1920"
            alt="Bengaluru Tech Park"
          />
          <div className="map-label">BENGALURU HUB</div>
        </div>
      </section>
    </>
  );
}
