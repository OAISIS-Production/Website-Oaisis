import { motion } from 'framer-motion';
import Clouds from '../ui/Clouds';
import SupplyChainFlow from '../demos/SupplyChainFlow';

// Standalone section sitting on the body gradient between Industries (deep
// navy with internal fade) and CustomerProof (testimonial). Transparent —
// no per-section background, so no seam.
export default function ManufacturingSection() {
  return (
    <section
      id="manufacturing"
      className="relative w-full overflow-hidden"
      style={{
        background: 'transparent',
        padding: 'clamp(96px, 14vh, 160px) 24px',
      }}
      aria-label="For manufacturing"
    >
      <Clouds opacity={0.30} />

      <div className="relative z-10 mx-auto" style={{ maxWidth: 1180 }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
          style={{ marginBottom: 'clamp(36px, 5vh, 56px)' }}
        >
          <p
            style={{
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.85)',
              marginBottom: 18,
              fontFamily: "'Inter', sans-serif",
            }}
          >
            For manufacturing
          </p>
          <h2
            style={{
              fontSize: 'clamp(36px, 5vw, 60px)',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              lineHeight: 1.05,
              color: '#FFFFFF',
              margin: 0,
              fontFamily: "'Inter', sans-serif",
              textShadow: '0 2px 14px rgba(15,42,74,0.30)',
            }}
          >
            The factory floor, in real time.
          </h2>
          <p
            className="mx-auto"
            style={{
              marginTop: 14,
              fontSize: 'clamp(15px, 1.3vw, 18px)',
              lineHeight: 1.6,
              color: 'rgba(255,255,255,0.88)',
              maxWidth: 640,
              fontFamily: "'Inter', sans-serif",
              textShadow: '0 1px 8px rgba(15,42,74,0.25)',
            }}
          >
            Inbound. Production. Outbound. One layer.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        >
          <SupplyChainFlow />
        </motion.div>
      </div>
    </section>
  );
}
