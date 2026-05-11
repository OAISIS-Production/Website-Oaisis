import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Wrench, Building2, Globe2, ArrowRight } from 'lucide-react';

type Variant = 'tan' | 'blue' | 'green';

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
    variant: 'tan',
    eyebrow: 'Service operators',
    eyebrowColor: '#A08050',
    title: 'Home Services',
    hint: 'HVAC, plumbing, electrical, field service.',
    description:
      'Phone agents that never sleep, quotes that close themselves, a business that answers you back. Owner hours reclaimed in 90 days.',
    href: '/pro-os/home-services',
    ctaLabel: 'See the build',
    ctaColor: '#A08050',
    icon: Wrench,
  },
  {
    id: 'pe',
    variant: 'blue',
    eyebrow: 'Private equity',
    eyebrowColor: '#2563A8',
    title: 'Private Equity',
    hint: 'Portfolio-wide AI deployment.',
    description:
      'One operating layer across your portcos, configured per company, observable from the fund. ≥$100K combined annual savings in 60 days or you pay nothing.',
    href: '/pro-os/private-equity',
    ctaLabel: 'See the build',
    ctaColor: '#2563A8',
    icon: Building2,
  },
  {
    id: 'general',
    variant: 'green',
    eyebrow: 'Every other industry',
    eyebrowColor: '#1A6B4A',
    title: 'Your industry',
    hint: 'If your business runs on customers, data, and decisions.',
    description:
      "Pro OS is industry-agnostic at its core. Tell us what you do — we'll show you what it looks like deployed to your specific operation.",
    href: '/pro-os/general',
    ctaLabel: 'Talk to us',
    ctaColor: '#0F4D35',
    icon: Globe2,
  },
];

const VARIANT_STYLES: Record<Variant, React.CSSProperties> = {
  tan: {
    background: 'rgba(237,226,204,0.55)',
    border: '1px solid rgba(220,201,160,0.7)',
    boxShadow: '0 8px 32px rgba(160,128,80,0.12)',
  },
  blue: {
    background: 'rgba(208,231,245,0.55)',
    border: '1px solid rgba(91,160,212,0.45)',
    boxShadow: '0 8px 32px rgba(37,99,168,0.12)',
  },
  green: {
    background: 'rgba(255,255,255,0.50)',
    border: '1px solid rgba(255,255,255,0.7)',
    boxShadow: '0 8px 32px rgba(15,77,53,0.14)',
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
          background: 'rgba(255,255,255,0.7)',
          borderRadius: 12,
          color: industry.eyebrowColor,
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
          color: '#0F4D35',
          marginBottom: 10,
          lineHeight: 1.2,
        }}
      >
        {industry.title}
      </h3>

      <p
        style={{
          fontSize: 13,
          color: '#0F4D35',
          opacity: 0.7,
          lineHeight: 1.6,
          marginBottom: 4,
        }}
      >
        {industry.hint}
      </p>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <p
              style={{
                fontSize: 13.5,
                color: '#2A1F38',
                lineHeight: 1.7,
                marginBottom: 20,
              }}
            >
              {industry.description}
            </p>
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
          </motion.div>
        )}
      </AnimatePresence>
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
        background: 'linear-gradient(180deg, #7DD49A 0%, #40A865 100%)',
        padding: 'clamp(80px, 12vh, 140px) 24px',
      }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12"
        >
          <p
            style={{
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: '3px',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.85)',
              marginBottom: 14,
            }}
          >
            Industries
          </p>
          <h2
            className="mx-auto"
            style={{
              fontSize: 'clamp(28px, 4vw, 40px)',
              fontWeight: 200,
              letterSpacing: '-0.5px',
              color: '#FFFFFF',
              maxWidth: 720,
              lineHeight: 1.15,
            }}
          >
            Built for operators. In every industry.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
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
