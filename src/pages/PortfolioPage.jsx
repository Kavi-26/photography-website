import { Link } from 'react-router-dom';
import Quote from '../components/Quote';
import { portfolioBanner, portfolioCards } from '../data/images';

export default function PortfolioPage() {
  return (
    <article className="page">
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
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="card-grid">
          {portfolioCards.map((card) => (
            <Link key={card.title} to={card.to} className="feature">
              <img src={card.image} alt="" style={card.position ? { objectPosition: card.position } : undefined} />
              <div>
                <p>{card.subtitle}</p>
                <h2>{card.title}</h2>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </article>
  );
}
