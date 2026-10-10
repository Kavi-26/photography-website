import QuickLinks from '../components/QuickLinks';
import { useState } from 'react';
import { galleries } from '../data/images';

export default function ElopementsPage() {
  const [open, setOpen] = useState(null);
  return (
    <article className="page">
      <section className="section food-copy">
        <div>
          <h2>FOOD IS NOTHING BUT CELEBRATION OF CULTURE</h2>
          <p>Food is more than just sustenance—it’s a story, a memory, and a celebration of culture. Every dish carries the essence of tradition, love, and creativity, passed down through generations. Through my lens, I aim to capture not just the beauty of food, but the heritage it represents.</p>
        </div>
        <div>
          <p>From the vibrant colors of fresh ingredients to the intricate details of a perfectly plated dish, my photography is a tribute to the artistry of food and the cultures that inspire it. Whether it’s a humble home-cooked meal or an elaborate gourmet creation, every shot is a reflection of my passion for food and its ability to bring people together.</p>
          <p>I hope my work inspires you to savor not just the flavors, but the stories behind every bite. Thank you for joining me on this delicious journey!</p>
        </div>
      </section>
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="masonry">
          {galleries.food.map((src) => (
            <img key={src} src={src} alt="" onClick={() => setOpen(src)} />
          ))}
        </div>
      </section>
      <QuickLinks />
      {open && (
        <div className="lightbox-overlay" onClick={() => setOpen(null)}>
          <button className="lightbox-close" type="button" aria-label="Close">✕</button>
          <img className="lightbox-content" src={open} alt="" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </article>
  );
}
