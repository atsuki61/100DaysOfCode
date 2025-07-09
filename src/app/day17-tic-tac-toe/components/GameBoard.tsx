import { Board, Position } from '../types';
import Cell from './Cell';

interface GameBoardProps {
  board: Board;
  onCellClick: (row: number, col: number) => void;
  winningCells?: Position[];
}

export default function GameBoard({ board, onCellClick, winningCells = [] }: GameBoardProps) {
  const isWinningCell = (row: number, col: number): boolean => {
    return winningCells.some(cell => cell.row === row && cell.col === col);
  };

  return (
    <div className="grid grid-cols-3 gap-2 p-4 bg-white rounded-xl shadow-lg"> {/* 3列グリッド, 間隔2, パディング4, 白背景, 角丸大, 影 */}
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <Cell
            key={`${rowIndex}-${colIndex}`}
            value={cell}
            onClick={() => onCellClick(rowIndex, colIndex)}
            isWinningCell={isWinningCell(rowIndex, colIndex)}
          />
        ))
      )}
    </div>
  );
} 