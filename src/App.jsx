import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SiteMotion from './components/SiteMotion';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import PortfolioPage from './pages/PortfolioPage';
import InvestmentPage from './pages/InvestmentPage';
import ExperiencePage from './pages/ExperiencePage';
import CouplesPage from './pages/CouplesPage';
import WeddingsPage from './pages/WeddingsPage';
import ElopementsPage from './pages/ElopementsPage';
import AdventurePage from './pages/AdventurePage';

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
};

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <SiteMotion />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/investment" element={<InvestmentPage />} />
          <Route path="/experience" element={<ExperiencePage />} />
          <Route path="/couples" element={<CouplesPage />} />
          <Route path="/weddings" element={<WeddingsPage />} />
          <Route path="/elopements" element={<ElopementsPage />} />
          <Route path="/adventure" element={<AdventurePage />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
