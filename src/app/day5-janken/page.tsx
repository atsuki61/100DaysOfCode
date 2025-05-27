'use client'

import { useState } from 'react'

type Choice = 'rock' | 'paper' | 'scissors'
type Result = 'win' | 'lose' | 'draw' | null

interface GameState {
  userChoice: Choice | null
  computerChoice: Choice | null
  result: Result
  score: {
    user: number
    computer: number
    draws: number
  }
}

const choices: { value: Choice; label: string; emoji: string }[] = [
  { value: 'rock', label: 'グー', emoji: '✊' },
  { value: 'paper', label: 'パー', emoji: '✋' },
  { value: 'scissors', label: 'チョキ', emoji: '✌️' }
]

export default function JankenGame() {
  const [gameState, setGameState] = useState<GameState>({
    userChoice: null,
    computerChoice: null,
    result: null,
    score: {
      user: 0,
      computer: 0,
      draws: 0
    }
  })

  const [isPlaying, setIsPlaying] = useState(false)

  // コンピュータの手をランダムに決定
  const getComputerChoice = (): Choice => {
    const randomIndex = Math.floor(Math.random() * choices.length)
    return choices[randomIndex].value
  }

  // 勝敗判定ロジック
  const determineWinner = (userChoice: Choice, computerChoice: Choice): Result => {
    if (userChoice === computerChoice) {
      return 'draw'
    }
    
    if (
      (userChoice === 'rock' && computerChoice === 'scissors') ||
      (userChoice === 'paper' && computerChoice === 'rock') ||
      (userChoice === 'scissors' && computerChoice === 'paper')
    ) {
      return 'win'
    }
    
    return 'lose'
  }

  // ゲーム実行
  const playGame = (userChoice: Choice) => {
    setIsPlaying(true)
    
    // 少し遅延を入れてドラマチックに
    setTimeout(() => {
      const computerChoice = getComputerChoice()
      const result = determineWinner(userChoice, computerChoice)
      
      setGameState(prevState => ({
        userChoice,
        computerChoice,
        result,
        score: {
          user: prevState.score.user + (result === 'win' ? 1 : 0),
          computer: prevState.score.computer + (result === 'lose' ? 1 : 0),
          draws: prevState.score.draws + (result === 'draw' ? 1 : 0)
        }
      }))
      
      setIsPlaying(false)
    }, 1000)
  }

  // ゲームリセット
  const resetGame = () => {
    setGameState({
      userChoice: null,
      computerChoice: null,
      result: null,
      score: {
        user: 0,
        computer: 0,
        draws: 0
      }
    })
  }

  // 結果メッセージ
  const getResultMessage = () => {
    switch (gameState.result) {
      case 'win':
        return '🎉 あなたの勝ち！'
      case 'lose':
        return '😢 あなたの負け...'
      case 'draw':
        return '🤝 引き分け'
      default:
        return '手を選んでください'
    }
  }

  // 結果の色
  const getResultColor = () => {
    switch (gameState.result) {
      case 'win':
        return 'text-green-600'
      case 'lose':
        return 'text-red-600'
      case 'draw':
        return 'text-yellow-600'
      default:
        return 'text-gray-600'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8 px-4"> {/* 最小高さ画面全体, グラデーション背景, 縦横余白 */}
      <div className="max-w-4xl mx-auto"> {/* 最大幅制限, 中央寄せ */}
        
        {/* スコアボード */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8"> {/* 白背景, 角丸, 影, 内側余白, 下余白 */}
          <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">スコア</h2> {/* 大文字, 太字, 中央寄せ, 下余白, グレー文字 */}
          <div className="grid grid-cols-3 gap-4 text-center"> {/* 3列グリッド, 間隔, 中央寄せ */}
            <div className="bg-green-100 rounded-lg p-4"> {/* 緑背景, 角丸, 内側余白 */}
              <div className="text-2xl font-bold text-green-600">{gameState.score.user}</div> {/* 大文字, 太字, 緑文字 */}
              <div className="text-sm text-green-700">あなた</div> {/* 小文字, 濃い緑文字 */}
            </div>
            <div className="bg-yellow-100 rounded-lg p-4"> {/* 黄背景, 角丸, 内側余白 */}
              <div className="text-2xl font-bold text-yellow-600">{gameState.score.draws}</div> {/* 大文字, 太字, 黄文字 */}
              <div className="text-sm text-yellow-700">引き分け</div> {/* 小文字, 濃い黄文字 */}
            </div>
            <div className="bg-red-100 rounded-lg p-4"> {/* 赤背景, 角丸, 内側余白 */}
              <div className="text-2xl font-bold text-red-600">{gameState.score.computer}</div> {/* 大文字, 太字, 赤文字 */}
              <div className="text-sm text-red-700">コンピュータ</div> {/* 小文字, 濃い赤文字 */}
            </div>
          </div>
        </div>

        {/* ゲーム結果表示 */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8 text-center"> {/* 白背景, 角丸, 影, 内側余白, 下余白, 中央寄せ */}
          <h3 className={`text-3xl font-bold mb-6 ${getResultColor()}`}> {/* 大文字, 太字, 下余白, 動的色 */}
            {getResultMessage()}
          </h3>
          
          {/* 手の表示 */}
          <div className="flex justify-center items-center gap-8 mb-6"> {/* フレックス, 中央寄せ, 垂直中央寄せ, 間隔, 下余白 */}
            {/* ユーザーの手 */}
            <div className="text-center"> {/* 中央寄せ */}
              <div className="text-6xl mb-2"> {/* 超大文字, 下余白 */}
                {gameState.userChoice ? 
                  choices.find(c => c.value === gameState.userChoice)?.emoji : '❓'
                }
              </div>
              <div className="text-lg font-semibold text-gray-700">あなた</div> {/* 大文字, 半太字, グレー文字 */}
            </div>
            
            {/* VS */}
            <div className="text-2xl font-bold text-gray-500">VS</div> {/* 大文字, 太字, グレー文字 */}
            
            {/* コンピュータの手 */}
            <div className="text-center"> {/* 中央寄せ */}
              <div className="text-6xl mb-2"> {/* 超大文字, 下余白 */}
                {isPlaying ? '🤔' : 
                  gameState.computerChoice ? 
                    choices.find(c => c.value === gameState.computerChoice)?.emoji : '❓'
                }
              </div>
              <div className="text-lg font-semibold text-gray-700">コンピュータ</div> {/* 大文字, 半太字, グレー文字 */}
            </div>
          </div>
        </div>

        {/* 手の選択ボタン */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8"> {/* 白背景, 角丸, 影, 内側余白, 下余白 */}
          <h3 className="text-2xl font-bold text-center mb-6 text-gray-800">手を選んでください</h3> {/* 大文字, 太字, 中央寄せ, 下余白, グレー文字 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4"> {/* 1列(モバイル), 3列(デスクトップ), 間隔 */}
            {choices.map((choice) => (
              <button
                key={choice.value}
                onClick={() => playGame(choice.value)}
                disabled={isPlaying}
                className={`
                  p-6 rounded-lg border-2 transition-all duration-200 
                  ${isPlaying 
                    ? 'bg-gray-100 border-gray-300 cursor-not-allowed' 
                    : 'bg-white border-gray-300 hover:border-blue-500 hover:bg-blue-50 active:scale-95'
                  }
                `} // 内側余白, 角丸, 境界線, トランジション, 条件付きスタイル
              >
                <div className="text-6xl mb-2">{choice.emoji}</div> {/* 超大文字, 下余白 */}
                <div className="text-xl font-semibold text-gray-700">{choice.label}</div> {/* 大文字, 半太字, グレー文字 */}
              </button>
            ))}
          </div>
        </div>

        {/* リセットボタン */}
        <div className="text-center"> {/* 中央寄せ */}
          <button
            onClick={resetGame}
            className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200" // グレー背景, ホバー時濃いグレー, 白文字, 太字, 縦横余白, 角丸, 色トランジション
          >
            ゲームリセット
          </button>
        </div>
      </div>
    </div>
  )
} 