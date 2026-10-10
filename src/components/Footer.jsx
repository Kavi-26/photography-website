import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa';
import { home } from '../data/images';

const footerNav = [
  { label: 'Home', to: '/' },
  {
    label: 'Portfolio',
    to: '/portfolio',
    dropdown: [
      { label: 'Couple Portraits/ Pre weddding', to: '/couples' },
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

export default function Footer() {
  return (
    <footer className="site-footer">
      <a className="ig-handle" href="https://www.instagram.com/karakovan_photography" target="_blank" rel="noreferrer">
        @karakovan_photography
      </a>
      <div className="ig-row">
        {home.stories.slice(0, 7).map((src) => (
          <a key={src} href="https://www.instagram.com/karakovan_photography" target="_blank" rel="noreferrer">
            <img src={src} alt="" />
          </a>
        ))}
      </div>
      <nav className="foot-nav">
        {footerNav.map((item) => (
          <div className="foot-item" key={item.label}>
            {item.to ? <Link to={item.to}>{item.label}</Link> : <span>{item.label}</span>}
            {item.dropdown && (
              <ul>
                {item.dropdown.map((sub) => (
                  <li key={sub.to}><Link to={sub.to}>{sub.label}</Link></li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </nav>
      <div className="foot-bottom">
        <p>© 2026 Karakovan Photography</p>
        <div className="socials">
          <a href="https://www.facebook.com/KaraKovanPhotography" target="_blank" rel="noreferrer" aria-label="Facebook"><FaFacebookF /></a>
          <a href="https://www.instagram.com/karakovan_photography/" target="_blank" rel="noreferrer" aria-label="Instagram"><FaInstagram /></a>
          <a href="https://www.youtube.com/channel/UC-gZU9bY7GyZW6TqpPMAS6Q" target="_blank" rel="noreferrer" aria-label="YouTube"><FaYoutube /></a>
        </div>
        <button type="button" className="to-top" aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>↑</button>
      </div>
    </footer>
  );
}
