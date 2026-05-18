import { CSSProperties } from 'react';

interface LogoMarkProps {
  size?: number;
  className?: string;
  style?: CSSProperties;
}

// Canonical OAISIS palm logo. Drop-in replacement: swap the file at
// /public/brand/oaisis-logo-full.png and every consumer (GlowLogo, Navbar,
// Footer, FinalOasis, hero static fallback) inherits automatically.
export default function LogoMark({ size = 40, className = '', style }: LogoMarkProps) {
  return (
    <img
      src="/brand/oaisis-logo-full.png"
      alt="OAISIS"
      width={size}
      height={size}
      className={className}
      loading="eager"
      decoding="async"
      fetchPriority="high"
      style={{ width: size, height: size, objectFit: 'contain', display: 'block', ...style }}
    />
  );
}
