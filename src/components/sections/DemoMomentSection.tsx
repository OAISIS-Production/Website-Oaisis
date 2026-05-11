import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sunrise, MessageCircle, Search, Mail, AlertTriangle, TrendingUp } from 'lucide-react';
import { gsap, ScrollTrigger } from '../../lib/scroll';

const ACTS = [
  {
    headline: '6:47 AM. While you slept, Pro OS was working.',
    sub: 'Morning brief is queued. Pipeline is scored. Anomalies are flagged.',
  },
  {
    headline: 'Your morning brief is ready.',
    sub: 'Pulled from every system in your business. One read, not ten dashboards.',
  },
  {
    headline: 'Ask anything about your business.',
    sub: 'Pro OS reads, thinks, answers. With the data — and the reasoning behind it.',
  },
  {
    headline: "While you're in your first meeting, Pro OS is finding your next customer.",
    sub: 'Identifying. Researching. Drafting. You approve.',
  },
  {
    headline: 'This is what an AI Operating System looks like.',
    sub: 'Six things at once. All of them yours. None of them on you.',
  },
];

function BrowserChrome({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="relative w-full"
      style={{
        background: 'rgba(255,255,255,0.92)',
        borderRadius: 18,
        border: '1px solid rgba(255,255,255,0.55)',
        boxShadow: '0 30px 90px rgba(15,77,53,0.45), 0 0 0 1px rgba(15,77,53,0.06)',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          height: 36,
          background: 'linear-gradient(180deg, rgba(247,243,234,0.95) 0%, rgba(237,226,204,0.85) 100%)',
          borderBottom: '1px solid rgba(220,201,160,0.4)',
          display: 'flex',
          alignItems: 'center',
          paddingLeft: 14,
          gap: 7,
        }}
      >
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#F1B5A8', opacity: 0.7 }} />
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#F0D690', opacity: 0.7 }} />
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#A8D0AE', opacity: 0.7 }} />
        <span
          style={{
            marginLeft: 12,
            fontSize: 10,
            letterSpacing: '2.5px',
            textTransform: 'uppercase',
            color: '#A08050',
            fontWeight: 600,
          }}
        >
          Pro OS · openoaisis
        </span>
      </div>
      <div style={{ padding: 'clamp(16px, 2vw, 24px)' }}>{children}</div>
    </div>
  );
}

function ActOne() {
  return (
    <div style={{ minHeight: 280 }}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <p
            style={{
              fontSize: 9,
              fontWeight: 600,
              letterSpacing: '2.5px',
              textTransform: 'uppercase',
              color: '#A08050',
            }}
          >
            6:47 AM
          </p>
          <p style={{ fontSize: 14, color: '#2A1F38', marginTop: 2 }}>Good morning, Chris</p>
        </div>
        <div
          className="flex items-center gap-1.5"
          style={{
            padding: '4px 10px',
            background: 'rgba(26,107,74,0.12)',
            borderRadius: 999,
            border: '1px solid rgba(26,107,74,0.25)',
          }}
        >
          <span
            className="block"
            style={{
              width: 7,
              height: 7,
              borderRadius: '50%',
              background: '#1A6B4A',
              boxShadow: '0 0 8px rgba(26,107,74,0.5)',
            }}
          />
          <span
            style={{
              fontSize: 9,
              fontWeight: 600,
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              color: '#0F4D35',
            }}
          >
            Live
          </span>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {Array.from({ length: 9 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0.18 }}
            animate={{ opacity: [0.18, 0.4, 0.18] }}
            transition={{ duration: 2.2, repeat: Infinity, delay: (i % 3) * 0.25 }}
            style={{
              height: 56,
              background: 'rgba(220,201,160,0.22)',
              borderRadius: 10,
              border: '1px solid rgba(220,201,160,0.35)',
            }}
          />
        ))}
      </div>
    </div>
  );
}

function ActTwo() {
  const rows = [
    { label: 'Revenue', value: '+12.4% week over week', icon: TrendingUp, tone: '#1A6B4A' },
    { label: 'Pipeline', value: '7 new leads · 2 hot', icon: Sunrise, tone: '#A08050' },
    { label: 'Anomalies', value: '1 — Region 3 margin', icon: AlertTriangle, tone: '#A08050' },
    { label: "Today's focus", value: 'Close the Acme renewal', icon: MessageCircle, tone: '#2563A8' },
  ];
  return (
    <div style={{ minHeight: 280 }}>
      <div className="flex items-center gap-2 mb-4">
        <Sunrise className="w-4 h-4" style={{ color: '#A08050' }} />
        <p style={{ fontSize: 13, fontWeight: 500, color: '#2A1F38' }}>Morning brief</p>
      </div>
      {rows.map((r, i) => (
        <motion.div
          key={r.label}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-between py-3"
          style={{ borderTop: i > 0 ? '1px solid rgba(220,201,160,0.35)' : 'none' }}
        >
          <div className="flex items-center gap-3">
            <r.icon className="w-3.5 h-3.5" style={{ color: r.tone }} />
            <span style={{ fontSize: 11, color: '#4D4060', letterSpacing: '0.3px' }}>{r.label}</span>
          </div>
          <span style={{ fontSize: 12, fontWeight: 500, color: '#2A1F38' }}>{r.value}</span>
        </motion.div>
      ))}
    </div>
  );
}

