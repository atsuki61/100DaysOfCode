## はじめに

Day8: Reactでアニメキャラクター検索アプリを作成しました！

## 完成したアプリの機能

- 🔍 リアルタイム検索（入力と同時にフィルタリング）
- 📝 複数フィールド検索（名前、アニメ名、説明、掲載誌）
- 🎯 大文字小文字を区別しない検索
- 🈳 **ひらがな・カタカナ対応検索**（「なると」で「ナルト」を検索可能）
- ❌ 検索クリア機能
- 📊 検索結果の統計表示
- 🎴 美しいカード形式でのキャラクター表示
- 🏷️ カテゴリ別の色分け表示
- 📱 レスポンシブデザイン対応
- 🖼️ **ローカル画像対応**（Unsplashから@imagesフォルダに変更）

## 1. データ構造の設計

アニメキャラクター検索で管理する状態とデータを定義します。

```typescript
// キャラクターの型定義
interface AnimeCharacter {
  id: number
  name: string
  animeName: string
  description: string
  imageUrl?: string
  category: 'protagonist' | 'antagonist' | 'supporting'
  series: string
}

// 検索状態の管理
const [searchQuery, setSearchQuery] = useState('')  // 検索文字列
const filteredCharacters = []                       // フィルタ済みキャラクター
```

この構造により、複雑な検索機能を効率的に管理できます。`searchQuery`が実際の検索文字列、`filteredCharacters`がフィルタリング結果を保持します。

🎯 **設計のポイント**
- **`searchQuery`**: ユーザーの入力内容をリアルタイムで保持
- **`filteredCharacters`**: 検索条件に一致するキャラクターのみを格納
- **`category`**: Union型で型安全性を確保

## 2. リストフィルタリングの核心（useMemo）

検索機能の心臓部となるフィルタリング処理です。

```typescript
const filteredCharacters = useMemo(() => {
  // 検索クエリが空の場合は全件表示
  if (!searchQuery.trim()) {
    return characters
  }

  // 検索クエリを小文字に変換（大文字小文字を区別しない検索）
  const query = searchQuery.toLowerCase().trim()
  
  // 複数フィールドでの部分一致検索
  return characters.filter(character => 
    character.name.toLowerCase().includes(query) ||         // 名前
    character.animeName.toLowerCase().includes(query) ||   // アニメ名
    character.description.toLowerCase().includes(query) || // 説明
    character.series.toLowerCase().includes(query)         // 掲載誌
  )
}, [characters, searchQuery])  // 依存配列：charactersまたはsearchQueryが変化したときのみ実行
```

これがアニメキャラクター検索の「エンジン」部分です。`searchQuery`が変更されるたびに自動的にフィルタリングが実行され、リアルタイム検索を実現します。

### 🔍 詳細解説

**`useMemo`の仕組み**
```typescript
// useMemoは「重い計算」を記憶する
const expensiveValue = useMemo(() => {
  console.log('計算実行！')  // 依存配列の値が変わったときのみ実行
  return heavyCalculation()
}, [dependency])

// 通常の計算（毎回実行される）
const normalValue = heavyCalculation()  // 毎回実行される（非効率）
```

`useMemo`は「前回と同じ条件なら前回の結果を使い回す」仕組みです。検索処理は重い計算になる可能性があるため、不要な再計算を防ぎます。

**複数フィールド検索の威力**
```typescript
// 例：「ルフィ」で検索した場合
character.name.toLowerCase().includes('ルフィ')         // ✅ "モンキー・D・ルフィ"
character.animeName.toLowerCase().includes('ルフィ')   // ❌ "ワンピース"
character.description.toLowerCase().includes('ルフィ') // ❌ "麦わらの一味の船長..."
character.series.toLowerCase().includes('ルフィ')      // ❌ "週刊少年ジャンプ"

// 結果：1つでもtrue（||演算子）なので、このキャラクターは表示される
```

