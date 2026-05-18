import { useEffect, useState } from 'react';

const DOT_COUNT = 10;
const DAYS = ['Day 12', 'Day 21', 'Day 34', 'Day 8', 'Day 45', 'Day 27', 'Day 51', 'Day 14', 'Day 39', 'Day 18'];

// 10 dots in a grid; each glows in sequence with a "Oaisis deployed · Day X"
// label briefly under the active dot. Loops continuously.
export default function PortfolioDotsDemo() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const t = window.setInterval(() => {
      if (cancelled) return;
      setActive((i) => (i + 1) % DOT_COUNT);
    }, 700);
    return () => {
      cancelled = true;
      window.clearInterval(t);
    };
  }, []);

  return (
    <div
      style={{
        background: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.18)',
        borderRadius: 14,
        padding: 16,
        marginTop: 14,
        minHeight: 100,
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: 10,
          marginBottom: 10,
        }}
      >
        {Array.from({ length: DOT_COUNT }).map((_, i) => {
          const isActive = i === active;
          return (
            <span
              key={i}
              style={{
                width: 14,
                height: 14,
                borderRadius: '50%',
                background: isActive ? '#FFFFFF' : 'rgba(255,255,255,0.25)',
                boxShadow: isActive ? '0 0 14px rgba(255,255,255,0.7)' : 'none',
                transition: 'all 300ms ease',
                justifySelf: 'center',
              }}
            />
          );
        })}
      </div>
      <p
        style={{
          fontSize: 11,
          color: 'rgba(255,255,255,0.85)',
          fontWeight: 500,
          letterSpacing: '0.04em',
          textAlign: 'center',
          minHeight: 14,
        }}
      >
        Oaisis deployed · {DAYS[active]}
      </p>
    </div>
  );
}
