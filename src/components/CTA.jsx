import { memo } from 'react';
import { ArrowRight, Bot } from 'lucide-react';

function CTA({ onNavigate }) {
  const handleScrollToChat = () => {
    if (onNavigate) {
      onNavigate('chat');
    } else {
      const chatSection = document.getElementById('chat');
      if (chatSection) {
        chatSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="cta-minimal-section" id="cta">
      {/* Subtle Blue Radial Glow */}
      <div className="cta-radial-glow" aria-hidden="true" />

      <div className="cta-centered-content" data-reveal-stagger>
        <div className="cta-brand-badge" aria-hidden="true">
          <Bot size={22} />
        </div>

        <h2 className="cta-editorial-title">
          Ready to Talk?
        </h2>

        <p className="cta-description">
          Meet your interactive AI companion.
        </p>

        <button
          className="btn-cta-luxury"
          onClick={handleScrollToChat}
          aria-label="Talk to Robot"
        >
          <span>Talk to Robot</span>
          <ArrowRight size={16} className="btn-arrow-icon" />
        </button>
      </div>
    </section>
  );
}

export default memo(CTA);
