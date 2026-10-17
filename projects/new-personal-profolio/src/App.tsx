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
import { SectionBridge } from './components/Transitions/SectionBridge';
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
            
            <SectionBridge 
              variant="hero-to-ai" 
              fromLabel="Kinetic Dual-State" 
              toLabel="Applied AI & Agents" 
              codeSnippet="TELEMETRY // MULTI-AGENT SWARM"
            />

            <ProductionAISection />
            
            <SectionBridge 
              variant="ai-to-robotics" 
              fromLabel="Cloud & Edge Swarm" 
              toLabel="Physical Actuators" 
              codeSnippet="BUS // BLE 4.2 / I2C / SPI"
            />

            <PhysicalSystemsSection />
            
            <SectionBridge 
              variant="robotics-to-climbing" 
              fromLabel="Mechanical Ground" 
              toLabel="High-Angle Topo" 
              codeSnippet="ELEVATION // SPEED & ICE CLIMB"
            />

            <ClimbingTechSection />
            
            <SectionBridge 
              variant="climbing-to-lab" 
              fromLabel="Kinetic Dynamics" 
              toLabel="Post-Mortem Lab" 
              codeSnippet="STATE // SYSTEMATIC EVALUATION"
            />

            <EngineeringLabSection />
            
            <SectionBridge 
              variant="lab-to-footer" 
              fromLabel="Analytical Post-Mortem" 
              toLabel="Command Dispatch" 
              codeSnippet="STATUS // DISPATCH_AUTHORIZED"
            />

            <CommandFooterSection />
          </main>

          <SoundManager enabled={soundEnabled} onToggle={() => setSoundEnabled(!soundEnabled)} />
        </div>
      )}
    </>
  );
}

export default App;
