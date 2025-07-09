// 三目並べゲームの型定義

// プレイヤーの型（X、O、または空セル）
export type Player = 'X' | 'O' | null;

// ゲームボードの型（3x3の二次元配列）
export type Board = Player[][];

// ゲームの状態
export type GameStatus = 'playing' | 'won' | 'draw';

// 勝者の情報
export type Winner = Player;

// セルの位置
export interface Position {
  row: number;
  col: number;
}

// ゲーム全体の状態
export interface GameState {
  board: Board;
  currentPlayer: Player;
  status: GameStatus;
  winner: Winner;
  moveCount: number;
}

// 勝利パターンの型
export type WinPattern = [Position, Position, Position]; 