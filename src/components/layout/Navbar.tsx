import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Menu,
  X,
  Sunrise,
  MessageCircle,
  Search,
  Mail,
  Bell,
  Settings,
  FileText,
  Wrench,
  Building2,
  UtensilsCrossed,
  Globe2,
  ChevronDown,
  Hammer,
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

const FEATURES_GROUPS: DropdownGroup[] = [
  {
    heading: 'Pro OS Capabilities',
    links: [
      { label: 'Morning Briefs', description: 'A read, not a dashboard.', href: '/pro-os#briefs', icon: Sunrise },
      { label: 'Ask Anything', description: 'Real answers, not chat.', href: '/pro-os#ask', icon: MessageCircle },
      { label: 'Lead Sourcing', description: 'Pipeline while you sleep.', href: '/pro-os#sourcing', icon: Search },
      { label: 'Outreach', description: 'Personalized, in your voice.', href: '/pro-os#outreach', icon: Mail },
      { label: 'Monitoring', description: 'Interrupts only when it matters.', href: '/pro-os#monitoring', icon: Bell },
      { label: 'Custom Workflows', description: 'In conversation, not code.', href: '/pro-os#workflows', icon: Settings },
    ],
  },
  {
    heading: 'Other Products',
    links: [
      {
        label: 'Invoice Intelligence',
        description: 'For multi-unit restaurants.',
        href: 'https://invoiceoasis.com',
        external: true,
        icon: FileText,
      },
      { label: 'Custom Builds', description: 'Built for your industry.', href: '/pro-os/general', icon: Hammer },
    ],
  },
];

const SOLUTIONS_GROUPS: DropdownGroup[] = [
  {
    heading: 'By industry',
    links: [
      { label: 'Home Services', description: 'HVAC, plumbing, field service.', href: '/pro-os/home-services', icon: Wrench },
      { label: 'Private Equity', description: '$100K savings in 60 days.', href: '/pro-os/private-equity', icon: Building2 },
      {
        label: 'Restaurants',
        description: 'Invoice Intelligence — live.',
        href: 'https://invoiceoasis.com',
        external: true,
        icon: UtensilsCrossed,
      },
      { label: 'Other / Custom', description: 'Anyone running on data.', href: '/pro-os/general', icon: Globe2 },
    ],
  },
];

const SIMPLE_LINKS: { label: string; href: string }[] = [
  { label: 'Pricing', href: '/pricing' },
  { label: 'Resources', href: '/resources' },
  { label: 'About', href: '/about' },
];

interface NavStyle {
  bg: string;
  border: string;
  linkColor: string;
  linkHoverColor: string;
  logoGlow: 'white' | 'green';
  wordmarkColor: string;
  wordmarkOpacity: number;
  loginColor: string;
}

