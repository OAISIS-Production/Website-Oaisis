import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Truck, Factory, Warehouse, CheckCircle2, AlertTriangle } from 'lucide-react';

// Continuous-loop manufacturing visual. Every element renders populated on
// first paint — no zero-state pass. All loops gate on an isActive flag tied
// to IntersectionObserver so off-screen frames don't burn CPU.

const CRATES = [
  { label: 'Steel coil', initial: 1240 },
  { label: 'Copper wire', initial: 860 },
  { label: 'Polymer pellets', initial: 2110 },
];

const INSIGHTS = [
  'Reorder steel coil — 12 days remaining at current rate',
  'Line 3 efficiency +8% this week',
  'Q3 shipment to Atlanta — rerouting through Memphis (saves 14hr)',
  'Defect rate on Line 2 trending up — recommended pause for inspection',
  'Polymer supplier price drop detected — switching reduces cost 4.2%',
  'Inventory turnover up 11% MoM',
];

interface ConveyorUnit {
  id: number;
  defect: boolean;
  bornAt: number;
}

const TRAVEL_MS = 3000;
const SPAWN_MS = 1200;
const TRUCK_MS = 4200;
const INSIGHT_MS = 5000;
const SHIPMENT_MS = 6000;
const DOT_TRAVEL_MS = 2400;

