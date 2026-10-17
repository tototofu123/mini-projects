export type PlayerId = 'human' | 'ai1' | 'ai2' | 'ai3';

export interface NodeData {
  id: string;
  x: number;
  y: number;
  type: 'N' | 'G' | '1' | '2' | '3' | '4';
}

export interface Pawn {
  id: string;
  playerId: PlayerId;
  nodeId: string;
}

export interface LevelMap {
  id: string;
  name: string;
  nodes: Record<string, NodeData>;
  edges: Record<string, string[]>;
  initialPawns: Pawn[];
  initialBarricades: string[];
  goalId: string;
  players: PlayerId[];
}

export type GamePhase = 'ROLL' | 'MOVE' | 'PLACE_BARRICADE' | 'GAME_OVER';

export interface GameState {
  levelId: string;
  turnOrder: PlayerId[];
  turnIndex: number;
  phase: GamePhase;
  diceValue: number | null;
  selectedPawn: string | null;
  pawns: Pawn[];
  barricades: string[];
  winner: PlayerId | null;
  humanToPlace: string | null;
}

export type Action =
  | { type: 'ROLL_DICE'; value: number }
  | { type: 'SELECT_PAWN'; pawnId: string }
  | { type: 'MOVE_PAWN'; pawnId: string; targetId: string }
  | { type: 'PLACE_BARRICADE'; targetId: string }
  | { type: 'SKIP_TURN' }
  | { type: 'RESET_GAME'; level: LevelMap };
