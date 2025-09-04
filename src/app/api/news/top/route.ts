import { NextResponse } from 'next/server'

const GNEWS_ENDPOINT = 'https://gnews.io/api/v4/top-headlines'

// フォールバック用のサンプルニュース
const FALLBACK_NEWS = [
  { title: 'テクノロジー最新情報をお届け', url: '#' },
  { title: '今日の注目ニュース', url: '#' },
  { title: 'プログラミング業界の動向', url: '#' },
  { title: 'AI・機械学習の最新トレンド', url: '#' },
  { title: 'Web開発のベストプラクティス', url: '#' },
  { title: 'React/Next.jsの最新情報', url: '#' },
]

export async function GET() {
  const apiKey = process.env.GNEWS_API_KEY
  
  // APIキーがない場合はフォールバックデータを返す
  if (!apiKey) {
    console.warn('GNEWS_API_KEY is not set, using fallback data')
    return NextResponse.json({ items: FALLBACK_NEWS })
  }

  const url = new URL(GNEWS_ENDPOINT)
  url.searchParams.set('lang', 'ja')
  url.searchParams.set('country', 'jp')
  url.searchParams.set('max', '6')
  url.searchParams.set('category', 'general')
  url.searchParams.set('apikey', apiKey)

  try {
    const res = await fetch(url.toString(), { cache: 'no-store' })
    if (!res.ok) {
      console.warn(`News API error: ${res.status}, using fallback data`)
      return NextResponse.json({ items: FALLBACK_NEWS })
    }
    const json: unknown = await res.json()
    const articles = Array.isArray((json as any)?.articles) ? (json as any).articles : [] // eslint-disable-line @typescript-eslint/no-explicit-any -- 外部APIの最小限の絞り込み
    const items = articles
      .slice(0, 6)
      .map((a: any) => ({ // eslint-disable-line @typescript-eslint/no-explicit-any -- 外部APIの最小限の絞り込み
        title: typeof a?.title === 'string' ? a.title : 'No title',
        url: typeof a?.url === 'string' ? a.url : '#',
      }))
    return NextResponse.json({ items: items.length > 0 ? items : FALLBACK_NEWS })
  } catch (error) {
    console.warn('Failed to fetch news, using fallback data:', error)
    return NextResponse.json({ items: FALLBACK_NEWS })
  }
}


