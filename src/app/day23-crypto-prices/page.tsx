import { GetServerSideProps } from 'next'

// 暗号通貨データの型定義
interface CryptoData {
  id: string
  name: string
  symbol: string
  current_price: number
  price_change_percentage_24h: number
  market_cap: number
  image: string
}

interface CryptoPricesPageProps {
  cryptoData: CryptoData[]
  error?: string
}

export default function CryptoPricesPage({ cryptoData, error }: CryptoPricesPageProps) {
  if (error) {
    return (
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <h2 className="font-bold">エラーが発生しました</h2>
          <p>{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 max-w-6xl">
      {/* レスポンシブグリッドレイアウト */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {cryptoData?.map((crypto) => (
          <div
            key={crypto.id}
            className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
          >
            {/* 暗号通貨ヘッダー情報 */}
            <div className="flex items-center mb-4">
              <img
                src={crypto.image}
                alt={crypto.name}
                className="w-10 h-10 mr-3"
              />
              <div>
                <h3 className="text-lg font-bold text-gray-800">{crypto.name}</h3>
                <p className="text-sm text-gray-500 uppercase">{crypto.symbol}</p>
              </div>
            </div>

            {/* 価格情報 */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">現在価格:</span>
                <span className="text-xl font-bold text-blue-600">
                  ${crypto.current_price.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-600">24h変動:</span>
                <span
                  className={`font-semibold ${
                    crypto.price_change_percentage_24h >= 0
                      ? 'text-green-600'
                      : 'text-red-600'
                  }`}
                >
                  {crypto.price_change_percentage_24h >= 0 ? '+' : ''}
                  {crypto.price_change_percentage_24h.toFixed(2)}%
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-600">時価総額:</span>
                <span className="text-sm text-gray-800">
                  ${(crypto.market_cap / 1e9).toFixed(2)}B
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* データ更新時刻表示 */}
      <div className="mt-8 text-center text-gray-500 text-sm">
        <p>データ更新時刻: {new Date().toLocaleString('ja-JP')}</p>
        <p>※ページをリロードすると最新データを取得します</p>
      </div>
    </div>
  )
}

// Next.js SSR実装 - この部分は次のステップで実装予定
export const getServerSideProps: GetServerSideProps = async () => {
  // TODO: CoinGecko APIから暗号通貨データを取得
  return {
    props: {
      cryptoData: [], // 仮の空配列
    },
  }
} 