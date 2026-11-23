import { memo } from 'react';
import { Code2, Sparkles } from 'lucide-react';
import { techStackPills } from '../data/features';

function Technology() {
  return (
    <section className="section-container" id="technology">
      <div className="section-head-minimal" data-reveal-stagger>
        <div className="section-tag">
          <Code2 size={12} />
          <span>ENGINEERING FOUNDATION</span>
        </div>
        <h2 className="section-headline-editorial">
          Built for the Modern Web.
        </h2>
        <p className="section-description-minimal">
          Crafted with industry-leading declarative graphics, zero-dependency state architectures, and high-performance WebGL.
        </p>
      </div>

      {/* Elegant Horizontal Technology Pills Strip */}
      <div className="tech-pills-container" data-reveal-stagger>
        {techStackPills.map((item) => (
          <div key={item.name} className="tech-luxury-pill">
            <div className="tech-pill-dot" />
            <strong className="tech-pill-name">{item.name}</strong>
            <span className="tech-pill-role">{item.role}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default memo(Technology);
