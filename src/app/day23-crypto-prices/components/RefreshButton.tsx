'use client'

import { useState, useEffect } from 'react'

interface RefreshButtonProps {
  className?: string
}

export default function RefreshButton({ className = "" }: RefreshButtonProps) {
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = async () => {
    setIsRefreshing(true)
    
    // 少し視覚的なフィードバックを提供
    setTimeout(() => {
      window.location.reload()
    }, 500)
  }

  return (
    <button
      onClick={handleRefresh}
      disabled={isRefreshing}
      className={`
        inline-flex items-center px-6 py-3 
        bg-gradient-to-r from-blue-600 to-purple-600 
        hover:from-blue-700 hover:to-purple-700 
        disabled:from-gray-400 disabled:to-gray-500
        text-white font-semibold rounded-lg 
        shadow-lg hover:shadow-xl 
        transform hover:scale-105 
        transition-all duration-200 
        disabled:cursor-not-allowed disabled:transform-none
        ${className}
      `}
    >
      {/* 更新アイコン */}
      <svg 
        className={`w-5 h-5 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} 
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
      
      {isRefreshing ? (
        <>
          <span>更新中...</span>
          <div className="ml-2 flex space-x-1">
            <div className="w-1 h-1 bg-white rounded-full animate-pulse"></div>
            <div className="w-1 h-1 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-1 h-1 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </>
      ) : (
        'データを更新'
      )}
    </button>
  )
}

// 最終更新時刻表示コンポーネント（Client Component）
export function LastUpdated() {
  const [currentTime, setCurrentTime] = useState<string>('')
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    // クライアント側でのみ時刻を設定（Hydration Error回避）
    const updateTime = () => {
      const now = new Date()
      setCurrentTime(now.toLocaleString('ja-JP', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }))
    }
    
    updateTime()
    setMounted(true)
    
    // 1秒ごとに時刻を更新
    const interval = setInterval(updateTime, 1000)
    
    return () => clearInterval(interval)
  }, [])
  
  // マウント前は時刻を表示しない（Hydration Error回避）
  if (!mounted) {
    return (
      <div className="flex items-center text-sm text-gray-500 bg-gray-50 rounded-lg px-3 py-2">
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        最終更新: --
      </div>
    )
  }
  
  return (
    <div className="flex items-center text-sm text-gray-500 bg-gray-50 rounded-lg px-3 py-2">
      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      最終更新: {currentTime}
    </div>
  )
} 