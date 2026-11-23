import { useRef, useState, useEffect, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Center, OrbitControls, ContactShadows, Html, useProgress, AdaptiveDpr } from '@react-three/drei';
import * as THREE from 'three';
import { getDeviceQuality } from '../utils/quality';

// 3D Humanoid Model with State-Driven Kinematics, Shared Geometry & Smooth Hover Moments
function HumanoidMesh({ robotState = 'IDLE', hovered, setHovered }) {
  const groupRef = useRef();
  // Load 3.8MB Draco-compressed model with local decoder worker
  const { scene: rawScene } = useGLTF('/models/humanoid-opt.glb', '/draco/');

  // Shared geometry & material: Zero memory duplication across multiple Canvases
  const scene = useMemo(() => {
    const cloned = rawScene.clone(false);
    rawScene.traverse((child) => {
      if (child.isMesh) {
        const meshClone = new THREE.Mesh(child.geometry, child.material);
        meshClone.name = child.name;
        cloned.add(meshClone);
      }
    });
    return cloned;
  }, [rawScene]);

  // Pre-allocated interpolation state in refs (Zero garbage collection in useFrame)
  const currentRot = useRef({ x: 0, y: -Math.PI / 2.2, z: 0 });
  const currentPos = useRef({ y: -0.04 });
  const currentScale = useRef(2.08);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const safeDelta = Math.min(delta, 0.05);
    const t = state.clock.getElapsedTime();

    // Procedural movement parameters: Fluid, lively kinematics
    let floatSpeed = 1.45;
    let floatAmp = 0.026;
    let nodAmp = 0.012;
    let stateYawOffset = Math.sin(t * 0.9) * 0.02;

    if (robotState === 'THINKING') {
      floatSpeed = 2.8;
      floatAmp = 0.04;
      nodAmp = 0.022;
      stateYawOffset = Math.sin(t * 2.2) * 0.08;
    } else if (robotState === 'RESPONDING') {
      floatSpeed = 1.9;
      floatAmp = 0.032;
      nodAmp = 0.026;
      stateYawOffset = Math.sin(t * 1.1) * 0.04;
    }

    const floatY = Math.sin(t * floatSpeed) * floatAmp;
    const breatheZ = Math.cos(t * 1.0) * nodAmp;

    const baseRotY = -Math.PI / 2.2;
    const targetRotX = -state.pointer.y * 0.24 + (robotState === 'THINKING' ? 0.05 : 0) + (hovered ? 0.02 : 0);
    const targetRotY = baseRotY + state.pointer.x * 0.40 + stateYawOffset;
    const targetRotZ = breatheZ - state.pointer.x * 0.06;
    const targetPosY = floatY - (hovered ? 0.02 : 0.04);
    const targetScale = hovered ? 2.16 : 2.08;

    // Delta-independent exponential damping (Zero raw mouse snapping)
    const rotFactor = 1 - Math.exp(-6.8 * safeDelta);
    const posFactor = 1 - Math.exp(-6.5 * safeDelta);
    const scaleFactor = 1 - Math.exp(-5.5 * safeDelta);

    currentRot.current.x = THREE.MathUtils.lerp(currentRot.current.x, targetRotX, rotFactor);
    currentRot.current.y = THREE.MathUtils.lerp(currentRot.current.y, targetRotY, rotFactor);
    currentRot.current.z = THREE.MathUtils.lerp(currentRot.current.z, targetRotZ, rotFactor);

    currentPos.current.y = THREE.MathUtils.lerp(currentPos.current.y, targetPosY, posFactor);
    currentScale.current = THREE.MathUtils.lerp(currentScale.current, targetScale, scaleFactor);

    groupRef.current.rotation.set(
      currentRot.current.x,
      currentRot.current.y,
      currentRot.current.z
    );
    groupRef.current.position.y = currentPos.current.y;
    groupRef.current.scale.setScalar(currentScale.current);
  });

  return (
    <group
      ref={groupRef}
      scale={[2.08, 2.08, 2.08]}
      rotation={[0, -Math.PI / 2.2, 0]}
      onPointerEnter={(e) => {
        e.stopPropagation();
        if (setHovered) setHovered(true);
      }}
      onPointerLeave={(e) => {
        e.stopPropagation();
        if (setHovered) setHovered(false);
      }}
    >
      <Center>
        <primitive object={scene} />
      </Center>
    </group>
  );
}

