import { memo } from 'react';
import { Sparkles, Activity, Eye, Zap, ShieldCheck } from 'lucide-react';

function About() {
  return (
    <section className="section-container" id="about">
      <div className="about-cinematic-wrapper" data-reveal-stagger>
        {/* Left: Narrative Column */}
        <div className="about-narrative-col">
          <div className="section-tag">
            <Sparkles size={12} />
            <span>A NEW WAY TO INTERACT</span>
          </div>

          <h2 className="about-headline">
            Where AI Meets<br />
            <span className="about-serif-accent">Human Presence.</span>
          </h2>

          <p className="about-subtext-lead">
            Robot Head combines conversational AI with an expressive real-time 3D presence.
          </p>

          <p className="about-subtext-secondary">
            Instead of staring at static text or lifeless loaders, experience an embodied entity that responds with authentic spatial awareness, subtle gaze tracking, and physical cognitive feedback.
          </p>

          {/* Minimal Key Badges */}
          <div className="about-pills-row">
            <div className="about-pill">
              <Eye size={14} className="about-pill-icon" />
              <span>Gaze Tracking</span>
            </div>
            <div className="about-pill">
              <Activity size={14} className="about-pill-icon" />
              <span>Spatial Kinematics</span>
            </div>
            <div className="about-pill">
              <Zap size={14} className="about-pill-icon" />
              <span>Sub-100ms Response</span>
            </div>
          </div>
        </div>

        {/* Right: Cinematic Visual Panel */}
        <div className="about-visual-panel">
          <div className="panel-ambient-aura" aria-hidden="true" />
          <div className="panel-inner-card">
            {/* Tech Telemetry Blueprint Header */}
            <div className="panel-telemetry-header">
              <span className="telemetry-chip-mono">SPEC // HUMAN-LIKE PRESENCE</span>
              <span className="telemetry-status-pill">v5.0 ONLINE</span>
            </div>

            {/* Geometric Spatial Visual */}
            <div className="panel-spatial-art">
              <div className="spatial-radar-circle circle-3" />
              <div className="spatial-radar-circle circle-2" />
              <div className="spatial-radar-circle circle-1" />
              <div className="spatial-crosshair-h" />
              <div className="spatial-crosshair-v" />
              <div className="spatial-node node-center" />
              <div className="spatial-node node-orbit" />
            </div>

            {/* Performance Indicators */}
            <div className="panel-stat-grid">
              <div className="panel-stat-box">
                <span className="panel-stat-num">100%</span>
                <span className="panel-stat-label">In-Browser Realtime</span>
              </div>
              <div className="panel-stat-box">
                <span className="panel-stat-num">3.8 MB</span>
                <span className="panel-stat-label">Draco Compressed</span>
              </div>
              <div className="panel-stat-box">
                <span className="panel-stat-num">Zero</span>
                <span className="panel-stat-label">Installations Required</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(About);
