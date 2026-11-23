import { useCallback, useEffect, memo } from 'react';
import FlowingBackground from './components/FlowingBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import About from './components/About';
import AIInterface from './components/AIInterface';
import Showcase3D from './components/Showcase3D';
import HowItWorks from './components/HowItWorks';
import Technology from './components/Technology';
import Vision from './components/Vision';
import CTA from './components/CTA';
import Footer from './components/Footer';
import './App.css';

const MemoizedFeatures = memo(Features);
const MemoizedAbout = memo(About);
const MemoizedShowcase3D = memo(Showcase3D);
const MemoizedHowItWorks = memo(HowItWorks);
const MemoizedTechnology = memo(Technology);
const MemoizedVision = memo(Vision);
const MemoizedCTA = memo(CTA);
const MemoizedFooter = memo(Footer);

export default function App() {
  const handleNavigate = useCallback((targetId) => {
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  useEffect(() => {
    const revealTargets = document.querySelectorAll('[data-reveal], [data-reveal-stagger]');
    if (!revealTargets.length) return undefined;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || typeof IntersectionObserver === 'undefined') {
      return undefined;
    }

    revealTargets.forEach((target) => {
      if (target.hasAttribute('data-reveal-stagger')) {
        Array.from(target.children).forEach((child, index) => {
          child.style.setProperty('--reveal-index', index);
        });
      }
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });

    revealTargets.forEach((target) => observer.observe(target));
    document.documentElement.classList.add('scroll-reveal-ready');

    return () => {
      observer.disconnect();
      document.documentElement.classList.remove('scroll-reveal-ready');
    };
  }, []);

  return (
    <div className="app-wrapper">
      {/* 0. Subtle cinematic flowing canvas background */}
      <FlowingBackground />

      {/* 1. Transparent to Frosted Glass Navbar */}
      <Navbar onNavigate={handleNavigate} />

      <main>
        {/* 2. Hero Section (#home) with Live 3D Robot & Truthful Metrics */}
        <Hero onNavigate={handleNavigate} />

        {/* 3. Feature Strip (4 cards) (#features) */}
        <MemoizedFeatures />

        {/* 4. About / Human Presence (#about) */}
        <MemoizedAbout />

        {/* 5. Interactive AI Chatbot (#chat) */}
        <AIInterface />

        {/* 6. Interactive 3D Experience Inspector (#experience) */}
        <MemoizedShowcase3D />

        {/* 7. How It Works - Horizontal Cognitive Flow (#how-it-works) */}
        <MemoizedHowItWorks />

        {/* 8. Technology Stack Pills (#technology) */}
        <MemoizedTechnology />

        {/* 9. Vision Section (#vision) */}
        <MemoizedVision onNavigate={handleNavigate} />

        {/* 10. Final Call to Action (#cta) */}
        <MemoizedCTA onNavigate={handleNavigate} />
      </main>

      {/* 11. Minimal Spacious Footer */}
      <MemoizedFooter onNavigate={handleNavigate} />
    </div>
  );
}
