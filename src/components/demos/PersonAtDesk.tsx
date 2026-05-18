// PersonAtDesk — stick figure at a desk surrounded by ~12 app windows, with
// an animated cursor jumping between them. The visual replacement for the
// manifesto's body copy: "your team runs the software" — shown, not told.
//
// SVG-based, pure CSS animation, no JS loop. 8-second cycle.

const APP_WINDOWS = [
  { x: 60, y: 80, w: 110, h: 70, label: 'CRM' },
  { x: 200, y: 50, w: 110, h: 70, label: 'Email' },
  { x: 340, y: 80, w: 110, h: 70, label: 'Slack' },
  { x: 480, y: 50, w: 110, h: 70, label: 'Sheets' },
  { x: 620, y: 80, w: 110, h: 70, label: 'Docs' },
  { x: 760, y: 50, w: 110, h: 70, label: 'Cal' },
  { x: 60, y: 320, w: 110, h: 70, label: 'Invoices' },
  { x: 200, y: 350, w: 110, h: 70, label: 'Books' },
  { x: 340, y: 320, w: 110, h: 70, label: 'Support' },
  { x: 480, y: 350, w: 110, h: 70, label: 'Analytics' },
  { x: 620, y: 320, w: 110, h: 70, label: 'Tickets' },
  { x: 760, y: 350, w: 110, h: 70, label: 'CMS' },
];

// Cursor path waypoints — center of each window, in order, looping.
const CURSOR_WAYPOINTS = APP_WINDOWS.map((w) => `${w.x + w.w / 2}px ${w.y + w.h / 2}px`);
const cursorKeyframes = CURSOR_WAYPOINTS.map((p, i) => {
  const pct = (i / CURSOR_WAYPOINTS.length) * 100;
  return `${pct.toFixed(1)}% { left: ${p.split(' ')[0]}; top: ${p.split(' ')[1]}; }`;
}).join('\n  ');

// Highlight which window the cursor is currently on — each window pulses
// when the cursor is "clicking" it, staggered by index.
function windowKeyframes(index: number, total: number) {
  const slice = 100 / total;
  const start = index * slice;
  const peak = start + slice * 0.4;
  const end = start + slice;
  return `
    ${(start - 1).toFixed(1)}% { opacity: 0.45; transform: scale(1); }
    ${start.toFixed(1)}%       { opacity: 0.45; transform: scale(1); }
    ${peak.toFixed(1)}%        { opacity: 1;    transform: scale(1.03); }
    ${end.toFixed(1)}%         { opacity: 0.45; transform: scale(1); }
  `;
}

const css = `
@keyframes person-at-desk-cursor {
  ${cursorKeyframes}
  100% { left: ${CURSOR_WAYPOINTS[0].split(' ')[0]}; top: ${CURSOR_WAYPOINTS[0].split(' ')[1]}; }
}
${APP_WINDOWS.map((_, i) => `
@keyframes person-at-desk-win-${i} {
  ${windowKeyframes(i, APP_WINDOWS.length)}
}
.person-at-desk-win-${i} {
  animation: person-at-desk-win-${i} 8s ease-in-out infinite;
}
`).join('\n')}
.person-at-desk-cursor {
  animation: person-at-desk-cursor 8s steps(${APP_WINDOWS.length}, end) infinite;
}
`;

