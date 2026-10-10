import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { logo } from '../data/images';

const items = [
  { label: 'Home', to: '/' },
  {
    label: 'Portfolio',
    to: '/portfolio',
    dropdown: [
      { label: 'Couple Portraits/ Pre wedding', to: '/couples' },
      { label: 'Weddings/ Reception', to: '/weddings' },
      { label: 'Food Photography', to: '/elopements' },
      { label: 'Equestrian Photography', to: '/adventure' },
    ],
  },
  {
    label: 'Info',
    dropdown: [
      { label: 'Investment', to: '/investment' },
      { label: 'Experience', to: '/experience' },
    ],
  },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
  { label: 'Blog', to: '/blog' },
];

export default function Navbar() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(null);
  const onPost = location.pathname.startsWith('/blog/');
  const overlay = location.pathname === '/' || onPost;

  useEffect(() => {
    setOpen(false);
    setExpanded(null);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const childActive = (item) => item.dropdown?.some((sub) => location.pathname === sub.to);

  return (
    <>
      <header className={`kk-nav ${overlay ? 'overlay' : 'solid'} ${onPost ? 'on-post' : ''} ${scrolled ? 'scrolled' : ''}`}>
        <div className="kk-nav-inner">
          <Link to="/" className="kk-logo" aria-label="Karakovan Photography">
            <img src={logo} alt="Karakovan Photography" />
          </Link>
          <ul className="kk-links">
            {items.map((item) => (
              <li key={item.label} className={item.dropdown ? 'kk-drop' : undefined}>
                {item.dropdown ? (
                  <>
                    {item.to ? (
                      <NavLink to={item.to} className={() => (childActive(item) ? 'active' : '')}>
                        {item.label} <span className="kk-caret" />
                      </NavLink>
                    ) : (
                      <button type="button" className={childActive(item) ? 'active' : ''}>
                        {item.label} <span className="kk-caret" />
                      </button>
                    )}
                    <div className="kk-menu">
                      {item.dropdown.map((sub) => (
                        <NavLink key={sub.to} to={sub.to}>{sub.label}</NavLink>
                      ))}
                    </div>
                  </>
                ) : (
                  <NavLink to={item.to} end={item.to === '/'} className={({ isActive }) => (isActive ? 'kk-link active' : 'kk-link')}>
                    {item.label}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
          <button className="kk-burger" aria-label="Open menu" onClick={() => setOpen(true)}>
            <span />
          </button>
        </div>
      </header>

      <div className={`kk-overlay ${open ? 'open' : ''}`}>
        <button className="kk-overlay-close" onClick={() => setOpen(false)} aria-label="Close menu">✕</button>
        {items.map((item) => (
          <div key={item.label}>
            {item.dropdown ? (
              <>
                <button
                  type="button"
                  className="kk-ov-link"
                  onClick={() => setExpanded(expanded === item.label ? null : item.label)}
                >
                  {item.label} <span>{expanded === item.label ? '–' : '+'}</span>
                </button>
                {expanded === item.label && (
                  <div className="kk-sub">
                    {item.to && <Link to={item.to} onClick={() => setOpen(false)}>All {item.label}</Link>}
                    {item.dropdown.map((sub) => (
                      <Link key={sub.to} to={sub.to} onClick={() => setOpen(false)}>{sub.label}</Link>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <Link to={item.to} onClick={() => setOpen(false)}>{item.label}</Link>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
