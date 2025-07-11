'use client';

import { ChartConfig, ChartType } from '../types';

interface ChartControlsProps {
  config: ChartConfig;
  onConfigChange: (newConfig: ChartConfig) => void;
}

export default function ChartControls({ config, onConfigChange }: ChartControlsProps) {
  const handleChartTypeChange = (type: ChartType) => {
    onConfigChange({ ...config, type });
  };

  const handleToggleDataSeries = (series: keyof Pick<ChartConfig, 'showListening' | 'showReading' | 'showTotal'>) => {
    onConfigChange({ ...config, [series]: !config[series] });
  };

  const handleTimeRangeChange = (timeRange: ChartConfig['timeRange']) => {
    onConfigChange({ ...config, timeRange });
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg"> {/* 白背景, パディング6, 角丸大, 影 */}
      <h3 className="text-xl font-semibold text-gray-800 mb-6">⚙️ チャート設定</h3> {/* 大文字, セミ太字, グレー文字, 下マージン6 */}
      
      {/* チャートタイプ選択 */}
      <div className="mb-6"> {/* 下マージン6 */}
        <label className="block text-sm font-medium text-gray-700 mb-3">📊 グラフの種類</label> {/* ブロック, 小文字, 中太字, グレー文字, 下マージン3 */}
        <div className="flex flex-wrap gap-2"> {/* フレックス, 折り返し, 間隔2 */}
          <button
            onClick={() => handleChartTypeChange('line')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              config.type === 'line'
                ? 'bg-blue-500 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`} // パディング, 角丸, 中太字, トランジション, 条件付きスタイル
          >
            📈 折れ線
          </button>
          <button
            onClick={() => handleChartTypeChange('bar')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              config.type === 'bar'
                ? 'bg-blue-500 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`} // パディング, 角丸, 中太字, トランジション, 条件付きスタイル
          >
            📊 棒グラフ
          </button>
        </div>
      </div>

      {/* データ系列表示設定 */}
      <div className="mb-6"> {/* 下マージン6 */}
        <label className="block text-sm font-medium text-gray-700 mb-3">👁️ 表示データ</label> {/* ブロック, 小文字, 中太字, グレー文字, 下マージン3 */}
        <div className="space-y-3"> {/* 縦間隔3 */}
          <label className="flex items-center cursor-pointer"> {/* フレックス, アイテム中央, カーソルポインター */}
            <input
              type="checkbox"
              checked={config.showTotal}
              onChange={() => handleToggleDataSeries('showTotal')}
              className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 focus:ring-2" // サイズ, 色設定
            />
            <span className="ml-3 text-sm text-gray-700">🟣 総合スコア</span> {/* 左マージン3, 小文字, グレー色 */}
          </label>
          
          <label className="flex items-center cursor-pointer"> {/* フレックス, アイテム中央, カーソルポインター */}
            <input
              type="checkbox"
              checked={config.showListening}
              onChange={() => handleToggleDataSeries('showListening')}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" // サイズ, 色設定
            />
            <span className="ml-3 text-sm text-gray-700">🔵 リスニング</span> {/* 左マージン3, 小文字, グレー色 */}
          </label>
          
          <label className="flex items-center cursor-pointer"> {/* フレックス, アイテム中央, カーソルポインター */}
            <input
              type="checkbox"
              checked={config.showReading}
              onChange={() => handleToggleDataSeries('showReading')}
              className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2" // サイズ, 色設定
            />
            <span className="ml-3 text-sm text-gray-700">🟢 リーディング</span> {/* 左マージン3, 小文字, グレー色 */}
          </label>
        </div>
      </div>

      {/* 時間範囲設定 */}
      <div className="mb-6"> {/* 下マージン6 */}
        <label className="block text-sm font-medium text-gray-700 mb-3">📅 表示期間</label> {/* ブロック, 小文字, 中太字, グレー文字, 下マージン3 */}
        <select
          value={config.timeRange}
          onChange={(e) => handleTimeRangeChange(e.target.value as ChartConfig['timeRange'])}
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" // 幅100%, パディング, ボーダー, フォーカス設定
        >
          <option value="all">全期間</option>
          <option value="1year">過去1年</option>
          <option value="6months">過去6ヶ月</option>
          <option value="3months">過去3ヶ月</option>
        </select>
      </div>

      {/* その他の設定 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">🔧 その他設定</label> {/* ブロック, 小文字, 中太字, グレー文字, 下マージン3 */}
        <label className="flex items-center cursor-pointer"> {/* フレックス, アイテム中央, カーソルポインター */}
          <input
            type="checkbox"
            checked={config.showDataLabels}
            onChange={() => onConfigChange({ ...config, showDataLabels: !config.showDataLabels })}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" // サイズ, 色設定
          />
          <span className="ml-3 text-sm text-gray-700">🏷️ データラベル表示</span> {/* 左マージン3, 小文字, グレー色 */}
        </label>
      </div>
    </div>
  );
} 