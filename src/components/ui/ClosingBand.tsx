import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import Glass from './Glass';
import GlowLogo, { GlowVariant } from './GlowLogo';

interface ClosingBandProps {
  photoSrc?: string;
  photoPosition?: string;
  logoSize?: number;
  logoGlow?: GlowVariant;
  headline: ReactNode;
  cta: { label: string; href: string };
  minHeight?: string;
}

export default function ClosingBand({
  photoSrc = '/assets/images/oasis.jpg',
  photoPosition = 'center 35%',
  logoSize = 80,
  logoGlow = 'green',
  headline,
  cta,
  minHeight = '58vh',
}: ClosingBandProps) {
  const ctaIsHash = cta.href.startsWith('#');
  return (
    <section
      className="relative w-full overflow-hidden flex items-center justify-center"
      style={{ minHeight, padding: '64px 20px' }}
    >
      <div className="absolute inset-0">
        <img
          src={photoSrc}
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover"
          style={{ objectPosition: photoPosition }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(91,160,212,0.10) 0%, rgba(15,77,53,0.18) 50%, rgba(15,77,53,0.40) 100%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at center, transparent 40%, rgba(12,10,24,0.18) 100%)',
          }}
        />
      </div>

      <div className="relative z-10 w-full" style={{ maxWidth: 720 }}>
        <Glass variant="glow" className="text-center" style={{ padding: 'clamp(36px, 5vw, 52px) clamp(24px, 4vw, 40px)' }}>
          <div className="flex justify-center mb-6">
            <GlowLogo size={logoSize} glow={logoGlow} />
          </div>
          <h2
            className="display-heading text-brand-text mb-8 mx-auto"
            style={{ fontSize: 'clamp(24px, 3.5vw, 32px)', maxWidth: 540 }}
          >
            {headline}
          </h2>
          {ctaIsHash ? (
            <a href={cta.href} className="btn-primary-emerald">
              {cta.label}
            </a>
          ) : (
            <Link to={cta.href} className="btn-primary-emerald">
              {cta.label}
            </Link>
          )}
        </Glass>
      </div>
    </section>
  );
}
