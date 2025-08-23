import { NextResponse } from 'next/server'
import { animeQuotes } from '@/app/day9-anime-quote-generator/components/data/quotes'

export async function GET() {
  const idx = Math.floor(Math.random() * animeQuotes.length)
  const q = animeQuotes[idx]
  return NextResponse.json({
    quote: q.quote,
    author: `${q.character}（${q.anime}）`,
  })
}