OR演算子（`||`）により、どれか一つのフィールドでも一致すれば検索結果に含まれます。これにより、ユーザーは様々な角度から検索できます。

### 🚨 パフォーマンス最適化のポイント

```typescript
// ❌ パフォーマンスが悪い例
const filteredCharacters = characters.filter(character => 
  character.name.toLowerCase().includes(searchQuery.toLowerCase())  // 毎回toLowerCase()
)

// ✅ パフォーマンスが良い例
const query = searchQuery.toLowerCase().trim()  // 一度だけ変換
const filteredCharacters = characters.filter(character => 
  character.name.toLowerCase().includes(query)  // 変換済みのqueryを使用
)
```

検索クエリの前処理を一度だけ行うことで、フィルタリング中の無駄な処理を削減できます。

## 3. 制御された入力（Controlled Input）

検索フィールドの状態管理を理解しましょう。

```typescript
// ❌ 制御されていない入力（推奨されない）
<input 
  placeholder="検索..." 
  onChange={(e) => setSearchQuery(e.target.value)}
/>
// → valueが指定されていないため、Reactが状態を完全に制御できない

// ✅ 制御された入力（推奨）
<input
  type="text"
  value={searchQuery}                              // Reactが値を管理
  onChange={(e) => setSearchQuery(e.target.value)} // 変更をReactに通知
  placeholder="キャラクター名やアニメ名で検索..."
/>
```

「制御された入力」は、フィールドの値をReactの状態で完全に管理する方法です。これにより、値の変更を確実に捕捉でき、リアルタイム検索が可能になります。

### 🎯 制御された入力の特徴

```typescript
const [searchQuery, setSearchQuery] = useState('')

// 特徴1: 値はReactの状態から来る
<input value={searchQuery} />  // 常にsearchQueryの値が表示される

// 特徴2: 変更はイベントハンドラーで処理
onChange={(e) => setSearchQuery(e.target.value)}

// 特徴3: プログラムから値を変更できる
const clearSearch = () => setSearchQuery('')  // ボタンで検索をクリア
```

この仕組みにより、検索フィールドの値を完全にコントロールでき、クリアボタンやリセット機能を簡単に実装できます。

## 4. カスタムフックによる複雑なロジックの分離

検索機能を再利用可能にするカスタムフックを作成します。

```typescript
// useCharacterSearch.ts
export function useCharacterSearch(characters: AnimeCharacter[]) {
  const [searchQuery, setSearchQuery] = useState('')

  // フィルタリング処理（重い計算をメモ化）
  const filteredCharacters = useMemo(() => {
    if (!searchQuery.trim()) return characters
    
    const query = searchQuery.toLowerCase().trim()
    return characters.filter(character => 
      character.name.toLowerCase().includes(query) ||
      character.animeName.toLowerCase().includes(query) ||
      character.description.toLowerCase().includes(query) ||
      character.series.toLowerCase().includes(query)
    )
  }, [characters, searchQuery])

  // 統計情報の計算
  const searchStats = useMemo(() => ({
    total: characters.length,
    filtered: filteredCharacters.length,
    isSearching: searchQuery.trim().length > 0
  }), [characters.length, filteredCharacters.length, searchQuery])

  return {
    searchQuery,        // 現在の検索クエリ
    setSearchQuery,     // 検索クエリを更新する関数
    filteredCharacters, // フィルタ済みのキャラクター
    searchStats        // 検索の統計情報
  }
}
```

カスタムフックは「関数コンポーネントの中でしか使えない特別な関数」です。複雑なロジックを分離し、他のコンポーネントでも再利用できるようにします。

### 🔧 使用例

```typescript
// コンポーネントでの使用
const MyComponent = () => {
  const {
    searchQuery,
    setSearchQuery,
    filteredCharacters,
    searchStats
  } = useCharacterSearch(animeCharacters)

  return (
    <div>
      <input 
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <p>{searchStats.filtered}件の結果</p>
      {filteredCharacters.map(character => (
        <div key={character.id}>{character.name}</div>
      ))}
    </div>
  )
}
```

