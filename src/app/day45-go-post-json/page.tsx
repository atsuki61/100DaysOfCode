"use client"

import { useCallback, useMemo, useState } from 'react'

type Op = 'add' | 'sub' | 'mul' | 'div'

export default function Day45Page() {
  const [x, setX] = useState<string>('1')
  const [y, setY] = useState<string>('2')
  const [op, setOp] = useState<Op>('add')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)

  const canSubmit = useMemo(() => {
    const nx = Number(x)
    const ny = Number(y)
    return Number.isFinite(nx) && Number.isFinite(ny)
  }, [x, y])

  const handleCalc = useCallback(async () => {
    setLoading(true)
    setError(null)
    setResult(null)
    try {
      const body = { op, x: Number(x), y: Number(y) }
      const res = await fetch('/api/day45-calc', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      const data = (await res.json()) as unknown
      if (!res.ok) {
        const errMsg = (data as { error?: string })?.error ?? 'エラーが発生しました'
        setError(errMsg)
        return
      }
      const maybeNum = (data as { result?: unknown })?.result
      if (typeof maybeNum === 'number' && Number.isFinite(maybeNum)) {
        setResult(maybeNum)
      } else {
        setError('不正なレスポンスです')
      }
    } catch (e: unknown) {
      if (e instanceof Error) setError(e.message)
      else setError('Unknown error')
    } finally {
      setLoading(false)
    }
  }, [x, y, op])

  return (
    <div className="max-w-3xl mx-auto p-6"> {/* 幅制限/中央/パディング */}
      <div className="bg-white rounded-xl shadow p-6 space-y-6"> {/* 白背景/角丸/影/余白 */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4"> {/* グリッド/ギャップ */}
          <div>
            <label className="block text-sm font-medium mb-1">X</label>
            <input
              value={x}
              onChange={(e) => setX(e.target.value)}
              type="number"
              className="w-full px-3 py-2 border rounded-md" /> {/* 幅/パディング/枠/角丸 */}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Y</label>
            <input
              value={y}
              onChange={(e) => setY(e.target.value)}
              type="number"
              className="w-full px-3 py-2 border rounded-md" /> {/* 幅/パディング/枠/角丸 */}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">演算</label>
            <select
              value={op}
              onChange={(e) => setOp(e.target.value as Op)}
              className="w-full px-3 py-2 border rounded-md"> {/* 幅/パディング/枠/角丸 */}
              <option value="add">加算 (x + y)</option>
              <option value="sub">減算 (x - y)</option>
              <option value="mul">乗算 (x * y)</option>
              <option value="div">除算 (x / y)</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-3"> {/* 横並び/間隔 */}
          <button
            onClick={handleCalc}
            disabled={!canSubmit || loading}
            className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"> {/* パディング/青背景/白文字/角丸/無効時透明 */}
            {loading ? '計算中...' : '計算する'}
          </button>
          {!canSubmit && (
            <span className="text-sm text-red-600">数値を入力してください</span>
          )}
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">結果</h3>
          {error && (
            <div className="px-4 py-2 bg-red-50 text-red-700 rounded"> {/* 赤系背景/赤文字/角丸 */}
              {error}
            </div>
          )}
          {result !== null && !error && (
            <div className="px-4 py-2 bg-green-50 text-green-700 rounded"> {/* 緑系背景/緑文字/角丸 */}
              {result}
            </div>
          )}
        </div>

        <div className="text-sm text-gray-600">
          <p>このページは Go の Day45「POST JSONと処理」を Next.js のAPIルートで模擬しています。</p>
          <pre className="mt-2 bg-gray-50 p-3 rounded overflow-auto">{JSON.stringify({ op, x: Number(x), y: Number(y) }, null, 2)}</pre> {/* 現在の送信JSON */}
        </div>
      </div>
    </div>
  )
}


