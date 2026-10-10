import { useState } from 'react';

const pad = (n) => String(n).padStart(2, '0');

export default function Filmstrip({ images = [], fit = 'cover' }) {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(null);
  if (!images.length) return null;
  const go = (dir) => setIndex((i) => (i + dir + images.length) % images.length);

  return (
    <section className={`film ${fit}`}>
      <button type="button" className="film-stage" onClick={() => setOpen(images[index])}>
        <img src={images[index]} alt="" />
      </button>
      <div className="film-thumbs">
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            className={i === index ? 'on' : ''}
            onClick={() => setIndex(i)}
            aria-label={`Photo ${i + 1}`}
          >
            <img src={src} alt="" />
          </button>
        ))}
      </div>
      <div className="story-nav">
        <button type="button" onClick={() => go(-1)} aria-label="Previous photo">←</button>
        <span>{pad(index + 1)} / {pad(images.length)}</span>
        <button type="button" onClick={() => go(1)} aria-label="Next photo">→</button>
      </div>
      {open && (
        <div className="lightbox-overlay" onClick={() => setOpen(null)}>
          <button className="lightbox-close" type="button" aria-label="Close">✕</button>
          <img className="lightbox-content" src={open} alt="" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </section>
  );
}
