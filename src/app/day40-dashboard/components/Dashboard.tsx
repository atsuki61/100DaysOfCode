"use client"

import { useEffect, useMemo, useState } from 'react'
import { WeatherData, QuoteData, NewsItem } from './types'
import { WeatherCard } from './WeatherCard'
import { QuoteCard } from './QuoteCard'
import { NewsCard } from './NewsCard'
import { fetchNews, fetchQuote, fetchWeather } from '../utils/api'

async function fetchWeatherMock(): Promise<WeatherData> {
  await new Promise((r) => setTimeout(r, 500))
  return {
    city: 'Tokyo',
    tempCelsius: 22,
    description: 'Sunny',
  }
}

async function fetchQuoteMock(): Promise<QuoteData> {
  await new Promise((r) => setTimeout(r, 600))
  return {
    author: 'Albert Einstein',
    quote: 'Life is like riding a bicycle. To keep your balance, you must keep moving.',
  }
}

async function fetchNewsMock(): Promise<NewsItem[]> {
  await new Promise((r) => setTimeout(r, 700))
  return [
    { title: 'Next.js 14.2 リリースノートまとめ', url: '#' },
    { title: 'TypeScript 5.x 新機能ハイライト', url: '#' },
    { title: 'Go 1.22 の変更点をざっくり', url: '#' },
  ]
}

export function Dashboard() {
  // モックAPIを Promise.all で同時取得（各カードは独立フェッチでもOK）
  const [combined, setCombined] = useState<{
    weather: WeatherData | null
    quote: QuoteData | null
    news: NewsItem[] | null
    loading: boolean
  }>({ weather: null, quote: null, news: null, loading: true })
  const [error, setError] = useState<string | null>(null)

  async function fetchAll(cancelledRef?: { current: boolean }) {
    setCombined((s) => ({ ...s, loading: true }))
    setError(null)
    try {
      const [weather, quote, news] = await Promise.all([
        fetchWeather(),
        fetchQuote(),
        fetchNews(),
      ])
      if (!cancelledRef?.current) setCombined({ weather, quote, news, loading: false })
    } catch (e: any) {
      if (!cancelledRef?.current) {
        setCombined({ weather: null, quote: null, news: null, loading: false })
        setError(e?.message ?? 'データの取得に失敗しました')
      }
    }
  }

  useEffect(() => {
    const cancelledRef = { current: false }
    fetchAll(cancelledRef)
    return () => {
      cancelledRef.current = true
    }
  }, [])

  const temperature = useMemo(() => {
    if (!combined.weather) return '-'
    return `${combined.weather.tempCelsius.toFixed(1)}°C`
  }, [combined.weather])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        {combined.loading ? (
          <div className="text-gray-500">読み込み中...</div>
        ) : (
          <div />
        )}
        <button
          type="button"
          onClick={() => fetchAll()}
          className="inline-flex items-center rounded-md bg-gray-800 px-3 py-2 text-sm font-medium text-white hover:bg-gray-700 disabled:opacity-50"
          disabled={combined.loading}
        >
          再読み込み
        </button>
      </div>

      {error && (
        <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <WeatherCard data={combined.weather} />
        <QuoteCard data={combined.quote} />
        <NewsCard items={combined.news} />
      </div>
    </div>
  )
}


