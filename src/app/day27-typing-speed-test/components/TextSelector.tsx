'use client'

import { TypingText } from '../types'
import { typingTexts } from '../data/typingTexts'

interface TextSelectorProps {
  selectedText: TypingText | null
  onSelectText: (text: TypingText) => void
  disabled?: boolean
}

export default function TextSelector({ selectedText, onSelectText, disabled = false }: TextSelectorProps) {
  const getDifficultyColor = (difficulty: TypingText['difficulty']) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-800' // 緑: 簡単
      case 'medium':
        return 'bg-yellow-100 text-yellow-800' // 黄: 普通
      case 'hard':
        return 'bg-red-100 text-red-800' // 赤: 難しい
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getDifficultyText = (difficulty: TypingText['difficulty']) => {
    switch (difficulty) {
      case 'easy':
        return '簡単'
      case 'medium':
        return '普通'
      case 'hard':
        return '難しい'
      default:
        return '不明'
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-6"> {/* 幅最大4xl, 中央揃え, パディング6 */}
      <h2 className="text-xl font-semibold text-gray-800 mb-4"> {/* 文字サイズ大, 太字, 下マージン4 */}
        課題文章を選択してください
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> {/* グリッド1列(MD以上で2列), 間隔4 */}
        {typingTexts.map((text) => (
          <div
            key={text.id}
            onClick={() => !disabled && onSelectText(text)}
            className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
              selectedText?.id === text.id
                ? 'border-blue-500 bg-blue-50' // 選択時: 青ボーダー, 薄青背景
                : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md' // 未選択時: グレーボーダー, 白背景, ホバー効果
            } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`} // 無効時: 透明度50%, カーソル禁止
          >
            <div className="flex justify-between items-start mb-2"> {/* フレックス, 両端揃え, 上マージン2 */}
              <h3 className="font-medium text-gray-900 text-sm"> {/* 太字, 濃いグレー, 小文字 */}
                {text.title}
              </h3>
              <span className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(text.difficulty)}`}> {/* 横パディング2, 縦パディング1, 角丸, 極小文字, 太字 */}
                {getDifficultyText(text.difficulty)}
              </span>
            </div>
            
            <p className="text-sm text-gray-600 line-clamp-2"> {/* 小文字, グレー, 2行制限 */}
              {text.content}
            </p>
            
            <div className="mt-3 flex justify-between items-center text-xs text-gray-500"> {/* 上マージン3, フレックス, 両端揃え, 極小文字, 薄グレー */}
              <span>{text.content.length} 文字</span>
              {selectedText?.id === text.id && (
                <span className="text-blue-600 font-medium">✓ 選択中</span> // 青文字, 太字
              )}
            </div>
          </div>
        ))}
      </div>
      
      {selectedText && (
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg"> {/* 上マージン6, パディング4, 薄青背景, 青ボーダー, 角丸 */}
          <h3 className="font-semibold text-blue-900 mb-2"> {/* 太字, 濃い青, 下マージン2 */}
            選択された課題文章: {selectedText.title}
          </h3>
          <p className="text-blue-800 text-sm leading-relaxed"> {/* 青文字, 小文字, 行間ゆったり */}
            {selectedText.content}
          </p>
        </div>
      )}
    </div>
  )
} 