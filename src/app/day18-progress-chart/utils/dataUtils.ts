import { TOEICScore, ChartDataPoint, ScoreStatistics, ScoreFilter } from '../types';

// 実際のTOEICスコアデータ
export const sampleTOEICScores: TOEICScore[] = [
  {
    date: '2024-12-13',
    listening: 190,
    reading: 90,
    total: 280
  },
  {
    date: '2025-05-18',
    listening: 265,
    reading: 150,
    total: 415
  }
];

// 日付フォーマット関数
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

// TOEICスコアをチャート用データに変換
export const convertToChartData = (scores: TOEICScore[]): ChartDataPoint[] => {
  return scores
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map(score => ({
      date: score.date,
      listening: score.listening,
      reading: score.reading,
      total: score.total,
      formattedDate: formatDate(score.date)
    }));
};

// 統計情報を計算
export const calculateStatistics = (scores: TOEICScore[]): ScoreStatistics => {
  if (scores.length === 0) {
    return {
      latestScore: null,
      maxScore: null,
      minScore: null,
      averageTotal: 0,
      averageListening: 0,
      averageReading: 0,
      improvement: 0,
      testCount: 0
    };
  }

  const sortedScores = [...scores].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const totalScores = scores.map(s => s.total);
  const listeningScores = scores.map(s => s.listening);
  const readingScores = scores.map(s => s.reading);
  
  const averageTotal = Math.round(totalScores.reduce((sum, score) => sum + score, 0) / totalScores.length);
  const averageListening = Math.round(listeningScores.reduce((sum, score) => sum + score, 0) / listeningScores.length);
  const averageReading = Math.round(readingScores.reduce((sum, score) => sum + score, 0) / readingScores.length);
  
  const maxScore = scores.reduce((max, score) => 
    score.total > max.total ? score : max
  );
  const minScore = scores.reduce((min, score) => 
    score.total < min.total ? score : min
  );
  
  const latestScore = sortedScores[sortedScores.length - 1];
  const improvement = sortedScores.length > 1 ? 
    latestScore.total - sortedScores[0].total : 0;

  return {
    latestScore,
    maxScore,
    minScore,
    averageTotal,
    averageListening,
    averageReading,
    improvement,
    testCount: scores.length
  };
};

// フィルター適用
export const applyFilter = (scores: TOEICScore[], filter: ScoreFilter): TOEICScore[] => {
  return scores.filter(score => {
    // スコア範囲フィルター
    if (filter.minScore && score.total < filter.minScore) return false;
    if (filter.maxScore && score.total > filter.maxScore) return false;
    
    return true;
  });
};

// 時間範囲フィルター
export const getScoresByTimeRange = (scores: TOEICScore[], range: 'all' | '1year' | '6months' | '3months'): TOEICScore[] => {
  if (range === 'all') return scores;

  const now = new Date();
  const monthsToSubtract = {
    '3months': 3,
    '6months': 6,
    '1year': 12
  }[range];

  const cutoffDate = new Date(now.getFullYear(), now.getMonth() - monthsToSubtract, now.getDate());
  
  return scores.filter(score => new Date(score.date) >= cutoffDate);
};

// スコア改善率を計算
export const calculateImprovementRate = (scores: TOEICScore[]): number => {
  if (scores.length < 2) return 0;
  
  const sortedScores = [...scores].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const firstScore = sortedScores[0].total;
  const lastScore = sortedScores[sortedScores.length - 1].total;
  
  return Math.round(((lastScore - firstScore) / firstScore) * 100);
}; 