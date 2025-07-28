'use client'

import { useRef, useEffect } from 'react'
import { TestStatus, KeyInputEvent } from '../types'

interface TypingInputProps {
  value: string
  romajiInput: string // ローマ字入力バッファ
  expectedKeys: string[] // 期待されるキー
  onKeyInput: (keyEvent: KeyInputEvent) => boolean
  onStart?: () => void
  disabled?: boolean
  status: TestStatus
  placeholder?: string
  className?: string
}

export default function TypingInput({
  value,
  romajiInput,
  expectedKeys,
  onKeyInput,
  onStart,
  disabled = false,
  status,
  placeholder = 'ここに入力してください...',
  className = ''
}: TypingInputProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  // テストが開始されたら入力エリアにフォーカス
  useEffect(() => {
    if (status === 'running' && inputRef.current) {
      inputRef.current.focus()
    }
  }, [status])

  // キー入力ハンドラ（厳密制御）
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // IME無効化
    if (e.nativeEvent.isComposing) {
      e.preventDefault()
      return
    }

    // 特殊キーの処理
    if (e.key === 'Tab' || e.key === 'Enter') {
      e.preventDefault()
      return
    }

    // 初回入力時にテスト開始
    if (status === 'idle' && value === '' && onStart) {
      onStart()
    }

    // キー入力イベントを作成
    const keyEvent: KeyInputEvent = {
      key: e.key,
      timestamp: Date.now(),
      metaKey: e.metaKey,
      ctrlKey: e.ctrlKey,
      altKey: e.altKey,
      shiftKey: e.shiftKey
    }

    // 厳密な入力制御
    const isAccepted = onKeyInput(keyEvent)
    
    // 正しくない入力は無効化
    if (!isAccepted) {
      e.preventDefault()
    }
  }

  // 通常の変更イベントは無効化（厳密制御のため）
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    // 値は手動で制御されるため、変更を許可しない
  }

  // ペースト無効化
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
  }

  // コンテキストメニュー無効化
  const handleContextMenu = (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault()
  }

  const getInputStyle = () => {
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
        
        {/* 期待されるキーの表示 */}
        {status === 'running' && expectedKeys.length > 0 && (
          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg"> {/* 下マージン4, パディング3, 薄青背景, 青ボーダー, 角丸 */}
            <div className="flex items-center space-x-2 mb-2"> {/* フレックス, 中央寄せ, 横間隔2, 下マージン2 */}
              <span className="text-sm font-medium text-blue-800">次に入力:</span> {/* 小文字, 太字, 青文字 */}
              <div className="flex space-x-1"> {/* フレックス, 横間隔1 */}
                {expectedKeys.slice(0, 3).map((key, index) => (
                  <span 
                    key={index}
                    className="px-2 py-1 bg-blue-600 text-white text-sm font-mono rounded border" // 横パディング2, 縦パディング1, 青背景, 白文字, 小文字, 等幅フォント, 角丸, ボーダー
                  >
                    {key === ' ' ? 'Space' : key}
                  </span>
                ))}
                {expectedKeys.length > 3 && (
                  <span className="text-blue-600 text-sm">...</span> // 青文字, 小文字
                )}
              </div>
            </div>
            {romajiInput && (
              <div className="text-sm text-blue-700"> {/* 小文字, 青文字 */}
                ローマ字入力中: <span className="font-mono bg-blue-100 px-1 rounded">{romajiInput}</span> {/* 等幅フォント, 薄青背景, 横パディング1, 角丸 */}
              </div>
            )}
          </div>
        )}
        
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          onContextMenu={handleContextMenu}
          disabled={disabled || status === 'completed'}
          placeholder={placeholder}
          className={`w-full h-16 p-4 text-lg font-mono rounded-lg border-2 transition-all duration-200 outline-none ${getInputStyle()}`} // 幅いっぱい, 高さ16, パディング4, 大文字, 等幅フォント, 角丸, ボーダー2, トランジション, アウトライン無し
          autoComplete="off" // オートコンプリート無効
          autoCorrect="off" // オートコレクト無効
          autoCapitalize="off" // オートキャピタライズ無効
          spellCheck={false} // スペルチェック無効
          // IME無効化の設定
          inputMode="none" // IMEを完全に無効化
          style={{
            imeMode: 'disabled' // 古いブラウザ対応
          }}
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
            
            {status === 'running' && romajiInput && (
              <span className="text-blue-600"> {/* 青文字 */}
                バッファ: {romajiInput}
              </span>
            )}
          </div>
          
          {status === 'idle' && (
            <span className="text-gray-500 text-xs"> {/* グレー文字, 極小文字 */}
              入力を開始するとタイマーが開始されます
            </span>
          )}
        </div>
        
        {/* 注意事項 */}
        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg"> {/* 上マージン4, パディング3, 薄黄背景, 黄ボーダー, 角丸 */}
          <h4 className="font-semibold text-yellow-800 mb-2">厳密モード</h4> {/* 太字, 黄文字, 下マージン2 */}
          <ul className="text-sm text-yellow-800 space-y-1"> {/* 小文字, 黄文字, 縦間隔1 */}
            <li>• 正しいキーのみが受け付けられます</li>
            <li>• タイプミスした場合は正しいキーを再入力してください</li>
            <li>• バックスペースやコピー&ペーストは無効です</li>
            <li>• IME（漢字変換）は無効化されています</li>
            <li>• 日本語はローマ字で入力してください</li>
          </ul>
        </div>
        
        {/* デバッグ情報（開発時のみ表示） */}
        {process.env.NODE_ENV === 'development' && status === 'running' && (
          <div className="mt-4 p-3 bg-gray-50 border border-gray-200 rounded-lg"> {/* 上マージン4, パディング3, 薄グレー背景, グレーボーダー, 角丸 */}
            <h4 className="font-semibold text-gray-800 mb-2">デバッグ情報</h4> {/* 太字, 濃いグレー, 下マージン2 */}
            <div className="text-xs text-gray-600 space-y-1"> {/* 極小文字, グレー文字, 縦間隔1 */}
              <div>期待キー: {JSON.stringify(expectedKeys)}</div>
              <div>ローマ字バッファ: &quot;{romajiInput}&quot;</div>
              <div>現在値: &quot;{value}&quot;</div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 