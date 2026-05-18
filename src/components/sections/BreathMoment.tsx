import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../../lib/scroll';
import Clouds from '../ui/Clouds';

interface BreathMomentProps {
  /** One or two lines of headline text. Each line splits into word spans for stagger. */
  lines: string[];
  /** Any CSS background value (solid color or gradient). Must match adjacent sections. */
  background: string;
  /** Text color. */
  textColor: string;
  /** Cloud opacity override; defaults to 0.12. */
  cloudOpacity?: number;
  /** Optional id anchor. */
  id?: string;
}

// 100vh text-only "breath" between dense content sections. Massive semibold
// type rises into view with per-word stagger when the section enters the
// viewport. The blue cloud thread carries through.
export default function BreathMoment({
  lines,
  background,
  textColor,
  cloudOpacity = 0.12,
  id,
}: BreathMomentProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const words = el.querySelectorAll<HTMLSpanElement>('[data-word]');
    if (prefersReduced) {
      words.forEach((w) => {
        w.style.opacity = '1';
        w.style.transform = 'none';
      });
      return;
    }
    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.4,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            // Unified breath timing: trigger 60% from top, complete by center.
            // Reveal only — no exit fade-out, so content stays visible.
            trigger: el,
            start: 'top 60%',
            end: 'center 50%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, ref);
    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, []);

  return (
    <section
      id={id}
      className="relative w-full overflow-hidden flex items-center justify-center"
      style={{ minHeight: '70vh', background, padding: 'clamp(64px, 10vh, 120px) 24px' }}
    >
      <Clouds opacity={cloudOpacity} />
      <div ref={ref} className="relative z-10 w-full text-center" style={{ maxWidth: '92vw', margin: '0 auto' }}>
        {lines.map((line, lineIdx) => (
          <h2
            key={lineIdx}
            style={{
              color: textColor,
              fontSize: 'clamp(80px, 11vw, 200px)',
              fontWeight: 800,
              letterSpacing: '-0.05em',
              lineHeight: 0.92,
              margin: 0,
              fontFamily: "'Inter', sans-serif",
            }}
          >
            {line.split(/(\s+)/).map((part, i) => {
              if (part.trim().length === 0) return <span key={i}>{part}</span>;
              return (
                <span
                  key={i}
                  data-word
                  style={{
                    display: 'inline-block',
                    opacity: 0,
                    transform: 'translateY(60px)',
                    whiteSpace: 'pre',
                    willChange: 'transform, opacity',
                  }}
                >
                  {part}
                </span>
              );
            })}
          </h2>
        ))}
      </div>
    </section>
  );
}
