# Day 24: ポケモン図鑑アプリ（動的ルーティング）

## 📚 今日学んだこと

### Next.jsの動的ルーティング
Next.jsのApp Routerでは、`[slug]`という形式のディレクトリを作成することで動的ルーティングを実装できます。

```
src/app/day24-pokemon-pokedex/
├── page.tsx                 # 一覧ページ
├── [name]/
│   └── page.tsx            # 詳細ページ (動的ルーティング)
└── layout.tsx              # 共通レイアウト
```

### 外部API連携
PokéAPIを使用してポケモンの情報を取得しました。これは実際のプロダクトでよくあるパターンです。

## 🔧 実装した機能

### 1. ポケモン一覧表示
- 50匹のポケモンを格子状に表示
- 検索機能（名前・番号）
- レスポンシブデザイン

### 2. ポケモン詳細ページ
- 動的ルーティング（`/day24-pokemon-pokedex/[name]`）
- 基本情報（身長・体重・タイプ）
- ステータス表示（プログレスバー）
- 特性一覧

### 3. エラーハンドリング
- ローディング状態
- エラー表示とリトライ機能
- 404エラー対応

## 💡 重要なポイント

### 動的ルーティングの仕組み
```typescript
// [name]/page.tsx
interface PokemonDetailPageProps {
  params: {
    name: string;  // URLの[name]部分が入る
  };
}

export default function PokemonDetailPage({ params }: PokemonDetailPageProps) {
  // params.name を使ってAPIからデータを取得
  const pokemonData = await getPokemonDetails(params.name);
  // ...
}
```

### Promise.allを使った並行処理
```typescript
// 複数のポケモンデータを並行取得
const pokemonDetailsPromises = list.map(async (pokemon) => {
  const id = extractPokemonIdFromUrl(pokemon.url);
  const details = await getPokemonDetails(id);
  return formatPokemonData(details);
});

const formattedPokemon = await Promise.all(pokemonDetailsPromises);
```

### TypeScriptでの型安全性
```typescript
// APIレスポンスの型定義
export interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string;
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
  // ...
}

// 表示用に整形された型
export interface FormattedPokemon {
  id: number;
  name: string;
  displayName: string;  // 日本語名
  image: string;
  types: string[];
  height: string;       // "1.7m" 形式
  weight: string;       // "69.0kg" 形式
  // ...
}
```

## 🎨 デザインのポイント

### グラデーション背景
```css
/* ポケモンらしい綺麗なグラデーション */
bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50
```

### タイプ別の色分け
```typescript
export const TYPE_COLORS: Record<string, string> = {
  fire: 'bg-red-500',
  water: 'bg-blue-500',
  grass: 'bg-green-500',
  electric: 'bg-yellow-400',
  // ...
};
```

### プログレスバーでステータス表示
```typescript
<div className="w-full bg-gray-200 rounded-full h-3">
  <div 
    className="bg-gradient-to-r from-green-400 to-blue-500 h-3 rounded-full transition-all duration-1000"
    style={{ width: `${Math.min((value / maxStatValue) * 100, 100)}%` }}
  />
</div>
```

## 📱 レスポンシブ対応

### グリッドレイアウト
```css
/* スマホからデスクトップまで対応 */
grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5
```

### モバイルファーストデザイン
- 小さい画面では1列表示
- 画面サイズに応じて列数を増やす

## 🚀 パフォーマンス最適化

### Next.js Image コンポーネント
```typescript
<Image
  src={pokemon.image}
  alt={pokemon.displayName}
  fill
  className="object-contain"
  sizes="(max-width: 768px) 80px, 80px"
  priority  // 重要な画像は優先読み込み
/>
```

### 適切な型定義
- TypeScriptでランタイムエラーを防止
- APIレスポンスの型安全性を確保

## 🛠️ 使用技術

- **Next.js 15.3.2** - App Router、動的ルーティング
- **React 19.0.0** - useState、useEffect
- **TypeScript** - 型安全性
- **Tailwind CSS** - スタイリング
- **PokéAPI** - 外部API

## 🧪 学習のポイント

### 1. 動的ルーティングの理解
- `[slug]` ディレクトリの作成方法
- paramsオブジェクトの受け取り方
- 404エラーの適切な処理

### 2. 非同期処理の最適化
- Promise.allで並行処理
- ローディング状態の管理
- エラーハンドリングのベストプラクティス

### 3. TypeScriptの活用
- APIレスポンスの型定義
- propsの型安全性
- ランタイムエラーの防止

### 4. UX設計
- 検索機能の実装
- ローディング状態の表示
- エラー時のリトライ機能

## 🔄 改善点・今後の課題

1. **パフォーマンス向上**
   - 仮想スクロール（大量データ対応）
   - 画像の遅延読み込み
   - データのキャッシュ機能

2. **機能拡張**
   - お気に入り機能
   - 詳細検索（タイプ・世代別）
   - ポケモン比較機能

3. **アクセシビリティ**
   - キーボードナビゲーション
   - スクリーンリーダー対応
   - 色覚障害への配慮

## 📚 参考資料

- [Next.js App Router ドキュメント](https://nextjs.org/docs/app)
- [PokéAPI](https://pokeapi.co/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## 🎯 次回への継続

明日はNext.jsのSSR（Server-Side Rendering）について学習し、より高度なレンダリング戦略を学んでいきます！ 