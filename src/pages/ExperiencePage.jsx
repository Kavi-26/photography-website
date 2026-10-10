import { Link } from 'react-router-dom';
import CallToAction from '../components/CallToAction';
import QuickLinks from '../components/QuickLinks';

const CDN = 'https://images-pw.pixieset.com';
const portrait = `${CDN}/elementfield/lRJa4EO/KAR03134-36c05ac8-2500.jpg`;
const reasons = [
  { title: '01. Double Backup, Zero Compromise', image: `${CDN}/elementfield/odJweQ3/1_Double_Bakcup-34cf4600-2500.png`, text: 'As professionals, we prioritize the safety of your memories. We always carry backup cameras and storage systems to ensure your data is secure. During shoots, your photos are simultaneously saved on two memory cards and later backed up onto two separate storage devices until delivery. With this meticulous approach, we’re proud to say we’ve never experienced data loss—your moments are in the safest hands.' },
  { title: '02. On Schedule, Every Time', image: `${CDN}/elementfield/lRJa43V/1_OnTimeScheudle-85b31b9c-2500.png`, text: 'We don’t just serve—we deliver with passion and precision! Whether it’s arriving on shoot location or handing over the final deliverables, we pride ourselves on sticking to the schedule, a streak we’ve maintained for a long time. On the rare occasion that we need extra time to perfect our work, we’ll always be transparent with you. Why? Because finishing what we start is our top priority—no matter what it takes.' },
  { title: '03. Polished Professionals', image: `${CDN}/elementfield/vwVzMaL/1_PolishedProfessional-fd76f3e1-2500.png`, text: 'Our team is experienced, professional, and courteous. We don’t just work behind the scenes—we’re right there with you, in your space, on your special day, capturing moments surrounded by your loved ones. That’s why, We dress appropriately and maintain the highest standards of professionalism to ensure we fit seamlessly into your celebration. If you have any particular dress code, we adhere to it to the T.' },
  { title: '04. Digitalised, All the Way', image: `${CDN}/elementfield/bk039Je/1_Digitalaized-d5ffaee9-2500.png`, text: 'We ensure our customers never have to deal with tedious or time-consuming tasks—whether it’s downloading photos, selecting images for an album, or providing feedback on album designs. We’ve made everything digital, allowing you to handle it all in the simplest way possible, at your own availability of time. It’s straightforward, reliable, and completely digitised for your convenience.' },
  { title: '05. Not just an Album, its an Album', image: `${CDN}/elementfield/xXOKW0l/1_Notjustalbum-41f9f7c4-2500.png`, text: 'We believe that if photos are the food, then albums are the serving platters. No matter how stunning the photos are, if they’re not presented right, they won’t do justice to your memories. That’s why we’re committed to printing in only one way—the premium way. Our albums are designed to lay flat on every page, ensuring no spine cut runs through the middle of your cherished moments. This creates a seamless, wide canvas for us to beautifully design your unforgettable memories.' },
  { title: '06. Apples & Oranges', image: `${CDN}/elementfield/roJ9lqe/1_ApplesandOranges-2ec2e938-2500.png`, text: 'Choosing a photographer isn’t about counting photos—it’s about the craft behind them.\n\nTwo photographers may offer "8 hours of coverage" or “200 edited images," just as apples and oranges are both fruit. But bite in, and the difference is clear. What matters isn’t the quantity, but the care, vision, and skill shaping your gallery.\n\nSo don’t just compare specs. Compare artistry. Because your memories deserve more than a checklist—they deserve meaning.', rich: true },
];

