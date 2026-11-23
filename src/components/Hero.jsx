import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { home } from '../data/images';

const pad = (n) => String(n).padStart(2, '0');

export default function Hero() {
  const [index, setIndex] = useState(0);
  const heroRef = useRef(null);
  const slide = home.slides[index];

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % home.slides.length), 6500);
    return () => clearInterval(id);
  }, []);

  const go = (dir) => setIndex((i) => (i + dir + home.slides.length) % home.slides.length);

  // Keyboard navigation for Hero slide arrows
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName) || document.activeElement?.isContentEditable) {
        return;
      }
      if (document.querySelector('.lightbox-overlay')) return;

      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const vHeight = window.innerHeight || document.documentElement.clientHeight;

      const visibleTop = Math.max(0, rect.top);
      const visibleBottom = Math.min(vHeight, rect.bottom);
      const visibleHeight = Math.max(0, visibleBottom - visibleTop);

      const mid = vHeight / 2;
      const crossesMid = rect.top <= mid && rect.bottom >= mid;
      const isFocused = heroRef.current.contains(document.activeElement);

      if (crossesMid || visibleHeight >= vHeight * 0.4 || isFocused) {
        e.preventDefault();
        go(e.key === 'ArrowLeft' ? -1 : 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section ref={heroRef} className="hero" aria-label="Featured photographs" tabIndex={0}>
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
      <button
        type="button"
        className="hero-edge prev"
        onClick={() => go(-1)}
        aria-label="Previous slide"
        title="Previous slide (←)"
      >
        ←
      </button>
      <div className="hero-nav">{pad(index + 1)} <span>/</span> {pad(home.slides.length)}</div>
      <button
        type="button"
        className="hero-edge next"
        onClick={() => go(1)}
        aria-label="Next slide"
        title="Next slide (→)"
      >
        →
      </button>
    </section>
  );
}
