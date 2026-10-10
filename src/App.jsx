import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import BlogPage from './pages/BlogPage';
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

const PageFrame = ({ children }) => {
  const { pathname } = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.main
        key={pathname}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.main>
    </AnimatePresence>
  );
};

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<PageFrame><HomePage /></PageFrame>} />
        <Route path="/about" element={<PageFrame><AboutPage /></PageFrame>} />
        <Route path="/contact" element={<PageFrame><ContactPage /></PageFrame>} />
        <Route path="/blog" element={<PageFrame><BlogPage /></PageFrame>} />
        <Route path="/investment" element={<PageFrame><InvestmentPage /></PageFrame>} />
        <Route path="/experience" element={<PageFrame><ExperiencePage /></PageFrame>} />
        <Route path="/couples" element={<PageFrame><CouplesPage /></PageFrame>} />
        <Route path="/weddings" element={<PageFrame><WeddingsPage /></PageFrame>} />
        <Route path="/elopements" element={<PageFrame><ElopementsPage /></PageFrame>} />
        <Route path="/adventure" element={<PageFrame><AdventurePage /></PageFrame>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
