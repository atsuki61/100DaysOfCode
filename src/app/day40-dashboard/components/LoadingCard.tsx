type Props = {
  title: string
  icon?: string
}

export function LoadingCard({ title, icon }: Props) {
  return (
    <section className="rounded-lg border border-gray-200 p-5 bg-gradient-to-br from-gray-50 to-white">
      <h2 className="text-lg font-semibold text-gray-800 mb-3">
        {icon && <span className="mr-2">{icon}</span>}
        {title}
      </h2>
      <div className="animate-pulse space-y-3">
        <div className="h-4 bg-gray-300 rounded w-3/4"></div> {/* 幅3/4の線 */}
        <div className="h-4 bg-gray-300 rounded w-1/2"></div> {/* 幅1/2の線 */}
        <div className="h-4 bg-gray-300 rounded w-5/6"></div> {/* 幅5/6の線 */}
      </div>
    </section>
  )
}
