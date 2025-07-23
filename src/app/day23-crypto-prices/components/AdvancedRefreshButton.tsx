'use client'

import { useState } from 'react'
import { CryptoData, fetchPopularCryptos } from '../utils/cryptoApi'

interface AdvancedRefreshButtonProps {
  onDataUpdate: (newData: CryptoData[]) => void
  className?: string
}

export default function AdvancedRefreshButton({ 
  onDataUpdate, 
  className = "" 
}: AdvancedRefreshButtonProps) {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [lastUpdate, setLastUpdate] = useState(new Date())
  const [error, setError] = useState<string | null>(null)

  const handleAdvancedRefresh = async () => {
    setIsRefreshing(true)
    setError(null)

    try {
      // Client Componentでのデータ取得
      const newData = await fetchPopularCryptos()
      
      // データを更新
      onDataUpdate(newData)
      setLastUpdate(new Date())
      
      // 成功フィードバック
      console.log('データ更新完了:', newData.length + '件')
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '不明なエラーが発生しました'
      setError(errorMessage)
      console.error('部分更新エラー:', err)
    } finally {
      setIsRefreshing(false)
    }
  }

  return (
    <div className={`${className}`}>
      {/* メインリフレッシュボタン */}
      <button
        onClick={handleAdvancedRefresh}
        disabled={isRefreshing}
        className={`
          inline-flex items-center px-4 py-2 
          bg-gradient-to-r from-emerald-500 to-teal-600 
          hover:from-emerald-600 hover:to-teal-700 
          disabled:from-gray-400 disabled:to-gray-500
          text-white font-medium rounded-lg 
          shadow-md hover:shadow-lg 
          transform hover:scale-105 
          transition-all duration-200 
          disabled:cursor-not-allowed disabled:transform-none
        `}
      >
        {/* リフレッシュアイコン */}
        <svg 
          className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" 
          />
        </svg>
        
        {isRefreshing ? '部分更新中...' : '部分更新'}
      </button>

      {/* 更新情報とエラー表示 */}
      <div className="mt-2 text-xs">
        {error ? (
          <div className="text-red-600 bg-red-50 rounded px-2 py-1">
            ⚠️ {error}
          </div>
        ) : (
          <div className="text-gray-500">
            🔄 最終部分更新: {lastUpdate.toLocaleTimeString('ja-JP')}
          </div>
        )}
      </div>
    </div>
  )
}

// 更新統計コンポーネント
export function UpdateStats({ 
  totalUpdates = 0, 
  lastFullUpdate, 
  lastPartialUpdate 
}: {
  totalUpdates?: number
  lastFullUpdate?: Date
  lastPartialUpdate?: Date
}) {
  return (
    <div className="bg-gray-50 rounded-lg p-3 text-sm">
      <h4 className="font-semibold text-gray-700 mb-2">📊 更新統計</h4>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
        <div>
          <span className="text-gray-500">総更新回数:</span>
          <span className="ml-1 font-bold text-blue-600">{totalUpdates}</span>
        </div>
        {lastFullUpdate && (
          <div>
            <span className="text-gray-500">最終フル更新:</span>
            <div className="text-green-600 font-medium">
              {lastFullUpdate.toLocaleTimeString('ja-JP')}
            </div>
          </div>
        )}
        {lastPartialUpdate && (
          <div>
            <span className="text-gray-500">最終部分更新:</span>
            <div className="text-purple-600 font-medium">
              {lastPartialUpdate.toLocaleTimeString('ja-JP')}
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 