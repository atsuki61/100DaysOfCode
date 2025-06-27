'use client';

import { useState } from 'react';
import { WeatherCard, AutoCompleteSearch, ErrorMessage } from './components';
import { WeatherData, WeatherError } from './types';
import { fetchWeatherByCity } from './utils/weatherApi';

export default function WeatherApp() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<WeatherError | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (city: string) => {
    setIsLoading(true);
    setError(null);
    setWeather(null);

    try {
      const weatherData = await fetchWeatherByCity(city);
      setWeather(weatherData);
    } catch (err) {
      if (err instanceof Error) {
        setError({ message: err.message });
      } else {
        setError({ message: '予期しないエラーが発生しました。' });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    setError(null);
  };

  return (
    <div className="py-8"> {/* 縦パディング8 */}
      {/* アプリケーションタイトル */}
      <div className="text-center mb-8"> {/* 中央揃え, 下マージン8 */}
        <h1 className="text-4xl font-bold text-gray-800 mb-4"> {/* 文字サイズ4xl, 太字, グレー文字, 下マージン4 */}
          ☀️ 天気予報アプリ
        </h1>
        <p className="text-gray-600 text-lg max-w-md mx-auto"> {/* グレー文字, 文字サイズlg, 最大幅md, 中央寄せ */}
          ひらがな・漢字・英語で都市名を検索できます
        </p>
      </div>

      {/* 検索フォーム */}
      <AutoCompleteSearch onSearch={handleSearch} isLoading={isLoading} />

      {/* エラー表示 */}
      {error && <ErrorMessage error={error} onRetry={handleRetry} />}

      {/* 天気データ表示 */}
      {weather && <WeatherCard weather={weather} />}

      {/* 初回表示時のヒント */}
      {!weather && !error && !isLoading && (
        <div className="text-center text-gray-500 mt-12"> {/* 中央揃え, グレー文字, 上マージン12 */}
          <div className="mb-4"> {/* 下マージン4 */}
            <svg className="w-16 h-16 mx-auto text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"> {/* 幅16, 高さ16, 中央寄せ, 薄いグレー */}
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.4 4.4 0 003 15z" />
            </svg>
          </div>
          <p className="text-lg mb-2"> {/* 文字サイズlg, 下マージン2 */}
            ひらがなで入力すると候補が表示されます
          </p>
          <p className="text-sm"> {/* 文字サイズsm */}
            例: 「こ」→ 甲賀市、「なご」→ 名古屋市、「おお」→ 大津市・大阪府
          </p>
          
          {/* 滋賀県・愛知県特化情報 */}
          <div className="mt-8 space-y-4 max-w-4xl mx-auto"> {/* 上マージン8, 縦間隔4, 最大幅4xl, 中央寄せ */}
            {/* 愛知県セクション */}
            <div className="p-4 bg-orange-50 rounded-lg"> {/* パディング4, 薄いオレンジ背景, 角丸lg */}
              <h3 className="text-lg font-semibold text-orange-800 mb-2">🏭 愛知県の都市も検索できます！</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-orange-700"> {/* グリッド 2列, md以上で4列, ギャップ2, 文字サイズsm, オレンジ文字 */}
                <div>• 名古屋市</div>
                <div>• 豊田市</div>
                <div>• 岡崎市</div>
                <div>• 一宮市</div>
                <div>• 豊橋市</div>
                <div>• 春日井市</div>
                <div>• 豊川市</div>
                <div>• 安城市</div>
                <div>• 西尾市</div>
                <div>• 刈谷市</div>
                <div>• 小牧市</div>
                <div>• 東海市</div>
                <div>• 江南市</div>
                <div>• 稲沢市</div>
                <div>• 知多市</div>
                <div>• その他38市町村</div>
              </div>
            </div>
            
            {/* 滋賀県セクション */}
            <div className="p-4 bg-blue-50 rounded-lg"> {/* パディング4, 薄青背景, 角丸lg */}
              <h3 className="text-lg font-semibold text-blue-800 mb-2">🏔️ 滋賀県の都市も検索できます！</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-blue-700"> {/* グリッド 2列, md以上で4列, ギャップ2, 文字サイズsm, 青文字 */}
                <div>• 大津市</div>
                <div>• 草津市</div>
                <div>• 彦根市</div>
                <div>• 長浜市</div>
                <div>• 近江八幡市</div>
                <div>• 守山市</div>
                <div>• 栗東市</div>
                <div>• 甲賀市</div>
                <div>• 野洲市</div>
                <div>• 湖南市</div>
                <div>• 高島市</div>
                <div>• 東近江市</div>
                <div>• 米原市</div>
                <div>• 日野町</div>
                <div>• 竜王町</div>
                <div>• 愛荘町</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 学習ポイントの表示 */}
      <div className="mt-16 max-w-4xl mx-auto"> {/* 上マージン16, 最大幅4xl, 中央寄せ */}
        <div className="bg-blue-50 rounded-lg p-6"> {/* 薄青背景, 角丸lg, パディング6 */}
          <h2 className="text-2xl font-bold text-blue-800 mb-4"> {/* 文字サイズ2xl, 太字, 濃い青文字, 下マージン4 */}
            📚 Day 11の学習ポイント
          </h2>
          <div className="grid md:grid-cols-2 gap-6"> {/* グリッド md以上で2列, ギャップ6 */}
            <div>
              <h3 className="text-lg font-semibold text-blue-700 mb-2"> {/* 文字サイズlg, 太字, 青文字, 下マージン2 */}
                🔍 検索機能
              </h3>
              <ul className="text-sm text-blue-600 space-y-1"> {/* 文字サイズsm, 青文字, 縦間隔1 */}
                <li>• ひらがな入力オートコンプリート</li>
                <li>• リアルタイム候補表示</li>
                <li>• キーボード操作対応</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-700 mb-2"> {/* 文字サイズlg, 太字, 青文字, 下マージン2 */}
                🌐 外部API連携
              </h3>
              <ul className="text-sm text-blue-600 space-y-1"> {/* 文字サイズsm, 青文字, 縦間隔1 */}
                <li>• OpenWeatherMap APIの利用</li>
                <li>• fetch関数による非同期通信</li>
                <li>• APIレスポンスの処理</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-700 mb-2"> {/* 文字サイズlg, 太字, 青文字, 下マージン2 */}
                🔧 TypeScript活用
              </h3>
              <ul className="text-sm text-blue-600 space-y-1"> {/* 文字サイズsm, 青文字, 縦間隔1 */}
                <li>• APIレスポンスの型定義</li>
                <li>• 型安全なデータ変換</li>
                <li>• エラーハンドリングの型管理</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-700 mb-2"> {/* 文字サイズlg, 太字, 青文字, 下マージン2 */}
                ⚡ 状態管理
              </h3>
              <ul className="text-sm text-blue-600 space-y-1"> {/* 文字サイズsm, 青文字, 縦間隔1 */}
                <li>• ローディング状態の管理</li>
                <li>• エラー状態の管理</li>
                <li>• useStateによる複数状態制御</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-700 mb-2"> {/* 文字サイズlg, 太字, 青文字, 下マージン2 */}
                🔐 セキュリティ
              </h3>
              <ul className="text-sm text-blue-600 space-y-1"> {/* 文字サイズsm, 青文字, 縦間隔1 */}
                <li>• 環境変数でAPIキー管理</li>
                <li>• エラーハンドリングの充実</li>
                <li>• 適切なHTTPステータス処理</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
