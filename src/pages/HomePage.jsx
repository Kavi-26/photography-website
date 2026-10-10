import React from 'react';
import Hero from '../components/Hero';
import Reasons from '../components/Reasons';
import LoveStories from '../components/LoveStories';
import Quote from '../components/Quote';
import About from '../components/About';
import Testimonials from '../components/Testimonials';
import CallToAction from '../components/CallToAction';

const HomePage = () => {
  return (
    <>
      <Hero />
      <Reasons />
      <LoveStories />
      <Quote />
      <About />
      <Testimonials />
      <CallToAction />
    </>
  );
};

export default HomePage;
