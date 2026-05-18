type BlobColor = 'white' | 'sky' | 'deep';

interface AmbientBlobProps {
  color?: BlobColor;
  size?: number;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  className?: string;
  animate?: boolean;
}

// Sky-blue world only. White wash, sky-blue, and deeper-blue at low opacity.
const colorMap: Record<BlobColor, string> = {
  white: 'rgba(255,255,255,0.08)',
  sky: 'rgba(147,197,232,0.06)',
  deep: 'rgba(91,160,212,0.04)',
};

export default function AmbientBlob({
  color = 'sky',
  size = 180,
  top,
  left,
  right,
  bottom,
  className = '',
  animate = true,
}: AmbientBlobProps) {
  return (
    <div
      className={`ambient-blob absolute rounded-full pointer-events-none ${animate ? 'animate-float' : ''} ${className}`}
      style={{
        width: size,
        height: size,
        background: colorMap[color],
        filter: 'blur(45px)',
        top,
        left,
        right,
        bottom,
      }}
      aria-hidden="true"
    />
  );
}
