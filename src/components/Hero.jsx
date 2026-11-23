import { memo } from 'react';
import { ArrowRight, Compass, Sparkles, Cpu, Activity } from 'lucide-react';
import Model3D from './Model3D';
import { useRobotState } from '../services/robotStateStore';

// Editorial Left Column
const HeroContent = memo(function HeroContent({ onNavigate }) {
  const handleScrollTo = (id) => {
    if (onNavigate) {
      onNavigate(id);
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="hero-content-col" data-reveal-stagger>
      {/* 1. Eyebrow */}
      <div className="hero-eyebrow-wrapper">
        <div className="section-tag">
          <Sparkles size={12} />
          <span>INTERACTIVE · INTELLIGENT · IMMERSIVE</span>
        </div>
      </div>

      {/* 2. Large Editorial Headline */}
      <h1 className="hero-editorial-headline">
        <span className="hero-reveal-mask">
          <span className="hero-reveal-text">AI</span>
        </span>
        <span className="hero-reveal-mask">
          <span className="hero-reveal-text">That Feels</span>
        </span>
        <span className="hero-reveal-mask">
          <span className="hero-reveal-text hero-gradient-word">Human</span>
        </span>
      </h1>

      {/* 3. Short Supporting Description */}
      <p className="hero-subtext">
        An interactive AI presence that listens, thinks and responds in real time.
      </p>

      {/* 4. Action Buttons */}
      <div className="hero-actions-group">
        <button
          className="btn-hero-primary"
          onClick={() => handleScrollTo('chat')}
          aria-label="Talk to Robot"
        >
          <span>Talk to Robot</span>
          <ArrowRight size={16} className="btn-arrow-icon" />
        </button>

        <button
          className="btn-hero-secondary"
          onClick={() => handleScrollTo('experience')}
          aria-label="Explore Experience"
        >
          <Compass size={16} />
          <span>Explore Experience</span>
        </button>
      </div>

      {/* 5. Elegant Performance Metrics */}
      <div className="hero-metrics-strip">
        <div className="metric-item">
          <span className="metric-value">&lt; 0.1s</span>
          <span className="metric-label">Response</span>
        </div>

        <div className="metric-divider" aria-hidden="true" />

        <div className="metric-item">
          <span className="metric-value">60 FPS</span>
          <span className="metric-label">Realtime 3D</span>
        </div>

        <div className="metric-divider" aria-hidden="true" />

        <div className="metric-item">
          <span className="metric-value">AI CORE</span>
          <span className="metric-label">v5.0</span>
        </div>
      </div>
    </div>
  );
});

// Cinematic 3D Robot Stage
function HeroRobotStage({ propState }) {
  const storeState = useRobotState('IDLE');
  const robotState = propState || storeState;

  return (
    <div className="hero-robot-col">
      {/* Minimalist Circular Studio Orbit & Glow */}
      <div className="hero-studio-orbit" aria-hidden="true" />
      <div className="hero-studio-pedestal" aria-hidden="true" />
      <div className="hero-ambient-spot" aria-hidden="true" />

      {/* Live State Badges */}
      <div className="hero-state-badge state-top-left">
        <Cpu size={13} color="#38bdf8" />
        <span>STATE // {robotState}</span>
      </div>

      <div className="hero-state-badge state-bottom-right">
        <span className="telemetry-dot-pulsing" />
        <Activity size={13} color="#10b981" />
        <span>60 FPS REAL-TIME</span>
      </div>

      {/* The Actual 3D Robot Model */}
      <div className="hero-canvas-frame">
        <Model3D robotState={robotState} enableZoom={true} />
      </div>
    </div>
  );
}

function Hero({ robotState, onNavigate }) {
  return (
    <section className="hero-container" id="home">
      {/* Background Soft Studio Aura */}
      <div className="hero-aura-glow" aria-hidden="true" />

      <div className="hero-grid-layout">
        <HeroContent onNavigate={onNavigate} />
        <HeroRobotStage propState={robotState} />
      </div>
    </section>
  );
}

export default memo(Hero);
