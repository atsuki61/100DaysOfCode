import { NextResponse } from 'next/server'
import { animeQuotes } from '@/app/day9-anime-quote-generator/components/data/quotes'

export async function GET() {
  const total = animeQuotes.length
  const idx = Math.floor(Math.random() * total)
  const picked = animeQuotes[idx]
  const payload = { anime: picked.anime, character: picked.character, quote: picked.quote }
  return NextResponse.json(payload, { status: 200 })
}


