export default function Quote({
  quote = 'Every moment is a fresh beginning. Capture it before it becomes a memory.',
  source = '- T.S. Eliot',
  layout = 'center',
}) {
  const clean = quote.replace(/^["“]|["”]$/g, '');
  const line = layout === 'side'
    ? '/photos/Portfolio/quote-c-vector-line.svg'
    : '/photos/Home/quote-a-vector-line.svg';

  return (
    <section className={`quote-sec ${layout}`} id="quote">
      <img className="deco deco-quote" src={line} alt="" />
      <blockquote className="pull">
        <h2>“{clean}”</h2>
        {source && <p>{source}</p>}
      </blockquote>
    </section>
  );
}
