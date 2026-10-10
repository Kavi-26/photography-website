import { Link } from 'react-router-dom';
import Reveal, { Photo } from './Reveal';
import styles from './About.module.css';

const About = () => {
  return (
    <section id="about" className={styles.section}>
      <div className={styles.grid}>
        <Reveal className={styles.copy}>
          <p className={styles.kicker}>a little note</p>
          <h2>Hello everyone, my name is Kharthik</h2>
          <p>
            I photograph weddings, portraits, food, and the occasional headshot. The path here started in mechanical engineering, then stayed with the pictures. Precision from one, feeling from the other.
          </p>
          <Link to="/about" className="btn-outline">More about me</Link>
        </Reveal>
        <Photo src="/images/about.jpg" alt="Photographer at work" className={styles.photo} />
      </div>
    </section>
  );
};

export default About;
