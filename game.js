const GRID_SIZE = 9;
        const boardElement = document.getElementById('board');
        const p1WallsElement = document.getElementById('p1-walls');
        const p2WallsElement = document.getElementById('p2-walls');
        const turnIndicator = document.getElementById('turn-indicator');
        const wallModeIndicator = document.getElementById('wall-mode-indicator');
        const p1Panel = document.getElementById('p1-panel');
        const p2Panel = document.getElementById('p2-panel');
        const wallToolElement = document.getElementById('wall-tool');
        const wallToolCount = document.getElementById('wall-tool-count');
        const wallToolPiece = document.getElementById('wall-tool-piece');
        const cursorWall = document.getElementById('cursor-wall');

        let state = {
            players: [
                { r: 8, c: 4, walls: 10, goal: 0, color: 'pawn-1' },
                { r: 0, c: 4, walls: 10, goal: 8, color: 'pawn-2' }
            ],
            turn: 0, // 0 for P1, 1 for P2
            walls: [], // { r, c, orientation: 'h'|'v' }
            wallOrientation: 'h',
            isGameOver: false,
            isDraggingWall: false
        };

        function getBoardMetrics() {
            const boardStyles = getComputedStyle(boardElement);
            const firstCell = getCell(0, 0);
            const cellRect = firstCell ? firstCell.getBoundingClientRect() : null;
            const cellSize = cellRect ? cellRect.width : 48;
            const gapSize = parseFloat(boardStyles.columnGap) || 12;
            const padding = parseFloat(boardStyles.paddingLeft) || 24;
            return { cellSize, gapSize, padding };
        }

        function initBoard() {
            boardElement.innerHTML = '';
            for (let r = 0; r < GRID_SIZE; r++) {
                for (let c = 0; c < GRID_SIZE; c++) {
                    const cell = document.createElement('div');
                    cell.className = 'cell';
                    cell.dataset.r = r;
                    cell.dataset.c = c;
                    cell.onclick = () => handleCellClick(r, c);
                    cell.onmousemove = (e) => {
                        if (state.isDraggingWall) {
                            updateWallPreviewFromPointer(e.clientX, e.clientY);
                        }
                    };
                    boardElement.appendChild(cell);
                }
            }
            render();
        }

        function render() {
            // Clear previous pawns and highlights
            document.querySelectorAll('.pawn').forEach(p => p.remove());
            document.querySelectorAll('.cell').forEach(c => c.classList.remove('highlight', 'preview-affected'));
            document.querySelectorAll('.wall').forEach(w => w.remove());

            // Render Pawns
            state.players.forEach((p, index) => {
                const cell = getCell(p.r, p.c);
                const pawn = document.createElement('div');
                pawn.className = `pawn ${p.color}`;
                cell.appendChild(pawn);
            });

            // Render Walls
            const metrics = getBoardMetrics();
            state.walls.forEach(wall => {
                const wallEl = document.createElement('div');
                wallEl.className = `wall ${wall.orientation === 'h' ? 'horizontal' : 'vertical'}`;
                const rect = getWallRect(wall.r, wall.c, wall.orientation, metrics);
                wallEl.style.top = `${rect.top}px`;
                wallEl.style.left = `${rect.left}px`;
                boardElement.appendChild(wallEl);
            });

            // Render Wall Banks
            renderBank(p1WallsElement, state.players[0].walls, 0);
            renderBank(p2WallsElement, state.players[1].walls, 1);

            // Turn Indicator
            turnIndicator.textContent = state.isGameOver ? `Player ${state.turn + 1} Wins!` : `Player ${state.turn + 1}'s Turn`;
            turnIndicator.className = `turn-${state.turn + 1}`;
            wallModeIndicator.textContent = `Wall: ${state.wallOrientation === 'h' ? 'Horizontal' : 'Vertical'} (Press R to rotate)`;
            updateWallToolUI();

            p1Panel.classList.toggle('active', state.turn === 0 && !state.isGameOver);
            p2Panel.classList.toggle('active', state.turn === 1 && !state.isGameOver);

            if (!state.isGameOver) highlightValidMoves();
        }

        function renderBank(element, count, playerIdx) {
            element.innerHTML = '';
            for (let i = 0; i < count; i++) {
                const w = document.createElement('div');
                w.className = 'bank-wall';
                if (state.turn !== playerIdx || state.isGameOver) {
                    w.style.opacity = '0.35';
                    w.style.cursor = 'not-allowed';
                }
                element.appendChild(w);
            }
        }

        function updateWallToolUI() {
            const wallsLeft = state.players[state.turn].walls;
            const canUseWallTool = !state.isGameOver && wallsLeft > 0;
            wallToolCount.textContent = `${wallsLeft} left`;
            wallToolElement.disabled = !canUseWallTool;
            wallToolElement.classList.toggle('active', state.isDraggingWall);

            wallToolPiece.className = `wall-tool-piece ${state.wallOrientation === 'h' ? 'horizontal' : 'vertical'}`;
            cursorWall.className = `cursor-wall ${state.wallOrientation === 'h' ? 'horizontal' : 'vertical'}`;
        }

        function startWallDrag() {
            if (state.isGameOver || state.players[state.turn].walls === 0) return;
            state.isDraggingWall = true;
            document.body.classList.add('wall-tool-active');
            boardElement.classList.add('drag-active');
            cursorWall.style.display = 'block';
            updateWallToolUI();
        }

        function stopWallDrag() {
            state.isDraggingWall = false;
            document.body.classList.remove('wall-tool-active');
            boardElement.classList.remove('drag-active');
            cursorWall.style.display = 'none';
            hideGhost();
            updateWallToolUI();
        }

        function getCell(r, c) {
            return boardElement.children[r * GRID_SIZE + c];
        }

        function getNearestCellFromPoint(clientX, clientY) {
            const boardRect = boardElement.getBoundingClientRect();
            if (clientX < boardRect.left || clientX > boardRect.right || clientY < boardRect.top || clientY > boardRect.bottom) {
                return null;
            }

            let nearestCell = null;
            let minDistance = Infinity;

            for (let r = 0; r < GRID_SIZE; r++) {
                for (let c = 0; c < GRID_SIZE; c++) {
                    const cell = getCell(r, c);
                    const rect = cell.getBoundingClientRect();
                    const cx = rect.left + rect.width / 2;
                    const cy = rect.top + rect.height / 2;
                    const distance = Math.hypot(clientX - cx, clientY - cy);

                    if (distance < minDistance) {
                        minDistance = distance;
                        nearestCell = cell;
                    }
                }
            }

            return nearestCell;
        }

        function getWallRect(r, c, orientation, metrics = getBoardMetrics()) {
            const { cellSize, gapSize, padding } = metrics;
            const width = orientation === 'h' ? (cellSize * 2 + gapSize) : gapSize;
            const height = orientation === 'h' ? gapSize : (cellSize * 2 + gapSize);

            let top;
            let left;

            if (orientation === 'h') {
                top = padding + (r + 1) * cellSize + r * gapSize;
                left = padding + c * (cellSize + gapSize);
            } else {
                top = padding + r * (cellSize + gapSize);
                left = padding + (c + 1) * cellSize + c * gapSize;
            }

            return { top, left, width, height };
        }

        function handleCellClick(r, c) {
            if (state.isGameOver) return;

            if (state.isDraggingWall) {
                if (pendingWall) {
                    placeWall();
                }
                return;
            }

            // Check if it's a valid move
            const validMoves = getValidMoves(state.turn);
            if (validMoves.some(m => m.r === r && m.c === c)) {
                state.players[state.turn].r = r;
                state.players[state.turn].c = c;
                
                if (r === state.players[state.turn].goal) {
                    state.isGameOver = true;
                    render();
                    return;
                }
                
                nextTurn();
            }
        }

        let pendingWall = null;

        function clamp(value, min, max) {
            return Math.max(min, Math.min(max, value));
        }

        function updateWallPreviewFromPointer(clientX, clientY) {
            if (state.isGameOver || state.players[state.turn].walls === 0 || !state.isDraggingWall) {
                hideGhost();
                return;
            }

            const boardRect = boardElement.getBoundingClientRect();
            if (clientX < boardRect.left || clientX > boardRect.right || clientY < boardRect.top || clientY > boardRect.bottom) {
                hideGhost();
                return;
            }

            const metrics = getBoardMetrics();
            let bestSlot = null;
            let minDistance = Infinity;

            for (let r = 0; r <= 7; r++) {
                for (let c = 0; c <= 7; c++) {
                    const rect = getWallRect(r, c, state.wallOrientation, metrics);
                    const centerX = boardRect.left + rect.left + rect.width / 2;
                    const centerY = boardRect.top + rect.top + rect.height / 2;
                    const distance = Math.hypot(clientX - centerX, clientY - centerY);

                    if (distance < minDistance) {
                        minDistance = distance;
                        bestSlot = { r, c };
                    }
                }
            }

            if (!bestSlot) {
                hideGhost();
                return;
            }

            showGhost(bestSlot.r, bestSlot.c, state.wallOrientation);
        }

        function handleMouseMove(e, r, c) {
            if (state.isGameOver || state.players[state.turn].walls === 0) return;

            // Logic to determine if we are near a gap for wall placement
            const rect = getCell(r, c).getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const { cellSize } = getBoardMetrics();
            const edgeThreshold = cellSize * 0.3;
            
            // Snap to nearest intersection
            let wallR = r;
            let wallC = c;
            
            // Only allow placement in gaps (r 0-7, c 0-7)
            if (state.wallOrientation === 'h') {
                if (y > cellSize - edgeThreshold && r < 8) {
                    if (x > cellSize * 0.5 && c < 8) wallC = c;
                    else if (x <= cellSize * 0.5 && c > 0) wallC = c - 1;
                    else return hideGhost();
                    
                    showGhost(wallR, wallC, 'h');
                } else hideGhost();
            } else {
                if (x > cellSize - edgeThreshold && c < 8) {
                    if (y > cellSize * 0.5 && r < 8) wallR = r;
                    else if (y <= cellSize * 0.5 && r > 0) wallR = r - 1;
                    else return hideGhost();

                    showGhost(wallR, wallC, 'v');
                } else hideGhost();
            }
        }

        function showGhost(r, c, orientation) {
            let ghost = document.querySelector('.ghost-wall');
            if (!ghost) {
                ghost = document.createElement('div');
                ghost.className = 'wall ghost-wall';
                boardElement.appendChild(ghost);
            }

            // Check if placement is valid (overlaps)
            const isValid = isValidWallPlacement(r, c, orientation);
            
            ghost.style.display = 'block';
            ghost.className = `wall ghost-wall ${orientation === 'h' ? 'horizontal' : 'vertical'}`;
            ghost.classList.toggle('invalid', !isValid);
            ghost.style.backgroundColor = 'var(--wall-ghost)';

            const rect = getWallRect(r, c, orientation);
            ghost.style.top = `${rect.top}px`;
            ghost.style.left = `${rect.left}px`;

            pendingWall = isValid ? { r, c, orientation } : null;
            highlightAffectedSquares(r, c);
        }

        function hideGhost() {
            const ghost = document.querySelector('.ghost-wall');
            if (ghost) ghost.style.display = 'none';
            clearAffectedSquares();
            pendingWall = null;
        }

        function clearAffectedSquares() {
            document.querySelectorAll('.cell.preview-affected').forEach(cell => {
                cell.classList.remove('preview-affected');
            });
        }

        function highlightAffectedSquares(r, c) {
            clearAffectedSquares();

            const affected = [
                { r, c },
                { r, c: c + 1 },
                { r: r + 1, c },
                { r: r + 1, c: c + 1 }
            ];

            affected.forEach(pos => {
                if (pos.r >= 0 && pos.r < GRID_SIZE && pos.c >= 0 && pos.c < GRID_SIZE) {
                    getCell(pos.r, pos.c).classList.add('preview-affected');
                }
            });
        }

        function placeWall() {
            if (pendingWall) {
                state.walls.push(pendingWall);
                state.players[state.turn].walls--;
                nextTurn();
                stopWallDrag();
            }
        }

        function isValidWallPlacement(r, c, orientation) {
            // 1. Boundary check
            if (r < 0 || r > 7 || c < 0 || c > 7) return false;

            // 2. Overlap check
            for (let w of state.walls) {
                if (w.orientation === orientation) {
                    if (w.r === r && w.c === c) return false;
                    if (orientation === 'h' && w.r === r && Math.abs(w.c - c) < 2) return false;
                    if (orientation === 'v' && w.c === c && Math.abs(w.r - r) < 2) return false;
                } else {
                    // Intersection check
                    if (w.r === r && w.c === c) return false;
                }
            }

            // 3. Pathfinding check (BFS)
            // Temporarily add wall
            state.walls.push({ r, c, orientation });
            const p1CanReach = canReachGoal(0);
            const p2CanReach = canReachGoal(1);
            state.walls.pop();

            return p1CanReach && p2CanReach;
        }

        function canReachGoal(playerIdx) {
            const p = state.players[playerIdx];
            const queue = [{ r: p.r, c: p.c }];
            const visited = new Set();
            visited.add(`${p.r},${p.c}`);

            while (queue.length > 0) {
                const curr = queue.shift();
                if (curr.r === p.goal) return true;

                const neighbors = getNeighbors(curr.r, curr.c);
                for (let n of neighbors) {
                    const key = `${n.r},${n.c}`;
                    if (!visited.has(key)) {
                        visited.add(key);
                        queue.push(n);
                    }
                }
            }
            return false;
        }

        function getNeighbors(r, c) {
            const neighbors = [];
            const dirs = [{dr: -1, dc: 0}, {dr: 1, dc: 0}, {dr: 0, dc: -1}, {dr: 0, dc: 1}];
            
            for (let d of dirs) {
                const nr = r + d.dr;
                const nc = c + d.dc;
                if (nr >= 0 && nr < 9 && nc >= 0 && nc < 9) {
                    if (!isWallBlocking(r, c, nr, nc)) {
                        neighbors.push({ r: nr, c: nc });
                    }
                }
            }
            return neighbors;
        }

        function isWallBlocking(r1, c1, r2, c2) {
            for (let w of state.walls) {
                if (w.orientation === 'h') {
                    // Wall between rows
                    if (Math.min(r1, r2) === w.r && Math.max(r1, r2) === w.r + 1) {
                        if (c1 === w.c || c1 === w.c + 1) return true;
                    }
                } else {
                    // Wall between columns
                    if (Math.min(c1, c2) === w.c && Math.max(c1, c2) === w.c + 1) {
                        if (r1 === w.r || r1 === w.r + 1) return true;
                    }
                }
            }
            return false;
        }

        function getValidMoves(playerIdx) {
            const p = state.players[playerIdx];
            const opp = state.players[1 - playerIdx];
            let moves = getNeighbors(p.r, p.c);

            // Handle jumping over opponent
            moves = moves.flatMap(m => {
                if (m.r === opp.r && m.c === opp.c) {
                    const dr = m.r - p.r;
                    const dc = m.c - p.c;
                    const jumpR = m.r + dr;
                    const jumpC = m.c + dc;

                    // Standard jump
                    if (jumpR >= 0 && jumpR < 9 && jumpC >= 0 && jumpC < 9 && !isWallBlocking(m.r, m.c, jumpR, jumpC)) {
                        return [{ r: jumpR, c: jumpC }];
                    } else {
                        // Diagonal jump if blocked by wall or edge
                        const diagonals = [];
                        if (dr !== 0) { // Vertical jump blocked
                            if (m.c > 0 && !isWallBlocking(m.r, m.c, m.r, m.c - 1)) diagonals.push({r: m.r, c: m.c - 1});
                            if (m.c < 8 && !isWallBlocking(m.r, m.c, m.r, m.c + 1)) diagonals.push({r: m.r, c: m.c + 1});
                        } else { // Horizontal jump blocked
                            if (m.r > 0 && !isWallBlocking(m.r, m.c, m.r - 1, m.c)) diagonals.push({r: m.r - 1, c: m.c});
                            if (m.r < 8 && !isWallBlocking(m.r, m.c, m.r + 1, m.c)) diagonals.push({r: m.r + 1, c: m.c});
                        }
                        return diagonals;
                    }
                }
                return [m];
            });

            // Filter out move to own position (can happen with diagonal jump logic)
            return moves.filter(m => !(m.r === p.r && m.c === p.c));
        }

        function highlightValidMoves() {
            const moves = getValidMoves(state.turn);
            moves.forEach(m => {
                getCell(m.r, m.c).classList.add('highlight');
            });
        }

        function nextTurn() {
            state.turn = 1 - state.turn;
            render();
        }

        function toggleWallOrientation() {
            state.wallOrientation = state.wallOrientation === 'h' ? 'v' : 'h';
            hideGhost();
            updateWallToolUI();
            render();
        }

        function resetGame() {
            state = {
                players: [
                    { r: 8, c: 4, walls: 10, goal: 0, color: 'pawn-1' },
                    { r: 0, c: 4, walls: 10, goal: 8, color: 'pawn-2' }
                ],
                turn: 0,
                walls: [],
                wallOrientation: 'h',
                isGameOver: false,
                isDraggingWall: false
            };
            initBoard();
        }

        wallToolElement.addEventListener('click', () => {
            if (state.isDraggingWall) {
                stopWallDrag();
                return;
            }
            startWallDrag();
        });

        boardElement.addEventListener('click', (e) => {
            if (!state.isDraggingWall) return;
            e.preventDefault();
            e.stopPropagation();
            if (pendingWall) {
                placeWall();
            }
        });

        document.addEventListener('mousemove', (e) => {
            if (!state.isDraggingWall) return;

            cursorWall.style.left = `${e.clientX}px`;
            cursorWall.style.top = `${e.clientY}px`;
            updateWallPreviewFromPointer(e.clientX, e.clientY);
        });

        document.addEventListener('touchmove', (e) => {
            if (!state.isDraggingWall || e.touches.length === 0) return;

            const touch = e.touches[0];
            cursorWall.style.left = `${touch.clientX}px`;
            cursorWall.style.top = `${touch.clientY}px`;
            updateWallPreviewFromPointer(touch.clientX, touch.clientY);
        }, { passive: true });

        document.addEventListener('keydown', (e) => {
            if (e.key.toLowerCase() === 'r') toggleWallOrientation();
            if (e.key === 'Escape') stopWallDrag();
        });

        initBoard();
