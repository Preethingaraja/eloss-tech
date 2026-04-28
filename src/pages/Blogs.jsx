import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const blogs = [
  {
    meta: '_RPA.RESEARCH_01',
    title: 'Automated\nFoundations.',
    subtitle: 'The intersection of AI and industrial workflows.',
    bg: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop&q=80',
    dark: true,
    content: [
      'The global industrial landscape is undergoing a massive shift towards autonomous systems. In Bengaluru, the shift is not just about efficiency but about redefining the very nature of digital workflows across multi-national sectors.',
      'Robotic Process Automation (RPA) has moved beyond simple macros into the realm of hyper-automation. This involves the orchestration of several tools, including AI and machine learning, to automate complex, end-to-end business processes.',
      'As we look towards the next decade, the ability to architect these automated foundations will be the single most important skill for tech leaders aiming to scale their operations in an increasingly competitive market.',
      'Strategic automation requires more than just software implementation; it demands a fundamental redesign of organizational data flow. By removing the friction of manual entry, enterprises can pivot their human capital towards high-level creative problem solving, while the digital "Infra" handles the repetitive architectural load.',
    ],
  },
  {
    meta: '_WEB.LOGIC_04',
    title: 'Full-Stack\nSovereignty.',
    subtitle: 'Building digital resilience in the framework era.',
    bg: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&auto=format&fit=crop&q=80',
    dark: false,
    content: [
      'Modern web development is often plagued by "framework fatigue." Our research suggests that true full-stack sovereignty comes from mastering the core architectural principles rather than chasing ephemeral library updates.',
      'A robust digital infrastructure requires a deep understanding of how data flows from the server to the client. By focusing on performance-first methodologies, developers can build applications that are both scalable and resilient.',
      'We believe in a "Vanilla Plus" approach—utilizing the power of raw web technologies while strategically layering frameworks only where they provide measurable architectural advantages to the final product.',
      'True sovereignty is not about knowing every language; it\'s about understanding the universal logic of information architecture. This includes mastering asynchronous data handling, secure API integration, and the psychological principles of user interface responsiveness.',
    ],
  },
  {
    meta: '_FIN.ARCH_02',
    title: 'Financial\nDynamics.',
    subtitle: 'Tally Prime as a strategic organizational asset.',
    bg: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80',
    dark: true,
    content: [
      'Accounting is the heartbeat of every enterprise, yet many organizations fail to utilize their financial data as a strategic asset. Tally Prime has evolved into much more than just a ledger-keeping tool.',
      'With the integration of cloud-based reporting and advanced inventory management, businesses can now gain real-time visibility into their operational efficiency, allowing for data-driven decisions that were previously impossible.',
      'Mastering these advanced financial architectures is essential for modern business leaders who wish to maintain absolute transparency and control over their expanding organizational structures.',
      'The transition to GST-compliant, real-time auditing represents a new era of fiscal transparency. Organizations that adopt these technical standards early will find themselves with a massive competitive edge in cross-border trade and institutional scalability.',
    ],
  },
];

export default function Blogs() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <>
      <style>{`
        .blog-container { width: 100%; background: #fff; }
        .blog-section {
          display: flex; min-height: 80vh;
          border-bottom: 1px solid #eee; position: relative;
        }
        .blog-section:nth-child(even) { flex-direction: row-reverse; }
        .blog-title-side {
          flex: 1; padding: 100px 5%;
          display: flex; flex-direction: column;
          justify-content: center;
          background: #000; color: #fff;
          position: sticky; top: 0; height: 100vh;
        }
        .blog-section:nth-child(even) .blog-title-side { background: #fff; color: #000; }
        .blog-content-side {
          flex: 1.2; padding: 100px 8%;
          background: #fff;
          display: flex; flex-direction: column; justify-content: center;
        }
        .blog-section:nth-child(even) .blog-content-side { background: #fcfcfc; }
        .blog-title-side h3 {
          font-size: 4rem; font-weight: 900;
          letter-spacing: -3px; line-height: 0.9; margin-bottom: 2rem;
        }
        .blog-title-side .blog-meta {
          font-family: monospace; font-size: 0.8rem;
          letter-spacing: 3px; color: #00d2ff;
        }
        .enhanced-summary p { color: #444; font-size: 1.1rem; line-height: 1.9; text-align: justify; margin-bottom: 2rem; }
        @media (max-width: 1024px) {
          .blog-section { flex-direction: column !important; min-height: auto; }
          .blog-title-side { height: auto; position: static; padding: 60px 5%; }
          .blog-title-side h3 { font-size: 3rem; }
          .blog-content-side { padding: 60px 5%; }
        }
      `}</style>

      <div className="blog-container" style={{ paddingTop: '60px' }}>
        {blogs.map((blog, i) => {
          const overlayColor = blog.dark
            ? 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7))'
            : 'linear-gradient(rgba(255,255,255,0.8), rgba(255,255,255,0.8))';
          return (
            <section className="blog-section" key={i}>
              <div
                className="blog-title-side"
                style={{
                  background: `${overlayColor}, url('${blog.bg}') center/cover`,
                  filter: 'grayscale(0.5)',
                }}
              >
                <span className="blog-meta">{blog.meta}</span>
                <h3>{blog.title.split('\n').map((line, j) => (
                  <span key={j}>{line}{j === 0 && <br />}</span>
                ))}</h3>
                <p style={{ opacity: 0.8, fontSize: '0.9rem' }}>{blog.subtitle}</p>
              </div>
              <div className="blog-content-side">
                <div className="enhanced-summary">
                  {blog.content.map((para, j) => <p key={j}>{para}</p>)}
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
}
