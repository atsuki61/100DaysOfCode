'use client'

import { TestStatus, TypingResult, KeyStroke, TypingError } from '../types'
import { formatTime } from '../utils/typingUtils'
import { useState } from 'react'

interface TypingStatsProps {
  status: TestStatus
  elapsedTime: number
  currentWPM: number
  result: TypingResult | null
  progress: number
  keyStrokes: KeyStroke[] // キー入力履歴
  errors: TypingError[] // エラー履歴
  expectedKeys: string[] // 期待されるキー
  className?: string
}

export default function TypingStats({
  status,
  elapsedTime,
  currentWPM,
  result,
  progress,
  keyStrokes,
  errors,
  expectedKeys,
  className = ''
}: TypingStatsProps) {
  const [showDetailedStats, setShowDetailedStats] = useState(false)
  const [showErrorAnalysis, setShowErrorAnalysis] = useState(false)
  const [showKeyStrokes, setShowKeyStrokes] = useState(false)

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

  // エラー分析
  const analyzeErrors = () => {
    if (!errors.length) return null

    const errorByPosition = errors.reduce((acc, error) => {
      const key = `${error.position}-${error.expectedChar}`
      if (!acc[key]) {
        acc[key] = { ...error, count: 0 }
      }
      acc[key].count++
      return acc
    }, {} as Record<string, TypingError & { count: number }>)

    const sortedErrors = Object.values(errorByPosition)
      .sort((a, b) => b.count - a.count)
      .slice(0, 10) // 上位10個のエラー

    return sortedErrors
  }

  // キー別エラー統計
  const getKeyErrorStats = () => {
    if (!keyStrokes.length) return null

    const keyStats = keyStrokes.reduce((acc, stroke) => {
      if (!acc[stroke.key]) {
        acc[stroke.key] = { correct: 0, incorrect: 0, total: 0 }
      }
      acc[stroke.key].total++
      if (stroke.isCorrect) {
        acc[stroke.key].correct++
      } else {
        acc[stroke.key].incorrect++
      }
      return acc
    }, {} as Record<string, { correct: number; incorrect: number; total: number }>)

    return Object.entries(keyStats)
      .map(([key, stats]) => ({
        key,
        ...stats,
        accuracy: (stats.correct / stats.total) * 100
      }))
      .sort((a, b) => a.accuracy - b.accuracy)
      .slice(0, 10) // 精度の低い上位10キー
  }

  // 入力速度の変化を計算
  const getSpeedTrend = () => {
    if (!keyStrokes.length || !result) return null

    const windowSize = Math.max(10, Math.floor(keyStrokes.length / 10))
    const windows = []
    
    for (let i = 0; i < keyStrokes.length; i += windowSize) {
      const window = keyStrokes.slice(i, i + windowSize)
      const correctStrokes = window.filter(ks => ks.isCorrect)
      const timeSpan = (window[window.length - 1]?.timestamp - window[0]?.timestamp) / 1000
      const wpm = timeSpan > 0 ? Math.round((correctStrokes.length / 5) / (timeSpan / 60)) : 0
      
      windows.push({
        index: Math.floor(i / windowSize),
        wpm,
        accuracy: (correctStrokes.length / window.length) * 100
      })
    }
    
    return windows
  }

  const topErrors = analyzeErrors()
  const keyErrorStats = getKeyErrorStats()
  const speedTrend = getSpeedTrend()

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

        {/* 実行中の追加情報 */}
        {status === 'running' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"> {/* グリッド1列(MD以上で3列), 間隔4, 下マージン6 */}
            <div className="text-center p-3 bg-yellow-50 rounded-lg"> {/* 中央揃え, パディング3, 薄黄背景, 角丸 */}
              <div className="text-lg font-bold text-yellow-600"> {/* 大文字, 太字, 黄文字 */}
                {keyStrokes.length}
              </div>
              <div className="text-sm text-yellow-700 mt-1"> {/* 小文字, 黄文字, 上マージン1 */}
                総キー入力数
              </div>
            </div>

            <div className="text-center p-3 bg-red-50 rounded-lg"> {/* 中央揃え, パディング3, 薄赤背景, 角丸 */}
              <div className="text-lg font-bold text-red-600"> {/* 大文字, 太字, 赤文字 */}
                {errors.length}
              </div>
              <div className="text-sm text-red-700 mt-1"> {/* 小文字, 赤文字, 上マージン1 */}
                エラー回数
              </div>
            </div>

            <div className="text-center p-3 bg-indigo-50 rounded-lg"> {/* 中央揃え, パディング3, 薄インディゴ背景, 角丸 */}
              <div className="text-lg font-bold text-indigo-600"> {/* 大文字, 太字, インディゴ文字 */}
                {expectedKeys.length}
              </div>
              <div className="text-sm text-indigo-700 mt-1"> {/* 小文字, インディゴ文字, 上マージン1 */}
                期待キー数
              </div>
            </div>
          </div>
        )}

        {/* 詳細結果（テスト完了時のみ表示） */}
        {status === 'completed' && result && (
          <div className="border-t border-gray-200 pt-6"> {/* 上ボーダー, グレーボーダー, 上パディング6 */}
            <div className="flex justify-between items-center mb-4"> {/* フレックス, 両端揃え, 中央寄せ, 下マージン4 */}
              <h4 className="text-md font-semibold text-gray-800"> {/* 中文字, 太字, 濃いグレー */}
                詳細結果
              </h4>
              <div className="flex space-x-2"> {/* フレックス, 横間隔2 */}
                <button
                  onClick={() => setShowDetailedStats(!showDetailedStats)}
                  className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors" // 横パディング3, 縦パディング1, 小文字, 薄青背景, 青文字, 角丸, ホバー効果, トランジション
                >
                  {showDetailedStats ? '基本表示' : '詳細表示'}
                </button>
                <button
                  onClick={() => setShowErrorAnalysis(!showErrorAnalysis)}
                  className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors" // 横パディング3, 縦パディング1, 小文字, 薄赤背景, 赤文字, 角丸, ホバー効果, トランジション
                >
                  {showErrorAnalysis ? 'エラー非表示' : 'エラー分析'}
                </button>
                <button
                  onClick={() => setShowKeyStrokes(!showKeyStrokes)}
                  className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors" // 横パディング3, 縦パディング1, 小文字, 薄緑背景, 緑文字, 角丸, ホバー効果, トランジション
                >
                  {showKeyStrokes ? '履歴非表示' : 'キー履歴'}
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6"> {/* グリッド1列(MD以上で2列), 間隔6, 下マージン6 */}
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

                <div className="flex justify-between items-center"> {/* フレックス, 両端揃え, 中央寄せ */}
                  <span className="text-gray-600">総キー入力数:</span> {/* グレー文字 */}
                  <span className="font-semibold text-blue-600">{result.totalKeyStrokes}</span> {/* 太字, 青文字 */}
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

                <div className="flex justify-between items-center"> {/* フレックス, 両端揃え, 中央寄せ */}
                  <span className="text-gray-600">平均入力速度:</span> {/* グレー文字 */}
                  <span className="font-semibold text-purple-600">{result.averageSpeed.toFixed(2)} 文字/秒</span> {/* 太字, 紫文字 */}
                </div>

                <div className="flex justify-between items-center"> {/* フレックス, 両端揃え, 中央寄せ */}
                  <span className="text-gray-600">エラー率:</span> {/* グレー文字 */}
                  <span className="font-semibold text-red-600">{result.errorRate.toFixed(1)}%</span> {/* 太字, 赤文字 */}
                </div>
              </div>
            </div>

            {/* 詳細統計表示 */}
            {showDetailedStats && speedTrend && (
              <div className="mb-6 p-4 bg-gray-50 rounded-lg"> {/* 下マージン6, パディング4, 薄グレー背景, 角丸 */}
                <h5 className="font-semibold text-gray-800 mb-3">入力速度の変化</h5> {/* 太字, 濃いグレー, 下マージン3 */}
                <div className="grid grid-cols-5 gap-2 text-sm"> {/* グリッド5列, 間隔2, 小文字 */}
                  {speedTrend.slice(0, 10).map((window, index) => (
                    <div key={index} className="text-center p-2 bg-white rounded"> {/* 中央揃え, パディング2, 白背景, 角丸 */}
                      <div className="font-bold text-blue-600">{window.wpm}</div> {/* 太字, 青文字 */}
                      <div className="text-xs text-gray-600">WPM</div> {/* 極小文字, グレー文字 */}
                      <div className="text-xs text-green-600">{window.accuracy.toFixed(0)}%</div> {/* 極小文字, 緑文字 */}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* エラー分析 */}
            {showErrorAnalysis && topErrors && topErrors.length > 0 && (
              <div className="mb-6 p-4 bg-red-50 rounded-lg"> {/* 下マージン6, パディング4, 薄赤背景, 角丸 */}
                <h5 className="font-semibold text-red-800 mb-3">エラー分析</h5> {/* 太字, 赤文字, 下マージン3 */}
                
                {keyErrorStats && (
                  <div className="mb-4"> {/* 下マージン4 */}
                    <h6 className="text-sm font-medium text-red-700 mb-2">苦手キー (精度順)</h6> {/* 小文字, 太字, 赤文字, 下マージン2 */}
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-2"> {/* グリッド2列(MD以上で5列), 間隔2 */}
                      {keyErrorStats.slice(0, 10).map((stat, index) => (
                        <div key={index} className="text-center p-2 bg-white rounded text-sm"> {/* 中央揃え, パディング2, 白背景, 角丸, 小文字 */}
                          <div className="font-mono font-bold text-red-600">{stat.key === ' ' ? 'Space' : stat.key}</div> {/* 等幅フォント, 太字, 赤文字 */}
                          <div className="text-xs text-red-700">{stat.accuracy.toFixed(0)}%</div> {/* 極小文字, 赤文字 */}
                          <div className="text-xs text-gray-600">{stat.incorrect}/{stat.total}</div> {/* 極小文字, グレー文字 */}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <h6 className="text-sm font-medium text-red-700 mb-2">頻出エラー</h6> {/* 小文字, 太字, 赤文字, 下マージン2 */}
                  <div className="space-y-2"> {/* 縦間隔2 */}
                    {topErrors.slice(0, 5).map((error, index) => (
                      <div key={index} className="flex justify-between items-center p-2 bg-white rounded"> {/* フレックス, 両端揃え, 中央寄せ, パディング2, 白背景, 角丸 */}
                        <div className="text-sm"> {/* 小文字 */}
                          位置 {error.position}: &quot;{error.expectedChar}&quot; → &quot;{error.inputChar}&quot;
                        </div>
                        <div className="text-sm font-semibold text-red-600">{error.count}回</div> {/* 小文字, 太字, 赤文字 */}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* キー入力履歴 */}
            {showKeyStrokes && result.keyStrokes.length > 0 && (
              <div className="mb-6 p-4 bg-green-50 rounded-lg"> {/* 下マージン6, パディング4, 薄緑背景, 角丸 */}
                <h5 className="font-semibold text-green-800 mb-3">キー入力履歴 (最新20件)</h5> {/* 太字, 緑文字, 下マージン3 */}
                <div className="grid grid-cols-4 md:grid-cols-10 gap-1"> {/* グリッド4列(MD以上で10列), 間隔1 */}
                  {result.keyStrokes.slice(-20).map((stroke, index) => (
                    <div 
                      key={index} 
                      className={`text-center p-1 rounded text-xs font-mono ${
                        stroke.isCorrect 
                          ? 'bg-green-200 text-green-800' 
                          : 'bg-red-200 text-red-800'
                      }`} // 中央揃え, パディング1, 角丸, 極小文字, 等幅フォント
                      title={`${stroke.key} - ${stroke.isCorrect ? '正解' : 'エラー'} - ${new Date(stroke.timestamp).toLocaleTimeString()}`}
                    >
                      {stroke.key === ' ' ? '␣' : stroke.key}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
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
              {result.errorRate > 10 && (
                <p className="text-sm text-red-600 mt-2"> {/* 小文字, 赤文字, 上マージン2 */}
                  エラー率が高めです。正確性を重視した練習をおすすめします。
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 