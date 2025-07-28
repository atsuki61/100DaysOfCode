'use client'

import { TestStatus, TypingResult } from '../types'
import { formatTime } from '../utils/typingUtils'

interface TypingStatsProps {
  status: TestStatus
  elapsedTime: number
  currentWPM: number
  result: TypingResult | null
  progress: number
  className?: string
}

export default function TypingStats({
  status,
  elapsedTime,
  currentWPM,
  result,
  progress,
  className = ''
}: TypingStatsProps) {
  const getStatusColor = (status: TestStatus) => {
    switch (status) {
      case 'idle':
        return 'text-gray-600 bg-gray-100'
      case 'running':
        return 'text-blue-600 bg-blue-100'
      case 'completed':
        return 'text-green-600 bg-green-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusText = (status: TestStatus) => {
    switch (status) {
      case 'idle':
        return '準備完了'
      case 'running':
        return 'タイピング中'
      case 'completed':
        return 'テスト完了'
      default:
        return '不明'
    }
  }

  return (
    <div className={`w-full max-w-4xl mx-auto p-6 ${className}`}> {/* 幅最大4xl, 中央揃え, パディング6 */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm"> {/* 白背景, グレーボーダー, 角丸, パディング6, 軽い影 */}
        <div className="flex justify-between items-center mb-6"> {/* フレックス, 両端揃え, 中央寄せ, 下マージン6 */}
          <h3 className="text-lg font-semibold text-gray-800"> {/* 大文字, 太字, 濃いグレー */}
            統計情報
          </h3>
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(status)}`}> {/* 横パディング3, 縦パディング1, 角丸, 小文字, 太字 */}
            {getStatusText(status)}
          </div>
        </div>

        {/* リアルタイム統計 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6"> {/* グリッド2列(MD以上で4列), 間隔4, 下マージン6 */}
          <div className="text-center p-4 bg-blue-50 rounded-lg"> {/* 中央揃え, パディング4, 薄青背景, 角丸 */}
            <div className="text-2xl font-bold text-blue-600"> {/* 大きい文字, 太字, 青文字 */}
              {formatTime(elapsedTime)}
            </div>
            <div className="text-sm text-blue-700 mt-1"> {/* 小文字, 青文字, 上マージン1 */}
              経過時間
            </div>
          </div>

          <div className="text-center p-4 bg-green-50 rounded-lg"> {/* 中央揃え, パディング4, 薄緑背景, 角丸 */}
            <div className="text-2xl font-bold text-green-600"> {/* 大きい文字, 太字, 緑文字 */}
              {status === 'running' ? currentWPM : result?.wpm || 0}
            </div>
            <div className="text-sm text-green-700 mt-1"> {/* 小文字, 緑文字, 上マージン1 */}
              WPM
            </div>
          </div>

          <div className="text-center p-4 bg-purple-50 rounded-lg"> {/* 中央揃え, パディング4, 薄紫背景, 角丸 */}
            <div className="text-2xl font-bold text-purple-600"> {/* 大きい文字, 太字, 紫文字 */}
              {result?.accuracy || 0}%
            </div>
            <div className="text-sm text-purple-700 mt-1"> {/* 小文字, 紫文字, 上マージン1 */}
              正確性
            </div>
          </div>

          <div className="text-center p-4 bg-orange-50 rounded-lg"> {/* 中央揃え, パディング4, 薄橙背景, 角丸 */}
            <div className="text-2xl font-bold text-orange-600"> {/* 大きい文字, 太字, 橙文字 */}
              {progress}%
            </div>
            <div className="text-sm text-orange-700 mt-1"> {/* 小文字, 橙文字, 上マージン1 */}
              進捗
            </div>
          </div>
        </div>

        {/* 詳細結果（テスト完了時のみ表示） */}
        {status === 'completed' && result && (
          <div className="border-t border-gray-200 pt-6"> {/* 上ボーダー, グレーボーダー, 上パディング6 */}
            <h4 className="text-md font-semibold text-gray-800 mb-4"> {/* 中文字, 太字, 濃いグレー, 下マージン4 */}
              詳細結果
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6"> {/* グリッド1列(MD以上で2列), 間隔6 */}
              <div className="space-y-3"> {/* 縦間隔3 */}
                <div className="flex justify-between items-center"> {/* フレックス, 両端揃え, 中央寄せ */}
                  <span className="text-gray-600">CPM (文字/分):</span> {/* グレー文字 */}
                  <span className="font-semibold text-gray-900">{result.cpm}</span> {/* 太字, 濃いグレー */}
                </div>
                
                <div className="flex justify-between items-center"> {/* フレックス, 両端揃え, 中央寄せ */}
                  <span className="text-gray-600">総文字数:</span> {/* グレー文字 */}
                  <span className="font-semibold text-gray-900">{result.totalCharacters}</span> {/* 太字, 濃いグレー */}
                </div>
                
                <div className="flex justify-between items-center"> {/* フレックス, 両端揃え, 中央寄せ */}
                  <span className="text-gray-600">正しい文字数:</span> {/* グレー文字 */}
                  <span className="font-semibold text-green-600">{result.correctCharacters}</span> {/* 太字, 緑文字 */}
                </div>
              </div>
              
              <div className="space-y-3"> {/* 縦間隔3 */}
                <div className="flex justify-between items-center"> {/* フレックス, 両端揃え, 中央寄せ */}
                  <span className="text-gray-600">間違えた文字数:</span> {/* グレー文字 */}
                  <span className="font-semibold text-red-600">{result.incorrectCharacters}</span> {/* 太字, 赤文字 */}
                </div>
                
                <div className="flex justify-between items-center"> {/* フレックス, 両端揃え, 中央寄せ */}
                  <span className="text-gray-600">実際の経過時間:</span> {/* グレー文字 */}
                  <span className="font-semibold text-gray-900">{result.timeElapsed.toFixed(1)}秒</span> {/* 太字, 濃いグレー */}
                </div>
              </div>
            </div>
            
            {/* パフォーマンス評価 */}
            <div className="mt-6 p-4 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50"> {/* 上マージン6, パディング4, 角丸, グラデーション背景 */}
              <h5 className="font-semibold text-gray-800 mb-2">パフォーマンス評価</h5> {/* 太字, 濃いグレー, 下マージン2 */}
              <p className="text-sm text-gray-700"> {/* 小文字, グレー文字 */}
                {result.wpm >= 60 ? '素晴らしい！非常に高いタイピング速度です。' :
                 result.wpm >= 40 ? '良好！平均以上のタイピング速度です。' :
                 result.wpm >= 20 ? '普通のタイピング速度です。練習で改善できます。' :
                 'タイピング速度の向上が必要です。継続的な練習をおすすめします。'}
                {result.accuracy >= 95 ? ' 正確性も非常に高く、バランスの取れたタイピングスキルです。' :
                 result.accuracy >= 85 ? ' 正確性も良好です。' :
                 ' 正確性の向上も心がけましょう。'}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 