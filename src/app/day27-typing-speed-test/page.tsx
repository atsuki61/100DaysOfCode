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
        onSelectText={selectText}
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