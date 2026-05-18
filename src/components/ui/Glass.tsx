import { CSSProperties, ReactNode } from 'react';

// v13 palette — `tan` retired in Phase 0 in favor of `sky`. `green` stays
// only because the night variant is still used in the dark footer slab.
type GlassVariant = 'default' | 'sky' | 'green' | 'blue' | 'glow' | 'night' | 'night-green' | 'night-blue' | 'luminescent';

interface GlassProps {
  variant?: GlassVariant;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}

const variantClasses: Record<GlassVariant, string> = {
  default: 'glass',
  sky: 'glass-sky-tint',
  green: 'glass-green',
  blue: 'glass-blue',
  glow: 'glass-glow',
  night: 'glass-night',
  'night-green': 'glass-night-green',
  'night-blue': 'glass-night-blue',
  luminescent: 'glass-luminescent',
};

export default function Glass({ variant = 'default', className = '', style, children }: GlassProps) {
  return (
    <div className={`${variantClasses[variant]} ${className}`} style={style}>
      {children}
    </div>
  );
}
