import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { BRAND_NAME } from '../../config/constants';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { to: '/', label: 'Home' },
    { to: '/gallery', label: 'Gallery' },
    { to: '/#categories', label: 'Categories' },
    { to: '/#about', label: 'About' },
    { to: '/#contact', label: 'Contact' },
  ];

  return (
    <>
      <header className="header">
        <div className="header-inner">
          <Link to="/" className="header-logo">
            <h1>Art <span className="logo-accent">Gallery</span> LK</h1>
          </Link>

          <nav className="nav-links">
            {navItems.map(item => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => isActive && item.to !== '/#categories' && item.to !== '/#about' && item.to !== '/#contact' ? 'active' : ''}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <button
            className="mobile-menu-btn"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      <nav className={`mobile-nav ${mobileOpen ? 'open' : ''}`}>
        {navItems.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={() => setMobileOpen(false)}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </>
  );
}
