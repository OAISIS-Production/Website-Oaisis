import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap, ScrollTrigger } from '../../lib/scroll';
import GlowLogo from '../ui/GlowLogo';
import Clouds from '../ui/Clouds';

// v13.2 — single-viewport hero. Frame-sequence canvas dissolve in the center
// 64% of the viewport; eyebrow above (top 18%), headline + subhead + CTAs
// below (bottom 18%). No contained rectangle, no overlap. Section is exactly
// 100vh — scroll progress 0→100% scrubs the dissolve, text fades in 30→80%.
const FRAME_COUNT = 54;
// Mobile dissolve — load 6 frames evenly spaced through the full sequence
// instead of all 54. Indices are 1-based (matches frameUrl() padding).
// Result: ~180 KB instead of ~1.6 MB, canvas draw work runs at the same
// rate but each frame holds for ~17% of scroll progress instead of ~1.9%.
const MOBILE_FRAME_INDICES = [1, 11, 21, 31, 41, 54];
const FRAME_COUNT_MOBILE = MOBILE_FRAME_INDICES.length;
// SHRINK > 1.0 oversizes the frame so it overhangs the viewport on every side.
// Combined with LOGO_Y_OFFSET_VH it lets us shift the glass-logo region DOWN
// without exposing transparent gaps at the viewport edges.
// SHRINK = 1.0 → cover-fit exact: frame fills the viewport in its larger
// dimension without overhang. LOGO_Y_OFFSET_VH = 0 keeps the frame center
// at viewport center, so the wordmark in the frame composition lands at
// approximately 60–65% of viewport height — within the "wordmark bottom
// ≤ 65% of canvas height" requirement, and well above the bottom overlay.
const SHRINK = 1.0;
const LOGO_Y_OFFSET_VH = 0.0;
// Hero is a plain 100vh section. NO sticky inner, NO tall outer. The page
// scrolls past the hero normally — dissolve scrubs from "section top at
// viewport top" (scroll 0) to "section bottom at viewport top" (scroll 100vh).
const HERO_SECTION_VH = 100;
// scrub: true → direct 1:1 mapping with scroll, no per-frame easing delay.
// (was 0.5 — that added 500ms of smoothing on top of Lenis's own duration.)
const SCRUB: boolean | number = true;

function supportsWebP() {
  if (typeof window === 'undefined') return true;
  const c = document.createElement('canvas');
  return c.toDataURL('image/webp').indexOf('data:image/webp') === 0;
}
const USE_WEBP = supportsWebP();

