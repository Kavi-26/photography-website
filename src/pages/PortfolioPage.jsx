import { Link } from 'react-router-dom';
import Quote from '../components/Quote';
import { portfolioBanner, portfolioCards } from '../data/images';

export default function PortfolioPage() {
  const pairs = portfolioCards.slice(0, 4);
  const solo = portfolioCards[4];

  return (
    <article className="page portfolio-page">
      <header className="page-banner center">
        <img src={portfolioBanner} alt="" />
        <div className="tint" />
        <div className="copy">
          <h1>Explore My Portfolio</h1>
          <p>Love. raw emotions. Wanderlust.</p>
        </div>
      </header>

      <Quote
        layout="side"
        quote="Do not follow where the path may lead. Go instead where there is no path and leave a trail."
        source="Ralph Waldo Emerson"
      />

      <section className="portfolio-collections">
        <div className="portfolio-grid">
          {pairs.map((card) => (
            <Link key={card.title} to={card.to} className="portfolio-card">
              <img
                src={card.image}
                alt=""
                style={card.position ? { objectPosition: card.position } : undefined}
              />
              <div className="portfolio-card-copy">
                <p>{card.subtitle}</p>
                <h2>{card.title}</h2>
              </div>
            </Link>
          ))}
        </div>

        {solo && (
          <Link to={solo.to} className="portfolio-card portfolio-solo">
            <img
              src={solo.image}
              alt=""
              style={solo.position ? { objectPosition: solo.position } : undefined}
            />
            <div className="portfolio-card-copy">
              <p>{solo.subtitle}</p>
              <h2>{solo.title}</h2>
            </div>
          </Link>
        )}
      </section>
    </article>
  );
}
