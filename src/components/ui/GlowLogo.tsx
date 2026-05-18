import { CSSProperties } from 'react';
import LogoMark from './LogoMark';

export type GlowVariant = 'blue' | 'sky' | 'deep' | 'night' | 'white' | 'warm-white';

interface GlowLogoProps {
  size?: number;
  glow?: GlowVariant;
  className?: string;
  style?: CSSProperties;
}

// The OAISIS palm logo PNG has the circle in the upper portion and the
// "OAISIS" wordmark below. Halo geometry is anchored to the circle's visual
// center (~50% horizontal, ~35% vertical) at its apparent radius (~22% of
// image width), so the glow locks to the circle at every render size.
const CIRCLE_DIAMETER_RATIO = 0.44;
const CIRCLE_TOP_RATIO = 0.13;
const CIRCLE_LEFT_RATIO = 0.28;

export default function GlowLogo({
  size = 140,
  glow = 'blue',
  className = '',
  style = {},
}: GlowLogoProps) {
  const d = size * CIRCLE_DIAMETER_RATIO;
  const glowTop = size * CIRCLE_TOP_RATIO;
  const glowLeft = size * CIRCLE_LEFT_RATIO;

  // Sky-blue palette only. Old gold→warm-white, old green→deep blue.
  const glows: Record<GlowVariant, string> = {
    blue: `0 0 ${d * 0.35}px rgba(91,160,212,0.50), 0 0 ${d * 0.8}px rgba(37,99,168,0.22), 0 0 ${d * 1.2}px rgba(91,160,212,0.08)`,
    sky: `0 0 ${d * 0.35}px rgba(147,197,232,0.50), 0 0 ${d * 0.8}px rgba(91,160,212,0.20), 0 0 ${d * 1.2}px rgba(147,197,232,0.07)`,
    deep: `0 0 ${d * 0.35}px rgba(74,139,194,0.50), 0 0 ${d * 0.8}px rgba(37,99,168,0.22), 0 0 ${d * 1.2}px rgba(37,99,168,0.08)`,
    night: `0 0 ${d * 0.30}px rgba(180,200,220,0.30), 0 0 ${d * 0.6}px rgba(147,197,232,0.15), 0 0 ${d * 1.0}px rgba(91,160,212,0.08), 0 0 ${d * 1.5}px rgba(200,220,240,0.04)`,
    white: `0 0 ${d * 0.35}px rgba(255,255,255,0.55), 0 0 ${d * 0.8}px rgba(255,255,255,0.22), 0 0 ${d * 1.2}px rgba(255,255,255,0.07)`,
    'warm-white': `0 0 ${d * 0.35}px rgba(255,253,245,0.50), 0 0 ${d * 0.8}px rgba(248,245,230,0.20), 0 0 ${d * 1.2}px rgba(255,253,245,0.07)`,
  };

  const filters: Record<GlowVariant, string> = {
    blue: 'brightness(1.15) drop-shadow(0 0 14px rgba(59,130,200,0.35))',
    sky: 'brightness(1.15) drop-shadow(0 0 14px rgba(147,197,232,0.40))',
    deep: 'brightness(1.10) drop-shadow(0 0 14px rgba(37,99,168,0.35))',
    night: 'brightness(1.35) contrast(1.05) drop-shadow(0 0 14px rgba(147,197,232,0.30))',
    white: 'brightness(1.20) drop-shadow(0 0 14px rgba(255,255,255,0.40))',
    'warm-white': 'brightness(1.18) drop-shadow(0 0 14px rgba(255,253,245,0.40))',
  };

  return (
    <div
      className={className}
      style={{ position: 'relative', display: 'inline-block', ...style }}
    >
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: glowTop,
          left: glowLeft,
          width: d,
          height: d,
          borderRadius: '50%',
          boxShadow: glows[glow],
          background: 'transparent',
          pointerEvents: 'none',
        }}
      />
      <LogoMark size={size} style={{ position: 'relative', filter: filters[glow] }} />
    </div>
  );
}