function frameUrl(i: number) {
  const num = String(i).padStart(4, '0');
  return USE_WEBP ? `/hero/frames/frame_${num}.webp` : `/hero/frames-jpg/frame_${num}.jpg`;
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  // lastDrawnIndex: the frame index most recently requested by the scroll
  // scrub. When a frame decodes after the user has already scrolled past it,
  // we redraw using this index so the canvas catches up instead of remaining
  // stuck on the previously-drawn frame.
  const lastDrawnIndexRef = useRef(0);
  // drawFrameRef holds a stable pointer to the latest drawFrame closure so
  // each image's onload (set up at mount time) can invoke the current draw
  // function without forming a stale closure over an old canvas context.
  const drawFrameRef = useRef<(i: number) => void>(() => {});
  // firstFrameReady: hides the poster as soon as frame 1 decodes — doesn't
  // wait for all 54.
  const [firstFrameReady, setFirstFrameReady] = useState(false);
  const [reduced, setReduced] = useState(false);
  // Mobile gate — computed once at mount via matchMedia. Captured into a
  // ref so each useEffect can read it without becoming a hook dependency.
  // On mobile (<768px) the entire frame-sequence dissolve pipeline is
  // bypassed: no 54-frame preload, no canvas drawImage loop, no scroll-
  // driven ScrollTrigger. The static poster <img> renders in its place.
  // Desktop (≥768px) behavior is untouched.
  const isMobileRef = useRef(
    typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches
  );
  // Stateful copy for render-time conditional JSX. The frame-sequence canvas
  // and poster are NOT rendered on mobile — replaced by a glowing floating
  // OAISIS logo + lush cloud field. Desktop (≥768px) is unchanged.
  const [isMobile] = useState<boolean>(
    () => typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mql.matches) {
      setReduced(true);
      return;
    }
    // Mobile bails out of the entire frame-preload pipeline — no canvas
    // rendered, nothing to preload. The mobile hero uses a static glowing
    // logo + lush clouds instead.
    if (isMobileRef.current) return;
    let cancelled = false;
    // Frame source: full 54 on desktop, 6-frame mobile-light array on
    // mobile. The framesRef array is sized to the active count so drawFrame
    // can index 0..(count-1) uniformly. The mobile canvas itself is CSS-
    // transform scaled to 80% (see index.css .hero-canvas / .hero-poster
    // mobile rules) so the OAISIS wordmark fits comfortably without
    // touching the cover-fit drawImage math.
    const sourceIndices = isMobileRef.current
      ? MOBILE_FRAME_INDICES
      : Array.from({ length: FRAME_COUNT }, (_, k) => k + 1);
    const frames: HTMLImageElement[] = new Array(sourceIndices.length);
    sourceIndices.forEach((sourceIdx, idx) => {
      const img = new Image();
      img.onload = img.onerror = () => {
        if (cancelled) return;
        if (idx === 0) setFirstFrameReady(true);
        if (idx <= lastDrawnIndexRef.current) {
          drawFrameRef.current(lastDrawnIndexRef.current);
        }
      };
      img.src = frameUrl(sourceIdx);
      frames[idx] = img;
    });
    framesRef.current = frames;
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (reduced) return;
    // Mobile bypasses the full canvas pipeline (no sizeCanvas, no drawFrame,
    // no ScrollTrigger scrub). The mobile hero is static composition only.
    if (isMobileRef.current) return;
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    // Active frame count: full 54 on desktop, 6 on mobile. ScrollTrigger
    // map endpoint + drawFrame clamping both use this so each mobile frame
    // holds for ~17% of section scroll progress.
    const activeFrameCount = isMobileRef.current ? FRAME_COUNT_MOBILE : FRAME_COUNT;

    function sizeCanvas() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      canvas!.style.width = `${w}px`;
      canvas!.style.height = `${h}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function drawFrame(index: number) {
      const i = Math.min(Math.max(0, Math.floor(index)), activeFrameCount - 1);
      lastDrawnIndexRef.current = i;
      const img = framesRef.current[i];
      if (!img || !img.complete || !img.naturalWidth) return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      const baseScale = Math.max(w / img.naturalWidth, h / img.naturalHeight);
      const scale = baseScale * SHRINK;
      const dw = img.naturalWidth * scale;
      const dh = img.naturalHeight * scale;
      const x = (w - dw) / 2;
      const y = (h - dh) / 2 + h * LOGO_Y_OFFSET_VH;
      ctx!.clearRect(0, 0, w, h);
      ctx!.drawImage(img, x, y, dw, dh);
    }
    // Expose to image onload handlers (which were set up at mount before
    // this effect's drawFrame existed) so they can request catch-up redraws.
    drawFrameRef.current = drawFrame;

    sizeCanvas();
    drawFrame(0);

    const handleResize = () => {
      sizeCanvas();
      drawFrame(0);
    };
    window.addEventListener('resize', handleResize);

    const obj = { frame: 0 };
    const ctxGsap = gsap.context(() => {
      gsap.to(obj, {
        frame: activeFrameCount - 1,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          // Dissolve scrubs across the hero's full 100vh of scroll. No pin,
          // no sticky — the section scrolls past the viewport normally, so
          // the page visibly moves down at the same time the dissolve plays.
          start: 'top top',
          end: 'bottom top',
          scrub: SCRUB,
          onUpdate: () => drawFrame(obj.frame),
        },
      });
      // Headline copy fades in during the FIRST half of the section so it
      // becomes a stable visible element below the dissolving wordmark —
      // appears 30→50% of section progress, fully visible by mid-scroll
      // (well before the dissolve completes at 90%).
      if (textRef.current) {
        gsap.fromTo(
          textRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: '30% top',
              end: '50% top',
              scrub: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => {
      window.removeEventListener('resize', handleResize);
      ctxGsap.revert();
      ScrollTrigger.refresh();
    };
  }, [reduced]);

  return (
    <section
      ref={sectionRef}
      className="hero-section-root relative w-full overflow-hidden"
      style={{
        height: `${HERO_SECTION_VH}vh`,
        background: 'transparent',
      }}
    >
      {/* Eyebrow — sits at nav-bottom + var(--nav-clearance) from viewport
          top. On desktop the dissolve canvas / wordmark sit ≥120px below it.
          On mobile the <p> gets a white color override + 5-layer drop-shadow
          halo + a slow radiate pulse (CSS in src/index.css). Desktop keeps
          the inline-styled navy treatment unchanged. */}
      <div
        ref={eyebrowRef}
        className="absolute inset-x-0 flex justify-center pointer-events-none"
        style={{ top: 'calc(var(--nav-bottom) + var(--nav-clearance))', zIndex: 5 }}
      >
        <p
          className="hero-eyebrow"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 14,
            fontWeight: 600,
            letterSpacing: '0.4em',
            textTransform: 'uppercase',
            color: 'rgba(15,42,74,0.85)',
            textAlign: 'center',
            textShadow: '0 1px 8px rgba(255,255,255,0.45)',
          }}
        >
          The Intelligent Enterprise
        </p>
      </div>

      {/* Desktop hero: full-bleed 54-frame canvas dissolve + poster fallback.
          mask-image fades the canvas to transparent over the bottom 45% so the
          chrome wordmark in the final frames cannot bleed through the opaque
          overlay below it. The mask reaches alpha 0 a full 45% above the hero
          bottom edge, well before the solid #5BA0D4 sky-blue overlay band.
          Mobile (<768px) renders nothing here — the mobile branch below
          paints the glowing OAISIS logo + lush cloud field instead. */}
      {!isMobile && (
        <>
          <canvas
            ref={canvasRef}
            className="hero-canvas absolute inset-0 w-full h-full"
            style={{
              zIndex: 1,
              WebkitMaskImage:
                'linear-gradient(180deg, #000 0%, #000 90%, rgba(0,0,0,0) 100%)',
              maskImage:
                'linear-gradient(180deg, #000 0%, #000 90%, rgba(0,0,0,0) 100%)',
            }}
            aria-hidden="true"
          />
          {(!firstFrameReady || reduced) && (
            <img
              src="/hero/oaisis-hero-poster.jpg"
              alt=""
              aria-hidden="true"
              className="hero-poster absolute inset-0 w-full h-full pointer-events-none"
              style={{
                objectFit: 'cover',
                objectPosition: 'center 75%',
                zIndex: 1,
                WebkitMaskImage:
                  'linear-gradient(180deg, #000 0%, #000 90%, rgba(0,0,0,0) 100%)',
                maskImage:
                  'linear-gradient(180deg, #000 0%, #000 90%, rgba(0,0,0,0) 100%)',
              }}
            />
          )}
        </>
      )}

      {/* Mobile hero: glowing floating OAISIS logo over a lush, layered cloud
          field. No canvas, no frame-sequence preload, no scroll scrub. The
          clouds sit at z-index 0 (behind everything); the logo at z-index 2
          (above clouds, below eyebrow/CTAs at z-index 5). The logo uses the
          same GlowLogo + .oasis-logo-float treatment as the FinalOasis
          section but with a STATIC sustained glow (no pulse keyframe) for
          performance. Centered horizontally; vertically biased into the
          upper-middle third of the hero. */}
      {isMobile && (
        <>
          <Clouds opacity={0.55} lush />
          <div
            className="absolute inset-x-0 flex justify-center pointer-events-none"
            style={{
              top: '32%',
              zIndex: 2,
            }}
          >
            {/* Shared-center wrapper: 320×320 sized to the logo. Hosts the
                absolutely-positioned sunburst beam field (sibling, static,
                slow-rotating) and the floating + spinning logo. Beams share
                the logo's geometric center because the wrapper sizes to fit
                the logo. The float animation's 8px vertical breathing on the
                logo doesn't move the beams (different element) — the offset
                is imperceptible against a 700px beam field. */}
            <div style={{ position: 'relative', width: 320, height: 320 }}>
              <div className="hero-sun-beams" aria-hidden="true" />
              {/* Logo: vertical breathing only (transform-only float). The
                  prior continuous-rotation wrapper was removed — the logo
                  stays upright. Beams behind it still rotate slowly (60s);
                  that motion now carries the "alive" feel by itself. */}
              <div className="oasis-logo-float hero-glow-logo">
                <GlowLogo size={320} glow="white" />
              </div>
            </div>
          </div>
        </>
      )}

      {/* Hero CTA pair only — the "Finally, the future of your operations."
          headline previously rendered here has moved into ManifestoSection.
          The CTAs sit just above the bottom overlay (which begins its ramp
          at 75% of viewport height) and fade in during 30→50% of section
          scroll progress so they don't compete with the dissolving logo. */}
      <div
        ref={textRef}
        className="absolute inset-x-0 flex flex-col items-center px-6"
        style={{
          bottom: 'clamp(40px, 6vh, 64px)',
          zIndex: 5,
          // Desktop: 0 → GSAP scroll-scrubs to 1 over 30→50% of section.
          // Mobile: 1 (no scroll-scrub; the canvas dissolve is gone, so
          // gating CTAs on scroll progress is meaningless). Reduced motion: 1.
          opacity: isMobile || reduced ? 1 : 0,
        }}
      >
        <div className="flex flex-col sm:flex-row gap-3 pointer-events-auto">
          <Link to="/demo" className="btn-magnetic btn-hero-navy" data-idle-pulse>
            Book a demo
          </Link>
          <Link to="/pro-os" className="btn-magnetic btn-hero-navy-ghost">
            See Oaisis OS
          </Link>
        </div>
      </div>

      {/* Hero-bottom blend — top edge sits at viewport y = 75% (= 25vh tall,
          anchored to viewport bottom). Wordmark bottom is at ~65% of viewport
          height, so the overlay starts ≥10% (≈90px @ 900p) below the wordmark
          and never touches it. Ramps from transparent at the top edge to
          solid #5BA0D4 at the bottom edge — matches the body gradient's flat
          #5BA0D4 hold (0–22%) for a seamless exit into the Manifesto. */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 pointer-events-none"
        style={{
          height: '25vh',
          background:
            'linear-gradient(180deg, rgba(91,160,212,0) 0%, #5BA0D4 100%)',
          zIndex: 3,
        }}
      />
    </section>
  );
}
