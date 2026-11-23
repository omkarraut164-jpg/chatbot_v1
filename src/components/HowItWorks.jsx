import { useState, memo } from 'react';
import { Workflow, ArrowRight } from 'lucide-react';
import { howItWorksSteps } from '../data/features';
import { setRobotState } from '../services/robotStateStore';

function HowItWorks() {
  const [activeStep, setActiveStep] = useState(null);

  const handleStepHover = (state, index) => {
    setActiveStep(index);
    if (state) {
      setRobotState(state);
    }
  };

  const handleStepLeave = () => {
    setActiveStep(null);
    setRobotState('IDLE');
  };

  return (
    <section className="section-container" id="how-it-works">
      <div className="section-head-minimal" data-reveal-stagger>
        <div className="section-tag">
          <Workflow size={12} />
          <span>COGNITIVE FLOW</span>
        </div>
        <h2 className="section-headline-editorial">
          How It Works
        </h2>
        <p className="section-description-minimal">
          From initial inquiry to responsive spatial kinematics, explore the continuous cognitive loop.
        </p>
      </div>

      <div className="process-horizontal-container">
        {/* Connecting Line Track */}
        <div className="process-track-line" aria-hidden="true">
          <div
            className="process-track-glow"
            style={{
              width: activeStep !== null ? `${((activeStep + 1) / howItWorksSteps.length) * 100}%` : '0%',
            }}
          />
        </div>

        <div className="process-steps-row" data-reveal-stagger>
          {howItWorksSteps.map((item, index) => {
            const isHovered = activeStep === index;
            return (
              <div
                key={item.step}
                className={`process-step-node ${isHovered ? 'active' : ''}`}
                onMouseEnter={() => handleStepHover(item.state, index)}
                onMouseLeave={handleStepLeave}
                tabIndex={0}
                role="button"
                aria-label={`Step ${item.step}: ${item.title}`}
              >
                {/* Step Pill Header */}
                <div className="process-node-indicator">
                  <span className="process-node-number">{item.step}</span>
                  <div className="process-node-dot" />
                </div>

                {/* Content */}
                <div className="process-node-content">
                  <div className="process-title-row">
                    <h3 className="process-node-title">{item.title}</h3>
                    <span className="process-state-tag">→ {item.state}</span>
                  </div>
                  <p className="process-node-desc">{item.subtitle}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default memo(HowItWorks);
