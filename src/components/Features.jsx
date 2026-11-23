import { memo } from 'react';
import { MessageSquareCode, Box, Cpu, MonitorSmartphone, Sparkles } from 'lucide-react';
import { featuresList } from '../data/features';

const iconMap = {
  conversation: MessageSquareCode,
  'expressive-3d': Box,
  'modern-engineering': Cpu,
  responsive: MonitorSmartphone,
};

function Features() {
  return (
    <section className="section-container" id="features">
      <div className="section-head-minimal" data-reveal-stagger>
        <div className="section-tag">
          <Sparkles size={12} />
          <span>CAPABILITIES</span>
        </div>
        <h2 className="section-headline-editorial">
          Designed for Natural Interaction
        </h2>
        <p className="section-description-minimal">
          A harmonious union of conversational AI intelligence and hardware-accelerated spatial presence.
        </p>
      </div>

      <div className="features-grid-minimal" data-reveal-stagger>
        {featuresList.map((feat) => {
          const IconComponent = iconMap[feat.id] || Box;
          return (
            <div key={feat.id} className="feature-luxury-card">
              <div className="card-ambient-glow" aria-hidden="true" />
              <div className="feature-icon-box">
                <IconComponent size={24} strokeWidth={1.75} />
              </div>
              <span className="feature-category-label">{feat.tag}</span>
              <h3 className="feature-card-title">{feat.title}</h3>
              <p className="feature-card-desc">{feat.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default memo(Features);
