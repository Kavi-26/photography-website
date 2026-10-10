import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { home } from '../data/images';

const pad = (n) => String(n).padStart(2, '0');

export default function LoveStories() {
  const photos = home.stories;
  const total = photos.length;
  const loop = [...photos, ...photos, ...photos];
  const [cursor, setCursor] = useState(total);
  const [anim, setAnim] = useState(true);
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

  return (
    <>
      <Link to="/portfolio" className="love" id="love">
        <img src={home.love} alt="" />
        <p>Do it Your Way.<br />We&apos;re here to fulfil<br />your expectations.</p>
        <h2>Love Stories.</h2>
      </Link>
      <section className="section stories-sec" id="stories">
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
          <button type="button" onClick={() => go(cursor - 1)} aria-label="Previous story">←</button>
          <span>{pad(shown + 1)} / {pad(total)}</span>
          <button type="button" onClick={() => go(cursor + 1)} aria-label="Next story">→</button>
        </div>
      </section>
    </>
  );
}
