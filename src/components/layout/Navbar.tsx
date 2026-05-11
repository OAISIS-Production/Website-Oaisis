import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import GlowLogo from '../ui/GlowLogo';

interface NavbarProps {
  scrolled: boolean;
}

const NAV_ITEMS = [
  { label: 'About', id: 'about' },
  { label: 'Solutions', id: 'services' },
  { label: 'Process', id: 'method' },
  { label: 'Success Stories', id: 'case-studies' },
  { label: 'Resources', id: 'insights' },
  { label: 'Contact', id: 'contact' },
];

const PATH_TO_SECTION: Record<string, string> = {
  '/services': 'services',
  '/insights': 'insights',
  '/case-studies': 'case-studies',
};

function activeFromPath(pathname: string): string | null {
  for (const prefix in PATH_TO_SECTION) {
    if (pathname.startsWith(prefix)) return PATH_TO_SECTION[prefix];
  }
  return null;
}

export default function Navbar({ scrolled }: NavbarProps) {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(
    isHomePage ? 'about' : activeFromPath(location.pathname)
  );

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!isHomePage) {
      setActiveSection(activeFromPath(location.pathname));
      return;
    }

    const sectionIds = NAV_ITEMS.map((n) => n.id);
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: '-30% 0px -55% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [isHomePage, location.pathname]);

  const handleNavClick = (sectionId: string) => {
    setMobileOpen(false);
    if (isHomePage) {
      const element = document.getElementById(sectionId);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const linkClassName = (active: boolean) =>
    [
      'text-[13px] font-medium tracking-wide transition-all px-3 py-1.5 rounded-lg border',
      active
        ? 'text-emerald bg-sky-pale/40 border-sky-light/40'
        : 'text-brand-text/75 border-transparent hover:text-emerald hover:bg-sky-pale/30 hover:border-sky-light/30',
    ].join(' ');

  return (
    <div className="sticky top-0 z-50 w-full">
      <nav
        className="transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(245,239,224,0.72)' : 'rgba(245,239,224,0.5)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderBottom: '1px solid rgba(220,201,160,0.3)',
          padding: '10px 28px',
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center gap-3" onClick={() => setMobileOpen(false)}>
              <GlowLogo size={36} glow="green" />
              <span className="oaisis-wordmark">OAISIS</span>
            </Link>

            <div className="hidden md:flex items-center gap-1">
              {NAV_ITEMS.map((item) => {
                const active = activeSection === item.id;
                return isHomePage ? (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={linkClassName(active)}
                  >
                    {item.label}
                  </button>
                ) : (
                  <Link key={item.id} to={`/#${item.id}`} className={linkClassName(active)}>
                    {item.label}
                  </Link>
                );
              })}
            </div>

            <button
              type="button"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden p-2 rounded-lg text-brand-text/70 hover:text-emerald hover:bg-sky-pale/30 transition-colors"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </nav>

      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 top-[64px] z-40"
          style={{
            background: 'rgba(245,239,224,0.85)',
            backdropFilter: 'blur(28px)',
            WebkitBackdropFilter: 'blur(28px)',
          }}
          onClick={() => setMobileOpen(false)}
        >
          <div
            className="px-6 py-8 flex flex-col gap-2"
            onClick={(e) => e.stopPropagation()}
          >
            {NAV_ITEMS.map((item) => {
              const active = activeSection === item.id;
              const baseClass =
                'block w-full text-left px-4 py-3 rounded-glass text-[14px] font-medium tracking-wide border transition-all';
              const stateClass = active
                ? 'text-emerald bg-sky-pale/50 border-sky-light/40'
                : 'text-brand-text/80 border-transparent hover:text-emerald hover:bg-sky-pale/40';
              return isHomePage ? (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`${baseClass} ${stateClass}`}
                >
                  {item.label}
                </button>
              ) : (
                <Link
                  key={item.id}
                  to={`/#${item.id}`}
                  onClick={() => setMobileOpen(false)}
                  className={`${baseClass} ${stateClass}`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
