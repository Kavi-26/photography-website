import { Link } from 'react-router-dom';
import { useState } from 'react';
import Reveal from '../components/Reveal';
import styles from './ExperiencePage.module.css';

const reasons = [
  {
    title: 'Double backup, zero compromise',
    text: 'Cards and drives are doubled through the day and again before delivery, so a single failure does not take the pictures with it.',
  },
  {
    title: 'On schedule, every time',
    text: 'Arrival and delivery follow the date we set. If something needs longer, you hear about it before the deadline, not after.',
  },
  {
    title: 'Polished professionals',
    text: 'The team dresses for your celebration and stays easy to be around while the room is full of your people.',
  },
  {
    title: 'Digital, all the way',
    text: 'Galleries, album picks, and notes happen online, on your time, without a stack of paperwork.',
  },
  {
    title: 'An album that can hold the pictures',
    text: 'Prints lay flat, so a spine does not cut through the middle of a frame. The object has to be worthy of the day.',
  },
  {
    title: 'Apples and oranges',
    text: 'Two quotes can list the same hours and the same count of files. The difference is the seeing. Compare the work, not the checklist.',
  },
];

const faqs = [
  ['Are travel costs inside the quote?', 'Usually yes, unless the quote says otherwise.'],
  ['Can we add people or a harder location?', 'Yes. Extra coverage and ambitious places are planned before the day.'],
  ['Can our dog be in the pictures?', 'Yes. Tell us early so the timing works for them too.'],
  ['How are the photos delivered?', 'Highlights first, then the full digital gallery, generally within about 40 days.'],
  ['How far ahead should we book?', 'Six to twelve months is the safe range for popular dates.'],
  ['Can a package change?', 'Yes. Treat the list as a start, then adjust hours, albums, or a second shooter.'],
];

const ExperiencePage = () => {
  const [open, setOpen] = useState(0);

  return (
    <article className={styles.page}>
      <section className={styles.hero}>
        <Reveal>
          <p className={styles.kicker}>I’m the person behind the camera</p>
          <h1>I’ll guide you through the entire process</h1>
          <p>
            I’m Kharthik. I live in Coimbatore with my partner and our daughter. The clearest way to judge the work is to look at it. Weddings, headshots, and food all start from what you want the pictures to feel like.
          </p>
          <Link to="/contact" className="btn-cta">Contact me</Link>
        </Reveal>
      </section>

      <section className={styles.banner}>
        <h2>What you’re paying for, and why it matters</h2>
      </section>

      <section className={styles.grid}>
        {reasons.map((reason, i) => (
          <Reveal key={reason.title} delay={(i % 3) * 0.06}>
            <article>
              <span>0{i + 1}</span>
              <h3>{reason.title}</h3>
              <p>{reason.text}</p>
            </article>
          </Reveal>
        ))}
      </section>

      <section className={styles.faq}>
        <h2>FAQ</h2>
        {faqs.map(([q, a], i) => (
          <button
            key={q}
            type="button"
            className={styles.item}
            onClick={() => setOpen(open === i ? -1 : i)}
          >
            <strong>{q}</strong>
            {open === i && <p>{a}</p>}
          </button>
        ))}
      </section>
    </article>
  );
};

export default ExperiencePage;
