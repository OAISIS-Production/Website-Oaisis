import { useEffect, useState } from 'react';
import { Inbox, Reply, AlertTriangle } from 'lucide-react';

interface Message {
  from: string;
  preview: string;
  reply: string;
  status: 'resolved' | 'drafted' | 'escalated';
}

const POOL: Message[] = [
  {
    from: 'Jamie · order #2841',
    preview: "Wondering if I can change my delivery date to next Friday...",
    reply: "Updated your delivery to next Friday, Jamie — confirmation email on the way.",
    status: 'resolved',
  },
  {
    from: 'Priya · invoice question',
    preview: 'Why was line 4 charged twice?',
    reply: "Looks like a duplicate billing for the same SKU. We've credited $48.20.",
    status: 'drafted',
  },
  {
    from: 'Marcus · refund request',
    preview: 'I need a refund for the missed install last week.',
    reply: 'Sarah — flagging the install report and the customer history for your call.',
    status: 'escalated',
  },
  {
    from: 'Kim · status check',
    preview: "Where's my order? Tracking still says pending.",
    reply: "Hi Kim — your order shipped 2hr ago via UPS, ETA Thursday. Tracking link sent.",
    status: 'resolved',
  },
];

// v13.6 — all 3 replies are revealed from frame 1. Animation cycles by
// rotating which 3 messages are visible (sliding a new inbound in at the top
// every 3 seconds), NOT by revealing replies one-by-one. So the card always
// looks fully populated regardless of when it becomes visible.
export default function InboxReplies() {
  const [startIdx, setStartIdx] = useState(0);
  // Tracks the most-recently-rotated index so we can animate just that row.
  const [tickKey, setTickKey] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const t = window.setInterval(() => {
      if (cancelled) return;
      setStartIdx((s) => (s + 1) % POOL.length);
      setTickKey((k) => k + 1);
    }, 3000);
    return () => {
      cancelled = true;
      window.clearInterval(t);
    };
  }, []);

  const visible: Message[] = [];
  for (let i = 0; i < 3; i++) visible.push(POOL[(startIdx + i) % POOL.length]);
  const revealed = 3; // always show all 3 reply badges

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
          Oaisis · Support · Inbox
        </span>
      </div>
      <div style={{ padding: 24, minHeight: 420 }}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Inbox className="w-4 h-4" style={{ color: '#5BA0D4' }} />
            <p style={{ fontSize: 12, color: '#0F2A4A', fontWeight: 600 }}>
              3 inbound · {revealed} handled by Oaisis
            </p>
          </div>
        </div>
        <div className="space-y-2.5">
          {visible.map((m, i) => {
            const isResolved = m.status === 'resolved';
            const isDrafted = m.status === 'drafted';
            const isEscalated = m.status === 'escalated';
            const badgeBg = isResolved
              ? 'rgba(91,160,212,0.18)'
              : isDrafted
                ? 'rgba(255,196,77,0.18)'
                : 'rgba(217,70,70,0.18)';
            const badgeColor = isResolved ? '#2563A8' : isDrafted ? '#B57E1F' : '#D94646';
            const badgeText = isResolved ? 'Auto-sent' : isDrafted ? 'Drafted' : 'Escalated';
            const showReply = i < revealed;
            // The freshly-rotated-in message is index 0 on each tickKey bump.
            const isNew = i === 0;
            return (
              <div
                key={`${tickKey}-${i}`}
                style={{
                  padding: 12,
                  background: 'rgba(91,160,212,0.05)',
                  border: '1px solid rgba(91,160,212,0.18)',
                  borderRadius: 12,
                  animation: isNew ? 'inbox-slide-in 380ms cubic-bezier(0.16,1,0.3,1)' : undefined,
                }}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <p style={{ fontSize: 11.5, color: '#0F2A4A', fontWeight: 600 }}>{m.from}</p>
                  {showReply && (
                    <span
                      style={{
                        fontSize: 9,
                        fontWeight: 700,
                        letterSpacing: '0.14em',
                        textTransform: 'uppercase',
                        color: badgeColor,
                        padding: '2px 8px',
                        background: badgeBg,
                        borderRadius: 999,
                      }}
                    >
                      {badgeText}
                    </span>
                  )}
                </div>
                <p style={{ fontSize: 11, color: 'rgba(15,42,74,0.7)', marginBottom: 6, fontStyle: 'italic' }}>
                  "{m.preview}"
                </p>
                {showReply && (
                  <div className="flex items-start gap-1.5">
                    {isEscalated ? (
                      <AlertTriangle className="w-3 h-3 flex-shrink-0 mt-0.5" style={{ color: '#D94646' }} />
                    ) : (
                      <Reply className="w-3 h-3 flex-shrink-0 mt-0.5" style={{ color: '#5BA0D4' }} />
                    )}
                    <p style={{ fontSize: 11, color: '#0F2A4A', lineHeight: 1.5 }}>{m.reply}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <style>{`
          @keyframes inbox-slide-in {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </div>
    </div>
  );
}
