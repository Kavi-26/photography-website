import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import styles from './Portfolio.module.css';

const portfolioItems = [
  { id: 1, label: 'WEDDINGS', bg: '#CDCAC5' },
  { id: 2, label: 'PREWEDDING / COUPLE PORTRAITS', bg: '#C8C5BE' },
  { id: 3, label: 'FOOD PHOTOGRAPHY', bg: '#D2CEC9' },
  { id: 4, label: 'EQUESTRIAN', bg: '#C4C0BB' },
  { id: 5, label: 'CORPORATE', bg: '#CACAC0' },
  { id: 6, label: 'PORTRAITS', bg: '#C8C4BC' },
];

const Portfolio = () => {
  return (
    <section id="portfolio" className={styles.section}>
      <div className={styles.header}>
        <p className={styles.subtitle}>Explore My Portfolio</p>
        <h2 className={styles.title}>Love. Raw Emotions. Wanderlust.</h2>
      </div>

      <Swiper
        modules={[FreeMode]}
        freeMode={{ enabled: true, sticky: false }}
        grabCursor={true}
        slidesPerView="auto"
        spaceBetween={20}
        className={styles.swiper}
      >
        {portfolioItems.map((item) => (
          <SwiperSlide key={item.id} className={styles.slide}>
            <div className={styles.card}>
              <div className={styles.imgWrap} style={{ backgroundColor: item.bg }}>
                <div className="img-placeholder">{item.label}</div>
              </div>
              <div className={styles.label}>{item.label}</div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Portfolio;
