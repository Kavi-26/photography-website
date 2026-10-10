import { Link } from 'react-router-dom';
import Reveal, { Photo } from '../components/Reveal';
import styles from './GalleryPage.module.css';

export default function GalleryPage({ kicker, title, intro, images }) {
  return (
    <article className={styles.page}>
      <header className={styles.hero}>
        <Reveal>
          <p className={styles.kicker}>{kicker}</p>
          <h1>{title}</h1>
          <p className={styles.intro}>{intro}</p>
        </Reveal>
      </header>
      <div className={styles.grid}>
        {images.map((src, i) => (
          <Photo key={src + i} src={src} alt="" className={styles.frame} fill={false} />
        ))}
      </div>
      <div className={styles.end}>
        <Link to="/contact" className="btn-cta">Plan a session</Link>
      </div>
    </article>
  );
}
