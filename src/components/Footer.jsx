import { memo } from 'react';
import { Bot, ArrowUpRight } from 'lucide-react';

function Footer({ onNavigate }) {
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
    <footer className="footer-luxury-wrapper">
      <div className="footer-top-row" data-reveal-stagger>
        {/* Left: Brand Identity */}
        <div className="footer-brand" onClick={() => handleScrollTo('home')} role="button" tabIndex={0}>
          <div className="footer-brand-icon">
            <Bot size={18} />
          </div>
          <div className="footer-brand-text">
            <span className="footer-brand-main">ROBOT HEAD</span>
            <span className="footer-brand-sub">CHATBOT</span>
          </div>
        </div>

        {/* Center: Clean Anchor Navigation */}
        <nav className="footer-center-nav" aria-label="Footer Navigation">
          <ul className="footer-nav-links">
            <li>
              <button className="footer-link-btn" onClick={() => handleScrollTo('home')}>
                Home
              </button>
            </li>
            <li>
              <button className="footer-link-btn" onClick={() => handleScrollTo('chat')}>
                Chat
              </button>
            </li>
            <li>
              <button className="footer-link-btn" onClick={() => handleScrollTo('features')}>
                Features
              </button>
            </li>
            <li>
              <button className="footer-link-btn" onClick={() => handleScrollTo('experience')}>
                Experience
              </button>
            </li>
            <li>
              <button className="footer-link-btn" onClick={() => handleScrollTo('about')}>
                About
              </button>
            </li>
          </ul>
        </nav>

        {/* Right: Social Outlets */}
        <div className="footer-social-links">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-social-item"
            aria-label="GitHub"
          >
            <span>GitHub</span>
            <ArrowUpRight size={12} />
          </a>
          <a
            href="https://x.com"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-social-item"
            aria-label="X (formerly Twitter)"
          >
            <span>X</span>
            <ArrowUpRight size={12} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-social-item"
            aria-label="LinkedIn"
          >
            <span>LinkedIn</span>
            <ArrowUpRight size={12} />
          </a>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="footer-bottom-row">
        <span className="footer-copyright">
          &copy; {new Date().getFullYear()} Robot Head Chatbot. All rights reserved.
        </span>
        <span className="footer-tech-tag">
          Designed with React 19, Three.js &amp; Minimal Luxury Standards
        </span>
      </div>
    </footer>
  );
}

export default memo(Footer);
