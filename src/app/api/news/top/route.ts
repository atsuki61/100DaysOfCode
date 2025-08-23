import { NextResponse } from 'next/server'

const GNEWS_ENDPOINT = 'https://gnews.io/api/v4/top-headlines'

export async function GET() {
  const apiKey = process.env.GNEWS_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'GNEWS_API_KEY is not set' }, { status: 500 })
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
      return NextResponse.json({ error: `Upstream error: ${res.status}` }, { status: 502 })
    }
    const json: unknown = await res.json()
    const articles = Array.isArray((json as any)?.articles) ? (json as any).articles : [] // eslint-disable-line @typescript-eslint/no-explicit-any -- 外部APIの最小限の絞り込み
    const items = articles
      .slice(0, 6)
      .map((a: any) => ({ // eslint-disable-line @typescript-eslint/no-explicit-any -- 外部APIの最小限の絞り込み
        title: typeof a?.title === 'string' ? a.title : 'No title',
        url: typeof a?.url === 'string' ? a.url : '#',
      }))
    return NextResponse.json({ items })
  } catch {
    return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 })
  }
}


