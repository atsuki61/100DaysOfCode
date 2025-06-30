# Day 14: 英単語辞書アプリ

## 📚 概要
英単語を入力すると詳細な意味、発音、例文、同義語・反義語を表示する辞書アプリです。
外部API（Free Dictionary API）を利用して、複雑なJSONデータを処理し、ローディング状態を管理する実践的なアプリケーションを作成しました。

## 🎯 学習目標
- 外部辞書APIの利用
- 非同期データ取得とエラーハンドリング
- 複雑なJSONデータの表示
- ローディング状態の管理とUX向上

## 🛠️ 使用技術
- **フレームワーク**: Next.js 15.3.2 (App Router)
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS ^4
- **API**: 
  - Free Dictionary API (https://api.dictionaryapi.dev/api/v2/entries/en/)
  - Gemini API (Google AI Studio) - 翻訳機能
- **音声**: Web Audio API

## 📁 プロジェクト構成
```
src/app/day14-english-dictionary/
├── components/
│   ├── SearchBar.tsx           # 検索バーコンポーネント
│   ├── WordCard.tsx           # 単語詳細カードコンポーネント
│   ├── LoadingSpinner.tsx     # ローディング表示コンポーネント
│   └── ErrorMessage.tsx       # エラーメッセージコンポーネント
├── hooks/
│   └── useDictionary.ts       # 辞書検索カスタムフック
├── utils/
│   ├── dictionaryApi.ts       # 辞書API呼び出しユーティリティ
│   └── geminiApi.ts           # Gemini翻訳API呼び出しユーティリティ
├── types.ts                   # TypeScript型定義
├── layout.tsx                 # レイアウトファイル
├── page.tsx                   # メインページ
└── day14.md                   # この学習記録
```

## 🔧 実装した機能

### 1. 単語検索機能
- 英単語の入力検索
- リアルタイムバリデーション
- 例単語ボタンによるクイック検索

### 2. 詳細情報表示
- 単語と発音記号
- 品詞別の定義（複数対応）
- 使用例文の表示
- 同義語・反義語のタグ表示

### 3. 音声再生機能
- Free Dictionary APIから音声URLを取得
- Web Audio APIによる発音再生
- 再生状態の視覚的フィードバック

### 4. ローディング・エラー管理
- 美しいアニメーション付きローディング画面
- 詳細なエラーメッセージとリトライ機能
- 状態管理（idle, loading, success, error）

### 5. 日本語翻訳機能 🆕
- Gemini APIによる自動翻訳
- 英語⇔日本語の切り替えボタン
- 定義、例文、同義語・反義語の一括翻訳
- 品詞の日本語変換（noun→名詞、verb→動詞等）
- 翻訳ローディング状態の管理

## 💡 学んだこと

### TypeScript関連
- **複雑なAPI型定義**: 外部APIレスポンスの正確な型定義
- **Union Types**: SearchStatus の状態管理
- **Optional Properties**: APIレスポンスの optional フィールド対応
- **Type Guards**: エラーハンドリングでの型安全性

### React/Next.js関連
- **カスタムフック**: 複雑な状態とロジックの抽象化
- **useCallback**: 不要な再レンダリングの防止
- **複数状態管理**: 検索・翻訳・言語切り替えの統合管理
- **コンポーネント分割**: 関心事の分離と再利用性の向上
- **条件レンダリング**: 言語切り替えによる動的コンテンツ表示
- **Props設計**: 翻訳機能に対応した適切なコンポーネントインターフェース

### API・非同期処理
- **RESTful API**: Free Dictionary API の仕様理解
- **Gemini API**: Google AI Studio による翻訳API統合
- **複数API連携**: 辞書検索と翻訳の複合機能実装
- **エラーハンドリング**: HTTPステータスコード別の適切な処理
- **データ変換**: APIレスポンスからアプリケーション用データへの変換
- **ネットワークエラー**: ネットワーク障害時の適切な対応
- **API効率化**: 一括翻訳による API コール数の最適化

### UX/UI設計
- **ローディング状態**: ユーザビリティを考慮した待機画面
- **エラー表示**: 分かりやすいエラーメッセージとリカバリ手段
- **レスポンシブデザイン**: モバイル・デスクトップ両対応
- **アクセシビリティ**: キーボード操作とARIA属性

## 🚀 技術的ハイライト

### 1. カスタムフック（useDictionary）
```typescript
// 状態管理とAPI呼び出しを統合
const useDictionary = () => {
  const [wordData, setWordData] = useState<WordData | null>(null);
  const [searchState, setSearchState] = useState<SearchState>({
    status: 'idle'
  });

  const searchDictionary = useCallback(async (word: string) => {
    // ローディング、成功、エラー状態の管理
  }, []);

  return {
    wordData,
    searchState,
    searchDictionary,
    isLoading: searchState.status === 'loading',
    isError: searchState.status === 'error',
    isSuccess: searchState.status === 'success',
  };
};
```

### 2. Gemini API翻訳機能
```typescript
// 単語データ全体を日本語に翻訳
export const translateWordData = async (wordData: WordData): Promise<Partial<WordData>> => {
  try {
    const translations: Partial<WordData> = {};

    // 品詞別の定義を翻訳
    const japaneseMeanings = await Promise.all(
      wordData.meanings.map(async (meaning) => {
        const translatedDefinitions = await translateMultipleTexts(
          meaning.definitions,
          `これは「${wordData.word}」という英単語の${meaning.partOfSpeech}（品詞）としての定義です。`
        );
        
        return {
          partOfSpeech: await translatePartOfSpeech(meaning.partOfSpeech),
          definitions: translatedDefinitions
        };
      })
    );

    translations.japaneseMeanings = japaneseMeanings;
    // 例文、同義語、反義語も同様に翻訳...
    
    return translations;
  } catch (error) {
    throw new Error('翻訳に失敗しました。しばらく待ってから再試行してください。');
  }
};
```

### 3. 堅牢なエラーハンドリング
```typescript
// HTTPステータスコード別の詳細なエラー処理
switch (response.status) {
  case 404:
    throw new Error(`「${word}」は辞書に見つかりませんでした。\nスペルを確認してください。`);
  case 429:
    throw new Error('APIの利用制限に達しました。しばらく待ってから再試行してください。');
  default:
    throw new Error(`辞書データの取得に失敗しました（エラーコード: ${response.status}）`);
}
```

### 4. 型安全なデータ変換
```typescript
// APIレスポンスからアプリケーション用データへの変換
const mapApiResponseToWordData = (response: DictionaryResponse[]): WordData => {
  const firstEntry = response[0];
  
  // 音声記号、意味、例文、同義語・反義語を安全に抽出
  const phonetic = firstEntry.phonetic || 
    firstEntry.phonetics.find(p => p.text)?.text || '';
    
  // ...
};
```

## 🎨 UI/UXの工夫

### デザインシステム
- **カラーパレット**: インディゴをメインとした統一感のあるデザイン
- **レイアウト**: カード型デザインによる情報の整理
- **アニメーション**: ローディングとホバーエフェクトによる動的体験
- **レスポンシブ**: モバイルファーストのレスポンシブデザイン

### ユーザビリティ
- **検索体験**: プレースホルダーと例単語による誘導
- **視覚的フィードバック**: ローディング、成功、エラー状態の明確な表示
- **音声機能**: 発音ボタンによる学習体験の向上
- **ナビゲーション**: 新しい検索への誘導ボタン

## 🐛 課題と改善点

### 現在の制限
1. **オフライン対応なし**: ネットワーク必須
2. **検索履歴なし**: 過去の検索の記録機能なし
3. **お気に入り機能なし**: 単語の保存機能なし
4. **音声対応率**: すべての単語に音声データがあるわけではない

### 今後の改善案
1. **ローカルストレージ**: 検索履歴とお気に入り機能
2. **オフライン辞書**: 基本単語のローカルデータベース
3. **学習機能**: 間違えた単語の復習システム
4. **音声合成**: Text-to-Speech APIによる代替発音機能

## 📊 パフォーマンス考慮

### 最適化ポイント
- **useCallback**: 関数の再生成防止
- **コンポーネント分割**: 再レンダリング範囲の最小化
- **条件レンダリング**: 不要なDOMの生成防止
- **エラーバウンダリ**: エラー時のアプリケーション保護

## 🏆 達成できたこと

1. **複数外部API統合**: Free Dictionary API + Gemini API の完全活用
2. **型安全性**: TypeScriptによる堅牢なコード
3. **多言語対応**: 英語⇔日本語の動的切り替え機能
4. **ユーザー体験**: 直感的で使いやすいインターフェース
5. **エラー処理**: 様々な状況に対応したエラーハンドリング
6. **レスポンシブ**: あらゆるデバイスでの快適な操作
7. **AI統合**: 最新のGemini APIによるリアルタイム翻訳

このプロジェクトを通じて、実用的なアプリケーション開発に必要な多くの技術要素を体験でき、特に複数外部APIとの連携、TypeScriptでの型安全性、React のカスタムフックによる状態管理、そして最新AI技術の統合について深く学習できました。

---

**作成日**: 2025年
**学習時間**: 約4時間
**難易度**: ⭐⭐⭐⭐☆ (中級者向け) 