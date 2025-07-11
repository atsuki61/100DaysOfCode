// TOEICスコア推移チャートの型定義

// TOEICスコアの型
export interface TOEICScore {
  id: string;
  date: string; // YYYY-MM-DD形式
  listeningScore: number; // 5-495点
  readingScore: number; // 5-495点
  totalScore: number; // 10-990点
  testType: 'TOEIC L&R' | 'TOEIC Bridge' | 'TOEIC IP';
  memo?: string; // 受験時のメモ
}

// チャート表示用のデータ型
export interface ChartDataPoint {
  date: string;
  listening: number;
  reading: number;
  total: number;
  formattedDate: string; // 表示用のフォーマット済み日付
}

// チャートの種類
export type ChartType = 'line' | 'bar' | 'area';

// チャート設定
export interface ChartConfig {
  type: ChartType;
  showListening: boolean;
  showReading: boolean;
  showTotal: boolean;
  showDataLabels: boolean;
  timeRange: 'all' | '1year' | '6months' | '3months';
}

// 統計情報
export interface ScoreStatistics {
  averageTotal: number;
  maxTotal: number;
  minTotal: number;
  latestScore: TOEICScore | null;
  improvement: number; // 最新と最古のスコア差
  testCount: number;
}

// フィルター設定
export interface ScoreFilter {
  startDate?: string;
  endDate?: string;
  testType?: TOEICScore['testType'];
  minScore?: number;
  maxScore?: number;
} 