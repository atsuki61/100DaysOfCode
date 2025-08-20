import { NewsItem } from './types'

type Props = {
  items: NewsItem[] | null
}

export function NewsCard({ items }: Props) {
  return (
    <section className="rounded-lg border border-gray-200 p-5 bg-gradient-to-br from-emerald-50 to-white">
      <h2 className="text-lg font-semibold text-gray-800 mb-3">ニュース</h2>
      {items ? (
        <ul className="space-y-2 list-disc pl-5">
          {items.map((n, idx) => (
            <li key={idx} className="text-gray-700">
              <a className="hover:underline" href={n.url} target="_blank" rel="noreferrer">
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


