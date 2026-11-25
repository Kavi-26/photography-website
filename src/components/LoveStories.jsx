import { useEffect, useLayoutEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { home } from '../data/images';

const pad = (n) => String(n).padStart(2, '0');

const storyMetadata = {
  '/photos/Home/MAN00644-072ee881-2500.jpg': { ratio: '2500 / 1873', orientation: 'landscape' },
  '/photos/Home/MAN00233-62819a04-2500.jpg': { ratio: '2500 / 1667', orientation: 'landscape' },
  '/photos/Home/5A1A6721-0d7e0cfb-2500.jpg': { ratio: '2500 / 3750', orientation: 'portrait' },
  '/photos/Home/028A0192-4c0a8cb9-2500.jpg': { ratio: '2500 / 3750', orientation: 'portrait' },
  '/photos/Home/028A0169-Edit-bebd0e4a-2500.jpg': { ratio: '2500 / 3750', orientation: 'portrait' },
  '/photos/Home/MAN00040-45acf169-2500.jpg': { ratio: '2500 / 3750', orientation: 'portrait' },
  '/photos/Home/MAN00207-58755676-2500.jpg': { ratio: '2500 / 1667', orientation: 'landscape' },
  '/photos/Home/SBM04621-0ab6774d-2500.jpg': { ratio: '2500 / 1667', orientation: 'landscape' },
  '/photos/Home/DSC3313-14819235-2500.jpg': { ratio: '2500 / 1667', orientation: 'landscape' },
  '/photos/Home/DSC3778_a-dfc1beb6-2500.jpg': { ratio: '2500 / 3820', orientation: 'portrait' },
  '/photos/Home/MAN01218-8d441ee0-2500.jpg': { ratio: '2500 / 1667', orientation: 'landscape' },
  '/photos/Home/abisha02-3-f458a355-2500.jpg': { ratio: '2500 / 3749', orientation: 'portrait' },
  '/photos/Home/bbc6f29e0faf4312fdc1854ec0575eb5-3212612b-2500.jpg': { ratio: '2500 / 3750', orientation: 'portrait' },
  '/photos/Home/NIR00694-2a81ccdd-2500.jpg': { ratio: '2500 / 1667', orientation: 'landscape' },
  '/photos/Home/53bd6702406087a367287755c0a9e729-c0a5e3d8-2500.jpg': { ratio: '2500 / 1288', orientation: 'landscape' },
};

export default function LoveStories() {
  const photos = home.stories;
  const total = photos.length;
  const loop = [...photos, ...photos, ...photos];
  const [cursor, setCursor] = useState(total);
  const [anim, setAnim] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [trackOffset, setTrackOffset] = useState(null);
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const shown = ((cursor % total) + total) % total;

  const updatePosition = (index) => {
    if (!trackRef.current) return;
    const btn = trackRef.current.children[index];
    if (!btn) return;
    const center = btn.offsetLeft + btn.offsetWidth / 2;
    setTrackOffset((window.innerWidth / 2) - center);
  };

  useLayoutEffect(() => {
    updatePosition(cursor);
  }, [cursor]);

  useEffect(() => {
    const handleResize = () => updatePosition(cursor);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [cursor]);

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

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (lightboxIndex === null) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowLeft') setLightboxIndex((i) => (i - 1 + total) % total);
      if (e.key === 'ArrowRight') setLightboxIndex((i) => (i + 1) % total);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightboxIndex, total]);

  // Keyboard navigation with Left / Right arrow keys for slider
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
            ref={trackRef}
            className={`story-track${anim ? '' : ' instant'}`}
            style={{
              transform: trackOffset !== null ? `translateX(${trackOffset}px)` : undefined,
            }}
          >
            {loop.map((src, i) => {
              const meta = storyMetadata[src] || { ratio: '3 / 2', orientation: 'landscape' };
              const isCurrent = i === cursor;
              return (
                <button
                  key={`${i}-${src}`}
                  type="button"
                  className={`${isCurrent ? 'on' : ''} is-${meta.orientation}`}
                  style={{ aspectRatio: meta.ratio }}
                  aria-label={isCurrent ? 'View full image' : 'Show this story'}
                  title={isCurrent ? 'Click to view full image' : undefined}
                  onClick={() => {
                    if (!isCurrent) {
                      go(i);
                    } else {
                      setLightboxIndex(shown);
                    }
                  }}
                >
                  <img
                    src={src}
                    alt=""
                    loading="lazy"
                    onLoad={() => {
                      if (isCurrent) updatePosition(cursor);
                    }}
                  />
                </button>
              );
            })}
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

      {lightboxIndex !== null && (
        <div className="lightbox-overlay kk-lb-in" onClick={() => setLightboxIndex(null)}>
          <button className="lightbox-close" type="button" aria-label="Close" onClick={() => setLightboxIndex(null)}>✕</button>
          <button
            className="lightbox-nav lightbox-prev"
            type="button"
            aria-label="Previous story"
            title="Previous (←)"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((i) => (i - 1 + total) % total);
            }}
          >
            ←
          </button>
          <img
            key={lightboxIndex}
            className="lightbox-content kk-lb-img"
            src={photos[lightboxIndex]}
            alt="Client story fullscreen"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="lightbox-nav lightbox-next"
            type="button"
            aria-label="Next story"
            title="Next (→)"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((i) => (i + 1) % total);
            }}
          >
            →
          </button>
          <div className="lightbox-counter" onClick={(e) => e.stopPropagation()}>
            {pad(lightboxIndex + 1)} / {pad(total)}
          </div>
        </div>
      )}
    </>
  );
}