### 🎯 カスタムフックの利点

```typescript
// 利点1: ロジックの再利用
const searchHookA = useCharacterSearch(charactersA)
const searchHookB = useCharacterSearch(charactersB)

// 利点2: テストのしやすさ
// フックの動作を単体でテストできる

// 利点3: 関心の分離
// UIの描画とロジックを分離できる
```

カスタムフックにより、「何を表示するか」と「どのように検索するか」を分離でき、コードがより読みやすくなります。

## 5. 検索統計の動的表示

ユーザーに検索状況を分かりやすく伝えます。

```typescript
// 検索統計の計算
const searchStats = useMemo(() => ({
  total: characters.length,                    // 全キャラクター数
  filtered: filteredCharacters.length,        // 検索結果数
  isSearching: searchQuery.trim().length > 0  // 検索中かどうか
}), [characters.length, filteredCharacters.length, searchQuery])

// 動的な表示
{searchStats.isSearching ? (
  <span>
    「{searchQuery}」の検索結果: {searchStats.filtered}件 
    （全{searchStats.total}件中）
  </span>
) : (
  <span>全{searchStats.total}件のキャラクターを表示中</span>
)}
```

これにより、ユーザーは現在の状況を把握しやすくなります。「何件中何件が表示されているか」を明確に示すことで、ユーザビリティが向上します。

### 🎨 ユーザーフィードバックの重要性

```typescript
// パターン1: 検索前
"全12件のキャラクターを表示中"

// パターン2: 検索中（結果あり）
"「ナルト」の検索結果: 2件（全12件中）"

// パターン3: 検索中（結果なし）
"「存在しないキャラ」の検索結果: 0件（全12件中）"
```

状況に応じたメッセージにより、ユーザーは迷うことなくアプリを使用できます。

## 6. 条件付きレンダリングによるエラーハンドリング

検索結果がない場合の適切な表示を実装します。

```typescript
// メインの表示ロジック
{filteredCharacters.length > 0 ? (
  // 結果がある場合：キャラクターリストを表示
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    {filteredCharacters.map((character) => (
      <CharacterCard key={character.id} character={character} />
    ))}
  </div>
) : (
  // 結果がない場合：分かりやすいメッセージを表示
  <div className="text-center py-12">
    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 max-w-md mx-auto shadow-sm">
      <SearchIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
      <h3 className="text-xl font-semibold text-gray-700 mb-2">
        検索結果が見つかりません
      </h3>
      <p className="text-gray-500 mb-4">
        「{searchQuery}」に一致するキャラクターがありません。
      </p>
      <button
        onClick={() => setSearchQuery('')}
        className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
      >
        検索をリセット
      </button>
    </div>
  </div>
)}
```

「検索結果がない」という状況は避けられないため、ユーザーにとって分かりやすく、次のアクションを促すUIを提供します。

### 🎯 良いエラー表示の特徴

```typescript
// ❌ 悪い例
{filteredCharacters.length === 0 && <div>結果なし</div>}

// ✅ 良い例
{filteredCharacters.length === 0 && (
  <div className="helpful-message">
    <Icon />                           // 視覚的な手がかり
    <h3>検索結果が見つかりません</h3>     // 分かりやすいタイトル
    <p>「{searchQuery}」に一致する...</p> // 具体的な説明
    <button onClick={clearSearch}>     // 次のアクションを提示
      検索をリセット
    </button>
  </div>
)}
```

良いエラー表示は「何が起こったか」「なぜ起こったか」「どうすればよいか」を明確に伝えます。

## 7. 検索フィールドのUX向上

使いやすい検索入力を実装するテクニック集です。

```typescript
// SearchBarコンポーネント
export default function SearchBar({ searchQuery, onSearchChange, placeholder }: SearchBarProps) {
  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="relative">
        {/* 検索アイコン */}
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        
        {/* 入力フィールド */}
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 shadow-sm bg-white/80 backdrop-blur-sm"
        />
        
        {/* クリアボタン（入力がある場合のみ表示） */}
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="検索をクリア"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  )
}
```

