import { useState, useRef } from 'react';
import { Header } from './components/Global/Header/Header';
import { LoadingScreen } from './components/Global/LoadingScreen/LoadingScreen';
import { HeroSection } from './sections/Hero';
import { AboutSection } from './components/About/AboutSection/AboutSection';
import { ProjectsSection } from './components/Projects/ProjectsSection/ProjectsSection';
import { SkillsSection } from './components/Skills/SkillsSection/SkillsSection';
import { ContactSection } from './components/Contact/ContactSection/ContactSection';
import { FooterSection } from './components/Footer/FooterSection/FooterSection';
import { SoundManager } from './audio/SoundManager';
import { Sidebar } from './components/Global/Sidebar/Sidebar';
import './index.css';
import './sections/Hero/Hero.module.css';

export function App() {
  const [loading, setLoading] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <LoadingScreen onComplete={() => setLoading(false)} />

      {!loading && (
        <div ref={mainRef} className="site-wrapper">
          <Header />
          <Sidebar />
          <main className="site-main">
            <div className="future-phase">
              <HeroSection />
              <AboutSection />
            </div>
            <ProjectsSection />
            <SkillsSection />
            <ContactSection />
            <FooterSection />
          </main>
          <SoundManager enabled={soundEnabled} onToggle={() => setSoundEnabled(!soundEnabled)} />
        </div>
      )}
    </>
  );
}

export default App;
