import { useEffect, useRef } from 'react';
// @ts-ignore
import { HeroScene } from './HeroScene';

export const HeroSection: React.FC = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HeroScene | null>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (!canvasRef.current || initialized.current) return;
    initialized.current = true;

    const scene = new HeroScene(canvasRef.current);
    sceneRef.current = scene;

    return () => {
      if (sceneRef.current) {
        try {
          sceneRef.current.dispose();
        } catch (_e) {
          // Ignore disposal errors during HMR
        }
        sceneRef.current = null;
      }
      initialized.current = false;
    };
  }, []);

  return (
    <section className="hero-section" id="hero">
      <div className="hero-canvas-container" ref={canvasRef} />

      <div className="hero-text-overlay">
        <h1 className="hero-greeting">
          <span className="greeting-line">Hi, I am</span>
          <span className="greeting-name">Toto Lai</span>
        </h1>
        <div className="hero-description">
          <p className="hero-role">an AI engineer and UI developer</p>
          <p className="hero-location">based in Hong Kong</p>
        </div>
      </div>

      <div className="hero-bottom-bar">
        <div className="hero-streak">
          <img
            src="https://github-readme-streak-stats.herokuapp.com/?user=tototofu123&theme=dark&hide_border=true&background=0F172A&stroke=1E293B&ring=F97316&fire=F97316&currStreakLabel=F97316&sideLabels=94A3B8&dates=64748B&currStreakNum=F8FAFC&sideNums=F8FAFC"
            alt="GitHub Streak Stats"
            className="streak-img"
          />
        </div>
        <p className="hero-subtitle">
          Computer Engineering and Artificial Intelligence student at HKUST
        </p>
      </div>

      <div className="photo-mode-indicator">
        <span className="mode-label">HOLOGRAM MODE</span>
        <span className="mode-value">REAL</span>
      </div>
    </section>
  );
};

export default HeroSection;
