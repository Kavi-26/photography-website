import { blogCompare, blogCover } from '../data/images';

export default function BlogPostPage() {
  return (
    <article className="page post">
      <header className="post-hero">
        <img src={blogCover} alt="" />
        <time>April 3, 2026</time>
      </header>
      <div className="article">
        <h1>Cinematic Pre-wedding Photography inspired by Jesse James movie</h1>
        <p>We like to think of every piece we create as entirely original, born of a singular, distinct moment of inspiration. As a photographer, I often approach a shoot with a clear vision, but the final, most impactful images can sometimes be the ones I <em>didn&apos;t</em> plan for.</p>
        <p>Recently, I had the pleasure of photographing a wonderful couple in a vast, open landscape. The light was perfect, and the atmosphere was serene. Back at my computer, as I started to work through the collection, I pulled up a specific frame of the couple in the field. I froze.</p>
        <p>There was something profoundly familiar about the depth of that landscape, the curve of the horizon, and the way the sky seemed to hold a specific kind of weight. It wasn&apos;t just a good composition; it felt <em>cinematic</em> in a way that resonated deeply with me.</p>
        <p>Then it hit me: the image was a subconscious reflection of <em>The Assassination of Jesse James by the Coward Robert Ford</em>.</p>
        <p>Anyone who knows me knows how much I adore that film. It’s a masterpiece of atmosphere, from Roger Deakins’ painterly, desaturated cinematography to Nick Cave and Warren Ellis’s hauntingly beautiful score. For me, it’s a masterclass in how to use landscape to tell a story of internal human struggle and historical gravity.</p>
        <p>The realization was powerful and slightly disorienting. I had not, for a moment, <em>consciously</em> intended to replicate a scene from that movie. This wasn&apos;t a conceptual shoot designed to be a &quot;re-enactment.&quot; The clothing wasn&apos;t period-appropriate. The couple&apos;s relationship was different. But the core emotional resonance, the way the vastness of the land pressed down on the characters, and the specific play of light and shadow—it was all there.</p>
        <p>This experience reminded me of a vital truth for all creators: we do not create in a vacuum. We are sponges, and we absorb everything we experience. The films we love, the paintings that move us, the music that makes us feel, and even the natural world around us—it all enters our subconscious mind and resides there. It forms a deep reservoir of inspiration that, with a bit of luck and the right circumstances, can overflow in unexpected and beautiful ways.</p>
        <p>My <em>Jesse James</em> echo wasn&apos;t an act of imitation; it was an act of genuine, albeit subconscious, creation. It&apos;s a reminder to keep watching, keep listening, keep feeling, and most importantly, keep creating. You never know when one of your favorite artists will reach out from your memory to help you compose your next masterpiece.</p>
        <p>This discovery has made this particular image—and the entire couple&apos;s album—even more special to me. I’m sharing it here as a testament to the mysterious and powerful interplay of shared art.</p>
        <p>Stay curious.</p>
        <div className="compare">
          <figure>
            <img src={blogCompare[0]} alt="My subconscious reflection" />
            <figcaption>Left: My subconscious refection.</figcaption>
          </figure>
          <figure>
            <img src={blogCompare[1]} alt="The original film poster" />
            <figcaption>Right: The original film poster</figcaption>
          </figure>
        </div>
      </div>
    </article>
  );
}
