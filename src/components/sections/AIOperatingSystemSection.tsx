import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Settings2, DollarSign, MessageSquare, BarChart3, Plug } from 'lucide-react';
import GlowLogo from '../ui/GlowLogo';
import Clouds from '../ui/Clouds';
import AutopilotHeadline from '../demos/AutopilotHeadline';

// Six icons evenly spaced at 60° around a 500px-diameter dashed circle
// centered in a 600px container. Angles in degrees, clockwise from 12 o'clock.
interface DiagramApp {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  angleDeg: number;
  tip: string;
}
const APPS: DiagramApp[] = [
  { id: 'sales', label: 'Sales', icon: TrendingUp, angleDeg: -90, tip: 'Drafting outreach to Sarah at Acme.' },
  { id: 'operations', label: 'Operations', icon: Settings2, angleDeg: -30, tip: 'Invoice 2841 matched + approved.' },
  { id: 'finance', label: 'Finance', icon: DollarSign, angleDeg: 30, tip: 'Vendor X $4.2K/mo savings flagged.' },
  { id: 'support', label: 'Support', icon: MessageSquare, angleDeg: 90, tip: 'Replied to Jamie about delivery date.' },
  { id: 'integrations', label: 'Integrations', icon: Plug, angleDeg: 150, tip: 'New CRM connection live.' },
  { id: 'analytics', label: 'Analytics', icon: BarChart3, angleDeg: 210, tip: "Revenue up 18% week over week." },
];

// 600×600 SVG. Center at (300,300). Icons at radius 250 — one source of
// truth used by icons, connector lines, labels, AND tooltip placement so
// they all align exactly.
const DIAGRAM_SIZE = 600;
const DIAGRAM_CENTER = DIAGRAM_SIZE / 2;
const DIAGRAM_RADIUS = 250;
const ICON_SIZE = 64;          // px — icon tile w/h
const ICON_HALF = ICON_SIZE / 2; // px — icon's radius used to truncate lines
const CENTER_LOGO_RADIUS = 50; // GlowLogo size 100 → radius 50
const LINE_GAP = 6;            // px — line stops short of icon/logo edge by this much
const LABEL_OFFSET = 12;       // px below icon bottom edge
const TOOLTIP_GAP = 14;        // px between icon edge and tooltip card
function polarPos(angleDeg: number, r: number) {
  const a = (angleDeg * Math.PI) / 180;
  return { x: DIAGRAM_CENTER + r * Math.cos(a), y: DIAGRAM_CENTER + r * Math.sin(a) };
}
// Cosine of an icon's angle — positive ⇒ icon on the right half of the
// diagram, negative ⇒ left half. Top/bottom icons have cos≈0; epsilon below
// routes them to the right side so they never clip the diagram's left edge.
function cosOf(angleDeg: number) {
  return Math.cos((angleDeg * Math.PI) / 180);
}

// v13.5 — single state, no body paragraph. The diagram does the talking.
const STATES = [
  {
    eyebrow: 'THE NEW LAYER',
    heading: 'Your company. On autopilot.',
  },
];

