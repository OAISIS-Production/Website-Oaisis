import { CSSProperties } from 'react';
import LogoMark from './LogoMark';

export type GlowVariant = 'green' | 'blue' | 'gold' | 'night' | 'white';

interface GlowLogoProps {
  size?: number;
  glow?: GlowVariant;
  className?: string;
  style?: CSSProperties;
}

export default function GlowLogo({
  size = 140,
  glow = 'green',
  className = '',
  style = {},
}: GlowLogoProps) {
  const d = size * 0.455;
  const glowTop = size * 0.14;
  const glowLeft = size * 0.276;

  const glows: Record<GlowVariant, string> = {
    green: `0 0 ${d * 0.35}px rgba(45,139,85,0.45), 0 0 ${d * 0.8}px rgba(26,107,74,0.18), 0 0 ${d * 1.2}px rgba(26,107,74,0.06)`,
    blue: `0 0 ${d * 0.35}px rgba(59,130,200,0.5), 0 0 ${d * 0.8}px rgba(37,99,168,0.22), 0 0 ${d * 1.2}px rgba(91,160,212,0.08)`,
    gold: `0 0 ${d * 0.35}px rgba(212,165,74,0.45), 0 0 ${d * 0.8}px rgba(200,173,126,0.2), 0 0 ${d * 1.2}px rgba(200,173,126,0.06)`,
    night: `0 0 ${d * 0.3}px rgba(180,200,220,0.3), 0 0 ${d * 0.6}px rgba(147,197,232,0.15), 0 0 ${d * 1.0}px rgba(91,160,212,0.08), 0 0 ${d * 1.5}px rgba(200,220,240,0.04)`,
    white: `0 0 ${d * 0.35}px rgba(255,255,255,0.55), 0 0 ${d * 0.8}px rgba(255,255,255,0.22), 0 0 ${d * 1.2}px rgba(255,255,255,0.07)`,
  };

  const filters: Record<GlowVariant, string> = {
    green: 'brightness(1.1) drop-shadow(0 0 12px rgba(45,139,85,0.3))',
    blue: 'brightness(1.15) drop-shadow(0 0 14px rgba(59,130,200,0.35))',
    gold: 'brightness(1.15) drop-shadow(0 0 12px rgba(212,165,74,0.3))',
    night: 'brightness(1.35) contrast(1.05) drop-shadow(0 0 14px rgba(147,197,232,0.3))',
    white: 'brightness(1.2) drop-shadow(0 0 14px rgba(255,255,255,0.4))',
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
