import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../../lib/scroll';

type Depth = 'light' | 'mid' | 'deep';

const DEPTH_OPACITY: Record<Depth, number> = {
  light: 0.55,
  mid: 0.40,
  deep: 0.28,
};

interface CloudsProps {
  /** Palette-tier shortcut (legacy entry-point). Ignored when `opacity` is provided. */
  depth?: Depth;
  /** Direct opacity for the front layer; back layers proportionally lower. */
  opacity?: number;
  /** Override cloud color (rgb triplet, e.g. "255,255,255"). */
  color?: string;
  /** Lush variant — bypass mobile drop filter, render extra clusters, render
      ALL layers (back/mid/front) on mobile so the field reads as a dense
      heaven-sky behind the hero logo. Desktop behavior unchanged. */
  lush?: boolean;
}

// 5 cumulus silhouette variants. Each is drawn in a 200×80 viewBox, lumpy
// top + roughly flat bottom + side wisps. Wider than tall so they read as
// real clouds, not blurred blobs. Stretched at render time per cloud size.
const CLOUD_PATHS: string[] = [
  // Variant A — 6 bumps, gentle slope
  'M 6,58 Q 4,42 18,40 Q 22,22 38,26 Q 50,8 70,18 Q 86,6 104,20 Q 122,12 134,28 Q 158,28 162,46 Q 192,48 188,62 Q 130,72 70,68 Q 24,72 6,58 Z',
  // Variant B — flatter, longer, single big bump in the middle
  'M 4,60 Q 0,46 14,42 Q 24,30 42,34 Q 56,16 78,24 Q 100,8 122,22 Q 144,16 156,32 Q 178,32 184,50 Q 196,52 194,64 Q 130,72 60,70 Q 24,74 4,60 Z',
  // Variant C — asymmetric, right side taller
  'M 8,64 Q 4,52 18,48 Q 26,34 44,38 Q 60,22 80,30 Q 96,10 122,18 Q 144,8 162,26 Q 186,28 188,46 Q 196,52 192,66 Q 130,72 60,70 Q 22,74 8,64 Z',
  // Variant D — wispy left tail
  'M 0,62 Q 6,52 22,54 Q 32,40 50,42 Q 62,28 84,32 Q 102,18 124,26 Q 144,20 156,38 Q 178,40 182,54 Q 192,58 188,68 Q 124,74 60,72 Q 18,74 0,62 Z',
  // Variant E — compact, fuller body
  'M 12,60 Q 8,46 22,42 Q 30,28 48,30 Q 62,18 80,26 Q 98,12 118,22 Q 138,18 150,34 Q 172,36 176,50 Q 186,52 182,64 Q 130,70 70,68 Q 28,72 12,60 Z',
];

// 10 deterministic cluster positions filling the section. Mix of variants.
const CLOUD_CLUSTERS: Array<{
  x: number; // left %
  y: number; // top %
  w: number; // width px
  variant: number;
  layer: 0 | 1 | 2;
}> = [
  { x: -4, y: 8, w: 720, variant: 0, layer: 0 }, // back
  { x: 38, y: 14, w: 640, variant: 2, layer: 0 }, // back
  { x: 72, y: 22, w: 560, variant: 1, layer: 0 }, // back
  { x: -8, y: 38, w: 680, variant: 3, layer: 0 }, // back

  { x: 18, y: 6, w: 460, variant: 4, layer: 1 }, // mid
  { x: 58, y: 30, w: 480, variant: 2, layer: 1 }, // mid
  { x: 78, y: 50, w: 420, variant: 0, layer: 1 }, // mid
  { x: 8, y: 60, w: 500, variant: 1, layer: 1 }, // mid

  { x: 32, y: 24, w: 320, variant: 3, layer: 2 }, // front
  { x: 68, y: 4, w: 280, variant: 4, layer: 2 }, // front
  { x: 14, y: 78, w: 360, variant: 0, layer: 2 }, // front
];

