import { useState, useEffect, useRef } from 'react';
import { home } from '../data/images';

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const sectionRef = useRef(null);
  const go = (dir) => setIndex((i) => (i + dir + home.testimonials.length) % home.testimonials.length);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName) || document.activeElement?.isContentEditable) {
        return;
      }
      if (document.querySelector('.lightbox-overlay')) return;

      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const vHeight = window.innerHeight || document.documentElement.clientHeight;

      const visibleTop = Math.max(0, rect.top);
      const visibleBottom = Math.min(vHeight, rect.bottom);
      const visibleHeight = Math.max(0, visibleBottom - visibleTop);

      const mid = vHeight / 2;
      const crossesMid = rect.top <= mid && rect.bottom >= mid;
      const isFocused = sectionRef.current.contains(document.activeElement);

      if (crossesMid || visibleHeight >= vHeight * 0.35 || isFocused) {
        e.preventDefault();
        go(e.key === 'ArrowLeft' ? -1 : 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section ref={sectionRef} className="section t-sec" id="testimonials" tabIndex={0} aria-label="Testimonials">
      <div className="t-wrap">
        <div className="t-head">
          <h4>Testimonials</h4>
          <div className="pager">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous testimonial"
              title="Previous testimonial (←)"
            >
              ←
            </button>
            <span>{index + 1} / {home.testimonials.length}</span>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next testimonial"
              title="Next testimonial (→)"
            >
              →
            </button>
          </div>
        </div>

        {/* Render all testimonials in the DOM for search engines and accessibility, display current active */}
        <div className="t-slider">
          {home.testimonials.map((t, i) => (
            <div
              key={t.name}
              className={`t-body ${i === index ? 't-body-active' : 't-body-hidden'}`}
              style={{ display: i === index ? 'block' : 'none' }}
              aria-hidden={i !== index}
            >
              <h2>{t.name}</h2>
              <img src={t.image} alt={`Client testimonial - ${t.name}`} loading="lazy" />
              <p style={{ whiteSpace: 'pre-line' }}>{t.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
