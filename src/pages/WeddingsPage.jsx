import GalleryPage from '../components/GalleryPage';

const images = [
  '/images/wed-1.jpg',
  '/images/wed-3.jpg',
  '/images/wed-4.jpg',
  '/images/hero-2.jpg',
  '/images/story-6.jpg',
  '/images/story-7.jpg',
  '/images/hero-3.jpg',
  '/images/story-3.jpg',
];

const WeddingsPage = () => (
  <GalleryPage
    kicker="Portfolio"
    title="Weddings / reception"
    intro="From a full family celebration to a smaller ceremony. The work is to stay close, stay quiet, and keep the day moving for you."
    images={images}
  />
);

export default WeddingsPage;
