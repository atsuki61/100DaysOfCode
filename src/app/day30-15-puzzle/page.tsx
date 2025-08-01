'use client'

import { useState } from 'react'
import { PuzzleState, GameStatus } from './types'
import { shufflePuzzle } from './utils'

// 初期状態（解決済みの状態）
const initialBoard = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0]

// 初期ゲーム状態
const initialState: PuzzleState = {
  board: initialBoard,
  status: 'idle' as GameStatus,
  stats: {
    moves: 0,
    startTime: null,
    endTime: null,
    elapsedTime: 0,
  },
  emptyIndex: 15, // 最後のセルが空白
}

export default function Day30Page() {
  const [puzzleState, setPuzzleState] = useState<PuzzleState>(initialState)

  // シャッフル機能
  const handleShuffle = () => {
    const shuffledBoard = shufflePuzzle(puzzleState.board, 200) // 200回移動でシャッフル
    const newEmptyIndex = shuffledBoard.indexOf(0)
    
    setPuzzleState({
      board: shuffledBoard,
      status: 'playing',
      stats: {
        moves: 0,
        startTime: Date.now(),
        endTime: null,
        elapsedTime: 0,
      },
      emptyIndex: newEmptyIndex,
    })
  }

  return (
    <div className="container mx-auto px-4 py-8"> {/* コンテナ, 水平中央, 横パディング4, 縦パディング8 */}
      <div className="max-w-md mx-auto"> {/* 最大幅中, 中央配置 */}
        
        {/* ゲーム統計 */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6"> {/* 白背景, 角丸大, 影中, パディング4, 下マージン6 */}
          <h2 className="text-lg font-semibold mb-2">📊 ゲーム統計</h2> {/* 文字大, フォント中太, 下マージン2 */}
          <div className="grid grid-cols-2 gap-4"> {/* グリッド2列, 間隔4 */}
            <div>
              <span className="text-sm text-gray-600">移動回数</span> {/* 小文字, グレー文字 */}
              <p className="text-xl font-bold">{puzzleState.stats.moves}</p> {/* 文字超大, 太字 */}
            </div>
            <div>
              <span className="text-sm text-gray-600">ステータス</span>
              <p className="text-xl font-bold capitalize">{puzzleState.status}</p> {/* 最初の文字大文字 */}
            </div>
          </div>
        </div>

        {/* パズル盤面 */}
        <div className="bg-white rounded-lg shadow-md p-4"> {/* 白背景, 角丸大, 影中, パディング4 */}
          <h2 className="text-lg font-semibold mb-4">🧩 パズル盤面</h2>
          
          {/* 4x4グリッド */}
          <div className="grid grid-cols-4 gap-2 max-w-xs mx-auto"> {/* グリッド4列, 間隔2, 最大幅極小, 中央 */}
            {puzzleState.board.map((value, index) => (
              <div
                key={index}
                className={`
                  aspect-square flex items-center justify-center text-lg font-bold rounded-md transition-colors
                  ${value === 0 
                    ? 'bg-gray-200 text-gray-400' // 空白タイル: グレー背景, グレー文字
                    : 'bg-blue-500 text-white hover:bg-blue-600 cursor-pointer' // 数字タイル: 青背景, 白文字, ホバー時濃い青, カーソルポインター
                  }
                `}
              >
                {value === 0 ? '' : value}
              </div>
            ))}
          </div>
        </div>

        {/* 操作ボタン */}
        <div className="mt-6 text-center"> {/* 上マージン6, 中央配置 */}
          <button 
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md transition-colors" // 緑背景, ホバー時濃い緑, 白文字, 太字, 縦パディング2, 横パディング4, 角丸中, 色変更トランジション
            onClick={handleShuffle}
          >
            🔀 シャッフル
          </button>
        </div>

      </div>
    </div>
  )
}