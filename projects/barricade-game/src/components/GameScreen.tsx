import { motion } from 'motion/react';
import React, { useEffect, useReducer, useState } from 'react';
import { Board } from './Board';
import { Dice } from './Dice';
import { LevelMap } from '../lib/types';
import { createGameReducer, getValidMoves, evaluateMove } from '../lib/engine';

interface GameScreenProps {
  level: LevelMap;
  onExit: () => void;
}

export function GameScreen({ level, onExit }: GameScreenProps) {
  const [state, dispatch] = useReducer(createGameReducer(level), {
    levelId: level.id,
    turnOrder: level.players,
    turnIndex: 0,
    phase: 'ROLL',
    diceValue: null,
    selectedPawn: null,
    pawns: level.initialPawns,
    barricades: level.initialBarricades,
    winner: null,
    humanToPlace: null
  });

  const [tutorialStep, setTutorialStep] = useState(level.id === 'level-1' ? 0 : -1);

  const currentPlayer = state.turnOrder[state.turnIndex];
  const isHumanTurn = currentPlayer === 'human';

  // AI Turn Logic
  useEffect(() => {
    if (state.phase === 'GAME_OVER') return;

    if (!isHumanTurn) {
      let timeoutId: number;

      if (state.phase === 'ROLL') {
        timeoutId = window.setTimeout(() => {
          dispatch({ type: 'ROLL_DICE', value: Math.floor(Math.random() * 6) + 1 });
        }, 1200);
      } else if (state.phase === 'MOVE' && state.diceValue) {
        timeoutId = window.setTimeout(() => {
          const myPawns = state.pawns.filter(p => p.playerId === currentPlayer);
          let bestMove: { pawnId: string, targetId: string, score: number } | null = null;

          for (const pawn of myPawns) {
            const targets = getValidMoves(state, level, pawn.nodeId, state.diceValue!);
            for (const target of targets) {
              const score = evaluateMove(state, level, pawn, target);
              if (!bestMove || score > bestMove.score) {
                bestMove = { pawnId: pawn.id, targetId: target, score };
              }
            }
          }

          if (bestMove) {
            dispatch({ type: 'MOVE_PAWN', pawnId: bestMove.pawnId, targetId: bestMove.targetId });
          } else {
            dispatch({ type: 'SKIP_TURN' });
          }
        }, 1500); // 1.5s thinking time
      } else if (state.phase === 'PLACE_BARRICADE') {
        timeoutId = window.setTimeout(() => {
          const validNodes = Object.values(level.nodes).filter(
            n => n.type === 'N' && !state.barricades.includes(n.id) && !state.pawns.some(p => p.nodeId === n.id)
          );
          // Simple AI: pick random valid place for barricade
          if (validNodes.length > 0) {
            const target = validNodes[Math.floor(Math.random() * validNodes.length)].id;
            dispatch({ type: 'PLACE_BARRICADE', targetId: target });
          } else {
             // Fallback (shouldn't happen on a big board)
             dispatch({ type: 'SKIP_TURN' }); // Force next turn
          }
        }, 1200);
      }
      return () => window.clearTimeout(timeoutId);
    }
  }, [state, isHumanTurn, currentPlayer, level]);

  // Human Auto-Skip if no moves available
  useEffect(() => {
    if (isHumanTurn && state.phase === 'MOVE' && state.diceValue) {
      const myPawns = state.pawns.filter(p => p.playerId === 'human');
      const validTargets = myPawns.flatMap(p => getValidMoves(state, level, p.nodeId, state.diceValue!));
      if (validTargets.length === 0) {
        const timeout = setTimeout(() => {
          dispatch({ type: 'SKIP_TURN' });
        }, 2000);
        return () => clearTimeout(timeout);
      }
    }
  }, [isHumanTurn, state.phase, state.diceValue, state.pawns, state.barricades, state.turnIndex]);

  // Tutorial progression
  useEffect(() => {
    if (tutorialStep >= 0 && isHumanTurn) {
      if (tutorialStep === 0 && state.phase === 'ROLL') setTutorialStep(1);
      if (tutorialStep === 1 && state.phase === 'MOVE') setTutorialStep(2);
      if (tutorialStep === 2 && state.selectedPawn) setTutorialStep(3);
      if (tutorialStep === 3 && state.phase === 'ROLL' && !isHumanTurn) setTutorialStep(4);
      if (tutorialStep === 4 && state.phase === 'PLACE_BARRICADE') setTutorialStep(5);
    }
  }, [state.phase, state.selectedPawn, isHumanTurn, tutorialStep]);


  const handleRoll = () => {
    if (isHumanTurn && state.phase === 'ROLL') {
      const roll = Math.floor(Math.random() * 6) + 1;
      dispatch({ type: 'ROLL_DICE', value: roll });
    }
  };

  const statusText = () => {
    if (state.phase === 'GAME_OVER') return `${state.winner === 'human' ? 'You Win!' : state.winner?.toUpperCase() + ' Wins!'}`;
    if (!isHumanTurn) {
      if (state.phase === 'ROLL') return `${currentPlayer.toUpperCase()} is rolling...`;
      if (state.phase === 'MOVE') return `${currentPlayer.toUpperCase()} is thinking...`;
      if (state.phase === 'PLACE_BARRICADE') return `${currentPlayer.toUpperCase()} is placing a barricade...`;
    }
    if (state.phase === 'ROLL') return "It's your turn! Roll the dice.";
    if (state.phase === 'MOVE') return "Select a pawn to move.";
    if (state.phase === 'PLACE_BARRICADE') return "You captured a barricade! Click an empty space to place it.";
    return "";
  };

  return (
    <div className="flex flex-col h-full bg-[#0a0b0d] overflow-hidden text-[#e0e0e0]">
      <header className="h-20 border-b border-[#2a2a2c] px-4 md:px-8 flex items-center justify-between bg-[#0f1114]">
        <div className="flex items-center gap-4">
          <div className="hidden md:flex w-8 h-8 border-2 border-[#c5a47e] rotate-45 items-center justify-center">
            <div className="w-3 h-3 bg-[#c5a47e]"></div>
          </div>
          <h1 className="font-serif text-xl md:text-2xl tracking-widest text-[#f5f5f5] uppercase">
            BARRICADE <span className="text-[#c5a47e] text-[10px] align-middle opacity-60 ml-2">V.04</span>
          </h1>
        </div>
        <div className="flex items-center gap-6 md:gap-12">
          <div className="text-center md:block hidden">
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#888]">Current Tier</p>
            <p className="font-serif text-sm md:text-lg text-[#c5a47e]">{level.name}</p>
          </div>
          <div className="hidden md:block h-10 w-px bg-[#2a2a2c]"></div>
          <div className="flex gap-4">
            <button 
              onClick={onExit}
              className="px-4 md:px-6 py-2 border border-[#c5a47e] text-[#c5a47e] text-[10px] uppercase tracking-widest hover:bg-[#c5a47e] hover:text-black transition-colors"
            >
              Restart Mode
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col lg:flex-row p-4 md:p-8 gap-8 overflow-hidden min-h-0">
        <aside className="w-full lg:w-64 flex flex-col gap-6 shrink-0 h-48 lg:h-auto overflow-y-auto">
          <div className="p-5 bg-[#15171a] border border-[#2a2a2c]">
            <h2 className="text-[10px] uppercase tracking-[0.2em] text-[#888] mb-4">Diagnostics</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-end border-b border-[#2a2a2c] pb-2">
                <span className="text-xs font-serif italic text-[#888]">Status</span>
                <span className="text-[10px] font-mono text-[#c5a47e] uppercase">{statusText()}</span>
              </div>
              <div className="flex justify-between items-end border-b border-[#2a2a2c] pb-2">
                <span className="text-xs font-serif italic text-[#888]">Barricades Unlocked</span>
                <span className="text-xs font-mono text-[#c5a47e]">{state.barricades.length}</span>
              </div>
              <div className="flex justify-between items-end border-b border-[#2a2a2c] pb-2">
                <span className="text-xs font-serif italic text-[#888]">Current Phase</span>
                <span className="text-xs font-mono text-[#c5a47e]">{state.phase}</span>
              </div>
            </div>
          </div>
          <div className="p-5 bg-[#15171a] border border-[#2a2a2c] flex-1 min-h-[160px]">
            <h2 className="text-[10px] uppercase tracking-[0.2em] text-[#888] mb-4">Turn Sequence</h2>
            <div className="space-y-4">
              {state.turnOrder.map(playerId => {
                const isActive = currentPlayer === playerId;
                const isHuman = playerId === 'human';
                const pColor = isHuman ? '#c5a47e' : playerId === 'ai1' ? '#ef4444' : playerId === 'ai2' ? '#3b82f6' : '#22c55e';
                return (
                  <div key={playerId} className={`flex items-center gap-3 transition-opacity ${isActive ? 'opacity-100' : 'opacity-40'}`}>
                    <div className={`w-2 h-2 ${isActive && isHuman ? 'shadow-[0_0_8px_rgba(197,164,126,0.5)] bg-[#c5a47e]' : isActive && !isHuman ? 'shadow-[0_0_8px_rgba(239,68,68,0.5)] bg-red-500' : ''}`} style={isActive ? {} : { backgroundColor: pColor }} />
                    <span className={`text-[10px] font-mono uppercase ${isActive ? 'text-[#e0e0e0]' : 'text-[#888]'}`}>
                      {isHuman ? 'USER_INTERFACE_01' : `AI_UNIT_${playerId.toUpperCase()}`} {isActive ? '[ACTIVE]' : ''}
                    </span>
                  </div>
                );
              })}
              <div className="mt-4 pt-4 border-t border-[#2a2a2c]">
                <div className="flex justify-center my-2">
                  <Dice 
                    value={state.diceValue} 
                    onRoll={handleRoll} 
                    disabled={!isHumanTurn || state.phase !== 'ROLL'} 
                  />
                </div>
              </div>
            </div>
          </div>
        </aside>

        <div className="flex-1 flex flex-col items-center justify-center bg-[#0d0f11] border border-[#2a2a2c] relative overflow-hidden">
          <Board
            level={level}
            gameState={state}
            onSelectPawn={(id) => dispatch({ type: 'SELECT_PAWN', pawnId: id })}
            onMovePawn={(targetId) => {
              if (state.selectedPawn) {
                dispatch({ type: 'MOVE_PAWN', pawnId: state.selectedPawn, targetId });
              }
            }}
            onPlaceBarricade={(targetId) => dispatch({ type: 'PLACE_BARRICADE', targetId })}
          />

          {/* Tutorial Overlay Card */}
          {tutorialStep >= 0 && tutorialStep <= 5 && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-6 left-6 md:w-80 w-[calc(100%-3rem)] bg-[#1a1d21]/90 backdrop-blur-md border border-[#c5a47e]/30 p-5 shadow-2xl z-10 pointer-events-none"
            >
              <div className="flex justify-between items-start mb-3">
                <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#c5a47e]">Tutorial: Phase 1</span>
                <span className="text-[10px] text-[#666] font-mono">Step 0{(tutorialStep+1)}/06</span>
              </div>
              <p className="text-xs text-[#aaa] leading-relaxed font-mono">
                {tutorialStep === 0 && "Welcome! Reach the Gold Star exactly. You are playing as Gold."}
                {tutorialStep === 1 && "Click the dice to roll and determine logic cycles."}
                {tutorialStep === 2 && "Click one of your user tokens (Gold) to visualize valid pathing."}
                {tutorialStep === 3 && "Click a highlighted matrix node to execute translation."}
                {tutorialStep === 4 && "Routing complete. Awaiting logic execution from AI units."}
                {tutorialStep === 5 && "Barricades (black blocks) cause path denial. Collide with them to reset their coordinates."}
              </p>
            </motion.div>
          )}

          {state.phase === 'GAME_OVER' && (
             <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-[#0a0b0d]/80 backdrop-blur-sm flex flex-col items-center justify-center z-50 p-4"
            >
               <div className="bg-[#15171a] border border-[#2a2a2c] p-10 shadow-2xl max-w-sm w-full text-center">
                 <h2 className="text-3xl font-serif tracking-wide text-[#c5a47e] mb-2 uppercase">
                   {state.winner === 'human' ? 'System Cleared' : 'Override Failed'}
                 </h2>
                 <p className="text-[#888] font-mono text-xs uppercase tracking-widest mb-8">
                   {state.winner === 'human' ? 'Perimeter secured successfully.' : `Compromised by ${state.winner?.toUpperCase()}.`}
                 </p>
                 <button 
                  onClick={onExit}
                  className="w-full py-3 px-6 bg-[#c5a47e] hover:bg-[#b0916a] text-black font-bold text-xs uppercase tracking-widest transition-colors"
                 >
                   Return to Interface
                 </button>
               </div>
            </motion.div>
          )}
        </div>
      </main>
      
      <footer className="h-12 border-t border-[#2a2a2c] bg-[#0f1114] px-8 flex items-center justify-between text-[8px] md:text-[10px] uppercase tracking-[0.3em] text-[#444] shrink-0">
        <div>User Connection: <span className="text-[#666]">Stable</span></div>
      </footer>
    </div>
  );
}
