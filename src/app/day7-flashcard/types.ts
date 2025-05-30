/**
 * Day 7: 単語フラッシュカード アプリの型定義
 */

// 学習状態の型定義
export type LearningStatus = 'not_studied' | 'learned' | 'need_review';

// 単語カードの型定義
export interface WordCard {
  id: number;
  word: string;        // 英単語
  meaning: string;     // 日本語の意味
  pronunciation: string; // 発音記号
  example: string;     // 例文
  level: 'basic' | 'intermediate' | 'advanced'; // 難易度レベル
  learningStatus: LearningStatus; // 学習状態
}

// アプリの状態管理用の型
export interface FlashcardState {
  currentIndex: number;  // 現在表示中のカードのインデックス
  isRevealed: boolean;   // 意味が表示されているかどうか
  totalCards: number;    // 総カード数
  filterMode: 'all' | 'need_review'; // フィルタリングモード
}

// 学習統計の型定義
export interface LearningStats {
  total: number;         // 総単語数
  learned: number;       // 覚えた単語数
  needReview: number;    // 復習が必要な単語数
  notStudied: number;    // 未学習の単語数
} 