export default function SupplyChainFlow() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(true);

  // Intake — crate quantities ticked up by truck arrivals.
  const [crates, setCrates] = useState(() => CRATES.map((c) => c.initial));
  const [truckKey, setTruckKey] = useState(0);

  // Production — units in flight, counter, last QC result for pulse cue.
  const unitIdRef = useRef(0);
  const [units, setUnits] = useState<ConveyorUnit[]>(() => {
    // Pre-populate so frame 1 already has units traversing.
    return [
      { id: -3, defect: false, bornAt: Date.now() - 2200 },
      { id: -2, defect: false, bornAt: Date.now() - 1400 },
      { id: -1, defect: false, bornAt: Date.now() - 600 },
    ];
  });
  const [produced, setProduced] = useState(1247);
  const [defectsToday, setDefectsToday] = useState(38);
  const defectIdxRef = useRef(0);

  // Warehouse — three SKU bars, oscillating around a baseline.
  const [stock, setStock] = useState<[number, number, number]>([68, 82, 54]);
  const [shipmentVisible, setShipmentVisible] = useState(false);

  // Insights ticker.
  const [insightIdx, setInsightIdx] = useState(0);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const obs = new IntersectionObserver(
      ([entry]) => setIsActive(entry.isIntersecting),
      { threshold: 0.05 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Truck arrivals — bump a crate quantity each cycle.
  useEffect(() => {
    if (!isActive) return;
    const tick = () => {
      setTruckKey((k) => k + 1);
      window.setTimeout(() => {
        setCrates((prev) => {
          const idx = Math.floor(Math.random() * prev.length);
          const next = [...prev];
          next[idx] = next[idx] + 50 + Math.floor(Math.random() * 150);
          return next;
        });
      }, TRUCK_MS - 700);
    };
    tick();
    const id = window.setInterval(tick, TRUCK_MS);
    return () => window.clearInterval(id);
  }, [isActive]);

  // Conveyor spawn loop.
  useEffect(() => {
    if (!isActive) return;
    const spawn = () => {
      const id = ++unitIdRef.current;
      // 1 in 8 defects — deterministic so the cadence feels honest.
      defectIdxRef.current = (defectIdxRef.current + 1) % 8;
      const defect = defectIdxRef.current === 0;
      setUnits((u) => [...u, { id, defect, bornAt: Date.now() }]);

      window.setTimeout(() => {
        setUnits((u) => u.filter((unit) => unit.id !== id));
        if (defect) {
          setDefectsToday((d) => d + 1);
        } else {
          setProduced((n) => n + 1);
          // Each green unit nudges a random SKU bar up by a tick.
          setStock((bars) => {
            const idx = Math.floor(Math.random() * 3);
            const next: [number, number, number] = [...bars] as [number, number, number];
            next[idx] = Math.min(95, next[idx] + 1 + Math.floor(Math.random() * 2));
            return next;
          });
        }
      }, TRAVEL_MS);
    };
    spawn();
    const id = window.setInterval(spawn, SPAWN_MS);
    return () => window.clearInterval(id);
  }, [isActive]);

  // Outbound shipment pulse — drains stock bars.
  useEffect(() => {
    if (!isActive) return;
    const tick = () => {
      setShipmentVisible(true);
      setStock((bars) => {
        const next: [number, number, number] = [...bars] as [number, number, number];
        const idx = Math.floor(Math.random() * 3);
        next[idx] = Math.max(28, next[idx] - 6 - Math.floor(Math.random() * 5));
        return next;
      });
      window.setTimeout(() => setShipmentVisible(false), 1800);
    };
    tick();
    const id = window.setInterval(tick, SHIPMENT_MS);
    return () => window.clearInterval(id);
  }, [isActive]);

  // Insights ticker.
  useEffect(() => {
    if (!isActive) return;
    const id = window.setInterval(() => {
      setInsightIdx((i) => (i + 1) % INSIGHTS.length);
    }, INSIGHT_MS);
    return () => window.clearInterval(id);
  }, [isActive]);

  return (
    <div
      ref={wrapRef}
      style={{
        position: 'relative',
        width: '100%',
        background: 'rgba(255,255,255,0.08)',
        border: '1px solid rgba(255,255,255,0.15)',
        borderRadius: 24,
        padding: 'clamp(28px, 4vw, 48px)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        boxShadow: '0 12px 40px rgba(10,30,60,0.25)',
        overflow: 'hidden',
      }}
    >
      {/* keyframes for connector dots + conveyor unit fall */}
      <style>{`
        @keyframes scf-dot {
          0%   { transform: translateX(-100%); opacity: 0; }
          12%  { opacity: 1; }
          88%  { opacity: 1; }
          100% { transform: translateX(0%); opacity: 0; }
        }
        @keyframes scf-truck-in {
          0%   { transform: translateX(-180px); opacity: 0; }
          25%  { opacity: 1; }
          75%  { opacity: 1; }
          100% { transform: translateX(60px); opacity: 0; }
        }
      `}</style>

      <div
        className="supplychain-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.35fr 1fr',
          gap: 'clamp(16px, 2vw, 28px)',
          alignItems: 'stretch',
          position: 'relative',
        }}
      >
        {/* COLUMN 1 — INTAKE */}
        <Column>
          <ColHeader icon={<Truck className="w-4 h-4" />} label="Raw materials" />
          <div style={{ position: 'relative', height: 36, marginBottom: 18, overflow: 'hidden' }}>
            <motion.div
              key={truckKey}
              initial={false}
              style={{
                position: 'absolute',
                left: 0,
                top: 6,
                animation: `scf-truck-in ${TRUCK_MS - 200}ms ease-in-out 1`,
                animationFillMode: 'forwards',
                color: 'rgba(255,255,255,0.85)',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              <Truck className="w-5 h-5" />
              <span>Inbound</span>
            </motion.div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {CRATES.map((c, i) => (
              <CrateBar key={c.label} label={c.label} qty={crates[i]} />
            ))}
          </div>
        </Column>

        {/* COLUMN 2 — PRODUCTION */}
        <Column>
          <ColHeader icon={<Factory className="w-4 h-4" />} label="Production line" />
          <div style={{ position: 'relative', height: 140, marginBottom: 18 }}>
            {/* belt */}
            <div
              style={{
                position: 'absolute',
                top: 56,
                left: 0,
                right: 0,
                height: 18,
                background:
                  'linear-gradient(180deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.05) 100%)',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: 4,
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: 76,
                left: 0,
                right: 0,
                height: 2,
                background:
                  'repeating-linear-gradient(90deg, rgba(255,255,255,0.30) 0 6px, transparent 6px 14px)',
              }}
            />
            {/* units */}
            <AnimatePresence>
              {units.map((u) => (
                <ConveyorUnitGlyph key={u.id} defect={u.defect} />
              ))}
            </AnimatePresence>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '10px 12px',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.10)',
              borderRadius: 10,
            }}
          >
            <Stat label="Units today" value={produced.toLocaleString()} />
            <Stat label="Defects" value={defectsToday.toString()} accent="#F4A6A0" />
          </div>
        </Column>

        {/* COLUMN 3 — INVENTORY */}
        <Column>
          <ColHeader icon={<Warehouse className="w-4 h-4" />} label="Warehouse" />
          <div
            style={{
              display: 'flex',
              gap: 14,
              alignItems: 'flex-end',
              height: 140,
              marginBottom: 14,
              padding: '0 4px',
            }}
          >
            {stock.map((pct, i) => (
              <StockBar key={i} pct={pct} sku={['SKU 12', 'SKU 34', 'SKU 57'][i]} />
            ))}
          </div>
          <div style={{ position: 'relative', height: 28 }}>
            <AnimatePresence>
              {shipmentVisible && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '6px 10px',
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: '0.05em',
                    color: '#0F2A4A',
                    background: 'rgba(255,255,255,0.85)',
                    border: '1px solid rgba(255,255,255,0.4)',
                    borderRadius: 999,
                  }}
                >
                  <Truck className="w-3.5 h-3.5" />
                  Outbound shipment ready
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Column>

        {/* connectors between columns */}
        <Connector left="33.4%" />
        <Connector left="66.6%" />
      </div>

      {/* INSIGHTS TICKER */}
      <div
        style={{
          marginTop: 'clamp(22px, 3vw, 32px)',
          paddingTop: 18,
          borderTop: '1px solid rgba(255,255,255,0.12)',
          minHeight: 32,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        <AnimatePresence mode="wait">
          <motion.p
            key={insightIdx}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{
              margin: 0,
              fontSize: 13,
              lineHeight: 1.5,
              color: '#FFFFFF',
              fontFamily: "'Inter', sans-serif",
            }}
          >
            <span style={{ color: 'rgba(255,255,255,0.5)', fontWeight: 600, letterSpacing: '0.08em' }}>
              OAISIS ·{' '}
            </span>
            {INSIGHTS[insightIdx]}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}

