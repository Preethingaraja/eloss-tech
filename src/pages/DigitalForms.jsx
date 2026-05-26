import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const formTypes = [
  { type: 'Payment Gateway', purpose: 'Collects money for products/fees.', feature: 'Secure PCI-compliant integration.' },
  { type: 'Application Form', purpose: 'On-boards employees or members.', feature: 'File upload for resumes/IDs.' },
  { type: 'Enquiry Form', purpose: 'Captures new leads and interests.', feature: 'Simple, high-conversion layout.' },
  { type: 'Grievances Form', purpose: 'Handles complaints or feedback.', feature: 'Tracking IDs for follow-ups.' },
  { type: 'Booking Form', purpose: 'Reserves physical items or spaces.', feature: 'Inventory/Capacity management.' },
  { type: 'Appointment Form', purpose: 'Schedules time on a calendar.', feature: 'Time-zone syncing & reminders.' },
  { type: 'Consultation Form', purpose: 'Deep-dive intake for experts.', feature: 'Multi-step "discovery" questions.' },
  { type: 'Contact Us Form', purpose: 'General communication bridge.', feature: 'Spam protection (re-CAPTCHA).' },
];

const integrations = [
  { type: 'CRM Integration', value: 'Auto-creates a "Deal" in Salesforce or HubSpot.' },
  { type: 'Automated PDF Generation', value: 'Converts form data into a branded PDF contract or receipt instantly.' },
  { type: 'Email Marketing', value: 'Adds the user to a specific "Nurture Sequence" based on their interests.' },
  { type: 'Analytics', value: 'Pushes data to a dashboard (Tableau/Excel Pro) to track submission trends.' },
];

const keyFeatures = [
  { icon: 'account_tree', color: '#00d2ff', title: 'Conditional Logic', desc: 'The form "thinks." If a user selects "Interested in a Quote," the form reveals pricing questions; if they select "Technical Support," it reveals a serial number field.' },
  { icon: 'verified', color: '#4caf50', title: 'Data Validation', desc: 'Prevents errors by ensuring emails have an @ symbol and phone numbers have the correct number of digits before the form can be submitted.' },
  { icon: 'upload_file', color: '#ffc107', title: 'File Uploads', desc: 'Users can attach photos, PDFs, or spreadsheets directly to their submission.' },
  { icon: 'draw', color: '#ff5722', title: 'E-Signatures', desc: 'Integration with tools like DocuSign or native signature pads allows for legally binding agreements.' },
  { icon: 'devices', color: '#9c27b0', title: 'Responsive Design', desc: 'Modern forms automatically resize to fit smartphones, tablets, or desktops.' },
];

const whySwitch = [
  { icon: 'bolt', color: '#00d2ff', title: 'Speed', desc: 'Information is transmitted instantly. No more waiting for mail or manual data entry.' },
  { icon: 'search', color: '#4caf50', title: 'Searchability', desc: 'Data is stored in databases or spreadsheets, making it searchable in seconds.' },
  { icon: 'eco', color: '#8bc34a', title: 'Environmentally Friendly', desc: 'Reduces paper waste and the physical footprint of filing cabinets.' },
  { icon: 'lock', color: '#ffc107', title: 'Security', desc: 'Digital forms can be encrypted and password-protected, offering better security than a stack of paper on a desk.' },
];

