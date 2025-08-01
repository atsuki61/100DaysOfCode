export interface TypingStats {
  wpm: number;                    // Words Per Minute
  accuracy: number;               // 正確性（％）
  totalTyped: number;             // 総入力文字数
  correctChars: number;           // 正しく入力された文字数
  incorrectChars: number;         // 間違って入力された文字数
  timeElapsed: number;            // 経過時間（秒）
}

export interface TypingTestState {
  text: string;                   // 課題文章
  userInput: string;              // ユーザーの入力
  currentIndex: number;           // 現在の入力位置
  isStarted: boolean;             // テスト開始フラグ
  isFinished: boolean;            // テスト終了フラグ
  startTime: number | null;       // 開始時刻（ミリ秒）
  endTime: number | null;         // 終了時刻（ミリ秒）
  stats: TypingStats;             // 統計情報
  charStatuses: CharStatus[];     // 文字ごとの状態
}

export interface CharStatus {
  char: string;                   // 文字
  status: 'pending' | 'correct' | 'incorrect' | 'current'; // 文字の状態
  userChar?: string;              // ユーザーが入力した文字（間違いの場合）
}

export interface SampleText {
  id: string;
  title: string;
  text: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
}