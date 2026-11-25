import { useState, useEffect, useRef } from 'react';

const pad = (n) => String(n).padStart(2, '0');

export default function Filmstrip({ images = [], fit = 'cover' }) {
  const [index, setIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const thumbsRef = useRef(null);

  const go = (dir) => setIndex((i) => (i + dir + images.length) % images.length);

  // Preload adjacent images (previous and next) so switching is instantaneous with 0 loading flicker
  useEffect(() => {
    if (!images.length) return;
    const preload = (url) => {
      if (!url) return;
      const img = new Image();
      img.src = url;
    };

    // Preload next 2 and previous 1
    const nextIdx1 = (index + 1) % images.length;
    const nextIdx2 = (index + 2) % images.length;
    const prevIdx = (index - 1 + images.length) % images.length;

    preload(images[nextIdx1]);
    preload(images[nextIdx2]);
    preload(images[prevIdx]);
  }, [index, images]);

  // Keep active thumbnail centered in view
  useEffect(() => {
    if (!thumbsRef.current) return;
    const activeThumb = thumbsRef.current.children[index];
    if (activeThumb) {
      activeThumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [index]);

  // Keyboard navigation for arrow keys and escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't intercept if user is typing in form controls
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName) || document.activeElement?.isContentEditable) {
        return;
      }

      if (e.key === 'Escape') {
        if (isOpen) {
          e.preventDefault();
          setIsOpen(false);
        }
        return;
      }

      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        go(-1);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        go(1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [images.length, isOpen]);

  if (!images.length) return null;

  return (
    <section className={`film ${fit}`}>
      <button
        type="button"
        className="film-stage"
        onClick={() => setIsOpen(true)}
        aria-label="View photo fullscreen in lightbox"
      >
        <img
          src={images[index]}
          alt={`Photo ${index + 1} of ${images.length}`}
          fetchpriority="high"
          decoding="async"
        />
      </button>

      <div className="film-thumbs" ref={thumbsRef}>
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            className={i === index ? 'on' : ''}
            onClick={() => setIndex(i)}
            aria-label={`Photo ${i + 1}`}
          >
            <img src={src} alt={`Thumbnail ${i + 1}`} loading="lazy" decoding="async" />
          </button>
        ))}
      </div>

      <div className="story-nav">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous photo"
          title="Previous photo (←)"
        >
          ←
        </button>
        <span>{pad(index + 1)} / {pad(images.length)}</span>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next photo"
          title="Next photo (→)"
        >
          →
        </button>
      </div>

      {isOpen && (
        <div className="lightbox-overlay kk-lb-in" onClick={() => setIsOpen(false)}>
          <button
            className="lightbox-close"
            type="button"
            aria-label="Close"
            onClick={() => setIsOpen(false)}
          >
            ✕
          </button>
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
            key={index}
            className="lightbox-content kk-lb-img"
            src={images[index]}
            alt={`Photo ${index + 1} fullscreen`}
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
            {pad(index + 1)} / {pad(images.length)}
          </div>
        </div>
      )}
    </section>
  );
}
