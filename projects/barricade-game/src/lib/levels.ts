import { LevelMap, NodeData, Pawn, PlayerId } from './types';

const MAPS = {
  'level-1': {
    name: 'Tutorial Valley (2 Players)',
    players: ['human', 'ai1'] as PlayerId[],
    grid: [
      "      G      ",
      "      N      ",
      "    NNBNN    ",
      "    N   N    ",
      "  NNN   NNN  ",
      "  N       N  ",
      "  1       2  ",
      "  1       2  ",
      "  1       2  "
    ]
  },
  'level-2': {
    name: 'The Divide (3 Players)',
    players: ['human', 'ai1', 'ai2'] as PlayerId[],
    grid: [
      "      G      ",
      "      B      ",
      "      N      ",
      "    NNNNN    ",
      "    B   B    ",
      "  NNNNNNNNN  ",
      "  N   B   N  ",
      "  NNNNNNNNN  ",
      "  N   N   N  ",
      "  1   2   3  ",
      "  1   2   3  ",
      "  1   2   3  ",
      "  1   2   3  "
    ]
  },
  'level-3': {
    name: 'Barricade Pass (4 Players)',
    players: ['human', 'ai1', 'ai2', 'ai3'] as PlayerId[],
    grid: [
      "        G        ",
      "        B        ",
      "       NNN       ",
      "       N N       ",
      "    NNNN BNNN    ",
      "    B   N   B    ",
      "  NNNNNNNNNNNNN  ",
      "  N   B   B   N  ",
      "  NNNNNNNNNNNNN  ",
      "  N   N   N   N  ",
      "  1   2   3   4  ",
      "  1   2   3   4  ",
      "  1   2   3   4  ",
      "  1   2   3   4  "
    ]
  }
};

export function parseGrid(id: string): LevelMap {
  const mapData = MAPS[id as keyof typeof MAPS];
  const gridRows = mapData.grid;
  
  const nodes: Record<string, NodeData> = {};
  const edges: Record<string, string[]> = {};
  const initialPawns: Pawn[] = [];
  const initialBarricades: string[] = [];
  let goalId = '';

  let pawnCounter = 0;

  for (let y = 0; y < gridRows.length; y++) {
    for (let x = 0; x < gridRows[y].length; x++) {
      const char = gridRows[y][x];
      if (char === ' ') continue;

      const nodeId = `${x},${y}`;
      const type = (char === 'B' ? 'N' : char) as NodeData['type'];
      nodes[nodeId] = { id: nodeId, x, y, type };
      edges[nodeId] = [];

      if (char === 'G') goalId = nodeId;
      if (char === 'B') initialBarricades.push(nodeId);

      if (['1', '2', '3', '4'].includes(char)) {
        const pIdMap: Record<string, PlayerId> = {
          '1': 'human', '2': 'ai1', '3': 'ai2', '4': 'ai3'
        };
        const playerId = pIdMap[char];
        if (mapData.players.includes(playerId)) {
          initialPawns.push({
            id: `p_${pawnCounter++}`,
            playerId,
            nodeId
          });
        }
      }
    }
  }

  // Build edges
  for (const id in nodes) {
    const { x, y } = nodes[id];
    // Check adjacent geometric positions
    const neighbors = [
      `${x + 1},${y}`,
      `${x - 1},${y}`,
      `${x},${y + 1}`,
      `${x},${y - 1}`
    ];

    for (const n of neighbors) {
      if (nodes[n]) {
        edges[id].push(n);
      }
    }
  }

  return {
    id,
    name: mapData.name,
    nodes,
    edges,
    initialPawns,
    initialBarricades,
    goalId,
    players: mapData.players
  };
}

export const LEVELS = Object.keys(MAPS).map(parseGrid);
