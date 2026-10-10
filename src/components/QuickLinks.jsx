import { Link } from 'react-router-dom';

const defaults = [
  { title: 'About Me', sub: 'get to know me', to: '/about' },
  { title: 'Portfolio', sub: 'view my work', to: '/portfolio' },
  { title: 'Contact Me', sub: 'get in touch', to: '/contact' },
];

export default function QuickLinks({ band = false, links = defaults }) {
  return (
    <section className={`links-band ${band ? 'filled' : ''}`}>
      <div className="links-row">
        {links.map((link) => (
          <Link key={link.to} to={link.to}>
            {link.title}
            <small>{link.sub}</small>
          </Link>
        ))}
      </div>
    </section>
  );
}