// Lush cluster set — denser, layered cloud field for the mobile hero. Designed
// so the silhouettes pile around the upper-mid section to read as a parted-sky
// heaven-field behind the floating OAISIS logo. Mix of all three depth layers.
const LUSH_CLUSTERS: Array<{
  x: number; y: number; w: number; variant: number; layer: 0 | 1 | 2;
}> = [
  // Back layer (deep, soft, heavy blur) — full-width horizon
  { x: -12, y: 6, w: 560, variant: 0, layer: 0 },
  { x: 30, y: 4, w: 520, variant: 2, layer: 0 },
  { x: 64, y: 12, w: 580, variant: 1, layer: 0 },
  { x: -8, y: 28, w: 540, variant: 3, layer: 0 },
  { x: 48, y: 32, w: 600, variant: 4, layer: 0 },
  { x: 8, y: 56, w: 560, variant: 1, layer: 0 },
  { x: 52, y: 64, w: 520, variant: 0, layer: 0 },

  // Mid layer — surrounds the central logo position
  { x: -6, y: 14, w: 380, variant: 4, layer: 1 },
  { x: 56, y: 18, w: 400, variant: 2, layer: 1 },
  { x: 20, y: 38, w: 360, variant: 0, layer: 1 },
  { x: 62, y: 44, w: 380, variant: 3, layer: 1 },
  { x: -2, y: 62, w: 420, variant: 1, layer: 1 },
  { x: 54, y: 72, w: 380, variant: 4, layer: 1 },

  // Front layer — small, crisp accents nearer to the logo
  { x: 12, y: 22, w: 240, variant: 3, layer: 2 },
  { x: 68, y: 28, w: 220, variant: 4, layer: 2 },
  { x: 28, y: 52, w: 260, variant: 0, layer: 2 },
  { x: 70, y: 60, w: 240, variant: 1, layer: 2 },
];

const LAYER_BLUR = [24, 12, 4]; // px — back / mid / front
const LAYER_PARALLAX = [0.15, 0.35, 0.55];
const LAYER_OPACITY_MULT = [0.4, 0.7, 1.0];

export default function Clouds({ depth = 'light', opacity, color = '255,255,255', lush = false }: CloudsProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;
    // Mobile parallax disable — clouds render statically below 768px so the
    // 3-layer scroll-driven transform isn't running on every scroll tick on
    // mobile GPUs. SVG cloud silhouettes still appear; they just don't drift.
    // Desktop (≥768px) parallax is untouched.
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (isMobile) return;

    const ctx = gsap.context(() => {
      for (let layer = 0; layer < 3; layer++) {
        const els = ref.current!.querySelectorAll<HTMLElement>(`[data-cloud-layer="${layer}"]`);
        if (!els.length) continue;
        const drift = 240 * LAYER_PARALLAX[layer]; // total horizontal drift
        gsap.fromTo(
          els,
          { x: -drift / 2 },
          {
            x: drift / 2,
            ease: 'none',
            scrollTrigger: {
              trigger: ref.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.5,
            },
          }
        );
      }
    }, ref);
    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, []);

  const baseOp = opacity ?? DEPTH_OPACITY[depth];
  const fill = `rgba(${color},1)`;
  // Mobile cloud-cost + edge-clip reduction. Two filters:
  //   1) Drop back layer (24px blur, layer === 0) — heaviest GPU filter.
  //   2) Drop clouds positioned near section top/bottom edges (y < 18 or
  //      y > 70). Section wrappers have `overflow: hidden`, so cloud blur
  //      halos near the edges get clipped, producing a visible horizontal
  //      line at section boundaries — perceived as "page break."
  // Lush variant skips both filters and uses the denser cluster set so the
  // hero reads as a parted-sky field behind the floating logo. Desktop
  // unchanged in either mode.
  const isMobile =
    typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches;
  let activeClusters;
  if (lush) {
    activeClusters = LUSH_CLUSTERS;
  } else if (isMobile) {
    activeClusters = CLOUD_CLUSTERS.filter((c) => c.layer !== 0 && c.y >= 18 && c.y <= 70);
  } else {
    activeClusters = CLOUD_CLUSTERS;
  }

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 0 }}
    >
      {activeClusters.map((c, i) => {
        const op = Math.min(1, baseOp * LAYER_OPACITY_MULT[c.layer]);
        const h = c.w / 2.4; // ~2.4:1 aspect — wider than tall
        return (
          <div
            key={i}
            data-cloud-layer={c.layer}
            style={{
              position: 'absolute',
              left: `${c.x}%`,
              top: `${c.y}%`,
              width: c.w,
              height: h,
              opacity: op,
              filter: `blur(${LAYER_BLUR[c.layer]}px)`,
              willChange: 'transform',
            }}
          >
            <svg
              viewBox="0 0 200 80"
              preserveAspectRatio="none"
              width="100%"
              height="100%"
              style={{ display: 'block' }}
            >
              <path d={CLOUD_PATHS[c.variant]} fill={fill} />
            </svg>
          </div>
        );
      })}
    </div>
  );
}
