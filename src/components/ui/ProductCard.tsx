import { Link } from 'react-router-dom';
import Glass from './Glass';
import { ArrowRight } from 'lucide-react';

interface ProductCardProps {
  variant: 'sky' | 'green' | 'blue';
  eyebrow: string;
  eyebrowColor: string;
  title: string;
  description: string;
  cta: {
    label: string;
    href: string;
    external?: boolean;
  };
  ctaColor: string;
}

export default function ProductCard({
  variant,
  eyebrow,
  eyebrowColor,
  title,
  description,
  cta,
  ctaColor,
}: ProductCardProps) {
  const ctaContent = (
    <>
      <span>{cta.label}</span>
      <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform group-hover/cta:translate-x-0.5" />
    </>
  );

  return (
    <Glass variant={variant} className="h-full flex flex-col group/card hover:-translate-y-0.5 transition-transform duration-300" style={{ padding: 28 }}>
      <p
        className="mb-4"
        style={{
          fontSize: 10,
          fontWeight: 600,
          letterSpacing: '3px',
          textTransform: 'uppercase',
          color: eyebrowColor,
        }}
      >
        {eyebrow}
      </p>

      <h3
        className="text-brand-text mb-4"
        style={{ fontSize: 22, fontWeight: 500, letterSpacing: '-0.2px', lineHeight: 1.25 }}
      >
        {title}
      </h3>

      <p
        className="text-brand-text-sec mb-7 flex-1"
        style={{ fontSize: 13, lineHeight: 1.65 }}
      >
        {description}
      </p>

      {cta.external ? (
        <a
          href={cta.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center group/cta"
          style={{ fontSize: 13, fontWeight: 500, color: ctaColor }}
        >
          {ctaContent}
        </a>
      ) : (
        <Link
          to={cta.href}
          className="inline-flex items-center group/cta"
          style={{ fontSize: 13, fontWeight: 500, color: ctaColor }}
        >
          {ctaContent}
        </Link>
      )}
    </Glass>
  );
}
