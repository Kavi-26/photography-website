import { Link } from 'react-router-dom';
import { FiInstagram } from 'react-icons/fi';
import styles from './Footer.module.css';

const instagram = [
  '/images/ig-1.jpg',
  '/images/ig-2.jpg',
  '/images/ig-3.jpg',
  '/images/ig-4.jpg',
  '/images/ig-5.jpg',
  '/images/ig-6.jpg',
];

const Footer = () => {
  return (
    <footer>
      <section className={styles.ctaSection}>
        <div className={styles.ctaBg} style={{ backgroundImage: 'url(/images/cta.jpg)' }} />
        <div className={styles.ctaOverlay} />
        <div className={styles.ctaContent}>
          <p className={styles.ctaTagline}>Weddings. Engagement. Couple portraits. Headshots. Food. Equestrian.</p>
          <h2 className={styles.ctaHeading}>Your adventure awaits.<br />Let’s capture it.</h2>
          <Link to="/contact" className="btn-cta">Contact me</Link>
        </div>
      </section>

      <div className={styles.instaGrid}>
        {instagram.map((src) => (
          <a
            key={src}
            className={styles.instaCell}
            href="https://instagram.com/karakovan_photography"
            target="_blank"
            rel="noreferrer"
            aria-label="Karakovan on Instagram"
          >
            <img src={src} alt="" />
            <span className={styles.instaOverlay}><FiInstagram size={22} color="#fff" /></span>
          </a>
        ))}
      </div>

      <div className={styles.footerBottom}>
        <a
          className={styles.handle}
          href="https://instagram.com/karakovan_photography"
          target="_blank"
          rel="noreferrer"
        >
          @karakovan_photography
        </a>
        <p className={styles.copyright}>© {new Date().getFullYear()} Karakovan Photography</p>
      </div>
    </footer>
  );
};

export default Footer;
