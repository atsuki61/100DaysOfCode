'use client'

import { useRef, useEffect } from 'react'
import { TestStatus } from '../types'

interface TypingInputProps {
  value: string
  onChange: (value: string) => void
  onStart?: () => void
  disabled?: boolean
  status: TestStatus
  placeholder?: string
  className?: string
}

export default function TypingInput({
  value,
  onChange,
  onStart,
  disabled = false,
  status,
  placeholder = 'ここに入力してください...',
  className = ''
}: TypingInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // テストが開始されたら入力エリアにフォーカス
  useEffect(() => {
    if (status === 'running' && textareaRef.current) {
      textareaRef.current.focus()
    }
  }, [status])

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value
    
    // 初回入力時にテスト開始
    if (value === '' && newValue.length === 1 && onStart) {
      onStart()
    }
    
    onChange(newValue)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Ctrl+A (全選択) を無効化
    if (e.ctrlKey && e.key === 'a') {
      e.preventDefault()
    }
    
    // Ctrl+C, Ctrl+V (コピー&ペースト) を無効化
    if (e.ctrlKey && (e.key === 'c' || e.key === 'v')) {
      e.preventDefault()
    }
  }

  const getTextareaStyle = () => {
    if (disabled || status === 'completed') {
      return 'bg-gray-100 border-gray-300 cursor-not-allowed' // 無効時: グレー背景, グレーボーダー, カーソル禁止
    }
    
    if (status === 'running') {
      return 'bg-white border-blue-500 ring-2 ring-blue-200' // 実行中: 白背景, 青ボーダー, 青リング
    }
    
    return 'bg-white border-gray-300 hover:border-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200' // 通常時
  }

  return (
    <div className={`w-full max-w-4xl mx-auto p-6 ${className}`}> {/* 幅最大4xl, 中央揃え, パディング6 */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm"> {/* 白背景, グレーボーダー, 角丸, パディング6, 軽い影 */}
        <h3 className="text-lg font-semibold text-gray-800 mb-4"> {/* 大文字, 太字, 濃いグレー, 下マージン4 */}
          入力エリア
        </h3>
        
        <textarea
          ref={textareaRef}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          disabled={disabled || status === 'completed'}
          placeholder={placeholder}
          className={`w-full h-32 p-4 text-lg font-mono rounded-lg border-2 transition-all duration-200 resize-none outline-none ${getTextareaStyle()}`} // 幅いっぱい, 高さ32, パディング4, 大文字, 等幅フォント, 角丸, ボーダー2, トランジション, リサイズ不可, アウトライン無し
          spellCheck={false} // スペルチェック無効
          autoComplete="off" // オートコンプリート無効
          autoCorrect="off" // オートコレクト無効
          autoCapitalize="off" // オートキャピタライズ無効
        />
        
        {/* 入力状態の表示 */}
        <div className="mt-4 flex justify-between items-center text-sm"> {/* 上マージン4, フレックス, 両端揃え, 中央寄せ, 小文字 */}
          <div className="flex items-center space-x-4"> {/* フレックス, 中央寄せ, 横間隔4 */}
            <span className={`px-2 py-1 rounded text-xs font-medium ${
              status === 'idle' ? 'bg-gray-100 text-gray-600' :
              status === 'running' ? 'bg-blue-100 text-blue-600' :
              'bg-green-100 text-green-600'
            }`}> {/* 横パディング2, 縦パディング1, 角丸, 極小文字, 太字 */}
              {status === 'idle' ? '待機中' :
               status === 'running' ? '入力中' :
               '完了'}
            </span>
            
            <span className="text-gray-600"> {/* グレー文字 */}
              文字数: {value.length}
            </span>
          </div>
          
          {status === 'idle' && (
            <span className="text-gray-500 text-xs"> {/* グレー文字, 極小文字 */}
              入力を開始するとタイマーが開始されます
            </span>
          )}
        </div>
        
        {/* 注意事項 */}
        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg"> {/* 上マージン4, パディング3, 薄黄背景, 黄ボーダー, 角丸 */}
          <p className="text-sm text-yellow-800"> {/* 小文字, 黄文字 */}
            <strong>注意:</strong> コピー&ペーストや全選択は無効化されています。正確なタイピングスキルを測定するため、手動で入力してください。
          </p>
        </div>
      </div>
    </div>
  )
} 