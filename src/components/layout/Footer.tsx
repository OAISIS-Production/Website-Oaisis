import { Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import GlowLogo from '../ui/GlowLogo';
import CroppedWordmark from '../ui/CroppedWordmark';

const LINKS = [
  { label: 'Oaisis OS', href: '/pro-os' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'About', href: '/about' },
  { label: 'Demo', href: '/demo' },
];

// Global footer for non-home pages. Cropped wordmark band on top is the
// architectural exit; sky-blue content band below holds the navigation +
// contact details. Home gets its own integrated footer via FinalOasis.
export default function Footer() {
  return (
    <footer className="relative">
      {/* Wordmark on non-home pages — same white opacity treatment as the
          homepage (now that subpages share the body's deep-sky gradient).
          Smaller font (clamp 160/20vw/340) so the band does not overlap the
          footer nav directly below it. 80px paddingTop is built into the
          component for a clear gap above the wordmark. */}
      <CroppedWordmark
        background="transparent"
        color="rgba(255,255,255,0.30)"
        height={280}
        fontSize="clamp(160px, 20vw, 340px)"
        fontSizeMobile="clamp(100px, 20vw, 340px)"
        paddingTop={80}
      />
      <div
        style={{
          background: 'transparent',
          paddingTop: 40,
          paddingBottom: 36,
        }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div className="flex items-center gap-3">
              <GlowLogo size={32} glow="white" />
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 300,
                  letterSpacing: 5,
                  color: 'rgba(255,255,255,0.85)',
                  textTransform: 'uppercase',
                }}
              >
                OAISIS
              </span>
            </div>

            <nav className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
              {LINKS.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className="transition-colors"
                  style={{ fontSize: 13, fontWeight: 400, color: 'rgba(255,255,255,0.85)' }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color = '#FFFFFF';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.85)';
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <a
              href="mailto:hello@openoaisis.com"
              className="inline-flex items-center gap-2 transition-colors"
              style={{ fontSize: 12, color: 'rgba(255,255,255,0.85)', letterSpacing: '0.3px' }}
            >
              <Mail className="w-3.5 h-3.5" />
              hello@openoaisis.com
            </a>
          </div>

          <div
            className="mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3"
            style={{ borderTop: '1px solid rgba(91,160,212,0.25)' }}
          >
            <p
              style={{
                fontSize: 9,
                color: 'rgba(255,255,255,0.65)',
                letterSpacing: '2px',
                textTransform: 'uppercase',
              }}
            >
              &copy; 2026 OAISIS
            </p>
            <p
              style={{
                fontSize: 9,
                color: 'rgba(255,255,255,0.65)',
                letterSpacing: '2px',
                textTransform: 'uppercase',
              }}
            >
              Built in Dallas-Fort Worth · Guiding people into the Age of Intelligence
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
