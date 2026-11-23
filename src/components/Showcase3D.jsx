import { useState, useRef, memo } from 'react';
import { RotateCw, RotateCcw, Maximize2, Minimize2, Eye, Move3d } from 'lucide-react';
import Model3D from './Model3D';

function Showcase3D() {
  const [autoRotate, setAutoRotate] = useState(false);
  const [resetTrigger, setResetTrigger] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const viewerRef = useRef(null);

  const toggleAutoRotate = () => {
    setAutoRotate((prev) => !prev);
  };

  const handleResetView = () => {
    setAutoRotate(false);
    setResetTrigger((prev) => prev + 1);
  };

  const toggleFullscreen = () => {
    if (!viewerRef.current) return;

    if (!document.fullscreenElement) {
      viewerRef.current
        .requestFullscreen()
        .then(() => setIsFullscreen(true))
        .catch((err) => console.warn('Fullscreen error:', err));
    } else {
      document
        .exitFullscreen()
        .then(() => setIsFullscreen(false))
        .catch((err) => console.warn('Exit fullscreen error:', err));
    }
  };

  return (
    <section className="section-container" id="experience">
      <div className="section-head-minimal" data-reveal-stagger>
        <div className="section-tag">
          <Eye size={12} />
          <span>3D INSPECTION</span>
        </div>
        <h2 className="section-headline-editorial">
          See Intelligence in Motion.
        </h2>
        <p className="section-description-minimal">
          Explore the robot from every angle and watch it respond in real time.
        </p>
      </div>

      <div
        className="showcase-studio-stage"
        data-reveal
        ref={viewerRef}
        style={isFullscreen ? { height: '100dvh', borderRadius: '0' } : {}}
      >
        {/* Subtle Dark Studio Backdrop Glow */}
        <div className="showcase-ambient-spotlight" aria-hidden="true" />
        <div className="showcase-pedestal-ring" aria-hidden="true" />

        {/* Interaction Hints (Responsive for touch & mouse gadgets) */}
        <div className="showcase-hints-bar">
          <div className="showcase-hint-item">
            <Move3d size={13} />
            <span className="hint-label-desktop">DRAG TO ORBIT 360° · SCROLL TO ZOOM</span>
            <span className="hint-label-mobile">TOUCH &amp; DRAG TO ORBIT 360°</span>
          </div>
        </div>

        {/* 3D Model Canvas */}
        <div className="showcase-canvas-wrap">
          <Model3D
            robotState="ACTIVE"
            autoRotate={autoRotate}
            enableControls={true}
            enableZoom={true}
            resetTrigger={resetTrigger}
          />
        </div>

        {/* Floating Minimal Glass Control Bar */}
        <div className="showcase-floating-controls">
          <button
            className={`control-pill-btn ${autoRotate ? 'active' : ''}`}
            onClick={toggleAutoRotate}
            aria-label="Toggle auto rotation"
          >
            <RotateCw size={14} className={autoRotate ? 'spin-anim' : ''} />
            <span className="btn-label-desktop">{autoRotate ? 'Rotating: ON' : 'Auto Rotate'}</span>
            <span className="btn-label-mobile">{autoRotate ? 'ON' : 'Rotate'}</span>
          </button>

          <button
            className="control-pill-btn"
            onClick={handleResetView}
            aria-label="Reset 3D camera view"
          >
            <RotateCcw size={14} />
            <span className="btn-label-desktop">Reset View</span>
            <span className="btn-label-mobile">Reset</span>
          </button>

          <button
            className="control-pill-btn"
            onClick={toggleFullscreen}
            aria-label="Toggle fullscreen mode"
          >
            {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
            <span className="btn-label-desktop">{isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}</span>
            <span className="btn-label-mobile">{isFullscreen ? 'Exit' : 'Full'}</span>
          </button>
        </div>
      </div>
    </section>
  );
}

export default memo(Showcase3D);
