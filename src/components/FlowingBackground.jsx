import { useEffect, useRef, memo } from 'react';

/**
 * FlowingBackground
 * Ultra-subtle, cinematic dark canvas background.
 * Uses a deep obsidian/navy studio base, slow atmospheric blue glow,
 * and restrained harmonic ribbon lines that support the 3D robot without competing.
 */
function FlowingBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let animationFrameId;
    let resizeFrameId;
    let isRunning = true;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let lastDrawTime = 0;
    const frameInterval = 1000 / 60;

    let targetMouseX = 0;
    let targetMouseY = 0;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e) => {
      targetMouseX = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouseY = (e.clientY / window.innerHeight) * 2 - 1;
    };

    const handleResize = () => {
      cancelAnimationFrame(resizeFrameId);
      resizeFrameId = requestAnimationFrame(() => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        if (prefersReducedMotion) {
          drawFrame(0);
        }
      });
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        isRunning = false;
        cancelAnimationFrame(animationFrameId);
      } else if (!prefersReducedMotion) {
        isRunning = true;
        lastTime = performance.now();
        animationFrameId = requestAnimationFrame(render);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Minimal, ultra-subtle flowing wave parameters
    const waves = [
      {
        baseY: 0.35,
        amplitude: 45,
        wavelength: 0.0016,
        speed: 0.00022,
        color: 'rgba(14, 165, 233, 0.038)',
        lineWidth: 1.2,
      },
      {
        baseY: 0.52,
        amplitude: 60,
        wavelength: 0.0012,
        speed: 0.00018,
        color: 'rgba(56, 189, 248, 0.032)',
        lineWidth: 1.4,
      },
      {
        baseY: 0.70,
        amplitude: 50,
        wavelength: 0.0018,
        speed: 0.00025,
        color: 'rgba(139, 92, 246, 0.024)',
        lineWidth: 1.0,
      },
      {
        baseY: 0.86,
        amplitude: 70,
        wavelength: 0.0011,
        speed: 0.00015,
        color: 'rgba(14, 165, 233, 0.028)',
        lineWidth: 1.5,
      },
    ];

    let lastTime = performance.now();
    let time = 0;

    const drawFrame = (currentProgressTime) => {
      // 1. Deep Obsidian / Navy Studio Base
      const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
      bgGrad.addColorStop(0, '#02050a');
      bgGrad.addColorStop(0.5, '#050912');
      bgGrad.addColorStop(1, '#020408');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. Slow atmospheric blue spotlight in upper-right for depth
      const spotGrad = ctx.createRadialGradient(
        width * 0.72 + mouseX * 20,
        height * 0.38 + mouseY * 20,
        60,
        width * 0.72,
        height * 0.38,
        width * 0.65
      );
      spotGrad.addColorStop(0, 'rgba(14, 165, 233, 0.06)');
      spotGrad.addColorStop(0.5, 'rgba(56, 189, 248, 0.018)');
      spotGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = spotGrad;
      ctx.fillRect(0, 0, width, height);

      // 3. Subtle secondary violet atmospheric glow in lower-left
      const violetSpot = ctx.createRadialGradient(
        width * 0.22 - mouseX * 15,
        height * 0.75 - mouseY * 15,
        40,
        width * 0.22,
        height * 0.75,
        width * 0.5
      );
      violetSpot.addColorStop(0, 'rgba(139, 92, 246, 0.035)');
      violetSpot.addColorStop(0.6, 'rgba(139, 92, 246, 0.008)');
      violetSpot.addColorStop(1, 'transparent');
      ctx.fillStyle = violetSpot;
      ctx.fillRect(0, 0, width, height);

      // 4. Harmonic wave ribbons
      waves.forEach((wave, index) => {
        ctx.beginPath();
        ctx.strokeStyle = wave.color;
        ctx.lineWidth = wave.lineWidth;

        const parallaxY = mouseY * 12 * (index % 2 === 0 ? 1 : -1);
        const parallaxX = mouseX * 8;

        const currentBaseY = height * wave.baseY + parallaxY;
        const phase = currentProgressTime * wave.speed * 60;

        for (let x = 0; x <= width; x += 18) {
          const y =
            currentBaseY +
            Math.sin(x * wave.wavelength + phase + parallaxX * 0.01) * wave.amplitude +
            Math.cos(x * (wave.wavelength * 0.55) + phase * 0.75) * (wave.amplitude * 0.35);

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      });
    };

    const render = (currentTime) => {
      if (!isRunning) return;

      const now = currentTime || performance.now();
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      const lerpFactor = 1 - Math.exp(-5.0 * dt);
      mouseX += (targetMouseX - mouseX) * lerpFactor;
      mouseY += (targetMouseY - mouseY) * lerpFactor;

      time += dt * 60;
      if (now - lastDrawTime >= frameInterval) {
        lastDrawTime = now;
        drawFrame(time);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    if (prefersReducedMotion) {
      drawFrame(0);
    } else {
      render(performance.now());
    }

    return () => {
      isRunning = false;
      cancelAnimationFrame(animationFrameId);
      cancelAnimationFrame(resizeFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
      aria-hidden="true"
    />
  );
}

export default memo(FlowingBackground);
