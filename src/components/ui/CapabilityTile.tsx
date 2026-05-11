import { ReactNode } from 'react';
import Glass from './Glass';

type Accent = 'green' | 'blue' | 'gold';

const ACCENT_COLOR: Record<Accent, string> = {
  green: '#1A6B4A',
  blue: '#2563A8',
  gold: '#A08050',
};

interface CapabilityTileProps {
  icon: ReactNode;
  accent?: Accent;
  title: string;
  description: string;
}

export default function CapabilityTile({
  icon,
  accent = 'green',
  title,
  description,
}: CapabilityTileProps) {
  const color = ACCENT_COLOR[accent];
  return (
    <Glass className="h-full flex flex-col hover:-translate-y-0.5 transition-transform duration-300" style={{ padding: 28 }}>
      <div style={{ color, marginBottom: 16 }}>
        {icon}
      </div>
      <h3
        className="text-brand-text mb-2"
        style={{ fontSize: 16, fontWeight: 600, letterSpacing: '-0.1px' }}
      >
        {title}
      </h3>
      <p
        className="text-brand-text-sec"
        style={{ fontSize: 13, lineHeight: 1.7, fontWeight: 400 }}
      >
        {description}
      </p>
    </Glass>
  );
}
