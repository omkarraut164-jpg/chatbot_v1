import { memo } from 'react';
import { ArrowRight, Compass } from 'lucide-react';

function Vision({ onNavigate }) {
  const handleExplore = () => {
    if (onNavigate) {
      onNavigate('experience');
    } else {
      const el = document.getElementById('experience');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="section-container vision-section" id="vision">
      {/* Planetary Atmospheric Ambient Curve */}
      <div className="vision-planetary-arc" aria-hidden="true" />
      <div className="vision-ambient-glow" aria-hidden="true" />

      <div className="vision-content-box" data-reveal-stagger>
        <div className="section-tag">
          <Compass size={12} />
          <span>OUR PHILOSOPHY</span>
        </div>

        <h2 className="vision-editorial-headline">
          A More Connected<br />
          <span className="vision-serif-accent">Tomorrow.</span>
        </h2>

        <p className="vision-quote">
          &ldquo;We believe AI should feel less like a tool and more like a presence.&rdquo;
        </p>

        <button
          className="btn-vision-cta"
          onClick={handleExplore}
          aria-label="Explore the Vision"
        >
          <span>Explore the Vision</span>
          <ArrowRight size={15} className="btn-arrow-icon" />
        </button>
      </div>
    </section>
  );
}

export default memo(Vision);
