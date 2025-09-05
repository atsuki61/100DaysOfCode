import { NextResponse } from 'next/server'

export async function GET() {
  // デプロイ時（Vercel等）はモックレスポンスを返す
  return NextResponse.json({ message: "Hello, Go! (Mock for Vercel)" }, { status: 200 })
}


