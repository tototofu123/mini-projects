/**
 * About Section — Plasma Gun + Border Melt
 * 
 * Features:
 * - 3D plasma gun placeholder (abstract shape) on the right
 * - Gun fires plasma projectiles toward cursor click position
 * - Plasma hits About text boxes → border melt effect
 * - Heat haze text effect (cool on hover)
 * - Bio text boxes with tech stack categories
 */

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { soundManager } from '../../audio/SoundManager';
// @ts-ignore
import { AboutScene } from './AboutScene';

export const AboutSection: React.FC = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<AboutScene | null>(null);
  const [meltedBoxes, setMeltedBoxes] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (!canvasRef.current) return;
    sceneRef.current = new AboutScene(canvasRef.current, (boxIndex: number) => {
      setMeltedBoxes(prev => new Set([...prev, boxIndex]));
    });
    return () => {
      if (sceneRef.current) sceneRef.current.dispose();
    };
  }, []);

  const handleBoxClick = useCallback((index: number) => {
    if (sceneRef.current) {
      sceneRef.current.fireAtPosition(index);
      soundManager.play('plasma');
    }
  }, []);

  return (
    <section className="about-section" id="about">
      {/* Three.js Canvas for plasma gun */}
      <div className="about-canvas-container" ref={canvasRef} />

      <div className="about-content">
        <div className="about-header">[ PROFILE ENGINE ]</div>

        <div className="about-grid">
          {/* Left: Bio text boxes */}
          <div className="about-left-col">
            <div
              className={`about-box ${meltedBoxes.has(0) ? 'is-melting' : ''}`}
              onClick={() => handleBoxClick(0)}
              style={{ '--melt-progress': meltedBoxes.has(0) ? 1 : 0 } as React.CSSProperties}
            >
              <p className="haze-text">
                I'm Toto, a <strong>Computer Engineering and AI student at HKUST</strong>.
                I build systems that connect the physical world to the digital one.
              </p>
            </div>

            <div
              className={`about-box ${meltedBoxes.has(1) ? 'is-melting' : ''}`}
              onClick={() => handleBoxClick(1)}
              style={{ '--melt-progress': meltedBoxes.has(1) ? 1 : 0 } as React.CSSProperties}
            >
              <span className="box-title">AI</span>
              <p className="haze-text">
                Training <strong>CNN models</strong> and leveraging <strong>AI automation</strong> to accelerate productivity.
              </p>
            </div>

            <div
              className={`about-box ${meltedBoxes.has(2) ? 'is-melting' : ''}`}
              onClick={() => handleBoxClick(2)}
              style={{ '--melt-progress': meltedBoxes.has(2) ? 1 : 0 } as React.CSSProperties}
            >
              <span className="box-title">UI</span>
              <p className="haze-text">
                Using <strong>design tools</strong> and modern <strong>code</strong> to craft high-performance interactive experiences.
              </p>
            </div>

            <div
              className={`about-box ${meltedBoxes.has(3) ? 'is-melting' : ''}`}
              onClick={() => handleBoxClick(3)}
              style={{ '--melt-progress': meltedBoxes.has(3) ? 1 : 0 } as React.CSSProperties}
            >
              <span className="box-title">Embedded Systems</span>
              <p className="haze-text">
                Integrating <strong>embedded hardware</strong> and physical computing solutions.
              </p>
            </div>
          </div>

          {/* Right: 3D gun placeholder area */}
          <div className="about-right-asset">
            <div className="gun-placeholder">
              <div className="gun-ring ring-1" />
              <div className="gun-ring ring-2" />
              <div className="gun-core" />
              <div className="gun-barrel" />
              <p className="gun-label">PLASMA CANNON</p>
              <p className="gun-hint">Click to fire • Click boxes to melt</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
