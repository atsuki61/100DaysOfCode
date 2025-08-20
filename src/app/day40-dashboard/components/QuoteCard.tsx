import { QuoteData } from './types'

type Props = {
  data: QuoteData | null
}

export function QuoteCard({ data }: Props) {
  return (
    <section className="rounded-lg border border-gray-200 p-5 bg-gradient-to-br from-amber-50 to-white">
      <h2 className="text-lg font-semibold text-gray-800 mb-3">名言</h2>
      {data ? (
        <blockquote className="text-gray-700 italic">
          “{data.quote}”
          <footer className="mt-2 text-sm text-gray-500">— {data.author}</footer>
        </blockquote>
      ) : (
        <div className="text-gray-400">データなし</div>
      )}
    </section>
  )}


