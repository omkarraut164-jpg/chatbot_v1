import { useState, useEffect, memo } from 'react';
import { Bot, ArrowRight, Menu, X, Sparkles } from 'lucide-react';

function Navbar({ onNavigate }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Scroll listener for glassmorphism and active section detection
  useEffect(() => {
    let ticking = false;
    const sections = ['home', 'chat', 'features', 'experience', 'about'];

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrolled = window.scrollY > 24;
          setIsScrolled((prev) => (prev !== scrolled ? scrolled : prev));

          // Detect active section
          const scrollPos = window.scrollY + 200;
          for (let i = sections.length - 1; i >= 0; i--) {
            const el = document.getElementById(sections[i]);
            if (el && el.offsetTop <= scrollPos) {
              setActiveSection(sections[i]);
              break;
            }
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scrolling on mobile when menu drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleLinkClick = (targetId) => {
    setMobileMenuOpen(false);
    setActiveSection(targetId);
    if (onNavigate) {
      onNavigate(targetId);
    } else {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      {/* 1. Left: Brand Logo */}
      <div className="nav-brand" onClick={() => handleLinkClick('home')} role="button" tabIndex={0}>
        <div className="brand-icon-box">
          <Bot size={20} />
        </div>
        <div className="brand-name">
          <span className="brand-name-main">ROBOT HEAD</span>
          <span className="brand-name-sub">CHATBOT</span>
        </div>
      </div>

      {/* 2. Center: Desktop Navigation Links */}
      <nav className="nav-center-menu" aria-label="Main Navigation">
        <ul className="nav-links">
          <li>
            <button
              className={`nav-link-btn ${activeSection === 'home' ? 'active' : ''}`}
              onClick={() => handleLinkClick('home')}
            >
              Home
            </button>
          </li>
          <li>
            <button
              className={`nav-link-btn ${activeSection === 'chat' ? 'active' : ''}`}
              onClick={() => handleLinkClick('chat')}
            >
              Chat
            </button>
          </li>
          <li>
            <button
              className={`nav-link-btn ${activeSection === 'features' ? 'active' : ''}`}
              onClick={() => handleLinkClick('features')}
            >
              Features
            </button>
          </li>
          <li>
            <button
              className={`nav-link-btn ${activeSection === 'experience' ? 'active' : ''}`}
              onClick={() => handleLinkClick('experience')}
            >
              Experience
            </button>
          </li>
          <li>
            <button
              className={`nav-link-btn ${activeSection === 'about' ? 'active' : ''}`}
              onClick={() => handleLinkClick('about')}
            >
              About
            </button>
          </li>
        </ul>
      </nav>

      {/* 3. Right: Status & Action CTA */}
      <div className="nav-actions">
        {/* Subtle Online Telemetry Chip */}
        <div className="nav-telemetry-chip" title="System Operational">
          <span className="telemetry-dot-pulsing" />
          <span className="telemetry-text">ONLINE</span>
        </div>

        {/* Primary Action Button */}
        <button
          className="btn-nav-primary"
          onClick={() => handleLinkClick('chat')}
          aria-label="Talk to Robot"
        >
          <span>Talk to Robot</span>
          <ArrowRight size={14} className="btn-arrow-icon" />
        </button>

        {/* Mobile Hamburger Toggle */}
        <button
          className="mobile-toggle-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* 4. Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-nav-drawer" role="dialog" aria-modal="true">
          <div className="mobile-nav-header">
            <span className="mobile-drawer-label">MENU</span>
            <button
              className="mobile-drawer-close"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>
          <div className="mobile-nav-items">
            <button
              className={`mobile-nav-item ${activeSection === 'home' ? 'active' : ''}`}
              onClick={() => handleLinkClick('home')}
            >
              Home
            </button>
            <button
              className={`mobile-nav-item ${activeSection === 'chat' ? 'active' : ''}`}
              onClick={() => handleLinkClick('chat')}
            >
              Chat
            </button>
            <button
              className={`mobile-nav-item ${activeSection === 'features' ? 'active' : ''}`}
              onClick={() => handleLinkClick('features')}
            >
              Features
            </button>
            <button
              className={`mobile-nav-item ${activeSection === 'experience' ? 'active' : ''}`}
              onClick={() => handleLinkClick('experience')}
            >
              Experience
            </button>
            <button
              className={`mobile-nav-item ${activeSection === 'about' ? 'active' : ''}`}
              onClick={() => handleLinkClick('about')}
            >
              About
            </button>
          </div>
          <button
            className="btn-mobile-drawer-cta"
            onClick={() => handleLinkClick('chat')}
          >
            <span>Talk to Robot</span>
            <ArrowRight size={15} />
          </button>
        </div>
      )}
    </header>
  );
}

export default memo(Navbar);