// Professional Minimalist 3D Initializing Fallback
function CanvasLoader() {
  const { progress } = useProgress();
  const rounded = Math.round(progress);
  return (
    <Html center>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.65rem',
        background: 'rgba(9, 12, 18, 0.92)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        padding: '1.1rem 1.6rem',
        borderRadius: '14px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 12px 36px rgba(0, 0, 0, 0.65)',
        minWidth: '220px',
        userSelect: 'none',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem',
          fontSize: '0.78rem',
          fontFamily: "'Space Grotesk', monospace",
          fontWeight: 700,
          letterSpacing: '0.08em',
          color: '#f8fafc',
          textTransform: 'uppercase',
        }}>
          <span style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: '#0ea5e9',
            boxShadow: '0 0 10px #0ea5e9',
            animation: 'spin 1.2s linear infinite',
          }} />
          INITIALIZING ROBOT {rounded > 0 ? `// ${rounded}%` : ''}
        </div>
        <div style={{
          width: '100%',
          height: '3px',
          borderRadius: '999px',
          background: 'rgba(255, 255, 255, 0.08)',
          overflow: 'hidden',
        }}>
          <div style={{
            width: `${Math.max(rounded, 15)}%`,
            height: '100%',
            background: 'linear-gradient(90deg, #0ea5e9, #38bdf8)',
            borderRadius: '999px',
            transition: 'width 0.2s ease-out',
          }} />
        </div>
      </div>
    </Html>
  );
}

