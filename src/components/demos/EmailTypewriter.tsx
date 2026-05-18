import { useEffect, useState } from 'react';
import { Mail, Sparkles } from 'lucide-react';

const BODY = `Hi Sarah,

Saw your post about Q4 planning — congrats on the Phoenix expansion. Curious how the new locations are handling AP, particularly with the route-12 fleet coming online next month.

We've been working with a few field-service operators at your scale on the back-office side. Worth a 15-minute look?

Chris`;

const CHAR_INTERVAL = 28; // ms per character (~36 chars/sec)
const RESET_DELAY = 2200; // pause after completion before retyping

// Email composer that types itself character-by-character, completes, pauses,
// then re-types. Continuous loop. The mockup IS the explanation.
export default function EmailTypewriter() {
  const [typed, setTyped] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let interval: number | null = null;
    let pause: number | null = null;

    function startTyping() {
      if (cancelled) return;
      setTyped('');
      setDone(false);
      let i = 0;
      interval = window.setInterval(() => {
        if (cancelled) return;
        i++;
        setTyped(BODY.slice(0, i));
        if (i >= BODY.length) {
          if (interval) window.clearInterval(interval);
          interval = null;
          setDone(true);
          pause = window.setTimeout(startTyping, RESET_DELAY);
        }
      }, CHAR_INTERVAL);
    }

    startTyping();
    return () => {
      cancelled = true;
      if (interval) window.clearInterval(interval);
      if (pause) window.clearTimeout(pause);
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
          Oaisis · Sell
        </span>
      </div>
      <div style={{ padding: 24, minHeight: 420 }}>
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4" style={{ color: '#5BA0D4' }} />
            <p style={{ fontSize: 11, color: '#0F2A4A', fontWeight: 600 }}>New outbound · drafted by Oaisis</p>
          </div>
          <span
            style={{
              padding: '3px 9px',
              background: done ? 'rgba(91,200,123,0.18)' : 'rgba(91,160,212,0.14)',
              border: `1px solid ${done ? 'rgba(91,200,123,0.45)' : 'rgba(91,160,212,0.32)'}`,
              borderRadius: 999,
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: done ? '#1A6B4A' : '#2563A8',
              transition: 'all 250ms ease',
            }}
          >
            {done ? 'Ready to send' : 'Drafting...'}
          </span>
        </div>
        <div style={{ fontSize: 11.5, color: '#0F2A4A', lineHeight: 1.7 }}>
          <p style={{ marginBottom: 6 }}>
            <strong style={{ color: '#5BA0D4', fontWeight: 600, marginRight: 6 }}>To</strong>
            Sarah Chen · VP Operations · Acme Logistics
          </p>
          <p style={{ marginBottom: 12 }}>
            <strong style={{ color: '#5BA0D4', fontWeight: 600, marginRight: 6 }}>Subject</strong>
            Quick question about your invoice automation
          </p>
          <div
            style={{
              borderTop: '1px solid rgba(91,160,212,0.18)',
              paddingTop: 12,
              fontWeight: 400,
              whiteSpace: 'pre-wrap',
              minHeight: 180,
              fontFamily: "'Inter', sans-serif",
            }}
          >
            {typed}
            {!done && <span style={{ color: '#2563A8', fontWeight: 500 }}>▍</span>}
          </div>
        </div>
        <div
          className="mt-4 flex items-start gap-2"
          style={{
            padding: 10,
            borderRadius: 10,
            background: 'rgba(91,160,212,0.06)',
            border: '1px dashed rgba(91,160,212,0.30)',
          }}
        >
          <Sparkles className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: '#2563A8' }} />
          <p style={{ fontSize: 10.5, color: '#0F2A4A', lineHeight: 1.5 }}>
            Personalized using LinkedIn signal: posted about Q4 planning yesterday.
          </p>
        </div>
      </div>
    </div>
  );
}