// Geometric radial diagram — Oaisis logo at center, 6 icons at exact 60°
// intervals on a dashed 500px circle, static connector lines from each icon
// to center, single tooltip cycling every 2.5s with its own connector to the
// active icon.
function RadialDiagram({ active }: { active: number }) {
  return (
    <div
      className="relative"
      style={{
        width: 'min(600px, 92vw)',
        aspectRatio: '1 / 1',
      }}
    >
      <svg
        viewBox={`0 0 ${DIAGRAM_SIZE} ${DIAGRAM_SIZE}`}
        className="absolute inset-0 w-full h-full"
        aria-hidden="true"
      >
        {/* Dashed boundary circle */}
        <circle
          cx={DIAGRAM_CENTER}
          cy={DIAGRAM_CENTER}
          r={DIAGRAM_RADIUS}
          fill="none"
          stroke="rgba(255,255,255,0.35)"
          strokeWidth={1.5}
          strokeDasharray="4 6"
        />
        {/* Connector lines — TERMINATE just outside each endpoint:
            • icon-side end: r = DIAGRAM_RADIUS − ICON_HALF − LINE_GAP
              (just before icon's edge, NOT passing through the icon)
            • center-side end: r = CENTER_LOGO_RADIUS + LINE_GAP
              (just outside the center glass logo)                              */}
        {APPS.map((app, i) => {
          const start = polarPos(app.angleDeg, DIAGRAM_RADIUS - ICON_HALF - LINE_GAP);
          const end = polarPos(app.angleDeg, CENTER_LOGO_RADIUS + LINE_GAP);
          const isActive = i === active;
          return (
            <line
              key={app.id}
              x1={start.x}
              y1={start.y}
              x2={end.x}
              y2={end.y}
              stroke={isActive ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.25)'}
              strokeWidth={isActive ? 2 : 1}
              style={{ transition: 'stroke 350ms ease, stroke-width 350ms ease' }}
            />
          );
        })}
      </svg>

      {/* Icons + tooltips — each icon's CENTER sits exactly on the polar
          coordinate. The tooltip is a SIBLING of the icon inside this same
          wrapper so they move together; it sits on the side of the icon
          AWAY from the diagram edge, chosen via the icon's cos(angle):
          icons on the right half → tooltip on the LEFT of the icon;
          icons on the left half → tooltip on the RIGHT. Top/bottom icons
          (cos≈0) default to the right.                                    */}
      {APPS.map((app, i) => {
        const p = polarPos(app.angleDeg, DIAGRAM_RADIUS);
        const Icon = app.icon;
        const isActive = i === active;
        const leftPct = (p.x / DIAGRAM_SIZE) * 100;
        const topPct = (p.y / DIAGRAM_SIZE) * 100;
        // tooltipOnLeft = true ⇒ tooltip extends to the LEFT of the icon
        const tooltipOnLeft = cosOf(app.angleDeg) > 0.05;
        return (
          <div
            key={app.id}
            className="absolute"
            style={{
              left: `${leftPct}%`,
              top: `${topPct}%`,
              transform: `translate(-50%, -50%)`,
              width: ICON_SIZE,
              height: ICON_SIZE,
              pointerEvents: 'none',
            }}
          >
            {/* Icon tile fills the positioned container exactly → its center
                is at the polar coord. Halo + glow stack underneath. */}
            <div
              className="relative radial-icon-tile"
              style={{
                width: '100%',
                height: '100%',
                borderRadius: 16,
                background: isActive ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.12)',
                border: '1px solid rgba(255,255,255,0.55)',
                boxShadow:
                  isActive
                    ? '0 0 32px rgba(255,255,255,0.45), inset 0 0 22px rgba(255,255,255,0.28), 0 8px 24px rgba(15,42,74,0.30)'
                    : '0 0 22px rgba(255,255,255,0.28), inset 0 0 18px rgba(255,255,255,0.18), 0 6px 18px rgba(15,42,74,0.22)',
                backdropFilter: 'blur(18px)',
                WebkitBackdropFilter: 'blur(18px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
                transition:
                  'transform 200ms ease, background 300ms ease, box-shadow 300ms ease',
                transform: isActive ? 'scale(1.05)' : 'scale(1)',
              }}
            >
              {/* Outer halo — soft white radial behind icon */}
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                style={{
                  borderRadius: 16,
                  background:
                    'radial-gradient(circle at center, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0) 70%)',
                  filter: 'blur(20px)',
                  opacity: 0.4,
                  transform: 'scale(1.4)',
                  zIndex: -1,
                }}
              />
              <Icon
                className="w-7 h-7"
                style={{
                  strokeWidth: 2,
                  filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.6))',
                }}
              />
            </div>
            {/* Label sits LABEL_OFFSET px below the icon's bottom edge,
                centered on the icon's x. Absolute positioning anchors it
                to this container's bottom; whiteSpace nowrap so multi-word
                labels (INTEGRATIONS) stay on one line. */}
            <p
              className="absolute text-center"
              style={{
                left: '50%',
                top: '100%',
                transform: 'translateX(-50%)',
                marginTop: LABEL_OFFSET,
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: isActive ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.78)',
                transition: 'color 300ms ease',
                whiteSpace: 'nowrap',
              }}
            >
              {app.label}
            </p>
            {/* Tooltip — sibling of icon, adjacent to it. Visible only when
                this icon is active; uses tooltipOnLeft to anchor to the icon
                edge nearest the diagram center, so it never extends off the
                diagram or overlaps the center logo. */}
            <motion.div
              className="absolute pointer-events-none"
              style={{
                top: '50%',
                ...(tooltipOnLeft
                  ? { right: `calc(100% + ${TOOLTIP_GAP}px)` }
                  : { left: `calc(100% + ${TOOLTIP_GAP}px)` }),
                transform: 'translateY(-50%)',
                zIndex: 4,
                whiteSpace: 'nowrap',
              }}
              animate={{
                opacity: isActive ? 1 : 0,
                scale: isActive ? 1 : 0.94,
              }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            >
              <div
                style={{
                  padding: '10px 16px',
                  borderRadius: 12,
                  background: 'rgba(255,255,255,0.96)',
                  border: '1px solid rgba(255,255,255,0.9)',
                  boxShadow: '0 6px 22px rgba(15,42,74,0.22)',
                  fontSize: 14,
                  fontWeight: 500,
                  color: '#0F2A4A',
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                {app.tip}
              </div>
            </motion.div>
          </div>
        );
      })}

      {/* Center logo */}
      <div
        className="absolute"
        style={{
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
        }}
      >
        <GlowLogo size={100} glow="white" />
      </div>

    </div>
  );
}

