import { useEffect, useState } from 'react';
import { Phone } from 'lucide-react';

const TRANSCRIPTS = [
  'Hi, I need an HVAC quote...',
  "My water heater's not working.",
  "Can you come Tuesday morning?",
  "I'm looking at the $1,200 service plan.",
];

// Phone vibrates, "Call answered by Oaisis" appears, then a transcript line.
// Continuous 5-second cycle.
export default function PhoneCallDemo() {
  const [stage, setStage] = useState(0); // 0 ring · 1 answered · 2 transcript
  const [transcriptIdx, setTranscriptIdx] = useState(0);

  useEffect(() => {
    let cancelled = false;
    let timers: number[] = [];

    function cycle() {
      if (cancelled) return;
      setStage(0);
      timers.push(window.setTimeout(() => setStage(1), 1000));
      timers.push(window.setTimeout(() => setStage(2), 2500));
      timers.push(
        window.setTimeout(() => {
          setTranscriptIdx((i) => (i + 1) % TRANSCRIPTS.length);
          cycle();
        }, 5000)
      );
    }
    cycle();
    return () => {
      cancelled = true;
      timers.forEach(window.clearTimeout);
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
      <style>{`
        @keyframes phone-vibrate {
          0%, 100% { transform: rotate(0deg); }
          10%, 30%, 50%, 70%, 90% { transform: rotate(-8deg); }
          20%, 40%, 60%, 80% { transform: rotate(8deg); }
        }
      `}</style>
      <div className="flex items-center gap-3">
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            background: stage === 0 ? 'rgba(91,200,123,0.25)' : 'rgba(255,255,255,0.12)',
            border: '1px solid rgba(255,255,255,0.28)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            animation: stage === 0 ? 'phone-vibrate 0.45s ease-in-out infinite' : undefined,
            transition: 'background 250ms ease',
          }}
        >
          <Phone className="w-4 h-4" style={{ color: stage === 0 ? '#5BC97B' : '#FFFFFF' }} />
        </div>
        <div className="flex-1">
          <p style={{ fontSize: 11, fontWeight: 600, color: '#FFFFFF', lineHeight: 1.3 }}>
            {stage === 0 ? 'Incoming call · (214) 555-0119' : 'Call answered by Oaisis'}
          </p>
          <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.65)', marginTop: 2, minHeight: 12 }}>
            {stage >= 2 ? `"${TRANSCRIPTS[transcriptIdx]}"` : stage === 1 ? 'Listening...' : 'Ringing...'}
          </p>
        </div>
      </div>
    </div>
  );
}
