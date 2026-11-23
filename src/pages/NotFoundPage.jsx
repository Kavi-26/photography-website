import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <article className="page" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <section className="section" style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto', padding: '4rem 1.5rem' }}>
        <p style={{ letterSpacing: '0.25em', textTransform: 'uppercase', fontSize: '0.9rem', color: '#888', marginBottom: '1rem' }}>
          404 — Page Not Found
        </p>
        <h1 style={{ fontFamily: 'Libre Caslon Text, Georgia, serif', fontSize: '2.5rem', fontWeight: 400, marginBottom: '1.5rem', lineHeight: 1.2 }}>
          The page you are looking for does not exist.
        </h1>
        <p style={{ color: '#666', lineHeight: 1.6, marginBottom: '2.5rem' }}>
          It seems the link you followed is broken, or the page may have been moved.
        </p>
        <Link to="/" className="ps-button" style={{ display: 'inline-block' }}>
          Return to Home
        </Link>
      </section>
    </article>
  );
}
