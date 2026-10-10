import { useState } from 'react';
import { home } from '../data/images';

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const item = home.testimonials[index];
  const go = (dir) => setIndex((i) => (i + dir + home.testimonials.length) % home.testimonials.length);

  return (
    <section className="section t-sec" id="testimonials">
      <div className="t-wrap">
        <div className="t-head">
          <h4>Testimonials</h4>
          <div className="pager">
            <button type="button" onClick={() => go(-1)} aria-label="Previous testimonial">←</button>
            <span>{index + 1} / {home.testimonials.length}</span>
            <button type="button" onClick={() => go(1)} aria-label="Next testimonial">→</button>
          </div>
        </div>
        <div className="t-body" key={item.name}>
          <h2>{item.name}</h2>
          <img src={item.image} alt="" />
          <p>{item.text}</p>
        </div>
      </div>
    </section>
  );
}
