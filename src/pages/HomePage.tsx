import { motion } from 'framer-motion';
import HeroSection from '../components/hero/HeroSection';
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

      <section
        className="relative w-full overflow-hidden"
        style={{
          background:
            'linear-gradient(180deg, #F5EFE0 0%, #DCC9A0 35%, #D4F0DC 75%, #7DD49A 100%)',
          padding: '120px 24px',
        }}
      >
        <div className="max-w-2xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: '3px',
              textTransform: 'uppercase',
              color: '#1A6B4A',
              marginBottom: 24,
            }}
          >
            The Journey
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="display-heading text-brand-text mx-auto"
            style={{ fontSize: 'clamp(28px, 4vw, 40px)', maxWidth: 680 }}
          >
            Between the sky and the oasis,
            <br />
            the rest of the story is being built.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="text-brand-text-sec mx-auto mt-6"
            style={{
              fontSize: 16,
              lineHeight: 1.7,
              fontWeight: 300,
              maxWidth: 540,
            }}
          >
            Manifesto. AI Operating System explainer. Capabilities. Industries. A
            real product demo. Coming next once the entrance and the landing place
            feel right.
          </motion.p>
        </div>
      </section>

      <FinalOasis />
    </>
  );
}
