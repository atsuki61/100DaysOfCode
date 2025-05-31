/**
 * Day 7: 単語フラッシュカード アプリの型定義
 */

// 学習状態の型定義
export type LearningStatus = 'not_studied' | 'studying' | 'mastered';

// 単語カードの型定義
export interface WordCard {
  id: number;
  word: string;        // 英単語
  meaning: string;     // 日本語の意味
  pronunciation: string; // 発音記号
  example: string;     // 例文
  category: '基礎の400語' | '頻出の300語' | '必須の200語' | '発展の100語' | '設問に出る単語・表現' | 'パート1重要語' | 'Supplement'; // カテゴリ
  learningStatus: 'not_studied' | 'studying' | 'mastered'; // 学習ステータス
}

// アプリの状態管理用の型
export interface FlashcardState {
  currentIndex: number;  // 現在表示中のカードのインデックス
  isRevealed: boolean;   // 意味が表示されているかどうか
  totalCards: number;    // 総カード数
  filterMode: 'all' | 'studying'; // フィルタリングモード
}

// 学習統計の型定義
export interface LearningStats {
  total: number;         // 総単語数
  mastered: number;      // 覚えた単語数
  studying: number;      // 学習中の単語数
  notStudied: number;    // 未学習の単語数
} 