import { useMemo } from 'react';

const COUNT = 24;

/**
 * Slow upward drift of small white dots — sunlight dust in the oasis air.
 */
export default function ParticleField() {
  const particles = useMemo(
    () =>
      Array.from({ length: COUNT }, (_, i) => {
        const seed = (i + 1) / COUNT;
        return {
          left: `${(seed * 97 + Math.sin(i * 1.7) * 3) % 100}%`,
          size: 2 + ((i * 7) % 5),
          opacity: 0.18 + ((i % 4) * 0.08),
          duration: 9 + (i % 7),
          delay: -((i * 0.9) % 12),
        };
      }),
    []
  );

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {particles.map((p, i) => (
        <span
          key={i}
          className="particle"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
