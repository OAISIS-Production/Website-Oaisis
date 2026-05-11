import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sunrise,
  MessageCircle,
  Search,
  Mail,
  Bell,
  Settings,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  MapPin,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';

type Accent = 'green' | 'blue' | 'gold';
const ACCENT: Record<Accent, string> = {
  green: '#1A6B4A',
  blue: '#2563A8',
  gold: '#A08050',
};

interface Capability {
  id: string;
  label: string;
  accent: Accent;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  Scene: React.ComponentType<{ active: boolean }>;
}

// ---------- Scene components ----------

function MorningBriefScene({ active }: { active: boolean }) {
  return (
    <div className="w-full">
      <div
        style={{
          background: 'rgba(255,255,255,0.85)',
          border: '1px solid rgba(220,201,160,0.55)',
          borderRadius: 16,
          padding: 24,
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
        }}
      >
        <div className="flex items-center justify-between mb-5">
          <div>
            <p
              style={{
                fontSize: 9,
                fontWeight: 600,
                letterSpacing: '2.5px',
                textTransform: 'uppercase',
                color: '#A08050',
                marginBottom: 3,
              }}
            >
              8:42 AM · Today
            </p>
            <p style={{ fontSize: 15, fontWeight: 500, color: '#2A1F38' }}>Morning brief</p>
          </div>
          <Sunrise className="w-5 h-5" style={{ color: '#A08050' }} />
        </div>

        {[
          { label: 'Revenue', value: '+12.4% week over week', tone: 'good', icon: TrendingUp },
          { label: 'Pipeline', value: '7 new leads · 2 hot', tone: 'good', icon: MapPin },
          { label: 'Anomalies', value: '1 — Region 3 margin', tone: 'warn', icon: AlertTriangle },
          { label: "Today's focus", value: 'Close the Acme renewal', tone: 'neutral', icon: ArrowRight },
        ].map((row, i) => (
          <motion.div
            key={row.label}
            initial={{ opacity: 0, x: -8 }}
            animate={active ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
            transition={{ duration: 0.45, delay: 0.2 + i * 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center justify-between py-3"
            style={{ borderTop: i > 0 ? '1px solid rgba(220,201,160,0.4)' : 'none' }}
          >
            <div className="flex items-center gap-3">
              <row.icon
                className="w-3.5 h-3.5"
                style={{
                  color:
                    row.tone === 'good' ? '#1A6B4A' : row.tone === 'warn' ? '#C8AD7E' : '#2563A8',
                }}
              />
              <span style={{ fontSize: 11, color: '#4D4060', letterSpacing: '0.3px' }}>
                {row.label}
              </span>
            </div>
            <span style={{ fontSize: 12, fontWeight: 500, color: '#2A1F38' }}>{row.value}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function AskAnythingScene({ active }: { active: boolean }) {
  const [typed, setTyped] = useState('');
  const fullAnswer =
    'West region revenue fell 4.2% vs Q3 last year. Three drivers: route 12 trucks down 18 days, two enterprise renewals slipped to Oct, fuel cost up 7%. Recommend renewal blitz this week.';

  useEffect(() => {
    if (!active) {
      setTyped('');
      return;
    }
    let i = 0;
    const id = setInterval(() => {
      i += 2;
      setTyped(fullAnswer.slice(0, i));
      if (i >= fullAnswer.length) clearInterval(id);
    }, 22);
    return () => clearInterval(id);
  }, [active]);

  return (
    <div className="w-full space-y-3">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
        transition={{ duration: 0.4 }}
        style={{
          padding: 14,
          borderRadius: 14,
          background: 'rgba(208,231,245,0.55)',
          border: '1px solid rgba(91,160,212,0.3)',
          maxWidth: '88%',
        }}
      >
        <p style={{ fontSize: 13, color: '#2A1F38', lineHeight: 1.5 }}>
          How did the West region perform last quarter compared to the same period last year, and what's driving the variance?
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        style={{
          padding: 14,
          borderRadius: 14,
          background: 'rgba(255,255,255,0.85)',
          border: '1px solid rgba(26,107,74,0.18)',
          marginLeft: '12%',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
        }}
      >
        <p style={{ fontSize: 13, color: '#2A1F38', lineHeight: 1.55, minHeight: 90 }}>
          {typed}
          {active && typed.length < fullAnswer.length && (
            <span style={{ color: '#1A6B4A', fontWeight: 500 }}>▍</span>
          )}
        </p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={active && typed.length === fullAnswer.length ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-3 flex items-end gap-2 h-12"
        >
          {[24, 32, 28, 22, 18, 14].map((h, i) => (
            <motion.div
              key={i}
              initial={{ height: 4 }}
              animate={{ height: active && typed.length === fullAnswer.length ? h : 4 }}
              transition={{ duration: 0.6, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              style={{
                width: 14,
                background: i === 0 ? '#1A6B4A' : 'rgba(26,107,74,0.35)',
                borderRadius: 3,
              }}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}

function LeadSourcingScene({ active }: { active: boolean }) {
  const leads = [
    { name: 'Acme Operations', who: 'VP Ops · 220 trucks', status: 'matched ICP' },
    { name: 'Northbridge HVAC', who: 'Owner · 6 markets', status: 'researching' },
    { name: 'Crescent Fleet Co.', who: 'COO · PE-backed', status: 'matched ICP' },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 w-full">
      <div className="relative" style={{ aspectRatio: '1 / 1', minHeight: 200 }}>
        <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
          <defs>
            <radialGradient id="globe" cx="0.4" cy="0.35">
              <stop offset="0%" stopColor="#D0E7F5" stopOpacity="1" />
              <stop offset="100%" stopColor="#5BA0D4" stopOpacity="0.4" />
            </radialGradient>
          </defs>
          <circle cx={50} cy={50} r={42} fill="url(#globe)" stroke="rgba(37,99,168,0.3)" strokeWidth={0.4} />
          {[[20, 35], [60, 25], [40, 50], [70, 55], [30, 60], [55, 70]].map(([x, y], i) => (
            <g key={i} opacity={0.45}>
              <ellipse cx={x} cy={y} rx={10} ry={3} fill="#1A6B4A" />
            </g>
          ))}
          {[
            { x: 28, y: 38, delay: 0 },
            { x: 65, y: 32, delay: 0.6 },
            { x: 45, y: 58, delay: 1.2 },
            { x: 72, y: 50, delay: 1.8 },
          ].map((p, i) => (
            <motion.g
              key={i}
              initial={{ opacity: 0, y: -10 }}
              animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
              transition={{ duration: 0.5, delay: p.delay, ease: [0.16, 1, 0.3, 1] }}
            >
              <circle cx={p.x} cy={p.y} r={2.2} fill="#1A6B4A" />
              <circle cx={p.x} cy={p.y} r={4} fill="none" stroke="#1A6B4A" strokeWidth={0.3} opacity={0.4} />
            </motion.g>
          ))}
        </svg>
      </div>

      <div className="flex flex-col gap-2">
        {leads.map((lead, i) => (
          <motion.div
            key={lead.name}
            initial={{ opacity: 0, x: 8 }}
            animate={active ? { opacity: 1, x: 0 } : { opacity: 0, x: 8 }}
            transition={{ duration: 0.4, delay: 0.4 + i * 0.25, ease: [0.16, 1, 0.3, 1] }}
            style={{
              padding: 10,
              background: 'rgba(255,255,255,0.78)',
              border: '1px solid rgba(91,160,212,0.22)',
              borderRadius: 10,
            }}
          >
            <p style={{ fontSize: 12, fontWeight: 500, color: '#2A1F38' }}>{lead.name}</p>
            <p style={{ fontSize: 11, color: '#4D4060', marginTop: 2 }}>{lead.who}</p>
            <p
              style={{
                fontSize: 9,
                fontWeight: 600,
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                color: lead.status === 'researching' ? '#A08050' : '#1A6B4A',
                marginTop: 6,
              }}
            >
              {lead.status}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function OutreachScene({ active }: { active: boolean }) {
  const [typed, setTyped] = useState('');
  const draft =
    "Hi Sarah,\n\nSaw Acme just expanded into Phoenix — that's three new markets this year. Curious how you're handling dispatch across the new region.";

  useEffect(() => {
    if (!active) {
      setTyped('');
      return;
    }
    let i = 0;
    const id = setInterval(() => {
      i += 2;
      setTyped(draft.slice(0, i));
      if (i >= draft.length) clearInterval(id);
    }, 30);
    return () => clearInterval(id);
  }, [active]);

  return (
    <div className="grid grid-cols-2 gap-3 w-full">
      <div
        style={{
          padding: 14,
          background: 'rgba(212,240,220,0.5)',
          border: '1px solid rgba(26,107,74,0.18)',
          borderRadius: 12,
        }}
      >
        <p
          style={{
            fontSize: 9,
            fontWeight: 600,
            letterSpacing: '2.5px',
            textTransform: 'uppercase',
            color: '#1A6B4A',
            marginBottom: 8,
          }}
        >
          Researching
        </p>
        {[
          'Sarah Chen · VP Operations',
          'Acme — 12 markets, 220 trucks',
          'Just announced Phoenix expansion',
          'Posted about dispatch chaos · 4d ago',
        ].map((line, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0 }}
            animate={active ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.4, delay: 0.2 + i * 0.2 }}
            style={{ fontSize: 11, color: '#2A1F38', marginBottom: 6, lineHeight: 1.4 }}
          >
            <span style={{ color: '#1A6B4A', marginRight: 6 }}>·</span>
            {line}
          </motion.p>
        ))}
      </div>

      <div
        style={{
          padding: 14,
          background: 'rgba(255,255,255,0.85)',
          border: '1px solid rgba(91,160,212,0.22)',
          borderRadius: 12,
          backdropFilter: 'blur(14px)',
        }}
      >
        <p
          style={{
            fontSize: 9,
            fontWeight: 600,
            letterSpacing: '2.5px',
            textTransform: 'uppercase',
            color: '#2563A8',
            marginBottom: 8,
          }}
        >
          Drafting
        </p>
        <p
          style={{
            fontSize: 11.5,
            color: '#2A1F38',
            lineHeight: 1.55,
            whiteSpace: 'pre-wrap',
            minHeight: 110,
          }}
        >
          {typed}
          {active && typed.length < draft.length && (
            <span style={{ color: '#2563A8', fontWeight: 500 }}>▍</span>
          )}
        </p>
      </div>
    </div>
  );
}

function MonitoringScene({ active }: { active: boolean }) {
  const tiles = [
    { label: 'ARR', value: '$2.4M', delta: '+8%', good: true },
    { label: 'Churn risk', value: '2 accts', delta: 'alert', alert: true },
    { label: 'CSAT', value: '4.7', delta: '+0.1', good: true },
    { label: 'Margin', value: '34%', delta: '-1.2%', good: false },
  ];
  return (
    <div className="grid grid-cols-2 gap-3 w-full">
      {tiles.map((t, i) => (
        <motion.div
          key={t.label}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={active ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.45, delay: 0.1 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
          className={t.alert ? 'monitor-alert' : ''}
          style={{
            padding: 16,
            background: t.alert ? 'rgba(160,128,80,0.10)' : 'rgba(255,255,255,0.78)',
            border: t.alert
              ? '1px solid rgba(160,128,80,0.45)'
              : '1px solid rgba(220,201,160,0.4)',
            borderRadius: 12,
            position: 'relative',
          }}
        >
          <p
            style={{
              fontSize: 9,
              fontWeight: 600,
              letterSpacing: '2.5px',
              textTransform: 'uppercase',
              color: '#4D4060',
              marginBottom: 6,
            }}
          >
            {t.label}
          </p>
          <p style={{ fontSize: 22, fontWeight: 200, letterSpacing: '-0.5px', color: '#2A1F38' }}>
            {t.value}
          </p>
          <div className="flex items-center gap-1 mt-2">
            {t.alert ? (
              <AlertTriangle className="w-3 h-3" style={{ color: '#A08050' }} />
            ) : t.good ? (
              <TrendingUp className="w-3 h-3" style={{ color: '#1A6B4A' }} />
            ) : (
              <TrendingDown className="w-3 h-3" style={{ color: '#A08050' }} />
            )}
            <span
              style={{
                fontSize: 10,
                fontWeight: 500,
                color: t.alert ? '#A08050' : t.good ? '#1A6B4A' : '#A08050',
                letterSpacing: '0.3px',
              }}
            >
              {t.delta}
            </span>
          </div>
        </motion.div>
      ))}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
        transition={{ duration: 0.4, delay: 0.7 }}
        className="col-span-2 flex items-center gap-3"
        style={{
          padding: 12,
          background: 'rgba(160,128,80,0.10)',
          border: '1px solid rgba(160,128,80,0.45)',
          borderRadius: 10,
        }}
      >
        <Bell className="w-4 h-4" style={{ color: '#A08050' }} />
        <p style={{ fontSize: 12, color: '#2A1F38', lineHeight: 1.5 }}>
          <strong style={{ fontWeight: 500 }}>Customer churn signal detected</strong> — Globalfreight usage down 38% in 7 days. Suggested action: outreach today.
        </p>
      </motion.div>
    </div>
  );
}

function WorkflowsScene({ active }: { active: boolean }) {
  const nodes = [
    { label: 'New lead' },
    { label: 'Research' },
    { label: 'Draft outreach' },
    { label: 'Approve' },
    { label: 'Send' },
    { label: 'Wait 3 days' },
    { label: 'Follow up' },
  ];
  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-2 items-center justify-center">
        {nodes.map((n, i) => (
          <div key={n.label} className="flex items-center gap-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={active ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, delay: 0.15 + i * 0.18, ease: [0.16, 1, 0.3, 1] }}
              style={{
                padding: '10px 14px',
                background: 'rgba(255,255,255,0.85)',
                border: '1px solid rgba(91,160,212,0.3)',
                borderRadius: 999,
                fontSize: 11.5,
                fontWeight: 500,
                color: '#2A1F38',
                letterSpacing: '0.2px',
              }}
            >
              {n.label}
            </motion.div>
            {i < nodes.length - 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={active ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.3, delay: 0.18 + i * 0.18 }}
                style={{ color: 'rgba(74,64,96,0.4)' }}
              >
                <ArrowRight className="w-3.5 h-3.5" />
              </motion.div>
            )}
          </div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
        transition={{ duration: 0.5, delay: 1.4 }}
        className="flex items-center gap-2 mt-5 mx-auto"
        style={{ width: 'fit-content' }}
      >
        <CheckCircle2 className="w-4 h-4" style={{ color: '#1A6B4A' }} />
        <p style={{ fontSize: 12, color: '#1A6B4A', fontWeight: 500 }}>
          Workflow live · 42 leads routed this week
        </p>
      </motion.div>
    </div>
  );
}

// ---------- Capability data ----------

const CAPABILITIES: Capability[] = [
  {
    id: 'briefs',
    label: 'Morning Briefs',
    accent: 'gold',
    icon: Sunrise,
    title: 'Morning briefs that read your whole business.',
    description:
      'Wake up to a single brief that pulls from every system you run. Revenue, pipeline, operations, anomalies, what needs your attention. Not a dashboard. A read.',
    Scene: MorningBriefScene,
  },
  {
    id: 'ask',
    label: 'Ask Anything',
    accent: 'green',
    icon: MessageCircle,
    title: 'Ask anything. Get a real answer.',
    description:
      "Pro OS reads your data, thinks, and answers. Like having a CFO, a COO, and an analyst on call.",
    Scene: AskAnythingScene,
  },
  {
    id: 'sourcing',
    label: 'Lead Sourcing',
    accent: 'blue',
    icon: Search,
    title: 'Lead sourcing that never stops.',
    description:
      'Pro OS scours the web continuously, identifying companies and decision-makers that match your ideal customer profile. It builds your pipeline while you sleep.',
    Scene: LeadSourcingScene,
  },
  {
    id: 'outreach',
    label: 'Outreach',
    accent: 'green',
    icon: Mail,
    title: 'Outreach written for the person, not the segment.',
    description:
      'For every lead, Pro OS researches their digital footprint — company, role, recent news, posts, signals — and drafts a personalized message in your voice. You approve and send.',
    Scene: OutreachScene,
  },
  {
    id: 'monitoring',
    label: 'Monitoring',
    accent: 'gold',
    icon: Bell,
    title: 'Continuous monitoring, smart alerts.',
    description:
      "Pro OS watches your business in real time and only interrupts when it matters. A churn signal. A margin compression. A deal gone cold.",
    Scene: MonitoringScene,
  },
  {
    id: 'workflows',
    label: 'Workflows',
    accent: 'blue',
    icon: Settings,
    title: 'Custom workflows, no engineers required.',
    description:
      'Tell Pro OS what you want it to do. It builds the workflow. Onboarding sequences, follow-up cadences, reporting cycles, escalation paths — all in conversation, not code.',
    Scene: WorkflowsScene,
  },
];

const AUTO_ROTATE_MS = 6000;

export default function CapabilitiesSection() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % CAPABILITIES.length);
    }, AUTO_ROTATE_MS);
    return () => clearInterval(id);
  }, [paused]);

  const cap = CAPABILITIES[active];
  const SceneComp = cap.Scene;
  const Icon = cap.icon;
  const color = ACCENT[cap.accent];

  return (
    <section
      ref={sectionRef}
      id="capabilities"
      className="relative w-full overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #DCC9A0 0%, #D4F0DC 50%, #7DD49A 100%)',
        padding: 'clamp(80px, 12vh, 160px) 24px',
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12"
        >
          <p
            style={{
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: '3px',
              textTransform: 'uppercase',
              color: '#0F4D35',
              marginBottom: 14,
            }}
          >
            What it does
          </p>
          <h2
            className="display-heading mx-auto"
            style={{ fontSize: 'clamp(28px, 4vw, 42px)', color: '#0F4D35', maxWidth: 720 }}
          >
            Six capabilities. One system.
          </h2>
        </motion.div>

        <div
          role="tablist"
          aria-label="Pro OS capabilities"
          className="flex flex-wrap items-center justify-center gap-1 p-1 mx-auto relative"
          style={{
            background: 'rgba(255,255,255,0.42)',
            border: '1px solid rgba(255,255,255,0.65)',
            borderRadius: 999,
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            width: 'fit-content',
            maxWidth: '100%',
            boxShadow: '0 6px 24px rgba(15,77,53,0.08)',
          }}
        >
          {CAPABILITIES.map((c, i) => {
            const isActive = i === active;
            return (
              <button
                key={c.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => {
                  setActive(i);
                  setPaused(true);
                }}
                className="relative"
                style={{
                  padding: '8px 16px',
                  borderRadius: 999,
                  border: 'none',
                  background: 'transparent',
                  color: isActive ? '#2A1F38' : 'rgba(74,64,96,0.7)',
                  fontSize: 12,
                  fontWeight: 500,
                  letterSpacing: '0.2px',
                  cursor: 'pointer',
                  zIndex: 1,
                  whiteSpace: 'nowrap',
                  transition: 'color 0.3s ease',
                }}
              >
                {isActive && (
                  <motion.span
                    layoutId="tab-pill"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: '#FFFFFF',
                      borderRadius: 999,
                      boxShadow: '0 4px 14px rgba(15,77,53,0.12)',
                      zIndex: -1,
                    }}
                    transition={{ type: 'spring', stiffness: 320, damping: 30 }}
                  />
                )}
                {c.label}
              </button>
            );
          })}
        </div>

        <div className="mt-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={cap.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="grid md:grid-cols-[40%_60%] gap-8 items-center mx-auto"
              style={{
                background: 'rgba(255,255,255,0.55)',
                border: '1px solid rgba(255,255,255,0.7)',
                borderRadius: 24,
                padding: 'clamp(24px, 3vw, 40px)',
                backdropFilter: 'blur(28px)',
                WebkitBackdropFilter: 'blur(28px)',
                boxShadow: '0 18px 60px rgba(15,77,53,0.10)',
                maxWidth: 1080,
              }}
            >
              <div>
                <div
                  className="inline-flex items-center justify-center mb-5"
                  style={{
                    width: 48,
                    height: 48,
                    background: `${color}1A`,
                    borderRadius: 14,
                    color,
                  }}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <h3
                  style={{
                    fontSize: 'clamp(22px, 2.6vw, 30px)',
                    fontWeight: 300,
                    letterSpacing: '-0.3px',
                    color: '#0F4D35',
                    marginBottom: 14,
                    lineHeight: 1.25,
                  }}
                >
                  {cap.title}
                </h3>
                <p
                  style={{
                    fontSize: 14,
                    lineHeight: 1.7,
                    fontWeight: 300,
                    color: '#4D4060',
                    maxWidth: 460,
                  }}
                >
                  {cap.description}
                </p>
              </div>
              <div className="flex items-center justify-center">
                <SceneComp active={true} />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
