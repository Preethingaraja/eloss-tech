import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Privacy() {
  useEffect(() => {
    AOS.init({ duration: 900, once: true, offset: 80 });
  }, []);

  return (
    <>
      <style>{`
        .privacy-hero {
          padding: 140px 5% 80px;
          background: #000;
          color: #fff;
          position: relative;
          overflow: hidden;
        }
        .privacy-hero::before {
          content: "";
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
          background-image: radial-gradient(circle at 2px 2px, rgba(255,255,255,0.04) 1px, transparent 0);
          background-size: 36px 36px;
          z-index: 0;
        }
        .privacy-hero-inner { position: relative; z-index: 1; max-width: 800px; }
        .privacy-hero h1 {
          font-size: 4.5rem; font-weight: 900;
          letter-spacing: -3px; line-height: 1.1;
          margin-bottom: 1.5rem;
        }
        .privacy-hero h1 span { color: #00d2ff; }
        .privacy-hero p { font-size: 1.15rem; color: #aaa; line-height: 1.8; text-align: justify; max-width: 700px; }
        
        .privacy-section { padding: 40px 5%; background: #fff; }
        .privacy-section-alt { padding: 40px 5%; background: #f9f9f9; }
        
        .privacy-content-wrapper {
          max-width: 900px;
          margin: 0 auto;
        }
        
        .privacy-block {
          margin-bottom: 2rem;
        }
        
        .privacy-block h2 {
          font-size: 2.2rem;
          font-weight: 800;
          letter-spacing: -1px;
          margin-bottom: 1.5rem;
          color: inherit;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        
        .privacy-block h2 .num-badge {
          background: #00d2ff;
          color: #000;
          width: 40px; height: 40px;
          border-radius: 8px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
        }

        .privacy-block h3 {
          font-size: 1.4rem;
          font-weight: 700;
          margin: 2rem 0 1rem;
          color: #00d2ff;
        }
        
        .privacy-block p {
          font-size: 1.05rem;
          line-height: 1.8;
          color: #555;
          margin-bottom: 1.2rem;
          text-align: justify;
        }

        .privacy-list {
          list-style: none;
          padding: 0;
          margin: 1.5rem 0;
        }
        
        .privacy-list li {
          font-size: 1.05rem;
          line-height: 1.8;
          color: #555;
          margin-bottom: 1rem;
          padding-left: 1.8rem;
          position: relative;
        }

        .privacy-list li::before {
          content: "▹";
          position: absolute;
          left: 0; top: 0;
          color: #00d2ff;
          font-weight: bold;
          font-size: 1.2rem;
        }
        
        .privacy-list li strong {
          color: #222;
        }
        
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

        @media (max-width: 768px) {
          .privacy-hero h1 { font-size: 3rem; }
          .privacy-block h2 { font-size: 1.8rem; }
        }
      `}</style>

      {/* Hero */}
      <section className="privacy-hero">
        <div className="privacy-hero-inner">
          <div className="section-tag" style={{ color: '#00d2ff', marginBottom: '1.5rem' }} data-aos="fade-up">Legal Information</div>
          <h1 data-aos="fade-up" data-aos-delay="100">Global Privacy <br/><span>Policy</span></h1>
          <p data-aos="fade-up" data-aos-delay="200">
            This Master Terms of Service Agreement ("Agreement") constitutes a definitive and legally binding contract governing the relationship between ELoss Technologies and the party identified as the user.
          </p>
        </div>
      </section>

      {/* Main Content Sections */}
      <section className="privacy-section">
        <div className="privacy-content-wrapper">
          
          <div className="privacy-block" data-aos="fade-up">
            <h2><span className="num-badge">1</span> Preamble and Contractual Binding</h2>
            
            <h3>1.1 Formal Agreement and Execution</h3>
            <p>This Master Terms of Service Agreement (the "Agreement") constitutes a definitive and legally binding contract governing the relationship between ELoss Technologies ("ELoss," "the Company," "we," "us," or "our") and the party identified as the user or subscriber ("Customer," "User," "you," or "your"). This Agreement governs all access to and use of ELoss products, services, websites, and associated technologies.</p>
            
            <h3>1.2 Consent and Affirmation</h3>
            <p>By executing an Order Form, clicking "I Accept," "Sign Up," or otherwise accessing the ELoss Ecosystem, you formally acknowledge that you have reviewed this Agreement in its entirety. This electronic action constitutes a digital signature under the Electronic Signatures in Global and National Commerce Act (ESIGN) and the Uniform Electronic Transactions Act (UETA).</p>
            
            <h3>1.3 Corporate Authority</h3>
            <p>If you are entering into this Agreement on behalf of a corporation, limited liability company, partnership, or other legal entity, you represent and warrant that you possess the requisite legal authority to bind such entity and its affiliates to these terms. In the event you do not have such authority, or if you do not agree with these terms, you must immediately cease all use of the ELoss Services.</p>
          </div>

          <div className="privacy-block" data-aos="fade-up">
            <h2><span className="num-badge">2</span> The ELoss Ecosystem: Scope of Services</h2>
            
            <h3>2.1 The Multi-Tenant Environment</h3>
            <p>The "ELoss Ecosystem" refers to a sophisticated, multi-tenant cloud and hardware environment designed for high-availability enterprise operations. The scope includes:</p>
            <ul className="privacy-list">
              <li><strong>Proprietary Software-as-a-Service (SaaS):</strong> This includes the "ELoss Engine," cloud-based analytics dashboards, infrastructure management tools, and any mobile applications provided by ELoss.</li>
              <li><strong>Hardware Integration & IoT:</strong> Specialized proprietary sensors, edge computing devices, and firmware. Note that hardware usage is governed by both this Agreement and any specific Hardware Lease or Purchase Agreements.</li>
              <li><strong>Professional and Managed Services:</strong> This encompasses custom implementation, legacy data migration, system optimization, and 24/7 priority technical support as defined in the applicable Service Level Agreement (SLA).</li>
            </ul>

            <h3>2.2 Continuous Evolution of Services</h3>
            <p>ELoss Technologies operates on a model of continuous delivery. We reserve the right, at our sole discretion, to update, enhance, or modify features of the Ecosystem. While we strive to avoid "breaking changes," ELoss shall not be liable for modifications that require Customer-side configuration updates to maintain compatibility.</p>
          </div>

        </div>
      </section>

      <section className="privacy-section-alt">
        <div className="privacy-content-wrapper">
          
          <div className="privacy-block" data-aos="fade-up">
            <h2><span className="num-badge">3</span> User Accounts and Architecture</h2>
            
            <h3>3.1 Account Creation and "Know Your Customer" (KYC)</h3>
            <p>Access to the ELoss Ecosystem requires the creation of a verified Account. For enterprise-level hardware procurement and high-capacity SaaS tiers, ELoss mandates a Know Your Customer (KYC) and Know Your Business (KYB) verification process.</p>
            <ul className="privacy-list">
              <li><strong>Verification Data:</strong> Customers must provide valid government-issued identification, corporate registration documents, and verifiable tax identification numbers.</li>
              <li><strong>Accuracy Warranty:</strong> You represent that all provided information is truthful. Providing fraudulent data is grounds for immediate termination of service without refund.</li>
            </ul>
            
            <h3>3.2 User Hierarchy and Administrative Responsibility</h3>
            <p>The ELoss architecture utilizes a hierarchical permission structure:</p>
            <ul className="privacy-list">
              <li><strong>Administrative Users (Admins):</strong> Admins hold "Super-User" status. They are authorized to purchase additional seats, modify billing cycles, export global data sets, and delete Managed User accounts. The Customer is solely responsible for the actions of its Admins.</li>
              <li><strong>Managed Users:</strong> These are individual employees, contractors, or agents authorized by the Admin.</li>
              <li><strong>Third-Party Collaborators:</strong> If the Service allows for external guest access, the Customer assumes full liability for the guest’s compliance with the Acceptable Use Policy.</li>
            </ul>
          </div>

        </div>
      </section>

      <section className="privacy-section">
        <div className="privacy-content-wrapper">

          <div className="privacy-block" data-aos="fade-up">
            <h2><span className="num-badge">4</span> Intellectual Property and Licensing</h2>
            
            <h3>4.1 Exclusive Ownership of the "ELoss Engine"</h3>
            <p>All intellectual property rights, including but not limited to patents, copyrights, trade secrets, trademarks, and "look and feel" elements of the ELoss Engine, remain the exclusive property of ELoss Technologies. This Agreement is a service agreement and a license, not a sale of software or hardware design.</p>
            
            <h3>4.2 Limited Usage License and API Access</h3>
            <ul className="privacy-list">
              <li><strong>Software License:</strong> ELoss grants a limited, non-exclusive, non-sublicensable, and non-transferable license to access the software for internal business operations only.</li>
              <li><strong>API Usage:</strong> Access to the ELoss API is a privilege, not a right. Usage is capped at 10,000 requests per hour to ensure system stability. Exceeding this limit without an upgraded SLA may result in automated "throttling" or temporary IP suspension.</li>
            </ul>

            <h3>4.3 Feedback and Innovations</h3>
            <p>We encourage a "Feedback Loop" with our users. However, you agree that any suggestions or feature requests you submit automatically become the sole property of ELoss. You hereby irrevocably assign all rights, titles, and interests in such Feedback to ELoss, waiving any claims to royalties or "moral rights."</p>
          </div>

          <div className="privacy-block" data-aos="fade-up">
            <h2><span className="num-badge">5</span> Acceptable Use Policy (AUP)</h2>
            <p>To protect our global network and ensure equitable resource distribution, the following actions are strictly prohibited:</p>
            
            <h3>5.1 Reverse Engineering and Decompilation</h3>
            <p>Users shall not, and shall not permit any third party to, reverse engineer, decompile, or attempt to derive the source code, underlying ideas, or algorithms of the ELoss software or hardware schematics. This includes the use of "sniffing" tools to intercept proprietary communication protocols between ELoss hardware and the cloud.</p>
            
            <h3>5.2 Benchmark Confidentiality</h3>
            <p>The performance data of the ELoss Ecosystem is considered a Trade Secret. You are prohibited from publishing, disclosing, or circulating "Benchmark Leaks" or comparative performance analyses of our hardware and software without the express written consent of the ELoss Chief Technology Officer (CTO).</p>

            <h3>5.3 Security and Penetration Testing</h3>
            <p>Security is paramount. Therefore:</p>
            <ul className="privacy-list">
              <li><strong>Unauthorized Scanning:</strong> Any attempt to conduct vulnerability scans or penetration tests against the ELoss IP range is considered a hostile act.</li>
              <li><strong>Authorization:</strong> Official testing requires a signed "Letter of Authorization" (LOA) from our security team, detailing the window of time and specific IP addresses involved.</li>
            </ul>

            <h3>5.4 Network Integrity and Malware</h3>
            <p>The Services must not be used to host, store, or distribute malicious code, including but not limited to:</p>
            <ul className="privacy-list">
              <li><strong>Logic Bombs:</strong> Code designed to execute under specific conditions that disrupts operations.</li>
              <li><strong>Resource Hijacking:</strong> Using ELoss computing power for unauthorized activities like cryptocurrency mining or Distributed Denial of Service (DDoS) attacks.</li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="contact-box" data-aos="fade-up">
            <h3>Contact Information</h3>
            <p style={{ color: '#aaa', marginBottom: '2rem' }}>For all inquiries regarding our privacy policy, please reach out to our Compliance Department:</p>
            
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
