import { useState, useEffect } from 'react';
import { galleries, couplesBanner } from '../data/images';

const pad = (n) => String(n).padStart(2, '0');

export default function CouplesPage() {
  const [openIndex, setOpenIndex] = useState(null);
  const images = galleries.couples.images.filter((src) => src !== couplesBanner);

  const go = (dir) => {
    setOpenIndex((curr) => {
      if (curr === null) return 0;
      return (curr + dir + images.length) % images.length;
    });
  };

  // Preload adjacent images in lightbox
  useEffect(() => {
    if (openIndex === null || !images.length) return;
    const preload = (url) => {
      if (!url) return;
      const img = new Image();
      img.src = url;
    };
    const nextIdx = (openIndex + 1) % images.length;
    const prevIdx = (openIndex - 1 + images.length) % images.length;
    preload(images[nextIdx]);
    preload(images[prevIdx]);
  }, [openIndex, images]);

  useEffect(() => {
    if (openIndex === null) return undefined;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setOpenIndex(null);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        go(-1);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        go(1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [openIndex, images.length]);

  return (
    <article className="page">
      <section className="banner split">
        <img src={couplesBanner} alt="Couple Portraits" style={{ objectPosition: '50% 50%' }} />
        <div className="tint" />
        <div className="banner-copy">
          <h1>Couple Portraits/ Pre wedding</h1>
          <p>You don’t need a big, special occasion to celebrate each other and document your relationship. Pick a location and let’s start planning a marvelous photoshoot. Couple shoot is my fav of all.</p>
        </div>
      </section>
      <section className="section">
        <div className="masonry">
          {images.map((src, idx) => (
            <img
              key={src}
              src={src}
              alt={`Couple portrait ${idx + 1}`}
              loading="lazy"
              decoding="async"
              onClick={() => setOpenIndex(idx)}
            />
          ))}
        </div>
      </section>
      {openIndex !== null && (
        <div className="lightbox-overlay kk-lb-in" onClick={() => setOpenIndex(null)}>
          <button className="lightbox-close" type="button" aria-label="Close" onClick={() => setOpenIndex(null)}>✕</button>
          <button
            className="lightbox-nav lightbox-prev"
            type="button"
            aria-label="Previous photo"
            title="Previous (←)"
            onClick={(e) => {
              e.stopPropagation();
              go(-1);
            }}
          >
            ←
          </button>
          <img
            key={openIndex}
            className="lightbox-content kk-lb-img"
            src={images[openIndex]}
            alt={`Couple portrait ${openIndex + 1} fullscreen`}
            fetchpriority="high"
            decoding="async"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="lightbox-nav lightbox-next"
            type="button"
            aria-label="Next photo"
            title="Next (→)"
            onClick={(e) => {
              e.stopPropagation();
              go(1);
            }}
          >
            →
          </button>
          <div className="lightbox-counter" onClick={(e) => e.stopPropagation()}>
            {pad(openIndex + 1)} / {pad(images.length)}
          </div>
        </div>
      )}
    </article>
  );
}
