export default function LoadingState() {
  return (
    <div className="container mx-auto px-4 max-w-6xl">
      {/* ローディングヘッダー */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full">
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          暗号通貨データを取得中...
        </div>
      </div>

      {/* スケルトンローディング */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(9)].map((_, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg p-6 animate-pulse">
            {/* ヘッダー部分のスケルトン */}
            <div className="flex justify-between items-start mb-4">
              <div className="h-6 w-12 bg-gray-300 rounded-full"></div>
              <div className="h-6 w-16 bg-gray-300 rounded-full"></div>
            </div>

            {/* アイコンと名前のスケルトン */}
            <div className="flex items-center mb-6">
              <div className="w-14 h-14 bg-gray-300 rounded-full"></div>
              <div className="ml-4">
                <div className="h-5 w-24 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 w-12 bg-gray-300 rounded"></div>
              </div>
            </div>

            {/* 価格のスケルトン */}
            <div className="text-center mb-6">
              <div className="h-8 w-32 bg-gray-300 rounded mx-auto mb-2"></div>
              <div className="h-5 w-24 bg-gray-300 rounded mx-auto"></div>
            </div>

            {/* 詳細情報のスケルトン */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              {[...Array(4)].map((_, idx) => (
                <div key={idx} className="bg-gray-50 rounded-lg p-3">
                  <div className="h-3 w-16 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 w-20 bg-gray-300 rounded"></div>
                </div>
              ))}
            </div>

            {/* 供給量のスケルトン */}
            <div className="bg-gray-50 rounded-lg p-3 mb-4">
              <div className="h-3 w-20 bg-gray-300 rounded mb-2"></div>
              <div className="h-4 w-32 bg-gray-300 rounded"></div>
            </div>

            {/* フッターのスケルトン */}
            <div className="border-t border-gray-100 pt-4">
              <div className="flex justify-between items-center">
                <div className="h-4 w-16 bg-gray-300 rounded"></div>
                <div className="text-right">
                  <div className="h-4 w-20 bg-gray-300 rounded mb-1"></div>
                  <div className="h-3 w-12 bg-gray-300 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ローディングメッセージ */}
      <div className="mt-8 text-center text-gray-500 text-sm">
        <p>最新の暗号通貨価格データを取得しています...</p>
        <p className="mt-1">CoinGecko APIに接続中</p>
      </div>
    </div>
  )
} 