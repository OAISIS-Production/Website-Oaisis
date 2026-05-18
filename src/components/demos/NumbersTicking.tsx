import { useEffect, useRef, useState } from 'react';
import { TrendingUp, Check, TrendingDown, Sparkles, ArrowRight } from 'lucide-react';

const INSIGHTS = [
  'Vendor X charges 12% above market — switch could save $4.2K/mo.',
  'Pipeline at risk: 4 deals over 60 days idle — drafts ready.',
  'Renewal window opens for 8 accounts next week. Outreach scheduled.',
];

// Numbers tick continuously; insights fade in sequentially. Reset every 12s.
// requestAnimationFrame for smooth counts, no CSS transitions on numbers.
export default function NumbersTicking() {
  // Baseline values visible from frame 1 — no zero-state for the mockup.
  const [revenue, setRevenue] = useState(18.4);
  const [retention, setRetention] = useState(96);
  const [cycle, setCycle] = useState(4.2);
  const [insightCount, setInsightCount] = useState(INSIGHTS.length);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    let start = performance.now();

    function tick(now: number) {
      if (cancelled) return;
      const elapsed = (now - start) / 1000;
      // Subtle oscillations around baseline — always populated, never zero.
      const rev = 18.4 + Math.sin(elapsed * 0.55) * 0.45;
      const ret = 96 + Math.sin(elapsed * 0.8) * 1;
      const cyc = 4.2 + Math.sin(elapsed * 0.45) * 0.15;
      setRevenue(rev);
      setRetention(ret);
      setCycle(cyc);
      setInsightCount(INSIGHTS.length);
      rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      cancelled = true;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      className="numbers-ticking-card relative w-full"
      style={{
        background: 'rgba(255,255,255,0.96)',
        borderRadius: 18,
        border: '1px solid rgba(255,255,255,0.55)',
        boxShadow: '0 30px 90px rgba(15,40,72,0.30), 0 0 0 1px rgba(31,79,143,0.05)',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          height: 36,
          background: 'linear-gradient(180deg, rgba(247,250,253,0.95) 0%, rgba(220,234,247,0.85) 100%)',
          borderBottom: '1px solid rgba(91,160,212,0.30)',
          display: 'flex',
          alignItems: 'center',
          paddingLeft: 14,
          gap: 7,
        }}
      >
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'rgba(15,42,74,0.35)' }} />
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'rgba(15,42,74,0.45)' }} />
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'rgba(15,42,74,0.55)' }} />
        <span
          style={{
            marginLeft: 12,
            fontSize: 10,
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: '#0F2A4A',
            fontWeight: 700,
            fontFamily: "'Inter', sans-serif",
          }}
        >
          Oaisis · Today's brief
        </span>
      </div>
      <div className="numbers-ticking-content" style={{ padding: 24, minHeight: 420 }}>
        <div className="mb-5 flex items-center gap-2">
          <Sparkles className="w-4 h-4" style={{ color: '#5BA0D4' }} />
          <p
            style={{
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#2563A8',
            }}
          >
            Decisions, ready
          </p>
        </div>
        <div className="grid grid-cols-3 gap-2.5 mb-5">
          <Metric label="Revenue" value={`+${revenue.toFixed(1)}%`} icon={TrendingUp} color="#5BA0D4" />
          <Metric label="Retention" value={`${retention.toFixed(0)}%`} icon={Check} color="#5BA0D4" />
          <Metric label="Cycle" value={`${cycle.toFixed(1)}d`} icon={TrendingDown} color="#2563A8" />
        </div>
        <div
          style={{
            padding: 14,
            borderRadius: 12,
            background: 'rgba(91,160,212,0.06)',
            border: '1px solid rgba(91,160,212,0.22)',
          }}
        >
          <p
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#2563A8',
              marginBottom: 10,
            }}
          >
            What to do today
          </p>
          {INSIGHTS.map((insight, i) => (
            <div
              key={i}
              className="flex items-start gap-2"
              style={{
                marginBottom: i < INSIGHTS.length - 1 ? 8 : 0,
                opacity: i < insightCount ? 1 : 0,
                transform: i < insightCount ? 'translateY(0)' : 'translateY(6px)',
                transition: 'opacity 320ms ease, transform 320ms cubic-bezier(0.16,1,0.3,1)',
              }}
            >
              <ArrowRight className="w-3 h-3 flex-shrink-0 mt-1" style={{ color: '#2563A8' }} />
              <p style={{ fontSize: 11.5, color: '#0F2A4A', lineHeight: 1.55 }}>{insight}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Metric({
  label,
  value,
  icon: Icon,
  color,
}: {
  label: string;
  value: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  color: string;
}) {
  return (
    <div
      className="numbers-ticking-metric"
      style={{
        padding: 12,
        background: 'rgba(91,160,212,0.08)',
        border: '1px solid rgba(91,160,212,0.20)',
        borderRadius: 12,
      }}
    >
      <p
        style={{
          fontSize: 9,
          fontWeight: 700,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: '#5BA0D4',
        }}
      >
        {label}
      </p>
      <div className="numbers-ticking-row flex items-baseline gap-2 mt-2">
        <Icon className="numbers-ticking-icon w-3.5 h-3.5" style={{ color, alignSelf: 'center' }} />
        <p
          className="numbers-ticking-value"
          style={{
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: '-0.02em',
            color: '#0F2A4A',
            lineHeight: 1,
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          {value}
        </p>
      </div>
    </div>
  );
}
