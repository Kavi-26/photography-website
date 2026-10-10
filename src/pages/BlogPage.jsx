import { Link } from 'react-router-dom';
import Reveal, { Photo } from '../components/Reveal';
import styles from './BlogPage.module.css';

const BlogPage = () => {
  return (
    <article className={styles.page}>
      <header className={styles.hero}>
        <Reveal>
          <p className={styles.date}>April 3, 2026</p>
          <h1>The Subconscious Echo: When Art Emerges Unbidden</h1>
          <p>
            Some frames arrive before the plan does. This note is about trusting that moment, then editing with a clearer head the next morning.
          </p>
        </Reveal>
      </header>
      <Photo src="/images/blog.jpg" alt="" className={styles.photo} />
      <p className={styles.more}>
        More writing will land here. <Link to="/contact">Write if you want the next one.</Link>
      </p>
    </article>
  );
};

export default BlogPage;
