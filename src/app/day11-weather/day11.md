# Day 11: 天気予報アプリ 初心者向け完全解説

## 🎯 このアプリで何ができるの？

**簡単に言うと**: 都市名を入力すると、その都市の現在の天気情報が表示されるアプリです！

### アプリの動作の流れ
1. **ユーザーが都市名を入力** → 例: "Tokyo"
2. **検索ボタンを押す** → ローディング（くるくる）が表示
3. **インターネットから天気データを取得** → OpenWeatherMap APIから
4. **きれいな画面で天気情報を表示** → 気温、湿度、風速など

## 📁 ファイル構成の説明

このアプリは以下のファイルに分かれています：

```
src/app/day11-weather/
├── page.tsx              # 📖 メイン画面（全部を統合）
├── layout.tsx            # 🏠 ページの枠組み（ヘッダー・フッター）
├── types.ts              # 📝 データの形を定義
├── components/           # 🧩 部品フォルダ
│   ├── WeatherCard.tsx     # 🌤️ 天気を表示するカード
│   ├── CitySearchForm.tsx  # 🔍 都市を検索するフォーム
│   └── ErrorMessage.tsx    # ❌ エラーを表示するコンポーネント
└── utils/                # 🛠️ 便利な機能フォルダ
    └── weatherApi.ts       # 🌐 API（インターネットから天気取得）
```

## 🧠 ロジック詳細解説

### 1. types.ts - データの形を決める

```typescript
// APIから返ってくる天気データの形を定義
export interface WeatherData {
  city: string;        // 都市名（例: "Tokyo"）
  country: string;     // 国名（例: "JP"）
  temperature: number; // 気温（例: 25.5）
  description: string; // 天気の説明（例: "晴れ"）
  icon: string;        // アイコンID（例: "01d"）
  humidity: number;    // 湿度（例: 60）
  windSpeed: number;   // 風速（例: 3.2）
  pressure: number;    // 気圧（例: 1013）
  feelsLike: number;   // 体感温度（例: 27.3）
}
```

**なぜ型定義が重要？**
- 間違ったデータを使うとエラーになる
- 自動補完が効く（temperature.と打つと候補が出る）
- バグを早期発見できる

### 2. weatherApi.ts - インターネットから天気を取得