function ActThree() {
  const [typed, setTyped] = useState('');
  const ANSWER =
    "West region dropped 4.2% vs last year. Three drivers: route-12 trucks down 18 days, two enterprise renewals slipped, fuel up 7%. Recommend renewal blitz this week.";
  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      i += 2;
      setTyped(ANSWER.slice(0, i));
      if (i >= ANSWER.length) clearInterval(id);
    }, 24);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="space-y-3" style={{ minHeight: 280 }}>
      <div
        style={{
          padding: 12,
          borderRadius: 12,
          background: 'rgba(208,231,245,0.55)',
          border: '1px solid rgba(91,160,212,0.32)',
          maxWidth: '85%',
        }}
      >
        <p style={{ fontSize: 12.5, color: '#2A1F38', lineHeight: 1.5 }}>
          How did the West region perform last quarter vs last year, and what's driving the variance?
        </p>
      </div>
      <div
        style={{
          padding: 12,
          borderRadius: 12,
          background: 'rgba(255,255,255,0.9)',
          border: '1px solid rgba(26,107,74,0.18)',
          marginLeft: '15%',
        }}
      >
        <p style={{ fontSize: 12.5, color: '#2A1F38', lineHeight: 1.6, minHeight: 80 }}>
          {typed}
          {typed.length < ANSWER.length && (
            <span style={{ color: '#1A6B4A', fontWeight: 500 }}>▍</span>
          )}
        </p>
      </div>
    </div>
  );
}

function ActFour() {
  return (
    <div className="grid grid-cols-2 gap-3" style={{ minHeight: 280 }}>
      <div
        style={{
          padding: 14,
          background: 'rgba(212,240,220,0.55)',
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
            marginBottom: 10,
          }}
        >
          Lead found
        </p>
        <p style={{ fontSize: 13, fontWeight: 500, color: '#2A1F38' }}>Sarah Chen</p>
        <p style={{ fontSize: 11, color: '#4D4060', marginTop: 2 }}>VP Operations · Acme</p>
        <div className="space-y-1.5 mt-3">
          {[
            'Acme — 12 markets, 220 trucks',
            'Phoenix expansion announced 3d ago',
            'Posted about dispatch chaos · 4d ago',
          ].map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.18 }}
              style={{ fontSize: 11, color: '#2A1F38', lineHeight: 1.5 }}
            >
              <span style={{ color: '#1A6B4A', marginRight: 6 }}>·</span>
              {line}
            </motion.p>
          ))}
        </div>
      </div>
      <div
        style={{
          padding: 14,
          background: 'rgba(255,255,255,0.9)',
          border: '1px solid rgba(91,160,212,0.28)',
          borderRadius: 12,
        }}
      >
        <p
          style={{
            fontSize: 9,
            fontWeight: 600,
            letterSpacing: '2.5px',
            textTransform: 'uppercase',
            color: '#2563A8',
            marginBottom: 10,
          }}
        >
          Drafting
        </p>
        <p style={{ fontSize: 11.5, color: '#2A1F38', lineHeight: 1.55, whiteSpace: 'pre-wrap' }}>
          Hi Sarah,{'\n\n'}Saw Acme just expanded into Phoenix — three new markets this year. Curious how you're handling dispatch across the new region.
        </p>
      </div>
    </div>
  );
}

function ActFive() {
  return (
    <div className="grid grid-cols-2 gap-2.5" style={{ minHeight: 280 }}>
      {[
        {
          title: 'Morning brief',
          rows: ['Revenue +12.4%', 'Pipeline · 7 new', 'Anomaly · Region 3'],
          accent: '#A08050',
          icon: Sunrise,
        },
        {
          title: 'Question',
          rows: ['West dropped 4.2%', 'Renewal blitz recommended'],
          accent: '#1A6B4A',
          icon: MessageCircle,
        },
        {
          title: 'Lead sourcing',
          rows: ['Sarah Chen · Acme', '+3 new matches'],
          accent: '#2563A8',
          icon: Search,
        },
        {
          title: 'Outreach drafted',
          rows: ['2 messages ready', 'Awaiting approval'],
          accent: '#1A6B4A',
          icon: Mail,
        },
      ].map((panel, i) => (
        <motion.div
          key={panel.title}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.45, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            padding: 12,
            background: 'rgba(255,255,255,0.85)',
            border: '1px solid rgba(220,201,160,0.4)',
            borderRadius: 10,
          }}
        >
          <div className="flex items-center gap-2 mb-2">
            <panel.icon className="w-3.5 h-3.5" style={{ color: panel.accent }} />
            <p
              style={{
                fontSize: 9,
                fontWeight: 600,
                letterSpacing: '2px',
                textTransform: 'uppercase',
                color: panel.accent,
              }}
            >
              {panel.title}
            </p>
          </div>
          {panel.rows.map((row, j) => (
            <p
              key={j}
              style={{
                fontSize: 10.5,
                color: '#2A1F38',
                lineHeight: 1.5,
                opacity: 1 - j * 0.1,
              }}
            >
              {row}
            </p>
          ))}
        </motion.div>
      ))}
    </div>
  );
}

