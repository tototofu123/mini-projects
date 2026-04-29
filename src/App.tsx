import React, { useState } from 'react';
import { Menu } from './components/Menu';
import { GameScreen } from './components/GameScreen';
import { LEVELS } from './lib/levels';
import { LevelMap } from './lib/types';

export default function App() {
  const [activeLevel, setActiveLevel] = useState<LevelMap | null>(null);

  return (
    <div className="w-full h-screen bg-[#0a0b0d] text-[#e0e0e0] font-sans overflow-hidden">
      {activeLevel ? (
        <GameScreen 
          level={activeLevel} 
          onExit={() => setActiveLevel(null)} 
        />
      ) : (
        <Menu 
          onSelectLevel={(id) => {
            const level = LEVELS.find(l => l.id === id);
            if (level) setActiveLevel(level);
          }} 
        />
      )}
    </div>
  );
}
