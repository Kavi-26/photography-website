import { Link } from 'react-router-dom';
import { home } from '../data/images';

export default function About() {
  return (
    <section className="about-sec" id="hello">
      <img className="deco deco-about" src="/photos/Home/info-b-vector.svg" alt="" />
      <div className="about-tease">
        <div className="about-photo">
          <span />
          <img src={home.about} alt="Kharthik" />
        </div>
        <div className="about-copy">
          <h5>little tiddle about me</h5>
          <h2>Hello everyone, my name is Kharthik</h2>
          <p>Hi, I&apos;m a photographer with over a decade of experience capturing a wide range of subjects—from portraits and weddings to corporate headshots and food photography. My journey into photography might be a bit unconventional; though I hold a degree in mechanical engineering, my heart has always been in the arts. This unique blend of technical precision and creative expression shapes every image I create.</p>
          <Link to="/about" className="ps-button">more about me</Link>
        </div>
      </div>
    </section>
  );
}
