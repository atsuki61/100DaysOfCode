import { QuoteData } from './types'

type Props = {
  data: QuoteData | null
  error?: string | null
  onRetry?: () => void
}

export function QuoteCard({ data, error, onRetry }: Props) {
  return (
    <section className="rounded-lg border border-gray-200 p-5 bg-gradient-to-br from-amber-50 to-white">
      <h2 className="text-lg font-semibold text-gray-800 mb-3">💭 名言</h2>
      {error ? (
        <div className="space-y-3">
          <div className="text-red-600 text-sm">{error}</div>
          {onRetry && (
            <button
              onClick={onRetry}
              className="text-amber-600 hover:text-amber-800 text-sm underline transition-colors duration-200"
            >
              再試行
            </button>
          )}
        </div>
      ) : data ? (
        <blockquote className="text-gray-700 italic">
          <div className="text-lg leading-relaxed">&ldquo;{data.quote}&rdquo;</div>
          <footer className="mt-3 text-sm text-gray-500">— {data.author}</footer>
        </blockquote>
      ) : (
        <div className="text-gray-400">データなし</div>
      )}
    </section>
  )
}


