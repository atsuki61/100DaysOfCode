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
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null)
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
            🔄 最終部分更新: {lastUpdate ? lastUpdate.toLocaleTimeString('ja-JP') : '未実行'}
          </div>
        )}
      </div>
    </div>
  )
}

// 更新統計コンポーネント
export function UpdateStats({ 
  totalUpdates = 0, 
  lastPartialUpdate 
}: {
  totalUpdates?: number
  lastPartialUpdate?: Date
}) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-3 text-sm shadow-sm">
      <div className="flex items-center mb-2">
        <div className="bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 text-xs">
          📊
        </div>
        <h4 className="font-semibold text-gray-700 text-xs">更新統計</h4>
      </div>
      <div className="space-y-1 text-xs">
        <div className="flex justify-between items-center">
          <span className="text-gray-500">部分更新回数:</span>
          <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
            {totalUpdates}回
          </span>
        </div>
        {lastPartialUpdate && (
          <div className="flex justify-between items-center">
            <span className="text-gray-500">最終更新:</span>
            <span className="text-emerald-600 font-medium">
              {lastPartialUpdate.toLocaleTimeString('ja-JP')}
            </span>
          </div>
        )}
      </div>
    </div>
  )
} 