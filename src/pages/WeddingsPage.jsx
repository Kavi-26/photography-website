import Filmstrip from '../components/Filmstrip';
import Quote from '../components/Quote';
import CallToAction from '../components/CallToAction';
import { galleries, seaCta } from '../data/images';

const images = [galleries.weddings.banner, ...galleries.weddings.images];

export default function WeddingsPage() {
  return (
    <article className="page">
      <section className="section">
        <div className="center-copy prose">
          <h1>Weddings/ Reception</h1>
          <p>From big vibrant Tamil weddings, to cozy, candlelit wedding ceremonies. Love is beautiful, and there are so many ways it can be captured, through a hug, a kiss, a stare, a wink. All I ask my clients is to trust me with their memories, and allow themselves to fully enjoy the day.</p>
        </div>
      </section>
      <Filmstrip images={images} fit="wide" />
      <Quote
        quote="For it was not into my ear you whispered, but into my heart. It was not my lips you kissed, but my soul."
        source="Gabriel S."
      />
      <CallToAction
        image={seaCta}
        title="Are you ready for your Adventure? Let’s do it!"
        subtitle="......"
        cta="Contact Me"
        short
        position="50% 50%"
      />
    </article>
  );
}
