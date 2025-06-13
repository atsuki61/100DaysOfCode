import { WeatherResponse, WeatherData } from '../types';

// OpenWeatherMap APIのベースURL
const API_BASE_URL = 'https://api.openweathermap.org/data/2.5';

// APIキーを取得（環境変数から）
const getApiKey = (): string => {
  const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
  if (!apiKey) {
    throw new Error('APIキーが設定されていません。NEXT_PUBLIC_OPENWEATHER_API_KEYを設定してください。');
  }
  return apiKey;
};

// APIレスポンスを内部型に変換
const mapApiResponseToWeatherData = (response: WeatherResponse): WeatherData => {
  return {
    city: response.name,
    country: response.sys.country,
    temperature: response.main.temp,
    description: response.weather[0].description,
    icon: response.weather[0].icon,
    humidity: response.main.humidity,
    windSpeed: response.wind.speed,
    pressure: response.main.pressure,
    feelsLike: response.main.feels_like,
  };
};

// 都市名で天気データを取得
export const fetchWeatherByCity = async (city: string): Promise<WeatherData> => {
  try {
    const apiKey = getApiKey();
    const url = `${API_BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric&lang=ja`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      
      switch (response.status) {
        case 404:
          throw new Error(`都市「${city}」が見つかりません。正しい都市名を入力してください。`);
        case 401:
          throw new Error('APIキーが無効です。設定を確認してください。');
        case 429:
          throw new Error('APIの利用制限に達しました。しばらく待ってから再試行してください。');
        default:
          throw new Error(errorData.message || `天気データの取得に失敗しました（エラーコード: ${response.status}）`);
      }
    }
    
    const data: WeatherResponse = await response.json();
    return mapApiResponseToWeatherData(data);
    
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    
    // ネットワークエラーなど
    throw new Error('ネットワークエラーが発生しました。インターネット接続を確認してください。');
  }
}; 