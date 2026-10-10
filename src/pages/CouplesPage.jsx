import GalleryPage from '../components/GalleryPage';

const images = [
  '/images/story-1.jpg',
  '/images/story-2.jpg',
  '/images/story-5.jpg',
  '/images/story-8.jpg',
  '/images/hero-1.jpg',
  '/images/wed-2.jpg',
];

const CouplesPage = () => (
  <GalleryPage
    kicker="Portfolio"
    title="Couple portraits / pre wedding"
    intro="A session for the two of you, before the crowd arrives. Pick a place that already feels like the relationship, and we will build the pictures around that."
    images={images}
  />
);

export default CouplesPage;
