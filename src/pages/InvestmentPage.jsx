import CallToAction from '../components/CallToAction';
import QuickLinks from '../components/QuickLinks';

const packages = [
  {
    title: 'Wedding & Reception',
    image: '/photos/Investment/NIR00694-9341a219-2500.jpg',
    text: `This Wedding package includes
• Candid Photography
• Cinematic Video
• Traditional Photography
• Traditional Videography
• Premium Photo Album

The cost will differ further according to crowd and any other specific requirements from your end.`,
  },
  {
    title: 'Baby Shower/ Engagement',
    image: '/photos/Investment/MAN00110-9e215e96-2500.jpg',
    text: `This package includes
• Candid Photography
• Traditional Photography
• Cinematic Video
• Traditional Videography
• Premium Photo Album

For any other additional services the cost may vary.`,
  },
  {
    title: 'Couple Shoot/ Pre - Wedding',
    image: '/photos/Investment/NIR00135-6a22d193-2500.jpg',
    text: `This package includes
• Candid Photography

For any other additional services the cost may vary.`,
  },
  {
    title: 'Corporate Headshots',
    image: '/photos/Investment/NIR00255-9d41bdc6-2500.jpg',
    text: `This package includes
• Corporate style headshot photos

Increase in  the number of costumes, may increase the cost.`,
  },
];

const faqs = [
  { q: 'I. Are the travel expenses included in your packages or covered additionally?', a: 'Travel expenses are usually included in the quote unless stated otherwise.' },
  { q: 'II. How long does it take to recieve the photos after the event and how will those be delivered?', a: 'Usually we do the highlights earlier and the whole set will be delivered later as mentioned in your quote. In general we mostly deliver the deliverables within 40 days from the event. And they will all be delivered digitally.\n\nEvery transaction and logistics from karakovan is completely digitalised.' },
  { q: 'III. What if we want more requirements like more photographers or something extreme like shotgun in the offbeat locations ?', a: 'YEE-HAW! 🤠 Now you’re speaking our language—unconventional, bold, and totally awesome! Whether it’s doubling down on photographers, trekking to offbeat locations with a shotgun (safety first, of course 🔫🎯), or anything else wild and wonderful, we’re ALL IN.' },
  { q: 'IV. How far in advance should we book you?', a: 'We recommend booking 6–12 months before your wedding date, especially for peak seasons, as our schedule fills up quickly.' },
  { q: 'V. We want to include our dog into the ceremony and photos, is that okay?', a: 'Absolutely! We paws-itively love the idea of including your furry VIP (Very Important Pup) in the ceremony and photos! 🐾 Just let us know how we can help make it a barking success—whether it’s treats on standby, belly rub breaks, or an extra photogenic bandana. The more wagging tails, the merrier!' },
  { q: 'VI. Are the wedding packages listed fixed, or can they be customized to fit our needs?', a: 'Great question! Our packages are totally flexible—think of them as a starting point. Want to add more hours, swap an album for a second shooter, or tweak something else? Just say the word, and we’ll make it happen. Your wedding, your way! 😊' },
];

export default function InvestmentPage() {
  return (
    <article className="page">
      <section className="section">
        <div className="center-copy prose">
          <p className="eyebrow">WHAT DOES IT TAKE TO CRAFT AN IMPACTFUL MEMORY</p>
          <h1 className="h1-lg">Preserving your story is the ultimate investment</h1>
          <p>
            Photography is an art. It takes time, heart, and dedication to produce the fine results that our work offers. It’s an investment in memories that will last a lifetime.
          </p>
        </div>
      </section>

      <section className="packages-row">
        {packages.map((pkg) => (
          <div key={pkg.title} className="package-col">
            <div className="package-image">
              <img src={pkg.image} alt={pkg.title} loading="lazy" />
            </div>
            <h3>{pkg.title}</h3>
            <p>{pkg.text}</p>
          </div>
        ))}
      </section>

      <CallToAction
        image="/photos/Weddings/0E6A7670-15222cd6-2500.jpg"
        title="We’d love to tell your story."
        subtitle="Let’s make it unforgettable."
        cta="GET IN TOUCH"
        short
      />

      <section className="faq-wrap">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-list">
          {faqs.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <QuickLinks current="investment" />
    </article>
  );
}
