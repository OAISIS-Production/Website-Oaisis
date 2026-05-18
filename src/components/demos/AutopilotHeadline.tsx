import { useEffect, useState } from 'react';

const PART_A = 'Your company.';
const PART_B = 'On autopilot.';
const TYPE_MS = 70;
const HOLD_BETWEEN = 600;
const HOLD_END = 4200;

// "Your company." types in, pauses, then "On autopilot." types in — the
// period pulses once on completion. Below: thinking dots cycling.
export default function AutopilotHeadline() {
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [pulsePeriod, setPulsePeriod] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const timers: number[] = [];

    function cycle() {
      if (cancelled) return;
      setA('');
      setB('');
      setPulsePeriod(false);

      let i = 0;
      const typeA = window.setInterval(() => {
        if (cancelled) return;
        i++;
        setA(PART_A.slice(0, i));
        if (i >= PART_A.length) {
          window.clearInterval(typeA);
          timers.push(
            window.setTimeout(() => {
              let j = 0;
              const typeB = window.setInterval(() => {
                if (cancelled) return;
                j++;
                setB(PART_B.slice(0, j));
                if (j >= PART_B.length) {
                  window.clearInterval(typeB);
                  setPulsePeriod(true);
                  timers.push(window.setTimeout(() => setPulsePeriod(false), 900));
                  timers.push(window.setTimeout(cycle, HOLD_END));
                }
              }, TYPE_MS);
            }, HOLD_BETWEEN)
          );
        }
      }, TYPE_MS);
      timers.push(typeA);
    }
    cycle();
    return () => {
      cancelled = true;
      timers.forEach((t) => {
        window.clearTimeout(t);
        window.clearInterval(t);
      });
    };
  }, []);

  // Split B into the body and the period so we can pulse just the period.
  const bBody = b.endsWith('.') ? b.slice(0, -1) : b;
  const bHasPeriod = b.endsWith('.');

  return (
    <div>
      <h2
        className="bolder-on-scroll"
        style={{
          fontSize: 'clamp(48px, 6.2vw, 96px)',
          fontWeight: 800,
          letterSpacing: '-0.05em',
          color: '#FFFFFF',
          lineHeight: 0.95,
          margin: 0,
          fontFamily: "'Inter', sans-serif",
          minHeight: '2em',
        }}
      >
        <span style={{ display: 'block' }}>
          {a}
          {a.length < PART_A.length && <Caret />}
        </span>
        <span style={{ display: 'block', marginTop: 8 }}>
          {bBody}
          {bHasPeriod && (
            <span
              style={{
                display: 'inline-block',
                animation: pulsePeriod ? 'autopilot-period 800ms ease-out' : undefined,
                transformOrigin: 'center',
              }}
            >
              .
            </span>
          )}
          {a.length >= PART_A.length && b.length < PART_B.length && <Caret />}
        </span>
      </h2>
      <ThinkingDots />
      <style>{`
        @keyframes autopilot-period {
          0% { transform: scale(1); }
          40% { transform: scale(1.4); }
          100% { transform: scale(1); }
        }
        @keyframes autopilot-caret {
          0%, 50% { opacity: 1; }
          50.01%, 100% { opacity: 0; }
        }
        @keyframes autopilot-dot {
          0%, 100% { opacity: 0.25; transform: translateY(0); }
          50% { opacity: 0.9; transform: translateY(-2px); }
        }
      `}</style>
    </div>
  );
}

function Caret() {
  return (
    <span
      style={{
        display: 'inline-block',
        width: 3,
        height: '0.85em',
        background: 'rgba(255,255,255,0.85)',
        marginLeft: 4,
        verticalAlign: '-0.10em',
        animation: 'autopilot-caret 0.9s steps(2) infinite',
      }}
    />
  );
}

function ThinkingDots() {
  return (
    <div className="flex items-center gap-2" style={{ marginTop: 28 }} aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.85)',
            animation: 'autopilot-dot 1s ease-in-out infinite',
            animationDelay: `${i * 0.18}s`,
          }}
        />
      ))}
    </div>
  );
}
