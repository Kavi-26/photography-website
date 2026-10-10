import CallToAction from '../components/CallToAction';
import QuickLinks from '../components/QuickLinks';

const CDN = 'https://images-pw.pixieset.com';

const packages = [
  {
    title: 'Wedding & Reception',
    image: `${CDN}/elementfield/QXdwlDp/NIR00694-9341a219-2500.jpg`,
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
    image: `${CDN}/elementfield/nKJVG50/MAN00110-9e215e96-2500.jpg`,
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
    image: `${CDN}/elementfield/OAoYXDD/NIR00135-6a22d193-2500.jpg`,
    text: `This package includes
• Candid Photography

For any other additional services the cost may vary.`,
  },
  {
    title: 'Corporate Headshots',
    image: `${CDN}/elementfield/M40oGnW/NIR00255-9d41bdc6-2500.jpg`,
    text: `This package includes
• Corporate style headshot photos

Increase in  the number of costumes, may increase the cost.`,
  },
];

const faqs = [
  { q: 'I. Are the travel expenses included in your packages or covered additionally?', a: 'Travel expenses are usually included in the quote unless stated otherwise.' },
  { q: 'II. What if we want more requirements like more photographers or something extreme like shotgun in the offbeat locations?', a: 'YEE-HAW! 🤠 Now you’re speaking our language—unconventional, bold, and totally awesome! Whether it’s doubling down on photographers, trekking to offbeat locations with a shotgun (safety first, of course 🔫🎯), or anything else wild and wonderful, we’re ALL IN.' },
  { q: 'III. We want to include our dog into the ceremony and photos, is that okay?', a: 'Absolutely! We paws-itively love the idea of including your furry VIP (Very Important Pup) in the ceremony and photos! 🐾 Just let us know how we can help make it a barking success—whether it’s treats on standby, belly rub breaks, or an extra photogenic bandana. The more wagging tails, the merrier!' },
  { q: 'IV. How long does it take to recieve the photos after the elopement and how will those be delivered?', a: 'Usually we do the highlights earlier and the whole set will be delivered later as mentioned in your quote. In general we mostly deliver the deliverables within 40 days from the event. And they will all be delivered digitally.\n\nEvery transaction and logistics from karakovan is completely digitalised.' },
  { q: 'V. How far in advance should we book you?', a: 'We recommend booking 6–12 months before your wedding date, especially for peak seasons, as our schedule fills up quickly.' },
  { q: 'V. Are the wedding packages listed fixed, or can they be customized to fit our needs?', a: 'Great question! Our packages are totally flexible—think of them as a starting point. Want to add more hours, swap an album for a second shooter, or tweak something else? Just say the word, and we’ll make it happen. Your wedding, your way! 😊' },
];

const links = [
  { title: 'About', sub: 'get to know me', to: '/about' },
  { title: 'Portfolio', sub: 'view my works', to: '/portfolio' },
  { title: 'Contact Me', sub: 'get in touch', to: '/contact' },
];

export default function InvestmentPage() {
  return (
    <article className="page">
      <CallToAction
        image={`${CDN}/elementfield/876339963/MAN00233-007561cc-2500.jpg`}
        title="Investment Details"
        subtitle=""
        cta=""
        align="title"
        position="100% 100%"
      />
      <section className="section" id="packages">
        <p className="eyebrow pack-kicker">Pricing Packages</p>
        {packages.map((item, index) => (
          <article className={`price-row ${index % 2 ? 'flip' : ''}`} key={item.title}>
            <img src={item.image} alt="" />
            <div>
              <h2>{item.title}</h2>
              <p className="stars">******</p>
              <p style={{ whiteSpace: 'pre-line' }}>{item.text}</p>
            </div>
          </article>
        ))}
      </section>
      <CallToAction
        image={`${CDN}/elementfield/QXdwlmb/DSC02395-53e0dca5-2500.jpg`}
        title="Are you ready for your Adventure? Let’s do it!"
        subtitle=""
        cta="Contact Me"
        align="split"
        position="99% 0%"
        id="offer"
      />
      <section className="section" id="faq">
        <div className="faq-sheet">
          <h2>FAQ</h2>
          <div className="faq-rule" />
          {faqs.map((item) => (
            <div className="faq-row" key={item.q}>
              <h3>{item.q}</h3>
              <p style={{ whiteSpace: 'pre-line' }}>{item.a}</p>
            </div>
          ))}
        </div>
      </section>
      <QuickLinks links={links} />
    </article>
  );
}