const faqs = [
  { q: 'Are the travel expenses included in your packages or covered additionally?', a: 'Travel expenses are usually included in the quote unless stated otherwise.' },
  { q: 'What if we want more requirements like more photographers or something extreme like shotgun in the offbeat locations ?', a: 'YEE-HAW! 🤠 Now you’re speaking our language—unconventional, bold, and totally awesome! Whether it’s doubling down on photographers, trekking to offbeat locations with a shotgun (safety first, of course 🔫🎯), or anything else wild and wonderful, we’re ALL IN.' },
  { q: 'We want to include our dog into the ceremony and photos, is that okay?', a: 'Absolutely! We paws-itively love the idea of including your furry VIP (Very Important Pup) in the ceremony and photos! 🐾 Just let us know how we can help make it a barking success—whether it’s treats on standby, belly rub breaks, or an extra photogenic bandana. The more wagging tails, the merrier!' },
  { q: 'How long does it take to recieve the photos after the event and how will those be delivered?', a: 'Usually we do the highlights earlier and the whole set will be delivered later as mentioned in your quote. In general we mostly deliver the deliverables within 40 days from the event. And they will all be delivered digitally.\n\nEvery transaction and logistics from karakovan is completely digitalised.' },
  { q: 'How far in advance should we book you?', a: 'We recommend booking 6–12 months before your wedding date, especially for peak seasons, as our schedule fills up quickly.' },
  { q: 'Are the wedding packages listed fixed, or can they be customized to fit our needs?', a: 'Great question! Our packages are totally flexible—think of them as a starting point. Want to add more hours, swap an album for a second shooter, or tweak something else? Just say the word, and we’ll make it happen. Your wedding, your way! 😊' },
];

export default function ExperiencePage() {
  return (
    <article className="page">
      <section className="about-sec guide">
        <img className="deco deco-about" src="/photos/Home/info-b-vector.svg" alt="" />
        <div className="about-tease">
          <div className="about-photo">
            <span />
            <img src={portrait} alt="" style={{ objectPosition: '59% 10%' }} />
          </div>
          <div className="about-copy flush">
            <h5>i’m the person behind the camera</h5>
            <h2>I’ll guide you through the entire process</h2>
            <p>My name is Kharthik, I live in Coimbatore, India with my partner and our little daughter.</p>
            <p>My style is best understood through my work. I always strive to deliver images that resonate with my clients&apos; unique vision. Whether you&apos;re planning a wedding, a corporate photoshoot, or a culinary shoot, I’d love to hear from you. Every project comes with its own set of preferences and requirements, and I’m here to ensure that your vision is brought to life just the way you imagine it.</p>
            <Link to="/contact" className="ps-button">Contact me</Link>
          </div>
        </div>
      </section>
      <section className="band" id="why">
        <div className="center-copy">
          <h2>Why Choose us ? Apart from the creativity that we offer.</h2>
          <h4>What You’re Paying For—And Why It Matters</h4>
        </div>
      </section>
      <section className="section">
        <div className="reason-grid icons">
          {reasons.map((item) => (
            <article className="reason" key={item.title}>
              <img src={item.image} alt="" />
              <div>
                <h3>{item.title}</h3>
                <p style={{ whiteSpace: 'pre-line' }}>
                  {item.rich ? (
                    <>
                      Choosing a photographer isn’t about counting photos—it’s about the <em>craft</em> behind them.
                      {'\n\n'}
                      Two photographers may offer &quot;8 hours of coverage&quot; or “200 edited images,&quot; just as apples and oranges are both fruit. But bite in, and the difference is clear. What matters isn’t the quantity, but the <em>care, vision, and skill</em> shaping your gallery.
                      {'\n'}
                      So don’t just compare specs. Compare artistry. Because your memories deserve more than a checklist—they deserve <em>meaning</em>.
                    </>
                  ) : item.text}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="faq-board">
        <h2>FAQ</h2>
        <div className="faq-cols">
          {[faqs.slice(0, 3), faqs.slice(3)].map((column) => (
            <div key={column[0].q}>
              {column.map((item) => (
                <details key={item.q}>
                  <summary>{item.q}</summary>
                  <p>{item.a}</p>
                </details>
              ))}
            </div>
          ))}
        </div>
      </section>
      <CallToAction title="Are you ready for your Adventure? Let’s do it !" subtitle="" cta="Contact Me" image={`${CDN}/elementfield/yr1Jv0e/Arshadxnyla633of886-5973a022-2500.jpg`} position="50% 20%" />
      <QuickLinks />
    </article>
  );
}
