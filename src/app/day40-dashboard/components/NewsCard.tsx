import { NewsItem } from './types'

type Props = {
  items: NewsItem[] | null
  error?: string | null
  onRetry?: () => void
}

export function NewsCard({ items, error, onRetry }: Props) {
  return (
    <section className="rounded-lg border border-gray-200 p-5 bg-gradient-to-br from-emerald-50 to-white">
      <h2 className="text-lg font-semibold text-gray-800 mb-3">📰 ニュース</h2>
      {error ? (
        <div className="space-y-3">
          <div className="text-red-600 text-sm">{error}</div>
          {onRetry && (
            <button
              onClick={onRetry}
              className="text-emerald-600 hover:text-emerald-800 text-sm underline transition-colors duration-200"
            >
              再試行
            </button>
          )}
        </div>
      ) : items && items.length > 0 ? (
        <ul className="space-y-3">
          {items.map((n, idx) => (
            <li key={idx} className="text-gray-700">
              <a 
                className="hover:text-emerald-600 transition-colors duration-200 block text-sm leading-relaxed" 
                href={n.url} 
                target="_blank" 
                rel="noreferrer"
              >
                {n.title}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-gray-400">データなし</div>
      )}
    </section>
  )
}


