import { useState, useEffect } from 'react';
import CallToAction from './CallToAction';
import Quote from './Quote';

const pad = (n) => String(n).padStart(2, '0');

export default function GalleryPage({
  banner,
  title,
  subtitle,
  intro,
  images = [],
  quote,
  source,
}) {
  const [openIndex, setOpenIndex] = useState(null);

  const go = (dir) => {
    setOpenIndex((curr) => {
      if (curr === null) return 0;
      return (curr + dir + images.length) % images.length;
    });
  };

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
      <header className="page-banner">
        <img src={banner || images[0]} alt="" />
        <div className="tint" />
        <div className="copy">
          <h1>{title}</h1>
          {subtitle && <p>{subtitle}</p>}
        </div>
      </header>
      {intro && (
        <section className="section">
          <div className="center-copy prose">
            {intro.split('\n\n').map((para) => <p key={para.slice(0, 24)}>{para}</p>)}
          </div>
        </section>
      )}
      <section className="section" style={{ paddingTop: intro ? 0 : undefined }}>
        <p className="story-nav" style={{ marginBottom: 18 }}>01 / {String(images.length).padStart(2, '0')}</p>
        <div className="masonry">
          {images.map((src, i) => (
            <img
              key={src}
              src={src}
              alt=""
              style={{ '--img-i': i }}
              className="masonry-img"
              onClick={() => setOpenIndex(i)}
            />
          ))}
        </div>
      </section>
      {quote && <Quote quote={quote} source={source} />}
      <CallToAction
        title="Are you ready for your Adventure? Let’s do it!"
        subtitle=""
        cta="Contact Me"
        image={banner || images[0]}
        short
      />
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
            alt=""
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
