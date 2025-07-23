import { CryptoData } from '../utils/cryptoApi'

interface CryptoCardProps {
  crypto: CryptoData
  index: number
}

export default function CryptoCard({ crypto, index }: CryptoCardProps) {
  const isPositiveChange = crypto.price_change_percentage_24h >= 0
  
  return (
    <div
      className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-gray-100"
      style={{
        animationDelay: `${index * 100}ms`,
        animation: 'fadeInUp 0.6s ease-out forwards'
      }}
    >
      {/* ランキングバッジ */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center">
          <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-bold px-3 py-1 rounded-full">
            #{crypto.market_cap_rank}
          </span>
        </div>
        
        {/* 24時間変動率バッジ */}
        <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
          isPositiveChange 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
        }`}>
          {isPositiveChange ? '↗' : '↘'} {Math.abs(crypto.price_change_percentage_24h).toFixed(2)}%
        </div>
      </div>

      {/* 暗号通貨ヘッダー情報 */}
      <div className="flex items-center mb-6">
        <div className="relative">
          <img
            src={crypto.image}
            alt={crypto.name}
            className="w-14 h-14 rounded-full border-4 border-gray-100 shadow-md"
          />
          {/* グロー効果 */}
          <div className="absolute inset-0 w-14 h-14 rounded-full bg-gradient-to-r from-blue-400/20 to-purple-400/20 animate-pulse"></div>
        </div>
        <div className="ml-4">
          <h3 className="text-xl font-bold text-gray-800 mb-1">{crypto.name}</h3>
          <p className="text-sm text-gray-500 uppercase font-medium tracking-wide">{crypto.symbol}</p>
        </div>
      </div>

      {/* 現在価格（大きく表示） */}
      <div className="mb-6 text-center">
        <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          ${crypto.current_price.toLocaleString('en-US', {
            minimumFractionDigits: crypto.current_price < 1 ? 4 : 2,
            maximumFractionDigits: crypto.current_price < 1 ? 6 : 2
          })}
        </div>
        <div className={`text-lg font-semibold mt-2 ${
          isPositiveChange ? 'text-green-600' : 'text-red-600'
        }`}>
          {isPositiveChange ? '+' : ''}${crypto.price_change_24h.toFixed(2)} (24h)
        </div>
      </div>

      {/* 詳細情報グリッド */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="text-xs text-gray-500 font-medium mb-1">時価総額</div>
          <div className="text-sm font-bold text-gray-800">
            ${(crypto.market_cap / 1e9).toFixed(2)}B
          </div>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="text-xs text-gray-500 font-medium mb-1">24h出来高</div>
          <div className="text-sm font-bold text-gray-800">
            ${(crypto.total_volume / 1e9).toFixed(2)}B
          </div>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="text-xs text-gray-500 font-medium mb-1">24h高値</div>
          <div className="text-sm font-bold text-gray-800">
            ${crypto.high_24h.toLocaleString()}
          </div>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="text-xs text-gray-500 font-medium mb-1">24h安値</div>
          <div className="text-sm font-bold text-gray-800">
            ${crypto.low_24h.toLocaleString()}
          </div>
        </div>
      </div>

      {/* 供給量情報 */}
      {crypto.circulating_supply && (
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-3 mb-4">
          <div className="text-xs text-gray-500 font-medium mb-2">流通供給量</div>
          <div className="text-sm font-bold text-gray-800">
            {crypto.circulating_supply.toLocaleString()} {crypto.symbol.toUpperCase()}
          </div>
          {crypto.max_supply && (
            <div className="text-xs text-gray-500 mt-1">
              最大供給量: {crypto.max_supply.toLocaleString()}
            </div>
          )}
        </div>
      )}

      {/* 過去最高値情報 */}
      <div className="border-t border-gray-100 pt-4">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-500">過去最高値:</span>
          <div className="text-right">
            <div className="font-bold text-gray-800">${crypto.ath.toLocaleString()}</div>
            <div className={`text-xs ${crypto.ath_change_percentage < 0 ? 'text-red-500' : 'text-green-500'}`}>
              {crypto.ath_change_percentage.toFixed(1)}%
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 