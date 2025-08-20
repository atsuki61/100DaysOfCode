"use client"

import { useEffect, useMemo, useState } from 'react'

type WeatherData = {
  city: string
  tempCelsius: number
  description: string
}

type QuoteData = {
  author: string
  quote: string
}

type NewsItem = {
  title: string
  url: string
}

//

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
        {/* 天気カード */}
        <section className="rounded-lg border border-gray-200 p-5 bg-gradient-to-br from-blue-50 to-white">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">天気</h2>
          {combined.weather ? (
            <div className="flex items-baseline justify-between">
              <div>
                <div className="text-sm text-gray-500">{combined.weather.city}</div>
                <div className="text-3xl font-bold text-blue-700 mt-1">{temperature}</div>
              </div>
              <div className="text-gray-600">{combined.weather.description}</div>
            </div>
          ) : (
            <div className="text-gray-400">データなし</div>
          )}
        </section>

        {/* 名言カード */}
        <section className="rounded-lg border border-gray-200 p-5 bg-gradient-to-br from-amber-50 to-white">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">名言</h2>
          {combined.quote ? (
            <blockquote className="text-gray-700 italic">
              “{combined.quote.quote}”
              <footer className="mt-2 text-sm text-gray-500">— {combined.quote.author}</footer>
            </blockquote>
          ) : (
            <div className="text-gray-400">データなし</div>
          )}
        </section>

        {/* ニュースカード */}
        <section className="rounded-lg border border-gray-200 p-5 bg-gradient-to-br from-emerald-50 to-white">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">ニュース</h2>
          {combined.news ? (
            <ul className="space-y-2 list-disc pl-5">
              {combined.news.map((n, idx) => (
                <li key={idx} className="text-gray-700">
                  <a className="hover:underline" href={n.url} target="_blank" rel="noreferrer">
                    {n.title}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-gray-400">データなし</div>
          )}
        </section>
      </div>
    </div>
  )
}


