import { CSSProperties } from 'react';

interface LogoMarkProps {
  size?: number;
  className?: string;
  style?: CSSProperties;
}

export default function LogoMark({ size = 40, className = '', style }: LogoMarkProps) {
  return (
    <img
      src="/assets/images/logo.png"
      alt="OAISIS"
      width={size}
      height={size}
      className={className}
      style={{ width: size, height: size, objectFit: 'contain', display: 'block', ...style }}
    />
  );
}
