// タイピングテストの状態を表す型
export type TestStatus = 'idle' | 'running' | 'completed'

// 課題文章の型
export interface TypingText {
  id: string
  title: string
  content: string
  difficulty: 'easy' | 'medium' | 'hard'
}

// タイピング結果の型
export interface TypingResult {
  wpm: number // Words Per Minute
  cpm: number // Characters Per Minute
  accuracy: number // 正確性（パーセンテージ）
  timeElapsed: number // 経過時間（秒）
  totalCharacters: number // 総文字数
  correctCharacters: number // 正しく入力された文字数
  incorrectCharacters: number // 間違えた文字数
}

// タイピング状態の型
export interface TypingState {
  status: TestStatus
  selectedText: TypingText | null
  userInput: string
  currentIndex: number // 現在入力すべき文字のインデックス
  startTime: number | null
  endTime: number | null
  errors: number[]  // エラーが発生した文字のインデックス
}

// 文字の表示状態を表す型
export type CharacterStatus = 'pending' | 'correct' | 'incorrect' | 'current'

// タイピング統計の型
export interface TypingStats {
  result: TypingResult | null
  bestWpm: number
  totalTests: number
  averageAccuracy: number
} 