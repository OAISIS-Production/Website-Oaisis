import { Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import GlowLogo from '../ui/GlowLogo';

export default function Footer() {
  const handleQuickLinkClick = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer
      className="relative text-night-text"
      style={{
        background: 'linear-gradient(135deg, #0C0A18, #0A1525, #081420)',
      }}
    >
      {/* Signature gradient accent line */}
      <div className="h-px gradient-signature" />

      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="grid md:grid-cols-3 gap-12">
          <div>
            <div className="mb-6">
              <span className="text-lg font-extralight tracking-wide text-night-text">
                Optimized AI Systems Integrated Solutions
              </span>
            </div>
            <p className="text-night-muted text-sm leading-relaxed">
              Guiding people into the Age of Intelligence
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-4 text-night-text">Quick Links</h3>
            <ul className="space-y-2 text-night-muted text-sm">
              {[
                { label: 'About', id: 'about' },
                { label: 'Solutions', id: 'services' },
                { label: 'Process', id: 'method' },
                { label: 'Success Stories', id: 'case-studies' },
                { label: 'Resources', id: 'insights' },
                { label: 'Contact', id: 'contact' },
              ].map((item) => (
                <li key={item.id}>
                  <Link
                    to={`/#${item.id}`}
                    onClick={() => handleQuickLinkClick(item.id)}
                    className="hover:text-sky-light transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-4 text-night-text">Contact</h3>
            <div className="text-night-muted text-sm mb-8">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                mail@openoaisis.com
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-sm mb-4 text-night-text">Newsletter</h3>
              <p className="text-night-muted text-sm mb-4">Stay updated with AI trends</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 rounded-l-lg text-sm bg-night-surface border border-white/5 text-night-text placeholder-night-muted"
                />
                <button className="bg-emerald px-4 py-2 rounded-r-lg hover:bg-emerald-deep transition-colors text-white text-sm font-medium">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-6 border-t border-tan/[0.15] text-center">
          <div className="flex flex-col items-center gap-4">
            <GlowLogo size={36} glow="moonlit" />
            <p className="text-[8px] tracking-[2px] uppercase text-brand-text-light">
              &copy; 2026 OAISIS
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
