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
import NotFoundPage from './pages/NotFoundPage';

const routeMetadata = {
  '/': {
    title: 'Karakovan Photography — Wedding, Pre-Wedding & Portrait Photographer in Coimbatore',
    description: 'Karakovan Photography by Kharthik — Candid wedding, pre-wedding, couple portraits & destination photography based in Coimbatore, Tamil Nadu.',
  },
  '/weddings': {
    title: 'Weddings / Reception — Karakovan Photography | Coimbatore Wedding Photographer',
    description: 'Explore candid wedding & reception photography by Karakovan Photography. Authentic, timeless Tamil and destination wedding stories.',
  },
  '/couples': {
    title: 'Couples / Pre-Wedding Portraits — Karakovan Photography',
    description: 'Intimate and natural couple shoots, engagement portraits and pre-wedding photography across Tamil Nadu by Kharthik.',
  },
  '/food': {
    title: 'Food Photography — Culinary Storytelling | Karakovan Photography',
    description: 'Artistic food photography capturing the textures, vibrancy, and passion of culinary artistry.',
  },
  '/elopements': {
    title: 'Food Photography — Karakovan Photography',
    description: 'Artistic culinary storytelling and food photography.',
  },
  '/equestrian': {
    title: 'Equestrian & Sports Photography — Karakovan Photography',
    description: 'Dynamic equestrian and sports photography capturing agility, speed, and elegance.',
  },
  '/adventure': {
    title: 'Equestrian & Sports Photography — Karakovan Photography',
    description: 'Dynamic equestrian and sports photography capturing agility, speed, and elegance.',
  },
  '/portfolio': {
    title: 'Portfolio — Karakovan Photography | Coimbatore, Tamil Nadu',
    description: 'Browse our complete photography portfolio: Weddings, couple portraits, food photography, and equestrian sports.',
  },
  '/about': {
    title: 'About Kharthik — Karakovan Photography Coimbatore',
    description: 'Meet Kharthik, the photographer behind Karakovan Photography based in Coimbatore, Tamil Nadu.',
  },
  '/experience': {
    title: 'The Experience — Karakovan Photography',
    description: 'Learn why couples choose Karakovan Photography: double backup safety, prompt delivery, digital workflow, and premium flush-mount albums.',
  },
  '/investment': {
    title: 'Investment & Pricing Packages — Karakovan Photography',
    description: 'Wedding, reception, engagement, and portrait photography packages with transparent deliverables.',
  },
  '/contact': {
    title: 'Contact Kharthik — Karakovan Photography Coimbatore | Book Your Date',
    description: 'Get in touch for wedding enquiries, pre-wedding shoots, and commercial photography in Coimbatore and destination events worldwide.',
  },
  '/blog': {
    title: 'Journal & Stories — Karakovan Photography',
    description: 'Read stories, inspiration, and thoughts on art, emotion, and visual storytelling by Kharthik.',
  },
};

const PageHandler = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // 1. Scroll handling
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo(0, 0);

    // 2. SEO Title & Meta Description & Canonical tag
    const normalizedPath = pathname.replace(/\/$/, '') || '/';
    const meta = routeMetadata[normalizedPath] || {
      title: 'Karakovan Photography — Coimbatore, Tamil Nadu',
      description: 'Karakovan Photography by Kharthik — Candid wedding, pre-wedding, and portrait photographer based in Coimbatore, Tamil Nadu.',
    };

    document.title = meta.title;

    let descEl = document.querySelector('meta[name="description"]');
    if (!descEl) {
      descEl = document.createElement('meta');
      descEl.name = 'description';
      document.head.appendChild(descEl);
    }
    descEl.setAttribute('content', meta.description);

    let canonicalEl = document.querySelector('link[rel="canonical"]');
    if (!canonicalEl) {
      canonicalEl = document.createElement('link');
      canonicalEl.rel = 'canonical';
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.setAttribute('href', `https://www.karakovan.in${normalizedPath === '/' ? '' : normalizedPath}`);
  }, [pathname, hash]);

  return null;
};

function App() {
  return (
    <BrowserRouter>
      <PageHandler />
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
          <Route path="/food" element={<ElopementsPage />} />
          <Route path="/elopements" element={<ElopementsPage />} />
          <Route path="/equestrian" element={<AdventurePage />} />
          <Route path="/adventure" element={<AdventurePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
