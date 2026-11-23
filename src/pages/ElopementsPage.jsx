import QuickLinks from '../components/QuickLinks';
import { useState, useEffect } from 'react';
import { galleries } from '../data/images';

const pad = (n) => String(n).padStart(2, '0');

export default function ElopementsPage() {
  const [openIndex, setOpenIndex] = useState(null);
  const images = galleries.food;

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
      <section className="section food-copy">
        <div>
          <h2>FOOD IS NOTHING BUT CELEBRATION OF CULTURE</h2>
          <p>Food is more than just sustenance—it’s a story, a memory, and a celebration of culture. Every dish carries the essence of tradition, love, and creativity, passed down through generations. Through my lens, I aim to capture not just the beauty of food, but the heritage it represents.</p>
        </div>
        <div>
          <p>From the vibrant colors of fresh ingredients to the intricate details of a perfectly plated dish, my photography is a tribute to the artistry of food and the cultures that inspire it. Whether it’s a humble home-cooked meal or an elaborate gourmet creation, every shot is a reflection of my passion for food and its ability to bring people together.</p>
          <p>I hope my work inspires you to savor not just the flavors, but the stories behind every bite. Thank you for joining me on this delicious journey!</p>
        </div>
      </section>
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="masonry">
          {images.map((src, idx) => (
            <img
              key={src}
              src={src}
              alt={`Culinary photography ${idx + 1}`}
              loading="lazy"
              decoding="async"
              onClick={() => setOpenIndex(idx)}
            />
          ))}
        </div>
      </section>
      <QuickLinks />
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
            alt={`Culinary photography ${openIndex + 1} fullscreen`}
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
