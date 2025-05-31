# Day 7: 銀フレ単語フラッシュカードアプリ

## 📚 概要

Day 7では、「銀フレ（TOEIC L&R TEST 出る単特急 銀のフレーズ）」の単語データを使用した**フラッシュカードアプリ**を作成しました。TOEIC 300-600点を目指す学習者向けの実用的な語彙学習ツールです。

### 🎯 主な機能

1. **単語カード表示**
   - 英単語と日本語意味の切り替え表示
   - 発音記号と例文の表示
   - 銀フレのカテゴリ別バッジ表示

2. **学習状態管理**
   - マスター済み / 学習中 / 未学習の3段階管理
   - リアルタイム進捗統計表示
   - 学習データの永続化準備

3. **フィルタリング機能**
   - 全ての単語モード
   - 学習中単語のみ表示モード

4. **ナビゲーション**
   - 前後の単語への移動
   - カードシャッフル機能
   - キーボードショートカット対応

### 🎮 操作方法

- **スペースキー / クリック**: カードを裏返す
- **←/→ キー**: 前後のカードへ移動
- **1キー**: マスター済みに設定（裏面時）
- **2キー**: 学習中に設定（裏面時）
- **Ctrl+S**: カードをシャッフル

---

## 🗃️ データ構造

### WordCard（単語カード）
```typescript
interface WordCard {
  id: number;
  word: string;         // 英単語
  meaning: string;      // 日本語の意味
  pronunciation: string; // 発音記号
  example: string;      // 例文
  category: string;     // カテゴリ（基礎の400語など）
  learningStatus: 'not_studied' | 'studying' | 'mastered';
}
```

### 銀フレカテゴリ

1. **基礎の400語**: TOEIC 300-450点レベル
2. **頻出の300語**: TOEIC 450-550点レベル  
3. **必須の200語**: TOEIC 550-600点レベル
4. **発展の100語**: TOEIC 600点超レベル
5. **設問に出る単語・表現**: リーディング対策
6. **パート1重要語**: リスニング対策

---

## ⚛️ React の学習ポイント

### 1. useState フック（状態管理の基礎）

複数の状態を効率的に管理する方法を学習しました。

```tsx
// 複数の状態を管理
const [words, setWords] = useState<WordCard[]>(toeicWords);
const [currentIndex, setCurrentIndex] = useState(0);
const [isRevealed, setIsRevealed] = useState(false);
const [filterMode, setFilterMode] = useState<'all' | 'studying'>('all');
```

**ポイント**:
- 各状態は独立して管理
- TypeScriptでの型安全な状態管理
- 初期値の適切な設定

### 2. useMemo フック（計算結果のメモ化）

パフォーマンス最適化のため、計算コストの高い処理をメモ化します。

```tsx
// フィルタリングされた単語リストをメモ化
const filteredWords = useMemo(() => {
  if (filterMode === 'studying') {
    return words.filter(word => word.learningStatus === 'studying');
  }
  return words;
}, [words, filterMode]);

// 学習統計の計算をメモ化
const learningStats = useMemo(() => {
  const total = words.length;
  const mastered = words.filter(word => word.learningStatus === 'mastered').length;
  const studying = words.filter(word => word.learningStatus === 'studying').length;
  const notStudied = words.filter(word => word.learningStatus === 'not_studied').length;
  
  return { total, mastered, studying, notStudied };
}, [words]);
```

**ポイント**:
- 依存配列で再計算のタイミングを制御
- 不必要な再計算を防いでパフォーマンス向上
- filter処理などの重い計算に有効

### 3. useEffect フック（副作用の処理）

コンポーネントのライフサイクルに応じて処理を実行します。

```tsx
// フィルターモード変更時の処理
useEffect(() => {
  setCurrentIndex(0);
  setIsRevealed(false);
}, [filterMode]);

// キーボードイベントの設定と削除
useEffect(() => {
  const handleKeyDown = (event: KeyboardEvent) => {
    // キーボード処理
  };

  window.addEventListener('keydown', handleKeyDown);
  return () => {
    window.removeEventListener('keydown', handleKeyDown);
  };
}, [currentIndex, filteredWords.length, isRevealed]);
```

