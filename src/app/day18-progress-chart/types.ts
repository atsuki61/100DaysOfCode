// TOEIC スコアデータの型定義
export interface TOEICScore {
  date: string;       // 受験日 (YYYY-MM-DD)
  total: number;      // 総合スコア (10-990)
  listening: number;  // リスニングスコア (5-495)
  reading: number;    // リーディングスコア (5-495)
}

// チャート表示用のデータポイント
export interface ChartDataPoint {
  date: string;
  formattedDate: string;  // 表示用にフォーマットされた日付
  total: number;
  listening: number;
  reading: number;
}

// チャート設定の型定義
export interface ChartConfig {
  type: 'line' | 'bar';           // グラフの種類
  showListening: boolean;         // リスニングスコアを表示するか
  showReading: boolean;           // リーディングスコアを表示するか
  showTotal: boolean;             // 総合スコアを表示するか
  timeRange: 'all' | '1year' | '6months' | '3months';  // 表示期間
}

// スコア統計情報の型定義
export interface ScoreStatistics {
  latestScore: TOEICScore | null;    // 最新のスコア
  maxScore: TOEICScore | null;       // 最高スコア
  minScore: TOEICScore | null;       // 最低スコア
  averageTotal: number;              // 平均総合スコア
  averageListening: number;          // 平均リスニングスコア
  averageReading: number;            // 平均リーディングスコア
  improvement: number;               // 初回から最新までの改善点数
  testCount: number;                 // 受験回数
}

// スコアフィルター条件の型定義
export interface ScoreFilter {
  timeRange: ChartConfig['timeRange'];
  minScore?: number;
  maxScore?: number;
} 