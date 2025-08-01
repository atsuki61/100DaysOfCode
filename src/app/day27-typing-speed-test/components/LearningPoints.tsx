export function LearningPoints() {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        今日の学習ポイント
      </h2>
      
      <div className="space-y-6">
        {/* キー入力イベント処理 */}
        <div className="border-l-4 border-blue-500 pl-4">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            キー入力イベント処理
          </h3>
          <p className="text-gray-600 mb-2">
            テキストエリアの<code className="bg-gray-100 px-1 rounded">onChange</code>イベントを使って、ユーザーの入力をリアルタイムで検知しました。
          </p>
          <p className="text-gray-600">
            これは料理人が包丁の動きを感じ取るように、キーボードの一文字一文字の入力を正確に捉える技術です。
          </p>
        </div>

        {/* タイマー処理 */}
        <div className="border-l-4 border-green-500 pl-4">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            タイマー処理（useEffect）
          </h3>
          <p className="text-gray-600 mb-2">
            <code className="bg-gray-100 px-1 rounded">useEffect</code>と<code className="bg-gray-100 px-1 rounded">setInterval</code>を使って、0.1秒ごとに時間を更新しました。
          </p>
          <p className="text-gray-600">
            これは時計の秒針が刻一刻と進むように、正確な時間管理を実現する技術です。
          </p>
        </div>

        {/* 速度と正確さの計算 */}
        <div className="border-l-4 border-purple-500 pl-4">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            速度と正確さの計算
          </h3>
          <p className="text-gray-600 mb-2">
            WPM（Words Per Minute）と正確性を計算するロジックを実装しました。
          </p>
          <p className="text-gray-600">
            これは料理の味と見た目を評価するように、タイピングの「速さ」と「正確さ」を数値化する技術です。
          </p>
        </div>

        {/* 入力テキストと課題テキストの比較 */}
        <div className="border-l-4 border-orange-500 pl-4">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            入力テキストと課題テキストの比較
          </h3>
          <p className="text-gray-600 mb-2">
            文字レベルで入力内容と正解を比較し、リアルタイムで色分け表示しました。
          </p>
          <p className="text-gray-600">
            これは校正者が原稿と清書を照合するように、一文字ずつ正確に比較する技術です。
          </p>
        </div>

        {/* 状態管理 */}
        <div className="border-l-4 border-red-500 pl-4">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            複雑な状態管理
          </h3>
          <p className="text-gray-600 mb-2">
            テストの進行状況、タイマー、入力内容、結果など、複数の状態を適切に管理しました。
          </p>
          <p className="text-gray-600">
            これは指揮者がオーケストラの各楽器の状態を把握するように、アプリ全体の状態を統合管理する技術です。
          </p>
        </div>

        {/* 実用的な機能 */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">
            実用的な機能
          </h3>
          <ul className="text-blue-700 space-y-1 text-sm">
            <li>• リアルタイムの進捗表示</li>
            <li>• 文字単位での正誤判定</li>
            <li>• 詳細な統計情報</li>
            <li>• レベル別の評価システム</li>
            <li>• パーソナライズされたフィードバック</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 