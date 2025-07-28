'use client'

import { useTypingTest } from './hooks/useTypingTest'
import TextSelector from './components/TextSelector'
import TypingDisplay from './components/TypingDisplay'
import TypingInput from './components/TypingInput'
import TypingStats from './components/TypingStats'
import ControlButtons from './components/ControlButtons'

export default function TypingSpeedTestPage() {
  const {
    state,
    result,
    elapsedTime,
    progress,
    currentWPM,
    startTest,
    handleKeyInput, // 新しい厳密制御
    resetTest,
    stopTest,
    selectText
  } = useTypingTest()

  const handleStartTest = () => {
    if (state.selectedText) {
      startTest(state.selectedText)
    }
  }

  return (
    <div className="space-y-8 pb-12"> {/* 縦間隔8, 下パディング12 */}
      {/* タイピング統計情報（拡張版） */}
      <TypingStats
        status={state.status}
        elapsedTime={elapsedTime}
        currentWPM={currentWPM}
        result={result}
        progress={progress}
        keyStrokes={state.keyStrokes} // 新規追加
        errors={state.errors} // 新規追加
        expectedKeys={state.expectedKeys} // 新規追加
      />

      {/* 課題文章選択 */}
      <TextSelector
        selectedText={state.selectedText}
        onSelectText={selectText}
        disabled={state.status === 'running'}
      />

      {/* タイピング表示エリア（課題文章が選択されている場合のみ表示） */}
      {state.selectedText && (
        <TypingDisplay
          targetText={state.selectedText.content}
          userInput={state.userInput}
          romajiInput={state.romajiInput} // 新規追加
          currentPosition={state.currentPosition} // 更新（currentIndexから変更）
          expectedKeys={state.expectedKeys} // 新規追加
        />
      )}

      {/* タイピング入力エリア（課題文章が選択されている場合のみ表示） */}
      {state.selectedText && (
        <TypingInput
          value={state.userInput}
          romajiInput={state.romajiInput} // 新規追加
          expectedKeys={state.expectedKeys} // 新規追加
          onKeyInput={handleKeyInput} // 新しい厳密制御
          onStart={handleStartTest}
          status={state.status}
          disabled={state.status === 'completed'}
        />
      )}

      {/* コントロールボタン */}
      <ControlButtons
        status={state.status}
        selectedText={state.selectedText}
        onStart={handleStartTest}
        onStop={stopTest}
        onReset={resetTest}
      />

      {/* 開発モード：デバッグ情報 */}
      {process.env.NODE_ENV === 'development' && (
        <div className="w-full max-w-4xl mx-auto p-6"> {/* 幅最大4xl, 中央揃え, パディング6 */}
          <div className="bg-gray-100 border border-gray-300 rounded-lg p-4"> {/* グレー背景, グレーボーダー, 角丸, パディング4 */}
            <h3 className="text-lg font-semibold text-gray-800 mb-4">デバッグ情報</h3> {/* 大文字, 太字, 濃いグレー, 下マージン4 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm"> {/* グリッド1列(MD以上で2列), 間隔4, 小文字 */}
              <div className="space-y-2"> {/* 縦間隔2 */}
                <div><strong>ステータス:</strong> {state.status}</div>
                <div><strong>現在位置:</strong> {state.currentPosition}</div>
                <div><strong>ユーザー入力:</strong> &quot;{state.userInput}&quot;</div>
                <div><strong>ローマ字バッファ:</strong> &quot;{state.romajiInput}&quot;</div>
                <div><strong>期待キー数:</strong> {state.expectedKeys.length}</div>
              </div>
              <div className="space-y-2"> {/* 縦間隔2 */}
                <div><strong>総キー入力:</strong> {state.keyStrokes.length}</div>
                <div><strong>エラー数:</strong> {state.errors.length}</div>
                <div><strong>進捗:</strong> {progress}%</div>
                <div><strong>現在WPM:</strong> {currentWPM}</div>
                <div><strong>経過時間:</strong> {elapsedTime}秒</div>
              </div>
            </div>
            
            {state.expectedKeys.length > 0 && (
              <div className="mt-4"> {/* 上マージン4 */}
                <strong>期待キー:</strong> 
                <div className="flex flex-wrap gap-1 mt-1"> {/* フレックス, 折り返し, 間隔1, 上マージン1 */}
                  {state.expectedKeys.slice(0, 10).map((key, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-mono"> {/* 横パディング2, 縦パディング1, 薄青背景, 青文字, 角丸, 極小文字, 等幅フォント */}
                      {key === ' ' ? 'Space' : key}
                    </span>
                  ))}
                  {state.expectedKeys.length > 10 && (
                    <span className="text-blue-600 text-xs">+{state.expectedKeys.length - 10} more</span>
                  )}
                </div>
              </div>
            )}

            {/* 最近のキー入力履歴 */}
            {state.keyStrokes.length > 0 && (
              <div className="mt-4"> {/* 上マージン4 */}
                <strong>最近のキー入力 (最新10件):</strong>
                <div className="flex flex-wrap gap-1 mt-1"> {/* フレックス, 折り返し, 間隔1, 上マージン1 */}
                  {state.keyStrokes.slice(-10).map((stroke, index) => (
                    <span 
                      key={index} 
                      className={`px-2 py-1 rounded text-xs font-mono ${
                        stroke.isCorrect 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`} // 横パディング2, 縦パディング1, 角丸, 極小文字, 等幅フォント
                      title={`${stroke.isCorrect ? '正解' : 'エラー'} - ${new Date(stroke.timestamp).toLocaleTimeString()}`}
                    >
                      {stroke.key === ' ' ? 'Space' : stroke.key}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* エラー履歴 */}
            {state.errors.length > 0 && (
              <div className="mt-4"> {/* 上マージン4 */}
                <strong>エラー履歴 (最新5件):</strong>
                <div className="space-y-1 mt-1"> {/* 縦間隔1, 上マージン1 */}
                  {state.errors.slice(-5).map((error, index) => (
                    <div key={index} className="text-xs text-red-600"> {/* 極小文字, 赤文字 */}
                      位置{error.position}: &quot;{error.expectedChar}&quot; → &quot;{error.inputChar}&quot; ({error.attempts}回試行)
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
} 