import GalleryPage from '../components/GalleryPage';

const images = [
  '/images/horse-1.jpg',
  '/images/horse-2.jpg',
  '/images/horse-3.jpg',
  '/images/ig-4.jpg',
];

const AdventurePage = () => (
  <GalleryPage
    kicker="Portfolio"
    title="Equestrian photography"
    intro="Horse and rider, in motion and at rest. The frame has to keep both the animal and the person honest."
    images={images}
  />
);

export default AdventurePage;
