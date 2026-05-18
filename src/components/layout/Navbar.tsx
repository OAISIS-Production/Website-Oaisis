import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Menu,
  X,
  MessageCircle,
  Settings,
  FileText,
  Building2,
  Globe2,
  Factory,
  ChevronDown,
} from 'lucide-react';
import GlowLogo from '../ui/GlowLogo';

interface NavbarProps {
  scrolled?: boolean;
}

interface MenuLink {
  label: string;
  description?: string;
  href: string;
  external?: boolean;
  icon: React.ComponentType<{ className?: string }>;
}

interface DropdownGroup {
  heading?: string;
  links: MenuLink[];
}

// Features = products + about. Solutions = industries.
const FEATURES_GROUPS: DropdownGroup[] = [
  {
    links: [
      { label: 'Oaisis OS', description: 'The operating layer.', href: '/pro-os', icon: Settings },
      {
        label: 'Invoice Intelligence',
        description: 'AP automation for multi-unit operators.',
        href: 'https://oaisis-dev.github.io/invoice-intelligence-landing-page/#pricing',
        external: true,
        icon: FileText,
      },
      { label: 'About', description: 'Why we built this.', href: '/about', icon: MessageCircle },
    ],
  },
];

const SOLUTIONS_GROUPS: DropdownGroup[] = [
  {
    links: [
      { label: 'Private Equity', description: 'Portfolio-wide AI deployment.', href: '/pro-os/private-equity', icon: Building2 },
      { label: 'Manufacturing', description: 'Inbound. Production. Outbound.', href: '/pro-os/manufacturing', icon: Factory },
      { label: 'Every other industry', description: 'Tell us what you do.', href: '/pro-os/general', icon: Globe2 },
    ],
  },
];

const SIMPLE_LINKS: { label: string; href: string }[] = [
  { label: 'Pricing', href: '/pricing' },
  { label: 'About', href: '/about' },
];

interface NavStyle {
  bg: string;
  border: string;
  linkColor: string;
  linkHoverColor: string;
  logoGlow: 'white' | 'deep';
  wordmarkColor: string;
  wordmarkOpacity: number;
  loginColor: string;
}

// v13.3: floating glass pill nav. Sky-blue tint over backdrop blur, all text
// white. The "Book a demo" pill is the only navy-text element on the site.
function getNavStyle(_transparent: boolean): NavStyle {
  return {
    bg: 'rgba(91,160,212,0.35)',
    border: '1px solid rgba(255,255,255,0.25)',
    linkColor: '#FFFFFF',
    linkHoverColor: '#FFFFFF',
    logoGlow: 'white',
    wordmarkColor: '#FFFFFF',
    wordmarkOpacity: 1,
    loginColor: 'rgba(255,255,255,0.85)',
  };
}

interface MegaDropdownProps {
  groups: DropdownGroup[];
  width?: number;
  isOpen: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  textShadow?: boolean;
}

function MegaDropdown({ groups, width = 260, isOpen, onMouseEnter, onMouseLeave }: MegaDropdownProps) {
  if (!isOpen) return null;
  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        position: 'absolute',
        // Sit flush against nav, then offset visually via padding so the
        // cursor never leaves the hit area when crossing the gap.
        top: '100%',
        left: '50%',
        transform: 'translateX(-50%)',
        minWidth: width,
        maxWidth: 'min(calc(100vw - 32px), 480px)',
        paddingTop: 8,
        zIndex: 200,
      }}
    >
    <div
      style={{
        padding: 12,
        borderRadius: 16,
        // Refractive glass — no blue tint, picks up environment color.
        background: 'rgba(255,255,255,0.08)',
        backdropFilter: 'blur(48px) saturate(180%)',
        WebkitBackdropFilter: 'blur(48px) saturate(180%)',
        border: '1px solid rgba(255,255,255,0.25)',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.45), 0 12px 40px rgba(15,42,74,0.20)',
      }}
    >
      <div className="flex flex-col" style={{ gap: 2 }}>
        {groups.map((group, gi) => (
          <div key={gi} className="flex flex-col">
            {group.links.map((link) => {
              const Icon = link.icon;
              const inner = (
                <div
                  className="flex items-start gap-3 transition-colors"
                  style={{
                    padding: '10px 14px',
                    borderRadius: 8,
                    background: 'transparent',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.10)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.background = 'transparent';
                  }}
                >
                  <div
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: 8,
                      background: 'rgba(255,255,255,0.18)',
                      border: '1px solid rgba(255,255,255,0.28)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#FFFFFF',
                      flexShrink: 0,
                    }}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p style={{ fontSize: 13, fontWeight: 500, color: '#FFFFFF', lineHeight: 1.3, fontFamily: "'Inter', sans-serif" }}>
                      {link.label}
                    </p>
                    {link.description && (
                      <p style={{ fontSize: 11.5, color: 'rgba(255,255,255,0.7)', lineHeight: 1.4, marginTop: 2, fontFamily: "'Inter', sans-serif" }}>
                        {link.description}
                      </p>
                    )}
                  </div>
                </div>
              );
              return link.external ? (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: 'none' }}
                  >
                    {inner}
                  </a>
                ) : (
                  <Link key={link.label} to={link.href} style={{ textDecoration: 'none' }}>
                    {inner}
                  </Link>
                );
              })}
            </div>
        ))}
      </div>
    </div>
    </div>
  );
}

