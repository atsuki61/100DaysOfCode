import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import PageHeader from '@/components/common/PageHeader';
import Calculator from './components/Calculator';

export default function Day13Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      <Header title="Day 13: 電卓アプリ" />
      
      <main className="flex-1 container mx-auto px-4 py-8 pt-24 pb-28">
        <PageHeader
          icon="🧮"
          title="電卓アプリ"
          description="四則演算ができるシンプルな電卓"
        />
        
        <div className="max-w-2xl mx-auto">
          {/* 電卓の説明 */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">🧮 電卓の使い方</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">基本操作</h3>
                <ul className="text-gray-600 space-y-1">
                  <li>• 数字ボタン（0-9）: 数値入力</li>
                  <li>• 演算子（+, -, *, /）: 四則演算</li>
                  <li>• 小数点（.）: 小数入力</li>
                  <li>• イコール（=）: 計算実行</li>
                  <li>• クリア（C）: 全体リセット</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">機能</h3>
                <ul className="text-gray-600 space-y-1">
                  <li>• ✅ 連続計算対応</li>
                  <li>• ✅ 小数点計算対応</li>
                  <li>• ✅ ０除算エラー処理</li>
                  <li>• ✅ レスポンシブデザイン</li>
                  <li>• ✅ ホバーエフェクト</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 電卓コンポーネント */}
          <div className="flex justify-center mb-8">
            <Calculator />
          </div>

          {/* 技術ポイント */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">💡 今日の学習ポイント</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-blue-600 mb-2">状態管理</h3>
                <ul className="text-gray-600 space-y-1 text-sm">
                  <li>• 複数のuseStateによる状態管理</li>
                  <li>• 計算状態の管理（display, previousValue, operation, waitingForNewValue）</li>
                  <li>• useCallbackによるパフォーマンス最適化</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-green-600 mb-2">UI制御</h3>
                <ul className="text-gray-600 space-y-1 text-sm">
                  <li>• ボタンクリックイベントの詳細制御</li>
                  <li>• 条件分岐による計算ロジック</li>
                  <li>• TypeScriptによる型安全性</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer currentDay={13} />
    </div>
  );
} 