'use client'

import { useState } from 'react'
import { CryptoData } from '../utils/cryptoApi'
import CryptoCard from './CryptoCard'
import AdvancedRefreshButton, { UpdateStats } from './AdvancedRefreshButton'

interface CryptoDataWrapperProps {
  initialData: CryptoData[]
}

export default function CryptoDataWrapper({ initialData }: CryptoDataWrapperProps) {
  const [cryptoData, setCryptoData] = useState<CryptoData[]>(initialData)
  const [updateCount, setUpdateCount] = useState(0)
  const [lastPartialUpdate, setLastPartialUpdate] = useState<Date | undefined>()
  const [isUpdating, setIsUpdating] = useState(false)

  // データ更新ハンドラー
  const handleDataUpdate = (newData: CryptoData[]) => {
    setIsUpdating(true)
    
    // アニメーション効果のために少し遅延
    setTimeout(() => {
      setCryptoData(newData)
      setUpdateCount(prev => prev + 1)
      setLastPartialUpdate(new Date())
      setIsUpdating(false)
    }, 300)
  }

  return (
    <div>
      {/* 部分更新コントロール */}
      <div className="mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <AdvancedRefreshButton 
            onDataUpdate={handleDataUpdate}
          />
          
          {/* 更新中のインジケーター */}
          {isUpdating && (
            <div className="flex items-center text-sm text-blue-600">
              <svg className="animate-spin w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              データ更新中...
            </div>
          )}
        </div>

        {/* 更新統計 */}
        <UpdateStats 
          totalUpdates={updateCount}
          lastPartialUpdate={lastPartialUpdate}
        />
      </div>

      {/* 暗号通貨カードグリッド（アニメーション付き） */}
      <div 
        className={`grid gap-6 md:grid-cols-2 lg:grid-cols-3 transition-all duration-300 ${
          isUpdating ? 'opacity-75 scale-95' : 'opacity-100 scale-100'
        }`}
      >
        {cryptoData.map((crypto, index) => (
          <div
            key={crypto.id}
            className={`transition-all duration-500 ${
              isUpdating ? 'blur-sm' : 'blur-none'
            }`}
            style={{
              animationDelay: `${index * 50}ms`,
            }}
          >
            <CryptoCard crypto={crypto} index={index} />
          </div>
        ))}
      </div>

      {/* データ比較情報 */}
      {updateCount > 0 && (
        <div className="mt-8 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            🔄 更新履歴
          </h3>
          <div className="text-sm text-gray-600">
            <p>✅ これまでに <span className="font-bold text-purple-600">{updateCount}回</span> の部分更新を実行</p>
            {lastPartialUpdate && (
              <p>⏰ 最終更新: {lastPartialUpdate.toLocaleString('ja-JP')}</p>
            )}
            <p>💡 ヒント: 部分更新はページをリロードせずに最新データを取得します</p>
          </div>
        </div>
      )}
    </div>
  )
} 