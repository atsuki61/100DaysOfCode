# Day 27: タイピング速度テスト

## 📝 今日の目標
出された文章を入力してWPM(打鍵数/分)を計測するタイピング速度テストアプリを作成する

## 🎯 完成したアプリの概要
- **課題文章選択**: 難易度別の複数の文章から選択
- **リアルタイム表示**: 入力に合わせて文字の色が変化
- **統計情報**: WPM、CPM、正確性、進捗をリアルタイム表示
- **詳細結果**: テスト完了後に詳細な結果と評価を表示
- **操作性**: テスト開始、停止、リセット機能

## 🧠 学習ポイント

### 1. キー入力イベント処理
```typescript
const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
  // Ctrl+A (全選択) を無効化
  if (e.ctrlKey && e.key === 'a') {
    e.preventDefault()
  }
  
  // Ctrl+C, Ctrl+V (コピー&ペースト) を無効化
  if (e.ctrlKey && (e.key === 'c' || e.key === 'v')) {
    e.preventDefault()
  }
}
```

**学習ポイント**: 
- `onKeyDown`イベントでキーボード操作を制御
- 不正操作（コピペなど）を防止してテストの公平性を保つ
- `e.preventDefault()`でデフォルトの動作をキャンセル

### 2. useEffectによるタイマー処理
```typescript
useEffect(() => {
  let interval: NodeJS.Timeout | null = null

  if (state.status === 'running' && state.startTime) {
    interval = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - state.startTime!) / 1000))
    }, 1000)
  } else {
    if (interval) clearInterval(interval)
  }

  return () => {
    if (interval) clearInterval(interval)
  }
}, [state.status, state.startTime])
```

**学習ポイント**:
- `setInterval`で1秒ごとに時間を更新
- `useEffect`のクリーンアップ関数でメモリリークを防止
- 状態に応じてタイマーを開始・停止

### 3. WPM（Words Per Minute）計算
```typescript
export const calculateWPM = (charactersTyped: number, timeInSeconds: number): number => {
  if (timeInSeconds === 0) return 0
  // 標準的な単語の長さを5文字として計算
  const words = charactersTyped / 5
  const minutes = timeInSeconds / 60
  return Math.round(words / minutes)
}
```

**学習ポイント**:
- 英語では平均的な単語長を5文字として計算
- 分単位への変換（秒 ÷ 60）
- ゼロ除算エラーの防止

### 4. リアルタイム文字状態判定
```typescript
export const getCharacterStatus = (
  targetChar: string,
  userChar: string | undefined,
  index: number,
  currentIndex: number,
  userInputLength: number
): CharacterStatus => {
  if (index === currentIndex && userInputLength === index) {
    return 'current'
  } else if (index < userInputLength) {
    return userChar === targetChar ? 'correct' : 'incorrect'
  } else {
    return 'pending'
  }
}
```

**学習ポイント**:
- 各文字の入力状態を4つの状態で管理
- 現在位置、正解、不正解、未入力を視覚的に区別
- インデックスベースの状態判定ロジック

### 5. 複雑な状態管理（カスタムフック）
```typescript
export const useTypingTest = () => {
  const [state, setState] = useState<TypingState>(initialState)
  const [result, setResult] = useState<TypingResult | null>(null)
  const [elapsedTime, setElapsedTime] = useState<number>(0)

  // 複数の関連する状態を一つのフックで管理
  return {
    state, result, elapsedTime, progress, currentWPM,
    startTest, handleInput, resetTest, stopTest, selectText
  }
}
```

**学習ポイント**:
- 関連する状態と処理を一つのフックにまとめる
- コンポーネントの責務を分離して再利用性を高める
- TypeScriptで型安全な状態管理

## 🔧 技術的な実装詳細

### ファイル構成
```
src/app/day27-typing-speed-test/
├── layout.tsx          # レイアウト
├── page.tsx            # メインページ
├── types.ts            # TypeScript型定義
├── hooks/
│   └── useTypingTest.ts # タイピングテスト用カスタムフック
├── components/
│   ├── TextSelector.tsx    # 課題文章選択
│   ├── TypingDisplay.tsx   # タイピング表示
│   ├── TypingInput.tsx     # 入力エリア
│   ├── TypingStats.tsx     # 統計情報表示
│   └── ControlButtons.tsx  # 操作ボタン
├── data/
│   └── typingTexts.ts      # 課題文章データ
└── utils/
    └── typingUtils.ts      # 計算ユーティリティ
```

