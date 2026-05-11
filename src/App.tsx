import { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import ProOSUmbrella from './pages/ProOSUmbrella';
import ProOSHomeServices from './pages/ProOSHomeServices';
import ProOSPrivateEquity from './pages/ProOSPrivateEquity';
import ProOSGeneral from './pages/ProOSGeneral';
import DemoPage from './pages/DemoPage';
import ComingSoon from './pages/ComingSoon';
import { useLenisScroll } from './lib/scroll';

export default function App() {
  useLenisScroll();
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!location.hash) window.scrollTo(0, 0);
  }, [location.pathname]);

  // HomePage owns its own integrated footer (FinalOasis); other pages use the global Footer.
  const isHome = location.pathname === '/';

  return (
    <>
      <Navbar scrolled={scrolled} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/pro-os" element={<ProOSUmbrella />} />
        <Route path="/pro-os/home-services" element={<ProOSHomeServices />} />
        <Route path="/pro-os/private-equity" element={<ProOSPrivateEquity />} />
        <Route path="/pro-os/general" element={<ProOSGeneral />} />
        <Route path="/demo" element={<DemoPage />} />
        <Route path="*" element={<ComingSoon title="Not found" eyebrow="404" />} />
      </Routes>
      {!isHome && <Footer />}
    </>
  );
}
