import { useState, useCallback, useEffect, useRef } from 'react';

const useFocusOnMount = (ref: React.RefObject<HTMLDivElement | null>) => {
  useEffect(() => {
    ref.current?.focus();
  }, [ref]);
};

const GRID_SIZE = 18;
const CELL_SIZE = 14;
const INITIAL_SPEED = 120;

type Dir = 'up' | 'down' | 'left' | 'right';

const SnakeGame = () => {
  const [snake, setSnake] = useState<[number, number][]>([[8, 9], [8, 8], [8, 7]]);
  const [food, setFood] = useState<[number, number]>([12, 9]);
  const [dir, setDir] = useState<Dir>('down');
  const [nextDir, setNextDir] = useState<Dir>('down');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => parseInt(localStorage.getItem('snake-high') || '0', 10));
  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [speed, setSpeed] = useState(INITIAL_SPEED);
  const gameLoopRef = useRef<number | null>(null);
  const nextDirRef = useRef<Dir>(nextDir);
  const foodRef = useRef<[number, number]>(food);
  const containerRef = useRef<HTMLDivElement>(null);
  nextDirRef.current = nextDir;
  foodRef.current = food;
  useFocusOnMount(containerRef);

  const placeFood = useCallback((avoid: [number, number][]) => {
    let newFood: [number, number];
    do {
      newFood = [
        Math.floor(Math.random() * GRID_SIZE),
        Math.floor(Math.random() * GRID_SIZE),
      ];
    } while (avoid.some(([x, y]) => x === newFood[0] && y === newFood[1]));
    setFood(newFood);
  }, []);

  const resetGame = useCallback(() => {
    setSnake([[8, 9], [8, 8], [8, 7]]);
    setDir('down');
    setNextDir('down');
    setScore(0);
    setGameOver(false);
    setIsPaused(false);
    setSpeed(INITIAL_SPEED);
    placeFood([[8, 9], [8, 8], [8, 7]]);
  }, [placeFood]);

  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('snake-high', String(score));
    }
  }, [score, highScore]);

  useEffect(() => {
    if (gameOver || isPaused) return;

    gameLoopRef.current = window.setInterval(() => {
      const d = nextDirRef.current;
      const f = foodRef.current;
      setDir(() => d);
      setSnake((s) => {
        const head = s[0];
        const [hx, hy] = head;
        let newHead: [number, number];
        switch (d) {
          case 'up': newHead = [hx, hy - 1]; break;
          case 'down': newHead = [hx, hy + 1]; break;
          case 'left': newHead = [hx - 1, hy]; break;
          case 'right': newHead = [hx + 1, hy]; break;
          default: newHead = head;
        }
        const [nx, ny] = newHead;

        if (nx < 0 || nx >= GRID_SIZE || ny < 0 || ny >= GRID_SIZE) {
          setGameOver(true);
          return s;
        }
        if (s.some(([x, y]) => x === nx && y === ny)) {
          setGameOver(true);
          return s;
        }

        const ateFood = nx === f[0] && ny === f[1];
        const newSnake = [newHead, ...s];
        if (!ateFood) newSnake.pop();

        if (ateFood) {
          setScore((sc) => sc + 10);
          setSpeed((sp) => Math.max(60, sp - 3));
          placeFood([...newSnake]);
        }

        return newSnake;
      });
    }, speed);

    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    };
  }, [gameOver, isPaused, speed, placeFood]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (gameOver) return;
    if (e.key === ' ') {
      e.preventDefault();
      setIsPaused((p) => !p);
      return;
    }
    switch (e.key) {
      case 'ArrowUp': if (dir !== 'down') setNextDir('up'); break;
      case 'ArrowDown': if (dir !== 'up') setNextDir('down'); break;
      case 'ArrowLeft': if (dir !== 'right') setNextDir('left'); break;
      case 'ArrowRight': if (dir !== 'left') setNextDir('right'); break;
    }
  }, [dir, gameOver]);

  const move = (d: Dir) => {
    if (gameOver || isPaused) return;
    if (d === 'up' && dir !== 'down') setNextDir('up');
    if (d === 'down' && dir !== 'up') setNextDir('down');
    if (d === 'left' && dir !== 'right') setNextDir('left');
    if (d === 'right' && dir !== 'left') setNextDir('right');
  };

  const gridPx = GRID_SIZE * CELL_SIZE;

  return (
    <div
      ref={containerRef}
      className="h-full flex flex-col bg-os-bg font-mono text-sm overflow-hidden outline-none"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {/* Header */}
      <div className="shrink-0 flex items-center justify-between px-4 py-2 border-b border-os-border bg-os-panel">
        <div className="flex items-center gap-4">
          <span className="text-os-green font-bold">snake@revanthos</span>
          <span className="text-os-muted">Score: <span className="text-os-accent font-semibold">{score}</span></span>
          <span className="text-os-dim">Best: <span className="text-os-yellow">{highScore}</span></span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsPaused((p) => !p)}
            className="min-h-[44px] min-w-[44px] px-3 py-2 rounded text-[10px] border border-os-border text-os-muted hover:text-os-text hover:border-os-accent/50 transition-colors touch-manipulation"
          >
            {isPaused ? 'Resume' : 'Pause'}
          </button>
          <button
            type="button"
            onClick={resetGame}
            className="min-h-[44px] min-w-[44px] px-3 py-2 rounded text-[10px] border border-os-green/50 text-os-green hover:bg-os-green/10 transition-colors touch-manipulation"
          >
            New Game
          </button>
        </div>
      </div>

      {/* Game area */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 gap-4 min-h-0 relative">
        <div
          className="relative rounded-xl border-2 border-os-border bg-os-surface shadow-inner overflow-hidden ring-2 ring-os-green/20"
          style={{ width: gridPx + 4, height: gridPx + 4 }}
        >
          <div
            className="grid gap-px p-0.5 bg-os-border"
            style={{
              gridTemplateColumns: `repeat(${GRID_SIZE}, ${CELL_SIZE}px)`,
              gridTemplateRows: `repeat(${GRID_SIZE}, ${CELL_SIZE}px)`,
              width: gridPx,
              height: gridPx,
              margin: 2,
            }}
          >
            {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => {
              const x = i % GRID_SIZE;
              const y = Math.floor(i / GRID_SIZE);
              const isSnake = snake.some(([sx, sy]) => sx === x && sy === y);
              const isHead = snake[0][0] === x && snake[0][1] === y;
              const isFood = food[0] === x && food[1] === y;
              return (
                <div
                  key={i}
                  className={`rounded-sm transition-colors duration-75 ${
                    isHead
                      ? 'bg-os-green shadow-lg shadow-os-green/40'
                      : isSnake
                        ? 'bg-os-green/80'
                        : isFood
                          ? 'bg-os-red animate-pulse'
                          : 'bg-os-bg'
                  }`}
                  style={{ width: CELL_SIZE - 1, height: CELL_SIZE - 1 }}
                />
              );
            })}
          </div>

          {/* Game over overlay - over grid only */}
          {gameOver && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm z-20 rounded-xl">
              <p className="text-os-red font-bold text-xl mb-2">Game Over</p>
              <p className="text-os-muted text-sm mb-4">Score: <span className="text-os-accent">{score}</span></p>
              <button
                type="button"
                onClick={resetGame}
                className="min-h-[44px] px-5 py-2 rounded-lg bg-os-green/20 border border-os-green text-os-green font-semibold hover:bg-os-green/30 transition-colors touch-manipulation"
              >
                Play Again
              </button>
            </div>
          )}

          {/* Pause overlay - over grid only */}
          {isPaused && !gameOver && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-10 rounded-xl">
              <p className="text-os-yellow font-bold text-lg">Paused</p>
            </div>
          )}
        </div>

        {/* D-pad style control buttons */}
        <div className="flex flex-col items-center gap-0.5">
          <p className="text-[10px] text-os-muted mb-1 uppercase tracking-wider">Controls</p>
          <button
            type="button"
            onClick={() => move('up')}
            className="min-w-[56px] min-h-[44px] w-14 h-11 rounded-t-lg bg-os-surface border-2 border-os-border hover:border-os-green hover:bg-os-green/15 text-os-green flex items-center justify-center transition-all active:scale-95 shadow-md touch-manipulation"
            aria-label="Up"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7" /></svg>
          </button>
          <div className="flex gap-0.5">
            <button
              type="button"
              onClick={() => move('left')}
              className="min-w-[56px] min-h-[44px] w-14 h-11 rounded-l-lg bg-os-surface border-2 border-os-border hover:border-os-green hover:bg-os-green/15 text-os-green flex items-center justify-center transition-all active:scale-95 shadow-md touch-manipulation"
              aria-label="Left"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 12H5m0 0l7 7m-7-7l7-7" /></svg>
            </button>
            <div className="w-14 h-11 flex items-center justify-center bg-os-panel border-2 border-os-border rounded text-os-dim text-xs font-bold shadow-inner">◉</div>
            <button
              type="button"
              onClick={() => move('right')}
              className="min-w-[56px] min-h-[44px] w-14 h-11 rounded-r-lg bg-os-surface border-2 border-os-border hover:border-os-green hover:bg-os-green/15 text-os-green flex items-center justify-center transition-all active:scale-95 shadow-md touch-manipulation"
              aria-label="Right"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 12h14m0 0l-7-7m7 7l-7 7" /></svg>
            </button>
          </div>
          <button
            type="button"
            onClick={() => move('down')}
            className="min-w-[56px] min-h-[44px] w-14 h-11 rounded-b-lg bg-os-surface border-2 border-os-border hover:border-os-green hover:bg-os-green/15 text-os-green flex items-center justify-center transition-all active:scale-95 shadow-md touch-manipulation"
            aria-label="Down"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" /></svg>
          </button>
        </div>

        <p className="text-[10px] text-os-dim">↑↓←→ or tap buttons · Space = Pause</p>
      </div>
    </div>
  );
};

export default SnakeGame;