function getNavStyle(transparent: boolean): NavStyle {
  if (transparent) {
    return {
      bg: 'transparent',
      border: '1px solid transparent',
      linkColor: 'rgba(255,255,255,0.85)',
      linkHoverColor: '#FFFFFF',
      logoGlow: 'white',
      wordmarkColor: '#FFFFFF',
      wordmarkOpacity: 0.7,
      loginColor: 'rgba(255,255,255,0.75)',
    };
  }
  return {
    bg: 'rgba(245,239,224,0.7)',
    border: '1px solid rgba(220,201,160,0.3)',
    linkColor: '#4D4060',
    linkHoverColor: '#2563A8',
    logoGlow: 'green',
    wordmarkColor: '#0F4D35',
    wordmarkOpacity: 0.5,
    loginColor: '#8A7DA0',
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

function MegaDropdown({ groups, width = 720, isOpen, onMouseEnter, onMouseLeave }: MegaDropdownProps) {
  if (!isOpen) return null;
  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        position: 'absolute',
        top: 'calc(100% + 6px)',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'min(calc(100vw - 32px), ' + width + 'px)',
        padding: 18,
        borderRadius: 18,
        background: 'rgba(255,255,255,0.88)',
        backdropFilter: 'blur(32px)',
        WebkitBackdropFilter: 'blur(32px)',
        border: '1px solid rgba(255,255,255,0.85)',
        boxShadow: '0 20px 60px rgba(15,77,53,0.16)',
        zIndex: 200,
      }}
    >
      <div
        className="grid gap-4"
        style={{
          gridTemplateColumns: groups.length > 1 ? '1fr 1fr' : '1fr',
        }}
      >
        {groups.map((group, gi) => (
          <div key={gi}>
            {group.heading && (
              <p
                style={{
                  fontSize: 9,
                  fontWeight: 600,
                  letterSpacing: '2.5px',
                  textTransform: 'uppercase',
                  color: '#1A6B4A',
                  marginBottom: 10,
                  padding: '0 10px',
                }}
              >
                {group.heading}
              </p>
            )}
            <div className="flex flex-col">
              {group.links.map((link) => {
                const Icon = link.icon;
                const inner = (
                  <div
                    className="flex items-start gap-3 transition-colors"
                    style={{
                      padding: '10px 10px',
                      borderRadius: 12,
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLDivElement).style.background = 'rgba(208,231,245,0.45)';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLDivElement).style.background = 'transparent';
                    }}
                  >
                    <div
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: 9,
                        background: 'rgba(212,240,220,0.6)',
                        border: '1px solid rgba(26,107,74,0.18)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#1A6B4A',
                        flexShrink: 0,
                      }}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p style={{ fontSize: 13, fontWeight: 600, color: '#2A1F38', lineHeight: 1.3 }}>
                        {link.label}
                      </p>
                      {link.description && (
                        <p style={{ fontSize: 12, color: '#4D4060', lineHeight: 1.4, marginTop: 2 }}>
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
          </div>
        ))}
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
    fontSize: 13,
    fontWeight: 500,
    letterSpacing: '0.2px',
    color: style.linkColor,
    padding: '8px 14px',
    borderRadius: 8,
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    transition: 'color 0.2s ease, background 0.2s ease',
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    gap: 4,
    textShadow: transparent ? '0 1px 6px rgba(37,99,168,0.18)' : 'none',
  };

  return (
    <div className="sticky top-0 z-[100] w-full">
      <nav
        className="transition-all duration-300"
        style={{
          background: style.bg,
          backdropFilter: transparent ? 'none' : 'blur(24px)',
          WebkitBackdropFilter: transparent ? 'none' : 'blur(24px)',
          borderBottom: transparent ? '1px solid transparent' : '1px solid rgba(220,201,160,0.3)',
          padding: '12px 24px',
        }}
      >
        <div className="max-w-7xl mx-auto relative">
          <div className="flex justify-between items-center gap-4">
            <Link to="/" className="flex items-center gap-2.5" onClick={() => setMobileOpen(false)}>
              <GlowLogo size={28} glow={style.logoGlow} />
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 300,
                  letterSpacing: 5,
                  color: style.wordmarkColor,
                  opacity: style.wordmarkOpacity,
                  textTransform: 'uppercase',
                  textShadow: transparent ? '0 1px 6px rgba(37,99,168,0.25)' : 'none',
                }}
              >
                OAISIS
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
              <button
                type="button"
                onMouseEnter={() => scheduleOpen('features')}
                onMouseLeave={scheduleClose}
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

              <button
                type="button"
                onMouseEnter={() => scheduleOpen('solutions')}
                onMouseLeave={scheduleClose}
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

              {SIMPLE_LINKS.map((link) => (
                <Link key={link.label} to={link.href} style={navLinkBaseStyle}>
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-2">
              <Link
                to="/login"
                style={{
                  fontSize: 13,
                  fontWeight: 500,
                  letterSpacing: '0.2px',
                  color: style.loginColor,
                  textDecoration: 'none',
                  padding: '8px 14px',
                  textShadow: transparent ? '0 1px 6px rgba(37,99,168,0.18)' : 'none',
                }}
              >
                Login
              </Link>
              <Link
                to="/demo"
                style={{
                  fontSize: 13,
                  fontWeight: 500,
                  letterSpacing: '0.2px',
                  color: transparent ? '#FFFFFF' : '#2563A8',
                  background: transparent ? 'rgba(255,255,255,0.10)' : 'rgba(208,231,245,0.45)',
                  border: transparent ? '1px solid rgba(255,255,255,0.4)' : '1px solid rgba(91,160,212,0.3)',
                  padding: '8px 16px',
                  borderRadius: 999,
                  textDecoration: 'none',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  transition: 'all 0.2s ease',
                }}
              >
                Start free
              </Link>
              <Link
                to="/demo"
                style={{
                  fontSize: 13,
                  fontWeight: 500,
                  letterSpacing: '0.2px',
                  color: transparent ? '#2A1F38' : '#FFFFFF',
                  background: transparent ? '#FFFFFF' : '#1A6B4A',
                  border: transparent ? '1px solid #FFFFFF' : '1px solid #1A6B4A',
                  padding: '8px 18px',
                  borderRadius: 999,
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                  boxShadow: transparent ? '0 6px 18px rgba(255,255,255,0.18)' : '0 4px 14px rgba(26,107,74,0.20)',
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

          <div
            onMouseEnter={cancelClose}
            onMouseLeave={scheduleClose}
            className="hidden md:block"
          >
            <MegaDropdown
              groups={FEATURES_GROUPS}
              width={680}
              isOpen={openDropdown === 'features'}
              onMouseEnter={cancelClose}
              onMouseLeave={scheduleClose}
            />
            <MegaDropdown
              groups={SOLUTIONS_GROUPS}
              width={360}
              isOpen={openDropdown === 'solutions'}
              onMouseEnter={cancelClose}
              onMouseLeave={scheduleClose}
            />
          </div>
        </div>
      </nav>

      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 top-[60px] z-40 overflow-y-auto"
          style={{
            background: 'rgba(245,239,224,0.95)',
            backdropFilter: 'blur(28px)',
            WebkitBackdropFilter: 'blur(28px)',
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
                          color: '#1A6B4A',
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
              style={{ borderTop: '1px solid rgba(220,201,160,0.35)', paddingTop: 16 }}
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
    </div>
  );
}