const ACT_COMPONENTS = [ActOne, ActTwo, ActThree, ActFour, ActFive];

export default function DemoMomentSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const [act, setAct] = useState(0);

  useEffect(() => {
    if (!sectionRef.current || !pinRef.current) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (prefersReduced || isMobile) {
      // No pinning on mobile / reduced-motion: show the final composite (Act 5).
      setAct(4);
      return;
    }
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=400%',
        pin: pinRef.current,
        pinSpacing: true,
        scrub: 0.4,
        onUpdate: ({ progress }) => {
          const idx = Math.min(4, Math.floor(progress * 5));
          setAct(idx);
        },
      });
    }, sectionRef);
    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, []);

  const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches;
  const prefersReduced =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const tallSection = !isMobile && !prefersReduced;

  const ActComp = ACT_COMPONENTS[act];
  const meta = ACTS[act];

  return (
    <section
      ref={sectionRef}
      id="demo-moment"
      className="relative w-full"
      style={{
        background: 'linear-gradient(180deg, #2D8B55 0%, #1A6B4A 100%)',
        height: tallSection ? '500vh' : 'auto',
        paddingTop: tallSection ? 0 : 'clamp(80px, 12vh, 140px)',
        paddingBottom: tallSection ? 0 : 'clamp(80px, 12vh, 140px)',
      }}
    >
      <div
        ref={pinRef}
        className="relative w-full overflow-hidden"
        style={{ height: tallSection ? '100vh' : 'auto', minHeight: tallSection ? undefined : 520 }}
      >
        <div
          aria-hidden="true"
          className="absolute pointer-events-none"
          style={{
            top: '20%',
            left: '-10%',
            width: 380,
            height: 380,
            background: 'radial-gradient(circle, rgba(125,212,154,0.30) 0%, transparent 65%)',
            filter: 'blur(50px)',
          }}
        />
        <div
          aria-hidden="true"
          className="absolute pointer-events-none"
          style={{
            bottom: '15%',
            right: '-8%',
            width: 360,
            height: 360,
            background: 'radial-gradient(circle, rgba(64,168,101,0.30) 0%, transparent 65%)',
            filter: 'blur(50px)',
          }}
        />

        <div className="relative h-full grid md:grid-cols-[42%_58%] grid-rows-1 items-center px-6 md:px-12 max-w-7xl mx-auto gap-10">
          <div className="hidden md:flex absolute top-8 left-1/2 -translate-x-1/2 items-center gap-2 z-10 pointer-events-none">
            {ACTS.map((_, i) => (
              <span
                key={i}
                className="block rounded-full transition-all duration-300"
                style={{
                  width: i === act ? 26 : 14,
                  height: 3,
                  background: i === act ? '#FFFFFF' : 'rgba(255,255,255,0.32)',
                }}
              />
            ))}
          </div>

          <div className="relative h-full flex items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={act}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                style={{ maxWidth: 480 }}
              >
                <p
                  className="mb-5"
                  style={{
                    fontSize: 10,
                    fontWeight: 600,
                    letterSpacing: '3px',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.7)',
                  }}
                >
                  Act {act + 1} of 5
                </p>
                <h2
                  style={{
                    fontSize: 'clamp(24px, 3.2vw, 36px)',
                    fontWeight: 200,
                    letterSpacing: '-0.4px',
                    color: '#FFFFFF',
                    lineHeight: 1.2,
                    marginBottom: 16,
                  }}
                >
                  {meta.headline}
                </h2>
                <p
                  style={{
                    fontSize: 'clamp(14px, 1.5vw, 17px)',
                    lineHeight: 1.65,
                    fontWeight: 300,
                    color: 'rgba(255,255,255,0.78)',
                  }}
                >
                  {meta.sub}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="relative h-full flex items-center justify-center">
            <div
              className="w-full"
              style={{
                maxWidth: 580,
                transform: 'perspective(1400px) rotateY(-4deg) rotateX(2deg)',
              }}
            >
              <BrowserChrome>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={act}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <ActComp />
                  </motion.div>
                </AnimatePresence>
              </BrowserChrome>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
