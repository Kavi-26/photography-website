import { Link } from 'react-router-dom';
import { home } from '../data/images';

export default function Reasons() {
  return (
    <section className="reasons-sec" id="reasons">
      <img className="deco deco-reasons-a" src="/photos/Home/info-c-vector.svg" alt="" />
      <img className="deco deco-reasons-b" src="/photos/Home/info-b-vector.svg" alt="" />
      <div className="reasons">
        <div>
          <p className="reasons-kicker">embark on a beautiful adventure</p>
          <img src={home.reasons} alt="" />
        </div>
        <div className="reasons-copy">
          <h2>3 main reasons why you need to choose us</h2>
          <p>{`• Our operations are fully digital - just seamless experience from start to finish
• Timeliness is crucial— Prompt delivery Guaranteed
• Premium-quality printed albums - where exceptional canvas meets meaningful content, because both matter equally.

Finally, Our team. Beyond what we provide, we bring personality, character & professionalism at its best which we believe will make a difference to you.`}</p>
          <Link to="/experience" className="ps-button">Learn More</Link>
        </div>
      </div>
    </section>
  );
}
