import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { gsap, ScrollTrigger } from '../../lib/scroll';
import LogoMark from '../ui/LogoMark';

const VIDEO_WEBM = '/hero/oaisis-hero-dissolve.webm';
const VIDEO_MP4 = '/hero/oaisis-hero-dissolve.mp4';
const POSTER_JPG = '/hero/oaisis-hero-poster.jpg';

type Status = 'loading' | 'ready' | 'failed';

/**
 * Scroll-driven dissolve hero.
 *
 * Top of page: formed front-facing OAISIS logo against soft sky (first frame).
 * Scroll down 1 viewport-height: video scrubs through to white sky mist.
 * Text overlay fades IN over the same scroll range — pure handoff.
 * Reverse scroll reforms the logo.
 *
 * If the video assets aren't present yet (404), we fall back to a static
 * CSS sky + LogoMark hero with the text overlay shown immediately. The
 * scaffold renders meaningfully now and upgrades automatically the moment
 * the .webm / .mp4 / poster files land in public/hero/.
 *
 * prefers-reduced-motion: no scroll-driven anything. Just the poster (or
 * the static fallback) with all text visible.
 */
export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<Status>('loading');

  // Detect if the video assets are reachable. If not, drop the <video>
  // element entirely so the static fallback renders cleanly.
  useEffect(() => {
    let cancelled = false;
    // Probe with HEAD on the .mp4 — fastest single check.
    fetch(VIDEO_MP4, { method: 'HEAD' })
      .then((res) => {
        if (cancelled) return;
        setStatus(res.ok ? 'ready' : 'failed');
      })
      .catch(() => {
        if (!cancelled) setStatus('failed');
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // Wire the scroll-scrub once video is ready (or skip on reduced-motion / static).
  useEffect(() => {
    if (!sectionRef.current) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      // Show text overlay fully right away; no scroll animation.
      if (overlayRef.current) overlayRef.current.style.opacity = '1';
      return;
    }

    const video = videoRef.current;

    const setupScrub = () => {
      const ctx = gsap.context(() => {
        // 1) Scrub the video currentTime to scroll position.
        if (video && status === 'ready') {
          video.pause();
          gsap.to(video, {
            currentTime: video.duration || 4.5,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top top',
              end: '+=100%',
              scrub: 0.5,
            },
          });
        }

        // 2) Fade the text overlay IN as scroll progresses.
        if (overlayRef.current) {
          gsap.fromTo(
            overlayRef.current,
            { opacity: 0, y: 24 },
            {
              opacity: 1,
              y: 0,
              ease: 'none',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top top',
                end: '+=70%',
                scrub: 0.5,
              },
            }
          );
        }

        // 3) Fade the scroll cue OUT once user starts scrolling.
        if (scrollCueRef.current) {
          gsap.to(scrollCueRef.current, {
            opacity: 0,
            y: 12,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top top',
              end: '+=12%',
              scrub: true,
            },
          });
        }
      }, sectionRef);

      return () => {
        ctx.revert();
        ScrollTrigger.refresh();
      };
    };

    // If we're in static-fallback mode, just show the overlay immediately
    // and skip the video-scrub timeline.
    if (status === 'failed') {
      if (overlayRef.current) overlayRef.current.style.opacity = '1';
      const cleanup = setupScrub();
      return cleanup;
    }

    // Video path: wait for metadata so we know duration before scrubbing.
    if (status === 'ready' && video) {
      if (video.readyState >= 1) {
        return setupScrub();
      }
      const onMeta = () => {
        setupScrub();
      };
      video.addEventListener('loadedmetadata', onMeta, { once: true });
      return () => video.removeEventListener('loadedmetadata', onMeta);
    }
  }, [status]);

  const showVideo = status === 'ready';
  const showStaticLogo = status === 'failed';

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{
        height: '100vh',
        background:
          'linear-gradient(180deg, #93C5E8 0%, #D0E7F5 45%, #F0F5FA 80%, #F5EFE0 100%)',
      }}
    >
      {showVideo && (
        <video
          ref={videoRef}
          poster={POSTER_JPG}
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={VIDEO_WEBM} type="video/webm" />
          <source src={VIDEO_MP4} type="video/mp4" />
        </video>
      )}

      {showStaticLogo && (
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          aria-hidden="true"
        >
          <div
            className="hero-logo-float"
            style={{
              filter: 'drop-shadow(0 8px 36px rgba(91,160,212,0.35)) drop-shadow(0 0 80px rgba(255,255,255,0.5))',
            }}
          >
            <LogoMark size={Math.min(420, Math.floor(typeof window !== 'undefined' ? window.innerWidth * 0.32 : 280))} />
          </div>
        </div>
      )}

      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center 35%, transparent 38%, rgba(245,239,224,0.18) 100%)',
        }}
      />

      <div
        ref={overlayRef}
        className="relative z-10 w-full h-full flex flex-col items-center justify-center px-6 pointer-events-none"
        style={{ opacity: 0 }}
      >
        <motion.p
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: '4px',
            textTransform: 'uppercase',
            color: 'rgba(15,77,53,0.7)',
            textShadow: '0 1px 8px rgba(255,255,255,0.7)',
            marginTop: 'clamp(140px, 22vh, 240px)',
            marginBottom: 18,
          }}
        >
          The Intelligent Enterprise
        </motion.p>

        <div style={{ flex: 1 }} />

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="text-center mx-auto"
          style={{
            fontSize: 'clamp(20px, 2.6vw, 28px)',
            fontWeight: 300,
            color: '#0F4D35',
            letterSpacing: '-0.3px',
            lineHeight: 1.3,
            maxWidth: 640,
            textShadow: '0 2px 12px rgba(255,255,255,0.7)',
            marginBottom: 26,
          }}
        >
          The future of business, installed.
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="flex flex-col sm:flex-row gap-3 pointer-events-auto"
          style={{ marginBottom: 'clamp(80px, 14vh, 140px)' }}
        >
          <Link to="/demo" className="btn-hero-solid-warm">
            Book a demo
          </Link>
          <Link to="/pro-os" className="btn-hero-ghost-warm">
            See Pro OS
          </Link>
        </motion.div>
      </div>

      <div
        ref={scrollCueRef}
        className="absolute left-0 right-0 flex flex-col items-center pointer-events-none z-10"
        style={{ bottom: 28 }}
        aria-hidden="true"
      >
        <span
          style={{
            fontSize: 9,
            fontWeight: 600,
            letterSpacing: '3px',
            textTransform: 'uppercase',
            color: 'rgba(15,77,53,0.55)',
            marginBottom: 6,
          }}
        >
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          style={{ color: 'rgba(15,77,53,0.55)' }}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </div>
    </section>
  );
}
