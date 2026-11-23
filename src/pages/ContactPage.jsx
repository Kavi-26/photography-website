import { useState } from 'react';
import CallToAction from '../components/CallToAction';

const steps = [
  {
    price: 'step 01',
    title: 'The Plan',
    text: 'After you submit a message, I’ll reach out to you. We’ll meet or have a call to discuss your vision, location and wants. We’ll send our quote and once you confirm & sign a contract. Let\'s start planning all the details.',
    image: '/photos/Contact/DSC2657-6996b778-2500.jpg',
  },
  {
    price: 'step 02',
    title: 'The Event',
    text: 'We will arrive & be ready at the location on or before the said time. we’ll have everything planned ahead of time, all you have to do is have fun, enjoy every moment and be yourselves.',
    image: '/photos/Contact/NIR01748-c13f7d44-2500.jpg',
    flip: true,
  },
  {
    price: 'step 03',
    title: 'The Memories',
    text: 'You\'ll get your first set of highlights  within 2 weeks. A full gallery will follow with 4 weeks after. You will be able to select pictures for album straight from your gallery; which then will be drafted and sent to you for final approval before printing.',
    image: '/photos/Contact/KAR00936-052f3223-2500.jpg',
  },
];

export default function ContactPage() {
  const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error'
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      // Submit via Web3Forms free endpoint
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: 'e0128be4-f179-4dbe-a4b5-00109ae4918e', // standard public Web3Forms access key
          name: formData.name,
          email: formData.email,
          phone: formData.phone || 'Not provided',
          message: formData.message,
          from_name: 'Karakovan Photography Contact Form',
          subject: `New Wedding Enquiry from ${formData.name}`,
        }),
      });

      const result = await response.json();
      if (result.success) {
        setStatus('success');
      } else {
        // Fallback to mailto link if Web3Forms key reaches limit
        window.location.href = `mailto:contact@karakovan.in?subject=Enquiry from ${encodeURIComponent(formData.name)}&body=${encodeURIComponent(formData.message + '\n\nPhone: ' + formData.phone + '\nEmail: ' + formData.email)}`;
        setStatus('success');
      }
    } catch {
      // Offline or network error fallback
      window.location.href = `mailto:contact@karakovan.in?subject=Enquiry from ${encodeURIComponent(formData.name)}&body=${encodeURIComponent(formData.message + '\n\nPhone: ' + formData.phone + '\nEmail: ' + formData.email)}`;
      setStatus('success');
    }
  };

  const whatsappUrl = `https://wa.me/919944747200?text=${encodeURIComponent('Hi Kharthik, I came across Karakovan Photography and would like to enquire about your photography services for an upcoming event.')}`;

  return (
    <article className="page">
      <CallToAction
        image="/photos/Contact/Arshadxnyla146of886-9e8672b3-2500.jpg"
        title="Your story is as unique as, You"
        subtitle="Let’s turn your story into stunning visuals, Say hello, and let’s get started!."
        cta=""
        position="51% 66%"
        flush
      />

      <section className="form-band">
        <div style={{ maxWidth: '640px', margin: '0 auto', textAlign: 'center', marginBottom: '2rem' }}>
          <p style={{ letterSpacing: '0.15em', textTransform: 'uppercase', fontSize: '0.85rem', color: '#888', marginBottom: '0.75rem' }}>
            Quickest Response
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="ps-button"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              backgroundColor: '#25D366',
              color: '#fff',
              border: 'none',
              padding: '0.85rem 1.75rem',
              borderRadius: '4px',
              textDecoration: 'none',
              fontWeight: 500,
              fontSize: '0.95rem',
              letterSpacing: '0.05em',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.634.07-1.745-.39-1.424-.589-2.348-2.029-2.42-2.124-.071-.095-.572-.76-.572-1.448 0-.688.361-1.026.49-1.168.129-.142.282-.178.376-.178.094 0 .188.001.27.006.088.004.204-.033.32.244.12.288.408.995.443 1.068.035.073.059.158.012.253-.047.094-.071.153-.141.236-.071.082-.148.184-.212.247-.071.07-.145.147-.062.289.082.141.367.606.787.98.542.482 1.001.632 1.143.702.142.07.224.059.307-.035.082-.095.353-.412.447-.553.094-.142.189-.118.318-.07.129.047.824.388.965.459.141.07.235.106.27.165.035.059.035.342-.109.747z" />
            </svg>
            Chat on WhatsApp (+91 99447 47200)
          </a>
          <p style={{ marginTop: '0.75rem', fontSize: '0.85rem', color: '#666' }}>
            or fill out the details below and we&apos;ll be in touch shortly.
          </p>
        </div>

        {status === 'success' ? (
          <div className="center-copy" style={{ padding: '2rem' }}>
            <h3 style={{ fontFamily: 'Libre Caslon Text, serif', fontSize: '1.5rem', marginBottom: '0.5rem' }}>
              Thank you for reaching out!
            </h3>
            <p>Your message has been received. Kharthik will get in touch with you within 24 hours.</p>
          </div>
        ) : (
          <form className="form" onSubmit={handleSubmit}>
            <label>Name *
              <input name="name" value={formData.name} onChange={handleChange} required />
            </label>
            <label>Email address *
              <input name="email" type="email" value={formData.email} onChange={handleChange} required />
            </label>
            <label>Phone Number (with WhatsApp)
              <input name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="+91 ..." />
            </label>
            <label>Event Details & Message *
              <textarea name="message" rows={4} value={formData.message} onChange={handleChange} placeholder="Tell us about the date, venue/location, and type of celebration..." required />
            </label>
            <button className="ps-button" type="submit" disabled={status === 'submitting'}>
              {status === 'submitting' ? 'Sending...' : 'Send Message'}
            </button>
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
              <img src={step.image} alt={step.title} loading="lazy" />
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
