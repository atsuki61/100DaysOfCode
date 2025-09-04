import { WeatherData } from './types'

type Props = {
  data: WeatherData | null
  error?: string | null
  onRetry?: () => void
}

export function WeatherCard({ data, error, onRetry }: Props) {
  const temperature = data ? `${data.tempCelsius.toFixed(1)}°C` : '-'
  
  return (
    <section className="rounded-lg border border-gray-200 p-5 bg-gradient-to-br from-blue-50 to-white">
      <h2 className="text-lg font-semibold text-gray-800 mb-3">🌤️ 天気</h2>
      {error ? (
        <div className="space-y-3">
          <div className="text-red-600 text-sm">{error}</div>
          {onRetry && (
            <button
              onClick={onRetry}
              className="text-blue-600 hover:text-blue-800 text-sm underline transition-colors duration-200"
            >
              再試行
            </button>
          )}
        </div>
      ) : data ? (
        <div className="flex items-baseline justify-between">
          <div>
            <div className="text-sm text-gray-500">{data.city}</div>
            <div className="text-3xl font-bold text-blue-700 mt-1">{temperature}</div>
          </div>
          <div className="text-gray-600 text-right">
            <div className="text-sm">{data.description}</div>
          </div>
        </div>
      ) : (
        <div className="text-gray-400">データなし</div>
      )}
    </section>
  )
}


