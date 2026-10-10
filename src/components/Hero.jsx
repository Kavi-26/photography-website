import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { home } from '../data/images';

const pad = (n) => String(n).padStart(2, '0');

export default function Hero() {
  const [index, setIndex] = useState(0);
  const slide = home.slides[index];

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % home.slides.length), 6500);
    return () => clearInterval(id);
  }, []);

  const go = (dir) => setIndex((i) => (i + dir + home.slides.length) % home.slides.length);

  return (
    <section className="hero" aria-label="Featured photographs">
      {home.slides.map((item, i) => (
        <div className={`hero-slide ${i === index ? 'on' : ''}`} key={item.image}>
          <div className="hero-photo" style={{ backgroundImage: `url(${item.image})`, backgroundPosition: item.position }} />
        </div>
      ))}
      <div className="hero-copy" key={slide.title || slide.subtitle}>
        <div className="hero-left">
          {slide.title && <h1>{slide.title}</h1>}
          {slide.cta && <Link to={slide.to} className="ps-button">{slide.cta}</Link>}
        </div>
        <p className="hero-side">{slide.subtitle}</p>
      </div>
      <div className="hero-line" />
      <button type="button" className="hero-edge prev" onClick={() => go(-1)} aria-label="Previous slide">←</button>
      <div className="hero-nav">{pad(index + 1)} <span>/</span> {pad(home.slides.length)}</div>
      <button type="button" className="hero-edge next" onClick={() => go(1)} aria-label="Next slide">→</button>
    </section>
  );
}
