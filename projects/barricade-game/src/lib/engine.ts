import { Action, GameState, LevelMap, Pawn, PlayerId, GamePhase } from './types';

export function getBaseTypeForPlayer(pId: PlayerId): string {
  switch (pId) {
    case 'human': return '1';
    case 'ai1': return '2';
    case 'ai2': return '3';
    case 'ai3': return '4';
    default: return '1';
  }
}

export function getValidMoves(
  state: GameState,
  level: LevelMap,
  startNodeId: string,
  steps: number
): string[] {
  const validDestinations = new Set<string>();

  function dfs(current: string, remaining: number, visited: Set<string>) {
    if (remaining === 0) {
      validDestinations.add(current);
      return;
    }

    // Path Blocked by barricade
    if (remaining > 0 && current !== startNodeId && state.barricades.includes(current)) {
      return;
    }

    const neighbors = level.edges[current] || [];
    for (const next of neighbors) {
      if (!visited.has(next)) {
        const newVisited = new Set(visited);
        newVisited.add(next);
        dfs(next, remaining - 1, newVisited);
      }
    }
  }

  dfs(startNodeId, steps, new Set([startNodeId]));

  const startPawn = state.pawns.find(p => p.nodeId === startNodeId);
  const myPlayerId = startPawn?.playerId;
  const isStartBase = ['1', '2', '3', '4'].includes(level.nodes[startNodeId]?.type);

  return Array.from(validDestinations).filter(dest => {
    const node = level.nodes[dest];
    
    // Cannot land on own pawn
    const pawnAtDest = state.pawns.find(p => p.nodeId === dest);
    if (pawnAtDest && pawnAtDest.playerId === myPlayerId) return false;

    // Disallow entering any base from the board, or moving into another opponent's base
    const isTargetBase = ['1', '2', '3', '4'].includes(node.type);
    if (!isStartBase && isTargetBase) return false;
    
    // Disallow going into an opponent's base if starting from own base 
    // (Only happens if bases inexplicably connected directly, but good safety check)
    if (isTargetBase && node.type !== getBaseTypeForPlayer(myPlayerId!)) return false;

    return true;
  });
}

export function evaluateMove(state: GameState, level: LevelMap, pawn: Pawn, targetId: string) {
  let score = 0;
  if (targetId === level.goalId) return 100000;
  if (state.barricades.includes(targetId)) score += 500;

  const isCapturingOpponent = state.pawns.some(
    p => p.nodeId === targetId && p.playerId !== pawn.playerId
  );
  if (isCapturingOpponent) score += 300;

  const targetNode = level.nodes[targetId];
  const maxBoardY = Math.max(...Object.values(level.nodes).map(n => n.y));
  
  // Advance score -> going up towards 0 is better
  score += (maxBoardY - targetNode.y) * 10;

  // Leaving start base
  if (['1', '2', '3', '4'].includes(level.nodes[pawn.nodeId].type)) {
    score += 50;
  }

  return score;
}

export const createGameReducer = (level: LevelMap) => (state: GameState, action: Action): GameState => {
  if (state.phase === 'GAME_OVER' && action.type !== 'RESET_GAME') return state;

  switch (action.type) {
    case 'RESET_GAME':
      return {
        levelId: action.level.id,
        turnOrder: action.level.players,
        turnIndex: 0,
        phase: 'ROLL',
        diceValue: null,
        selectedPawn: null,
        pawns: action.level.initialPawns,
        barricades: action.level.initialBarricades,
        winner: null,
        humanToPlace: null
      };

    case 'ROLL_DICE':
      if (state.phase !== 'ROLL') return state;
      return { ...state, diceValue: action.value, phase: 'MOVE', selectedPawn: null };

    case 'SELECT_PAWN':
      if (state.phase !== 'MOVE') return state;
      const p = state.pawns.find(p => p.id === action.pawnId);
      if (!p || p.playerId !== state.turnOrder[state.turnIndex]) return state;
      return { ...state, selectedPawn: action.pawnId };

    case 'MOVE_PAWN': {
      if (state.phase !== 'MOVE') return state;
      const { pawnId, targetId } = action;

      const movingPawn = state.pawns.find(p => p.id === pawnId);
      if (!movingPawn) return state;

      let nextPhase = 'ROLL' as GamePhase;
      let nextTurn = (state.turnIndex + 1) % state.turnOrder.length;
      let winner = state.winner;
      let humanToPlace = null;

      const newBarricades = state.barricades.filter(b => b !== targetId);

      // Check win condition
      if (level.goalId === targetId) {
        nextPhase = 'GAME_OVER';
        winner = movingPawn.playerId;
      } 
      // Check barricade capture
      else if (state.barricades.includes(targetId)) {
        nextPhase = 'PLACE_BARRICADE';
        nextTurn = state.turnIndex; // Continue current turn until placed
        if (movingPawn.playerId === 'human') {
          humanToPlace = pawnId;
        }
      }

      // Update pawns and handle opponent capture
      const newPawns = state.pawns.map(p => {
        if (p.id === pawnId) {
          return { ...p, nodeId: targetId };
        }
        if (p.nodeId === targetId) {
          // Send back to empty base
          const baseType = getBaseTypeForPlayer(p.playerId);
          const bases = Object.values(level.nodes).filter(n => n.type === baseType);
          const emptyBase = bases.find(
            b => !state.pawns.some(xp => xp.nodeId === b.id && xp.id !== p.id)
          );
          return { ...p, nodeId: emptyBase ? emptyBase.id : p.nodeId };
        }
        return p;
      });

      return {
        ...state,
        pawns: newPawns,
        barricades: newBarricades,
        phase: nextPhase,
        turnIndex: nextTurn,
        diceValue: null,
        selectedPawn: null,
        winner,
        humanToPlace
      };
    }

    case 'PLACE_BARRICADE': {
      if (state.phase !== 'PLACE_BARRICADE') return state;
      const newBarricades = [...state.barricades, action.targetId];
      const nextTurn = (state.turnIndex + 1) % state.turnOrder.length;
      return {
        ...state,
        barricades: newBarricades,
        phase: 'ROLL',
        turnIndex: nextTurn,
        humanToPlace: null
      };
    }

    case 'SKIP_TURN': {
      const nextTurn = (state.turnIndex + 1) % state.turnOrder.length;
      return {
        ...state,
        phase: 'ROLL',
        turnIndex: nextTurn,
        diceValue: null,
        selectedPawn: null
      };
    }

    default:
      return state;
  }
};
