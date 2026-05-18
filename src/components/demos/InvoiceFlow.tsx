import { useEffect, useState } from 'react';
import { Check, AlertTriangle } from 'lucide-react';

interface Row {
  vendor: string;
  amount: string;
  po: string;
  status: 'matched' | 'flag';
}

const POOL: Row[] = [
  { vendor: 'Acme Logistics', amount: '$4,820.00', po: 'PO-2841', status: 'matched' },
  { vendor: 'Northbridge Supply', amount: '$1,260.40', po: 'PO-2845', status: 'matched' },
  { vendor: 'Crescent Fleet Co.', amount: '$9,400.00', po: 'PO-2849', status: 'matched' },
  { vendor: 'Globalfreight Inc.', amount: '$612.85', po: 'PO-2851', status: 'matched' },
  { vendor: 'Crescent Fleet · Anomaly', amount: '+12% drift', po: 'review', status: 'flag' },
  { vendor: 'Westside Materials', amount: '$3,180.00', po: 'PO-2854', status: 'matched' },
  { vendor: 'Riverline Co.', amount: '$2,440.00', po: 'PO-2857', status: 'matched' },
  { vendor: 'Phoenix Parts', amount: '$880.50', po: 'PO-2860', status: 'matched' },
];

const VISIBLE = 5;
const TICK_MS = 800; // ms between new rows

// Invoice rows slide in from the top every 800ms, get auto-checked, push
// older rows out. Continuous flow. The mockup demonstrates "Back office,
// handled" — no copy needed.
export default function InvoiceFlow() {
  const [rows, setRows] = useState<Row[]>(() => POOL.slice(0, VISIBLE));
  const [counter, setCounter] = useState({ matched: 4, review: 1 });
  const [appearing, setAppearing] = useState(0);

  useEffect(() => {
    let cancelled = false;
    let i = VISIBLE;
    let appearKey = 0;

    function pushNext() {
      if (cancelled) return;
      const next = POOL[i % POOL.length];
      i++;
      appearKey++;
      setAppearing(appearKey);
      setRows((prev) => [next, ...prev].slice(0, VISIBLE));
      setCounter((c) =>
        next.status === 'matched'
          ? { matched: c.matched + 1, review: c.review }
          : { matched: c.matched, review: c.review + 1 }
      );
    }

    const t = window.setInterval(pushNext, TICK_MS);
    return () => {
      cancelled = true;
      window.clearInterval(t);
    };
  }, []);

  return (
    <div
      className="relative w-full"
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
          Oaisis · Operations
        </span>
      </div>
      <div style={{ padding: 24, minHeight: 420 }}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <p
              style={{
                fontSize: 9,
                fontWeight: 700,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: '#2563A8',
              }}
            >
              Auto-processed today
            </p>
            <p style={{ fontSize: 14, color: '#0F2A4A', marginTop: 2, fontWeight: 600 }}>
              {counter.matched} matched · {counter.review} review
            </p>
          </div>
          <span
            style={{
              padding: '4px 10px',
              background: 'rgba(91,160,212,0.12)',
              border: '1px solid rgba(91,160,212,0.32)',
              borderRadius: 999,
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: '#2563A8',
            }}
          >
            Auto · Live
          </span>
        </div>
        <div style={{ position: 'relative' }}>
          {rows.map((r, i) => {
            const isFlag = r.status === 'flag';
            const isNew = i === 0;
            const checkDelay = isNew ? 200 : 0;
            return (
              <div
                key={`${appearing}-${i}`}
                className="flex items-center justify-between py-2.5"
                style={{
                  borderTop: i > 0 ? '1px solid rgba(91,160,212,0.18)' : 'none',
                  animation: isNew ? 'invoice-row-in 350ms cubic-bezier(0.16,1,0.3,1)' : undefined,
                }}
              >
                <div className="flex items-center gap-3">
                  {isFlag ? (
                    <span
                      style={{
                        width: 18,
                        height: 18,
                        borderRadius: '50%',
                        background: 'rgba(217,70,70,0.15)',
                        border: '1.5px solid rgba(217,70,70,0.5)',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <AlertTriangle className="w-3 h-3" style={{ color: '#D94646' }} />
                    </span>
                  ) : (
                    <span
                      style={{
                        width: 18,
                        height: 18,
                        borderRadius: '50%',
                        background: '#5BA0D4',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        animation: isNew ? `invoice-check-in 250ms ${checkDelay}ms backwards cubic-bezier(0.16,1,0.3,1)` : undefined,
                      }}
                    >
                      <Check className="w-3 h-3" style={{ color: '#FFFFFF' }} />
                    </span>
                  )}
                  <span
                    style={{
                      fontSize: 12,
                      color: isFlag ? '#D94646' : '#0F2A4A',
                      fontWeight: isFlag ? 600 : 500,
                    }}
                  >
                    {r.vendor}
                  </span>
                  <span style={{ fontSize: 11, color: '#5BA0D4' }}>{r.po}</span>
                </div>
                <span style={{ fontSize: 12, fontWeight: 600, color: isFlag ? '#D94646' : '#0F2A4A' }}>{r.amount}</span>
              </div>
            );
          })}
          <style>{`
            @keyframes invoice-row-in {
              from { opacity: 0; transform: translateY(-12px); }
              to { opacity: 1; transform: translateY(0); }
            }
            @keyframes invoice-check-in {
              from { opacity: 0; transform: scale(0.4); }
              to { opacity: 1; transform: scale(1); }
            }
          `}</style>
        </div>
      </div>
    </div>
  );
}
