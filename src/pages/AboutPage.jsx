import { Link } from 'react-router-dom';
import Reveal, { Photo } from '../components/Reveal';
import styles from './AboutPage.module.css';

const team = [
  { name: 'Dharani Jayakumar', role: 'Media manager' },
  { name: 'Bharath Selvaraj', role: 'Studio admin' },
  { name: 'Karthik Raveendran', role: 'Lead videographer' },
  { name: 'Rajesh Swaminathan', role: 'Photographer' },
];

const AboutPage = () => {
  return (
    <article className={styles.page}>
      <header className={styles.hero}>
        <Reveal>
          <p className={styles.kicker}>Photography is poetry</p>
          <h1>Before you share your story, here is mine.</h1>
        </Reveal>
      </header>

      <section className={styles.split}>
        <Photo src="/images/about.jpg" alt="Behind the camera" className={styles.photo} />
        <Reveal>
          <p className={styles.let}>Let me tell you mine</p>
          <p>
            I’m Kharthik. More than ten years of weddings, portraits, headshots, and food. I trained as a mechanical engineer, and that habit of measuring light and timing never left. The pictures still have to feel like people, not a setup.
          </p>
          <p>
            In person I’m straightforward. I like unplanned conversations, travel, and making the work together. You can expect patience and a clear plan, along with the photographs.
          </p>
        </Reveal>
      </section>

      <section className={styles.team}>
        <Reveal>
          <p className={styles.kicker}>The team</p>
          <h2>The people around the camera</h2>
          <p className={styles.lead}>
            Planning, light, edit, and the messages in between. The day works because more than one person is paying attention.
          </p>
        </Reveal>
        <div className={styles.teamGrid}>
          {team.map((person) => (
            <Reveal key={person.name}>
              <article>
                <h3>{person.name}</h3>
                <p>{person.role}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className={styles.schedule}>
        <Reveal>
          <p className={styles.kicker}>Travel</p>
          <h2>The horizon is open. The calendar is not locked yet.</h2>
          <p>
            No fixed trips posted for the season. If you want a date held, write and we will see whether the place and the week line up.
          </p>
          <Link to="/contact" className="btn-cta">Ask about a date</Link>
        </Reveal>
      </section>
    </article>
  );
};

export default AboutPage;