```typescript
export const fetchWeatherByCity = async (city: string): Promise<WeatherData> => {
  try {
    // 1. APIのURLを作る
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=ja`;
    
    // 2. インターネットからデータを取得
    const response = await fetch(url);
    
    // 3. エラーチェック
    if (!response.ok) {
      switch (response.status) {
        case 404: throw new Error(`都市「${city}」が見つかりません`);
        case 401: throw new Error('APIキーが無効です');
        // その他のエラー...
      }
    }
    
    // 4. JSONデータを取得
    const data = await response.json();
    
    // 5. 私たちの形式に変換
    return mapApiResponseToWeatherData(data);
    
  } catch (error) {
    // エラーが起きたら分かりやすいメッセージを表示
    throw new Error('天気データを取得できませんでした');
  }
};
```

**ポイント解説:**
- `async/await`: 時間のかかる処理（インターネット通信）を待つ
- `try/catch`: エラーが起きた時の対処法
- `fetch()`: インターネットからデータを取得する関数
- URLパラメータ: `?q=Tokyo&appid=xxx` のように条件を指定

### 3. page.tsx - メインのロジック

```typescript
export default function WeatherApp() {
  // 📊 状態管理（アプリの現在の状況を記憶）
  const [weather, setWeather] = useState<WeatherData | null>(null);     // 天気データ
  const [error, setError] = useState<WeatherError | null>(null);        // エラー情報
  const [isLoading, setIsLoading] = useState(false);                   // 読み込み中かどうか

  // 🔍 検索が実行されたときの処理
  const handleSearch = async (city: string) => {
    // 1. ローディング開始
    setIsLoading(true);
    setError(null);        // 前のエラーをクリア
    setWeather(null);      // 前の天気データをクリア

    try {
      // 2. APIから天気データを取得
      const weatherData = await fetchWeatherByCity(city);
      
      // 3. 成功したらデータを保存
      setWeather(weatherData);
      
    } catch (err) {
      // 4. エラーが起きたらエラー情報を保存
      setError({ message: err.message });
      
    } finally {
      // 5. 成功・失敗に関わらずローディング終了
      setIsLoading(false);
    }
  };

  return (
    <div>
      {/* 検索フォーム */}
      <CitySearchForm onSearch={handleSearch} isLoading={isLoading} />
      
      {/* エラーがあれば表示 */}
      {error && <ErrorMessage error={error} />}
      
      {/* 天気データがあれば表示 */}
      {weather && <WeatherCard weather={weather} />}
    </div>
  );
}
```

**状態管理の理解:**
```typescript
const [weather, setWeather] = useState(null);
```
- `weather`: 現在の値
- `setWeather`: 値を変更する関数
- `useState`: Reactの「記憶する」機能

**条件付き表示:**
```typescript
{error && <ErrorMessage error={error} />}
```
- `error`が存在する時だけ`<ErrorMessage>`を表示
- JavaScriptの`&&`演算子を利用

### 4. CitySearchForm.tsx - 検索フォームのロジック

```typescript
export default function CitySearchForm({ onSearch, isLoading }) {
  const [city, setCity] = useState(''); // 入力された都市名

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // ページの再読み込みを防ぐ
    
    if (city.trim()) {  // 空白文字を除いて文字があるかチェック
      onSearch(city.trim()); // 親コンポーネントの検索関数を実行
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={city}
        onChange={(e) => setCity(e.target.value)} // 入力が変わったら状態更新
        placeholder="都市名を入力..."
        disabled={isLoading} // ローディング中は入力無効
      />
      <button 
        type="submit" 
        disabled={isLoading || !city.trim()} // ローディング中または空の場合は無効
      >
        {isLoading ? '検索中...' : '検索'}
      </button>
    </form>
  );
}
```

**フォーム処理のポイント:**
- `e.preventDefault()`: 通常のフォーム送信を止める
- `onChange`: 入力が変わるたびに実行される
- `disabled`: 条件に応じてボタンを無効化

### 5. WeatherCard.tsx - 天気表示のロジック

```typescript
export default function WeatherCard({ weather }: WeatherCardProps) {
  return (
    <div className="weather-card">
      {/* 都市名 */}
      <h2>{weather.city}</h2>
      
      {/* 温度（小数点を四捨五入） */}
      <span>{Math.round(weather.temperature)}°C</span>
      
      {/* 天気アイコン */}
      <Image
        src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
        alt={weather.description}
        width={100}
        height={100}
      />
      
      {/* 詳細情報 */}
      <div>
        <div>体感温度: {Math.round(weather.feelsLike)}°C</div>
        <div>湿度: {weather.humidity}%</div>
        <div>風速: {weather.windSpeed} m/s</div>
        <div>気圧: {weather.pressure} hPa</div>
      </div>
    </div>
  );
}
```

**データ表示のポイント:**
- `Math.round()`: 小数点を四捨五入
- `${変数}`: テンプレートリテラル（文字列の中に変数を埋め込む）
- `props`: 親から受け取ったデータ

## 🔄 アプリ全体の流れ

1. **初期状態**: 検索フォームのみ表示
2. **ユーザー入力**: 都市名を入力
3. **検索実行**: 
   - ローディング開始（`setIsLoading(true)`）
   - API呼び出し（`fetchWeatherByCity`）
4. **成功時**: 
   - 天気データ保存（`setWeather`）
   - WeatherCard表示
5. **エラー時**:
   - エラー情報保存（`setError`）
   - ErrorMessage表示
6. **完了**: ローディング終了（`setIsLoading(false)`）

## 🤔 初心者が理解すべきポイント

### 1. 非同期処理とは？
```typescript
// ❌ これは間違い（インターネット通信は時間がかかる）
const data = fetch(url);        // まだデータが来ていない
console.log(data.temperature);  // エラー！

// ✅ 正しい方法
const data = await fetch(url);  // データが来るまで待つ
console.log(data.temperature);  // OK！
```

### 2. 状態管理とは？
```typescript
// Reactコンポーネントは「記憶」が必要
const [count, setCount] = useState(0); // 0を記憶

// ボタンクリックで値を変更
const handleClick = () => {
  setCount(count + 1); // 記憶している値を更新
};
// → 画面が自動で再描画される！
```

### 3. propsとは？
```typescript
// 親コンポーネント
<WeatherCard weather={weatherData} />

// 子コンポーネント
function WeatherCard({ weather }) {
  return <div>{weather.city}</div>; // 親からもらったデータを使用
}
```

### 4. 環境変数とは？
```javascript
// APIキーを直接書くのは危険
const apiKey = "abc123secret"; // ❌ 他の人に見られる

// 環境変数を使う
const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY; // ✅ 安全
```

## 🚀 このアプリで学べること

### React基礎
- コンポーネントの分割方法
- useState による状態管理
- props によるデータ受け渡し
- 条件付きレンダリング

### JavaScript/TypeScript
- 非同期処理（async/await）
- エラーハンドリング（try/catch）
- 配列・オブジェクトの操作
- 型定義の重要性

### Web開発
- API連携の基本
- HTTP ステータスコードの理解
- 環境変数の使い方
- ユーザー体験（UX）の向上

## 🎯 次にチャレンジしたい機能

1. **お気に入り都市**: よく見る都市を保存
2. **位置情報取得**: 「現在地の天気」ボタン
3. **5日間予報**: 週間天気の表示
4. **単位変換**: 摂氏⇔華氏の切り替え

## 💡 初心者へのアドバイス

### コードを理解する順序
1. まず `page.tsx` の全体の流れを把握
2. 各コンポーネントの役割を理解
3. API連携の仕組みを学習
4. 状態管理の流れを追跡

### 学習のコツ
- **console.log()** でデータの中身を確認
- **ブラウザの開発者ツール** でエラーをチェック
- **一つずつ変更**して動作を確認
- **エラーを恐れずに**実験してみる

このアプリを通じて、**React**, **TypeScript**, **API連携**の基礎をしっかり身につけましょう！ 