export default function PersonAtDesk() {
  return (
    <div
      aria-hidden="true"
      className="relative w-full"
      style={{
        maxWidth: 1100,
        aspectRatio: '930 / 480',
        margin: '0 auto',
      }}
    >
      <style>{css}</style>
      <svg
        viewBox="0 0 930 480"
        className="absolute inset-0 w-full h-full"
        style={{ overflow: 'visible' }}
      >
        {/* Soft elliptical shadow under the figure — replaces the old desk bar. */}
        <defs>
          <radialGradient id="person-shadow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="rgba(15,42,74,0.35)" />
            <stop offset="100%" stopColor="rgba(15,42,74,0)" />
          </radialGradient>
          <linearGradient id="person-head" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(255,255,255,0.92)" />
            <stop offset="100%" stopColor="rgba(208,231,245,0.85)" />
          </linearGradient>
          <linearGradient id="person-body" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(255,255,255,0.85)" />
            <stop offset="100%" stopColor="rgba(91,160,212,0.75)" />
          </linearGradient>
        </defs>
        <ellipse cx={465} cy={450} rx={140} ry={14} fill="url(#person-shadow)" />

        {/* Laptop — clean closed-bottom flat rectangle, no separate desk surface. */}
        <rect
          x={380}
          y={310}
          width={170}
          height={6}
          rx={3}
          fill="rgba(255,255,255,0.55)"
          stroke="rgba(255,255,255,0.85)"
          strokeWidth={0.6}
        />
        <path
          d="M 396,310 L 408,250 L 522,250 L 534,310 Z"
          fill="rgba(255,255,255,0.18)"
          stroke="rgba(255,255,255,0.65)"
          strokeWidth={1.2}
        />
        <rect x={414} y={258} width={102} height={46} rx={2} fill="rgba(255,255,255,0.45)" />
        <rect x={420} y={266} width={36} height={3} rx={1.5} fill="rgba(31,79,143,0.55)" />
        <rect x={420} y={274} width={68} height={3} rx={1.5} fill="rgba(31,79,143,0.35)" />
        <rect x={420} y={282} width={54} height={3} rx={1.5} fill="rgba(31,79,143,0.35)" />

        {/* Person — geometric, app-icon aesthetic */}
        {/* Body capsule */}
        <rect
          x={425}
          y={185}
          width={80}
          height={75}
          rx={28}
          fill="url(#person-body)"
          stroke="rgba(255,255,255,0.85)"
          strokeWidth={1.2}
        />
        {/* Head — rounded square (chip-like) */}
        <rect
          x={438}
          y={130}
          width={54}
          height={54}
          rx={18}
          fill="url(#person-head)"
          stroke="rgba(255,255,255,0.92)"
          strokeWidth={1.2}
        />
        {/* Highlight on head — subtle gloss */}
        <ellipse cx={452} cy={142} rx={10} ry={6} fill="rgba(255,255,255,0.45)" />

        {/* Arms — soft rounded capsules reaching to the laptop */}
        <rect
          x={406}
          y={222}
          width={24}
          height={56}
          rx={12}
          transform="rotate(18 418 250)"
          fill="rgba(255,255,255,0.55)"
          stroke="rgba(255,255,255,0.85)"
          strokeWidth={0.8}
        />
        <rect
          x={500}
          y={222}
          width={24}
          height={56}
          rx={12}
          transform="rotate(-18 512 250)"
          fill="rgba(255,255,255,0.55)"
          stroke="rgba(255,255,255,0.85)"
          strokeWidth={0.8}
        />

        {/* App windows around the person */}
        {APP_WINDOWS.map((w, i) => (
          <g key={i} className={`person-at-desk-win-${i}`} style={{ transformOrigin: `${w.x + w.w / 2}px ${w.y + w.h / 2}px` }}>
            <rect
              x={w.x}
              y={w.y}
              width={w.w}
              height={w.h}
              rx={8}
              fill="rgba(255,255,255,0.85)"
              stroke="rgba(255,255,255,0.95)"
              strokeWidth={1.2}
            />
            {/* Window title bar */}
            <rect x={w.x} y={w.y} width={w.w} height={14} rx={8} fill="rgba(91,160,212,0.35)" />
            <circle cx={w.x + 8} cy={w.y + 7} r={2.5} fill="rgba(217,70,70,0.7)" />
            <circle cx={w.x + 16} cy={w.y + 7} r={2.5} fill="rgba(255,196,77,0.7)" />
            <circle cx={w.x + 24} cy={w.y + 7} r={2.5} fill="rgba(91,200,123,0.7)" />
            {/* Window content lines */}
            <rect x={w.x + 10} y={w.y + 24} width={w.w - 20} height={3} rx={1.5} fill="rgba(31,79,143,0.55)" />
            <rect x={w.x + 10} y={w.y + 32} width={w.w - 40} height={3} rx={1.5} fill="rgba(31,79,143,0.35)" />
            <rect x={w.x + 10} y={w.y + 40} width={w.w - 30} height={3} rx={1.5} fill="rgba(31,79,143,0.35)" />
            <rect x={w.x + 10} y={w.y + 48} width={w.w - 50} height={3} rx={1.5} fill="rgba(31,79,143,0.30)" />
            <text
              x={w.x + w.w / 2}
              y={w.y + w.h - 6}
              textAnchor="middle"
              fontSize={9}
              fontWeight={700}
              fill="#0F2A4A"
              fontFamily="'Inter', sans-serif"
            >
              {w.label.toUpperCase()}
            </text>
          </g>
        ))}
      </svg>
      {/* Cursor — HTML element animated via CSS, sits on top */}
      <div
        className="person-at-desk-cursor"
        style={{
          position: 'absolute',
          width: 18,
          height: 18,
          marginLeft: -2,
          marginTop: -2,
          pointerEvents: 'none',
          filter: 'drop-shadow(0 2px 4px rgba(15,42,74,0.45))',
        }}
      >
        <svg viewBox="0 0 18 18" width={18} height={18}>
          <path d="M 1,1 L 1,15 L 5,11 L 9,17 L 11,16 L 7,10 L 14,10 Z" fill="#FFFFFF" stroke="#0F2A4A" strokeWidth={1.2} />
        </svg>
      </div>
    </div>
  );
}