### 主要な型定義
```typescript
export interface TypingResult {
  wpm: number                // Words Per Minute
  cpm: number                // Characters Per Minute
  accuracy: number           // 正確性（パーセンテージ）
  timeElapsed: number        // 経過時間（秒）
  totalCharacters: number    // 総文字数
  correctCharacters: number  // 正しく入力された文字数
  incorrectCharacters: number // 間違えた文字数
}
```

## 🎨 UI/UXの工夫

### 1. 視覚的フィードバック
- **正解**: 緑背景で正しい入力を明確に表示
- **不正解**: 赤背景で間違いを即座に表示
- **現在位置**: 青背景 + 点滅アニメーションで入力位置を明示
- **未入力**: グレー文字で次に入力する文字を表示

### 2. プログレスバー
- 進捗率をリアルタイムで視覚化
- 完了まで何文字残っているかを数値でも表示

### 3. レスポンシブデザイン
- モバイルでも快適に利用できるレイアウト
- 統計情報のグリッドがデバイスサイズに応じて変化

## 💡 実用的な学習例

### 例1: 文字列比較ロジック
```typescript
// 文字単位での正確性判定
for (let i = 0; i < totalCharacters; i++) {
  if (userInput[i] === targetText[i]) {
    correctCharacters++
  } else {
    incorrectCharacters++
  }
}
```

これは**文字列処理**の基本中の基本です。実際の開発では：
- 検索機能での部分一致判定
- バリデーション処理での入力チェック
- データ比較処理

で同様のロジックを使用します。

### 例2: パフォーマンス測定
```typescript
const currentWPM = state.startTime && state.userInput.length > 0 && elapsedTime > 0
  ? Math.round((state.userInput.length / 5) / (elapsedTime / 60))
  : 0
```

これは**リアルタイム計算**の例です。実際の開発では：
- ダッシュボードでのリアルタイム指標表示
- ゲームでのスコア計算
- 進捗トラッキング

で応用できます。

## 🔍 今日学んだReact/Next.jsの概念

### 1. useCallback の効果的な使用
```typescript
const handleInput = useCallback((input: string) => {
  // 複雑な処理...
}, [state.status, state.selectedText, state.startTime])
```
- 不要な再レンダリングを防止
- 依存配列の適切な管理が重要

### 2. 条件付きレンダリングの活用
```typescript
{state.selectedText && (
  <TypingDisplay targetText={state.selectedText.content} />
)}
```
- 状態に応じたUIの動的表示
- ユーザビリティの向上

### 3. カスタムフックによるロジック分離
- コンポーネントからビジネスロジックを分離
- テストしやすい構造
- 再利用可能な処理の抽象化

## 🚀 今後の発展可能性

### 機能拡張のアイデア
1. **ユーザー登録・ログイン**: 個人記録の保存
2. **ランキング機能**: 他のユーザーとの比較
3. **課題文章の追加**: ユーザーが独自の文章を追加
4. **音効果**: タイピング音や完了音の追加
5. **統計グラフ**: 進歩の可視化
6. **多言語対応**: 英語以外の言語での練習

### 技術的な発展
1. **WebSocket**: リアルタイム対戦機能
2. **PWA化**: オフラインでも利用可能
3. **音声認識**: 音声入力との併用
4. **機械学習**: 苦手な文字パターンの分析

## 📚 関連する実世界のアプリケーション

- **タイピング練習サイト**: TypingClub、Keybr.com
- **コーディング練習**: LeetCode、AtCoder でのタイムアタック
- **言語学習**: Duolingo での文字入力練習
- **エディタ**: VSCode、Vim でのタイピング効率化

このプロジェクトで学んだリアルタイム処理、パフォーマンス測定、ユーザー入力の制御は、これらの実用的なアプリケーション開発に直接応用できる重要なスキルです。 