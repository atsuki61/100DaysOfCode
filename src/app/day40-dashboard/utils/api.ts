import { NewsItem, QuoteData, WeatherData } from '../components/types'
import { fetchWeatherByCity } from '@/app/day11-weather/utils/weatherApi'

// 天気: Day11の実APIを利用（都市はTokyo固定。将来UI化）
export async function fetchWeather(): Promise<WeatherData> {
  const data = await fetchWeatherByCity('Tokyo')
  return {
    city: data.city,
    tempCelsius: data.temperature,
    description: data.description,
  }
}

// 名言: Day9の固定データをAPIルート化したものを叩く
export async function fetchQuote(): Promise<QuoteData> {
  const res = await fetch('/api/quotes/random', { cache: 'no-store' })
  if (!res.ok) throw new Error('名言の取得に失敗しました')
  const json = (await res.json()) as { quote: string; author: string }
  return { quote: json.quote, author: json.author }
}

// ニュース: ひとまず固定（後で外部API差し替え）
export async function fetchNews(): Promise<NewsItem[]> {
  return [
    { title: 'Next.js App Router 実践Tips', url: '#' },
    { title: 'TypeScript 5.xのsatisfiesで型安全に', url: '#' },
    { title: 'Go + WebSocketでリアルタイム入門', url: '#' },
  ]
}


