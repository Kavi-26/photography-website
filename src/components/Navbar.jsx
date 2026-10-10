import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import styles from './Navbar.module.css';

const navItems = [
  { label: 'HOME', to: '/' },
  {
    label: 'PORTFOLIO',
    dropdown: [
      { label: 'Couple Portraits/ Pre wedding', to: '/couples' },
      { label: 'Weddings/ Reception', to: '/weddings' },
      { label: 'Food Photography', to: '/elopements' },
      { label: 'Equestrian Photography', to: '/adventure' },
    ]
  },
  {
    label: 'INFO',
    dropdown: [
      { label: 'Investment', to: '/investment' },
      { label: 'Experience', to: '/experience' },
    ]
  },
  { label: 'ABOUT', to: '/about' },
  { label: 'CONTACT', to: '/contact' },
  { label: 'BLOG', to: '/blog' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const navRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
    setMobileExpanded(null);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setOpenDropdown(null);
        setMobileOpen(false);
      }
    };
    const handleKey = (e) => {
      if (e.key === 'Escape') {
        setOpenDropdown(null);
        setMobileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKey);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const isHome = location.pathname === '/';
  const forceSolid = !isHome;
  const isChildActive = (item) => item.dropdown?.some((sub) => sub.to === location.pathname);

  return (
    <nav
      ref={navRef}
      className={`${styles.navbar} ${(scrolled || forceSolid) ? styles.scrolled : ''}`}
    >
      <Link to="/" className={styles.logo}>
        <div className={styles.logoIcon}>
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="1" y="1" width="11" height="11" stroke="#C4973B" strokeWidth="1.5"/>
            <rect x="16" y="1" width="11" height="11" stroke="#C4973B" strokeWidth="1.5"/>
            <rect x="1" y="16" width="11" height="11" stroke="#C4973B" strokeWidth="1.5"/>
            <rect x="16" y="16" width="11" height="11" stroke="#C4973B" strokeWidth="1.5" strokeDasharray="2 2"/>
          </svg>
        </div>
        <div className={styles.logoText}>
          <span className={styles.logoName}>KARAKOVAN</span>
          <span className={styles.logoSub}>PHOTOGRAPHY</span>
        </div>
      </Link>

      <ul className={styles.navLinks}>
        {navItems.map((item) => (
          <li
            key={item.label}
            className={`${styles.navItem} ${item.dropdown ? styles.hasDropdown : ''}`}
            onMouseEnter={() => item.dropdown && setOpenDropdown(item.label)}
            onMouseLeave={() => item.dropdown && setOpenDropdown(null)}
          >
            {item.dropdown ? (
              <button
                type="button"
                className={`${styles.navLink} ${styles.navButton} ${isChildActive(item) ? styles.activeLink : ''}`}
                aria-haspopup="true"
                aria-expanded={openDropdown === item.label}
                onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
              >
                {item.label}
                <span className={`${styles.caret} ${openDropdown === item.label ? styles.caretOpen : ''}`}>▾</span>
              </button>
            ) : (
              <NavLink
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) => `${styles.navLink} ${isActive ? styles.activeLink : ''}`}
              >
                {item.label}
              </NavLink>
            )}

            {item.dropdown && (
              <ul className={`${styles.dropdown} ${openDropdown === item.label ? styles.dropdownOpen : ''}`}>
                {item.dropdown.map((sub) => (
                  <li key={sub.label}>
                    <NavLink
                      to={sub.to}
                      className={({ isActive }) => `${styles.dropdownLink} ${isActive ? styles.dropdownActive : ''}`}
                      onClick={() => setOpenDropdown(null)}
                    >
                      {sub.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>

      <button
        className={styles.hamburger}
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle menu"
        aria-expanded={mobileOpen}
      >
        <span className={`${styles.bar} ${mobileOpen ? styles.bar1Open : ''}`} />
        <span className={`${styles.bar} ${mobileOpen ? styles.bar2Open : ''}`} />
        <span className={`${styles.bar} ${mobileOpen ? styles.bar3Open : ''}`} />
      </button>

      <div
        className={`${styles.mobileBackdrop} ${mobileOpen ? styles.mobileBackdropOpen : ''}`}
        onClick={() => setMobileOpen(false)}
      />

      <div className={`${styles.mobileMenu} ${mobileOpen ? styles.mobileMenuOpen : ''}`}>
        <button className={styles.mobileClose} onClick={() => setMobileOpen(false)} aria-label="Close menu">✕</button>
        {navItems.map((item) => (
          <div key={item.label}>
            {item.dropdown ? (
              <>
                <button
                  type="button"
                  className={`${styles.mobileLink} ${styles.mobileToggle} ${isChildActive(item) ? styles.mobileActive : ''}`}
                  aria-expanded={mobileExpanded === item.label}
                  onClick={() => setMobileExpanded(mobileExpanded === item.label ? null : item.label)}
                >
                  {item.label}
                  <span className={`${styles.caret} ${mobileExpanded === item.label ? styles.caretOpen : ''}`}>▾</span>
                </button>
                <div className={`${styles.mobileSubList} ${mobileExpanded === item.label ? styles.mobileSubListOpen : ''}`}>
                  {item.dropdown.map((sub) => (
                    <NavLink
                      key={sub.label}
                      to={sub.to}
                      className={({ isActive }) => `${styles.mobileSub} ${isActive ? styles.mobileActive : ''}`}
                      onClick={() => setMobileOpen(false)}
                    >
                      {sub.label}
                    </NavLink>
                  ))}
                </div>
              </>
            ) : (
              <NavLink
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) => `${styles.mobileLink} ${isActive ? styles.mobileActive : ''}`}
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </NavLink>
            )}
          </div>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
