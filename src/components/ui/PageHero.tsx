import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import Glass from './Glass';
import GlowLogo, { GlowVariant } from './GlowLogo';

interface CTA {
  label: string;
  href: string;
  external?: boolean;
  variant?: 'primary' | 'ghost';
}

interface PageHeroProps {
  photoSrc?: string;
  photoPosition?: string;
  overlay?: 'default' | 'warm' | 'cool' | 'deep';
  logoSize?: number;
  logoGlow?: GlowVariant;
  eyebrow?: string;
  eyebrowColor?: string;
  headline: ReactNode;
  subhead?: string;
  ctas?: CTA[];
  minHeight?: string;
  glassMaxWidth?: number;
}

const OVERLAYS: Record<NonNullable<PageHeroProps['overlay']>, string> = {
  default:
    'linear-gradient(180deg, rgba(91,160,212,0.10) 0%, rgba(37,99,168,0.04) 30%, transparent 50%, rgba(200,173,126,0.10) 75%, rgba(245,239,224,0.40) 100%)',
  warm:
    'linear-gradient(180deg, rgba(200,173,126,0.10) 0%, rgba(237,226,204,0.18) 40%, rgba(200,173,126,0.20) 75%, rgba(245,239,224,0.50) 100%)',
  cool:
    'linear-gradient(180deg, rgba(91,160,212,0.18) 0%, rgba(37,99,168,0.08) 35%, transparent 55%, rgba(208,231,245,0.30) 100%)',
  deep:
    'linear-gradient(180deg, rgba(12,10,24,0.20) 0%, rgba(15,77,53,0.18) 40%, rgba(15,77,53,0.30) 80%, rgba(12,10,24,0.40) 100%)',
};

export default function PageHero({
  photoSrc = '/assets/images/oasis.jpg',
  photoPosition = 'center 40%',
  overlay = 'default',
  logoSize = 160,
  logoGlow = 'green',
  eyebrow,
  eyebrowColor = '#1A6B4A',
  headline,
  subhead,
  ctas = [],
  minHeight = '82vh',
  glassMaxWidth = 720,
}: PageHeroProps) {
  return (
    <section
      className="relative w-full overflow-hidden flex items-center justify-center"
      style={{ minHeight, padding: '40px 20px' }}
    >
      <div className="absolute inset-0">
        <img
          src={photoSrc}
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover"
          style={{ objectPosition: photoPosition }}
        />
        <div className="absolute inset-0" style={{ background: OVERLAYS[overlay] }} />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at center, transparent 50%, rgba(37,99,168,0.06) 100%)',
          }}
        />
      </div>

      <div
        className="relative z-10 w-full"
        style={{ maxWidth: glassMaxWidth }}
      >
        <Glass variant="glow" className="text-center" style={{ padding: 'clamp(32px, 5vw, 48px) clamp(24px, 4vw, 40px)' }}>
          <div className="flex justify-center mb-6">
            <GlowLogo size={logoSize} glow={logoGlow} />
          </div>

          {eyebrow && (
            <p
              className="mb-4"
              style={{
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: '3px',
                textTransform: 'uppercase',
                color: eyebrowColor,
              }}
            >
              {eyebrow}
            </p>
          )}

          <h1
            className="display-heading text-brand-text mb-6"
            style={{ fontSize: 'clamp(28px, 5vw, 48px)' }}
          >
            {headline}
          </h1>

          {subhead && (
            <p
              className="text-brand-text-sec mx-auto mb-8"
              style={{ fontSize: 15, lineHeight: 1.7, maxWidth: '60ch' }}
            >
              {subhead}
            </p>
          )}

          {ctas.length > 0 && (
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              {ctas.map((cta, i) => {
                const isPrimary = cta.variant !== 'ghost';
                const className = isPrimary ? 'btn-primary-emerald' : 'btn-ghost-sky';
                if (cta.external) {
                  return (
                    <a key={i} href={cta.href} target="_blank" rel="noopener noreferrer" className={className}>
                      {cta.label}
                    </a>
                  );
                }
                if (cta.href.startsWith('#')) {
                  return (
                    <button
                      key={i}
                      type="button"
                      className={className}
                      onClick={() => {
                        const id = cta.href.slice(1);
                        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
                      }}
                    >
                      {cta.label}
                    </button>
                  );
                }
                return (
                  <Link key={i} to={cta.href} className={className}>
                    {cta.label}
                  </Link>
                );
              })}
            </div>
          )}
        </Glass>
      </div>
    </section>
  );
}
