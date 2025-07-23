import { CryptoData, fetchPopularCryptos } from './utils/cryptoApi'
import ErrorState from './components/ErrorState'
import RefreshButton, { LastUpdated } from './components/RefreshButton'
import CryptoDataWrapper from './components/CryptoDataWrapper'

// App Router用のServer Component（SSR）
export default async function CryptoPricesPage() {
  let cryptoData: CryptoData[] = []
  let error: string | undefined

  try {
    // Server Componentで直接APIを呼び出し（SSR）
    cryptoData = await fetchPopularCryptos()
  } catch (err) {
    console.error('暗号通貨データの取得に失敗しました:', err)
    error = 'データの取得に失敗しました。しばらく経ってから再試行してください。'
  }
  // エラー状態の表示
  if (error) {
    return <ErrorState error={error} />
  }

  // データが空の場合の表示
  if (!cryptoData || cryptoData.length === 0) {
    return (
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="mx-auto w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-6">
            <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">データが見つかりません</h2>
          <p className="text-gray-600 mb-6">現在、暗号通貨のデータを取得できませんでした。</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            再読み込み
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 max-w-6xl">
      {/* ヘッダー情報 */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full mb-4">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          データ取得成功 • {cryptoData.length}件の暗号通貨
        </div>
        
        {/* 簡潔な説明 */}
        <div className="text-sm text-gray-600 bg-blue-50 rounded-lg px-4 py-2 inline-block">
          💡 SSR: ページアクセス時に最新データを自動取得
        </div>
      </div>

      {/* 統一された更新機能カード */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-8">
        <div className="flex items-center justify-center mb-6">
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
            🔄 データ更新センター
          </div>
        </div>
        
        {/* メイン更新ボタンエリア */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 mb-6">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <RefreshButton />
            <LastUpdated />
          </div>
        </div>
        
        {/* 更新方式の説明 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="flex items-center bg-blue-50 rounded-lg p-3 border border-blue-200">
            <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm font-bold">
              🔄
            </div>
            <div>
              <div className="font-semibold text-blue-800 text-sm">フル更新</div>
              <div className="text-blue-600 text-xs">ページ全体をリロード</div>
            </div>
          </div>
          
          <div className="flex items-center bg-emerald-50 rounded-lg p-3 border border-emerald-200">
            <div className="bg-emerald-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm font-bold">
              ⚡
            </div>
            <div>
              <div className="font-semibold text-emerald-800 text-sm">部分更新</div>
              <div className="text-emerald-600 text-xs">データのみを更新</div>
            </div>
          </div>
        </div>
        
        {/* 使い方のヒント */}
        <div className="mt-4 bg-gray-50 rounded-lg p-3 text-center">
          <p className="text-xs text-gray-600">
            💡 <span className="font-semibold">フル更新</span>: 確実な最新データ取得 | 
            <span className="font-semibold">部分更新</span>: 下のエリアで利用可能
          </p>
        </div>
      </div>

      {/* 暗号通貨データエリア（部分更新機能付き） */}
      <CryptoDataWrapper initialData={cryptoData} />

      {/* フッター情報 */}
      <div className="mt-12 bg-white rounded-xl shadow-lg p-6 text-center">
        <h3 className="text-lg font-bold text-gray-800 mb-4">📊 データ情報</h3>
        <div className="flex flex-wrap justify-center gap-4 text-sm">
          <span className="bg-blue-50 text-blue-800 px-3 py-1 rounded-full">
            📡 CoinGecko API
          </span>
          <span className="bg-green-50 text-green-800 px-3 py-1 rounded-full">
            ⚡ 60秒キャッシュ
          </span>
          <span className="bg-purple-50 text-purple-800 px-3 py-1 rounded-full">
            🔄 SSR対応
          </span>
        </div>
      </div>
    </div>
  )
}

 