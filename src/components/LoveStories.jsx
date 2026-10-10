import { useState } from 'react';
import { Link } from 'react-router-dom';
import { home } from '../data/images';

const pad = (n) => String(n).padStart(2, '0');

export default function LoveStories() {
  const [index, setIndex] = useState(0);
  const total = home.stories.length;
  const at = (offset) => home.stories[(index + offset + total) % total];
  const go = (dir) => setIndex((i) => (i + dir + total) % total);

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
        <div className="triptych" key={index}>
          <img src={at(-1)} alt="" />
          <img src={at(0)} alt="" />
          <img src={at(1)} alt="" />
        </div>
        <div className="story-nav">
          <button type="button" onClick={() => go(-1)} aria-label="Previous story">←</button>
          <span>{pad(index + 1)} / {pad(total)}</span>
          <button type="button" onClick={() => go(1)} aria-label="Next story">→</button>
        </div>
      </section>
    </>
  );
}
