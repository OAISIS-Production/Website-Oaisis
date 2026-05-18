import { useEffect, useState } from 'react';

const COMPLETIONS = [
  'law firm',
  'logistics company',
  'media agency',
  'healthcare practice',
  'restaurant group',
];
const PREFIX = 'I run a ';
const TYPE_MS = 70;
const HOLD_MS = 1400;
const ERASE_MS = 32;

// Text input that types "I run a [completion]", pauses, backspaces the
// completion, and types the next one. Loops continuously.
export default function CursorTypingDemo() {
  const [text, setText] = useState(PREFIX);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const timers: number[] = [];

    function typeWord(word: string, doneCb: () => void) {
      let i = 0;
      const id = window.setInterval(() => {
        if (cancelled) return;
        i++;
        setText(PREFIX + word.slice(0, i));
        if (i >= word.length) {
          window.clearInterval(id);
          timers.push(window.setTimeout(doneCb, HOLD_MS));
        }
      }, TYPE_MS);
    }

    function eraseWord(word: string, doneCb: () => void) {
      let i = word.length;
      const id = window.setInterval(() => {
        if (cancelled) return;
        i--;
        setText(PREFIX + word.slice(0, Math.max(0, i)));
        if (i <= 0) {
          window.clearInterval(id);
          doneCb();
        }
      }, ERASE_MS);
    }

    function cycle(i: number) {
      if (cancelled) return;
      const word = COMPLETIONS[i];
      typeWord(word, () => {
        eraseWord(word, () => {
          const next = (i + 1) % COMPLETIONS.length;
          setIdx(next);
          cycle(next);
        });
      });
    }
    cycle(idx);
    return () => {
      cancelled = true;
      timers.forEach(window.clearTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <p
        style={{
          fontSize: 9,
          fontWeight: 700,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.65)',
          marginBottom: 10,
        }}
      >
        Tell us what you do
      </p>
      <div
        style={{
          background: 'rgba(255,255,255,0.10)',
          border: '1px solid rgba(255,255,255,0.30)',
          borderRadius: 10,
          padding: '10px 14px',
          fontSize: 14,
          fontWeight: 500,
          color: '#FFFFFF',
          fontFamily: "'Inter', sans-serif",
          minHeight: 38,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {text}
        <span
          style={{
            display: 'inline-block',
            width: 2,
            height: 16,
            background: '#FFFFFF',
            marginLeft: 1,
            animation: 'cursor-blink 1s steps(2) infinite',
          }}
        />
      </div>
      <style>{`
        @keyframes cursor-blink {
          0%, 50% { opacity: 1; }
          50.01%, 100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
