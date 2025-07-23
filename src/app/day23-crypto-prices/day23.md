# Day 23: 暗号通貨価格表示アプリ

## 今日学んだこと

### Next.js SSR (Server-Side Rendering) の基本
Next.jsのサーバーサイドレンダリング機能を使って、暗号通貨の現在価格をリアルタイムで表示するアプリを作成しました。

### 主要な学習ポイント

#### 1. App Router での Server Components とは
```typescript
// App Router用のServer Component（SSR）
export default async function CryptoPricesPage() {
  // Server Componentで直接APIを呼び出し（SSR）
  const cryptoData = await fetchPopularCryptos()
  
  return (
    <div>
      {/* サーバーで取得したデータを表示 */}
      {cryptoData.map(crypto => <CryptoCard key={crypto.id} crypto={crypto} />)}
    </div>
  )
}
```

**重要なポイント:**
- **Server Component**: Next.js App Routerのデフォルト実行環境（サーバーサイド）
- **async/await**: Server Component内で直接非同期処理が可能
- **毎回実行**: ページにアクセスするたびにサーバーで実行される
- **SEO対応**: HTMLに初期データが含まれるため、検索エンジンにも優しい

#### 2. App Router vs Pages Router の違い

| 方式 | SSR実装方法 | 実行場所 | 初期データ | SEO | パフォーマンス |
|------|-------------|----------|------------|-----|----------------|
| **App Router** (Server Components) | async function | サーバー | あり | 良い | 初期表示が速い |
| **Pages Router** (getServerSideProps) | export function | サーバー | あり | 良い | 初期表示が速い |
| **CSR** (useEffect + fetch) | Client Component | ブラウザ | なし | 劣る | ローディングが必要 |

#### 3. 環境変数の管理
```bash
# .env.local ファイル
NEXT_PUBLIC_COINGECKO_API_URL=https://api.coingecko.com/api/v3
```

**セキュリティの考慮:**
- `NEXT_PUBLIC_` プレフィックス: ブラウザ側でも利用可能
- プレフィックスなし: サーバー側のみで利用可能
- APIキーなどの機密情報は**プレフィックスなし**で管理

#### 4. 外部API連携の実装パターン
```typescript
// APIから暗号通貨データを取得
const response = await fetch('https://api.coingecko.com/api/v3/coins/markets')
const data = await response.json()
```

#### 5. TypeScript型定義の重要性
```typescript
interface CryptoData {
  id: string
  name: string
  current_price: number
  price_change_percentage_24h: number
  // ...
}
```

### 実用的な例え話

#### レストランの例で理解するSSR
- **SSR**: レストランで料理が既に盛り付けられた状態で提供される
  - お客様（ブラウザ）はすぐに食べられる
  - 厨房（サーバー）で事前に準備
  
- **CSR**: レストランで材料だけ提供され、お客様が自分で調理
  - お客様（ブラウザ）が調理時間を待つ必要がある
  - 調理（データフェッチ）はテーブルで実行

### 技術的なメリット・デメリット

#### SSRのメリット
1. **SEO対応**: 検索エンジンが初期データを認識
2. **初期表示速度**: データがHTMLに含まれている
3. **安全性**: APIキーをサーバー側で管理可能

#### SSRのデメリット
1. **サーバー負荷**: 毎回サーバー処理が必要
2. **応答時間**: 外部API呼び出しでレスポンスが遅延
3. **キャッシュ複雑性**: 適切なキャッシュ戦略が必要

### 今後の応用可能性
1. **eコマースサイト**: 商品価格のリアルタイム表示
2. **ニュースサイト**: 最新記事の自動更新
3. **ダッシュボード**: 各種指標のリアルタイム監視
4. **予約システム**: 空室状況のリアルタイム反映

### 学習のポイント
- **App Router の Server Components** は Next.js 13以降の推奨実装方法
- SSRは「最新のデータが必要」かつ「SEOが重要」な場面で威力を発揮
- 暗号通貨のような変動の激しいデータには最適
- **従来の Pages Router** (`getServerSideProps`) との実装方法の違いを理解することが重要
- Server Components では **async/await** を直接使用でき、よりシンプルな実装が可能 