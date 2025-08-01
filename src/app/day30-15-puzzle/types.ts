// 15パズルゲームの型定義

// パズルの盤面を表す型（0は空白、1-15は数字タイル）
export type PuzzleBoard = number[]

// ゲームの状態
export type GameStatus = 'idle' | 'playing' | 'completed'

// タイルの移動方向
export type Direction = 'up' | 'down' | 'left' | 'right'

// ゲームの統計情報
export interface GameStats {
  moves: number           // 移動回数
  startTime: number | null  // ゲーム開始時刻
  endTime: number | null    // ゲーム終了時刻
  elapsedTime: number     // 経過時間（秒）
}

// ゲーム全体の状態
export interface PuzzleState {
  board: PuzzleBoard      // 現在の盤面
  status: GameStatus      // ゲーム状態
  stats: GameStats        // 統計情報
  emptyIndex: number      // 空白タイルの位置（0-15）
}

// タイルの位置情報
export interface TilePosition {
  row: number            // 行（0-3）
  col: number            // 列（0-3）
  index: number          // 1次元配列でのインデックス（0-15）
}