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
    handleInput,
    resetTest,
    stopTest
  } = useTypingTest()

  const handleStartTest = () => {
    if (state.selectedText) {
      startTest(state.selectedText)
    }
  }

  return (
    <div className="space-y-8 pb-12"> {/* 縦間隔8, 下パディング12 */}
      {/* タイピング統計情報 */}
      <TypingStats
        status={state.status}
        elapsedTime={elapsedTime}
        currentWPM={currentWPM}
        result={result}
        progress={progress}
      />

      {/* 課題文章選択 */}
      <TextSelector
        selectedText={state.selectedText}
        onSelectText={(text) => {
          if (state.status === 'idle') {
            // resetTest()を呼んでから新しいテキストを設定
            resetTest()
            // useTypingTestフックに直接テキスト設定機能がないため、startTestを使用
            setTimeout(() => {
              startTest(text)
              // すぐにリセットして選択状態だけにする
              resetTest()
              // 状態を更新（実際の実装では、フックに選択機能を追加する必要があります）
            }, 0)
          }
        }}
        disabled={state.status === 'running'}
      />

      {/* タイピング表示エリア（課題文章が選択されている場合のみ表示） */}
      {state.selectedText && (
        <TypingDisplay
          targetText={state.selectedText.content}
          userInput={state.userInput}
          currentIndex={state.currentIndex}
        />
      )}

      {/* タイピング入力エリア（課題文章が選択されている場合のみ表示） */}
      {state.selectedText && (
        <TypingInput
          value={state.userInput}
          onChange={handleInput}
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
    </div>
  )
} 