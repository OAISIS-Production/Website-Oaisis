import { CSSProperties, useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../../lib/scroll';

interface CinematicHeadingProps {
  children: string;
  /** Visual scale tier. 'display' = section headlines (96-144px). 'breath' = oversized text-only moments. */
  size?: 'display' | 'breath' | 'subhead';
  color?: string;
  align?: 'left' | 'center';
  className?: string;
  style?: CSSProperties;
  /** Disable scroll parallax for sections that are pinned (where the headline is already scroll-driven). */
  noParallax?: boolean;
  /** Override fontWeight (default 200). */
  weight?: number;
  /** Max-width cap in px or '%'. Defaults: display 1080, breath 1280, subhead 720. */
  maxWidth?: number | string;
  as?: 'h1' | 'h2' | 'h3' | 'p';
}

const SIZE: Record<'display' | 'breath' | 'subhead', { fontSize: string; lineHeight: number; letterSpacing: string; defaultWeight: number }> = {
  display: { fontSize: 'clamp(64px, 9vw, 160px)', lineHeight: 0.95, letterSpacing: '-0.05em', defaultWeight: 800 },
  breath: { fontSize: 'clamp(80px, 11vw, 200px)', lineHeight: 0.92, letterSpacing: '-0.05em', defaultWeight: 800 },
  subhead: { fontSize: 'clamp(22px, 2.5vw, 32px)', lineHeight: 1.25, letterSpacing: '-0.01em', defaultWeight: 300 },
};

export default function CinematicHeading({
  children,
  size = 'display',
  color = '#1F4F8F',
  align = 'left',
  className = '',
  style,
  noParallax = false,
  weight,
  maxWidth,
  as = 'h2',
}: CinematicHeadingProps) {
  const sizeSpec = SIZE[size];
  const resolvedWeight = weight ?? sizeSpec.defaultWeight;
  const ref = useRef<HTMLElement>(null);

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
      // Unified headline reveal: enter at top 75%, complete at top 35%,
      // power3.out, 1.0s. No exit fade — content stays visible.
      if (words.length) {
        gsap.fromTo(
          words,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.0,
            stagger: 0.05,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 75%',
              end: 'top 35%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Scroll-progress parallax: headline travels +60 → -60 across its section.
      if (!noParallax) {
        gsap.fromTo(
          el,
          { y: 60 },
          {
            y: -60,
            ease: 'none',
            scrollTrigger: {
              trigger: el,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2,
            },
          }
        );
      }
    }, ref);

    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, [noParallax]);

  const defaultMax = size === 'breath' ? 1280 : size === 'display' ? 1080 : 720;
  const { fontSize, lineHeight, letterSpacing } = sizeSpec;

  const baseStyle: CSSProperties = {
    color,
    fontWeight: resolvedWeight,
    fontFamily: "'Inter', sans-serif",
    textAlign: align,
    margin: 0,
    maxWidth: maxWidth ?? defaultMax,
    marginLeft: align === 'center' ? 'auto' : undefined,
    marginRight: align === 'center' ? 'auto' : undefined,
    fontSize,
    lineHeight,
    letterSpacing,
    willChange: 'transform',
    ...style,
  };

  // Split text into word spans on commas/spaces while preserving line breaks
  // (caller can pass "\n" to force a new line).
  const lines = children.split('\n');

  const Tag = as as any;

  return (
    <Tag ref={ref as any} className={className} style={baseStyle}>
      {lines.map((line, lineIdx) => (
        <span key={lineIdx} style={{ display: 'block' }}>
          {line.split(/(\s+)/).map((part, i) => {
            if (part.trim().length === 0) return <span key={i}>{part}</span>;
            return (
              <span
                key={i}
                data-word
                style={{
                  display: 'inline-block',
                  opacity: 0,
                  transform: 'translateY(40px)',
                  whiteSpace: 'pre',
                  willChange: 'transform, opacity',
                }}
              >
                {part}
              </span>
            );
          })}
        </span>
      ))}
    </Tag>
  );
}
