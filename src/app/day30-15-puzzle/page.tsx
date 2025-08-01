'use client'

import { useState, useEffect } from 'react'
import { PuzzleState, GameStatus } from './types'
import { shufflePuzzle, moveTile, isGameWon } from './utils'

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
  const [currentTime, setCurrentTime] = useState<number>(Date.now()) // リアルタイム時間管理

  // リアルタイムタイマー
  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null

    // ゲームが進行中の場合のみタイマーを開始
    if (puzzleState.status === 'playing' && puzzleState.stats.startTime) {
      intervalId = setInterval(() => {
        setCurrentTime(Date.now())
      }, 1000) // 1秒ごとに更新
    }

    // クリーンアップ関数：コンポーネントのアンマウント時やステータス変更時にタイマーをクリア
    return () => {
      if (intervalId) {
        clearInterval(intervalId)
      }
    }
  }, [puzzleState.status, puzzleState.stats.startTime])

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

  // タイルクリック処理
  const handleTileClick = (clickedIndex: number) => {
    // ゲームが終了している場合は何もしない
    if (puzzleState.status === 'won') return
    
    // 空白タイルをクリックした場合は何もしない
    if (puzzleState.board[clickedIndex] === 0) return
    
    // タイルを移動
    const newBoard = moveTile(puzzleState.board, clickedIndex, puzzleState.emptyIndex)
    
    // 移動が実際に発生したかチェック（盤面が変わったか）
    const moved = !newBoard.every((value, index) => value === puzzleState.board[index])
    
    if (moved) {
      const newEmptyIndex = newBoard.indexOf(0)
      const newMoves = puzzleState.stats.moves + 1
      
      // ゲームクリア判定
      const gameWon = isGameWon(newBoard)
      const newStatus: GameStatus = gameWon ? 'won' : 'playing'
      const endTime = gameWon ? Date.now() : null
      
      setPuzzleState({
        board: newBoard,
        status: newStatus,
        stats: {
          moves: newMoves,
          startTime: puzzleState.stats.startTime || Date.now(), // 初回移動時にタイマー開始
          endTime: endTime,
          elapsedTime: endTime && puzzleState.stats.startTime 
            ? endTime - puzzleState.stats.startTime 
            : puzzleState.stats.elapsedTime,
        },
        emptyIndex: newEmptyIndex,
      })
    }
  }

  // リセット機能
  const handleReset = () => {
    setPuzzleState(initialState)
    setCurrentTime(Date.now()) // 現在時刻もリセット
  }

  // 経過時間の計算（リアルタイム表示用）
  const getElapsedTime = () => {
    if (puzzleState.stats.endTime) {
      // ゲーム終了時は固定の経過時間を表示
      return puzzleState.stats.elapsedTime
    }
    if (puzzleState.stats.startTime && puzzleState.status === 'playing') {
      // ゲーム進行中はリアルタイムで計算
      return currentTime - puzzleState.stats.startTime
    }
    return 0
  }

  // 時間を分:秒形式でフォーマット
  const formatTime = (milliseconds: number) => {
    const seconds = Math.floor(milliseconds / 1000)
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  return (
    <div className="container mx-auto px-4 py-8"> {/* コンテナ, 水平中央, 横パディング4, 縦パディング8 */}
      <div className="max-w-md mx-auto"> {/* 最大幅中, 中央配置 */}
        
        {/* ゲーム統計 */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6"> {/* 白背景, 角丸大, 影中, パディング4, 下マージン6 */}
          <h2 className="text-lg font-semibold mb-2">📊 ゲーム統計</h2> {/* 文字大, フォント中太, 下マージン2 */}
          <div className="grid grid-cols-3 gap-4"> {/* グリッド3列, 間隔4 */}
            <div>
              <span className="text-sm text-gray-600">移動回数</span> {/* 小文字, グレー文字 */}
              <p className="text-xl font-bold">{puzzleState.stats.moves}</p> {/* 文字超大, 太字 */}
            </div>
            <div>
              <span className="text-sm text-gray-600">ステータス</span>
              <p className="text-xl font-bold capitalize">
                {puzzleState.status === 'won' ? '🎉 完成!' : puzzleState.status}
              </p>
            </div>
            <div>
              <span className="text-sm text-gray-600">時間</span>
              <p className="text-xl font-bold">{formatTime(getElapsedTime())}</p>
            </div>
          </div>
        </div>

        {/* ゲーム完成メッセージ */}
        {puzzleState.status === 'won' && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-6"> {/* 緑薄背景, 緑境界, 緑文字, パディング, 角丸大, 下マージン6 */}
            <div className="flex items-center">
              <span className="text-2xl mr-2">🎉</span> {/* 文字超大, 右マージン2 */}
              <div>
                <p className="font-bold">おめでとうございます！</p>
                <p className="text-sm">
                  {puzzleState.stats.moves}回の移動で {formatTime(puzzleState.stats.elapsedTime)} でクリアしました！
                </p>
              </div>
            </div>
          </div>
        )}

        {/* パズル盤面 */}
        <div className="bg-white rounded-lg shadow-md p-4"> {/* 白背景, 角丸大, 影中, パディング4 */}
          <h2 className="text-lg font-semibold mb-4">🧩 パズル盤面</h2>
          
          {/* 4x4グリッド */}
          <div className="grid grid-cols-4 gap-2 max-w-xs mx-auto"> {/* グリッド4列, 間隔2, 最大幅極小, 中央 */}
            {puzzleState.board.map((value, index) => (
              <div
                key={index}
                className={`
                  aspect-square flex items-center justify-center text-lg font-bold rounded-md transition-all duration-200
                  ${value === 0 
                    ? 'bg-gray-200 text-gray-400' // 空白タイル: グレー背景, グレー文字
                    : 'bg-blue-500 text-white hover:bg-blue-600 cursor-pointer hover:scale-105' // 数字タイル: 青背景, 白文字, ホバー時濃い青・拡大, カーソルポインター
                  }
                  ${puzzleState.status === 'won' ? 'animate-pulse' : ''} // 完成時はパルス
                `}
                onClick={() => handleTileClick(index)}
              >
                {value === 0 ? '' : value}
              </div>
            ))}
          </div>
        </div>

        {/* 操作ボタン */}
        <div className="mt-6 flex justify-center space-x-4"> {/* 上マージン6, 中央配置, 水平間隔4 */}
          <button 
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md transition-colors" // 緑背景, ホバー時濃い緑, 白文字, 太字, 縦パディング2, 横パディング4, 角丸中, 色変更トランジション
            onClick={handleShuffle}
          >
            🔀 シャッフル
          </button>
          
          <button 
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-md transition-colors" // グレー背景, ホバー時濃いグレー, 白文字, 太字, 縦パディング2, 横パディング4, 角丸中, 色変更トランジション
            onClick={handleReset}
          >
            🔄 リセット
          </button>
        </div>

      </div>
    </div>
  )
}