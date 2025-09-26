import { NextResponse } from 'next/server'

type Op = 'add' | 'sub' | 'mul' | 'div'

interface CalcRequestBody {
  op: Op
  x: number
  y: number
}

function isCalcRequestBody(data: unknown): data is CalcRequestBody {
  if (typeof data !== 'object' || data === null) return false
  const d = data as Record<string, unknown>
  const op = d.op
  const x = d.x
  const y = d.y
  const isOp = op === 'add' || op === 'sub' || op === 'mul' || op === 'div'
  return isOp && typeof x === 'number' && Number.isFinite(x) && typeof y === 'number' && Number.isFinite(y)
}

export async function POST(req: Request) {
  try {
    const json = (await req.json()) as unknown
    if (!isCalcRequestBody(json)) {
      return NextResponse.json(
        { error: 'Invalid body. Expected { op: "add|sub|mul|div", x: number, y: number }' },
        { status: 400 }
      )
    }

    const { op, x, y } = json

    if (op === 'div' && y === 0) {
      return NextResponse.json({ error: 'Division by zero' }, { status: 400 })
    }

    let result: number
    switch (op) {
      case 'add':
        result = x + y
        break
      case 'sub':
        result = x - y
        break
      case 'mul':
        result = x * y
        break
      case 'div':
        result = x / y
        break
      default:
        return NextResponse.json({ error: 'Unsupported operation' }, { status: 400 })
    }

    return NextResponse.json({ op, x, y, result }, { status: 200 })
  } catch (e: unknown) {
    if (e instanceof Error) {
      return NextResponse.json({ error: e.message }, { status: 500 })
    }
    return NextResponse.json({ error: 'Unknown error' }, { status: 500 })
  }
}

export async function GET() {
  // Simple help endpoint for manual checks
  return NextResponse.json(
    {
      usage: 'POST JSON to this endpoint',
      example: { op: 'add', x: 1, y: 2 },
    },
    { status: 200 }
  )
}


