import Reveal from './Reveal';
import styles from './Quote.module.css';

const Quote = () => {
  return (
    <section className={styles.section}>
      <Reveal>
        <blockquote>
          “Every moment is a fresh beginning. Capture it before it becomes a memory.”
        </blockquote>
        <cite>— T.S. Eliot</cite>
      </Reveal>
    </section>
  );
};

export default Quote;
