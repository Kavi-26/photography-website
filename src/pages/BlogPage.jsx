import { Link } from 'react-router-dom';
import { blogCover } from '../data/images';

export default function BlogPage() {
  return (
    <article className="page">
      <Link to="/blog/the-subconscious-echo-when-art-emerges-unbidden" className="blog-card">
        <time>April 3, 2026</time>
        <h2>The Subconscious Echo: When Art Emerges Unbidden</h2>
        <img src={blogCover} alt="" />
      </Link>
    </article>
  );
}
