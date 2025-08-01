import { PuzzleBoard } from '../types'

/**
 * Fisher-Yates アルゴリズムで配列をシャッフル
 * これは「完全にランダム」な並び替えを行います
 */
export function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array] // 元の配列を変更しないようにコピー
  
  // 配列の最後から順番に処理
  for (let i = newArray.length - 1; i > 0; i--) {
    // 0からi番目までのランダムなインデックスを選択
    const j = Math.floor(Math.random() * (i + 1))
    
    // i番目とj番目の要素を交換
    ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
  }
  
  return newArray
}

/**
 * 15パズル専用のシャッフル機能
 * 解けない状態を避けるため、実際に可能な動きでシャッフルします
 */
export function shufflePuzzle(board: PuzzleBoard, moves: number = 100): PuzzleBoard {
  const currentBoard = [...board] // 元の盤面をコピーして変更しないようにする
  let emptyIndex = currentBoard.indexOf(0) // 空白タイルの位置を取得
  
  // 指定回数だけランダムな有効移動を実行
  for (let i = 0; i < moves; i++) {
    const validMoves = getValidMoves(emptyIndex)
    
    if (validMoves.length > 0) {
      // ランダムに有効な移動を選択
      const randomMoveIndex = Math.floor(Math.random() * validMoves.length)
      const targetIndex = validMoves[randomMoveIndex]
      
      // タイルを移動
      ;[currentBoard[emptyIndex], currentBoard[targetIndex]] = 
       [currentBoard[targetIndex], currentBoard[emptyIndex]]
      
      // 空白の位置を更新
      emptyIndex = targetIndex
    }
  }
  
  return currentBoard
}

/**
 * 空白タイルの隣に移動可能なタイルのインデックスを取得
 * 15パズルは4x4グリッドなので、上下左右の移動をチェック
 */
function getValidMoves(emptyIndex: number): number[] {
  const validMoves: number[] = []
  const row = Math.floor(emptyIndex / 4) // 現在の行（0-3）
  const col = emptyIndex % 4            // 現在の列（0-3）
  
  // 上に移動可能（上の行があるか）
  if (row > 0) {
    validMoves.push(emptyIndex - 4)
  }
  
  // 下に移動可能（下の行があるか）
  if (row < 3) {
    validMoves.push(emptyIndex + 4)
  }
  
  // 左に移動可能（左の列があるか）
  if (col > 0) {
    validMoves.push(emptyIndex - 1)
  }
  
  // 右に移動可能（右の列があるか）
  if (col < 3) {
    validMoves.push(emptyIndex + 1)
  }
  
  return validMoves
}

/**
 * パズルが解けているかチェック
 * 正解は [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,0] の順番
 */
export function isPuzzleSolved(board: PuzzleBoard): boolean {
  const solvedBoard = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0]
  
  return board.every((value, index) => value === solvedBoard[index])
}