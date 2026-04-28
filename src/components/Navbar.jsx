import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const path = location.pathname;

  const links = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About Us' },
    { to: '/leaders', label: 'Leaders' },
    { to: '/courses', label: 'Courses' },
    { to: '/blogs', label: 'Blogs' },
    { to: '/contact', label: 'Contact Us' },
  ];

  // If clicking the currently active route, scroll to top manually
  const handleNavClick = (to) => {
    if (path === to) {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  };

  return (
    <>
      <nav id="navbar">
        <Link to="/" className="logo" onClick={() => handleNavClick('/')}>Eloss Technologies</Link>
        <ul className="nav-links">
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
        </ul>
        <Link to="/contact" className="btn-cta" onClick={() => handleNavClick('/contact')}>Apply Now</Link>
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>

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
        <Link
          to="/contact"
          className="btn-cta"
          onClick={() => { handleNavClick('/contact'); setMenuOpen(false); }}
          style={{ textAlign: 'center', marginTop: '0.5rem' }}
        >
          Apply Now
        </Link>
      </div>
    </>
  );
}
