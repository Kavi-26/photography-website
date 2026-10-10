import { useState } from 'react';
import { Link } from 'react-router-dom';
import Reveal, { Photo } from '../components/Reveal';
import styles from './InvestmentPage.module.css';

const packages = [
  {
    title: 'Wedding & reception',
    image: '/images/wed-3.jpg',
    items: ['Candid photography', 'Cinematic video', 'Traditional photography', 'Traditional videography', 'Premium photo album'],
    note: 'The figure moves with the guest count and anything specific you add.',
  },
  {
    title: 'Baby shower / engagement',
    image: '/images/story-6.jpg',
    items: ['Candid photography', 'Traditional photography', 'Cinematic video', 'Traditional videography', 'Premium photo album'],
    note: 'Extra coverage is quoted on its own.',
  },
  {
    title: 'Couple shoot / pre-wedding',
    image: '/images/story-1.jpg',
    items: ['Candid photography'],
    note: 'Location, time of day, and extra outfits can change the plan.',
  },
  {
    title: 'Corporate headshots',
    image: '/images/about.jpg',
    items: ['Corporate style headshot photos'],
    note: 'More wardrobe changes can change the sitting.',
  },
];

const faqs = [
  {
    q: 'Are travel costs inside the quote?',
    a: 'Usually yes, unless the quote says the trip is separate.',
  },
  {
    q: 'Can the team grow, or the location get more ambitious?',
    a: 'Yes. Extra photographers and harder locations are planned in advance so the day stays safe and covered.',
  },
  {
    q: 'Can a dog be in the ceremony and the pictures?',
    a: 'Yes. Tell us early so there is time and space for them.',
  },
  {
    q: 'When do the photos arrive, and how?',
    a: 'Highlights come first. The full set follows inside the window written in your quote, generally within about 40 days, and everything is delivered digitally.',
  },
  {
    q: 'How early should we book?',
    a: 'Six to twelve months ahead is the comfortable window, especially in busy months.',
  },
  {
    q: 'Are the packages fixed?',
    a: 'They are a starting shape. Hours, albums, and a second photographer can be swapped to fit the day.',
  },
];

const InvestmentPage = () => {
  const [open, setOpen] = useState(0);

  return (
    <article className={styles.page}>
      <header className={styles.hero}>
        <Reveal>
          <p className={styles.kicker}>Info</p>
          <h1>Investment details</h1>
        </Reveal>
      </header>

      {packages.map((pack, i) => (
        <section key={pack.title} className={`${styles.row} ${i % 2 ? styles.flip : ''}`}>
          <Photo src={pack.image} alt="" className={styles.photo} />
          <Reveal>
            <h2>{pack.title}</h2>
            <p className={styles.price}>Quoted for the day</p>
            <p>This includes</p>
            <ul>
              {pack.items.map((item) => <li key={item}>{item}</li>)}
            </ul>
            <p className={styles.note}>{pack.note}</p>
          </Reveal>
        </section>
      ))}

      <section className={styles.ready}>
        <h2>Are you ready for your adventure? Let’s do it.</h2>
        <Link to="/contact" className="btn-cta">Contact me</Link>
      </section>

      <section className={styles.faq}>
        <h2>FAQ</h2>
        {faqs.map((item, i) => (
          <button
            key={item.q}
            type="button"
            className={`${styles.item} ${open === i ? styles.open : ''}`}
            onClick={() => setOpen(open === i ? -1 : i)}
          >
            <span>{item.q}</span>
            {open === i && <p>{item.a}</p>}
          </button>
        ))}
      </section>
    </article>
  );
};

export default InvestmentPage;
