import { Link } from 'react-router-dom';
import { home } from '../data/images';

export default function Reasons() {
  return (
    <section className="reasons-sec" id="reasons">
      <img
        className="deco deco-reasons-line"
        src="/photos/Home/info-c-vector.svg"
        alt=""
        aria-hidden="true"
      />
      <div className="reasons">
        <div className="reasons-photo-col">
          <p className="reasons-kicker">embark on a beautiful adventure</p>
          <img src={home.reasons} alt="Pathway lined with trees - Karakovan Photography" loading="lazy" />
        </div>
        <div className="reasons-copy">
          <h2>3 main reasons why you need to choose us</h2>
          <div className="reasons-text">
            <p className="reasons-bullets">{`• Our operations are fully digital - just seamless experience from start to finish
• Timeliness is crucial— Prompt delivery Guaranteed
• Premium-quality printed albums - where exceptional canvas meets meaningful content, because both matter equally.`}</p>
            <p className="reasons-team">{`Finally, Our team. Beyond what we provide, we bring personality, character & professionalism at its best which we believe will make a difference to you.`}</p>
          </div>
          <Link to="/experience" className="ps-button">Learn More</Link>
        </div>
      </div>
    </section>
  );
}
