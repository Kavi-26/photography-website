import { useState } from 'react';

export default function FaqList({ items }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="faq">
      {items.map((item, i) => (
        <div key={item.q}>
          <button type="button" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
            {item.q}
          </button>
          {open === i && <p>{item.a}</p>}
        </div>
      ))}
    </div>
  );
}
