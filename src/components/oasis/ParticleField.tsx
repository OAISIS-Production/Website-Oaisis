import { useMemo } from 'react';

const COUNT = 24;
const COUNT_MOBILE = 8;

/**
 * Slow upward drift of small white dots — sunlight dust in the oasis air.
 * Mobile renders 8 particles instead of 24 so the infinite-animation GPU
 * cost (each particle runs its own transform + opacity keyframe loop)
 * drops to one-third without losing the "dust in air" effect entirely.
 */
export default function ParticleField() {
  const particles = useMemo(() => {
    const isMobile =
      typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches;
    const count = isMobile ? COUNT_MOBILE : COUNT;
    return Array.from({ length: count }, (_, i) => {
      const seed = (i + 1) / count;
      return {
        left: `${(seed * 97 + Math.sin(i * 1.7) * 3) % 100}%`,
        size: 2 + ((i * 7) % 5),
        opacity: 0.18 + ((i % 4) * 0.08),
        duration: 9 + (i % 7),
        delay: -((i * 0.9) % 12),
      };
    });
  }, []);

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
