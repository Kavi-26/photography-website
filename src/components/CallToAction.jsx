import { Link } from 'react-router-dom';
import { home } from '../data/images';

export default function CallToAction({
  image = home.banner,
  title = 'Your Adventure Awaits - Let’s Capture It',
  subtitle = 'weddings. Engagement. Couple portraits. Corporate headshots. Birthdays. Food photography. Equestrian Sports',
  cta = 'Contact me',
  to = '/contact',
  short = false,
  position = '72% 26%',
  align = 'center',
  id = 'cta',
  flush = false,
}) {
  return (
    <section id={id} className={`banner ${short ? 'short' : ''} ${flush ? 'edge' : ''} ${align === 'split' ? 'offer' : ''} ${align === 'title' ? 'title-left' : ''} ${align === 'aside' ? 'aside' : ''}`}>
      <img src={image} alt="" style={{ objectPosition: position }} />
      <div className="tint" />
      <div className="banner-copy">
        <h1>{title}</h1>
        {align === 'aside' ? (
          <div className="aside">
            {subtitle && <h4>{subtitle}</h4>}
            {cta && <Link to={to} className="ps-button">{cta}</Link>}
          </div>
        ) : (
          <>
            {cta && <Link to={to} className="ps-button">{cta}</Link>}
            {subtitle && <h4>{subtitle}</h4>}
          </>
        )}
      </div>
    </section>
  );
}
