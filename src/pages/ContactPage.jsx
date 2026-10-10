import { useState } from 'react';
import Reveal from '../components/Reveal';
import styles from './ContactPage.module.css';

const steps = [
  {
    n: '01',
    title: 'The plan',
    text: 'After you write, we talk through the day, the place, and what you want kept. A quote follows, then a contract, then the details.',
  },
  {
    n: '02',
    title: 'The event',
    text: 'We arrive ready. The schedule is already set, so your job is to be in the room and let the day happen.',
  },
  {
    n: '03',
    title: 'The memories',
    text: 'A first set of highlights comes early. The full gallery follows, and album frames are chosen from that gallery before anything is printed.',
  },
];

const ContactPage = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <article className={styles.page}>
      <header className={styles.hero}>
        <Reveal>
          <h1>Your story is as unique as you</h1>
          <p>Say hello, and we can start turning it into pictures.</p>
        </Reveal>
      </header>

      <section className={styles.formSection}>
        {sent ? (
          <p className={styles.thanks}>Message received. I’ll write back shortly.</p>
        ) : (
          <form onSubmit={onSubmit} className={styles.form}>
            <label>
              Name *
              <input name="name" required value={form.name} onChange={onChange} />
            </label>
            <label>
              Email address *
              <input name="email" type="email" required value={form.email} onChange={onChange} />
            </label>
            <label>
              Message *
              <textarea name="message" required rows={6} value={form.message} onChange={onChange} />
            </label>
            <button type="submit" className="btn-cta">Send message</button>
          </form>
        )}
      </section>

      <section className={styles.steps}>
        <p className={styles.kicker}>What’s next?</p>
        <div className={styles.stepGrid}>
          {steps.map((step, i) => (
            <Reveal key={step.n} delay={i * 0.08}>
              <article>
                <span>{step.n}</span>
                <h2>{step.title}</h2>
                <p>{step.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </article>
  );
};

export default ContactPage;
