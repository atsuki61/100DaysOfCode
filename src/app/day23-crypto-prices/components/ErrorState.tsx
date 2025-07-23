interface ErrorStateProps {
  error: string
}

export default function ErrorState({ error }: ErrorStateProps) {
  return (
    <div className="container mx-auto px-4 max-w-4xl">
      <div className="bg-white rounded-xl shadow-lg p-8 text-center">
        {/* エラーアイコン */}
        <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
          <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>

        {/* エラーメッセージ */}
        <h2 className="text-2xl font-bold text-gray-800 mb-4">データの取得に失敗しました</h2>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-700 text-sm">{error}</p>
        </div>

        {/* 対処法の提案 */}
        <div className="text-left bg-gray-50 rounded-lg p-6 mb-6">
          <h3 className="font-semibold text-gray-800 mb-3">🔧 対処法:</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              インターネット接続を確認してください
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              しばらく待ってからページを再読み込みしてください
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              CoinGecko APIが一時的に利用できない可能性があります
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              ブラウザのキャッシュをクリアしてみてください
            </li>
          </ul>
        </div>

        {/* リトライボタン */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            ページを再読み込み
          </button>
          
          <button
            onClick={() => window.history.back()}
            className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200 flex items-center justify-center"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            前のページに戻る
          </button>
        </div>

        {/* API情報 */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            データ提供: CoinGecko API • 
            <a 
              href="https://www.coingecko.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-600 ml-1"
            >
              詳細を見る
            </a>
          </p>
        </div>
      </div>
    </div>
  )
} 