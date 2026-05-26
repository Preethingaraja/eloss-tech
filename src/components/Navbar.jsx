import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logoImg from '../assets/logo.png';

export default function Navbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const path = location.pathname;
  const user = localStorage.getItem('eloss_user');

  const links = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About Us' },
    { to: '/leaders', label: 'Leaders' },
    { to: '/blog', label: 'Blog' },
    { to: '/portfolio', label: 'Portfolio' },
    { to: '/classes', label: 'Classes' },
    { to: '/courses', label: 'Courses' },
    { to: '/services', label: 'Services' },
    { to: '/careers', label: 'Careers' },
    { to: '/news', label: 'Company News' },
  ];

  const dropdownLinks = [
    { to: '/digital-forms', label: 'Digital Forms' },
    { to: '/refund-policy', label: 'Refund & Return Policy' },
    { to: '/terms', label: 'Terms & Conditions' },
    { to: '/privacy', label: 'Privacy Policy' },
    { to: '/cookie-policy', label: 'Cookie Policy' },
    { to: '/contact', label: 'Contact Us' },
  ];

  // If clicking the currently active route, scroll to top manually
  const handleNavClick = (to) => {
    if (path === to) {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  };

  const logout = () => {
    localStorage.removeItem('eloss_user');
    localStorage.removeItem('eloss_chat_session');
    localStorage.removeItem('eloss_chat_name');
    window.location.href = '/login';
  };

  return (
    <>
      <style>{`
        #navbar {
          padding: 1rem 2%;
        }
        .logo {
          border: none !important;
          padding: 0 !important;
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
        }
        .logo-text {
          font-weight: 900;
          font-size: 1.1rem;
          color: var(--primary);
          text-transform: none;
          letter-spacing: 1px;
        }
        .logo img {
          height: 40px;
          border-radius: 50%;
        }
        .nav-links {
          gap: 1rem;
          align-items: center;
        }
        .nav-links li {
          white-space: nowrap;
        }
        .nav-links a {
          letter-spacing: 0.5px !important;
          text-transform: none !important;
          font-size: 0.85rem !important;
        }
        .nav-dropdown {
          position: relative;
          cursor: pointer;
        }
        .nav-dropdown > span {
          color: var(--text);
          font-weight: 700;
          font-size: 0.85rem !important;
          text-transform: none !important;
          letter-spacing: 0.5px !important;
          display: flex;
          align-items: center;
          gap: 2px;
          transition: 0.3s;
          white-space: nowrap;
        }
        .nav-dropdown:hover > span {
          color: var(--primary);
        }
        .nav-logout-btn {
          white-space: nowrap;
          text-transform: none !important;
          font-size: 0.85rem !important;
        }
        .btn-cta {
          white-space: nowrap;
          letter-spacing: 0.5px !important;
          text-transform: none !important;
        }
        .dropdown-menu {
          position: absolute;
          top: 100%;
          right: 0;
          background: #fff;
          border: 1px solid var(--glass-border);
          border-radius: var(--radius);
          padding: 0.5rem 0;
          min-width: 220px;
          box-shadow: 0 15px 35px rgba(0,0,0,0.1);
          opacity: 0;
          visibility: hidden;
          transform: translateY(10px);
          transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          flex-direction: column;
          z-index: 1000;
        }
        .nav-dropdown:hover .dropdown-menu {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }
        .dropdown-menu a {
          padding: 0.7rem 1.2rem;
          color: var(--text) !important;
          font-size: 0.95rem !important;
          text-transform: none !important;
          letter-spacing: 0 !important;
          display: block;
          transition: 0.2s;
        }
        .dropdown-menu a:hover {
          background: #f8f9fa;
          color: var(--primary) !important;
          padding-left: 1.5rem;
        }
        .mobile-menu a {
          text-transform: none !important;
        }
        .mobile-dropdown-menu {
          display: flex;
          flex-direction: column;
          padding-left: 1rem;
          border-left: 2px solid #eee;
          margin: 0.5rem 0 0.5rem 0.5rem;
          gap: 0.5rem;
        }
        .mobile-dropdown-menu a {
          font-size: 0.95rem !important;
          text-transform: none !important;
          border: none !important;
          padding: 0.3rem 0 !important;
        }
        .mobile-more-btn {
          font-weight: 700;
          font-size: 0.95rem;
          text-transform: none;
          letter-spacing: 1px;
          color: #000;
          text-decoration: none;
          padding: 0.5rem 0;
          border-bottom: 1px solid #eee;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
        }
        @media (max-width: 1300px) {
          .nav-links {
            gap: 0.5rem;
          }
          .nav-links a, .nav-dropdown > span {
            font-size: 0.55rem !important;
            letter-spacing: 0 !important;
          }
          .btn-cta {
            padding: 0.3rem 0.8rem !important;
            font-size: 0.55rem !important;
          }
        }
        @media (max-width: 1024px) {
          .nav-links, .btn-cta {
            display: none !important;
          }
          .hamburger {
            display: flex !important;
          }
        }
      `}</style>
      
      <nav id="navbar">
        <Link to="/" className="logo" onClick={() => handleNavClick('/')}>
          <img src={logoImg} alt="Eloss Technologies" />
          <span className="logo-text">Eloss Technologies</span>
        </Link>
        <ul className="nav-links">
          {user && (
            <>
              {links.map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className={path === to ? 'active' : ''}
                    onClick={() => handleNavClick(to)}
                  >
                    {label}
                  </Link>
                </li>
              ))}
              
              <li className="nav-dropdown">
                <span>More <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>expand_more</span></span>
                <div className="dropdown-menu">
                  {dropdownLinks.map(({ to, label }) => (
                    <Link key={to} to={to} onClick={() => handleNavClick(to)}>
                      {label}
                    </Link>
                  ))}
                </div>
              </li>
              
              <li><button onClick={logout} className="nav-logout-btn">Logout</button></li>
            </>
          )}
        </ul>
        {user && (
          <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            <span></span>
            <span></span>
            <span></span>
          </button>
        )}
      </nav>

      {user && (
        <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
          {links.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              onClick={() => { handleNavClick(to); setMenuOpen(false); }}
            >
              {label}
            </Link>
          ))}
          
          <div 
            className="mobile-more-btn" 
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            More 
            <span className="material-symbols-outlined">
              {dropdownOpen ? 'expand_less' : 'expand_more'}
            </span>
          </div>
          
          {dropdownOpen && (
            <div className="mobile-dropdown-menu">
              {dropdownLinks.map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  onClick={() => { handleNavClick(to); setMenuOpen(false); }}
                >
                  {label}
                </Link>
              ))}
            </div>
          )}

          <Link
            to="/contact"
            className="btn-cta"
            onClick={() => { handleNavClick('/contact'); setMenuOpen(false); }}
            style={{ textAlign: 'center', marginTop: '0.5rem' }}
          >
            Apply Now
          </Link>

          <button
            onClick={() => { setMenuOpen(false); logout(); }}
            className="nav-logout-btn"
            style={{ marginTop: '1rem', width: '100%', padding: '0.8rem', fontSize: '0.95rem' }}
          >
            Logout
          </button>
        </div>
      )}
    </>
  );
}
