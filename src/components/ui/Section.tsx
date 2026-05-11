import { CSSProperties, ReactNode } from 'react';

interface SectionProps {
  id?: string;
  className?: string;
  background?: string;
  paddingY?: number | string;
  maxWidth?: number | string;
  children: ReactNode;
  style?: CSSProperties;
}

export default function Section({
  id,
  className = '',
  background,
  paddingY,
  maxWidth = 1080,
  children,
  style = {},
}: SectionProps) {
  return (
    <section
      id={id}
      className={`relative overflow-hidden ${className}`}
      style={{
        background,
        paddingTop: paddingY ?? 'clamp(56px, 8vw, 100px)',
        paddingBottom: paddingY ?? 'clamp(56px, 8vw, 100px)',
        ...style,
      }}
    >
      <div
        className="relative mx-auto px-6"
        style={{ maxWidth: typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth }}
      >
        {children}
      </div>
    </section>
  );
}