export default function Navbar({ scrolled = false }: NavbarProps) {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const transparent = isHome && !scrolled;
  const style = getNavStyle(transparent);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<'features' | 'solutions' | null>(null);
  const openTimerRef = useRef<number | null>(null);
  const closeTimerRef = useRef<number | null>(null);

  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
  }, [location.pathname]);

  const scheduleOpen = (which: 'features' | 'solutions') => {
    if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
    if (openTimerRef.current) window.clearTimeout(openTimerRef.current);
    openTimerRef.current = window.setTimeout(() => setOpenDropdown(which), 100);
  };

  const scheduleClose = () => {
    if (openTimerRef.current) window.clearTimeout(openTimerRef.current);
    if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
    closeTimerRef.current = window.setTimeout(() => setOpenDropdown(null), 200);
  };

  const cancelClose = () => {
    if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
  };

  const navLinkBaseStyle: React.CSSProperties = {
    fontSize: 14,
    fontWeight: 600,
    letterSpacing: '0.1px',
    color: style.linkColor,
    padding: '6px 14px',
    borderRadius: 999,
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    transition: 'color 0.2s ease, background 0.2s ease',
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    gap: 4,
    fontFamily: "'Inter', sans-serif",
  };

  return (
    <>
    <div
      className="fixed left-1/2 z-[100]"
      style={{
        top: 16,
        transform: 'translateX(-50%)',
        width: 'min(820px, calc(100vw - 32px))',
      }}
    >
      <nav
        className="nav-liquid-glass"
        style={{
          // Thin sheet of clear glass — lower tint (0.04), reduced blur (24px)
          // so page color refracts through visibly instead of being frosted
          // out. Padding pulled back to 12px vertical for a slim profile.
          background: 'rgba(255,255,255,0.04)',
          backdropFilter: 'blur(24px) saturate(160%)',
          WebkitBackdropFilter: 'blur(24px) saturate(160%)',
          border: '1px solid rgba(255,255,255,0.16)',
          borderRadius: 999,
          padding: '12px 24px',
          boxShadow: [
            '0 6px 24px rgba(0,0,0,0.06)',
            'inset 0 1px 0 rgba(255,255,255,0.22)',
            'inset 0 -1px 0 rgba(255,255,255,0.06)',
          ].join(', '),
        }}
      >
        <div className="relative">
          <div className="flex justify-between items-center gap-3" style={{ height: 36 }}>
            <Link to="/" className="flex items-center gap-2.5" onClick={() => setMobileOpen(false)}>
              <GlowLogo size={26} glow={style.logoGlow} />
              <span
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  letterSpacing: 3.5,
                  color: style.wordmarkColor,
                  opacity: style.wordmarkOpacity,
                  textTransform: 'uppercase',
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                OAISIS
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
              <div style={{ position: 'relative' }} onMouseLeave={scheduleClose}>
                <button
                  type="button"
                  onMouseEnter={() => scheduleOpen('features')}
                  onClick={() => setOpenDropdown(openDropdown === 'features' ? null : 'features')}
                  style={navLinkBaseStyle}
                  aria-expanded={openDropdown === 'features'}
                  aria-haspopup="true"
                >
                  Features
                  <ChevronDown
                    className="w-3 h-3"
                    style={{ transform: openDropdown === 'features' ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}
                  />
                </button>
                <MegaDropdown
                  groups={FEATURES_GROUPS}
                  width={320}
                  isOpen={openDropdown === 'features'}
                  onMouseEnter={cancelClose}
                  onMouseLeave={scheduleClose}
                />
              </div>

              <div style={{ position: 'relative' }} onMouseLeave={scheduleClose}>
                <button
                  type="button"
                  onMouseEnter={() => scheduleOpen('solutions')}
                  onClick={() => setOpenDropdown(openDropdown === 'solutions' ? null : 'solutions')}
                  style={navLinkBaseStyle}
                  aria-expanded={openDropdown === 'solutions'}
                  aria-haspopup="true"
                >
                  Solutions
                  <ChevronDown
                    className="w-3 h-3"
                    style={{ transform: openDropdown === 'solutions' ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}
                  />
                </button>
                <MegaDropdown
                  groups={SOLUTIONS_GROUPS}
                  width={340}
                  isOpen={openDropdown === 'solutions'}
                  onMouseEnter={cancelClose}
                  onMouseLeave={scheduleClose}
                />
              </div>

              {SIMPLE_LINKS.map((link) => (
                <Link key={link.label} to={link.href} style={navLinkBaseStyle}>
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="hidden md:flex items-center">
              <Link
                to="/demo"
                className="btn-magnetic"
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  letterSpacing: '0.1px',
                  color: '#0F2A4A',
                  background: '#FFFFFF',
                  border: '1px solid rgba(255,255,255,0.95)',
                  padding: '8px 18px',
                  borderRadius: 999,
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 4px 14px rgba(15,42,74,0.18)',
                  fontFamily: "'Inter', sans-serif",
                  lineHeight: 1,
                }}
              >
                Book a demo
              </Link>
            </div>

            <button
              type="button"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden p-2 rounded-lg transition-colors"
              style={{ color: style.linkColor }}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

        </div>
      </nav>
    </div>

      {/* Mobile drawer — rendered OUTSIDE the transformed parent so its
          `position: fixed` resolves to the viewport (not the 343-px-wide
          centered nav wrapper). The wrapper above uses transform:
          translateX(-50%) which creates a containing block for fixed-
          position descendants — that bug kept the drawer constrained
          to the pill's footprint and made the hamburger appear non-
          functional. z-[110] so the drawer sits above the nav pill
          (z-[100]) when open. md:hidden gates the entire drawer off the
          DOM at ≥768px, so desktop is unchanged. */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 top-[88px] z-[90] overflow-y-auto"
          style={{
            background: 'rgba(240,247,253,0.95)',
            backdropFilter: 'blur(28px)',
            WebkitBackdropFilter: 'blur(28px)',
            maxHeight: 'calc(100vh - 88px)',
            WebkitOverflowScrolling: 'touch',
            // Sits BELOW the nav. top-[88px] = nav-top (16px) + nav-height
            // (60px) + 12px gap = 88px. z-[90] is below the nav wrapper's
            // z-[100] so the nav pill stays visible above the drawer.
            // All four corners rounded — reads as a floating panel below
            // the nav rather than attached to it flush.
            borderRadius: 24,
          }}
        >
          <div className="px-6 py-8 flex flex-col gap-5">
            {[FEATURES_GROUPS, SOLUTIONS_GROUPS].map((groups, gi) => (
              <div key={gi}>
                {groups.map((group, i) => (
                  <div key={i} className="mb-5">
                    {group.heading && (
                      <p
                        style={{
                          fontSize: 9,
                          fontWeight: 600,
                          letterSpacing: '3px',
                          textTransform: 'uppercase',
                          color: '#2563A8',
                          marginBottom: 10,
                          padding: '0 8px',
                        }}
                      >
                        {group.heading}
                      </p>
                    )}
                    <div className="flex flex-col gap-1">
                      {group.links.map((link) =>
                        link.external ? (
                          <a
                            key={link.label}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => setMobileOpen(false)}
                            style={{
                              padding: '12px',
                              borderRadius: 10,
                              fontSize: 14,
                              fontWeight: 500,
                              color: '#2A1F38',
                              textDecoration: 'none',
                            }}
                          >
                            {link.label}
                          </a>
                        ) : (
                          <Link
                            key={link.label}
                            to={link.href}
                            onClick={() => setMobileOpen(false)}
                            style={{
                              padding: '12px',
                              borderRadius: 10,
                              fontSize: 14,
                              fontWeight: 500,
                              color: '#2A1F38',
                              textDecoration: 'none',
                            }}
                          >
                            {link.label}
                          </Link>
                        )
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ))}

            <div
              style={{ borderTop: '1px solid rgba(91,160,212,0.35)', paddingTop: 16 }}
              className="flex flex-col gap-2"
            >
              {SIMPLE_LINKS.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    padding: '12px',
                    borderRadius: 10,
                    fontSize: 15,
                    fontWeight: 500,
                    color: '#2A1F38',
                    textDecoration: 'none',
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-2 mt-2">
              <Link
                to="/demo"
                onClick={() => setMobileOpen(false)}
                className="btn-ghost-sky"
                style={{ borderRadius: 999 }}
              >
                Start free
              </Link>
              <Link
                to="/demo"
                onClick={() => setMobileOpen(false)}
                className="btn-primary-emerald"
                style={{ borderRadius: 999 }}
              >
                Book a demo
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
