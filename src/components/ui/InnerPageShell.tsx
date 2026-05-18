import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import AmbientBlobs from './AmbientBlobs';
import Clouds from './Clouds';
import SubpageHeroHeadline, { SubpageHeroLine } from './SubpageHeroHeadline';

interface InnerPageShellProps {
  eyebrow: string;
  /** Single-string headline (legacy). Used only when `lines` is not provided. */
  headline?: string;
  /** Three-line bold stacked headline. When provided, renders SubpageHeroHeadline
   *  instead of the legacy single h1. Each line can opt into 'light' weight
   *  (connector words like "for") or `glow: true` for a sustained Manifesto-
   *  style text-shadow glow on the line. */
  lines?: SubpageHeroLine[];
  subhead?: string;
  /** Max-width for the content body (cards, blocks below the hero). */
  maxWidth?: number;
  children?: ReactNode;
}

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
};

// Shared inner-page chrome — matches Pricing pattern. Centered hero
// at the top (eyebrow + headline + optional subhead), then `children` for the
// page-specific content blocks below.
export default function InnerPageShell({
  eyebrow,
  headline,
  lines,
  subhead,
  maxWidth = 1100,
  children,
}: InnerPageShellProps) {
  return (
    <main
      className="relative w-full overflow-hidden"
      style={{
        // Transparent so the html-level deep-sky body gradient (same one the
        // homepage uses) shows through. Subpages now share that single global
        // gradient end-to-end — no light-bg "island" that contrasts with the
        // homepage's wordmark blend.
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
      {/* Drifting cumulus — same parallax + density treatment used on the
          homepage so every inner page extends the same sky journey. */}
      <Clouds opacity={0.32} />

      <div
        className="relative mx-auto px-6"
        style={{
          maxWidth: lines ? Math.max(maxWidth, 1080) : maxWidth,
          padding: '120px 24px 80px',
        }}
      >
        <motion.div
          {...fadeUp}
          className="text-center mb-16 mx-auto"
          style={{ maxWidth: lines ? 1080 : 720 }}
        >
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
            {eyebrow}
          </p>
          {lines ? (
            <SubpageHeroHeadline lines={lines} />
          ) : (
            <h1
              className="mb-6 mx-auto"
              style={{
                fontSize: 'clamp(36px, 5vw, 64px)',
                fontWeight: 700,
                letterSpacing: '-0.03em',
                color: '#FFFFFF',
                lineHeight: 1.05,
                fontFamily: "'Inter', sans-serif",
                textShadow: '0 2px 14px rgba(15,42,74,0.35)',
              }}
            >
              {headline}
            </h1>
          )}
          {subhead && (
            <p
              className="mx-auto"
              style={{
                fontSize: 16,
                lineHeight: 1.7,
                fontWeight: 400,
                color: 'rgba(255,255,255,0.88)',
                maxWidth: 620,
                fontFamily: "'Inter', sans-serif",
                textShadow: '0 1px 10px rgba(15,42,74,0.28)',
              }}
            >
              {subhead}
            </p>
          )}
        </motion.div>

        {children}
      </div>
    </main>
  );
}
