type BlobColor = 'green' | 'blue' | 'tan' | 'emerald';

interface AmbientBlobProps {
  color?: BlobColor;
  size?: number;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  className?: string;
}

const colorMap: Record<BlobColor, string> = {
  green: 'rgba(26,107,74,0.06)',
  blue: 'rgba(37,99,168,0.06)',
  tan: 'rgba(160,128,80,0.06)',
  emerald: 'rgba(45,139,85,0.08)',
};

export default function AmbientBlob({
  color = 'green',
  size = 180,
  top,
  left,
  right,
  bottom,
  className = '',
}: AmbientBlobProps) {
  return (
    <div
      className={`absolute rounded-full pointer-events-none ${className}`}
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
    />
  );
}
