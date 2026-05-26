import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function RefundPolicy() {
  useEffect(() => {
    AOS.init({ duration: 900, once: true, offset: 80 });
  }, []);

  const refundTimelines = [
    { method: 'Credit/Debit Card', elossTime: '2 Business Days', bankTime: '5-10 Business Days' },
    { method: 'PayPal', elossTime: '1 Business Day', bankTime: 'Immediate' },
    { method: 'Bank Wire/ACH', elossTime: '5 Business Days', bankTime: '3-5 Business Days' },
    { method: 'Store Credit', elossTime: 'Immediate', bankTime: 'N/A' },
  ];

  return (
    <>
      <style>{`
        .policy-hero {
          padding: 140px 5% 80px;
          background: #000;
          color: #fff;
          position: relative;
          overflow: hidden;
        }
        .policy-hero::before {
          content: "";
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
          background-image: radial-gradient(circle at 2px 2px, rgba(255,255,255,0.04) 1px, transparent 0);
          background-size: 36px 36px;
          z-index: 0;
        }
        .policy-hero-inner { position: relative; z-index: 1; max-width: 800px; }
        .policy-hero h1 {
          font-size: 4.5rem; font-weight: 900;
          letter-spacing: -3px; line-height: 1.1;
          margin-bottom: 1.5rem;
        }
        .policy-hero h1 span { color: #00d2ff; }
        .policy-hero p { font-size: 1.15rem; color: #aaa; line-height: 1.8; text-align: justify; max-width: 700px; }
        
        .policy-section { padding: 40px 5%; background: #fff; }
        .policy-section-alt { padding: 40px 5%; background: #f9f9f9; }
        .policy-section-dark { padding: 80px 5%; background: #0a0a0a; color: #fff; }
        
        .policy-content-wrapper {
          max-width: 900px;
          margin: 0 auto;
        }
        
        .policy-block {
          margin-bottom: 2rem;
        }
        
        .policy-block h2 {
          font-size: 2.2rem;
          font-weight: 800;
          letter-spacing: -1px;
          margin-bottom: 1.5rem;
          color: inherit;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        
        .policy-block h2 .num-badge {
          background: #00d2ff;
          color: #000;
          width: 40px; height: 40px;
          border-radius: 8px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
        }

        .policy-block h3 {
          font-size: 1.4rem;
          font-weight: 700;
          margin: 2rem 0 1rem;
          color: #00d2ff;
        }
        
        .policy-block p {
          font-size: 1.05rem;
          line-height: 1.8;
          color: #555;
          margin-bottom: 1.2rem;
          text-align: justify;
        }
        
        .policy-section-dark .policy-block p {
          color: #aaa;
        }

        .policy-list {
          list-style: none;
          padding: 0;
          margin: 1.5rem 0;
        }
        
        .policy-list li {
          font-size: 1.05rem;
          line-height: 1.8;
          color: #555;
          margin-bottom: 1rem;
          padding-left: 1.8rem;
          position: relative;
        }
        
        .policy-section-dark .policy-list li {
          color: #aaa;
        }

        .policy-list li::before {
          content: "▹";
          position: absolute;
          left: 0; top: 0;
          color: #00d2ff;
          font-weight: bold;
          font-size: 1.2rem;
        }
        
        .policy-list li strong {
          color: #222;
        }
        
        .policy-section-dark .policy-list li strong {
          color: #fff;
        }
        
        /* Table styles */
        .policy-table-wrap {
          overflow-x: auto;
          border-radius: 12px;
          border: 1px solid #eee;
          margin: 2rem 0;
          box-shadow: 0 10px 30px rgba(0,0,0,0.02);
        }
        
        .policy-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.95rem;
          background: #fff;
        }
        
        .policy-table thead tr { background: #f1f5f9; }
        .policy-table thead th {
          padding: 1.2rem 1.5rem;
          text-align: left;
          color: #000;
          font-weight: 800;
          white-space: nowrap;
          border-bottom: 2px solid #e2e8f0;
        }
        
        .policy-table tbody tr { border-bottom: 1px solid #eee; transition: 0.2s; }
        .policy-table tbody tr:hover { background: #f8fafc; }
        .policy-table tbody td { padding: 1.2rem 1.5rem; color: #555; }
        .policy-table tbody td:first-child { font-weight: 700; color: #222; }
        
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
          .policy-hero h1 { font-size: 3rem; }
          .policy-block h2 { font-size: 1.8rem; }
        }
      `}</style>

      {/* Hero */}
      <section className="policy-hero">
        <div className="policy-hero-inner">
          <div className="section-tag" style={{ color: '#00d2ff', marginBottom: '1.5rem' }} data-aos="fade-up">Corporate Policies</div>
          <h1 data-aos="fade-up" data-aos-delay="100">Global Refund & <br/><span>Return Policy</span></h1>
          <p data-aos="fade-up" data-aos-delay="200">
            ELoss Technologies is committed to providing world-class technological solutions. We understand that a transparent and fair refund policy is the cornerstone of customer trust.
          </p>
        </div>
      </section>

      {/* Main Content Sections */}
      <section className="policy-section">
        <div className="policy-content-wrapper">
          
          <div className="policy-block" data-aos="fade-up">
            <h2><span className="num-badge">1</span> Executive Summary and Scope</h2>
            <p>ELoss Technologies ("the Company," "we," "us," "our") is committed to providing world-class technological solutions, including hardware peripherals, software-as-a-service (SaaS) subscriptions, and professional consulting services. We understand that a transparent and fair refund policy is the cornerstone of customer trust.</p>
            <p>This policy applies to all purchases made via the ELoss Technologies official website, authorized sales representatives, and integrated digital platforms. By completing a purchase, you ("the Customer," "the User") agree to the terms outlined herein.</p>
          </div>

          <div className="policy-block" data-aos="fade-up">
            <h2><span className="num-badge">2</span> Hardware Return Policy (Physical Goods)</h2>
            
            <h3>2.1 Return Eligibility Window</h3>
            <p>Customers have 30 calendar days from the date of delivery to initiate a return for a full refund or exchange. For "Dead on Arrival" (DOA) units, this window is shortened to 7 days to prioritize immediate replacement.</p>
            
            <h3>2.2 Conditions for Return</h3>
            <p>To qualify for a standard return, the following criteria must be met:</p>
            <ul className="policy-list">
              <li><strong>Original Packaging:</strong> The item must be in its original, undamaged packaging, including all inserts, manuals, and cables.</li>
              <li><strong>Condition:</strong> The product must show no signs of physical wear, liquid damage, or unauthorized modifications.</li>
              <li><strong>Documentation:</strong> A valid Return Merchandise Authorization (RMA) number must be clearly marked on the outer shipping box.</li>
            </ul>

            <h3>2.3 Non-Returnable Hardware Items</h3>
            <ul className="policy-list">
              <li>Custom-configured workstations or bespoke hardware components.</li>
              <li>Consumables that have been opened (e.g., thermal paste, specialized cleaning kits).</li>
              <li>Items purchased as "End of Life" (EOL) or "As-Is" during clearance events.</li>
            </ul>
          </div>

          <div className="policy-block" data-aos="fade-up">
            <h2><span className="num-badge">3</span> Software and SaaS Refund Policy</h2>
            
            <h3>3.1 SaaS Subscriptions (Monthly & Annual)</h3>
            <ul className="policy-list">
              <li><strong>Monthly Plans:</strong> ELoss Technologies offers a 7-day money-back guarantee for new monthly subscribers. If canceled after 7 days, the subscription will remain active until the end of the current billing cycle, with no partial refunds.</li>
              <li><strong>Annual Plans:</strong> Customers may request a full refund within 14 days of the initial purchase. Pro-rated refunds for annual plans cancelled after the 14-day window are only granted in the event of documented service downtime exceeding our Service Level Agreement (SLA).</li>
            </ul>

            <h3>3.2 Digital Downloads and Licenses</h3>
            <p>Once a digital license key has been "revealed" or "activated" in the ELoss Dashboard, the sale is considered final. If you encounter technical issues, our support team will provide 48 hours of dedicated troubleshooting before an exception for a refund is considered.</p>
          </div>

        </div>
      </section>

      {/* Structured Process (Alt Background) */}
      <section className="policy-section-alt">
        <div className="policy-content-wrapper">
          
          <div className="policy-block" data-aos="fade-up">
            <h2><span className="num-badge">4</span> The RMA Process</h2>
            <p>To ensure a smooth return experience, ELoss Technologies utilizes a structured Return Merchandise Authorization (RMA) system:</p>
            <ul className="policy-list">
              <li><strong>Initiation:</strong> Contact elosstechnologies@gmail.com with your Order ID and reason for return.</li>
              <li><strong>Approval:</strong> Within 2 business days, an RMA number and a pre-paid shipping label (if applicable) will be issued.</li>
              <li><strong>Shipment:</strong> The customer must ship the item back within 10 days of receiving the RMA.</li>
              <li><strong>Inspection:</strong> Our technical team will inspect the unit within 3-5 business days of receipt.</li>
              <li><strong>Resolution:</strong> Upon approval, the refund will be triggered to the original payment method.</li>
            </ul>
          </div>

        </div>
      </section>

      {/* Timelines Table */}
      <section className="policy-section">
        <div className="policy-content-wrapper">
          
          <div className="policy-block" data-aos="fade-up">
            <h2><span className="num-badge">5</span> Refund Timelines and Payment Methods</h2>
            
            <div className="policy-table-wrap">
              <table className="policy-table">
                <thead>
                  <tr>
                    <th>Payment Method</th>
                    <th>Processing Time (ELoss)</th>
                    <th>Bank/Provider Processing</th>
                  </tr>
                </thead>
                <tbody>
                  {refundTimelines.map((row, i) => (
                    <tr key={i}>
                      <td>{row.method}</td>
                      <td>{row.elossTime}</td>
                      <td>{row.bankTime}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="policy-block" data-aos="fade-up">
            <h2><span className="num-badge">6</span> Restocking Fees and Deductions</h2>
            <ul className="policy-list">
              <li><strong>Standard Returns:</strong> A 10% restocking fee applies to non-defective hardware returns to cover inspection and repackaging costs.</li>
              <li><strong>Shipping Costs:</strong> Original shipping fees are non-refundable. For discretionary returns, the cost of the return label will be deducted from the final refund amount.</li>
              <li><strong>Damaged Returns:</strong> If an item is returned with missing accessories or minor cosmetic damage, ELoss reserves the right to deduct up to 25% of the refund value.</li>
            </ul>
          </div>

          <div className="policy-block" data-aos="fade-up">
            <h2><span className="num-badge">7</span> Enterprise and Professional Services</h2>
            <p>Refunds for professional services (e.g., system integration, custom coding, on-site installation) are governed by the specific Statement of Work (SOW) signed at the start of the project. Generally:</p>
            <ul className="policy-list">
              <li>Deposits for service blocks are non-refundable once work has commenced.</li>
              <li>If a project is cancelled by the client, they are liable for all hours worked up to the point of cancellation.</li>
            </ul>
          </div>

          <div className="policy-block" data-aos="fade-up">
            <h2><span className="num-badge">8</span> International Returns</h2>
            <p>For customers outside the primary operating region:</p>
            <ul className="policy-list">
              <li><strong>Customs & Duties:</strong> ELoss Technologies cannot refund international customs duties or import taxes. These must be reclaimed by the customer through their local tax authority.</li>
              <li><strong>Return Shipping:</strong> International customers are responsible for all return shipping costs and must use a carrier that provides tracking and insurance.</li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="contact-box" data-aos="fade-up">
            <h3>9. Contact Information</h3>
            <p style={{ color: '#aaa', marginBottom: '2rem' }}>For all inquiries regarding this policy, please reach out to our Compliance Department:</p>
            
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
