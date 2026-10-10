import { Link } from 'react-router-dom';
import CallToAction from '../components/CallToAction';
import { aboutImages } from '../data/images';

const team = [
  { name: 'Karthik Raveendran', role: 'Lead videographer\n(The Video Virtuoso)', image: aboutImages.team[0], position: '51% 59%' },
  { name: 'Rajesh Swaminathan', role: 'photographer\n(AKA MOMENT CATCHER)', image: aboutImages.team[3], position: '100% 6%' },
  { name: 'Dharani Jayakumar', role: 'Social Media Whisperer (aka Media Manager)', image: aboutImages.team[1], position: '44% 0%' },
  { name: 'Bharath Selvaraj', role: 'Master Organizer (aka Admin)', image: aboutImages.team[2], position: '50% 50%' },
];

export default function AboutPage() {
  return (
    <article className="page">
      <section className="split-about">
        <img className="curve" src={aboutImages.curve} alt="" />
        <div className="story">
          <h1>Before you share your story..</h1>
          <Link to="/contact" className="ps-button">Learn More</Link>
        </div>
        <div className="photo-col">
          <img src={aboutImages.portrait} alt="Kharthik with a camera" />
        </div>
        <div className="mine">
          <p className="eyebrow">let me tell you mine..</p>
          <p>Hi, I&apos;m Kharthik, a photographer with over a decade of experience capturing a wide range of subjects—from portraits & weddings to corporate headshots & food photography. My journey into photography might be a bit unconventional; though I hold a degree in mechanical engineering, my heart has always been in the arts. This unique blend of technical precision and creative expression shapes every image I create.</p>
        </div>
      </section>

      <section className="section">
        <p className="soft-quote">I’m quite down to earth and simplistic. I love random chats about life, traveling and creating art. When we meet, I can promise you 2 things - Beyond the beautifully captured photo memories, you can expect patience, creativity, and a collaborative spirit</p>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="team-row">
          <div className="intro">
            <h4>The Team</h4>
            <p>Welcome to the heart of our photography journey—our incredible team! From meticulous planners to lighting wizards, editing experts to client relationship pros, we work seamlessly together to bring your vision to life.</p>
            <p>Get to know the faces behind the camera and the minds behind the magic. We’re here to make your moments timeless.</p>
          </div>
          {team.map((person) => (
            <figure key={person.name}>
              <img src={person.image} alt={person.name} style={{ objectPosition: person.position }} />
              <figcaption>
                {person.name}
                <small>{person.role}</small>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="schedule">
          <p className="eyebrow">MY 2025 TRAVEL SCHEDULE</p>
          <h2>The Horizon is Calling... I&apos;m Just Checking the Schedule</h2>
          <p>No official trips on the calendar just yet. The world is wide open and my compass is spinning. Let&apos;s see where it lands. Sign up for updates so you don&apos;t miss the adventure!</p>
          <h4>2025</h4>
        </div>
      </section>

      <CallToAction
        image={aboutImages.cta}
        title="Are you ready for your Adventure? Let’s do it !"
        subtitle="In the past 10+ years I’ve worked with number of couples, professionals and families, in picking the location for shoots, choosing the wardrobe, even hiring other vendors for their ceremony. All this knowledge I’m happy to share with you."
        cta="Contact Me"
        position="48% 42%"
        align="aside"
        flush
      />
    </article>
  );
}
