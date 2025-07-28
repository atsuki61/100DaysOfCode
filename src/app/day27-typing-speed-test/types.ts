// タイピングテストの状態を表す型
export type TestStatus = 'idle' | 'running' | 'completed'

// 課題文章の型
export interface TypingText {
  id: string
  title: string
  content: string
  difficulty: 'easy' | 'medium' | 'hard'
}

// キー入力履歴の型
export interface KeyStroke {
  key: string // 押されたキー
  timestamp: number // タイムスタンプ
  isCorrect: boolean // 正しい入力かどうか
  expectedKey: string | null // 期待されていたキー
  position: number // 文章内の位置
}

// タイプミス情報の型
export interface TypingError {
  position: number // エラー位置
  expectedChar: string // 期待された文字
  inputChar: string // 実際に入力された文字
  timestamp: number // エラー発生時刻
  attempts: number // その位置での試行回数
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
  // 新しく追加
  totalKeyStrokes: number // 総キー入力数
  errorCount: number // エラー回数
  keyStrokes: KeyStroke[] // キー入力履歴
  errors: TypingError[] // エラー詳細
  averageSpeed: number // 平均入力速度（文字/秒）
  errorRate: number // エラー率（エラー数/総入力数）
}

// タイピング状態の型
export interface TypingState {
  status: TestStatus
  selectedText: TypingText | null
  userInput: string
  romajiInput: string // ローマ字入力バッファ
  currentIndex: number // 現在入力すべき文字のインデックス
  startTime: number | null
  endTime: number | null
  errors: TypingError[]  // エラー履歴
  keyStrokes: KeyStroke[] // キー入力履歴
  currentPosition: number // 現在の文字位置
  expectedKeys: string[] // 次に期待されるキー
}

// 文字の表示状態を表す型
export type CharacterStatus = 'pending' | 'correct' | 'incorrect' | 'current'

// タイピング統計の型
export interface TypingStats {
  result: TypingResult | null
  bestWpm: number
  totalTests: number
  averageAccuracy: number
  totalKeyStrokes: number // 総キー入力数
  totalErrors: number // 総エラー数
}

// ローマ字バリデーション結果の型
export interface RomajiValidation {
  isValid: boolean
  isComplete: boolean
  expectedChars: string[]
  nextChar: string | null
  remainingInput: string
}

// キー入力イベントの型
export interface KeyInputEvent {
  key: string
  timestamp: number
  metaKey?: boolean
  ctrlKey?: boolean
  altKey?: boolean
  shiftKey?: boolean
} 