import Image from 'next/image';
import { WeatherData } from '../types';

interface WeatherCardProps {
  weather: WeatherData;
}

export default function WeatherCard({ weather }: WeatherCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md mx-auto"> {/* 白背景, 角丸2xl, 影lg, パディング8, 最大幅md, 中央寄せ */}
      {/* 都市名と国名 */}
      <div className="text-center mb-6"> {/* 中央揃え, 下マージン6 */}
        <h2 className="text-3xl font-bold text-gray-800 mb-2"> {/* 文字サイズ3xl, 太字, グレー文字, 下マージン2 */}
          {weather.city}
        </h2>
        <p className="text-gray-600 text-lg"> {/* グレー文字, 文字サイズlg */}
          {weather.country}
        </p>
      </div>

      {/* 天気アイコンと温度 */}
      <div className="text-center mb-6"> {/* 中央揃え, 下マージン6 */}
        <div className="flex justify-center items-center mb-4"> {/* Flex中央寄せ, アイテム中央寄せ, 下マージン4 */}
          <Image
            src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
            alt={weather.description}
            width={100}
            height={100}
            className="mr-4" // 右マージン4
          />
          <span className="text-6xl font-bold text-gray-800"> {/* 文字サイズ6xl, 太字, グレー文字 */}
            {Math.round(weather.temperature)}°C
          </span>
        </div>
        <p className="text-xl text-gray-600 capitalize"> {/* 文字サイズxl, グレー文字, 最初の文字大文字 */}
          {weather.description}
        </p>
      </div>

      {/* 詳細情報 */}
      <div className="grid grid-cols-2 gap-4"> {/* グリッド2列, ギャップ4 */}
        <div className="bg-blue-50 rounded-lg p-4 text-center"> {/* 薄青背景, 角丸lg, パディング4, 中央揃え */}
          <p className="text-blue-600 text-sm font-semibold mb-1"> {/* 青文字, 文字サイズsm, 太字, 下マージン1 */}
            体感温度
          </p>
          <p className="text-2xl font-bold text-blue-800"> {/* 文字サイズ2xl, 太字, 濃い青文字 */}
            {Math.round(weather.feelsLike)}°C
          </p>
        </div>

        <div className="bg-green-50 rounded-lg p-4 text-center"> {/* 薄緑背景, 角丸lg, パディング4, 中央揃え */}
          <p className="text-green-600 text-sm font-semibold mb-1"> {/* 緑文字, 文字サイズsm, 太字, 下マージン1 */}
            湿度
          </p>
          <p className="text-2xl font-bold text-green-800"> {/* 文字サイズ2xl, 太字, 濃い緑文字 */}
            {weather.humidity}%
          </p>
        </div>

        <div className="bg-purple-50 rounded-lg p-4 text-center"> {/* 薄紫背景, 角丸lg, パディング4, 中央揃え */}
          <p className="text-purple-600 text-sm font-semibold mb-1"> {/* 紫文字, 文字サイズsm, 太字, 下マージン1 */}
            風速
          </p>
          <p className="text-2xl font-bold text-purple-800"> {/* 文字サイズ2xl, 太字, 濃い紫文字 */}
            {weather.windSpeed} m/s
          </p>
        </div>

        <div className="bg-orange-50 rounded-lg p-4 text-center"> {/* 薄オレンジ背景, 角丸lg, パディング4, 中央揃え */}
          <p className="text-orange-600 text-sm font-semibold mb-1"> {/* オレンジ文字, 文字サイズsm, 太字, 下マージン1 */}
            気圧
          </p>
          <p className="text-2xl font-bold text-orange-800"> {/* 文字サイズ2xl, 太字, 濃いオレンジ文字 */}
            {weather.pressure} hPa
          </p>
        </div>
      </div>
    </div>
  );
} 