import { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import ProOSUmbrella from './pages/ProOSUmbrella';
import ProOSPrivateEquity from './pages/ProOSPrivateEquity';
import ProOSManufacturing from './pages/ProOSManufacturing';
import ProOSGeneral from './pages/ProOSGeneral';
import DemoPage from './pages/DemoPage';
import PricingPage from './pages/PricingPage';
import AboutPage from './pages/AboutPage';
import ComingSoon from './pages/ComingSoon';
import { useLenisScroll } from './lib/scroll';
import { useCinematicGlobals } from './hooks/useCinematicGlobals';

export default function App() {
  useLenisScroll();
  useCinematicGlobals();
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!location.hash) {
      window.scrollTo(0, 0);
      return;
    }
    // Defer to next frame so the destination route has mounted its targets.
    const id = location.hash.replace(/^#/, '');
    const tryScroll = () => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
    const t = window.setTimeout(tryScroll, 80);
    return () => window.clearTimeout(t);
  }, [location.pathname, location.hash]);

  // HomePage owns its own integrated footer (FinalOasis); other pages use the global Footer.
  const isHome = location.pathname === '/';

  return (
    <>
      <Navbar scrolled={scrolled} />
      <main className="scroll-blur-target">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/pro-os" element={<ProOSUmbrella />} />
        <Route path="/pro-os/private-equity" element={<ProOSPrivateEquity />} />
        <Route path="/pro-os/manufacturing" element={<ProOSManufacturing />} />
        <Route path="/pro-os/general" element={<ProOSGeneral />} />
        <Route path="/demo" element={<DemoPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<ComingSoon title="Not found" eyebrow="404" />} />
      </Routes>
      {!isHome && <Footer />}
      </main>
    </>
  );
}
