import { Link } from 'react-router-dom';
import Reveal from './Reveal';
import styles from './Reasons.module.css';

const points = [
  'The whole path is digital, so booking, choosing frames, and delivery stay simple.',
  'Timelines are kept. Highlights and the full gallery arrive when they are promised.',
  'Printed albums are made to the same standard as the pictures inside them.',
];

const Reasons = () => {
  return (
    <section className={styles.section}>
      <Reveal>
        <p className={styles.kicker}>embark on a beautiful adventure</p>
        <h2 className={styles.title}>3 main reasons why you<br />need to choose us</h2>
      </Reveal>

      <ul className={styles.list}>
        {points.map((point, i) => (
          <Reveal key={point} delay={i * 0.08}>
            <li>{point}</li>
          </Reveal>
        ))}
      </ul>

      <Reveal delay={0.15}>
        <p className={styles.note}>
          And then the people. Personality, care, and a calm presence on the day matter as much as the camera.
        </p>
        <Link to="/experience" className="btn-cta">Learn More</Link>
      </Reveal>
    </section>
  );
};

export default Reasons;
