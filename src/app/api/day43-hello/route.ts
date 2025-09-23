import { NextResponse } from 'next/server'

// Day43: Gin/Echo の代替として、デプロイ環境でも動作するモックを返す
export async function GET() {
  return NextResponse.json({ message: 'Hello from Gin (Mock)' }, { status: 200 })
}


