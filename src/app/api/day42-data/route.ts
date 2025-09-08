import { NextResponse } from 'next/server'

// Day42: Go JSON API のモック（Vercel等の環境用）
export async function GET() {
  return NextResponse.json(
    {
      title: 'Day 42 Mock JSON',
      items: [
        { id: 1, name: 'Alpha' },
        { id: 2, name: 'Beta' },
        { id: 3, name: 'Gamma' },
      ],
    },
    { status: 200 }
  )
}



