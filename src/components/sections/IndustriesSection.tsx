import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Wrench, Building2, Globe2, ArrowRight } from 'lucide-react';
import Clouds from '../ui/Clouds';
import CinematicHeading from '../ui/CinematicHeading';
import PhoneCallDemo from '../demos/PhoneCallDemo';
import PortfolioDotsDemo from '../demos/PortfolioDotsDemo';
import CursorTypingDemo from '../demos/CursorTypingDemo';

type Variant = 'frost' | 'sky';

interface Industry {
  id: string;
  variant: Variant;
  eyebrow: string;
  eyebrowColor: string;
  title: string;
  hint: string;
  description: string;
  href: string;
  ctaLabel: string;
  ctaColor: string;
  icon: React.ComponentType<{ className?: string }>;
}

const INDUSTRIES: Industry[] = [
  {
    id: 'home',
    variant: 'frost',
    eyebrow: 'Service operators',
    eyebrowColor: '#D0E7F5',
    title: 'Home Services',
    hint: 'HVAC. Plumbing. Field service.',
    description: 'Tell us what you do.',
    // Subpage retired — CTA routes to /demo so the homepage card + its
    // PhoneCallDemo animation stay intact while the broken-link target is
    // replaced with the contact form.
    href: '/demo',
    ctaLabel: 'Talk to us',
    ctaColor: '#93C5E8',
    icon: Wrench,
  },
  {
    id: 'pe',
    variant: 'sky',
    eyebrow: 'Private equity',
    eyebrowColor: '#D0E7F5',
    title: 'Private Equity',
    hint: 'Portfolio-wide. Configured per portco.',
    description: '$100K combined savings in 60 days.',
    href: '/pro-os/private-equity',
    ctaLabel: 'See the build',
    ctaColor: '#93C5E8',
    icon: Building2,
  },
  {
    id: 'general',
    variant: 'frost',
    eyebrow: 'Every other industry',
    eyebrowColor: '#D0E7F5',
    title: 'Your industry',
    hint: 'Tell us what you do.',
    description: "We'll show you what it looks like.",
    href: '/pro-os/general',
    ctaLabel: 'Talk to us',
    ctaColor: '#93C5E8',
    icon: Globe2,
  },
];

// Dark-mode glass card on the deep navy section.
const VARIANT_STYLES: Record<Variant, React.CSSProperties> = {
  frost: {
    background: 'rgba(255,255,255,0.08)',
    border: '1px solid rgba(255,255,255,0.15)',
    boxShadow: '0 12px 40px rgba(10,30,60,0.30)',
  },
  sky: {
    background: 'rgba(147,197,232,0.10)',
    border: '1px solid rgba(147,197,232,0.25)',
    boxShadow: '0 12px 40px rgba(10,30,60,0.30)',
  },
};

function IndustryCard({
  industry,
  expanded,
  onExpand,
  isMobile,
}: {
  industry: Industry;
  expanded: boolean;
  onExpand: () => void;
  isMobile: boolean;
}) {
  const Icon = industry.icon;
  const handleEnter = !isMobile ? onExpand : undefined;

  return (
    <motion.div
      role={isMobile ? 'button' : undefined}
      tabIndex={isMobile ? 0 : -1}
      onClick={isMobile ? onExpand : undefined}
      onKeyDown={
        isMobile
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onExpand();
              }
            }
          : undefined
      }
      onMouseEnter={handleEnter}
      whileHover={!isMobile ? { scale: 1.025, y: -4 } : undefined}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="cursor-pointer"
      style={{
        ...VARIANT_STYLES[industry.variant],
        borderRadius: 24,
        padding: 32,
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        position: 'relative',
        height: '100%',
        minHeight: 280,
      }}
    >
      <div
        className="inline-flex items-center justify-center mb-4"
        style={{
          width: 44,
          height: 44,
          background: 'rgba(255,255,255,0.10)',
          border: '1px solid rgba(255,255,255,0.18)',
          borderRadius: 12,
          color: '#FFFFFF',
        }}
      >
        <Icon className="w-5 h-5" />
      </div>

      <p
        className="mb-3"
        style={{
          fontSize: 10,
          fontWeight: 600,
          letterSpacing: '3px',
          textTransform: 'uppercase',
          color: industry.eyebrowColor,
        }}
      >
        {industry.eyebrow}
      </p>

      <h3
        style={{
          fontSize: 26,
          fontWeight: 300,
          letterSpacing: '-0.4px',
          color: '#FFFFFF',
          marginBottom: 10,
          lineHeight: 1.2,
        }}
      >
        {industry.title}
      </h3>

      <p
        style={{
          fontSize: 14,
          color: 'rgba(208,231,245,0.92)',
          lineHeight: 1.5,
          marginBottom: 4,
          fontWeight: 500,
        }}
      >
        {industry.hint}
      </p>

      {/* Animated demo per card — the visual explanation. */}
      {industry.id === 'home' && <PhoneCallDemo />}
      {industry.id === 'pe' && <PortfolioDotsDemo />}
      {industry.id === 'general' && <CursorTypingDemo />}

      <div style={{ marginTop: 16 }}>
        <Link
          to={industry.href}
          className="inline-flex items-center group/cta"
          style={{
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: '0.3px',
            color: industry.ctaColor,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <span>{industry.ctaLabel}</span>
          <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform group-hover/cta:translate-x-0.5" />
        </Link>
      </div>
    </motion.div>
  );
}

export default function IndustriesSection() {
  const [activeId, setActiveId] = useState<string>(INDUSTRIES[0].id);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return (
    <section
      id="industries"
      className="relative w-full overflow-hidden"
      style={{
        // Section is transparent — the deep accent comes from an internal
        // gradient that fades in from body color, stays solid through the
        // content, and fades back out. No edge seam.
        background:
          'linear-gradient(180deg, rgba(31,107,168,0) 0%, #1F6BA8 22%, #1F6BA8 78%, rgba(31,107,168,0) 100%)',
        padding: 'clamp(120px, 16vh, 180px) 24px',
      }}
    >
      {/* Section gradient handles the entry/exit fade — no extra mask divs. */}
      <Clouds opacity={0.40} />
      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-14"
        >
          <p
            style={{
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.85)',
              marginBottom: 24,
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Built for operators
          </p>
          <CinematicHeading size="display" align="center" color="#FFFFFF" noParallax weight={800}>
            {"Deployed by operators\nin every industry."}
          </CinematicHeading>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {INDUSTRIES.map((industry, i) => (
            <motion.div
              key={industry.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
            >
              <IndustryCard
                industry={industry}
                expanded={isMobile ? activeId === industry.id : true}
                onExpand={() => setActiveId(industry.id)}
                isMobile={isMobile}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
