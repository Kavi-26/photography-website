import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import styles from './Hero.module.css';

const slides = [
  {
    image: '/images/hero-1.jpg',
    tagline: 'Pre Wedding / Engagement Shots',
    heading: 'Photography for\nAdventurous Souls &\nRebels at Heart',
    cta: 'Discover More',
    to: '/couples',
  },
  {
    image: '/images/hero-2.jpg',
    tagline: 'Reception Portraits',
    heading: 'Eternal Embrace...',
    cta: 'Read More',
    to: '/weddings',
  },
  {
    image: '/images/hero-3.jpg',
    tagline: 'Tradition',
    heading: 'Two souls. Two garlands.\nOne promise, held still.',
    cta: null,
    to: '/weddings',
  },
];

const pad = (n) => String(n).padStart(2, '0');

const Hero = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const slide = slides[activeIndex];

  return (
    <section id="home" className={styles.hero}>
      <Swiper
        modules={[Autoplay, EffectFade, Pagination]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={1400}
        autoplay={{ delay: 5600, disableOnInteraction: false }}
        pagination={{ clickable: true, el: `.${styles.pagination}` }}
        loop
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className={styles.swiperContainer}
      >
        {slides.map((item) => (
          <SwiperSlide key={item.image}>
            <div
              className={styles.slideBg}
              style={{ backgroundImage: `url(${item.image})` }}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className={styles.overlay} />

      <div className={styles.heroContent} key={activeIndex}>
        <p className={styles.tagline}>{slide.tagline}</p>
        <h1 className={styles.heading}>{slide.heading}</h1>
        {slide.cta && (
          <Link to={slide.to} className="btn-cta">{slide.cta}</Link>
        )}
      </div>

      <div className={styles.counter}>
        <span>{pad(activeIndex + 1)}</span>
        <i />
        <span>{pad(slides.length)}</span>
      </div>

      <div className={styles.pagination} />
    </section>
  );
};

export default Hero;
