import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';

const ITEMS: Array<{ label: string; href: string; primary?: boolean }> = [
  { label: 'Oaisis OS', href: '/pro-os' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'About', href: '/about' },
  { label: 'Book a demo', href: '/demo', primary: true },
];

// Persistent floating bottom-pill nav. Fades in after the user scrolls past
// the hero (between 80vh and 120vh scroll), stays visible everywhere except
// the very top of the page. Mobile collapses to "Menu | Book demo".
export default function BottomPillNav() {
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const vh = window.innerHeight;
      const minShow = vh * 0.8;
      const maxShow = vh * 1.2;
      const t = Math.max(0, Math.min(1, (y - minShow) / (maxShow - minShow)));
      setVisible(t > 0.05);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 640px)');
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Hide on /demo to avoid duplicating the same CTA.
  if (location.pathname === '/demo') return null;

  return (
    <nav
      aria-label="Primary"
      className="fixed left-1/2"
      style={{
        bottom: 24,
        transform: 'translateX(-50%)',
        zIndex: 50,
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
        transition: 'opacity 320ms cubic-bezier(0.16,1,0.3,1)',
      }}
    >
      <div
        className="flex items-center"
        style={{
          gap: 4,
          background: 'rgba(255,255,255,0.70)',
          border: '1px solid rgba(255,255,255,0.45)',
          borderRadius: 999,
          padding: '8px',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          boxShadow: '0 8px 32px rgba(91,160,212,0.15), 0 2px 8px rgba(37,99,168,0.08)',
        }}
      >
        {isMobile ? (
          <>
            <button
              type="button"
              className="btn-magnetic"
              aria-label="Menu"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '10px 16px',
                borderRadius: 999,
                border: 'none',
                background: 'transparent',
                color: '#4A8BC2',
                fontSize: 13,
                fontWeight: 500,
              }}
            >
              <Menu className="w-4 h-4" />
              Menu
            </button>
            <span style={{ width: 1, height: 12, background: 'rgba(91,160,212,0.2)' }} />
            <Link
              to="/demo"
              className="btn-magnetic"
              data-idle-pulse
              style={{
                padding: '10px 18px',
                borderRadius: 999,
                background: '#5BA0D4',
                color: '#FFFFFF',
                fontSize: 13,
                fontWeight: 500,
                textDecoration: 'none',
                letterSpacing: '0.2px',
                boxShadow: '0 4px 14px rgba(37,99,168,0.25)',
              }}
            >
              Book demo
            </Link>
          </>
        ) : (
          ITEMS.map((item, i) => {
            const isLast = i === ITEMS.length - 1;
            return (
              <span key={item.href} className="inline-flex items-center" style={{ gap: 4 }}>
                <Link
                  to={item.href}
                  className={`btn-magnetic ${item.primary ? '' : ''}`}
                  data-idle-pulse={item.primary || undefined}
                  style={{
                    padding: '8px 16px',
                    borderRadius: 999,
                    fontSize: 14,
                    fontWeight: 500,
                    letterSpacing: '0.1px',
                    color: item.primary ? '#FFFFFF' : '#4A8BC2',
                    background: item.primary ? '#5BA0D4' : 'transparent',
                    textDecoration: 'none',
                    boxShadow: item.primary ? '0 4px 14px rgba(37,99,168,0.22)' : 'none',
                    transition: 'background 200ms ease, color 200ms ease',
                  }}
                  onMouseEnter={(e) => {
                    if (item.primary) {
                      (e.currentTarget as HTMLAnchorElement).style.background = '#4A8BC2';
                    } else {
                      (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(91,160,212,0.08)';
                      (e.currentTarget as HTMLAnchorElement).style.color = '#1F4F8F';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (item.primary) {
                      (e.currentTarget as HTMLAnchorElement).style.background = '#5BA0D4';
                    } else {
                      (e.currentTarget as HTMLAnchorElement).style.background = 'transparent';
                      (e.currentTarget as HTMLAnchorElement).style.color = '#4A8BC2';
                    }
                  }}
                >
                  {item.label}
                </Link>
                {!isLast && !item.primary && (
                  <span aria-hidden style={{ width: 1, height: 12, background: 'rgba(91,160,212,0.2)' }} />
                )}
              </span>
            );
          })
        )}
      </div>
    </nav>
  );
}
