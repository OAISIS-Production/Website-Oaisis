import { Link, useLocation } from 'react-router-dom';
import GlowLogo from '../ui/GlowLogo';

interface NavbarProps {
  scrolled: boolean;
}

export default function Navbar({ scrolled }: NavbarProps) {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const handleNavClick = (sectionId: string) => {
    if (isHomePage) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="sticky top-0 z-50 w-full">
      <nav
        className="transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(245,239,224,0.6)' : 'rgba(245,239,224,0.4)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderBottom: '1px solid rgba(220,201,160,0.3)',
          padding: '10px 28px',
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center gap-3">
              <GlowLogo size={36} glow="green" />
              <span className="oaisis-wordmark">OAISIS</span>
            </Link>
            <div className="hidden md:flex items-center gap-1">
              {[
                { label: 'About', id: 'about' },
                { label: 'Solutions', id: 'services' },
                { label: 'Process', id: 'method' },
                { label: 'Success Stories', id: 'case-studies' },
                { label: 'Resources', id: 'insights' },
                { label: 'Contact', id: 'contact' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className="text-[13px] font-medium tracking-wide text-brand-text/70 hover:text-emerald transition-colors px-3 py-1.5 rounded-lg hover:bg-sky/[0.06] hover:border-sky-light/[0.12]"
                >
                  {!isHomePage ? (
                    <Link to={`/#${item.id}`} className="block">
                      {item.label}
                    </Link>
                  ) : (
                    item.label
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
