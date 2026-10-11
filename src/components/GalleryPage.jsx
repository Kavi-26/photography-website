import { useState, useEffect, useRef } from 'react';
import CallToAction from './CallToAction';
import Quote from './Quote';

export default function GalleryPage({
  banner,
  title,
  subtitle,
  intro,
  images = [],
  quote,
  source,
}) {
  const [open, setOpen] = useState(null);

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
              onClick={() => setOpen(src)}
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
      {open && (
        <div className="lightbox-overlay kk-lb-in" onClick={() => setOpen(null)}>
          <button className="lightbox-close" type="button" aria-label="Close">✕</button>
          <img
            className="lightbox-content kk-lb-img"
            src={open}
            alt=""
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </article>
  );
}
