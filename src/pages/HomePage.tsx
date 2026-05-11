import HeroSection from '../components/hero/HeroSection';
import ManifestoSection from '../components/sections/ManifestoSection';
import AIOperatingSystemSection from '../components/sections/AIOperatingSystemSection';
import CapabilitiesSection from '../components/sections/CapabilitiesSection';
import IndustriesSection from '../components/sections/IndustriesSection';
import CustomerProofSection from '../components/sections/CustomerProofSection';
import DemoMomentSection from '../components/sections/DemoMomentSection';
import FinalOasis from '../components/oasis/FinalOasis';

/**
 * v3 HomePage — the scroll journey.
 *
 * For the GATE 1 review, this renders the new Hero (Three.js glass wordmark
 * + sky + parallax clouds) at the top and the Final Oasis landing at the
 * bottom. Middle sections (manifesto / AI OS pinned story / capabilities /
 * industries / proof / demo moment) will land in subsequent phases.
 *
 * A minimal transition block between hero and oasis keeps the page coherent
 * for the gate review — warm sand fading toward emerald — so the journey
 * shape reads even without the middle content.
 */
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ManifestoSection />
      <AIOperatingSystemSection />
      <CapabilitiesSection />
      <IndustriesSection />
      <CustomerProofSection />
      <DemoMomentSection />
      <FinalOasis />
    </>
  );
}