### 🎨 UXのポイント

**1. 視覚的なヒント**
```typescript
// 検索アイコンで「ここで検索できる」ことを示す
<Search className="absolute left-3 ..." />

// プレースホルダーで使用方法を説明
placeholder="キャラクター名やアニメ名で検索..."
```

**2. インタラクティブなフィードバック**
```typescript
// フォーカス時の視覚的変化
className="... focus:ring-2 focus:ring-purple-500 focus:border-transparent ..."

// ホバー時の変化
className="... hover:text-gray-600 transition-colors"
```

**3. 条件付きUI要素**
```typescript
// 入力があるときのみクリアボタンを表示
{searchQuery && (
  <button onClick={() => onSearchChange('')}>
    <X className="w-5 h-5" />
  </button>
)}
```

## 8. ひらがな・カタカナ対応検索の実装

日本語の特性に対応した検索機能を実装しました。

```typescript
// searchUtils.ts
/**
 * カタカナをひらがなに変換する関数
 */
export function katakanaToHiragana(str: string): string {
  return str.replace(/[\u30A1-\u30F6]/g, (match) => {
    const char = match.charCodeAt(0) - 0x60  // Unicode差分で変換
    return String.fromCharCode(char)
  })
}

/**
 * 文字列がひらがな・カタカナでマッチするかチェック
 */
export function matchesWithKanaConversion(text: string, query: string): boolean {
  const normalizedText = katakanaToHiragana(text.toLowerCase())
  const normalizedQuery = katakanaToHiragana(query.toLowerCase())
  
  // ひらがな変換後の文字列で検索
  if (normalizedText.includes(normalizedQuery)) {
    return true
  }
  
  // カタカナ変換後の文字列でも検索
  const katakanaText = hiraganaToKatakana(text.toLowerCase())
  const katakanaQuery = hiraganaToKatakana(query.toLowerCase())
  
  return katakanaText.includes(katakanaQuery)
}
```

### 🔤 Unicode文字コード変換の仕組み

```typescript
// カタカナ「ナ」(U+30CA) → ひらがな「な」(U+306A)
// 差分: 0x30CA - 0x306A = 0x60 (96)

// 変換処理
const katakanaChar = 'ナ'  // U+30CA
const code = katakanaChar.charCodeAt(0)  // 0x30CA = 12490
const hiraganaCode = code - 0x60         // 12490 - 96 = 12394 = 0x306A
const hiraganaChar = String.fromCharCode(hiraganaCode)  // 'な'
```

この仕組みにより、以下のような柔軟な検索が可能になります：

**検索例**
```typescript
// 「なると」で検索 → 「ナルト」「なると」両方にマッチ
matchesWithKanaConversion("うずまきナルト", "なると")  // true
matchesWithKanaConversion("うずまきなると", "ナルト")  // true

// 「ルフィ」で検索 → 「ルフィ」「るふぃ」両方にマッチ  
matchesWithKanaConversion("モンキー・D・ルフィ", "るふぃ")  // true
```

### 🎯 実装のメリット

**1. ユーザビリティの向上**
```typescript
// ❌ 従来の検索（完全一致が必要）
"ナルト".includes("なると")  // false - マッチしない

// ✅ ひらがな対応検索（柔軟にマッチ）
matchesWithKanaConversion("ナルト", "なると")  // true - マッチする
```

**2. 入力方法の自由度**
```typescript
// ひらがな入力で検索
query: "なると" → matches: "ナルト", "なると"

// カタカナ入力で検索  
query: "ナルト" → matches: "ナルト", "なると"

// 混在入力にも対応
query: "なルト" → matches: "ナルト", "なると"
```

**3. 日本語IMEの入力状態への対応**
```typescript
// IMEで「なると」と入力中 → 「ナルト」を検索可能
// IMEで「ナルト」と入力中 → 「なると」も検索可能
```

