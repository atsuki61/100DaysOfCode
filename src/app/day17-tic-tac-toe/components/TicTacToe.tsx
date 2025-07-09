'use client';

import { useState, useCallback } from 'react';
import { Board, GameState, Position, Player, GameStatus } from '../types';
import GameBoard from './GameBoard';
import GameStatusComponent from './GameStatus';

// 初期ボードを作成
const createInitialBoard = (): Board => {
  return Array(3).fill(null).map(() => Array(3).fill(null));
};

// 勝利パターンの定義
const WINNING_PATTERNS: Position[][] = [
  // 横のライン
  [{ row: 0, col: 0 }, { row: 0, col: 1 }, { row: 0, col: 2 }],
  [{ row: 1, col: 0 }, { row: 1, col: 1 }, { row: 1, col: 2 }],
  [{ row: 2, col: 0 }, { row: 2, col: 1 }, { row: 2, col: 2 }],
  // 縦のライン
  [{ row: 0, col: 0 }, { row: 1, col: 0 }, { row: 2, col: 0 }],
  [{ row: 0, col: 1 }, { row: 1, col: 1 }, { row: 2, col: 1 }],
  [{ row: 0, col: 2 }, { row: 1, col: 2 }, { row: 2, col: 2 }],
  // 斜めのライン
  [{ row: 0, col: 0 }, { row: 1, col: 1 }, { row: 2, col: 2 }],
  [{ row: 0, col: 2 }, { row: 1, col: 1 }, { row: 2, col: 0 }],
];

export default function TicTacToe() {
  const [gameState, setGameState] = useState<GameState>({
    board: createInitialBoard(),
    currentPlayer: 'X',
    status: 'playing',
    winner: null,
    moveCount: 0,
  });

  const [winningCells, setWinningCells] = useState<Position[]>([]);

  // 勝利条件をチェック
  const checkWinner = useCallback((board: Board): { winner: Player; winningCells: Position[] } => {
    for (const pattern of WINNING_PATTERNS) {
      const [pos1, pos2, pos3] = pattern;
      const cell1 = board[pos1.row][pos1.col];
      const cell2 = board[pos2.row][pos2.col];
      const cell3 = board[pos3.row][pos3.col];

      if (cell1 && cell1 === cell2 && cell2 === cell3) {
        return { winner: cell1, winningCells: pattern };
      }
    }
    return { winner: null, winningCells: [] };
  }, []);

  // ボードが満杯かチェック
  const isBoardFull = useCallback((board: Board): boolean => {
    return board.every(row => row.every(cell => cell !== null));
  }, []);

  // セルクリック処理
  const handleCellClick = useCallback((row: number, col: number) => {
    if (gameState.status !== 'playing' || gameState.board[row][col] !== null) {
      return;
    }

    // 新しいボードを作成
    const newBoard = gameState.board.map((boardRow, rowIndex) =>
      boardRow.map((cell, colIndex) =>
        rowIndex === row && colIndex === col ? gameState.currentPlayer : cell
      )
    );

    // 勝利条件をチェック
    const { winner, winningCells: newWinningCells } = checkWinner(newBoard);
    
    // 新しいゲーム状態を更新
    const newMoveCount = gameState.moveCount + 1;
    let newStatus: GameStatus = gameState.status;
    
    if (winner) {
      newStatus = 'won';
      setWinningCells(newWinningCells);
    } else if (isBoardFull(newBoard)) {
      newStatus = 'draw';
    }

    setGameState({
      board: newBoard,
      currentPlayer: gameState.currentPlayer === 'X' ? 'O' : 'X',
      status: newStatus,
      winner,
      moveCount: newMoveCount,
    });
  }, [gameState, checkWinner, isBoardFull]);

  // ゲームリスタート
  const handleRestart = useCallback(() => {
    setGameState({
      board: createInitialBoard(),
      currentPlayer: 'X',
      status: 'playing',
      winner: null,
      moveCount: 0,
    });
    setWinningCells([]);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl"> {/* コンテナ, 中央揃え, 横パディング4, 縦パディング8, 最大幅2xl */}
      <div className="space-y-8"> {/* 縦間隔8 */}
        <GameStatusComponent
          status={gameState.status}
          currentPlayer={gameState.currentPlayer}
          winner={gameState.winner}
          moveCount={gameState.moveCount}
          onRestart={handleRestart}
        />
        
        <div className="flex justify-center"> {/* フレックス, 中央揃え */}
          <GameBoard
            board={gameState.board}
            onCellClick={handleCellClick}
            winningCells={winningCells}
          />
        </div>

        {/* ゲームルール説明 */}
        <div className="bg-white rounded-lg shadow-md p-6"> {/* 白背景, 角丸, 影, パディング6 */}
          <h3 className="text-lg font-semibold text-gray-800 mb-3">🎮 ゲームルール</h3> {/* 大文字, セミ太字, グレー色, 下マージン3 */}
          <ul className="text-sm text-gray-600 space-y-2"> {/* 小文字, グレー色, 縦間隔2 */}
            <li>• 交互にマス目をクリックして❌と⭕を配置します</li>
            <li>• 縦・横・斜めのいずれかに3つ並べたプレイヤーの勝利です</li>
            <li>• 全てのマス目が埋まっても勝負がつかない場合は引き分けです</li>
            <li>• ゲーム終了後は「もう一度プレイ」ボタンで再開できます</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 