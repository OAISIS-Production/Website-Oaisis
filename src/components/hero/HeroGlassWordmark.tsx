import { Suspense, useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text3D, Center, Environment, MeshTransmissionMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';

const FONT_URL = '/assets/fonts/helvetiker_regular.typeface.json';

function GlassText() {
  const groupRef = useRef<THREE.Group>(null);
  const { viewport, mouse } = useThree();

  useFrame((_state, delta) => {
    if (!groupRef.current) return;
    // Slow continuous rotation
    groupRef.current.rotation.y += delta * 0.05;
    // Mouse parallax — gentle tilt toward cursor
    const targetX = mouse.y * 0.08;
    const targetY = mouse.x * 0.18;
    groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.05;
    groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * 0.02;
  });

  // Scale text to viewport so it stays ~60% of width across screen sizes
  const scale = Math.min(viewport.width * 0.18, 1.6);

  return (
    <group ref={groupRef} scale={scale}>
      <Float speed={1.4} rotationIntensity={0.12} floatIntensity={0.35}>
        <Center>
          <Text3D
            font={FONT_URL}
            size={1}
            height={0.32}
            curveSegments={24}
            bevelEnabled
            bevelThickness={0.045}
            bevelSize={0.025}
            bevelOffset={0}
            bevelSegments={6}
          >
            OAISIS
            <MeshTransmissionMaterial
              samples={6}
              resolution={512}
              thickness={0.45}
              roughness={0.12}
              transmission={1}
              ior={1.45}
              chromaticAberration={0.05}
              anisotropy={0.4}
              distortion={0.08}
              distortionScale={0.3}
              temporalDistortion={0.06}
              backside={true}
              backsideThickness={0.3}
              attenuationDistance={1}
              attenuationColor="#F5EFE0"
              color="#FFFFFF"
            />
          </Text3D>
        </Center>
      </Float>
    </group>
  );
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[5, 8, 5]} intensity={1.4} color="#FFFFFF" />
      <directionalLight position={[-5, 4, -3]} intensity={0.6} color="#DCC9A0" />
      <pointLight position={[0, -3, 4]} intensity={0.8} color="#93C5E8" />
    </>
  );
}

export default function HeroGlassWordmark() {
  // Performance: detect mobile and reduce Canvas DPR
  const isMobile =
    typeof window !== 'undefined' &&
    (window.matchMedia('(max-width: 768px)').matches ||
      /Mobi|Android/i.test(navigator.userAgent));

  // Hide the live canvas for prefers-reduced-motion and show a static fallback
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    // Quiet R3F's verbose console
  }, []);

  if (prefersReducedMotion || isMobile) {
    return (
      <div
        className="flex items-center justify-center pointer-events-none select-none"
        style={{
          width: '100%',
          height: '100%',
          fontFamily: "'Outfit', sans-serif",
          fontWeight: 200,
          fontSize: 'clamp(56px, 14vw, 160px)',
          letterSpacing: '-2px',
          color: 'rgba(255,255,255,0.92)',
          textShadow:
            '0 2px 8px rgba(91,160,212,0.25), 0 0 40px rgba(255,255,255,0.4), 0 0 80px rgba(200,173,126,0.18)',
        }}
        aria-label="OAISIS"
      >
        OAISIS
      </div>
    );
  }

  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 6], fov: 45 }}
      gl={{ alpha: true, antialias: true, preserveDrawingBuffer: false }}
      style={{ width: '100%', height: '100%', pointerEvents: 'none' }}
    >
      <Suspense fallback={null}>
        <Environment preset="sunset" background={false} />
        <Lights />
        <GlassText />
      </Suspense>
    </Canvas>
  );
}
