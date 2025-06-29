# Day 11: 天気予報アプリ 初心者向け完全解説

## 🎯 このアプリで何ができるの？

**簡単に言うと**: 都市名を入力すると、その都市の現在の天気情報が表示されるアプリです！

### アプリの動作の流れ
1. **ユーザーが都市名を入力** → 例: "Tokyo"
2. **検索ボタンを押す** → ローディング（くるくる）が表示
3. **インターネットから天気データを取得** → OpenWeatherMap APIから
4. **きれいな画面で天気情報を表示** → 気温、湿度、風速など

---

## 📁 ファイル構成の役割

このアプリは、役割ごとにファイルが分かれています。それぞれのファイルが連携して一つのアプリとして動いています。

```
src/app/day11-weather/
├── page.tsx          # 1. アプリのメイン画面（エントリーポイント）
├── layout.tsx        # アプリ全体のレイアウト（ヘッダーやフッターを配置）
├── types.ts          # 2. データ型の定義ファイル（天気データなどの形を決める）
├── components/       # 3. 再利用可能な部品（コンポーネント）置き場
│   ├── AutoCompleteSearch.tsx # 検索候補を表示する部品
│   ├── CitySearchForm.tsx     # 都市を検索するフォーム部品
│   ├── ErrorMessage.tsx       # エラーメッセージを表示する部品
│   └── WeatherCard.tsx        # 天気情報を表示するカード部品
└── utils/            # 4. 便利機能（ユーティリティ関数）置き場
    ├── cityData.ts            # 都市名のリストデータ
    ├── cityMapping.ts         # 都市名とIDを対応させるデータ
    └── weatherApi.ts          # 天気APIと通信するための関数
```

---

## 🧠 コード詳細解説

### 1. `page.tsx` - アプリのメイン画面（司令塔）

このファイルがアプリの中心です。ユーザーの操作を受け付け、各コンポーネントに指示を出します。

#### コードのポイント
- **`'use client'`**: このファイルがブラウザ側で動くことを示します。`useState`などの機能を使うために必須です。
- **`useState`フック**:
    - `weather`: 取得した天気データを保存します。
    - `error`: エラーが発生したときに、その内容を保存します。
    - `isLoading`: API通信中かどうか（読み込み中か）を管理します。
- **`handleSearch`関数**:
    - 検索が実行されたときのメインの処理です。
    - `async/await` を使って、非同期で天気API (`fetchWeatherByCity`) を呼び出します。
    - `try...catch...finally`構文で、成功・エラー・完了時の処理を制御します。
- **JSXによる画面表示**:
    - `{error && <ErrorMessage />}` のように、`error`があるときだけエラーコンポーネントを表示するなど、条件に応じて表示を切り替えます。

### 2. `types.ts` - データ型の定義

TypeScriptの強力な機能の一つが「型定義」です。データの「形」をあらかじめ決めておくことで、バグを防ぎ、コードを書きやすくします。

- **`WeatherResponse`**: 天気APIから返ってくる、そのままの複雑なデータ構造を定義します。
- **`WeatherData`**: アプリ内で実際に使う、シンプルで分かりやすい形に整理した天気データの型です。
- **`WeatherError`**: エラー情報の形を定義します。

### 3. `components/` - 再利用可能な部品たち

画面を構成する各パーツ（検索フォーム、天気カードなど）です。部品化することで、コードの見通しが良くなり、管理しやすくなります。

- **`CitySearchForm.tsx`**: ユーザーが都市名を入力し、検索ボタンを押すためのフォームです。
- **`AutoCompleteSearch.tsx`**: ひらがなを入力すると、候補となる都市名をリスト表示する機能です。
- **`WeatherCard.tsx`**: 取得した天気情報をきれいに表示するためのカードです。
- **`ErrorMessage.tsx`**: エラーが起きたときに、メッセージを表示するための部品です。

