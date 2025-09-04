"use client"

import { useEffect, useState } from 'react'
import { WeatherData, QuoteData, NewsItem } from './types'
import { WeatherCard } from './WeatherCard'
import { QuoteCard } from './QuoteCard'
import { NewsCard } from './NewsCard'
import { LoadingCard } from './LoadingCard'
import { fetchNews, fetchQuote, fetchWeather } from '../utils/api'

type DashboardState = {
  weather: { data: WeatherData | null; loading: boolean; error: string | null }
  quote: { data: QuoteData | null; loading: boolean; error: string | null }
  news: { data: NewsItem[] | null; loading: boolean; error: string | null }
}

export function Dashboard() {
  const [state, setState] = useState<DashboardState>({
    weather: { data: null, loading: true, error: null },
    quote: { data: null, loading: true, error: null },
    news: { data: null, loading: true, error: null },
  })

  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  const fetchWeatherData = async () => {
    setState(prev => ({ ...prev, weather: { ...prev.weather, loading: true, error: null } }))
    try {
      const data = await fetchWeather()
      setState(prev => ({ ...prev, weather: { data, loading: false, error: null } }))
    } catch (error) {
      const message = error instanceof Error ? error.message : '天気データの取得に失敗しました'
      setState(prev => ({ ...prev, weather: { data: null, loading: false, error: message } }))
    }
  }

  const fetchQuoteData = async () => {
    setState(prev => ({ ...prev, quote: { ...prev.quote, loading: true, error: null } }))
    try {
      const data = await fetchQuote()
      setState(prev => ({ ...prev, quote: { data, loading: false, error: null } }))
    } catch (error) {
      const message = error instanceof Error ? error.message : '名言データの取得に失敗しました'
      setState(prev => ({ ...prev, quote: { data: null, loading: false, error: message } }))
    }
  }

  const fetchNewsData = async () => {
    setState(prev => ({ ...prev, news: { ...prev.news, loading: true, error: null } }))
    try {
      const data = await fetchNews()
      setState(prev => ({ ...prev, news: { data, loading: false, error: null } }))
    } catch (error) {
      const message = error instanceof Error ? error.message : 'ニュースデータの取得に失敗しました'
      setState(prev => ({ ...prev, news: { data: null, loading: false, error: message } }))
    }
  }

  const refreshAll = async () => {
    const promises = [fetchWeatherData(), fetchQuoteData(), fetchNewsData()]
    await Promise.allSettled(promises)
    setLastUpdated(new Date())
  }

  useEffect(() => {
    refreshAll()
  }, [])

  const isLoading = state.weather.loading || state.quote.loading || state.news.loading

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-500">
          {lastUpdated && (
            <>最終更新: {lastUpdated.toLocaleTimeString('ja-JP')}</>
          )}
        </div>
        <button
          type="button"
          onClick={refreshAll}
          className="inline-flex items-center rounded-md bg-gray-800 px-3 py-2 text-sm font-medium text-white hover:bg-gray-700 disabled:opacity-50 transition-colors duration-200"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="m12 2a10 10 0 0 1 10 10h-4a6 6 0 0 0-6-6z"></path>
              </svg>
              更新中...
            </>
          ) : (
            '🔄 再読み込み'
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {state.weather.loading ? (
          <LoadingCard title="天気" icon="🌤️" />
        ) : (
          <WeatherCard data={state.weather.data} error={state.weather.error} onRetry={fetchWeatherData} />
        )}
        
        {state.quote.loading ? (
          <LoadingCard title="名言" icon="💭" />
        ) : (
          <QuoteCard data={state.quote.data} error={state.quote.error} onRetry={fetchQuoteData} />
        )}
        
        {state.news.loading ? (
          <LoadingCard title="ニュース" icon="📰" />
        ) : (
          <NewsCard items={state.news.data} error={state.news.error} onRetry={fetchNewsData} />
        )}
      </div>
    </div>
  )
}


