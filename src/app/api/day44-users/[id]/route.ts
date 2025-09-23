import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const segments = url.pathname.split('/')
  const idStr = segments[segments.length - 1] || '0'
  const idNum = Number(idStr)
  const id = Number.isFinite(idNum) ? idNum : 0
  return NextResponse.json({ id, name: `User-${id}` }, { status: 200 })
}


