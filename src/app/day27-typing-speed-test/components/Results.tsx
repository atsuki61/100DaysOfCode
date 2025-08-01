import { ResultsProps } from '../types';

export function Results({ results, onRestart }: ResultsProps) {
  const getWpmLevel = (wpm: number) => {
    if (wpm >= 80) return { level: 'エキスパート', color: 'text-purple-600', bg: 'bg-purple-100' };
    if (wpm >= 60) return { level: '上級者', color: 'text-green-600', bg: 'bg-green-100' };
    if (wpm >= 40) return { level: '中級者', color: 'text-blue-600', bg: 'bg-blue-100' };
    if (wpm >= 20) return { level: '初級者', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    return { level: '初心者', color: 'text-red-600', bg: 'bg-red-100' };
  };

  const getAccuracyLevel = (accuracy: number) => {
    if (accuracy >= 95) return { level: '優秀', color: 'text-green-600' };
    if (accuracy >= 85) return { level: '良好', color: 'text-blue-600' };
    if (accuracy >= 75) return { level: '普通', color: 'text-yellow-600' };
    return { level: '要改善', color: 'text-red-600' };
  };

  const wpmInfo = getWpmLevel(results.wpm);
  const accuracyInfo = getAccuracyLevel(results.accuracy);

  return (
    <div className="text-center space-y-6">
      <h2 className="text-3xl font-bold text-gray-800">テスト完了！</h2>
      
      {/* メイン結果 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* WPM */}
        <div className="bg-white p-6 rounded-lg shadow-md border">
          <div className="text-4xl font-bold text-blue-600 mb-2">
            {results.wpm}
          </div>
          <div className="text-lg font-semibold text-gray-700 mb-1">
            WPM
          </div>
          <div className={`text-sm font-medium ${wpmInfo.color} ${wpmInfo.bg} px-2 py-1 rounded-full inline-block`}>
            {wpmInfo.level}
          </div>
          <div className="text-xs text-gray-500 mt-2">
            1分間の単語数
          </div>
        </div>

        {/* 正確性 */}
        <div className="bg-white p-6 rounded-lg shadow-md border">
          <div className="text-4xl font-bold text-green-600 mb-2">
            {results.accuracy}%
          </div>
          <div className="text-lg font-semibold text-gray-700 mb-1">
            正確性
          </div>
          <div className={`text-sm font-medium ${accuracyInfo.color} bg-gray-100 px-2 py-1 rounded-full inline-block`}>
            {accuracyInfo.level}
          </div>
          <div className="text-xs text-gray-500 mt-2">
            正しく入力された文字の割合
          </div>
        </div>

        {/* 時間 */}
        <div className="bg-white p-6 rounded-lg shadow-md border">
          <div className="text-4xl font-bold text-purple-600 mb-2">
            {results.timeElapsed}s
          </div>
          <div className="text-lg font-semibold text-gray-700 mb-1">
            経過時間
          </div>
          <div className="text-sm text-gray-600">
            {results.timeElapsed >= 60 ? '制限時間到達' : '完了'}
          </div>
          <div className="text-xs text-gray-500 mt-2">
            テストにかかった時間
          </div>
        </div>
      </div>

      {/* 詳細統計 */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">詳細統計</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">総単語数:</span>
            <span className="font-semibold">{results.totalWords}語</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">正解単語数:</span>
            <span className="font-semibold">{results.correctWords}語</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">平均速度:</span>
            <span className="font-semibold">{Math.round(results.wpm * (results.accuracy / 100))} WPM</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">効率性:</span>
            <span className="font-semibold">{Math.round((results.wpm * results.accuracy) / 100)} ポイント</span>
          </div>
        </div>
      </div>

      {/* フィードバック */}
      <div className="bg-blue-50 p-4 rounded-lg">
        <h4 className="font-semibold text-blue-800 mb-2">フィードバック</h4>
        <div className="text-blue-700 text-sm space-y-1">
          {results.wpm >= 60 && results.accuracy >= 95 && (
            <p>素晴らしい結果です！あなたは優秀なタイピストです。</p>
          )}
          {results.wpm >= 40 && results.accuracy >= 85 && (
            <p>良い結果です。速度と正確性のバランスが取れています。</p>
          )}
          {results.accuracy < 75 && (
            <p>正確性を向上させることで、より良い結果が得られます。</p>
          )}
          {results.wpm < 30 && (
            <p>速度を向上させるために、定期的な練習をお勧めします。</p>
          )}
          <p>継続的な練習で、さらに上達できます！</p>
        </div>
      </div>

      {/* 再テストボタン */}
      <div className="pt-4">
        <button
          onClick={onRestart}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
        >
          再テスト
        </button>
      </div>
    </div>
  );
} 