const elaborated = [
  {
    num: 'I', title: 'Payment Gateway Form', icon: 'payment', color: '#00d2ff',
    body: 'Professional forms must prioritize PCI-DSS Compliance. Integrating gateways like Stripe or PayPal within the form ensures that sensitive credit card data never touches your server, reducing your legal liability.',
    advanced: 'Automated tax calculation based on the user\'s IP address or zip code.',
  },
  {
    num: 'II', title: 'Application Form', icon: 'person_add', color: '#4caf50',
    body: 'For HR or high-level memberships, these forms should include Save & Continue functionality. This allows applicants to gather documents (IDs, transcripts) and return to the form without losing their progress.',
    advanced: 'File size and type restrictions to ensure your database isn\'t cluttered with unoptimized files.',
  },
  {
    num: 'III', title: 'Enquiry Form', icon: 'contact_mail', color: '#ffc107',
    body: 'This is a lead generation tool. Professional enquiry forms use Lead Routing—if a user selects "Enterprise" as their company size, the data is instantly sent to the Senior Sales Director via Slack or CRM.',
    advanced: null,
  },
  {
    num: 'IV', title: 'Grievances Form', icon: 'report_problem', color: '#ff5722',
    body: 'To maintain professional standards, these forms must provide a Reference Ticket Number upon submission. This builds trust by showing the user that their complaint is officially logged in a tracking system.',
    advanced: null,
  },
  {
    num: 'V', title: 'Booking & Appointment Forms', icon: 'calendar_month', color: '#9c27b0',
    body: 'These differ in their backend. Booking usually refers to assets (rooms, equipment), while Appointments refer to human time.',
    advanced: 'Bi-directional sync. If you add a personal event to your Google Calendar, the form should automatically "grey out" that time slot for clients.',
  },
  {
    num: 'VI', title: 'Consultation Form', icon: 'psychology', color: '#e91e63',
    body: 'This is the "Discovery Phase." A professional consultation form uses Matrix Questions to allow users to rank their priorities or needs across different categories, providing you with a heat map of their pain points before the first meeting.',
    advanced: null,
  },
  {
    num: 'VII', title: 'Contact Us Form', icon: 'forum', color: '#00bcd4',
    body: 'Beyond the basics, this form should include Hidden Fields. These capture metadata—such as the URL the user was on before they clicked "Contact"—giving your support team context about the user\'s journey.',
    advanced: null,
  },
];