**ポイント**:
- イベントリスナーの適切な設定と削除
- 依存配列による実行条件の制御
- クリーンアップ関数でメモリリークを防止

### 4. 配列フィルタリングと map 処理

データの変換と状態更新を効率的に行います。

```tsx
// 配列フィルタリング
const filteredWords = words.filter(word => 
  word.learningStatus === 'studying'
);

// 配列の不変更新（map を使用）
const updateWordStatus = (wordId: number, status: LearningStatus) => {
  setWords(prevWords =>
    prevWords.map(word =>
      word.id === wordId ? { ...word, learningStatus: status } : word
    )
  );
};
```

**ポイント**:
- 元の配列を変更せず新しい配列を作成
- スプレッド演算子による不変更新
- 条件に基づく効率的なフィルタリング

---

## 🎨 UI/UX デザイン

### Tailwind CSS の効果的な使用

```tsx
{/* カテゴリ別の色分け */}
<div className={`px-3 py-1 rounded-full text-xs font-semibold border ${getCategoryColor(word.category)}`}>
  {getCategoryDisplay(word.category)}
</div>

{/* ホバーアニメーション */}
<div className="transition-all duration-300 hover:shadow-3xl">
  {/* カード内容 */}
</div>

{/* レスポンシブグリッド */}
<div className="grid grid-cols-2 gap-3">
  {/* ボタン */}
</div>
```

### アクセシビリティ対応

- キーボード操作の完全サポート
- 適切なaria属性の使用
- 色だけに依存しない情報伝達

---

## 📊 データ管理

### 1. 銀フレデータの構造化

```typescript
// カテゴリ別データの整理
export const ginFrameCategories = {
  basic: basicWords,        // 基礎の400語
  frequent: frequentWords,  // 頻出の300語
  essential: essentialWords, // 必須の200語
  advanced: advancedWords,  // 発展の100語
  questions: questionWords, // 設問語彙
  part1: part1Words        // Part1語彙
};

// 統計情報の提供
export const ginFrameStats = {
  totalWords: allGinFrameWords.length,
  basicCount: basicWords.length,
  frequentCount: frequentWords.length,
  // ...
};
```

### 2. 型安全性の確保

```typescript
// カテゴリの型定義
category: '基礎の400語' | '頻出の300語' | '必須の200語' | 
          '発展の100語' | '設問に出る単語・表現' | 'パート1重要語' | 'Supplement';

// 学習ステータスの型定義
learningStatus: 'not_studied' | 'studying' | 'mastered';
```

---

## 🚀 今後の拡張案

### 1. データ永続化
- LocalStorageへの学習進捗保存
- インポート/エクスポート機能

### 2. 学習機能の強化
- 間隔反復学習（Spaced Repetition）
- 学習履歴とグラフ表示
- 弱点単語の自動抽出

### 3. カスタマイズ機能
- カテゴリ別学習モード
- 学習時間の設定
- 音声読み上げ機能

### 4. ゲーミフィケーション
- 学習ストリーク
- 達成バッジシステム
- 学習目標設定

---

## 💡 学習のまとめ

Day 7を通じて、以下のスキルを習得しました：

### React スキル
- 複数状態の効率的な管理
- パフォーマンス最適化（useMemo）
- イベント処理とクリーンアップ
- 条件付きレンダリングの活用

### TypeScript スキル
- 複雑な型定義の作成
- ジェネリクスの適切な使用
- 型安全な配列操作

### UI/UX スキル
- アクセシブルなインターフェース設計
- アニメーションとトランジション
- レスポンシブデザイン

### データ設計スキル
- 大規模データの構造化
- 効率的なフィルタリング
- 統計情報の計算

このアプリは実用的なTOEIC学習ツールとして活用できるレベルに達しており、Reactの状態管理とデータ処理の実践的なスキルが身につきました！