## 9. ローカル画像パスの管理

外部画像サービス（Unsplash）からローカル画像に変更しました。

```typescript
// ❌ 以前（外部画像URL）
imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop&crop=face"

// ✅ 現在（ローカル画像パス）
imageUrl: "/images/anime-characters/luffy.jpg"
```

### 📁 画像ファイル構成
```
public/
└── images/
    └── anime-characters/
        ├── luffy.jpg        # モンキー・D・ルフィ
        ├── naruto.jpg       # うずまきナルト
        ├── tanjiro.jpg      # 竈門炭治郎
        ├── goku.jpg         # 孫悟空
        ├── edward.jpg       # エドワード・エルリック
        ├── frieza.jpg       # フリーザ
        ├── sasuke.jpg       # うちはサスケ
        ├── nezuko.jpg       # 竈門禰豆子
        ├── zoro.jpg         # ロロノア・ゾロ
        ├── sailormoon.jpg   # セーラームーン
        ├── asuka.jpg        # アスカ・ラングレー
        └── giyu.jpg         # 冨岡義勇
```

### 🚀 ローカル画像のメリット

**1. パフォーマンスの向上**
```typescript
// 外部API依存なし → 高速読み込み
// CDN不要 → 安定したパフォーマンス
// Next.js最適化 → 自動的な画像最適化
```

**2. 安定性の確保**
```typescript
// 外部サービス障害の影響なし
// API制限やレート制限の心配なし
// 画像の突然の削除リスクなし
```

**3. 開発・デプロイの簡素化**
```typescript
// next.config.ts の remotePatterns 設定不要
// 外部画像ホストの設定不要
// 画像の一元管理が可能
```

## 10. TypeScriptによる型安全性

型定義で堅牢なアプリケーションを作ります。

```typescript
// 基本的な型定義
export interface AnimeCharacter {
  id: number
  name: string
  animeName: string
  description: string
  imageUrl?: string  // オプショナル（画像がない場合もある）
  category: 'protagonist' | 'antagonist' | 'supporting'  // Union型で制限
  series: string
}

// 検索状態の型
export interface SearchState {
  query: string
  filteredCharacters: AnimeCharacter[]
}

// プロパティの型定義
interface SearchBarProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  placeholder?: string  // オプショナル
}
```

### 🛡️ 型安全性の利点

**1. エラーの早期発見**
```typescript
// ❌ この間違いはコンパイル時に発見される
const character: AnimeCharacter = {
  id: 1,
  name: "ルフィ",
  category: "hero"  // エラー！"protagonist" | "antagonist" | "supporting" のいずれかでないといけない
}

// ✅ 正しい書き方
const character: AnimeCharacter = {
  id: 1,
  name: "ルフィ",
  category: "protagonist"  // OK
}
```

**2. IDEの支援機能**
```typescript
// character. と入力すると、利用可能なプロパティが自動表示される
character.name       // ✅ 使用可能
character.animeName  // ✅ 使用可能
character.invalid    // ❌ 存在しないプロパティはエラー表示
```

**3. リファクタリングの安全性**
```typescript
// プロパティ名を変更した場合、すべての使用箇所でエラーが表示される
// → 変更漏れを防げる
```

## 11. パフォーマンス最適化のベストプラクティス

Reactアプリケーションを高速化するテクニックです。

```typescript
// 1. useMemoによる重い計算のメモ化
const filteredCharacters = useMemo(() => {
  // 重いフィルタリング処理
  return expensiveFilterOperation(characters, searchQuery)
}, [characters, searchQuery])  // 依存配列が変わったときのみ実行

// 2. useCallbackによる関数のメモ化
const handleSearchChange = useCallback((query: string) => {
  setSearchQuery(query)
}, [])  // 依存配列が空なので、コンポーネントの生存期間中は同じ関数インスタンス

// 3. React.memoによるコンポーネントのメモ化
const CharacterCard = React.memo(({ character }: CharacterCardProps) => {
  return (
    <div>
      {/* カードの内容 */}
    </div>
  )
})  // character プロパティが変わったときのみ再レンダリング
```

