import { NewsItem, QuoteData, WeatherData } from '../components/types'

// 実API差し替え前のモック実装
export async function fetchWeather(): Promise<WeatherData> {
  await new Promise((r) => setTimeout(r, 500))
  return { city: 'Tokyo', tempCelsius: 22, description: 'Sunny' }
}

export async function fetchQuote(): Promise<QuoteData> {
  await new Promise((r) => setTimeout(r, 600))
  return {
    author: 'Albert Einstein',
    quote: 'Life is like riding a bicycle. To keep your balance, you must keep moving.',
  }
}

export async function fetchNews(): Promise<NewsItem[]> {
  await new Promise((r) => setTimeout(r, 700))
  return [
    { title: 'Next.js 14.2 リリースノートまとめ', url: '#' },
    { title: 'TypeScript 5.x 新機能ハイライト', url: '#' },
    { title: 'Go 1.22 の変更点をざっくり', url: '#' },
  ]
}


