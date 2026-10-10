import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import Reveal from './Reveal';
import styles from './LoveStories.module.css';

const stories = [
  { src: '/images/story-1.jpg', title: 'Hill light', place: 'Coorg' },
  { src: '/images/story-2.jpg', title: 'Open shore', place: 'Coast' },
  { src: '/images/story-3.jpg', title: 'Quiet vows', place: 'Courtyard' },
  { src: '/images/story-4.jpg', title: 'Evening aisle', place: 'Garden' },
  { src: '/images/story-5.jpg', title: 'First look', place: 'Studio' },
  { src: '/images/story-6.jpg', title: 'After dark', place: 'Reception' },
  { src: '/images/story-7.jpg', title: 'Celebration', place: 'Hall' },
  { src: '/images/story-8.jpg', title: 'Hands', place: 'Detail' },
];

const pad = (n) => String(n).padStart(2, '0');

const LoveStories = () => {
  const railRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ['start start', 'end end'],
  });
  const x = useTransform(scrollYProgress, [0, 1], ['4%', '-68%']);
  const count = useTransform(scrollYProgress, [0, 1], [1, stories.length]);
  const label = useTransform(count, (v) => pad(Math.min(stories.length, Math.max(1, Math.round(v)))));

  return (
    <section id="stories">
      <div className={styles.intro}>
        <div
          className={styles.introBg}
          style={{ backgroundImage: 'url(/images/love.jpg)' }}
        />
        <div className={styles.introShade} />
        <Reveal className={styles.introCopy}>
          <p className={styles.kicker}>Love Stories.</p>
          <h2 className={styles.headline}>Do it your way. We are here for the day you actually want.</h2>
          <p className={styles.subhead}>India or Anywhere Beyond</p>
          <p className={styles.body}>
            Mountains, a shoreline, a forest clearing, a family courtyard. The plan starts with the place that already feels like you, then the pictures follow.
          </p>
          <Link to="/weddings" className="btn-cta">Client Stories</Link>
        </Reveal>
      </div>

      <div className={styles.railWrap} ref={railRef}>
        <div className={styles.railSticky}>
          <div className={styles.railHead}>
            <p>Favourite client stories</p>
            <p className={styles.railCount}>
              <motion.span>{label}</motion.span>
              <span> / {pad(stories.length)}</span>
            </p>
          </div>
          <motion.div className={styles.track} style={{ x }}>
            {stories.map((story, i) => (
              <Link to="/couples" className={styles.card} key={story.src}>
                <div className={styles.cardImg}>
                  <img src={story.src} alt={story.title} />
                </div>
                <div className={styles.cardMeta}>
                  <span>{pad(i + 1)}</span>
                  <strong>{story.title}</strong>
                  <em>{story.place}</em>
                </div>
              </Link>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LoveStories;
