import React from 'react';
import { motion } from 'motion/react';
import { LEVELS } from '../lib/levels';

interface MenuProps {
  onSelectLevel: (levelId: string) => void;
}

export function Menu({ onSelectLevel }: MenuProps) {
  return (
    <div className="min-h-screen bg-[#0a0b0d] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-5 pointer-events-none" style={{ backgroundImage: "radial-gradient(#c5a47e 2px, transparent 2px)", backgroundSize: "30px 30px" }} />
      
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="z-10 text-center mb-16"
      >
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="w-10 h-10 border-2 border-[#c5a47e] rotate-45 flex items-center justify-center">
            <div className="w-4 h-4 bg-[#c5a47e]"></div>
          </div>
          <h1 className="text-4xl font-serif tracking-widest text-[#f5f5f5] uppercase">
            Barricade <span className="text-[#c5a47e] text-lg align-middle opacity-60 ml-2">V.04</span>
          </h1>
        </div>
        <p className="text-sm font-mono text-[#888] uppercase tracking-widest mt-6">Outsmart the algorithms in this classic race.</p>
      </motion.div>

      <div className="z-10 grid gap-6 w-full max-w-2xl px-4">
        {LEVELS.map((level, i) => (
          <motion.button
            key={level.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            onClick={() => onSelectLevel(level.id)}
            className="bg-[#15171a] border border-[#2a2a2c] p-6 hover:border-[#c5a47e] transition-all text-left flex items-center justify-between group outline-none focus-visible:ring-1 focus-visible:ring-[#c5a47e] focus-visible:border-[#c5a47e]"
          >
            <div>
              <h2 className="text-lg font-serif text-[#e0e0e0] group-hover:text-[#c5a47e] transition-colors">{level.name}</h2>
              <p className="text-[#888] font-mono text-[10px] uppercase tracking-widest mt-2">Level {i + 1} &bull; {level.players.length} Players</p>
            </div>
            
            <div className="flex gap-1.5 opacity-50 group-hover:opacity-100 transition-opacity">
               {level.players.map((p, idx) => (
                 <div key={idx} className="w-2 h-2" style={{ backgroundColor: p === 'human' ? '#c5a47e' : p === 'ai1' ? '#ef4444' : p === 'ai2' ? '#3b82f6' : '#22c55e' }} />
               ))}
               <div className="w-2 h-2 bg-[#2a2a2c]" />
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
