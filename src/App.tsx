import { Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

function HomePage() {
  return (
    <main className="min-h-[60vh] flex items-center justify-center">
      <p className="text-[13px] tracking-wide text-brand-text-sec uppercase" style={{ letterSpacing: '2.5px' }}>
        Rebuilding
      </p>
    </main>
  );
}

export default function App() {
  return (
    <>
      <Navbar scrolled={false} />
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
      <Footer />
    </>
  );
}
