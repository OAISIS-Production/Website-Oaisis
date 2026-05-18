// Build the OpenGraph link-preview image at 1200×630.
// Composition matches the mobile hero "heaven aesthetic":
//   sky-blue vertical gradient → soft cumulus cloud silhouettes
//   → glowing OAISIS palm logo, no eyebrow text.
//
// SVG → PNG via sharp (librsvg). Run with: node scripts/build-og-image.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');

const W = 1200;
const H = 630;

// Embed the OAISIS palm logo as base64 so the SVG is self-contained
// (librsvg can't always resolve external file:// references reliably).
const logoBuf = readFileSync(path.join(repoRoot, 'public/brand/oaisis-logo-full.png'));
const logoB64 = `data:image/png;base64,${logoBuf.toString('base64')}`;
const LOGO_W = 460;
const LOGO_H = 460; // source PNG is square 250×250
const LOGO_X = (W - LOGO_W) / 2;
// Center the logo's geometric midpoint just above vertical center so the
// circle reads as the focal point (the wordmark in the logo sits below the
// circle and balances downward).
const LOGO_Y = (H - LOGO_H) / 2 - 12;

// Cloud silhouette paths (verbatim from src/components/ui/Clouds.tsx).
// Each path lives in a 200×80 viewBox; we scale + translate per instance.
const CLOUD_PATHS = [
  'M 6,58 Q 4,42 18,40 Q 22,22 38,26 Q 50,8 70,18 Q 86,6 104,20 Q 122,12 134,28 Q 158,28 162,46 Q 192,48 188,62 Q 130,72 70,68 Q 24,72 6,58 Z',
  'M 4,60 Q 0,46 14,42 Q 24,30 42,34 Q 56,16 78,24 Q 100,8 122,22 Q 144,16 156,32 Q 178,32 184,50 Q 196,52 194,64 Q 130,72 60,70 Q 24,74 4,60 Z',
  'M 8,64 Q 4,52 18,48 Q 26,34 44,38 Q 60,22 80,30 Q 96,10 122,18 Q 144,8 162,26 Q 186,28 188,46 Q 196,52 192,66 Q 130,72 60,70 Q 22,74 8,64 Z',
  'M 0,62 Q 6,52 22,54 Q 32,40 50,42 Q 62,28 84,32 Q 102,18 124,26 Q 144,20 156,38 Q 178,40 182,54 Q 192,58 188,68 Q 124,74 60,72 Q 18,74 0,62 Z',
  'M 12,60 Q 8,46 22,42 Q 30,28 48,30 Q 62,18 80,26 Q 98,12 118,22 Q 138,18 150,34 Q 172,36 176,50 Q 186,52 182,64 Q 130,70 70,68 Q 28,72 12,60 Z',
];

// Curated cluster set for the 1200×630 OG canvas. Mix of three visual layers
// (back/mid/front) with progressively crisper edges, similar to the live
// Clouds component's parallax tiers — except here all clouds are static.
//   layer 0 (back): heavy blur, lower opacity, drifting along the horizon
//   layer 1 (mid):  medium blur, mid opacity
//   layer 2 (front): light blur, full opacity, anchors the foreground
const CLUSTERS = [
  // back layer — soft horizon haze
  { x: -80, y: 40, w: 600, variant: 0, layer: 0 },
  { x: 380, y: 60, w: 580, variant: 2, layer: 0 },
  { x: 820, y: 90, w: 520, variant: 1, layer: 0 },
  { x: -40, y: 320, w: 540, variant: 3, layer: 0 },
  { x: 720, y: 340, w: 560, variant: 4, layer: 0 },
  // mid layer
  { x: 80, y: 180, w: 420, variant: 4, layer: 1 },
  { x: 720, y: 200, w: 440, variant: 2, layer: 1 },
  { x: 60, y: 460, w: 480, variant: 1, layer: 1 },
  { x: 700, y: 480, w: 460, variant: 0, layer: 1 },
  // front layer — closer, crisper
  { x: 200, y: 110, w: 280, variant: 3, layer: 2 },
  { x: 760, y: 100, w: 260, variant: 4, layer: 2 },
  { x: 140, y: 510, w: 320, variant: 0, layer: 2 },
  { x: 780, y: 520, w: 300, variant: 1, layer: 2 },
];

const LAYER_BLUR_PX = [16, 8, 3];
const LAYER_OPACITY = [0.32, 0.55, 0.85];

const cloudGroups = CLUSTERS.map((c) => {
  const scale = c.w / 200; // source viewBox is 200×80
  const h = 80 * scale;
  const blur = LAYER_BLUR_PX[c.layer];
  const op = LAYER_OPACITY[c.layer];
  return `
    <g transform="translate(${c.x} ${c.y}) scale(${scale})"
       opacity="${op}" filter="url(#cloudBlur${c.layer})">
      <path d="${CLOUD_PATHS[c.variant]}" fill="#FFFFFF"/>
    </g>`;
}).join('\n');

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg"
     xmlns:xlink="http://www.w3.org/1999/xlink"
     width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#7FB9EC"/>
      <stop offset="100%" stop-color="#5BA0D4"/>
    </linearGradient>
    <filter id="cloudBlur0" x="-25%" y="-25%" width="150%" height="150%">
      <feGaussianBlur stdDeviation="${LAYER_BLUR_PX[0]}"/>
    </filter>
    <filter id="cloudBlur1" x="-25%" y="-25%" width="150%" height="150%">
      <feGaussianBlur stdDeviation="${LAYER_BLUR_PX[1]}"/>
    </filter>
    <filter id="cloudBlur2" x="-25%" y="-25%" width="150%" height="150%">
      <feGaussianBlur stdDeviation="${LAYER_BLUR_PX[2]}"/>
    </filter>
    <!-- Three stacked drop-shadows on the logo — mirrors the .hero-glow-logo
         filter stack: tight bright white, mid white, wide soft sky-blue. -->
    <filter id="logoGlow" x="-60%" y="-60%" width="220%" height="220%">
      <feDropShadow dx="0" dy="0" stdDeviation="14" flood-color="#FFFFFF" flood-opacity="0.55"/>
      <feDropShadow dx="0" dy="0" stdDeviation="28" flood-color="#FFFFFF" flood-opacity="0.30"/>
      <feDropShadow dx="0" dy="0" stdDeviation="48" flood-color="#93C5E8" flood-opacity="0.20"/>
    </filter>
  </defs>

  <!-- Sky -->
  <rect width="${W}" height="${H}" fill="url(#sky)"/>

  <!-- Clouds -->
  ${cloudGroups}

  <!-- Glowing OAISIS logo, centered -->
  <image x="${LOGO_X}" y="${LOGO_Y}" width="${LOGO_W}" height="${LOGO_H}"
         xlink:href="${logoB64}" filter="url(#logoGlow)"/>
</svg>
`;

const svgPath = path.join(repoRoot, 'scripts/og-image.svg');
writeFileSync(svgPath, svg, 'utf8');

const outPath = path.join(repoRoot, 'public/og-image.png');
await sharp(Buffer.from(svg), { density: 144 })
  .resize(W, H, { fit: 'cover' })
  .png({ compressionLevel: 9 })
  .toFile(outPath);

console.log(`Wrote ${outPath}`);
