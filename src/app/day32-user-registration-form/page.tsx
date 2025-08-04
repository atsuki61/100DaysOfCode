import UserRegistrationForm from './components/UserRegistrationForm';

export default function UserRegistrationPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">

        {/* 学習ポイント */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-blue-900 mb-4">
            今日の学習ポイント
          </h2>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-800">
            <div>
              <h3 className="font-semibold mb-2">React Hook Form</h3>
              <ul className="space-y-1 list-disc list-inside">
                <li>フォーム状態の効率的な管理</li>
                <li>パフォーマンス最適化</li>
                <li>リアルタイムバリデーション</li>
                <li>エラーハンドリング</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Yupバリデーション</h3>
              <ul className="space-y-1 list-disc list-inside">
                <li>スキーマベースのバリデーション</li>
                <li>カスタムエラーメッセージ</li>
                <li>複雑なバリデーションルール</li>
                <li>型安全性の確保</li>
              </ul>
            </div>
          </div>
        </div>

        {/* フォームセクション */}
        <div className="flex justify-center">
          <UserRegistrationForm />
        </div>

        {/* 機能説明 */}
        <div className="mt-12 bg-gray-50 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            実装された機能
          </h2>
          <div className="grid md:grid-cols-3 gap-6 text-sm">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">✓ 入力バリデーション</h3>
              <ul className="space-y-1 text-gray-600">
                <li>• ユーザー名の形式チェック</li>
                <li>• メールアドレスの形式チェック</li>
                <li>• パスワード強度チェック</li>
                <li>• 年齢の範囲チェック</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">✓ リアルタイム検証</h3>
              <ul className="space-y-1 text-gray-600">
                <li>• 入力中の即座なバリデーション</li>
                <li>• パスワード要件の可視化</li>
                <li>• エラーメッセージの即座表示</li>
                <li>• フォーム状態の動的更新</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">✓ UX/UI改善</h3>
              <ul className="space-y-1 text-gray-600">
                <li>• エラー時の視覚的フィードバック</li>
                <li>• 送信状態の表示</li>
                <li>• 成功時の確認画面</li>
                <li>• レスポンシブデザイン</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 