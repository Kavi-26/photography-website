export default function Quote({
  quote = 'Every moment is a fresh beginning. Capture it before it becomes a memory.',
  source = '- T.S. Eliot',
  layout = 'center',
}) {
  const clean = quote.replace(/^["“]|["”]$/g, '');
  const credit = source.replace(/^[-–—]\s*/, '');
  const line = layout === 'side'
    ? '/photos/Portfolio/quote-c-vector-line.svg'
    : '/photos/Home/quote-a-vector-line.svg';

  if (layout === 'side') {
    return (
      <section className="quote-sec side" id="quote">
        <div className="quote-side-inner">
          <div
            className="deco deco-quote"
            style={{ backgroundImage: `url(${line})` }}
            aria-hidden="true"
          />
          <blockquote className="pull">
            <h2>“{clean}”</h2>
            {credit && <p>{credit}</p>}
          </blockquote>
        </div>
      </section>
    );
  }

  return (
    <section className={`quote-sec ${layout}`} id="quote">
      <img className="deco deco-quote" src={line} alt="" />
      <blockquote className="pull">
        <h2>“{clean}”</h2>
        {credit && <p>{credit}</p>}
      </blockquote>
    </section>
  );
}
