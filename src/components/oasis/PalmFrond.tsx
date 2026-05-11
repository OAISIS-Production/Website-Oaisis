import { CSSProperties } from 'react';

interface PalmFrondProps {
  side: 'left' | 'right';
  delay?: number;
  style?: CSSProperties;
}

/**
 * SVG palm frond silhouette in deep emerald, animated with a gentle sway via CSS.
 * Anchored to the bottom corners of the oasis scene as foreground vegetation.
 */
export default function PalmFrond({ side, delay = 0, style }: PalmFrondProps) {
  const flip = side === 'right' ? 'scaleX(-1)' : 'none';
  return (
    <div
      aria-hidden="true"
      className="absolute pointer-events-none palm-sway"
      style={{
        bottom: '-4%',
        [side]: '-8%',
        width: 'clamp(280px, 38vw, 580px)',
        height: 'clamp(280px, 38vw, 580px)',
        transform: flip,
        transformOrigin: side === 'left' ? 'bottom left' : 'bottom right',
        animationDelay: `${delay}s`,
        zIndex: 6,
        ...style,
      }}
    >
      <svg viewBox="0 0 400 400" width="100%" height="100%">
        <defs>
          <linearGradient id={`frond-${side}-${delay}`} x1="0" y1="1" x2="0.6" y2="0">
            <stop offset="0%" stopColor="#0F4D35" stopOpacity="0.95" />
            <stop offset="55%" stopColor="#1A6B4A" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#2D8B55" stopOpacity="0.7" />
          </linearGradient>
        </defs>
        <g fill={`url(#frond-${side}-${delay})`}>
          <path d="M 360 380 Q 240 360 180 280 Q 150 240 200 220 Q 250 240 320 320 Z" />
          <path d="M 360 380 Q 200 320 100 220 Q 80 180 140 180 Q 220 220 320 320 Z" />
          <path d="M 360 380 Q 240 280 200 160 Q 200 100 250 130 Q 290 220 330 340 Z" />
          <path d="M 360 380 Q 320 260 320 120 Q 330 70 360 90 Q 370 220 360 340 Z" />
          <path d="M 360 380 Q 300 320 220 320 Q 160 320 160 360 Q 240 380 320 380 Z" />
          <path
            d="M 360 380 Q 360 320 360 240 Q 358 200 362 200 Q 362 300 362 380 Z"
            fill="#0F4D35"
            opacity="0.85"
          />
        </g>
      </svg>
    </div>
  );
}
