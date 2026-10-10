import { useState } from 'react';
import { galleries, couplesBanner } from '../data/images';

export default function CouplesPage() {
  const [open, setOpen] = useState(null);
  const images = galleries.couples.images.filter((src) => src !== couplesBanner);

  return (
    <article className="page">
      <section className="banner split">
        <img src={couplesBanner} alt="" style={{ objectPosition: '50% 50%' }} />
        <div className="tint" />
        <div className="banner-copy">
          <h1>Couple Portraits/ Pre wedding</h1>
          <p>You don’t need a big, special occasion to celebrate each other and document your relationship. Pick a location and let’s start planning a marvelous photoshoot. Couple shoot is my fav of all.</p>
        </div>
      </section>
      <section className="section">
        <div className="masonry">
          {images.map((src) => (
            <img key={src} src={src} alt="" onClick={() => setOpen(src)} />
          ))}
        </div>
      </section>
      {open && (
        <div className="lightbox-overlay" onClick={() => setOpen(null)}>
          <button className="lightbox-close" type="button" aria-label="Close">✕</button>
          <img className="lightbox-content" src={open} alt="" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </article>
  );
}
