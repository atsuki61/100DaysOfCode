'use client'

import { CharacterStatus } from '../types'
import { convertToRomaji, generateRomajiCombinations, isJapanese } from '../utils/romajiUtils'

interface TypingDisplayProps {
  targetText: string
  userInput: string
  romajiInput: string // ローマ字入力バッファ
  currentPosition: number // 現在の文字位置
  expectedKeys: string[] // 期待されるキー
  className?: string
}

export default function TypingDisplay({ 
  targetText, 
  userInput, 
  romajiInput,
  currentPosition,
  expectedKeys,
  className = '' 
}: TypingDisplayProps) {
  
  // 文字ごとの表示状態を計算
  const getCharacterDisplay = (charIndex: number) => {
    const char = targetText[charIndex]
    const isCurrentChar = charIndex === currentPosition
    const isCompleted = charIndex < currentPosition
    
    let status: CharacterStatus = 'pending'
    const displayChar = char
    let romajiHint = ''
    
    if (isCompleted) {
      status = 'correct'
    } else if (isCurrentChar) {
      status = 'current'
      
      // 日本語文字の場合はローマ字ヒントを表示
      if (isJapanese(char)) {
        const romajiPatterns = convertToRomaji(char)
        const combinations = generateRomajiCombinations(romajiPatterns)
        romajiHint = combinations[0] || ''
      }
    } else {
      status = 'pending'
    }
    
    return { status, displayChar, romajiHint }
  }

  const getCharacterStyle = (status: CharacterStatus, isSpace: boolean = false): string => {
    const baseStyle = `inline-block px-1 py-0.5 mx-0.5 rounded transition-all duration-150 ${
      isSpace ? 'min-w-[1rem]' : ''
    }`
    
    switch (status) {
      case 'correct':
        return `${baseStyle} bg-green-200 text-green-800` // 正解: 緑背景, 濃い緑文字
      case 'incorrect':
        return `${baseStyle} bg-red-200 text-red-800` // 不正解: 赤背景, 濃い赤文字
      case 'current':
        return `${baseStyle} bg-blue-400 text-white animate-pulse border-2 border-blue-600` // 現在位置: 青背景, 白文字, 点滅, 青ボーダー
      case 'pending':
      default:
        return `${baseStyle} text-gray-600 bg-gray-50` // 未入力: グレー文字, 薄グレー背景
    }
  }

  // 単語単位での区切り表示
  const renderWordByWord = () => {
    const words = targetText.split(' ')
    let charIndex = 0
    
    return words.map((word, wordIndex) => (
      <span key={wordIndex} className="inline-block mr-2"> {/* インラインブロック, 右マージン2 */}
        {word.split('').map((char, charInWordIndex) => {
          const currentCharIndex = charIndex + charInWordIndex
          const { status, displayChar, romajiHint } = getCharacterDisplay(currentCharIndex)
          const isSpace = char === ' '
          
          return (
            <span
              key={currentCharIndex}
              className={`relative ${getCharacterStyle(status, isSpace)}`} // 相対位置
            >
              {isSpace ? '\u00A0' : displayChar} {/* スペースを非改行スペースに変換 */}
              
              {/* ローマ字ヒント表示 */}
              {status === 'current' && romajiHint && (
                <span className="absolute -top-6 left-0 text-xs text-blue-600 bg-blue-100 px-1 rounded whitespace-nowrap"> {/* 絶対位置, 上-6, 左0, 極小文字, 青文字, 薄青背景, 横パディング1, 角丸, 改行なし */}
                  {romajiHint}
                </span>
              )}
              
              {/* 現在の入力バッファ表示 */}
              {status === 'current' && romajiInput && (
                <span className="absolute -bottom-6 left-0 text-xs text-orange-600 bg-orange-100 px-1 rounded whitespace-nowrap"> {/* 絶対位置, 下-6, 左0, 極小文字, 橙文字, 薄橙背景, 横パディング1, 角丸, 改行なし */}
                  {romajiInput}
                </span>
              )}
            </span>
          )
        })}
        {/* 単語間のスペース処理 */}
        {wordIndex < words.length - 1 && (() => {
          const spaceIndex = charIndex + word.length
          const { status } = getCharacterDisplay(spaceIndex)
          charIndex += word.length + 1 // 次の単語の開始位置を更新
          
          return (
            <span
              key={`space-${wordIndex}`}
              className={getCharacterStyle(status, true)}
            >
              {'\u00A0'}
            </span>
          )
        })()}
        {wordIndex === words.length - 1 && (charIndex += word.length)} {/* 最後の単語の場合はインデックスのみ更新 */}
      </span>
    ))
  }

  return (
    <div className={`w-full max-w-4xl mx-auto p-6 ${className}`}> {/* 幅最大4xl, 中央揃え, パディング6 */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm"> {/* 白背景, グレーボーダー, 角丸, パディング6, 軽い影 */}
        <h3 className="text-lg font-semibold text-gray-800 mb-4"> {/* 大文字, 太字, 濃いグレー, 下マージン4 */}
          タイピング課題
        </h3>
        
        {/* 課題文章表示エリア */}
        <div className="relative mb-6 p-4 bg-gray-50 rounded-lg border"> {/* 相対位置, 下マージン6, パディング4, 薄グレー背景, 角丸, ボーダー */}
          <div className="text-lg leading-relaxed font-mono min-h-[4rem]" style={{ lineHeight: '2rem' }}> {/* 大文字, 行間ゆったり, 等幅フォント, 最小高さ4rem */}
            {renderWordByWord()}
          </div>
        </div>

        {/* 現在の状態情報 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4"> {/* グリッド1列(MD以上で3列), 間隔4, 下マージン4 */}
          <div className="text-center p-3 bg-blue-50 rounded-lg"> {/* 中央揃え, パディング3, 薄青背景, 角丸 */}
            <div className="text-sm text-blue-700 mb-1">現在位置</div> {/* 小文字, 青文字, 下マージン1 */}
            <div className="text-xl font-bold text-blue-600"> {/* 大きい文字, 太字, 青文字 */}
              {currentPosition} / {targetText.length}
            </div>
          </div>
          
          <div className="text-center p-3 bg-green-50 rounded-lg"> {/* 中央揃え, パディング3, 薄緑背景, 角丸 */}
            <div className="text-sm text-green-700 mb-1">完了文字</div> {/* 小文字, 緑文字, 下マージン1 */}
            <div className="text-xl font-bold text-green-600"> {/* 大きい文字, 太字, 緑文字 */}
              {userInput.length}
            </div>
          </div>
          
          <div className="text-center p-3 bg-purple-50 rounded-lg"> {/* 中央揃え, パディング3, 薄紫背景, 角丸 */}
            <div className="text-sm text-purple-700 mb-1">残り文字</div> {/* 小文字, 紫文字, 下マージン1 */}
            <div className="text-xl font-bold text-purple-600"> {/* 大きい文字, 太字, 紫文字 */}
              {targetText.length - currentPosition}
            </div>
          </div>
        </div>
        
        {/* 進捗バー */}
        <div className="mb-4"> {/* 下マージン4 */}
          <div className="flex justify-between items-center mb-2"> {/* フレックス, 両端揃え, 中央寄せ, 下マージン2 */}
            <span className="text-sm text-gray-600">進捗</span> {/* 小文字, グレー */}
            <span className="text-sm text-gray-600"> {/* 小文字, グレー */}
              {Math.round((currentPosition / targetText.length) * 100)}%
            </span>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-3"> {/* 幅いっぱい, グレー背景, 角丸, 高さ3 */}
            <div 
              className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-300" // グラデーション背景(青から緑), 高さ3, 角丸, トランジション
              style={{ 
                width: `${targetText.length > 0 ? (currentPosition / targetText.length) * 100 : 0}%` 
              }}
            />
          </div>
        </div>

        {/* 次に期待される入力の表示 */}
        {expectedKeys.length > 0 && (
          <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg"> {/* パディング3, 薄黄背景, 黄ボーダー, 角丸 */}
            <div className="flex items-center space-x-2"> {/* フレックス, 中央寄せ, 横間隔2 */}
              <span className="text-sm font-medium text-yellow-800">次の入力:</span> {/* 小文字, 太字, 黄文字 */}
              <div className="flex space-x-1"> {/* フレックス, 横間隔1 */}
                {expectedKeys.slice(0, 5).map((key, index) => (
                  <span 
                    key={index}
                    className="px-2 py-1 bg-yellow-600 text-white text-sm font-mono rounded" // 横パディング2, 縦パディング1, 黄背景, 白文字, 小文字, 等幅フォント, 角丸
                  >
                    {key === ' ' ? 'Space' : key}
                  </span>
                ))}
                {expectedKeys.length > 5 && (
                  <span className="text-yellow-700">...</span> // 黄文字
                )}
              </div>
            </div>
            
            {/* ローマ字入力バッファ表示 */}
            {romajiInput && (
              <div className="mt-2 text-sm text-yellow-700"> {/* 上マージン2, 小文字, 黄文字 */}
                ローマ字入力中: <span className="font-mono bg-yellow-100 px-1 rounded">{romajiInput}</span> {/* 等幅フォント, 薄黄背景, 横パディング1, 角丸 */}
              </div>
            )}
          </div>
        )}

        {/* 凡例 */}
        <div className="mt-4 p-3 bg-gray-50 rounded-lg"> {/* 上マージン4, パディング3, 薄グレー背景, 角丸 */}
          <div className="text-sm text-gray-700 mb-2 font-medium">表示の説明:</div> {/* 小文字, グレー文字, 下マージン2, 太字 */}
          <div className="flex flex-wrap gap-4 text-xs"> {/* フレックス, 折り返し, 間隔4, 極小文字 */}
            <div className="flex items-center space-x-1"> {/* フレックス, 中央寄せ, 横間隔1 */}
              <span className="px-2 py-1 bg-green-200 text-green-800 rounded">完了</span> {/* 横パディング2, 縦パディング1, 緑背景, 濃い緑文字, 角丸 */}
              <span className="text-gray-600">入力済み</span> {/* グレー文字 */}
            </div>
            <div className="flex items-center space-x-1"> {/* フレックス, 中央寄せ, 横間隔1 */}
              <span className="px-2 py-1 bg-blue-400 text-white rounded animate-pulse">入力中</span> {/* 横パディング2, 縦パディング1, 青背景, 白文字, 角丸, 点滅 */}
              <span className="text-gray-600">現在位置</span> {/* グレー文字 */}
            </div>
            <div className="flex items-center space-x-1"> {/* フレックス, 中央寄せ, 横間隔1 */}
              <span className="px-2 py-1 bg-gray-50 text-gray-600 rounded">待機</span> {/* 横パディング2, 縦パディング1, 薄グレー背景, グレー文字, 角丸 */}
              <span className="text-gray-600">未入力</span> {/* グレー文字 */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 