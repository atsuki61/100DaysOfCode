'use client';

import { ScoreStatistics } from '../types';

interface StatisticsCardProps {
  statistics: ScoreStatistics;
}

export default function StatisticsCard({ statistics }: StatisticsCardProps) {
  const {
    latestScore,
    maxScore,
    minScore,
    averageTotal,
    averageListening,
    averageReading,
    improvement,
    testCount
  } = statistics;

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg"> {/* 白背景, パディング6, 角丸大, 影 */}
      <h3 className="text-xl font-semibold text-gray-800 mb-6">📈 統計情報</h3> {/* 大文字, セミ太字, グレー文字, 下マージン6 */}
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4"> {/* グリッド2列, md以上で3列, 間隔4 */}
        {/* 最新スコア */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg"> {/* グラデーション青背景, パディング4, 角丸 */}
          <div className="text-2xl font-bold text-blue-600 mb-1"> {/* 大文字, 太字, 青色, 下マージン1 */}
            {latestScore?.total || 0}
          </div>
          <div className="text-sm text-blue-700">最新スコア</div> {/* 小文字, 青色 */}
          {latestScore && (
            <div className="text-xs text-blue-600 mt-1"> {/* 極小文字, 青色, 上マージン1 */}
              {latestScore.date}
            </div>
          )}
        </div>

        {/* 最高スコア */}
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg"> {/* グラデーション緑背景, パディング4, 角丸 */}
          <div className="text-2xl font-bold text-green-600 mb-1">{maxScore?.total || 0}</div> {/* 大文字, 太字, 緑色, 下マージン1 */}
          <div className="text-sm text-green-700">最高スコア</div> {/* 小文字, 緑色 */}
          {maxScore && (
            <div className="text-xs text-green-600 mt-1"> {/* 極小文字, 緑色, 上マージン1 */}
              {maxScore.date}
            </div>
          )}
        </div>

        {/* 平均スコア */}
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg"> {/* グラデーション紫背景, パディング4, 角丸 */}
          <div className="text-2xl font-bold text-purple-600 mb-1">{averageTotal}</div> {/* 大文字, 太字, 紫色, 下マージン1 */}
          <div className="text-sm text-purple-700">平均スコア</div> {/* 小文字, 紫色 */}
        </div>

        {/* 最低スコア */}
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-lg"> {/* グラデーションオレンジ背景, パディング4, 角丸 */}
          <div className="text-2xl font-bold text-orange-600 mb-1">{minScore?.total || 0}</div> {/* 大文字, 太字, オレンジ色, 下マージン1 */}
          <div className="text-sm text-orange-700">最低スコア</div> {/* 小文字, オレンジ色 */}
          {minScore && (
            <div className="text-xs text-orange-600 mt-1"> {/* 極小文字, オレンジ色, 上マージン1 */}
              {minScore.date}
            </div>
          )}
        </div>

        {/* 改善度 */}
        <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-4 rounded-lg"> {/* グラデーションピンク背景, パディング4, 角丸 */}
          <div className={`text-2xl font-bold mb-1 ${improvement >= 0 ? 'text-pink-600' : 'text-red-600'}`}> {/* 大文字, 太字, 条件付き色, 下マージン1 */}
            {improvement >= 0 ? '+' : ''}{improvement}
          </div>
          <div className="text-sm text-pink-700">改善度</div> {/* 小文字, ピンク色 */}
        </div>

        {/* 受験回数 */}
        <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-4 rounded-lg"> {/* グラデーションインディゴ背景, パディング4, 角丸 */}
          <div className="text-2xl font-bold text-indigo-600 mb-1">{testCount}</div> {/* 大文字, 太字, インディゴ色, 下マージン1 */}
          <div className="text-sm text-indigo-700">受験回数</div> {/* 小文字, インディゴ色 */}
        </div>
      </div>

      {/* 詳細情報 */}
      {latestScore && (
        <div className="mt-6 pt-6 border-t border-gray-200"> {/* 上マージン6, 上パディング6, 上ボーダー, グレーボーダー */}
          <h4 className="text-lg font-semibold text-gray-800 mb-3">📋 最新受験詳細</h4> {/* 大文字, セミ太字, グレー文字, 下マージン3 */}
          <div className="grid grid-cols-2 gap-4"> {/* グリッド2列, 間隔4 */}
            <div>
              <span className="text-sm text-gray-600">リスニング:</span> {/* 小文字, グレー色 */}
              <span className="ml-2 font-semibold text-blue-600">{latestScore.listening}点</span> {/* 左マージン2, セミ太字, 青色 */}
            </div>
            <div>
              <span className="text-sm text-gray-600">リーディング:</span> {/* 小文字, グレー色 */}
              <span className="ml-2 font-semibold text-green-600">{latestScore.reading}点</span> {/* 左マージン2, セミ太字, 緑色 */}
            </div>
          </div>
          
          {/* 平均値情報も表示 */}
          <div className="mt-4"> {/* 上マージン4 */}
            <h5 className="text-md font-medium text-gray-700 mb-2">📊 全体平均</h5> {/* 中文字, 中太字, グレー色, 下マージン2 */}
            <div className="grid grid-cols-3 gap-4 text-sm"> {/* グリッド3列, 間隔4, 小文字 */}
              <div className="text-center"> {/* 中央揃え */}
                <div className="font-semibold text-purple-600">{averageTotal}点</div> {/* セミ太字, 紫色 */}
                <div className="text-gray-500">総合平均</div> {/* グレー色 */}
              </div>
              <div className="text-center"> {/* 中央揃え */}
                <div className="font-semibold text-blue-600">{averageListening}点</div> {/* セミ太字, 青色 */}
                <div className="text-gray-500">L平均</div> {/* グレー色 */}
              </div>
              <div className="text-center"> {/* 中央揃え */}
                <div className="font-semibold text-green-600">{averageReading}点</div> {/* セミ太字, 緑色 */}
                <div className="text-gray-500">R平均</div> {/* グレー色 */}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 