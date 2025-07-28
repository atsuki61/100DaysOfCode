'use client'

import { CharacterStatus } from '../types'
import { getCharacterStatus } from '../utils/typingUtils'

interface TypingDisplayProps {
  targetText: string
  userInput: string
  currentIndex: number
  className?: string
}

export default function TypingDisplay({ 
  targetText, 
  userInput, 
  currentIndex, 
  className = '' 
}: TypingDisplayProps) {
  const getCharacterStyle = (status: CharacterStatus): string => {
    switch (status) {
      case 'correct':
        return 'bg-green-200 text-green-800' // 正解: 緑背景, 濃い緑文字
      case 'incorrect':
        return 'bg-red-200 text-red-800' // 不正解: 赤背景, 濃い赤文字
      case 'current':
        return 'bg-blue-400 text-white animate-pulse' // 現在位置: 青背景, 白文字, 点滅
      case 'pending':
      default:
        return 'text-gray-600' // 未入力: グレー文字
    }
  }

  return (
    <div className={`w-full max-w-4xl mx-auto p-6 ${className}`}> {/* 幅最大4xl, 中央揃え, パディング6 */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm"> {/* 白背景, グレーボーダー, 角丸, パディング6, 軽い影 */}
        <h3 className="text-lg font-semibold text-gray-800 mb-4"> {/* 大文字, 太字, 濃いグレー, 下マージン4 */}
          タイピング課題
        </h3>
        
        <div className="text-lg leading-relaxed font-mono"> {/* 大文字, 行間ゆったり, 等幅フォント */}
          {targetText.split('').map((char, index) => {
            const status = getCharacterStatus(
              char,
              userInput[index],
              index,
              currentIndex,
              userInput.length
            )
            
            return (
              <span
                key={index}
                className={`px-1 py-0.5 rounded transition-all duration-150 ${getCharacterStyle(status)}`} // 横パディング1, 縦パディング0.5, 角丸, トランジション
              >
                {char === ' ' ? '\u00A0' : char} {/* スペースを非改行スペースに変換 */}
              </span>
            )
          })}
        </div>
        
        {/* 進捗バー */}
        <div className="mt-6"> {/* 上マージン6 */}
          <div className="flex justify-between items-center mb-2"> {/* フレックス, 両端揃え, 中央寄せ, 下マージン2 */}
            <span className="text-sm text-gray-600">進捗</span> {/* 小文字, グレー */}
            <span className="text-sm text-gray-600"> {/* 小文字, グレー */}
              {userInput.length} / {targetText.length} 文字
            </span>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2"> {/* 幅いっぱい, グレー背景, 角丸, 高さ2 */}
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-300" // 青背景, 高さ2, 角丸, トランジション
              style={{ 
                width: `${targetText.length > 0 ? (userInput.length / targetText.length) * 100 : 0}%` 
              }}
            />
          </div>
          
          <div className="text-center mt-2"> {/* 中央揃え, 上マージン2 */}
            <span className="text-lg font-semibold text-blue-600"> {/* 大文字, 太字, 青文字 */}
              {targetText.length > 0 ? Math.round((userInput.length / targetText.length) * 100) : 0}%
            </span>
          </div>
        </div>
      </div>
    </div>
  )
} 