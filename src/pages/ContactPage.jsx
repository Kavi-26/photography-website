import { useState } from 'react';
import CallToAction from '../components/CallToAction';

const CDN = 'https://images-pw.pixieset.com';

const steps = [
  {
    price: 'step 01',
    title: 'The Plan',
    text: 'After you submit a message, I’ll reach out to you. We’ll meet or have a call to discuss your vision, location and wants. We’ll send our quote and once you confirm & sign a contract. Let\'s start planning all the details.',
    image: `${CDN}/elementfield/0JVadDO/_DSC2657-6996b778-2500.jpg`,
  },
  {
    price: 'step 02',
    title: 'The Event',
    text: 'We will arrive & be ready at the location on or before the said time. we’ll have everything planned ahead of time, all you have to do is have fun, enjoy every moment and be yourselves.',
    image: `${CDN}/elementfield/M5xQXLW/NIR01748-c13f7d44-2500.jpg`,
    flip: true,
  },
  {
    price: 'step 03',
    title: 'The Memories',
    text: 'You\'ll get your first set of highlights  within 2 weeks. A full gallery will follow with 4 weeks after. You will be able to select pictures for album straight from your gallery; which then will be drafted and sent to you for final approval before printing.',
    image: `${CDN}/elementfield/yr1JvGZ/KAR00936-052f3223-2500.jpg`,
  },
];

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <article className="page">
      <CallToAction
        image={`${CDN}/elementfield/OAoYXbP/Arshadxnyla146of886-9e8672b3-2500.jpg`}
        title="Your story is as unique as, You"
        subtitle="Let’s turn your story into stunning visuals, Say hello, and let’s get started!."
        cta=""
        position="51% 66%"
        flush
      />
      <section className="form-band">
        {sent ? (
          <p className="center-copy">Thank you for contacting me!</p>
        ) : (
          <form className="form" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
            <label>Name *
              <input name="name" required />
            </label>
            <label>Email address *
              <input name="email" type="email" required />
            </label>
            <label>Message *
              <textarea name="message" rows={2} required />
            </label>
            <button className="ps-button" type="submit">Send Message</button>
          </form>
        )}
      </section>
      <section className="section">
        <p className="eyebrow pack-kicker">what’s next?</p>
        <div className="steps">
          {steps.map((step) => (
            <article className={`step ${step.flip ? 'flip' : ''}`} key={step.title}>
              <div className="step-head">
                <h3>{step.title}</h3>
                <p className="price">{step.price}</p>
              </div>
              <img src={step.image} alt="" />
              <div>
                <h3 className="below">{step.title}</h3>
                <p className="price below">{step.price}</p>
                <p>{step.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </article>
  );
}
