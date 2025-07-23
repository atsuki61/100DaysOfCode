import { CryptoData, fetchPopularCryptos } from './utils/cryptoApi'
import CryptoCard from './components/CryptoCard'
import ErrorState from './components/ErrorState'
import RefreshButton, { LastUpdated } from './components/RefreshButton'

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
      {/* ヘッダー情報と更新ボタン */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full mb-6">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          データ取得成功 • {cryptoData.length}件の暗号通貨
        </div>
        
        {/* 更新ボタンと最終更新時刻 */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
          <RefreshButton />
          <LastUpdated />
        </div>
        
        {/* 自動更新の説明 */}
        <div className="text-sm text-gray-600 bg-blue-50 rounded-lg px-4 py-2 inline-block">
          💡 SSR: ページアクセス時に最新データを自動取得 | 手動更新も可能
        </div>
      </div>

      {/* 暗号通貨カードグリッド */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {cryptoData.map((crypto, index) => (
          <CryptoCard key={crypto.id} crypto={crypto} index={index} />
        ))}
      </div>

      {/* フッター情報 */}
      <div className="mt-12 bg-white rounded-xl shadow-lg p-6">
        <div className="text-center">
          <h3 className="text-lg font-bold text-gray-800 mb-3">📊 データ情報</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="font-semibold text-blue-800">データ更新時刻</div>
              <div className="text-blue-600">{new Date().toLocaleString('ja-JP')}</div>
            </div>
            <div className="bg-purple-50 rounded-lg p-4">
              <div className="font-semibold text-purple-800">データ提供</div>
              <div className="text-purple-600">CoinGecko API</div>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <div className="font-semibold text-green-800">更新間隔</div>
              <div className="text-green-600">60秒キャッシュ</div>
            </div>
          </div>
          <p className="text-gray-500 text-xs mt-4">
            ※ SSR (Server-Side Rendering) により、最新のデータがサーバー側で取得されています
          </p>
        </div>
      </div>
    </div>
  )
}

 