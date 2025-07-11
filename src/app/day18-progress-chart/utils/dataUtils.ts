import { TOEICScore, ChartDataPoint, ScoreStatistics, ScoreFilter } from '../types';

// サンプルTOEICスコアデータ
export const sampleTOEICScores: TOEICScore[] = [
  {
    id: '1',
    date: '2023-01-15',
    listeningScore: 350,
    readingScore: 320,
    totalScore: 670,
    testType: 'TOEIC L&R',
    memo: '初回受験。基礎力確認のため。'
  },
  {
    id: '2',
    date: '2023-04-20',
    listeningScore: 380,
    readingScore: 340,
    totalScore: 720,
    testType: 'TOEIC L&R',
    memo: '3ヶ月の勉強成果。リスニング改善。'
  },
  {
    id: '3',
    date: '2023-07-10',
    listeningScore: 420,
    readingScore: 385,
    totalScore: 805,
    testType: 'TOEIC L&R',
    memo: 'オンライン学習を取り入れた結果。'
  },
  {
    id: '4',
    date: '2023-10-05',
    listeningScore: 445,
    readingScore: 415,
    totalScore: 860,
    testType: 'TOEIC L&R',
    memo: '目標の800点を突破！'
  },
  {
    id: '5',
    date: '2024-01-12',
    listeningScore: 465,
    readingScore: 450,
    totalScore: 915,
    testType: 'TOEIC L&R',
    memo: '継続的な学習で900点台に。'
  },
  {
    id: '6',
    date: '2024-04-15',
    listeningScore: 480,
    readingScore: 470,
    totalScore: 950,
    testType: 'TOEIC L&R',
    memo: '目標の950点に到達！'
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
      listening: score.listeningScore,
      reading: score.readingScore,
      total: score.totalScore,
      formattedDate: formatDate(score.date)
    }));
};

// 統計情報を計算
export const calculateStatistics = (scores: TOEICScore[]): ScoreStatistics => {
  if (scores.length === 0) {
    return {
      averageTotal: 0,
      maxTotal: 0,
      minTotal: 0,
      latestScore: null,
      improvement: 0,
      testCount: 0
    };
  }

  const sortedScores = [...scores].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const totalScores = scores.map(s => s.totalScore);
  
  const averageTotal = Math.round(totalScores.reduce((sum, score) => sum + score, 0) / totalScores.length);
  const maxTotal = Math.max(...totalScores);
  const minTotal = Math.min(...totalScores);
  const latestScore = sortedScores[sortedScores.length - 1];
  const improvement = sortedScores.length > 1 ? 
    latestScore.totalScore - sortedScores[0].totalScore : 0;

  return {
    averageTotal,
    maxTotal,
    minTotal,
    latestScore,
    improvement,
    testCount: scores.length
  };
};

// フィルター適用
export const applyFilter = (scores: TOEICScore[], filter: ScoreFilter): TOEICScore[] => {
  return scores.filter(score => {
    // 日付範囲フィルター
    if (filter.startDate && score.date < filter.startDate) return false;
    if (filter.endDate && score.date > filter.endDate) return false;
    
    // テストタイプフィルター
    if (filter.testType && score.testType !== filter.testType) return false;
    
    // スコア範囲フィルター
    if (filter.minScore && score.totalScore < filter.minScore) return false;
    if (filter.maxScore && score.totalScore > filter.maxScore) return false;
    
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
  const firstScore = sortedScores[0].totalScore;
  const lastScore = sortedScores[sortedScores.length - 1].totalScore;
  
  return Math.round(((lastScore - firstScore) / firstScore) * 100);
}; 