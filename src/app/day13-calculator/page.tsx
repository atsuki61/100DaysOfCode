import Calculator from './components/Calculator';

export default function Day13Page() {
  return (
    <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8 pb-24 sm:pb-28"> {/* コンテナ, 中央寄せ, レスポンシブパディング, 下パディング大 */}
      <div className="max-w-4xl mx-auto"> {/* 最大横幅4xl, 中央寄せ */}
        {/* 電卓コンポーネント */}
        <div className="flex justify-center mb-6 sm:mb-8 px-2 sm:px-4"> {/* フレックス, 中央寄せ, 下マージン, レスポンシブパディング */}
          <div className="w-full max-w-xs sm:max-w-sm md:max-w-md"> {/* 横幅フル, レスポンシブ最大横幅 */}
            <Calculator />
          </div>
        </div>

        {/* 電卓の説明 */}
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md mb-6 sm:mb-8"> {/* 白背景, レスポンシブパディング, 角丸, 影, 下マージン */}
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">🧮 電卓の使い方</h2> {/* レスポンシブ文字サイズ, 太字, グレー文字, 下マージン4 */}
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6"> {/* グリッド, md以上で2列, レスポンシブ間隔 */}
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-2">基本操作</h3> {/* レスポンシブ文字サイズ, セミ太字, グレー文字, 下マージン2 */}
              <ul className="text-sm sm:text-base text-gray-600 space-y-1"> {/* レスポンシブ文字サイズ, グレー文字, 縦間隔1 */}
                <li>• 数字ボタン（0-9）: 数値入力</li>
                <li>• 演算子（+, -, *, /）: 四則演算</li>
                <li>• 小数点（.）: 小数入力</li>
                <li>• イコール（=）: 計算実行</li>
                <li>• クリア（C）: 全体リセット</li>
              </ul>
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-2">機能</h3> {/* レスポンシブ文字サイズ, セミ太字, グレー文字, 下マージン2 */}
              <ul className="text-sm sm:text-base text-gray-600 space-y-1"> {/* レスポンシブ文字サイズ, グレー文字, 縦間隔1 */}
                <li>• ✅ 連続計算対応</li>
                <li>• ✅ 小数点計算対応</li>
                <li>• ✅ ０除算エラー処理</li>
                <li>• ✅ レスポンシブデザイン</li>
                <li>• ✅ ホバーエフェクト</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 技術ポイント */}
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md"> {/* 白背景, レスポンシブパディング, 角丸, 影 */}
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">💡 今日の学習ポイント</h2> {/* レスポンシブ文字サイズ, 太字, グレー文字, 下マージン4 */}
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6"> {/* グリッド, md以上で2列, レスポンシブ間隔 */}
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-blue-600 mb-2">状態管理</h3> {/* レスポンシブ文字サイズ, セミ太字, 青文字, 下マージン2 */}
              <ul className="text-sm sm:text-base text-gray-600 space-y-1"> {/* レスポンシブ文字サイズ, グレー文字, 縦間隔1 */}
                <li>• 複数のuseStateによる状態管理</li>
                <li>• 計算状態の管理（display, previousValue, operation, waitingForNewValue）</li>
                <li>• useCallbackによるパフォーマンス最適化</li>
              </ul>
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-green-600 mb-2">UI制御</h3> {/* レスポンシブ文字サイズ, セミ太字, 緑文字, 下マージン2 */}
              <ul className="text-sm sm:text-base text-gray-600 space-y-1"> {/* レスポンシブ文字サイズ, グレー文字, 縦間隔1 */}
                <li>• ボタンクリックイベントの詳細制御</li>
                <li>• 条件分岐による計算ロジック</li>
                <li>• TypeScriptによる型安全性</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 