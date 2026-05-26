import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function CookiePolicy() {
  useEffect(() => {
    AOS.init({ duration: 900, once: true, offset: 80 });
  }, []);

  const cookieUsage = [
    { group: 'Forms, Classes, Legal Pages', type: 'Essential / Strictly Necessary', purpose: 'Core functionality, save progress, remember consent.' },
    { group: 'Blog, News, Services', type: 'Performance & Analytics', purpose: 'Track visits, analyze engagement, improve offerings.' },
    { group: 'Careers, Portfolio, Contact', type: 'Functionality', purpose: 'Remember choices, pre-fill data, save search filters.' },
    { group: 'Home, Services', type: 'Targeting / Advertising', purpose: 'Deliver relevant ads, measure ad effectiveness.' },
  ];

  return (
    <>
      <style>{`
        .cookie-hero {
          padding: 140px 5% 80px;
          background: #000;
          color: #fff;
          position: relative;
          overflow: hidden;
        }
        .cookie-hero::before {
          content: "";
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
          background-image: radial-gradient(circle at 2px 2px, rgba(255,255,255,0.04) 1px, transparent 0);
          background-size: 36px 36px;
          z-index: 0;
        }
        .cookie-hero-inner { position: relative; z-index: 1; max-width: 800px; }
        .cookie-hero h1 {
          font-size: 4.5rem; font-weight: 900;
          letter-spacing: -3px; line-height: 1.1;
          margin-bottom: 1.5rem;
        }
        .cookie-hero h1 span { color: #00d2ff; }
        .cookie-hero p { font-size: 1.15rem; color: #aaa; line-height: 1.8; text-align: justify; max-width: 700px; }
        
        .cookie-section { padding: 40px 5%; background: #fff; }
        .cookie-section-alt { padding: 40px 5%; background: #f9f9f9; }
        
        .cookie-content-wrapper {
          max-width: 900px;
          margin: 0 auto;
        }
        
        .cookie-block {
          margin-bottom: 2rem;
        }
        
        .cookie-block h2 {
          font-size: 2.2rem;
          font-weight: 800;
          letter-spacing: -1px;
          margin-bottom: 1.5rem;
          color: inherit;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        
        .cookie-block h2 .num-badge {
          background: #00d2ff;
          color: #000;
          width: 40px; height: 40px;
          border-radius: 8px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
        }

        .cookie-block h3 {
          font-size: 1.4rem;
          font-weight: 700;
          margin: 2rem 0 1rem;
          color: #00d2ff;
        }
        
        .cookie-block p {
          font-size: 1.05rem;
          line-height: 1.8;
          color: #555;
          margin-bottom: 1.2rem;
          text-align: justify;
        }

        .cookie-list {
          list-style: none;
          padding: 0;
          margin: 1.5rem 0;
        }
        
        .cookie-list li {
          font-size: 1.05rem;
          line-height: 1.8;
          color: #555;
          margin-bottom: 1rem;
          padding-left: 1.8rem;
          position: relative;
        }

        .cookie-list li::before {
          content: "▹";
          position: absolute;
          left: 0; top: 0;
          color: #00d2ff;
          font-weight: bold;
          font-size: 1.2rem;
        }
        
        .cookie-list li strong {
          color: #222;
        }
        
        /* Table styles */
        .cookie-table-wrap {
          overflow-x: auto;
          border-radius: 12px;
          border: 1px solid #eee;
          margin: 2rem 0;
          box-shadow: 0 10px 30px rgba(0,0,0,0.02);
        }
        
        .cookie-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.95rem;
          background: #fff;
        }
        
        .cookie-table thead tr { background: #f1f5f9; }
        .cookie-table thead th {
          padding: 1.2rem 1.5rem;
          text-align: left;
          color: #000;
          font-weight: 800;
          white-space: nowrap;
          border-bottom: 2px solid #e2e8f0;
        }
        
        .cookie-table tbody tr { border-bottom: 1px solid #eee; transition: 0.2s; }
        .cookie-table tbody tr:hover { background: #f8fafc; }
        .cookie-table tbody td { padding: 1.2rem 1.5rem; color: #555; }
        .cookie-table tbody td:first-child { font-weight: 700; color: #222; }
        
        .contact-box {
          background: #000;
          color: #fff;
          padding: 3rem;
          border-radius: 20px;
          margin-top: 2rem;
          border: 1px solid #222;
        }
        
        .contact-box h3 {
          color: #fff;
          font-size: 1.8rem;
          margin: 0 0 1.5rem 0;
        }
        
        .contact-row {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 1rem;
          font-size: 1.05rem;
          color: #aaa;
        }
        
        .contact-row span.material-symbols-outlined {
          color: #00d2ff;
          font-size: 1.5rem;
        }
        
        .contact-row a {
          color: #00d2ff;
          text-decoration: none;
          transition: 0.3s;
        }
        
        .contact-row a:hover {
          color: #fff;
        }

        .browser-links {
          display: flex;
          gap: 1.5rem;
          flex-wrap: wrap;
          margin-top: 1.5rem;
        }
        
        .browser-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #f1f5f9;
          color: #333;
          padding: 0.8rem 1.5rem;
          border-radius: 50px;
          text-decoration: none;
          font-weight: 700;
          font-size: 0.9rem;
          transition: 0.3s;
        }
        
        .browser-btn:hover {
          background: #e2e8f0;
          transform: translateY(-2px);
        }

        @media (max-width: 768px) {
          .cookie-hero h1 { font-size: 3rem; }
          .cookie-block h2 { font-size: 1.8rem; }
        }
      `}</style>

      {/* Hero */}
      <section className="cookie-hero">
        <div className="cookie-hero-inner">
          <div className="section-tag" style={{ color: '#00d2ff', marginBottom: '1.5rem' }} data-aos="fade-up">Legal Information</div>
          <h1 data-aos="fade-up" data-aos-delay="100">Global Cookie <br/><span>Policy</span></h1>
          <p data-aos="fade-up" data-aos-delay="200">
            At ELoss Technologies ("we," "our," or "us"), we believe in being clear and open about how we collect and use data related to you. This Cookie Policy explains what cookies are, how we use them, and the choices you have regarding their deployment.
          </p>
        </div>
      </section>

      {/* Main Content Sections */}
      <section className="cookie-section">
        <div className="cookie-content-wrapper">
          
          <div className="cookie-block" data-aos="fade-up">
            <h2><span className="num-badge">1</span> What Are Cookies?</h2>
            <p>Cookies are small text files that are downloaded to your computer or mobile device when you visit a website. They allow the website to recognize your device and store some information about your preferences or past actions.</p>
            <ul className="cookie-list">
              <li><strong>First-party cookies:</strong> Set directly by ELoss Technologies.</li>
              <li><strong>Third-party cookies:</strong> Set by our trusted partners and service providers (like analytics or embedded video platforms).</li>
            </ul>
          </div>

          <div className="cookie-block" data-aos="fade-up">
            <h2><span className="num-badge">2</span> How We Use Cookies Across Our Pages</h2>
            <p>We use cookies to ensure our digital ecosystem works smoothly, securely, and efficiently. Depending on which page you are visiting, different types of cookies may be deployed:</p>
            
            <h3>1.1. Essential / Strictly Necessary Cookies</h3>
            <p>These cookies are absolutely necessary to provide you with services available through our website. Without them, core parts of our site cannot function.</p>
            <p><strong>Where they matter most:</strong> Digital Forms (to remember your inputs as you move between steps), Classes (to manage your secure portal login state), and our legal pages like Terms & Conditions and Privacy Policy to remember your consent preferences.</p>

            <h3>1.2. Performance & Analytics Cookies</h3>
            <p>These cookies collect information about how visitors use our website, like which pages are visited most often or if any error messages occur.</p>
            <p><strong>Where they matter most:</strong> Blog, Company News, and Services. This data helps us understand what content our audience finds most valuable so we can improve our offerings. All data is aggregated and anonymized.</p>

            <h3>1.3. Functionality Cookies</h3>
            <p>These cookies allow our website to remember choices you make (such as your username, language, or the region you are in) and provide enhanced, more personal features.</p>
            <p><strong>Where they matter most:</strong> Careers (remembering your search filters or partial job applications), Portfolio (saving your viewing preferences), and Contact Us (pre-filling basic details for your convenience).</p>

            <h3>1.4. Targeting / Advertising Cookies</h3>
            <p>These cookies are used to deliver advertisements more relevant to you and your interests. They are also used to limit the number of times you see an advertisement and help measure the effectiveness of advertising campaigns.</p>
            <p><strong>Where they matter most:</strong> Home and Services. We may use these to understand your initial intent so we can highlight relevant technological solutions when you browse our site.</p>
          </div>

        </div>
      </section>

      <section className="cookie-section-alt">
        <div className="cookie-content-wrapper">
          
          <div className="cookie-block" data-aos="fade-up">
            <h2><span className="num-badge">3</span> Breakdown of Cookie Usage by Page Type</h2>
            <div className="cookie-table-wrap">
              <table className="cookie-table">
                <thead>
                  <tr>
                    <th>Page Group</th>
                    <th>Primary Cookie Types Used</th>
                    <th>Purpose</th>
                  </tr>
                </thead>
                <tbody>
                  {cookieUsage.map((row, i) => (
                    <tr key={i}>
                      <td>{row.group}</td>
                      <td>{row.type}</td>
                      <td>{row.purpose}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="cookie-block" data-aos="fade-up">
            <h2><span className="num-badge">4</span> Your Choices: Managing & Disabling Cookies</h2>
            <p>You have the right to decide whether to accept or reject cookies.</p>
            
            <h3>1.5. Our Cookie Consent Banner</h3>
            <p>When you first visit our website, a pop-up cookie banner will appear allowing you to opt-in or opt-out of non-essential (Analytics and Targeting) cookies. Essential cookies cannot be disabled as the site cannot function safely without them.</p>

            <h3>1.6. Browser Controls</h3>
            <p>You can set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our website, though your access to some functionality and areas of our website may be severely restricted (especially on interactive pages like Classes and Digital Forms).</p>
            <p>To find out how to manage cookies on popular browsers, use the links below:</p>
            
            <div className="browser-links">
              <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noreferrer" className="browser-btn">Google Chrome</a>
              <a href="https://support.microsoft.com/en-us/microsoft-edge" target="_blank" rel="noreferrer" className="browser-btn">Microsoft Edge</a>
              <a href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop" target="_blank" rel="noreferrer" className="browser-btn">Mozilla Firefox</a>
              <a href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac" target="_blank" rel="noreferrer" className="browser-btn">Apple Safari</a>
            </div>
          </div>

        </div>
      </section>

      <section className="cookie-section">
        <div className="cookie-content-wrapper">

          <div className="cookie-block" data-aos="fade-up">
            <h2><span className="num-badge">5</span> Updates to This Policy</h2>
            <p>We may update this Cookie Policy from time to time in order to reflect changes to the cookies we use or for other operational, legal, or regulatory reasons. Please re-visit this Cookie Policy regularly to stay informed about our use of cookies and related technologies.</p>
          </div>

          {/* Contact Information */}
          <div className="contact-box" data-aos="fade-up">
            <h3>6. Contact Us</h3>
            <p style={{ color: '#aaa', marginBottom: '2rem' }}>If you have any questions about our use of cookies or other technologies, please reach out to us via our designated page:</p>
            
            <div className="contact-row">
              <span className="material-symbols-outlined">location_on</span>
              <span>Bengaluru, Karnataka India</span>
            </div>
            <div className="contact-row">
              <span className="material-symbols-outlined">mail</span>
              <a href="mailto:elosstechnologies@gmail.com">elosstechnologies@gmail.com</a>
            </div>
            <div className="contact-row">
              <span className="material-symbols-outlined">language</span>
              <a href="https://www.elosstechnologies.com" target="_blank" rel="noopener noreferrer">www.elosstechnologies.com</a>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
