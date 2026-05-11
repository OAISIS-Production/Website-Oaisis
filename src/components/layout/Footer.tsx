import { Mail } from 'lucide-react';
import GlowLogo from '../ui/GlowLogo';

export default function Footer() {
  return (
    <footer
      className="relative text-night-text"
      style={{
        background: 'linear-gradient(135deg, #0C0A18 0%, #0A1525 45%, #081420 100%)',
      }}
    >
      <div className="h-[2px] gradient-signature" style={{ opacity: 0.85 }} />

      <div className="max-w-3xl mx-auto px-6 py-16 flex flex-col items-center text-center gap-6">
        <GlowLogo size={44} glow="night" />
        <span className="oaisis-wordmark-light">OAISIS</span>

        <p className="text-[13px] text-night-muted leading-[1.7] max-w-md italic">
          Guiding people into the Age of Intelligence
        </p>

        <a
          href="mailto:mail@openoaisis.com"
          className="inline-flex items-center gap-2 text-[12px] text-night-muted hover:text-sky-light transition-colors tracking-wide"
        >
          <Mail className="h-3.5 w-3.5" />
          mail@openoaisis.com
        </a>

        <p
          className="text-[8px] uppercase mt-2"
          style={{ color: '#B8AED0', letterSpacing: '2px' }}
        >
          &copy; 2026 OAISIS
        </p>
      </div>
    </footer>
  );
}
