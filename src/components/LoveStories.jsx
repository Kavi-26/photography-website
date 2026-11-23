import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { home } from '../data/images';

const pad = (n) => String(n).padStart(2, '0');

export default function LoveStories() {
  const photos = home.stories;
  const total = photos.length;
  const loop = [...photos, ...photos, ...photos];
  const [cursor, setCursor] = useState(total);
  const [anim, setAnim] = useState(true);
  const sectionRef = useRef(null);
  const shown = ((cursor % total) + total) % total;

  useEffect(() => {
    if (cursor >= total && cursor < total * 2) return undefined;
    const id = setTimeout(() => {
      setAnim(false);
      setCursor(total + (((cursor % total) + total) % total));
    }, 520);
    return () => clearTimeout(id);
  }, [cursor, total]);

  useEffect(() => {
    if (anim) return undefined;
    const id = requestAnimationFrame(() => setAnim(true));
    return () => cancelAnimationFrame(id);
  }, [anim]);

  const go = (next) => {
    setAnim(true);
    setCursor(next);
  };

  // Keyboard navigation with Left / Right arrow keys
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

      // Trigger if this section is actively viewed or focused
      const mid = vHeight / 2;
      const crossesMid = rect.top <= mid && rect.bottom >= mid;
      const isFocused = sectionRef.current.contains(document.activeElement);

      if (crossesMid || visibleHeight >= vHeight * 0.35 || isFocused) {
        e.preventDefault();
        go(e.key === 'ArrowLeft' ? cursor - 1 : cursor + 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [cursor]);

  return (
    <>
      <Link to="/portfolio" className="love" id="love">
        <img src={home.love} alt="Couple embracing - Karakovan Photography" loading="lazy" />
        <p>Do it Your Way.<br />We&apos;re here to fulfil<br />your expectations.</p>
        <h2>Love Stories.</h2>
      </Link>
      <section ref={sectionRef} className="section stories-sec" id="stories" tabIndex={0} aria-label="Love Stories Gallery">
        <div className="center-copy">
          <h2>India or Anywhere Beyond</h2>
          <p>Whether it’s high in the mountains, on a beach near the ocean, in a forest meadow - you name it we will be launched. I’ll be sure to help you plan and save those beautiful memories. Check out some of my favourite client stories.</p>
        </div>
        <div className="story-film">
          <div
            className={`story-track${anim ? '' : ' instant'}`}
            style={{ transform: 'translateX(calc(50vw - var(--film-stride) * ' + cursor + ' - var(--film-slide) / 2))' }}
          >
            {loop.map((src, i) => (
              <button
                key={`${i}-${src}`}
                type="button"
                className={i === cursor ? 'on' : ''}
                aria-label={i === cursor ? 'Current story' : 'Show this story'}
                onClick={() => { if (i !== cursor) go(i); }}
              >
                <img src={src} alt="" />
              </button>
            ))}
          </div>
        </div>
        <div className="story-nav">
          <button
            type="button"
            onClick={() => go(cursor - 1)}
            aria-label="Previous story"
            title="Previous story (←)"
          >
            ←
          </button>
          <span>{pad(shown + 1)} / {pad(total)}</span>
          <button
            type="button"
            onClick={() => go(cursor + 1)}
            aria-label="Next story"
            title="Next story (→)"
          >
            →
          </button>
        </div>
      </section>
    </>
  );
}
