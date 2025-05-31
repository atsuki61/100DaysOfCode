/**
 * Day 7: 単語フラッシュカード用データ
 * 銀フレ（TOEIC L&R TEST 出る単特急 銀のフレーズ）の単語データを使用
 */

import { WordCard } from '../types';
import { allGinFrameWords } from './ginFrame';

// 銀フレの全単語データをエクスポート
export const toeicWords: WordCard[] = allGinFrameWords;

// カテゴリ別の単語データもエクスポート（必要に応じて使用）
export { 
  basicWords,           // 基礎の400語
  frequentWords,        // 頻出の300語
  essentialWords,       // 必須の200語
  advancedWords,        // 発展の100語
  questionWords,        // 設問に出る単語・表現
  part1Words,          // パート1重要語
  ginFrameCategories   // カテゴリ別データセット
} from './ginFrame'; 