export default function DigitalForms() {
  useEffect(() => {
    AOS.init({ duration: 900, once: true, offset: 80 });
  }, []);

  return (
    <>
      <style>{`
        .df-hero {
          padding: 140px 5% 80px;
          background: #000;
          color: #fff;
          position: relative;
          overflow: hidden;
        }
        .df-hero::before {
          content: "";
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
          background-image: radial-gradient(circle at 2px 2px, rgba(255,255,255,0.04) 1px, transparent 0);
          background-size: 36px 36px;
          z-index: 0;
        }
        .df-hero-inner { position: relative; z-index: 1; max-width: 800px; }
        .df-hero h1 {
          font-size: 4.5rem; font-weight: 900;
          letter-spacing: -3px; line-height: 1;
          margin-bottom: 1.5rem;
        }
        .df-hero h1 span { color: #00d2ff; }
        .df-hero p { font-size: 1.15rem; color: #aaa; line-height: 1.8; text-align: justify; max-width: 700px; }
        .df-section { padding: 80px 5%; }
        .df-section-dark { padding: 80px 5%; background: #0a0a0a; color: #fff; }
        .df-section-alt { padding: 80px 5%; background: #f7f9fc; }
        .df-section-title {
          font-size: 2.5rem; font-weight: 900;
          letter-spacing: -2px; margin-bottom: 0.5rem;
        }
        .df-section-sub { color: #666; font-size: 1rem; margin-bottom: 3rem; }
        .df-features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
          margin-top: 2.5rem;
        }
        .df-feature-card {
          background: #fff;
          border: 1px solid #eee;
          border-radius: 20px;
          padding: 2rem;
          transition: 0.4s;
          position: relative;
          overflow: hidden;
        }
        .df-feature-card:hover { border-color: #00d2ff; transform: translateY(-6px); box-shadow: 0 20px 50px rgba(0,210,255,0.08); }
        .df-feature-icon {
          width: 50px; height: 50px;
          border-radius: 14px;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 1.2rem;
          font-size: 1.5rem;
        }
        .df-feature-card h3 { font-size: 1.1rem; font-weight: 800; margin-bottom: 0.6rem; }
        .df-feature-card p { color: #666; font-size: 0.9rem; line-height: 1.6; margin: 0; }
        .df-table-wrap {
          overflow-x: auto;
          border-radius: 16px;
          border: 1px solid #222;
          margin-top: 2.5rem;
        }
        .df-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.95rem;
        }
        .df-table thead tr { background: #111; }
        .df-table thead th {
          padding: 1.1rem 1.5rem;
          text-align: left;
          color: #00d2ff;
          font-weight: 800;
          letter-spacing: 0.5px;
          white-space: nowrap;
          border-bottom: 1px solid #222;
        }
        .df-table tbody tr { border-bottom: 1px solid #1a1a1a; transition: 0.2s; }
        .df-table tbody tr:last-child { border-bottom: none; }
        .df-table tbody tr:hover { background: rgba(0,210,255,0.04); }
        .df-table tbody td { padding: 1rem 1.5rem; color: #ccc; }
        .df-table tbody td:first-child { color: #fff; font-weight: 700; }
        .df-why-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 1.5rem;
          margin-top: 2.5rem;
        }
        .df-why-card {
          background: #fff;
          border: 1px solid #eee;
          border-radius: 18px;
          padding: 2rem;
          transition: 0.3s;
        }
        .df-why-card:hover { transform: translateY(-5px); box-shadow: 0 16px 40px rgba(0,0,0,0.07); border-color: #000; }
        .df-why-card h3 { font-size: 1.05rem; font-weight: 800; margin: 1rem 0 0.5rem; }
        .df-why-card p { color: #666; font-size: 0.88rem; line-height: 1.6; margin: 0; }
        .df-elab-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          margin-top: 2.5rem;
        }
        .df-elab-card {
          background: #111;
          border: 1px solid #222;
          border-radius: 20px;
          padding: 2rem;
          position: relative;
          transition: 0.4s;
          overflow: hidden;
        }
        .df-elab-card:hover { border-color: #333; transform: translateY(-6px); }
        .df-elab-num {
          position: absolute;
          top: 1rem; right: 1.5rem;
          font-size: 3rem; font-weight: 900;
          color: rgba(255,255,255,0.05);
          line-height: 1;
        }
        .df-elab-card h3 { font-size: 1.15rem; font-weight: 800; color: #fff; margin: 1rem 0 0.8rem; display: flex; align-items: center; gap: 10px; }
        .df-elab-card p { color: #888; font-size: 0.9rem; line-height: 1.65; margin: 0; text-align: justify; }
        .df-elab-advanced {
          margin-top: 1rem;
          padding: 0.8rem 1rem;
          background: rgba(0,210,255,0.07);
          border-left: 3px solid #00d2ff;
          border-radius: 0 8px 8px 0;
        }
        .df-elab-advanced span { font-size: 0.72rem; font-weight: 700; color: #00d2ff; text-transform: uppercase; letter-spacing: 1px; display: block; margin-bottom: 0.2rem; }
        .df-elab-advanced p { color: #aaa; font-size: 0.85rem; margin: 0; }
        .df-security-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          margin-top: 2.5rem;
        }
        .df-security-card {
          background: #fff;
          border: 1px solid #eee;
          border-radius: 18px;
          padding: 2rem;
          text-align: center;
          transition: 0.3s;
        }
        .df-security-card:hover { border-color: #000; transform: translateY(-5px); box-shadow: 0 16px 40px rgba(0,0,0,0.07); }
        .df-security-card h3 { font-size: 1rem; font-weight: 800; margin: 1rem 0 0.5rem; }
        .df-security-card p { color: #666; font-size: 0.88rem; line-height: 1.6; margin: 0; }
        .df-contact-strip {
          background: #000;
          color: #fff;
          padding: 60px 5%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
          flex-wrap: wrap;
        }
        .df-contact-strip h2 { font-size: 2rem; font-weight: 900; letter-spacing: -1px; }
        .df-contact-info { display: flex; gap: 2.5rem; flex-wrap: wrap; }
        .df-contact-item { display: flex; align-items: center; gap: 10px; color: #aaa; font-size: 0.9rem; }
        .df-contact-item span.material-symbols-outlined { color: #00d2ff; }
        @media (max-width: 900px) {
          .df-elab-grid { grid-template-columns: 1fr; }
          .df-security-grid { grid-template-columns: 1fr; }
          .df-hero h1 { font-size: 3rem; }
          .df-contact-strip { flex-direction: column; align-items: flex-start; }
        }
        @media (max-width: 600px) {
          .df-section-title { font-size: 1.8rem; }
        }
      `}</style>

      {/* Hero */}
      <section className="df-hero">
        <div className="df-hero-inner">
          <div className="section-tag" style={{ color: '#00d2ff', marginBottom: '1.5rem' }} data-aos="fade-up">Digital Innovation</div>
          <h1 data-aos="fade-up" data-aos-delay="100">Digital <span>Forms</span></h1>
          <p data-aos="fade-up" data-aos-delay="200">
            Digital forms are the modern, paperless evolution of traditional data collection. By replacing physical documents with interactive, online interfaces, businesses can capture, validate, and process information in real-time.
            <br /><br />
            At its core, a digital form is an electronic version of a paper document designed to collect information. Unlike static PDFs, true digital forms are dynamic—they can change based on user input, validate data as it is typed, and automatically trigger workflows (like sending an email or updating a database).
          </p>
        </div>
      </section>

      {/* Key Features */}
      <section className="df-section">
        <div data-aos="fade-up">
          <p className="section-tag">Core Capabilities</p>
          <h2 className="df-section-title">Key Features of Modern Forms</h2>
          <p className="df-section-sub">What separates a great digital form from a basic one.</p>
        </div>
        <div className="df-features-grid">
          {keyFeatures.map((f, i) => (
            <div className="df-feature-card" key={i} data-aos="fade-up" data-aos-delay={`${i * 80}`}>
              <div className="df-feature-icon" style={{ background: `${f.color}18` }}>
                <span className="material-symbols-outlined" style={{ color: f.color, fontSize: '1.6rem' }}>{f.icon}</span>
              </div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 8 Essential Form Types — Table */}
      <section className="df-section-dark">
        <div data-aos="fade-up">
          <p className="section-tag" style={{ color: '#00d2ff' }}>Overview</p>
          <h2 className="df-section-title" style={{ color: '#fff' }}>The 8 Essential Form Types</h2>
          <p className="df-section-sub" style={{ color: '#666' }}>Each form type serves a distinct business function.</p>
        </div>
        <div className="df-table-wrap" data-aos="fade-up" data-aos-delay="100">
          <table className="df-table">
            <thead>
              <tr>
                <th>Form Type</th>
                <th>Primary Purpose</th>
                <th>Key Feature</th>
              </tr>
            </thead>
            <tbody>
              {formTypes.map((row, i) => (
                <tr key={i}>
                  <td>{row.type}</td>
                  <td>{row.purpose}</td>
                  <td>{row.feature}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Why Switch to Digital */}
      <section className="df-section-alt">
        <div data-aos="fade-up">
          <p className="section-tag">The Case for Change</p>
          <h2 className="df-section-title">Why Switch to Digital?</h2>
          <p className="df-section-sub">Four compelling reasons your organisation should modernise its data collection.</p>
        </div>
        <div className="df-why-grid">
          {whySwitch.map((w, i) => (
            <div className="df-why-card" key={i} data-aos="fade-up" data-aos-delay={`${i * 80}`}>
              <div style={{ width: 48, height: 48, borderRadius: 14, background: `${w.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span className="material-symbols-outlined" style={{ color: w.color, fontSize: '1.5rem' }}>{w.icon}</span>
              </div>
              <h3>{w.title}</h3>
              <p>{w.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Architecture */}
      <section className="df-section">
        <div data-aos="fade-up">
          <p className="section-tag">Engineering Excellence</p>
          <h2 className="df-section-title">The Architecture of High-Performance Forms</h2>
          <p className="df-section-sub">A professional digital form is built on a "Logic Layer."</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginTop: '2.5rem' }}>
          {[
            { icon: 'account_tree', color: '#00d2ff', title: 'Conditional Logic (Branching)', desc: 'This reduces "form friction." By only showing fields relevant to the user\'s previous answers, you increase completion rates by up to 40%.' },
            { icon: 'view_stream', color: '#4caf50', title: 'Progressive Disclosure', desc: 'For long forms (like Applications or Consultations), use multi-page layouts with progress bars. This prevents the user from feeling overwhelmed.' },
          ].map((item, i) => (
            <div key={i} className="df-feature-card" data-aos="fade-up" data-aos-delay={`${i * 100}`}>
              <div className="df-feature-icon" style={{ background: `${item.color}18` }}>
                <span className="material-symbols-outlined" style={{ color: item.color }}>{item.icon}</span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Elaborated Form Types */}
      <section className="df-section-dark">
        <div data-aos="fade-up">
          <p className="section-tag" style={{ color: '#00d2ff' }}>In Depth</p>
          <h2 className="df-section-title" style={{ color: '#fff' }}>Elaborated Information on the 8 Essential Form Types</h2>
          <p className="df-section-sub" style={{ color: '#666' }}>Professional-grade insights for each form category.</p>
        </div>
        <div className="df-elab-grid">
          {elaborated.map((e, i) => (
            <div className="df-elab-card" key={i} data-aos="fade-up" data-aos-delay={`${(i % 2) * 100}`}>
              <div className="df-elab-num">{e.num}</div>
              <h3>
                <span className="material-symbols-outlined" style={{ color: e.color, fontSize: '1.3rem' }}>{e.icon}</span>
                {e.title}
              </h3>
              <p>{e.body}</p>
              {e.advanced && (
                <div className="df-elab-advanced">
                  <span>Advanced Feature</span>
                  <p>{e.advanced}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Workflow Automation */}
      <section className="df-section-alt">
        <div data-aos="fade-up">
          <p className="section-tag">Post-Submission Power</p>
          <h2 className="df-section-title">Data Integrity & Workflow Automation</h2>
          <p className="df-section-sub">A form's value is realized after the "Submit" button is clicked. Professional systems utilize Webhook integrations.</p>
        </div>
        <div className="df-table-wrap" data-aos="fade-up" data-aos-delay="100" style={{ border: '1px solid #eee' }}>
          <table className="df-table" style={{ background: '#fff' }}>
            <thead>
              <tr style={{ background: '#f7f9fc' }}>
                <th style={{ color: '#000' }}>Integration Type</th>
                <th style={{ color: '#000' }}>Business Value</th>
              </tr>
            </thead>
            <tbody>
              {integrations.map((row, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ color: '#000', fontWeight: 700 }}>{row.type}</td>
                  <td style={{ color: '#555' }}>{row.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Security & Legal */}
      <section className="df-section">
        <div data-aos="fade-up">
          <p className="section-tag">Trust & Compliance</p>
          <h2 className="df-section-title">Security & Legal Compliance</h2>
          <p className="df-section-sub">In 2025, professionalism is synonymous with privacy.</p>
        </div>
        <div className="df-security-grid">
          {[
            { icon: 'gpp_good', color: '#4caf50', title: 'GDPR/CCPA Compliance', desc: 'Include a mandatory "Consent" checkbox that links to your Privacy Policy.' },
            { icon: 'enhanced_encryption', color: '#00d2ff', title: 'Data Encryption', desc: 'Ensure all forms are served over HTTPS and that data is encrypted "at rest" within your storage provider.' },
            { icon: 'manage_history', color: '#ff9800', title: 'Audit Trails', desc: 'Maintain a log of who accessed the form data and when, essential for regulated industries like finance or healthcare.' },
          ].map((s, i) => (
            <div className="df-security-card" key={i} data-aos="fade-up" data-aos-delay={`${i * 100}`}>
              <span className="material-symbols-outlined" style={{ color: s.color, fontSize: '2.5rem' }}>{s.icon}</span>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Optimization */}
      <section className="df-section-dark">
        <div data-aos="fade-up">
          <p className="section-tag" style={{ color: '#00d2ff' }}>Continuous Improvement</p>
          <h2 className="df-section-title" style={{ color: '#fff' }}>Optimization through Analytics</h2>
          <p className="df-section-sub" style={{ color: '#666' }}>To keep your forms professional, you must monitor their health.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginTop: '2.5rem' }}>
          {[
            { icon: 'analytics', color: '#00d2ff', title: 'Field Bottlenecks', desc: 'Identify which question takes users the longest to answer or where they most frequently abandon the form.' },
            { icon: 'science', color: '#4caf50', title: 'A/B Testing', desc: 'Experiment with different button colors (e.g., "Submit" vs. "Get Started") to find the highest conversion path.' },
          ].map((item, i) => (
            <div key={i} className="df-elab-card" data-aos="fade-up" data-aos-delay={`${i * 100}`}>
              <h3>
                <span className="material-symbols-outlined" style={{ color: item.color }}>{item.icon}</span>
                {item.title}
              </h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Strip */}
      <div className="df-contact-strip">
        <div>
          <p style={{ color: '#00d2ff', fontSize: '0.75rem', fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: '0.5rem' }}>Get in Touch</p>
          <h2>ELOSS Technologies</h2>
        </div>
        <div className="df-contact-info">
          <div className="df-contact-item">
            <span className="material-symbols-outlined">location_on</span>
            <span>Bengaluru, Karnataka, India</span>
          </div>
          <div className="df-contact-item">
            <span className="material-symbols-outlined">mail</span>
            <a href="mailto:elosstechnologies@gmail.com" style={{ color: '#aaa', textDecoration: 'none' }}>elosstechnologies@gmail.com</a>
          </div>
          <div className="df-contact-item">
            <span className="material-symbols-outlined">language</span>
            <a href="https://www.elosstechnologies.com" target="_blank" rel="noreferrer" style={{ color: '#aaa', textDecoration: 'none' }}>www.elosstechnologies.com</a>
          </div>
        </div>
      </div>
    </>
  );
}
