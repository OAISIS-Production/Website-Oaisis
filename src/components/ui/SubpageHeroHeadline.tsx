import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../../lib/scroll';

export interface SubpageHeroLine {
  text: string;
  /** 'heavy' = weight 900 large; 'light' = weight 400 smaller (e.g. "for"). */
  weight?: 'heavy' | 'light';
  /** When true, the line keeps a sustained text-shadow glow after its reveal. */
  glow?: boolean;
}

interface SubpageHeroHeadlineProps {
  lines: SubpageHeroLine[];
  /** Stagger between each line's reveal. Default 0.15s. */
  staggerDelay?: number;
  /** Extra delay before a glow line enters relative to the previous. Default 0.3s. */
  extraStaggerForGlow?: number;
}

// font-size on these style objects is intentionally OMITTED — it's applied
// via Tailwind classes below so a mobile-only floor reduction can scope
// through the md: breakpoint (desktop clamp unchanged at ≥768px).
const HEAVY_STYLE: React.CSSProperties = {
  fontWeight: 900,
  letterSpacing: '-0.025em',
  color: '#FFFFFF',
  lineHeight: 1.0,
  textShadow: '0 2px 20px rgba(15,42,74,0.40)',
  display: 'block',
  textAlign: 'center',
  width: '100%',
  marginLeft: 0,
  marginRight: 0,
};

const LIGHT_STYLE: React.CSSProperties = {
  fontWeight: 400,
  letterSpacing: '0.02em',
  color: 'rgba(255,255,255,0.85)',
  lineHeight: 1.0,
  textShadow: '0 1px 12px rgba(15,42,74,0.30)',
  marginTop: 'clamp(8px, 1.5vh, 20px)',
  marginBottom: 'clamp(8px, 1.5vh, 20px)',
  display: 'block',
  textAlign: 'center',
  width: '100%',
  marginLeft: 0,
  marginRight: 0,
};

// Mobile clamp (`text-[clamp(…,…,…)]`) is UNCHANGED — mobile hero typography
// is final. Desktop (md: ≥768px) clamps are dialed back from the prior
// 110/8.5vw/200 (heavy) and 64/5vw/112 (light) — those values rendered too
// large on a 1440-1500px laptop and forced long lines like "Fund-wide AI
// deployment." to wrap. New desktop values fit a single line at laptop
// widths while still scaling proportionally on larger displays:
//   heavy: floor 72 / mid 6vw / cap 144 →
//     1280px = 77, 1440px = 86, 1512px = 91, 1680px = 101, 1920px = 115,
//     2400px = 144 (cap), 2560px = 144.
//   light: floor 40 / mid 3.5vw / cap 80 →
//     1280px = 45, 1440px = 50, 1512px = 53, 1920px = 67, 2286px = 80 (cap).
const HEAVY_FONT_CLASS =
  'text-[clamp(48px,9vw,160px)] md:text-[clamp(72px,6vw,144px)]';
const LIGHT_FONT_CLASS =
  'text-[clamp(28px,5vw,80px)] md:text-[clamp(40px,3.5vw,80px)]';

// Sustained glow — identical to the Manifesto "Finally" treatment.
// Held as the line's final resting state, not a pulse.
const GLOW_FINAL = '0 4px 36px rgba(120,180,230,0.65), 0 0 60px rgba(255,255,255,0.2)';

