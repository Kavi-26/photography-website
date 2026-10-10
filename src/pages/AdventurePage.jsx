import Filmstrip from '../components/Filmstrip';
import Quote from '../components/Quote';
import QuickLinks from '../components/QuickLinks';
import { galleries } from '../data/images';

export default function AdventurePage() {
  return (
    <article className="page">
      <section className="section page-title">
        <h1>Adventure</h1>
      </section>
      <Quote
        quote="My continuous thirst for novelty, exploration and creative challenge, took me all around the world."
        source="enjoy these personal stories"
      />
      <Filmstrip images={galleries.adventure} fit="portrait" />
      <QuickLinks band />
    </article>
  );
}
