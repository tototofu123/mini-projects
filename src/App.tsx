import { useState, useRef } from 'react';
import { Header } from './components/Global/Header/Header';
import { LoadingScreen } from './components/Global/LoadingScreen/LoadingScreen';
import { Sidebar } from './components/Global/Sidebar/Sidebar';
import { SoundManager } from './audio/SoundManager';
import { KineticHero } from './sections/Hero/KineticHero';
import { ProductionAISection } from './sections/ProductionAI/ProductionAISection';
import { PhysicalSystemsSection } from './sections/PhysicalSystems/PhysicalSystemsSection';
import { ClimbingTechSection } from './sections/ClimbingTech/ClimbingTechSection';
import { EngineeringLabSection } from './sections/EngineeringLab/EngineeringLabSection';
import { CommandFooterSection } from './sections/CommandFooter/CommandFooterSection';
import './index.css';

export function App() {
  const [loading, setLoading] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <LoadingScreen onComplete={() => setLoading(false)} />

      {!loading && (
        <div ref={mainRef} className="site-wrapper min-h-screen bg-[#0B0F19] text-slate-100 selection:bg-orange-500 selection:text-slate-950">
          <Header />
          <Sidebar />
          
          <main className="site-main w-full flex flex-col">
            <KineticHero />
            <ProductionAISection />
            <PhysicalSystemsSection />
            <ClimbingTechSection />
            <EngineeringLabSection />
            <CommandFooterSection />
          </main>

          <SoundManager enabled={soundEnabled} onToggle={() => setSoundEnabled(!soundEnabled)} />
        </div>
      )}
    </>
  );
}

export default App;
