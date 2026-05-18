import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Glass from '../components/ui/Glass';
import AmbientBlobs from '../components/ui/AmbientBlobs';
import Clouds from '../components/ui/Clouds';
import GlowLogo from '../components/ui/GlowLogo';
import SubpageHeroHeadline from '../components/ui/SubpageHeroHeadline';

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
};

export default function PricingPage() {
  return (
    <main
      className="relative w-full overflow-hidden"
      style={{
        // Transparent so the html body gradient shows through; matches the
        // homepage and InnerPageShell's new transparent treatment.
        background: 'transparent',
        minHeight: '100vh',
      }}
    >
      <AmbientBlobs
        blobs={[
          { color: 'sky', size: 280, top: '6%', right: '6%' },
          { color: 'deep', size: 240, top: '40%', left: '4%' },
          { color: 'white', size: 220, bottom: '8%', right: '12%' },
        ]}
      />
      {/* Drifting cumulus matches homepage + other inner pages so the
          sky journey carries through Pricing too. */}
      <Clouds opacity={0.32} />

      <div className="relative mx-auto px-6" style={{ maxWidth: 1080, padding: '120px 24px 40px' }}>
        <motion.div {...fadeUp} className="text-center mx-auto" style={{ maxWidth: 1080 }}>
          <p
            style={{
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '3px',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.85)',
              marginBottom: 14,
              fontFamily: "'Inter', sans-serif",
              textShadow: '0 1px 8px rgba(15,42,74,0.30)',
            }}
          >
            Pricing
          </p>
          <SubpageHeroHeadline
            lines={[
              { text: 'Simple pricing.' },
              { text: 'Honest scope.' },
              { text: 'Built for operators.' },
            ]}
          />
          <p
            className="mx-auto"
            style={{
              fontSize: 16,
              lineHeight: 1.7,
              fontWeight: 400,
              color: 'rgba(255,255,255,0.88)',
              maxWidth: 560,
              fontFamily: "'Inter', sans-serif",
              textShadow: '0 1px 10px rgba(15,42,74,0.28)',
            }}
          >
            Every engagement starts with a 30-minute conversation. No deck, no generic demo —
            just a scoping call where we sketch what Oaisis looks like deployed to your specific operation.
          </p>
        </motion.div>

        <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }} className="mt-14">
          <Glass variant="glow" className="text-center" style={{ padding: 'clamp(36px, 5vw, 56px)' }}>
            <p
              style={{
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: '3px',
                textTransform: 'uppercase',
                color: '#2563A8',
                marginBottom: 18,
                fontFamily: "'Inter', sans-serif",
              }}
            >
              How we work
            </p>
            <h2
              className="mb-5"
              style={{
                fontSize: 'clamp(26px, 3.4vw, 40px)',
                fontWeight: 700,
                color: '#0F2A4A',
                letterSpacing: '-0.02em',
                lineHeight: 1.15,
                fontFamily: "'Inter', sans-serif",
              }}
            >
              Talk to us.
            </h2>
            <p
              className="mx-auto mb-8"
              style={{
                fontSize: 15,
                lineHeight: 1.7,
                color: 'rgba(15,42,74,0.78)',
                maxWidth: '52ch',
                fontFamily: "'Inter', sans-serif",
              }}
            >
              Pricing scales with the deployment. Most engagements are a fixed-price pilot up front,
              then ongoing partnership — onboarding, tuning, and direct contact with the team that built
              it. No offshore support tickets.
            </p>
            <Link to="/demo" className="btn-primary-emerald btn-magnetic" data-idle-pulse>
              Book a discovery call
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Glass>
        </motion.div>
      </div>

      {/* Sky continuation — transparent section so the body gradient flows
          through unbroken. Cloud opacity matches the main container above
          (0.32) so there is no density step at the section boundary.
          Center glow constrained to a small inner ellipse (70% × 50%) that
          fades to fully transparent at 75% of its extent — it cannot reach
          the section's top/bottom edges and produce a perceived seam. */}
      <section
        className="relative w-full overflow-hidden"
        style={{ marginTop: 80, height: 'min(70vh, 640px)', background: 'transparent' }}
        aria-label="Finally, the future of your operations"
      >
        <Clouds opacity={0.32} />
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 70% 50% at center 50%, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.06) 40%, transparent 75%)',
          }}
        />
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center">
          <motion.div
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.2 }}
            className="oasis-logo-float"
          >
            <GlowLogo size={120} glow="white" />
          </motion.div>
          <motion.p
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.3 }}
            className="mx-auto mt-8"
            style={{
              fontSize: 'clamp(32px, 4.4vw, 64px)',
              fontWeight: 800,
              color: '#FFFFFF',
              letterSpacing: '-0.04em',
              textShadow: '0 2px 14px rgba(10,40,80,0.55), 0 0 32px rgba(255,255,255,0.18)',
              maxWidth: 900,
              lineHeight: 1.0,
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Finally, the future of your operations.
          </motion.p>
        </div>
      </section>
    </main>
  );
}
