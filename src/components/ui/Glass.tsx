import { ReactNode } from 'react';

type GlassVariant = 'default' | 'tan' | 'green' | 'blue' | 'glow' | 'night' | 'night-green' | 'night-blue';

interface GlassProps {
  variant?: GlassVariant;
  className?: string;
  children: ReactNode;
}

const variantClasses: Record<GlassVariant, string> = {
  default: 'glass',
  tan: 'glass-tan',
  green: 'glass-green',
  blue: 'glass-blue',
  glow: 'glass-glow',
  night: 'glass-night',
  'night-green': 'glass-night-green',
  'night-blue': 'glass-night-blue',
};

export default function Glass({ variant = 'default', className = '', children }: GlassProps) {
  return (
    <div className={`${variantClasses[variant]} ${className}`}>
      {children}
    </div>
  );
}