### 4. `utils/weatherApi.ts` - 天気APIとの通信

外部の天気API(OpenWeatherMap)と通信するための、最も重要なファイルの一つです。

#### コードのポイント
- **`getApiKey`**: `process.env`からAPIキーを安全に取得します。APIキーのような秘密情報は、コードに直接書かずに「環境変数」として管理するのが基本です。
- **`fetchWeatherByCity`**:
    - `fetch`関数を使って、指定されたURLにリクエストを送信します。
    - `response.ok`で通信が成功したかチェックし、失敗した場合はステータスコードに応じて分かりやすいエラーメッセージを投げます。
    - 成功したら、`response.json()`でJSON形式のデータをJavaScriptのオブジェクトに変換します。
- **`mapApiResponseToWeatherData`**: APIから受け取った複雑なデータを、アプリで使いやすい`WeatherData`の形に変換します。これにより、他のファイルではデータの複雑な構造を意識せずに済みます。

---

## 🔄 アプリ全体の処理の流れ

1.  **ユーザー操作**: ユーザーが検索フォーム(`AutoCompleteSearch`)に都市名を入力します。
2.  **イベント発生**: 検索ボタンが押されると`page.tsx`の`handleSearch`関数が実行されます。
3.  **API通信**: `handleSearch`は`utils/weatherApi.ts`の`fetchWeatherByCity`を呼び出し、OpenWeatherMap APIに天気情報をリクエストします。
4.  **データ取得と変換**: APIからデータが返ってくると、アプリで使いやすい形式に変換されます。
5.  **状態更新**: `page.tsx`で`setWeather`が呼ばれ、取得したデータが`weather`という「状態」に保存されます。
6.  **再レンダリング**: 状態が変わったことをReactが検知し、画面を自動で再描画します。`WeatherCard`コンポーネントに天気データが渡されて画面に表示されます。
7.  **エラー処理**: もし途中でエラーが起きれば、`setError`が呼ばれ、`ErrorMessage`コンポーネントが表示されます。

---

## 🤔 初心者が理解すべき重要ポイント

### 1. 非同期処理とは？
インターネット通信のように時間がかかる処理は「非同期」で行われます。`async/await`を使うと、処理が終わるまで待ってから次のコードに進むことができます。
```typescript
// ✅ 正しい方法
const response = await fetch(url);  // データが来るまで待つ
const data = await response.json(); // 変換が終わるまで待つ
console.log(data); // OK！
```

### 2. 状態管理とは？
Reactでは、画面に表示するデータ（例：天気情報、ローディング状態）を「状態(state)」として管理します。`useState`フックを使い、状態が更新されると画面が自動的に再描画される仕組みです。
```typescript
const [weather, setWeather] = useState(null); // weatherという状態を定義
setWeather(newData); // 状態を更新すると画面が変わる！
```

### 3. propsとは？
親コンポーネントから子コンポーネントへデータを渡すための仕組みです。「プロパティ(properties)」の略です。
```typescript
// 親コンポーネント (page.tsx)
<WeatherCard weather={weatherData} />

// 子コンポーネント (WeatherCard.tsx)
function WeatherCard({ weather }) { // 親からweatherデータを受け取る
  return <div>{weather.city}</div>;
}
```

### 4. 環境変数とは？
APIキーなどの秘密情報をコードに直接書くのは非常に危険です。`.env.local`ファイルに情報を書き、`process.env`経由で安全に読み込むのが「環境変数」の仕組みです。

---

## 🚀 このアプリで学べること

- **React基礎**: コンポーネント分割、`useState`、`props`、条件付きレンダリング
- **JavaScript/TypeScript**: 非同期処理(`async/await`)、エラーハンドリング(`try/catch`)、型定義
- **Web開発**: 外部API連携、HTTPの基本、環境変数の安全な使い方

このアプリを通じて、モダンなWebアプリケーション開発の基礎をしっかり身につけましょう！