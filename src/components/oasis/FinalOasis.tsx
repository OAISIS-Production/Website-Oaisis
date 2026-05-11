import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';
import GlowLogo from '../ui/GlowLogo';
import PalmFrond from './PalmFrond';
import ParticleField from './ParticleField';

const FOOTER_LINKS = [
  { label: 'Products', href: '/pro-os' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Resources', href: '/resources' },
  { label: 'About', href: '/about' },
  { label: 'Demo', href: '/demo' },
];

export default function FinalOasis() {
  return (
    <section className="relative w-full overflow-hidden" style={{ minHeight: '100vh' }}>
      <div className="absolute inset-0">
        <img
          src="/assets/images/oasis.jpg"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover"
          style={{ objectPosition: 'center 45%' }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(91,160,212,0.10) 0%, rgba(45,139,85,0.10) 25%, transparent 45%, rgba(15,77,53,0.15) 75%, rgba(15,77,53,0.30) 100%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at center 40%, rgba(255,253,245,0.18) 0%, transparent 55%)',
          }}
        />
      </div>

      <ParticleField />

      <PalmFrond side="left" delay={0} />
      <PalmFrond side="right" delay={1.5} />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 pt-16 pb-32">
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="oasis-logo-float relative"
        >
          <GlowLogo size={208} glow="gold" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          className="text-center mx-auto mt-10"
          style={{
            fontSize: 'clamp(22px, 3vw, 32px)',
            fontWeight: 200,
            color: '#FFFFFF',
            letterSpacing: '-0.3px',
            textShadow: '0 2px 12px rgba(15,77,53,0.4), 0 0 32px rgba(200,173,126,0.18)',
            maxWidth: 720,
            lineHeight: 1.3,
          }}
        >
          The future of business, installed.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.45 }}
          className="mt-10"
        >
          <Link to="/demo" className="btn-oasis-hero">
            Book a demo
          </Link>
        </motion.div>
      </div>

      <div
        className="absolute inset-x-0 bottom-0 z-20"
        style={{
          background:
            'linear-gradient(180deg, transparent 0%, rgba(15,77,53,0.85) 35%, #0F4D35 100%)',
          paddingTop: 80,
        }}
      >
        <div className="max-w-6xl mx-auto px-6 pt-12 pb-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div className="flex items-center gap-3">
              <GlowLogo size={32} glow="night" />
              <span style={{ fontSize: 10, fontWeight: 300, letterSpacing: 5, color: 'rgba(228,223,240,0.65)', textTransform: 'uppercase' }}>
                OAISIS
              </span>
            </div>

            <nav className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
              {FOOTER_LINKS.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className="transition-colors"
                  style={{ fontSize: 13, fontWeight: 400, color: 'rgba(228,223,240,0.78)' }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,1)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(228,223,240,0.78)';
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <a
              href="mailto:mail@openoaisis.com"
              className="inline-flex items-center gap-2 transition-colors"
              style={{ fontSize: 12, color: 'rgba(228,223,240,0.65)', letterSpacing: '0.3px' }}
            >
              <Mail className="w-3.5 h-3.5" />
              mail@openoaisis.com
            </a>
          </div>

          <div
            className="mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3"
            style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
          >
            <p style={{ fontSize: 9, color: 'rgba(228,223,240,0.45)', letterSpacing: '2px', textTransform: 'uppercase' }}>
              &copy; 2026 OAISIS
            </p>
            <p
              style={{ fontSize: 9, color: 'rgba(228,223,240,0.45)', letterSpacing: '2px', textTransform: 'uppercase' }}
            >
              Built in Dallas-Fort Worth
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
