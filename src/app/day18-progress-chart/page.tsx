'use client';

import { useState, useMemo } from 'react';
import { 
  ScoreLineChart, 
  ScoreBarChart, 
  StatisticsCard, 
  ChartControls 
} from './components';
import { ChartConfig } from './types';
import { 
  sampleTOEICScores, 
  convertToChartData, 
  calculateStatistics,
  getScoresByTimeRange
} from './utils/dataUtils';

export default function ProgressChartPage() {
  // チャート設定の状態管理
  const [chartConfig, setChartConfig] = useState<ChartConfig>({
    type: 'line',
    showListening: true,
    showReading: true,
    showTotal: true,
    timeRange: 'all'
  });

  // 時間範囲に基づいてフィルタリングされたデータ
  const filteredScores = useMemo(() => {
    return getScoresByTimeRange(sampleTOEICScores, chartConfig.timeRange);
  }, [chartConfig.timeRange]);

  // チャート用データに変換
  const chartData = useMemo(() => {
    return convertToChartData(filteredScores);
  }, [filteredScores]);

  // 統計情報を計算
  const statistics = useMemo(() => {
    return calculateStatistics(filteredScores);
  }, [filteredScores]);

  return (
    <div className="container mx-auto px-4 py-8 space-y-8"> {/* コンテナ, 中央配置, 横パディング4, 縦パディング8, 縦間隔8 */}
      {/* ページ説明 */}
      <div className="text-center mb-8"> {/* 中央揃え, 下マージン8 */}
        <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed"> {/* 大文字, グレー色, 最大幅, 中央配置, 行間広め */}
          TOEICスコアの推移をグラフで可視化することで、学習の効果を客観的に確認できます。
          グラフの種類や表示データを変更して、様々な角度から分析してみましょう。
        </p>
      </div>

      {/* 上段: 統計情報 */}
      <div className="w-full"> {/* 幅100% */}
        <StatisticsCard statistics={statistics} />
      </div>

      {/* 中段: チャート設定とグラフを横並び */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8"> {/* グリッド1列, lg以上で4列, 間隔8 */}
        {/* 左サイド: チャート設定 */}
        <div className="lg:col-span-1"> {/* lg以上で1列分 */}
          <ChartControls 
            config={chartConfig} 
            onConfigChange={setChartConfig} 
          />
        </div>

        {/* 右サイド: グラフ表示 */}
        <div className="lg:col-span-3 space-y-8"> {/* lg以上で3列分, 縦間隔8 */}
          {/* 条件付きグラフ表示 */}
          {chartConfig.type === 'line' && (
            <ScoreLineChart
              data={chartData}
              showListening={chartConfig.showListening}
              showReading={chartConfig.showReading}
              showTotal={chartConfig.showTotal}
            />
          )}
          
          {chartConfig.type === 'bar' && (
            <ScoreBarChart
              data={chartData}
              showListening={chartConfig.showListening}
              showReading={chartConfig.showReading}
              showTotal={chartConfig.showTotal}
            />
          )}

          {/* データ情報 */}
          <div className="bg-white p-6 rounded-xl shadow-lg"> {/* 白背景, パディング6, 角丸大, 影 */}
            <h3 className="text-xl font-semibold text-gray-800 mb-4">📋 データ詳細</h3> {/* 大文字, セミ太字, グレー文字, 下マージン4 */}
            <div className="space-y-3"> {/* 縦間隔3 */}
              <p className="text-sm text-gray-600"> {/* 小文字, グレー色 */}
                <strong>表示期間:</strong> {
                  chartConfig.timeRange === 'all' ? '全期間' :
                  chartConfig.timeRange === '1year' ? '過去1年' :
                  chartConfig.timeRange === '6months' ? '過去6ヶ月' :
                  '過去3ヶ月'
                }
              </p>
              <p className="text-sm text-gray-600"> {/* 小文字, グレー色 */}
                <strong>データ件数:</strong> {filteredScores.length}件
              </p>
              <p className="text-sm text-gray-600"> {/* 小文字, グレー色 */}
                <strong>表示範囲:</strong> {
                  filteredScores.length > 0 ? 
                  `${filteredScores[0].date} 〜 ${filteredScores[filteredScores.length - 1].date}` :
                  'データなし'
                }
              </p>
            </div>
          </div>

          {/* 学習ポイント */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-200"> {/* グラデーション背景, パディング6, 角丸大, ボーダー */}
            <h3 className="text-xl font-semibold text-blue-800 mb-4">💡 学習ポイント</h3> {/* 大文字, セミ太字, 青色, 下マージン4 */}
            <div className="space-y-4 text-sm text-blue-700"> {/* 縦間隔4, 小文字, 青色 */}
              <div>
                <h4 className="font-semibold mb-2">📊 Rechartsライブラリの活用</h4> {/* セミ太字, 下マージン2 */}
                <p>ReactでグラフやチャートをReactiveに表示するためのライブラリです。LineChart、BarChart、Tooltipなどのコンポーネントが提供されています。</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">🔄 データ変換とフィルタリング</h4> {/* セミ太字, 下マージン2 */}
                <p>生データをチャート表示用に変換し、時間範囲や条件に応じてフィルタリングする処理を学習しました。</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">📈 データ可視化の重要性</h4> {/* セミ太字, 下マージン2 */}
                <p>数値データをグラフ化することで、傾向や変化を直感的に理解できるようになります。</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">⚡ useMemoによる最適化</h4> {/* セミ太字, 下マージン2 */}
                <p>計算量の多いデータ変換処理をuseMemoでメモ化し、パフォーマンスを向上させています。</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 