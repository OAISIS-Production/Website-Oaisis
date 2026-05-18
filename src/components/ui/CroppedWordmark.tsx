// OAISIS wordmark band — thin, wide, full-bleed brand moment.
// Renders the 6-letter word at viewport-relative scale (default
// clamp(220px, 28vw, 480px) for the homepage's deeper-sky footer) with
// weight 200 for an elegant architectural feel. A built-in paddingTop
// of 80px guarantees a clear gap to whatever content sits above the band.
interface CroppedWordmarkProps {
  /** Background color the band sits on (transparent lets body gradient show). */
  background?: string;
  /** Text color. */
  color?: string;
  /** Container height in px (sets the rendered glyph row's vertical box). */
  height?: number;
  /** Font-size CSS value — pass a smaller clamp for lighter subpage layouts. */
  fontSize?: string;
  /** Mobile (<768px) font-size override. Defaults to a reduced floor of the
   *  same desktop clamp so the wordmark doesn't overflow the viewport at
   *  375–390px while keeping the desktop clamp untouched at md: and above. */
  fontSizeMobile?: string;
  /** Top padding (px number or CSS string) — gap above the wordmark band. */
  paddingTop?: number | string;
  /** Bottom padding (px number or CSS string) — gap below the band. Default
   *  clamp(80px, 10vh, 140px) keeps the rendered glyph well clear of any
   *  footer-nav row that follows in document flow. */
  paddingBottom?: number | string;
}

export default function CroppedWordmark({
  background = 'transparent',
  color = 'rgba(255,255,255,0.30)',
  height = 360,
  fontSize = 'clamp(220px, 28vw, 480px)',
  fontSizeMobile = 'clamp(120px, 28vw, 480px)',
  paddingTop = 80,
  paddingBottom = 'clamp(80px, 10vh, 140px)',
}: CroppedWordmarkProps) {
  return (
    <div
      aria-hidden="true"
      className="relative flex items-center justify-center"
      style={{
        background,
        height,
        paddingTop,
        paddingBottom,
        overflow: 'visible',
        width: '100vw',
        maxWidth: '100vw',
        // Pull the band outside any container's horizontal gutters so the
        // wordmark spans true viewport edge-to-edge regardless of parent.
        marginLeft: 'calc(50% - 50vw)',
        marginRight: 'calc(50% - 50vw)',
        boxSizing: 'content-box',
      }}
    >
      <span
        // cropped-wordmark-glyph: CSS-defined font-size that reads from a
        // CSS variable. At ≥768px the variable is the desktop fontSize; at
        // <768px a media query in src/index.css swaps it to fontSizeMobile.
        // Inline style sets the var via React — no inline font-size, so the
        // CSS rule can media-scope it without an !important override.
        className="cropped-wordmark-glyph pointer-events-none select-none block text-center"
        style={{
          fontFamily: "'Inter', sans-serif",
          fontWeight: 200,
          letterSpacing: '-0.02em',
          lineHeight: 1,
          color,
          whiteSpace: 'nowrap',
          width: '100vw',
          maxWidth: '100vw',
          ['--wordmark-font-size' as string]: fontSize,
          ['--wordmark-font-size-mobile' as string]: fontSizeMobile,
        }}
      >
        OAISIS
      </span>
    </div>
  );
}