// Shared three-line stacked headline for /pro-os subpages. Per-line GSAP
// stagger reveal; lines tagged `glow: true` get an additional 0.3s delay
// plus a text-shadow build-up to the sustained Manifesto-style glow.
//
// Animation rules (lessons from FinalOasis): NEVER animates font-size or
// letter-spacing — those come purely from CSS. Only opacity, y, filter,
// and text-shadow are touched. clearProps on complete strips only the
// properties GSAP actually animated.
export default function SubpageHeroHeadline({
  lines,
  staggerDelay = 0.15,
  extraStaggerForGlow = 0.3,
}: SubpageHeroHeadlineProps) {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  // Hold props in refs so the mount-only useEffect can read the latest
  // values without re-running when the parent passes a new array literal
  // on each render. Matches Manufacturing's `useEffect(()=>{}, [])` pattern
  // — runs EXACTLY ONCE on mount. Without this, the parent's inline
  // `lines={[…]}` literal creates a new array reference every parent
  // render → useEffect re-fires → ctx.revert() → timeline re-mounts →
  // hero glitches/resets visibly.
  const linesRef = useRef(lines);
  linesRef.current = lines;
  const staggerRef = useRef(staggerDelay);
  staggerRef.current = staggerDelay;
  const glowExtraRef = useRef(extraStaggerForGlow);
  glowExtraRef.current = extraStaggerForGlow;

  useEffect(() => {
    if (!headlineRef.current) return;
    const headline = headlineRef.current;
    const lineEls = Array.from(headline.querySelectorAll<HTMLSpanElement>('[data-hero-line]'));
    const currentLines = linesRef.current;
    const currentStagger = staggerRef.current;
    const currentGlowExtra = glowExtraRef.current;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      lineEls.forEach((el, i) => {
        el.classList.remove('gsap-reveal-init');
        el.classList.add('is-revealed');
        if (currentLines[i]?.glow) {
          el.style.textShadow = GLOW_FINAL;
        }
      });
      return;
    }
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: headline,
          start: 'top 85%',
          // PLAY ONCE — the lines stay in their final visible state for the
          // entire lifetime of the page. No reverse on scroll-up, no
          // re-fire on scroll-back-down. Matches the Manufacturing pattern
          // (after this round's parity update) so all four subpage heroes
          // behave identically.
          toggleActions: 'play none none none',
          once: true,
        },
        onComplete: () => {
          // Clear only what GSAP animated. text-shadow is NOT in this list
          // because glow lines need their boosted shadow to persist; the
          // glow's final value was set as the tween's "to" so it survives
          // on `el.style.textShadow` after the timeline finishes.
          gsap.set(lineEls, { clearProps: 'opacity,transform,filter,y' });
          lineEls.forEach((el) => {
            el.classList.remove('gsap-reveal-init');
            el.classList.add('is-revealed');
          });
        },
      });
      // Per-line stagger — each line tween placed at its own offset so a
      // glow line can carry the extra-delay rule independently.
      let cursor = 0;
      lineEls.forEach((el, i) => {
        const line = currentLines[i];
        if (i > 0) {
          cursor += currentStagger + (line?.glow ? currentGlowExtra : 0);
        }
        tl.fromTo(
          el,
          { opacity: 0, y: 40, filter: 'blur(8px)' },
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.0, ease: 'power3.out' },
          cursor
        );
        if (line?.glow) {
          // Build glow up over 0.6s starting near the line's land, ending
          // at the sustained Manifesto-style peak.
          tl.to(
            el,
            { textShadow: GLOW_FINAL, duration: 0.6, ease: 'power2.out' },
            cursor + 0.6
          );
        }
      });
    }, headline);
    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
    };
    // Run EXACTLY ONCE on mount — matches Manufacturing's pattern. Props
    // are read via refs above so this doesn't need to react to changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <h1
      ref={headlineRef}
      className="hero-headline mx-auto"
      style={{
        marginTop: 'clamp(40px, 6vh, 80px)',
        marginBottom: 'clamp(80px, 12vh, 160px)',
        textAlign: 'center',
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {lines.map((line, i) => {
        const baseStyle = line.weight === 'light' ? LIGHT_STYLE : HEAVY_STYLE;
        const fontClass = line.weight === 'light' ? LIGHT_FONT_CLASS : HEAVY_FONT_CLASS;
        return (
          <span
            key={`${i}-${line.text}`}
            data-hero-line
            className={`block gsap-reveal-init ${fontClass}`}
            style={baseStyle}
          >
            {line.text}
          </span>
        );
      })}
    </h1>
  );
}