function Column({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        position: 'relative',
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.10)',
        borderRadius: 16,
        padding: 18,
        zIndex: 2,
      }}
    >
      {children}
    </div>
  );
}

function ColHeader({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        marginBottom: 14,
        color: 'rgba(255,255,255,0.92)',
      }}
    >
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 26,
          height: 26,
          borderRadius: 7,
          background: 'rgba(255,255,255,0.10)',
          border: '1px solid rgba(255,255,255,0.18)',
        }}
      >
        {icon}
      </span>
      <span
        style={{
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'rgba(208,231,245,0.95)',
        }}
      >
        {label}
      </span>
    </div>
  );
}

function CrateBar({ label, qty }: { label: string; qty: number }) {
  return (
    <div
      style={{
        position: 'relative',
        background: 'rgba(255,255,255,0.06)',
        border: '1px solid rgba(255,255,255,0.12)',
        borderRadius: 8,
        padding: '10px 12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 8,
      }}
    >
      <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.85)', fontWeight: 500 }}>{label}</span>
      <motion.span
        key={qty}
        initial={{ y: -4, opacity: 0.6 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        style={{
          fontSize: 13,
          fontWeight: 700,
          color: '#FFFFFF',
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {qty.toLocaleString()}
      </motion.span>
    </div>
  );
}

function ConveyorUnitGlyph({ defect }: { defect: boolean }) {
  // Travel: 0%→100% horizontally. At 45–55% trigger a QC flash.
  // Defects fall off mid-belt; good units exit cleanly to the right.
  const [phase, setPhase] = useState<'travel' | 'flash' | 'exit' | 'fall'>('travel');
  const [exited, setExited] = useState(false);

  useEffect(() => {
    const flashAt = window.setTimeout(() => setPhase('flash'), TRAVEL_MS * 0.42);
    const postFlash = window.setTimeout(
      () => setPhase(defect ? 'fall' : 'exit'),
      TRAVEL_MS * 0.52,
    );
    const done = window.setTimeout(() => setExited(true), TRAVEL_MS - 50);
    return () => {
      window.clearTimeout(flashAt);
      window.clearTimeout(postFlash);
      window.clearTimeout(done);
    };
  }, [defect]);

  return (
    <motion.div
      initial={{ left: '-4%', top: 50, opacity: 0 }}
      animate={
        phase === 'fall'
          ? { left: '50%', top: 160, opacity: 0, rotate: 35 }
          : { left: phase === 'exit' ? '104%' : phase === 'flash' ? '50%' : '50%', top: 50, opacity: 1 }
      }
      transition={
        phase === 'fall'
          ? { duration: 0.6, ease: [0.6, 0, 0.9, 0.5] }
          : phase === 'exit'
          ? { duration: TRAVEL_MS * 0.45 / 1000, ease: 'linear' }
          : { duration: TRAVEL_MS * 0.42 / 1000, ease: 'linear' }
      }
      style={{
        position: 'absolute',
        width: 28,
        height: 28,
        marginLeft: -14,
        background:
          phase === 'flash' && defect
            ? 'rgba(244,166,160,0.95)'
            : phase === 'flash'
            ? 'rgba(173,221,179,0.95)'
            : 'rgba(255,255,255,0.92)',
        borderRadius: 6,
        border: '1px solid rgba(255,255,255,0.6)',
        boxShadow:
          phase === 'flash'
            ? defect
              ? '0 0 14px rgba(244,120,110,0.7)'
              : '0 0 14px rgba(120,200,140,0.7)'
            : '0 2px 8px rgba(10,30,60,0.3)',
        display: exited ? 'none' : 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#0F2A4A',
        pointerEvents: 'none',
      }}
    >
      {phase === 'flash' &&
        (defect ? <AlertTriangle className="w-3.5 h-3.5" /> : <CheckCircle2 className="w-3.5 h-3.5" />)}
    </motion.div>
  );
}

function Stat({ label, value, accent }: { label: string; value: string; accent?: string }) {
  return (
    <div>
      <p
        style={{
          margin: 0,
          fontSize: 9,
          fontWeight: 700,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.55)',
        }}
      >
        {label}
      </p>
      <p
        style={{
          margin: 0,
          marginTop: 2,
          fontSize: 16,
          fontWeight: 700,
          color: accent ?? '#FFFFFF',
          fontVariantNumeric: 'tabular-nums',
          letterSpacing: '-0.01em',
        }}
      >
        {value}
      </p>
    </div>
  );
}

function StockBar({ pct, sku }: { pct: number; sku: string }) {
  return (
    <div style={{ flex: 1, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div
        style={{
          flex: 1,
          width: '100%',
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.10)',
          borderRadius: 6,
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'flex-end',
          position: 'relative',
        }}
      >
        <motion.div
          animate={{ height: `${pct}%` }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            width: '100%',
            background:
              'linear-gradient(180deg, rgba(208,231,245,0.95) 0%, rgba(147,197,232,0.85) 100%)',
            borderTop: '1px solid rgba(255,255,255,0.7)',
          }}
        />
        <span
          style={{
            position: 'absolute',
            top: 6,
            left: 0,
            right: 0,
            textAlign: 'center',
            fontSize: 10,
            fontWeight: 700,
            color: 'rgba(15,42,74,0.9)',
            fontVariantNumeric: 'tabular-nums',
            mixBlendMode: 'lighten',
            pointerEvents: 'none',
          }}
        >
          {pct}%
        </span>
      </div>
      <p
        style={{
          margin: 0,
          marginTop: 6,
          fontSize: 9,
          fontWeight: 700,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.65)',
        }}
      >
        {sku}
      </p>
    </div>
  );
}

function Connector({ left }: { left: string }) {
  // Hidden behind the columns (z-index 1). Each connector renders 3 dots
  // staggered so the eye sees a continuous flow.
  const dots = useMemo(() => [0, 800, 1600], []);
  return (
    <div
      aria-hidden
      style={{
        position: 'absolute',
        top: '50%',
        left,
        width: 60,
        height: 2,
        marginLeft: -30,
        background:
          'repeating-linear-gradient(90deg, rgba(255,255,255,0.25) 0 4px, transparent 4px 10px)',
        zIndex: 1,
        overflow: 'visible',
      }}
    >
      {dots.map((delay) => (
        <span
          key={delay}
          style={{
            position: 'absolute',
            left: 0,
            top: -3,
            width: '100%',
            height: 8,
            display: 'block',
            pointerEvents: 'none',
          }}
        >
          <span
            style={{
              position: 'absolute',
              width: 6,
              height: 6,
              borderRadius: 999,
              background: '#FFFFFF',
              boxShadow: '0 0 8px rgba(255,255,255,0.65)',
              top: 1,
              left: 0,
              animation: `scf-dot ${DOT_TRAVEL_MS}ms linear ${delay}ms infinite`,
            }}
          />
        </span>
      ))}
    </div>
  );
}
