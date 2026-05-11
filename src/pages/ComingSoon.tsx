import { Link } from 'react-router-dom';
import GlowLogo from '../components/ui/GlowLogo';
import Glass from '../components/ui/Glass';

interface ComingSoonProps {
  title: string;
  eyebrow?: string;
}

export default function ComingSoon({ title, eyebrow = 'In Build' }: ComingSoonProps) {
  return (
    <main className="min-h-[70vh] flex items-center justify-center px-6">
      <div className="w-full" style={{ maxWidth: 560 }}>
        <Glass variant="glow" className="text-center" style={{ padding: 'clamp(36px, 5vw, 52px)' }}>
          <div className="flex justify-center mb-6">
            <GlowLogo size={80} glow="green" />
          </div>
          <p
            className="mb-4"
            style={{
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: '3px',
              textTransform: 'uppercase',
              color: '#1A6B4A',
            }}
          >
            {eyebrow}
          </p>
          <h1
            className="display-heading text-brand-text mb-6"
            style={{ fontSize: 'clamp(28px, 4vw, 38px)' }}
          >
            {title}
          </h1>
          <p
            className="text-brand-text-sec mb-8 mx-auto"
            style={{ fontSize: 14, lineHeight: 1.7, maxWidth: '52ch' }}
          >
            This page is rolling out as part of the Pro OS launch. The homepage and Pro OS deep-dive go live first.
          </p>
          <Link to="/" className="btn-primary-emerald">
            Back to homepage
          </Link>
        </Glass>
      </div>
    </main>
  );
}
