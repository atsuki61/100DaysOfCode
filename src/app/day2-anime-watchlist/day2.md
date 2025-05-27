## はじめに

100DaysOfCodeチャレンジのDay2として、Reactでアニメ視聴リストアプリを作成しました！
この記事では、初心者の方にも分かりやすく、アニメ視聴リストの**ロジック部分**を詳しく解説していきます。

## 完成したアプリの機能

- 🎬 アニメ作品の一覧表示
- ✅ 視聴済み状態の切り替え
- 📊 統計情報の自動計算（総作品数・視聴済み数・視聴率）
- 🏷️ ジャンル・年代・話数の表示
- 📱 レスポンシブデザイン対応

## 1. データ構造の設計

まず、アニメデータの「型」を定義します。

```typescript
interface Anime {
  id: number        // 一意識別子
  title: string     // アニメタイトル
  genre: string     // ジャンル
  year: number      // 放送年
  episodes: number  // 話数
  watched: boolean  // 視聴済みフラグ
}
```

🎯 **設計のポイント**
- **`id`**: 各アニメを一意に識別するためのキー
- **`watched`**: boolean型で視聴状態を管理
- **数値型**: year、episodesで計算処理を可能に

## 2. 初期データの準備

実際のアニメデータを配列で管理します。

```typescript
const initialAnimeList: Anime[] = [
  { id: 1, title: '鬼滅の刃', genre: 'アクション', year: 2019, episodes: 26, watched: false },
  { id: 2, title: '呪術廻戦', genre: 'アクション', year: 2020, episodes: 24, watched: false },
  { id: 3, title: '進撃の巨人', genre: 'アクション', year: 2013, episodes: 25, watched: true },
  // ... 他のアニメデータ
]
```

📝 **データ設計の工夫**
- **多様なジャンル**: アクション、ロマンス、コメディなど
- **異なる話数**: 1話（映画）から1000話（長期シリーズ）まで
- **初期状態**: 一部を視聴済みに設定してデモ効果を演出

## 3. 状態管理（useState）

アニメリストの状態を管理します。

```typescript
const [animeList, setAnimeList] = useState<Anime[]>(initialAnimeList)
```

🔍 **型安全性の確保**
- **`useState<Anime[]>`**: TypeScriptで型を明示
- **初期値**: `initialAnimeList`で初期データを設定
- **イミュータブル**: 状態は直接変更せず、新しい配列を作成

## 4. 視聴状態切り替えロジック

チェックボックスクリック時の処理です。

```typescript
const toggleWatched = (id: number) => {
  setAnimeList(prevList =>
    prevList.map(anime =>
      anime.id === id ? { ...anime, watched: !anime.watched } : anime
    )
  )
}
```

### 🎯 ロジックの詳細解説

```typescript
// ステップ1: 前の状態を取得
prevList => 

// ステップ2: 各アニメをチェック
prevList.map(anime =>

// ステップ3: IDが一致するかチェック
anime.id === id ? 

// ステップ4-A: 一致する場合、watchedを反転
{ ...anime, watched: !anime.watched } : 

// ステップ4-B: 一致しない場合、そのまま返す
anime
```

**スプレッド演算子の活用**
```typescript
// 元のオブジェクト
{ id: 1, title: '鬼滅の刃', watched: false }

// スプレッド演算子で新しいオブジェクト作成
{ ...anime, watched: !anime.watched }
// 結果: { id: 1, title: '鬼滅の刃', watched: true }
```

## 5. 統計情報の計算

リアルタイムで統計を計算します。

```typescript
// 総作品数
const totalAnime = animeList.length

// 視聴済み作品数
const watchedCount = animeList.filter(anime => anime.watched).length

// 視聴率（パーセンテージ）
const watchedPercentage = Math.round((watchedCount / totalAnime) * 100)
```

### 🧮 計算の具体例

```typescript
// 例: 10作品中3作品視聴済みの場合
totalAnime = 10
watchedCount = 3
watchedPercentage = Math.round((3 / 10) * 100) = Math.round(30) = 30
```

**`filter`メソッドの動作**
```typescript
// 元の配列
[
  { id: 1, watched: true },   // ✅ 条件に一致
  { id: 2, watched: false },  // ❌ 条件に不一致
  { id: 3, watched: true }    // ✅ 条件に一致
]

// filter結果
[
  { id: 1, watched: true },
  { id: 3, watched: true }
]
// length = 2
```

## 6. 条件付きスタイリング

視聴状態に応じてUIを変更します。

```typescript
className={`bg-white rounded-lg shadow-md p-6 transition-all duration-200 hover:shadow-lg border-l-4 ${
  anime.watched 
    ? 'border-l-green-500 bg-green-50'      // 視聴済み: 緑
    : 'border-l-gray-300 hover:border-l-purple-400'  // 未視聴: グレー
}`}
```

🎨 **視覚的フィードバック**
- **視聴済み**: 緑の左境界線 + 薄緑背景
- **未視聴**: グレーの左境界線 + ホバーで紫に変化
- **トランジション**: 200msで滑らかな変化

## 7. カスタムチェックボックスの実装

標準チェックボックスをカスタマイズしています。

```typescript
<label className="flex items-center cursor-pointer ml-4">
  <input
    type="checkbox"
    checked={anime.watched}
    onChange={() => toggleWatched(anime.id)}
    className="sr-only" // 視覚的に隠す
  />
  <div className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${
    anime.watched
      ? 'bg-green-500 border-green-500'
      : 'bg-white border-gray-300 hover:border-green-400'
  }`}>
    {anime.watched && (
      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
      </svg>
    )}
  </div>
</label>
```

### 🎯 カスタマイズのメリット
- **統一感**: アプリ全体のデザインと調和
- **視覚的明確さ**: 状態が一目で分かる
- **アクセシビリティ**: スクリーンリーダー対応

## 8. レスポンシブグリッドレイアウト

画面サイズに応じてカード表示を調整します。

```typescript
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {animeList.map(anime => (
    // アニメカードの内容
  ))}
</div>
```

📱 **レスポンシブの段階**
- **モバイル（〜768px）**: 1列表示
- **タブレット（768px〜1024px）**: 2列表示  
- **デスクトップ（1024px〜）**: 3列表示

### 統計カードも同様にレスポンシブ対応

```typescript
<div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
  <div className="p-4 bg-purple-50 rounded-lg">
    <div className="text-2xl font-bold text-purple-800">{totalAnime}</div>
    <div className="text-sm text-gray-600">総作品数</div>
  </div>
  // 他の統計カード...
</div>
```

## まとめ

このアニメ視聴リストアプリで学べるReactの重要概念：

1. **配列状態管理**: 複数のオブジェクトを含む配列の操作
2. **イミュータブル更新**: スプレッド演算子を使った安全な状態更新
3. **配列メソッド**: `map`、`filter`を使ったデータ変換
4. **条件付きレンダリング**: 状態に応じたUI変更
5. **計算プロパティ**: 状態から派生する値の算出
6. **レスポンシブデザイン**: グリッドレイアウトの活用
7. **カスタムコンポーネント**: 標準要素のカスタマイズ
8. **TypeScript活用**: 型安全なデータ操作

## 次のステップ

- 🔍 検索・フィルター機能の追加
- ➕ 新しいアニメの追加機能
- 🗑️ アニメの削除機能
- ⭐ 評価システムの実装
- 💾 ローカルストレージでのデータ永続化
- 📈 より詳細な統計情報

配列操作とデータ管理の基礎がしっかり学べるアプリです！
実際のWebアプリケーションでよく使われるパターンが詰まっています 🚀 