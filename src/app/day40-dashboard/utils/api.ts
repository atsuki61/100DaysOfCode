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
  const res = await fetch('/api/news/top', { cache: 'no-store' })
  if (!res.ok) throw new Error('ニュースの取得に失敗しました')
  const json = (await res.json()) as { items: Array<{ title: string; url: string }> }
  return json.items
}


