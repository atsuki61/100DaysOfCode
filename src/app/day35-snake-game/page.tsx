'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { Point, Direction } from './types';
import { Board, ControlPanel } from './components';

const GRID_SIZE = 20; // 20x20 の盤面
const INITIAL_SPEED_MS = 160; // ゲームループ間隔

export default function SnakeGamePage() {
  const [snake, setSnake] = useState<Point[]>([{ x: 8, y: 10 }, { x: 9, y: 10 }, { x: 10, y: 10 }]);
  const [, setDirection] = useState<Direction>('right'); // 入力の逆走防止に利用（値は参照しないため省略）
  const [food, setFood] = useState<Point>(() => generateFood([{ x: 8, y: 10 }, { x: 9, y: 10 }, { x: 10, y: 10 }]));
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [speedMs, setSpeedMs] = useState<number>(INITIAL_SPEED_MS);
  const loopRef = useRef<number | null>(null);
  const lastInputRef = useRef<Direction>('right');

  const grid = useMemo(() => Array.from({ length: GRID_SIZE }, (_, y) => Array.from({ length: GRID_SIZE }, (_, x) => ({ x, y }))), []);

  function generateFood(occupied: Point[]): Point {
    // 空いているセルからランダムに生成
    const occupiedKey = new Set(occupied.map((p) => `${p.x},${p.y}`));
    const empties: Point[] = [];
    for (let y = 0; y < GRID_SIZE; y += 1) {
      for (let x = 0; x < GRID_SIZE; x += 1) {
        const key = `${x},${y}`;
        if (!occupiedKey.has(key)) empties.push({ x, y });
      }
    }
    return empties[Math.floor(Math.random() * empties.length)] ?? { x: 0, y: 0 };
  }

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    const key = e.key.toLowerCase();
    const isArrow = key.startsWith('arrow');
    const next: Direction | null = isArrow
      ? (key.replace('arrow', '') as Direction)
      : key === 'w'
      ? 'up'
      : key === 's'
      ? 'down'
      : key === 'a'
      ? 'left'
      : key === 'd'
      ? 'right'
      : null;

    if (!next) return;

    // 逆走防止: 現在の向きと真逆は無効
    setDirection((prev) => {
      if ((prev === 'up' && next === 'down') || (prev === 'down' && next === 'up') || (prev === 'left' && next === 'right') || (prev === 'right' && next === 'left')) {
        return prev;
      }
      lastInputRef.current = next;
      return next;
    });
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (!isRunning) return;
    const tick = () => {
      setSnake((prev) => {
        const head = prev[prev.length - 1];
        const nextHead = move(head, lastInputRef.current);

        // 壁当たり判定
        if (nextHead.x < 0 || nextHead.x >= GRID_SIZE || nextHead.y < 0 || nextHead.y >= GRID_SIZE) {
          setIsRunning(false);
          return prev;
        }

        // 自己衝突
        const bodyKey = new Set(prev.map((p) => `${p.x},${p.y}`));
        if (bodyKey.has(`${nextHead.x},${nextHead.y}`)) {
          setIsRunning(false);
          return prev;
        }

        // 食事
        const ate = nextHead.x === food.x && nextHead.y === food.y;
        const nextSnake = ate ? [...prev, nextHead] : [...prev.slice(1), nextHead];
        if (ate) {
          setScore((s) => s + 1);
          setFood(generateFood(nextSnake));
          // 少しずつスピードアップ（下限あり）
          setSpeedMs((ms) => Math.max(70, Math.floor(ms * 0.96)));
        }
        return nextSnake;
      });
    };

    const id = window.setInterval(tick, speedMs);
    loopRef.current = id;
    return () => {
      if (loopRef.current) window.clearInterval(loopRef.current);
    };
  }, [isRunning, speedMs, food]);

  function move(head: Point, dir: Direction): Point {
    if (dir === 'up') return { x: head.x, y: head.y - 1 };
    if (dir === 'down') return { x: head.x, y: head.y + 1 };
    if (dir === 'left') return { x: head.x - 1, y: head.y };
    return { x: head.x + 1, y: head.y };
  }

  function startGame() {
    setSnake([{ x: 8, y: 10 }, { x: 9, y: 10 }, { x: 10, y: 10 }]);
    setDirection('right');
    setFood(generateFood([{ x: 8, y: 10 }, { x: 9, y: 10 }, { x: 10, y: 10 }]));
    setScore(0);
    setSpeedMs(INITIAL_SPEED_MS);
    lastInputRef.current = 'right';
    setIsRunning(true);
  }

  return (
    <div className="max-w-3xl mx-auto px-4 pb-28"> {/* 最大幅3xl, 中央寄せ, 横余白, フッターの分の下余白 */}
      <section className="bg-white rounded-xl shadow p-6 mt-6"> {/* 白背景, 角丸, 影, パディング, 上余白 */}
        <div className="flex flex-col md:flex-row gap-6"> {/* 縦→mdで横並び, 余白 */}
          <div className="flex-1">
            <Board grid={grid} snake={snake} food={food} />
          </div>
          <ControlPanel
            score={score}
            isRunning={isRunning}
            onStart={startGame}
            onTogglePause={() => setIsRunning((r) => !r)}
          />
        </div>
      </section>
    </div>
  );
}


