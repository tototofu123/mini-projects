import { motion } from 'motion/react';
import React from 'react';
import { GameState, LevelMap } from '../lib/types';
import { cn } from '../lib/utils';
import { getValidMoves } from '../lib/engine';

interface BoardProps {
  level: LevelMap;
  gameState: GameState;
  onSelectPawn: (pawnId: string) => void;
  onMovePawn: (targetId: string) => void;
  onPlaceBarricade: (targetId: string) => void;
}

const PLAYER_COLORS = {
  human: '#c5a47e', // gold
  ai1: '#ef4444',   // red
  ai2: '#3b82f6',   // blue
  ai3: '#22c55e'    // green
};

export function Board({ level, gameState, onSelectPawn, onMovePawn, onPlaceBarricade }: BoardProps) {
  const cellSize = 60;
  
  const minX = Math.min(...Object.values(level.nodes).map(n => n.x));
  const maxX = Math.max(...Object.values(level.nodes).map(n => n.x));
  const minY = Math.min(...Object.values(level.nodes).map(n => n.y));
  const maxY = Math.max(...Object.values(level.nodes).map(n => n.y));

  const width = (maxX - minX + 1) * cellSize;
  const height = (maxY - minY + 1) * cellSize;
  const padding = 40;
  
  const viewBox = `${minX * cellSize - padding} ${minY * cellSize - padding} ${width + padding * 2} ${height + padding * 2}`;

  // Find valid moves if a pawn is selected
  let validMoveIds: string[] = [];
  if (gameState.phase === 'MOVE' && gameState.selectedPawn && gameState.diceValue) {
    const pawn = gameState.pawns.find(p => p.id === gameState.selectedPawn);
    if (pawn) {
      validMoveIds = getValidMoves(gameState, level, pawn.nodeId, gameState.diceValue);
    }
  }

  // Find valid barricade targets
  let validBarricadeTargets: string[] = [];
  if (gameState.phase === 'PLACE_BARRICADE' && gameState.turnOrder[gameState.turnIndex] === 'human') {
    validBarricadeTargets = Object.values(level.nodes)
      .filter(n => n.type === 'N' && !gameState.barricades.includes(n.id) && !gameState.pawns.some(p => p.nodeId === n.id))
      .map(n => n.id);
  }

  const isHumanTurn = gameState.turnOrder[gameState.turnIndex] === 'human';

  return (
    <div className="w-full h-full flex items-center justify-center p-4">
      <svg 
        viewBox={viewBox} 
        preserveAspectRatio="xMidYMid meet"
        className="w-full h-full max-w-4xl"
      >
        <defs>
          <radialGradient id="glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#c5a47e" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#c5a47e" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Draw Edges */}
        {Object.entries(level.edges).map(([nodeId, neighbors]) => {
          const from = level.nodes[nodeId];
          return neighbors.map(neighborId => {
            const to = level.nodes[neighborId];
            if (!to) return null;
            // Draw each line once (to avoid double drawing)
            if (from.id < to.id) {
              return (
                <line 
                  key={`${from.id}-${to.id}`}
                  x1={from.x * cellSize} 
                  y1={from.y * cellSize}
                  x2={to.x * cellSize} 
                  y2={to.y * cellSize}
                  stroke="#2a2a2c"
                  strokeWidth="4"
                />
              );
            }
            return null;
          });
        })}

        {/* Draw Nodes */}
        {Object.values(level.nodes).map(node => {
          const cx = node.x * cellSize;
          const cy = node.y * cellSize;
          const isGoal = node.type === 'G';
          const isBase = ['1', '2', '3', '4'].includes(node.type);

          return (
            <g key={node.id}>
              <rect
                x={cx - (isGoal ? 20 : isBase ? 16 : 12)}
                y={cy - (isGoal ? 20 : isBase ? 16 : 12)}
                width={isGoal ? 40 : isBase ? 32 : 24}
                height={isGoal ? 40 : isBase ? 32 : 24}
                fill={isGoal ? 'rgba(197, 164, 126, 0.1)' : isBase ? '#0f1114' : '#15171a'}
                stroke={isGoal ? '#c5a47e' : '#333'}
                strokeWidth={isGoal ? "2" : "1"}
              />
              {isGoal && (
                <text x={cx} y={cy} textAnchor="middle" dominantBaseline="central" className="text-xl font-sans fill-[#c5a47e]">
                  ★
                </text>
              )}
              {isBase && (
                <text x={cx} y={cy} textAnchor="middle" dominantBaseline="central" className="text-[10px] font-mono fill-[#666]">
                  {node.type}
                </text>
              )}
            </g>
          );
        })}

        {/* Draw Barricades */}
        {gameState.barricades.map(id => {
          const node = level.nodes[id];
          if (!node) return null;
          return (
            <rect
              key={`barricade-${id}`}
              x={node.x * cellSize - 16}
              y={node.y * cellSize - 16}
              width={32}
              height={32}
              fill="#c5a47e"
              style={{ pointerEvents: 'none' }}
            />
          );
        })}

        {/* Draw Pawns */}
        {gameState.pawns.map(pawn => {
          const node = level.nodes[pawn.nodeId];
          if (!node) return null;
          const isSelected = gameState.selectedPawn === pawn.id;
          const isSelectable = gameState.phase === 'MOVE' && isHumanTurn && pawn.playerId === 'human';

          return (
            <motion.g
              key={pawn.id}
              className={cn(isSelectable ? "cursor-pointer" : "cursor-default")}
              animate={{ 
                scale: isSelected ? 1.2 : 1,
              }}
              onClick={() => {
                if (isSelectable) onSelectPawn(pawn.id);
              }}
            >
              {pawn.playerId === 'human' ? (
                <g>
                  <rect x={node.x * cellSize - 12} y={node.y * cellSize - 12} width={24} height={24} fill="#c5a47e" stroke="#0a0b0d" strokeWidth="2" />
                  <rect x={node.x * cellSize - 2} y={node.y * cellSize - 2} width={4} height={4} fill="#000" />
                </g>
              ) : (
                <rect 
                  x={node.x * cellSize - 10} 
                  y={node.y * cellSize - 10} 
                  width={20} 
                  height={20} 
                  fill="transparent" 
                  stroke={PLAYER_COLORS[pawn.playerId]} 
                  strokeWidth="2" 
                  transform={`rotate(45 ${node.x * cellSize} ${node.y * cellSize})`}
                />
              )}
            </motion.g>
          );
        })}

        {/* Draw Valid Move Highlights */}
        {validMoveIds.map(id => {
          const node = level.nodes[id];
          return (
            <motion.rect
              key={`highlight-${id}`}
              x={node.x * cellSize - 24}
              y={node.y * cellSize - 24}
              width={48}
              height={48}
              fill="url(#glow)"
              className="cursor-pointer"
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ repeat: Infinity, duration: 2 }}
              onClick={() => onMovePawn(id)}
            />
          );
        })}

        {/* Draw Barricade Placement Highlights */}
        {validBarricadeTargets.map(id => {
          const node = level.nodes[id];
          return (
            <motion.rect
              key={`barricade-target-${id}`}
              x={node.x * cellSize - 15}
              y={node.y * cellSize - 15}
              width={30}
              height={30}
              fill="transparent"
              stroke="#c5a47e"
              strokeWidth="2"
              strokeDasharray="4 4"
              className="cursor-pointer"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              onClick={() => onPlaceBarricade(id)}
            />
          );
        })}
      </svg>
    </div>
  );
}