### 🎯 最適化の判断基準

```typescript
// ❌ すべてをメモ化する（過度な最適化）
const simpleValue = useMemo(() => a + b, [a, b])  // 単純な計算には不要

// ✅ 重い処理のみメモ化する
const expensiveValue = useMemo(() => {
  return heavyCalculation(largeArray)  // 重い計算のみ
}, [largeArray])
```

パフォーマンス最適化は「必要なときに、必要な分だけ」が鉄則です。過度な最適化はコードを複雑にするだけで効果がない場合があります。

## 12. アクセシビリティの考慮

誰でも使いやすいアプリケーションにするポイントです。

```typescript
// 1. 適切なラベル
<input
  type="text"
  value={searchQuery}
  onChange={(e) => onSearchChange(e.target.value)}
  placeholder="キャラクター名やアニメ名で検索..."
  aria-label="アニメキャラクター検索"  // スクリーンリーダー向け
/>

// 2. ボタンの説明
<button
  onClick={() => onSearchChange('')}
  aria-label="検索をクリア"  // アイコンのみのボタンには必須
>
  <X className="w-5 h-5" />
</button>

// 3. 検索結果の情報提供
<div aria-live="polite" aria-atomic="true">
  {searchStats.isSearching ? (
    <span>「{searchQuery}」の検索結果: {searchStats.filtered}件</span>
  ) : (
    <span>全{searchStats.total}件のキャラクターを表示中</span>
  )}
</div>
```

### ♿ アクセシビリティのポイント

**1. キーボードナビゲーション**
```typescript
// Enterキーでの検索、Escapeキーでのクリア
<input
  onKeyDown={(e) => {
    if (e.key === 'Escape') {
      onSearchChange('')
    }
  }}
/>
```

**2. 視覚的なフィードバック**
```typescript
// フォーカス状態の明確な表示
className="focus:ring-2 focus:ring-purple-500 focus:outline-none"
```

**3. スクリーンリーダー対応**
```typescript
// 動的な内容の変更を通知
<div aria-live="polite">  // 内容変更時に自動読み上げ
  検索結果: {results.length}件
</div>
```

## まとめ

このアニメキャラクター検索アプリで学べるReactの重要概念：

1. **useMemo**: 重い計算処理の最適化
2. **制御された入力**: フォーム状態の完全な管理
3. **カスタムフック**: ロジックの分離と再利用
4. **条件付きレンダリング**: 状況に応じたUI表示
5. **文字列操作**: 柔軟な検索機能の実装
6. **TypeScript**: 型安全性による堅牢なコード
7. **パフォーマンス最適化**: アプリケーションの高速化
8. **アクセシビリティ**: 誰でも使いやすいUI
9. **ユーザビリティ**: 直感的で分かりやすいUX
10. **エラーハンドリング**: 適切なフィードバック提供
11. **ひらがな・カタカナ対応検索**: 日本語の特性に対応
12. **ローカル画像パスの管理**: 外部画像サービスからローカルに変更

## 次のステップ

- 🔍 より高度な検索（あいまい検索、正規表現）
- 📊 並び替え機能（名前順、人気順）
- 🏷️ カテゴリフィルター（複数選択可能）
- ⭐ お気に入り機能（ローカルストレージ活用）
- 📱 無限スクロール（大量データ対応）
- 🎨 アニメーション効果（フェードイン・アウト）
- 💾 検索履歴の保存
- 🔗 URLでの検索状態共有
- 📱 PWA対応（オフライン検索）

リストフィルタリングと文字列操作の理解が深まる重要なアプリです！
検索機能は現代のWebアプリケーションにおいて必須の機能なので、今回学んだパターンは様々な場面で活用できます 🚀 