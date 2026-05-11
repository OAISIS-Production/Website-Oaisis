import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import GlowLogo from '../ui/GlowLogo';

interface NavbarProps {
  scrolled?: boolean;
}

interface NavItem {
  label: string;
  href: string;
  sectionId?: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Products', href: '/#products', sectionId: 'products' },
  { label: 'Company', href: '/#manifesto', sectionId: 'manifesto' },
  { label: 'Demo', href: '/demo' },
];

export default function Navbar({ scrolled = false }: NavbarProps) {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!isHomePage) {
      setActiveSection(null);
      return;
    }
    const sectionIds = NAV_ITEMS.map((n) => n.sectionId).filter(Boolean) as string[];
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

  const isActive = (item: NavItem): boolean => {
    if (item.href === '/demo') return location.pathname.startsWith('/demo');
    if (item.sectionId && isHomePage) return activeSection === item.sectionId;
    return false;
  };

  const handleAnchorClick = (e: React.MouseEvent, item: NavItem) => {
    setMobileOpen(false);
    if (isHomePage && item.sectionId) {
      e.preventDefault();
      document.getElementById(item.sectionId)?.scrollIntoView({ behavior: 'smooth' });
      window.history.replaceState(null, '', `/#${item.sectionId}`);
    }
  };

  const linkStyle = (active: boolean): React.CSSProperties => ({
    background: active ? 'rgba(37,99,168,0.06)' : 'transparent',
    border: active ? '1px solid rgba(91,160,212,0.18)' : '1px solid transparent',
    color: active ? '#2563A8' : '#8A7DA0',
    borderRadius: 8,
    padding: '6px 14px',
    fontSize: 12.5,
    fontWeight: 500,
    letterSpacing: '0.2px',
    transition: 'all 0.2s ease',
    textDecoration: 'none',
    cursor: 'pointer',
  });

  return (
    <div className="sticky top-0 z-[100] w-full">
      <nav
        className="transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(245,239,224,0.72)' : 'rgba(245,239,224,0.6)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderBottom: '1px solid rgba(220,201,160,0.3)',
          padding: '10px 28px',
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center gap-4">
            <Link
              to="/"
              className="flex items-center gap-2.5"
              onClick={() => setMobileOpen(false)}
            >
              <GlowLogo size={28} glow="green" />
              <span className="oaisis-wordmark">OAISIS</span>
            </Link>

            <div className="hidden md:flex items-center gap-1">
              {NAV_ITEMS.map((item) => {
                const active = isActive(item);
                if (item.sectionId) {
                  return isHomePage ? (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={(e) => handleAnchorClick(e, item)}
                      style={linkStyle(active)}
                      onMouseEnter={(e) => {
                        if (!active) {
                          (e.currentTarget as HTMLAnchorElement).style.color = '#2563A8';
                          (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(91,160,212,0.04)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!active) {
                          (e.currentTarget as HTMLAnchorElement).style.color = '#8A7DA0';
                          (e.currentTarget as HTMLAnchorElement).style.background = 'transparent';
                        }
                      }}
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link key={item.label} to={item.href} style={linkStyle(active)}>
                      {item.label}
                    </Link>
                  );
                }
                return (
                  <Link key={item.label} to={item.href} style={linkStyle(active)}>
                    {item.label}
                  </Link>
                );
              })}
            </div>

            <button
              type="button"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden p-2 rounded-lg transition-colors"
              style={{ color: '#8A7DA0' }}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </nav>

      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 top-[56px] z-40"
          style={{
            background: 'rgba(245,239,224,0.92)',
            backdropFilter: 'blur(28px)',
            WebkitBackdropFilter: 'blur(28px)',
          }}
          onClick={() => setMobileOpen(false)}
        >
          <div className="px-6 py-8 flex flex-col gap-2" onClick={(e) => e.stopPropagation()}>
            {NAV_ITEMS.map((item) => {
              const active = isActive(item);
              const baseStyle: React.CSSProperties = {
                display: 'block',
                width: '100%',
                padding: '14px 16px',
                borderRadius: 12,
                fontSize: 15,
                fontWeight: 500,
                letterSpacing: '0.2px',
                border: '1px solid',
                textDecoration: 'none',
                background: active ? 'rgba(37,99,168,0.06)' : 'rgba(255,255,255,0.4)',
                borderColor: active ? 'rgba(91,160,212,0.25)' : 'rgba(220,201,160,0.3)',
                color: active ? '#2563A8' : '#2A1F38',
              };

              if (item.sectionId) {
                return isHomePage ? (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => handleAnchorClick(e, item)}
                    style={baseStyle}
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link key={item.label} to={item.href} onClick={() => setMobileOpen(false)} style={baseStyle}>
                    {item.label}
                  </Link>
                );
              }
              return (
                <Link key={item.label} to={item.href} onClick={() => setMobileOpen(false)} style={baseStyle}>
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
