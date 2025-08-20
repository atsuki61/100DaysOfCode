"use client"

import { useEffect, useMemo, useState } from 'react'
import { WeatherData, QuoteData, NewsItem } from './types'
import { WeatherCard } from './WeatherCard'
import { QuoteCard } from './QuoteCard'
import { NewsCard } from './NewsCard'

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

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      setCombined((s) => ({ ...s, loading: true }))
      try {
        const [weather, quote, news] = await Promise.all([
          fetchWeatherMock(),
          fetchQuoteMock(),
          fetchNewsMock(),
        ])
        if (!cancelled) setCombined({ weather, quote, news, loading: false })
      } catch (e) {
        if (!cancelled) setCombined({ weather: null, quote: null, news: null, loading: false })
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  const temperature = useMemo(() => {
    if (!combined.weather) return '-'
    return `${combined.weather.tempCelsius.toFixed(1)}°C`
  }, [combined.weather])

  return (
    <div className="space-y-6">
      {combined.loading && (
        <div className="text-center text-gray-500">読み込み中...</div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <WeatherCard data={combined.weather} />
        <QuoteCard data={combined.quote} />
        <NewsCard items={combined.news} />
      </div>
    </div>
  )
}


