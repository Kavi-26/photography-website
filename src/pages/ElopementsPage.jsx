import GalleryPage from '../components/GalleryPage';

const images = [
  '/images/food-1.jpg',
  '/images/food-2.jpg',
  '/images/food-3.jpg',
  '/images/ig-3.jpg',
];

const ElopementsPage = () => (
  <GalleryPage
    kicker="Portfolio"
    title="Food photography"
    intro="Plates, texture, and the light on a table. Made for menus, campaigns, and the kitchens that care how the dish is seen."
    images={images}
  />
);

export default ElopementsPage;
