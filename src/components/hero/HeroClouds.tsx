import { useRef } from 'react';
import { useParallax } from '../../lib/parallax';

interface CloudShape {
  cx: number;
  cy: number;
  rx: number;
  ry: number;
}

const FAR_CLOUDS: CloudShape[] = [
  { cx: 120, cy: 80, rx: 60, ry: 22 },
  { cx: 380, cy: 120, rx: 85, ry: 28 },
  { cx: 700, cy: 60, rx: 70, ry: 24 },
  { cx: 1000, cy: 110, rx: 90, ry: 30 },
  { cx: 1300, cy: 70, rx: 65, ry: 22 },
  { cx: 1600, cy: 130, rx: 80, ry: 26 },
];

const MID_CLOUDS: CloudShape[] = [
  { cx: 200, cy: 220, rx: 100, ry: 32 },
  { cx: 600, cy: 280, rx: 130, ry: 40 },
  { cx: 1100, cy: 200, rx: 95, ry: 30 },
  { cx: 1500, cy: 260, rx: 120, ry: 38 },
];

const NEAR_CLOUDS: CloudShape[] = [
  { cx: 80, cy: 480, rx: 150, ry: 48 },
  { cx: 700, cy: 520, rx: 180, ry: 56 },
  { cx: 1400, cy: 450, rx: 160, ry: 52 },
];

interface CloudLayerProps {
  speed: number;
  blur: number;
  opacity: number;
  clouds: CloudShape[];
  zIndex: number;
}

function CloudLayer({ speed, blur, opacity, clouds, zIndex }: CloudLayerProps) {
  const ref = useRef<HTMLDivElement>(null);
  useParallax(ref, speed);
  return (
    <div
      ref={ref}
      className="absolute inset-x-0 pointer-events-none will-change-transform"
      style={{
        top: 0,
        height: '120%',
        zIndex,
        opacity,
      }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1800 700"
        preserveAspectRatio="xMidYMid slice"
        width="100%"
        height="100%"
        style={{ filter: blur ? `blur(${blur}px)` : undefined }}
      >
        <defs>
          <radialGradient id={`cloudGrad-${speed}`} cx="50%" cy="55%" r="55%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
            <stop offset="55%" stopColor="#FFFFFF" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </radialGradient>
        </defs>
        {clouds.map((c, i) => (
          <g key={i}>
            <ellipse cx={c.cx - c.rx * 0.5} cy={c.cy + c.ry * 0.2} rx={c.rx * 0.7} ry={c.ry * 0.85} fill={`url(#cloudGrad-${speed})`} />
            <ellipse cx={c.cx} cy={c.cy} rx={c.rx} ry={c.ry} fill={`url(#cloudGrad-${speed})`} />
            <ellipse cx={c.cx + c.rx * 0.55} cy={c.cy + c.ry * 0.15} rx={c.rx * 0.75} ry={c.ry * 0.9} fill={`url(#cloudGrad-${speed})`} />
            <ellipse cx={c.cx + c.rx * 0.2} cy={c.cy - c.ry * 0.45} rx={c.rx * 0.55} ry={c.ry * 0.7} fill={`url(#cloudGrad-${speed})`} />
          </g>
        ))}
      </svg>
    </div>
  );
}

export default function HeroClouds() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <CloudLayer speed={0.2} blur={8} opacity={0.3} clouds={FAR_CLOUDS} zIndex={1} />
      <CloudLayer speed={0.5} blur={2} opacity={0.55} clouds={MID_CLOUDS} zIndex={2} />
      <CloudLayer speed={0.8} blur={0} opacity={0.85} clouds={NEAR_CLOUDS} zIndex={3} />
    </div>
  );
}
