import { useEffect } from 'react';

// Three global cinematic behaviors wired once at the app root:
// (a) Magnetic CTAs — within 100px the button translates up to 6px toward
//     the cursor; smooth release on exit.
// (b) Idle CTA pulse — after 4s of inactivity, opted-in CTAs run a 1.5s
//     scale-+-shadow pulse, rest 4s, repeat. Resets on any interaction.
// (c) Scroll-velocity blur — when scroll velocity exceeds ~1000px/s, the
//     section content gets up to ~5px blur, smoothly returning to 0.
// All three are vanilla JS — no library, no per-component wiring.
export function useCinematicGlobals() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    // ---------------- Magnetic CTAs ----------------
    const MAGNET_RADIUS = 100;
    const MAGNET_STRENGTH = 6;
    const magneticTargets = () => Array.from(document.querySelectorAll<HTMLElement>('.btn-magnetic'));

    let mouseX = 0;
    let mouseY = 0;
    let magneticRaf = 0;

    function applyMagnetic() {
      const els = magneticTargets();
      els.forEach((el) => {
        const r = el.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const dx = mouseX - cx;
        const dy = mouseY - cy;
        const dist = Math.hypot(dx, dy);
        if (dist < MAGNET_RADIUS) {
          const f = (1 - dist / MAGNET_RADIUS) * MAGNET_STRENGTH;
          el.style.transform = `translate(${(dx / dist) * f}px, ${(dy / dist) * f}px)`;
        } else if (el.style.transform) {
          el.style.transform = '';
        }
      });
      magneticRaf = 0;
    }

    function onMove(e: MouseEvent) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!magneticRaf) magneticRaf = requestAnimationFrame(applyMagnetic);
    }
    window.addEventListener('pointermove', onMove, { passive: true });

    // ---------------- Idle CTA pulse (loops) ----------------
    const IDLE_MS = 4000;
    const PULSE_DURATION = 1500;
    const REST_DURATION = 4000;
    let idleTimer: number | null = null;
    let pulseTimer: number | null = null;
    let isPulsing = false;

    function pulseTargets() {
      return Array.from(document.querySelectorAll<HTMLElement>('[data-idle-pulse]'));
    }

    function runPulseCycle() {
      const targets = pulseTargets();
      targets.forEach((el) => {
        el.classList.remove('cinematic-idle-pulse');
        // Re-trigger the animation reliably by reading offsetWidth before adding.
        void el.offsetWidth;
        el.classList.add('cinematic-idle-pulse');
      });
      // Schedule next cycle: pulse duration + rest, repeat until interaction.
      pulseTimer = window.setTimeout(runPulseCycle, PULSE_DURATION + REST_DURATION);
    }

    function startPulse() {
      if (isPulsing) return;
      isPulsing = true;
      runPulseCycle();
    }
    function stopPulse() {
      isPulsing = false;
      if (pulseTimer) clearTimeout(pulseTimer);
      pulseTimer = null;
      pulseTargets().forEach((el) => el.classList.remove('cinematic-idle-pulse'));
    }
    function resetIdle() {
      stopPulse();
      if (idleTimer) clearTimeout(idleTimer);
      idleTimer = window.setTimeout(startPulse, IDLE_MS);
    }
    const idleEvents: Array<keyof WindowEventMap> = ['pointermove', 'pointerdown', 'keydown', 'wheel', 'touchstart'];
    idleEvents.forEach((ev) => window.addEventListener(ev, resetIdle, { passive: true }));
    resetIdle();

    // ---------------- Scroll-velocity blur ----------------
    // Spec: at >1000px/s, apply 3-4px filter blur; smoothly back to 0 with
    // a 200ms ease-out so sudden velocity changes never look glitchy.
    // MOBILE: completely disabled. The 60fps rAF loop + GPU filter:blur()
    // on the viewport-sized <main> was the dominant lag source identified
    // in Phase 3 diagnosis. On mobile we set --scroll-blur to 0px once,
    // skip the rAF loop entirely, and let the @media override in
    // src/index.css apply `filter: none` to .scroll-blur-target as a
    // second layer of protection.
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const VELOCITY_FAST = 1000; // px/sec — start of blur ramp
    const VELOCITY_CAP = 3000;  // px/sec — full blur
    const BLUR_MIN = 3;
    const BLUR_MAX = 4; // tighter cap per "blur returns to 0 with 200ms ease-out"
    let lastScroll = window.scrollY;
    let lastTime = performance.now();
    let blurAmount = 0;
    let blurRaf = 0;
    const body = document.body;

    if (isMobile) {
      // Set the variable once and never mutate again. No rAF, no work
      // per scroll tick. CSS `.scroll-blur-target` rule with `filter: none`
      // takes the page out of the GPU filter compositing path entirely.
      body.style.setProperty('--scroll-blur', '0px');
    } else {
      function tickBlur() {
        const now = performance.now();
        const dt = Math.max(8, now - lastTime); // ms
        lastTime = now;
        const dy = window.scrollY - lastScroll;
        lastScroll = window.scrollY;
        const velocity = Math.abs(dy) / (dt / 1000); // px/sec
        let target = 0;
        if (velocity > VELOCITY_FAST) {
          const t = Math.min(1, (velocity - VELOCITY_FAST) / (VELOCITY_CAP - VELOCITY_FAST));
          target = BLUR_MIN + (BLUR_MAX - BLUR_MIN) * t;
        }
        // Approach rate tuned so blur reaches 0 in ~200ms after scroll stops:
        // at 60fps, factor 0.10 yields ≈ (1 - 0.1)^12 ≈ 0.28 after 200ms.
        const approach = target > blurAmount ? 0.22 : 0.10;
        blurAmount += (target - blurAmount) * approach;
        if (blurAmount < 0.08) blurAmount = 0;
        body.style.setProperty('--scroll-blur', `${blurAmount.toFixed(2)}px`);
        blurRaf = requestAnimationFrame(tickBlur);
      }
      blurRaf = requestAnimationFrame(tickBlur);
    }

    // ---------------- Bolder-on-scroll headlines ----------------
    // Elements opted in via `.bolder-on-scroll` get `.is-bold` applied when
    // they're at least 50% visible. CSS handles the weight transition.
    const boldObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          entry.target.classList.toggle('is-bold', entry.isIntersecting);
        }
      },
      { threshold: 0.5 }
    );
    function rescanBoldTargets() {
      document
        .querySelectorAll<HTMLElement>('.bolder-on-scroll')
        .forEach((el) => boldObserver.observe(el));
    }
    rescanBoldTargets();
    // Rescan after route changes / late-mounted content.
    const mutObserver = new MutationObserver(() => rescanBoldTargets());
    mutObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('pointermove', onMove);
      idleEvents.forEach((ev) => window.removeEventListener(ev, resetIdle));
      if (idleTimer) clearTimeout(idleTimer);
      if (pulseTimer) clearTimeout(pulseTimer);
      cancelAnimationFrame(blurRaf);
      if (magneticRaf) cancelAnimationFrame(magneticRaf);
      stopPulse();
      boldObserver.disconnect();
      mutObserver.disconnect();
    };
  }, []);
}
