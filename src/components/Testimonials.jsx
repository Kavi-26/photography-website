import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import styles from './Testimonials.module.css';

const testimonials = [
  {
    name: 'Abi & Vino',
    text: 'Easy company, a steady pace, and portraits that still feel like us months later.',
  },
  {
    name: 'Arshad & Nyla',
    text: 'Patient through a long day, and the gallery arrived when it was promised.',
  },
  {
    name: 'Deepthi Saravanan',
    text: 'Headshots with a clear point of view. Colour, crop, and timing all felt considered.',
  },
];

const pad = (n) => String(n).padStart(2, '0');

const Testimonials = () => {
  const [active, setActive] = useState(0);
  const item = testimonials[active];

  const prev = () => setActive((p) => (p === 0 ? testimonials.length - 1 : p - 1));
  const next = () => setActive((p) => (p === testimonials.length - 1 ? 0 : p + 1));

  return (
    <section className={styles.section}>
      <p className={styles.kicker}>Testimonials</p>
      <div className={styles.row}>
        <button type="button" onClick={prev} className={styles.arrow} aria-label="Previous testimonial">←</button>
        <div className={styles.stage}>
          <AnimatePresence mode="wait">
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.45 }}
            >
              <h3>{item.name}</h3>
              <p>{item.text}</p>
            </motion.div>
          </AnimatePresence>
        </div>
        <button type="button" onClick={next} className={styles.arrow} aria-label="Next testimonial">→</button>
      </div>
      <p className={styles.count}>{pad(active + 1)} / {pad(testimonials.length)}</p>
    </section>
  );
};

export default Testimonials;
