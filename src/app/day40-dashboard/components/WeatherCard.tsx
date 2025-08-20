import { WeatherData } from './types'

type Props = {
  data: WeatherData | null
}

export function WeatherCard({ data }: Props) {
  const temperature = data ? `${data.tempCelsius.toFixed(1)}°C` : '-'
  return (
    <section className="rounded-lg border border-gray-200 p-5 bg-gradient-to-br from-blue-50 to-white">
      <h2 className="text-lg font-semibold text-gray-800 mb-3">天気</h2>
      {data ? (
        <div className="flex items-baseline justify-between">
          <div>
            <div className="text-sm text-gray-500">{data.city}</div>
            <div className="text-3xl font-bold text-blue-700 mt-1">{temperature}</div>
          </div>
          <div className="text-gray-600">{data.description}</div>
        </div>
      ) : (
        <div className="text-gray-400">データなし</div>
      )}
    </section>
  )
}


