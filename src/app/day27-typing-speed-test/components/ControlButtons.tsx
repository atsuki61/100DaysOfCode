'use client'

import { TestStatus, TypingText } from '../types'

interface ControlButtonsProps {
  status: TestStatus
  selectedText: TypingText | null
  onStart: () => void
  onStop: () => void
  onReset: () => void
  className?: string
}

export default function ControlButtons({
  status,
  selectedText,
  onStart,
  onStop,
  onReset,
  className = ''
}: ControlButtonsProps) {
  const canStart = status === 'idle' && selectedText !== null
  const canStop = status === 'running'
  const canReset = status !== 'idle'

  return (
    <div className={`w-full max-w-4xl mx-auto p-6 ${className}`}> {/* 幅最大4xl, 中央揃え, パディング6 */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm"> {/* 白背景, グレーボーダー, 角丸, パディング6, 軽い影 */}
        <h3 className="text-lg font-semibold text-gray-800 mb-4"> {/* 大文字, 太字, 濃いグレー, 下マージン4 */}
          テスト操作
        </h3>
        
        <div className="flex flex-wrap gap-4 justify-center"> {/* フレックス, 折り返し, 間隔4, 中央揃え */}
          {/* 開始ボタン */}
          <button
            onClick={onStart}
            disabled={!canStart}
            className={`px-6 py-3 rounded-lg font-medium text-white transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-4 ${
              canStart
                ? 'bg-green-500 hover:bg-green-600 focus:ring-green-200 shadow-lg hover:shadow-xl' // 有効時: 緑背景, ホバー濃い緑, 緑リング, 影
                : 'bg-gray-300 cursor-not-allowed' // 無効時: グレー背景, カーソル禁止
            }`}
          >
            <span className="flex items-center space-x-2"> {/* フレックス, 中央寄せ, 横間隔2 */}
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"> {/* 幅5, 高さ5 */}
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
              <span>テスト開始</span>
            </span>
          </button>

          {/* 停止ボタン */}
          <button
            onClick={onStop}
            disabled={!canStop}
            className={`px-6 py-3 rounded-lg font-medium text-white transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-4 ${
              canStop
                ? 'bg-red-500 hover:bg-red-600 focus:ring-red-200 shadow-lg hover:shadow-xl' // 有効時: 赤背景, ホバー濃い赤, 赤リング, 影
                : 'bg-gray-300 cursor-not-allowed' // 無効時: グレー背景, カーソル禁止
            }`}
          >
            <span className="flex items-center space-x-2"> {/* フレックス, 中央寄せ, 横間隔2 */}
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"> {/* 幅5, 高さ5 */}
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z" clipRule="evenodd" />
              </svg>
              <span>テスト停止</span>
            </span>
          </button>

          {/* リセットボタン */}
          <button
            onClick={onReset}
            disabled={!canReset}
            className={`px-6 py-3 rounded-lg font-medium text-gray-700 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-4 ${
              canReset
                ? 'bg-gray-100 hover:bg-gray-200 focus:ring-gray-200 border border-gray-300 shadow-lg hover:shadow-xl' // 有効時: グレー背景, ホバー濃いグレー, グレーリング, ボーダー, 影
                : 'bg-gray-50 cursor-not-allowed border border-gray-200' // 無効時: 薄グレー背景, カーソル禁止, ボーダー
            }`}
          >
            <span className="flex items-center space-x-2"> {/* フレックス, 中央寄せ, 横間隔2 */}
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"> {/* 幅5, 高さ5 */}
                <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
              </svg>
              <span>リセット</span>
            </span>
          </button>
        </div>

        {/* ヘルプテキスト */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg"> {/* 上マージン6, パディング4, 薄青背景, 青ボーダー, 角丸 */}
          <h4 className="font-semibold text-blue-900 mb-2"> {/* 太字, 濃い青, 下マージン2 */}
            操作方法
          </h4>
          <ul className="text-sm text-blue-800 space-y-1"> {/* 小文字, 青文字, 縦間隔1 */}
            <li>• まず課題文章を選択してください</li>
            <li>• 「テスト開始」を押すか、入力エリアに文字を入力するとテストが開始されます</li>
            <li>• テスト中は「テスト停止」でいつでも終了できます</li>
            <li>• 「リセット」で最初の状態に戻ります</li>
            <li>• 課題文章をすべて入力し終わると自動的にテストが完了します</li>
          </ul>
        </div>

        {/* 状態メッセージ */}
        {status === 'idle' && !selectedText && (
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-center"> {/* 上マージン4, パディング3, 薄黄背景, 黄ボーダー, 角丸, 中央揃え */}
            <span className="text-yellow-800 text-sm"> {/* 黄文字, 小文字 */}
              課題文章を選択してからテストを開始できます
            </span>
          </div>
        )}

        {status === 'running' && (
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-center"> {/* 上マージン4, パディング3, 薄青背景, 青ボーダー, 角丸, 中央揃え */}
            <span className="text-blue-800 text-sm"> {/* 青文字, 小文字 */}
              タイピングテスト実行中... 頑張って入力してください！
            </span>
          </div>
        )}

        {status === 'completed' && (
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg text-center"> {/* 上マージン4, パディング3, 薄緑背景, 緑ボーダー, 角丸, 中央揃え */}
            <span className="text-green-800 text-sm"> {/* 緑文字, 小文字 */}
              テスト完了！お疲れ様でした。結果を確認してください。
            </span>
          </div>
        )}
      </div>
    </div>
  )
} 