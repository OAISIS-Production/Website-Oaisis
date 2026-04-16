type GlowVariant = 'green' | 'blue' | 'gold' | 'moonlit' | 'white';

interface GlowLogoProps {
  size?: number;
  glow?: GlowVariant;
  className?: string;
}

const glowClasses: Record<GlowVariant, string> = {
  green: 'logo-glow-green',
  blue: 'logo-glow-blue',
  gold: 'logo-glow-gold',
  moonlit: 'logo-glow-moonlit',
  white: 'logo-glow-white',
};

export default function GlowLogo({ size = 40, glow = 'green', className = '' }: GlowLogoProps) {
  return (
    <img
      src="/assets/images/logo.png"
      alt="OAISIS"
      width={size}
      height={size}
      className={`${glowClasses[glow]} ${className}`}
      style={{ width: size, height: size }}
    />
  );
}
