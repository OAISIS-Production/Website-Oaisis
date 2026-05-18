import HeroSection from '../components/hero/HeroSection';
import ManifestoSection from '../components/sections/ManifestoSection';
import AIOperatingSystemSection from '../components/sections/AIOperatingSystemSection';
import CapabilitiesSection from '../components/sections/CapabilitiesSection';
import IndustriesSection from '../components/sections/IndustriesSection';
import ManufacturingSection from '../components/sections/ManufacturingSection';
import CustomerProofSection from '../components/sections/CustomerProofSection';
import BreathMoment from '../components/sections/BreathMoment';
import FinalOasis from '../components/oasis/FinalOasis';

// v13.4 — sections sit transparently on the body-level continuous gradient.
// Only the hero (video), Industries (deep accent w/ masks), and Oasis (photo)
// have their own backgrounds. No more per-section gradients → no seams.
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ManifestoSection />
      <BreathMoment
        lines={['The complete operating layer for your company.']}
        background="transparent"
        textColor="#FFFFFF"
        cloudOpacity={0.30}
      />
      <AIOperatingSystemSection />
      <CapabilitiesSection />
      <BreathMoment
        lines={['Finally.']}
        background="transparent"
        textColor="#FFFFFF"
        cloudOpacity={0.30}
      />
      <IndustriesSection />
      <ManufacturingSection />
      <CustomerProofSection />
      <BreathMoment
        lines={['This is what arrival feels like.']}
        background="transparent"
        textColor="#FFFFFF"
        cloudOpacity={0.30}
      />
      <FinalOasis />
    </>
  );
}