// Mobile equivalent of the RadialDiagram — same 6 categories, same content
// (icon + label + tip), but stacked vertically. The active row is highlighted
// to match the cycling animation that drives the desktop tooltip swap. All
// rows render simultaneously since there's no spatial-overflow risk on a
// single-column layout.
function MobileCapabilityList({ active }: { active: number }) {
  return (
    <div className="flex flex-col gap-3 w-full" style={{ maxWidth: 480, margin: '0 auto' }}>
      {APPS.map((app, i) => {
        const Icon = app.icon;
        const isActive = i === active;
        return (
          <div
            key={app.id}
            className="flex items-start gap-4"
            style={{
              padding: '14px 16px',
              borderRadius: 14,
              background: isActive ? 'rgba(255,255,255,0.10)' : 'rgba(255,255,255,0.04)',
              border: `1px solid ${isActive ? 'rgba(255,255,255,0.22)' : 'rgba(255,255,255,0.10)'}`,
              transition: 'background 300ms ease, border-color 300ms ease',
            }}
          >
            <div
              className="flex-shrink-0 inline-flex items-center justify-center"
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                background: isActive ? 'rgba(255,255,255,0.20)' : 'rgba(255,255,255,0.10)',
                border: '1px solid rgba(255,255,255,0.25)',
                color: '#FFFFFF',
                transition: 'background 300ms ease',
              }}
            >
              <Icon className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: isActive ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.75)',
                  fontFamily: "'Inter', sans-serif",
                  marginBottom: 4,
                }}
              >
                {app.label}
              </p>
              <p
                style={{
                  fontSize: 14,
                  lineHeight: 1.4,
                  color: 'rgba(255,255,255,0.85)',
                  fontFamily: "'Inter', sans-serif",
                  margin: 0,
                }}
              >
                {app.tip}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function AIOperatingSystemSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIcon, setActiveIcon] = useState(0);

  // Continuous tooltip cycle. Mobile interval is 3500ms (vs 2000ms desktop)
  // to spread out the re-render cadence — the user wants the cycle visible
  // on mobile, just less frequent than desktop so it doesn't compound with
  // scroll work.
  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const interval = isMobile ? 3500 : 2000;
    const t = window.setInterval(() => {
      setActiveIcon((i) => (i + 1) % APPS.length);
    }, interval);
    return () => window.clearInterval(t);
  }, []);

  const current = STATES[0];

  return (
    <section
      ref={sectionRef}
      id="what-it-is"
      className="relative w-full"
      style={{
        background: 'transparent',
        minHeight: '90vh',
        padding: 'clamp(72px, 10vh, 120px) 0',
      }}
    >
      <div className="relative w-full overflow-hidden">
        <Clouds opacity={0.22} />

        <div className="relative w-full h-full grid grid-cols-1 md:grid-cols-[36%_64%] grid-rows-1 items-center px-6 md:px-12 max-w-7xl mx-auto gap-10">
          <div className="aiops-headline-col relative h-full flex items-center" style={{ minHeight: 'min(80vh, 720px)' }}>
            <div style={{ maxWidth: 460 }}>
              <p
                className="mb-5"
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  letterSpacing: '0.35em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.85)',
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                {current.eyebrow}
              </p>
              <AutopilotHeadline />
            </div>
          </div>

          {/* Desktop: radial diagram with absolute-positioned icons + tooltips.
              Mobile: vertical stacked list of [icon · label · tip] rows.
              The radial-positioned tooltips overflow viewport edges at 375px;
              the stacked list keeps the same 6 categories and same content,
              just arranged top-to-bottom for narrow screens. */}
          <div className="hidden md:flex relative h-full items-center justify-center" style={{ minHeight: 'min(80vh, 720px)' }}>
            <RadialDiagram active={activeIcon} />
          </div>
          <div className="md:hidden relative w-full">
            <MobileCapabilityList active={activeIcon} />
          </div>
        </div>
      </div>
    </section>
  );
}
