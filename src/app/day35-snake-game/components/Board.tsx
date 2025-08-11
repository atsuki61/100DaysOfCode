'use client';

import { useMemo } from 'react';
import type { Point } from '../types';

const GRID_SIZE = 20;

type BoardProps = {
  grid: Point[][];
  snake: Point[];
  food: Point;
};

export default function Board({ grid, snake, food }: BoardProps) {
  const snakeSet = useMemo(() => new Set(snake.map((p) => `${p.x},${p.y}`)), [snake]);
  const headKey = `${snake[snake.length - 1].x},${snake[snake.length - 1].y}`;

  return (
    <div className="inline-block bg-gray-200 p-2 rounded-lg"> {/* インラインブロック, 薄灰背景, 余白, 角丸 */}
      <div className="grid" style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, 1.5rem)` }}> {/* CSSグリッド, 列幅固定 */}
        {grid.flat().map((cell) => {
          const key = `${cell.x},${cell.y}`;
          const isFood = cell.x === food.x && cell.y === food.y;
          const isHead = key === headKey;
          const isBody = !isHead && snakeSet.has(key);
          return (
            <div
              key={key}
              className={
                `w-6 h-6 border border-white/40 ${
                  isHead ? 'bg-green-600' : isBody ? 'bg-green-400' : isFood ? 'bg-red-500' : 'bg-gray-100'
                }`
              }
            />
          );
        })}
      </div>
    </div>
  );
}