// Smooth OrbitControls with graceful auto-rotation resume inertia
function SmoothOrbitControls({
  controlsRef,
  enableZoom,
  autoRotate,
  autoRotateSpeed = 2.2,
}) {
  const isInteracting = useRef(false);
  const lastInteractionTime = useRef(0);
  const currentSpeed = useRef(autoRotate ? autoRotateSpeed : 0);

  useEffect(() => {
    const controls = controlsRef.current;
    if (!controls) return;

    const onStart = () => {
      isInteracting.current = true;
    };
    const onEnd = () => {
      isInteracting.current = false;
      lastInteractionTime.current = performance.now();
    };

    controls.addEventListener('start', onStart);
    controls.addEventListener('end', onEnd);
    return () => {
      controls.removeEventListener('start', onStart);
      controls.removeEventListener('end', onEnd);
    };
  }, [controlsRef]);

  useFrame((_, delta) => {
    const controls = controlsRef.current;
    if (!controls || !autoRotate) return;
    const safeDelta = Math.min(delta, 0.05);
    const now = performance.now();

    let targetSpeed = autoRotateSpeed;
    if (isInteracting.current) {
      targetSpeed = 0;
    } else if (now - lastInteractionTime.current < 1400) {
      // Graceful exponential easing into auto-rotation after user drag
      const elapsed = (now - lastInteractionTime.current) / 1400;
      targetSpeed = autoRotateSpeed * Math.min(1, Math.max(0.1, elapsed * elapsed));
    }

    currentSpeed.current = THREE.MathUtils.lerp(
      currentSpeed.current,
      targetSpeed,
      1 - Math.exp(-4.0 * safeDelta)
    );
    controls.autoRotateSpeed = currentSpeed.current;
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enablePan={false}
      enableZoom={enableZoom}
      minDistance={2.0}
      maxDistance={4.5}
      autoRotate={autoRotate}
      autoRotateSpeed={autoRotateSpeed}
      rotateSpeed={0.8}
      touches={{
        ONE: THREE.TOUCH.ROTATE,
        TWO: THREE.TOUCH.DOLLY_PAN,
      }}
      maxPolarAngle={Math.PI / 1.7}
      minPolarAngle={Math.PI / 2.8}
      enableDamping={true}
      dampingFactor={0.08}
    />
  );
}

// Adaptive camera position across devices: mobile portrait, tablet, desktop, ultra-wide
function ResponsiveCamera() {
  const { camera, size } = useThree();
  useEffect(() => {
    if (!camera) return;
    const aspect = size.width / Math.max(size.height, 1);
    if (aspect < 0.72) {
      // Narrow mobile phones (320px - 400px width)
      camera.position.z = 3.8;
      camera.fov = 48;
    } else if (aspect < 1.05) {
      // Standard mobile & portrait tablets (400px - 820px)
      camera.position.z = 3.5;
      camera.fov = 46;
    } else {
      // Laptops & large displays
      camera.position.z = 3.2;
      camera.fov = 45;
    }
    camera.updateProjectionMatrix();
  }, [size, camera]);
  return null;
}

export default function Model3D({
  robotState = 'IDLE',
  autoRotate = false,
  enableControls = true,
  enableZoom = true,
  resetTrigger = 0,
}) {
  const [hovered, setHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(
    () => typeof document === 'undefined' || !document.hidden
  );
  const containerRef = useRef(null);
  const controlsRef = useRef(null);
  const isIntersectingRef = useRef(true);

  // Adaptive device & GPU quality parameters
  const quality = useMemo(() => getDeviceQuality(), []);

  // Viewport Culling: Completely pause rendering (0 draw calls) when offscreen
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden && isIntersectingRef.current);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    if (!containerRef.current || typeof IntersectionObserver === 'undefined') {
      return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        isIntersectingRef.current = entry.isIntersecting;
        setIsVisible(entry.isIntersecting && !document.hidden);
      },
      { threshold: 0.01, rootMargin: '120px' }
    );

    observer.observe(containerRef.current);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // Handle Reset View
  useEffect(() => {
    if (resetTrigger > 0 && controlsRef.current) {
      controlsRef.current.reset();
    }
  }, [resetTrigger]);

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%', position: 'relative' }}>
      <Canvas
        camera={{ position: [0, 0, 3.2], fov: 45 }}
        dpr={quality.dpr}
        // When offscreen, drop frameloop to 'never' so 0 GPU/CPU cycles are spent
        frameloop={isVisible ? 'always' : 'never'}
        performance={{ min: 0.65 }}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: 'high-performance',
          precision: 'highp',
          stencil: false,
          depth: true,
        }}
        style={{ background: 'transparent', touchAction: 'pan-y' }}
      >
        <ResponsiveCamera />
        <AdaptiveDpr />
        {/* Studio Lighting tuned for Dark Background */}
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 8, 6]} intensity={2.6} color="#ffffff" />
        <directionalLight position={[-5, 4, 4]} intensity={1.4} color="#0ea5e9" />
        
        {/* Strong Cyan Rim Light for Silhouette Pop */}
        <directionalLight position={[-4, 3, -4]} intensity={3.2} color="#38bdf8" />
        {/* Delicate Violet Edge Accent */}
        <directionalLight position={[4, -2, -3]} intensity={1.5} color="#818cf8" />

        {/* Soft Grounding Contact Shadow baked once on mount (frames={1}) to eliminate FBO blur overhead */}
        {quality.enableShadows && (
          <ContactShadows
            position={[0, -1.05, 0]}
            opacity={0.45}
            scale={4}
            blur={2.0}
            far={2}
            color="#000000"
            frames={1}
            resolution={quality.shadowResolution}
          />
        )}

        <Suspense fallback={<CanvasLoader />}>
          <HumanoidMesh
            robotState={robotState}
            hovered={hovered}
            setHovered={setHovered}
          />
        </Suspense>

        {enableControls && (
          <SmoothOrbitControls
            controlsRef={controlsRef}
            enableZoom={enableZoom}
            autoRotate={autoRotate}
            autoRotateSpeed={2.2}
          />
        )}
      </Canvas>
    </div>
  );
}

useGLTF.preload('/models/humanoid-opt.glb', '/draco/');
