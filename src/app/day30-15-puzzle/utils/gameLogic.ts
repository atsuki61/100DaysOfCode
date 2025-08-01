import { PuzzleBoard } from '../types'

/**
 * 指定されたインデックスのタイルが空白タイルと隣接しているかチェック
 * @param clickedIndex クリックされたタイルのインデックス
 * @param emptyIndex 空白タイルのインデックス
 * @returns 隣接している場合true
 */
export function isAdjacentToEmpty(clickedIndex: number, emptyIndex: number): boolean {
  // 4x4グリッドでの行と列を計算
  const clickedRow = Math.floor(clickedIndex / 4) // クリックされたタイルの行
  const clickedCol = clickedIndex % 4 // クリックされたタイルの列
  const emptyRow = Math.floor(emptyIndex / 4) // 空白タイルの行
  const emptyCol = emptyIndex % 4 // 空白タイルの列
  
  // 隣接条件：
  // 1. 同じ行で左右に隣接（行が同じ & 列が1つ違い）
  // 2. 同じ列で上下に隣接（列が同じ & 行が1つ違い）
  const sameRowAdjacent = clickedRow === emptyRow && Math.abs(clickedCol - emptyCol) === 1 // 同じ行で左右に隣接
  const sameColAdjacent = clickedCol === emptyCol && Math.abs(clickedRow - emptyRow) === 1 // 同じ列で上下に隣接
  
  return sameRowAdjacent || sameColAdjacent // 同じ行または同じ列で隣接している場合はtrue
}

/**
 * タイルの移動を実行
 * @param board 現在の盤面
 * @param clickedIndex クリックされたタイルのインデックス
 * @param emptyIndex 空白タイルのインデックス
 * @returns 移動後の新しい盤面
 */
export function moveTile(board: PuzzleBoard, clickedIndex: number, emptyIndex: number): PuzzleBoard {// タイルの移動を実行
  // 隣接チェック
  if (!isAdjacentToEmpty(clickedIndex, emptyIndex)) {// 隣接していない場合は移動しない（元の盤面を返す）
    // 隣接していない場合は移動しない（元の盤面を返す）
    return board
  }
  
  // 新しい盤面を作成（元の配列を変更しない）
  const newBoard = [...board]
  
  // タイルの位置を交換
  // クリックされたタイルの値を空白の位置に移動
  // 空白（0）をクリックされたタイルの位置に移動
  ;[newBoard[clickedIndex], newBoard[emptyIndex]] = [newBoard[emptyIndex], newBoard[clickedIndex]]
  
  return newBoard // 移動後の新しい盤面を返す
}

/**
 * ゲームクリア判定
 * 正解の配列: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,0]
 * @param board チェックする盤面
 * @returns クリアしている場合true
 */
export function isGameWon(board: PuzzleBoard): boolean {
  const winningBoard = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0] // 正解の配列
  
  return board.every((value, index) => value === winningBoard[index]) // 盤面が正解の配列と一致しているかチェック
}

/**
 * 移動可能なタイルのインデックス一覧を取得
 * @param emptyIndex 空白タイルのインデックス
 * @returns 移動可能なタイルのインデックス配列
 */
export function getMovableTiles(emptyIndex: number): number[] {
  const movableTiles: number[] = [] // 移動可能なタイルのインデックス配列
  const row = Math.floor(emptyIndex / 4) // 空白タイルの行
  const col = emptyIndex % 4 // 空白タイルの列
  
  // 上のタイル
  if (row > 0) {
    movableTiles.push(emptyIndex - 4) // 上のタイルのインデックスを追加
  }
  
  // 下のタイル
  if (row < 3) {
    movableTiles.push(emptyIndex + 4) // 下のタイルのインデックスを追加
  }
  
  // 左のタイル
  if (col > 0) {
    movableTiles.push(emptyIndex - 1) // 左のタイルのインデックスを追加
  }
  
  // 右のタイル
  if (col < 3) {
    movableTiles.push(emptyIndex + 1) // 右のタイルのインデックスを追加 
  }
  
  return movableTiles // 移動可能なタイルのインデックス配列を返す
}