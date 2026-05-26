import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Terms() {
  useEffect(() => {
    AOS.init({ duration: 900, once: true, offset: 80 });
  }, []);

  const metricTiers = [
    { metric: 'Uptime Guarantee', basic: '99.50%', enterprise: '99.99%' },
    { metric: 'Response Time', basic: '24-48 Hours', enterprise: '< 2 Hours' },
    { metric: 'Dedicated Engineer', basic: 'No', enterprise: 'Yes' },
    { metric: 'Data Residency', basic: 'Shared', enterprise: 'Sovereignty Options' },
  ];

  return (
    <>
      <style>{`
        .terms-hero {
          padding: 140px 5% 80px;
          background: #000;
          color: #fff;
          position: relative;
          overflow: hidden;
        }
        .terms-hero::before {
          content: "";
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
          background-image: radial-gradient(circle at 2px 2px, rgba(255,255,255,0.04) 1px, transparent 0);
          background-size: 36px 36px;
          z-index: 0;
        }
        .terms-hero-inner { position: relative; z-index: 1; max-width: 800px; }
        .terms-hero h1 {
          font-size: 4.5rem; font-weight: 900;
          letter-spacing: -3px; line-height: 1.1;
          margin-bottom: 1.5rem;
        }
        .terms-hero h1 span { color: #00d2ff; }
        .terms-hero p { font-size: 1.15rem; color: #aaa; line-height: 1.8; text-align: justify; max-width: 700px; }
        
        .terms-section { padding: 40px 5%; background: #fff; }
        .terms-section-alt { padding: 40px 5%; background: #f9f9f9; }
        
        .terms-content-wrapper {
          max-width: 900px;
          margin: 0 auto;
        }
        
        .terms-block {
          margin-bottom: 2rem;
        }
        
        .terms-block h2 {
          font-size: 2.2rem;
          font-weight: 800;
          letter-spacing: -1px;
          margin-bottom: 1.5rem;
          color: inherit;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        
        .terms-block h2 .num-badge {
          background: #00d2ff;
          color: #000;
          width: 40px; height: 40px;
          border-radius: 8px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
        }

        .terms-block h3 {
          font-size: 1.4rem;
          font-weight: 700;
          margin: 2rem 0 1rem;
          color: #00d2ff;
        }
        
        .terms-block p {
          font-size: 1.05rem;
          line-height: 1.8;
          color: #555;
          margin-bottom: 1.2rem;
          text-align: justify;
        }

        .terms-list {
          list-style: none;
          padding: 0;
          margin: 1.5rem 0;
        }
        
        .terms-list li {
          font-size: 1.05rem;
          line-height: 1.8;
          color: #555;
          margin-bottom: 1rem;
          padding-left: 1.8rem;
          position: relative;
        }

        .terms-list li::before {
          content: "▹";
          position: absolute;
          left: 0; top: 0;
          color: #00d2ff;
          font-weight: bold;
          font-size: 1.2rem;
        }
        
        .terms-list li strong {
          color: #222;
        }
        
        /* Table styles */
        .terms-table-wrap {
          overflow-x: auto;
          border-radius: 12px;
          border: 1px solid #eee;
          margin: 2rem 0;
          box-shadow: 0 10px 30px rgba(0,0,0,0.02);
        }
        
        .terms-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.95rem;
          background: #fff;
        }
        
        .terms-table thead tr { background: #f1f5f9; }
        .terms-table thead th {
          padding: 1.2rem 1.5rem;
          text-align: left;
          color: #000;
          font-weight: 800;
          white-space: nowrap;
          border-bottom: 2px solid #e2e8f0;
        }
        
        .terms-table tbody tr { border-bottom: 1px solid #eee; transition: 0.2s; }
        .terms-table tbody tr:hover { background: #f8fafc; }
        .terms-table tbody td { padding: 1.2rem 1.5rem; color: #555; }
        .terms-table tbody td:first-child { font-weight: 700; color: #222; }
        
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
        
        .all-caps-highlight {
          font-weight: 800;
          color: #d32f2f;
          font-size: 0.95rem;
          padding: 1.5rem;
          background: #fff5f5;
          border-left: 4px solid #d32f2f;
          border-radius: 4px;
        }

        @media (max-width: 768px) {
          .terms-hero h1 { font-size: 3rem; }
          .terms-block h2 { font-size: 1.8rem; }
        }
      `}</style>

      {/* Hero */}
      <section className="terms-hero">
        <div className="terms-hero-inner">
          <div className="section-tag" style={{ color: '#00d2ff', marginBottom: '1.5rem' }} data-aos="fade-up">Legal Information</div>
          <h1 data-aos="fade-up" data-aos-delay="100">Global Terms & <br/><span>Conditions</span></h1>
          <p data-aos="fade-up" data-aos-delay="200">
            This Master Terms of Service Agreement ("Agreement") is a legally binding contract between ELoss Technologies and the individual or legal entity accessing our suite of hardware, software, and consultancy.
          </p>
        </div>
      </section>

      {/* Main Content Sections */}
      <section className="terms-section">
        <div className="terms-content-wrapper">
          
          <div className="terms-block" data-aos="fade-up">
            <h2><span className="num-badge">1</span> Preamble and Contractual Binding</h2>
            <p>This Master Terms of Service Agreement ("Agreement") is a legally binding contract between ELoss Technologies ("ELoss," "Company," "we," "us") and the individual or legal entity ("Customer," "User," "you") accessing our suite of hardware, software-as-a-service (SaaS), and professional technical consultancy.</p>
            <p>By clicking "I Accept," or by accessing the ELoss Ecosystem, you acknowledge that you have read, understood, and agreed to be bound by these terms. If you are acting on behalf of a corporation, you represent that you have the legal authority to bind said corporation.</p>
          </div>

          <div className="terms-block" data-aos="fade-up">
            <h2><span className="num-badge">2</span> The ELoss Ecosystem: Scope of Services</h2>
            <p>ELoss Technologies provides a multi-tenant environment consisting of:</p>
            <ul className="terms-list">
              <li><strong>Proprietary Software:</strong> Cloud-based analytics and infrastructure management tools.</li>
              <li><strong>Hardware Integration:</strong> Specialized IoT sensors and edge computing devices.</li>
              <li><strong>Professional Services:</strong> Custom implementation, migration, and 24/7 technical support.</li>
            </ul>
          </div>

          <div className="terms-block" data-aos="fade-up">
            <h2><span className="num-badge">3</span> User Accounts and Architecture</h2>
            
            <h3>3.1 Account Creation and Verification</h3>
            <p>To utilize ELoss Services, users must undergo a "Know Your Customer" (KYC) verification process if purchasing enterprise-level hardware. You agree to provide accurate, current, and complete information.</p>
            
            <h3>3.2 Administrative Users vs. Managed Users</h3>
            <ul className="terms-list">
              <li><strong>Administrators:</strong> Have full authority to configure service settings and manage billing.</li>
              <li><strong>Managed Users:</strong> Subject to the permissions set by the Administrator. ELoss is not responsible for internal disputes regarding permission levels.</li>
            </ul>
          </div>

        </div>
      </section>

      <section className="terms-section-alt">
        <div className="terms-content-wrapper">
          
          <div className="terms-block" data-aos="fade-up">
            <h2><span className="num-badge">4</span> Intellectual Property and Licensing</h2>
            
            <h3>4.1 Ownership of Technology</h3>
            <p>ELoss Technologies retains all rights, titles, and interests in the "ELoss Engine," including all source code, object code, documentation, and hardware schematics. No ownership is transferred to the Customer under this Agreement.</p>
            
            <h3>4.2 Limited Usage License</h3>
            <p>Subject to compliance with these Terms, ELoss grants a:</p>
            <ul className="terms-list">
              <li>Non-exclusive, non-transferable license to use the software.</li>
              <li>Revocable right to access the API for integration purposes, provided such usage does not exceed 10,000 requests per hour (unless otherwise specified in a Service Level Agreement).</li>
            </ul>

            <h3>4.3 Feedback Loop</h3>
            <p>Any suggestions, enhancement requests, or recommendations provided by the Customer ("Feedback") shall automatically become the property of ELoss Technologies without obligation of compensation.</p>
          </div>

          <div className="terms-block" data-aos="fade-up">
            <h2><span className="num-badge">5</span> Acceptable Use Policy (AUP)</h2>
            <p>To maintain the integrity of our global network, Customers are strictly prohibited from:</p>
            <ul className="terms-list">
              <li><strong>Reverse Engineering:</strong> Attempting to derive the source code of Eloss proprietary software.</li>
              <li><strong>Benchmark Leaking:</strong> Publishing performance benchmarks of Eloss hardware without prior written consent.</li>
              <li><strong>Security Testing:</strong> Conducting penetration tests or vulnerability scans against Eloss infrastructure without an official "Letter of Authorization" from our security team.</li>
              <li><strong>Network Interference:</strong> Using the Services to distribute malware, spyware, or "logic bombs."</li>
            </ul>
          </div>

        </div>
      </section>

      <section className="terms-section">
        <div className="terms-content-wrapper">

          <div className="terms-block" data-aos="fade-up">
            <h2><span className="num-badge">6</span> Data Privacy and Security (GDPR/CCPA)</h2>
            
            <h3>6.1 Data Processing Addendum (DPA)</h3>
            <p>For customers handling data of EU or California residents, our DPA is incorporated herein by reference. ELoss acts as the Data Processor, and the Customer acts as the Data Controller.</p>
            
            <h3>6.2 Security Standards</h3>
            <p>ELoss maintains administrative, physical, and technical safeguards. We utilize:</p>
            <ul className="terms-list">
              <li>AES-256 Encryption for data at rest.</li>
              <li>TLS 1.3 for data in transit.</li>
              <li>SOC 2 Type II certified data centers.</li>
            </ul>
          </div>

          <div className="terms-block" data-aos="fade-up">
            <h2><span className="num-badge">7</span> Financial Terms and Billing</h2>
            
            <h3>7.1 Subscription Cycles</h3>
            <p>Services are billed on a pre-paid basis. Subscriptions renew automatically unless cancelled 30 days prior to the renewal date.</p>
            
            <h3>7.2 Late Payments and Suspension</h3>
            <p>Invoices unpaid for more than 15 days will incur a late fee of 1.5% per month or the maximum permitted by law. ELoss reserves the right to suspend API access and cloud dashboard functionality for accounts with overdue balances.</p>

            <h3>7.3 Taxes</h3>
            <p>Fees are exclusive of all taxes, levies, or duties. Customers are responsible for all applicable VAT, GST, or sales tax based on their shipping or billing jurisdiction.</p>
          </div>

          <div className="terms-block" data-aos="fade-up">
            <h2><span className="num-badge">8</span> Hardware-Specific Terms</h2>
            
            <h3>8.1 Title and Risk of Loss</h3>
            <p>Title to hardware passes to the Customer upon full payment. Risk of loss passes to the Customer upon delivery to the carrier (FOB Shipping Point).</p>
            
            <h3>8.2 Firmware Updates</h3>
            <p>ELoss hardware requires periodic firmware updates. Failure to apply critical security patches released by ELoss within 14 days of release voids the hardware warranty.</p>
          </div>

          <div className="terms-block" data-aos="fade-up">
            <h2><span className="num-badge">9</span> Indemnification and Liability</h2>
            
            <h3>9.1 Mutual Indemnification</h3>
            <ul className="terms-list">
              <li><strong>By ELoss:</strong> We will defend the Customer against third-party claims alleging that our technology infringes on a valid patent or copyright.</li>
              <li><strong>By Customer:</strong> You will defend ELoss against claims arising from your "User Content" or your breach of the Acceptable Use Policy.</li>
            </ul>
            
            <h3>9.2 Limitation of Liability</h3>
            <p className="all-caps-highlight">
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, ELOSS TECHNOLOGIES' AGGREGATE LIABILITY SHALL NOT EXCEED THE TOTAL FEES PAID BY THE CUSTOMER IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM.
            </p>
          </div>

        </div>
      </section>

      <section className="terms-section-alt">
        <div className="terms-content-wrapper">

          <div className="terms-block" data-aos="fade-up">
            <h2><span className="num-badge">10</span> Dispute Resolution: Mandatory Arbitration</h2>
            <p>Any dispute, controversy, or claim arising out of this Agreement shall be settled by binding arbitration administered by the American Arbitration Association (AAA) or a comparable international body in the jurisdiction of Bengaluru, India.</p>
            <p><strong>Class Action Waiver:</strong> You agree to bring claims against ELoss only in your individual capacity and not as a plaintiff or class member in any purported class or representative proceeding.</p>
          </div>

          <div className="terms-block" data-aos="fade-up">
            <h2><span className="num-badge">11</span> Termination and Data Portability</h2>
            
            <h3>11.1 Termination for Cause</h3>
            <p>Either party may terminate this Agreement if the other party materially breaches its obligations and fails to cure such breach within 30 days of written notice.</p>
            
            <h3>11.2 Post-Termination Data Access</h3>
            <p>Upon termination, the Customer has 30 days to export their data from the ELoss Dashboard. After this period, ELoss reserves the right to delete all Customer data in accordance with our data retention policy.</p>
          </div>

          <div className="terms-block" data-aos="fade-up">
            <h2><span className="num-badge">12</span> Miscellaneous</h2>
            <ul className="terms-list">
              <li><strong>Force Majeure:</strong> ELoss is not liable for delays caused by strikes, internet outages, or "Acts of God."</li>
              <li><strong>Severability:</strong> If any provision is found invalid, the remainder of the Agreement remains in effect.</li>
              <li><strong>Entire Agreement:</strong> This constitutes the entire agreement between the parties, superseding all prior discussions or "shrink-wrap" terms.</li>
            </ul>
          </div>

          {/* Service Tiers Table */}
          <div className="terms-block" data-aos="fade-up" style={{ marginTop: '4rem' }}>
            <h2>Service Level Agreement (SLA) Overview</h2>
            <div className="terms-table-wrap">
              <table className="terms-table">
                <thead>
                  <tr>
                    <th>Metric</th>
                    <th>Basic Tier</th>
                    <th>Enterprise Tier</th>
                  </tr>
                </thead>
                <tbody>
                  {metricTiers.map((row, i) => (
                    <tr key={i}>
                      <td>{row.metric}</td>
                      <td>{row.basic}</td>
                      <td>{row.enterprise}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Contact Information */}
          <div className="contact-box" data-aos="fade-up">
            <h3>Contact Information</h3>
            <p style={{ color: '#aaa', marginBottom: '2rem' }}>For all inquiries regarding these terms, please reach out to our Compliance Department:</p>
            
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
