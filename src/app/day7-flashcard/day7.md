## はじめに

Day7: 英単語フラッシュカードアプリを作成しました！銀フレTOEIC単語を効率的に学習できる本格的なアプリです。

## 完成したアプリの機能

- 📚 1000語以上の銀フレTOEIC単語データ
- 🔄 カードクリックで英単語と意味を切り替え
- 📊 学習状態管理（未学習・学習中・マスター済み）
- 🎯 学習中モード（学習中の単語のみ表示）
- ⬅️➡️ 前後ナビゲーション機能
- 🔀 シャッフル機能でランダム学習
- 📈 リアルタイム学習統計表示
- ⌨️ キーボードショートカット対応
- 🎨 カテゴリ別色分けと視覚的フィードバック

## 1. データ構造の設計

フラッシュカードで管理するデータを型定義で明確にします。

```typescript
// 学習状態の型定義
export type LearningStatus = 'not_studied' | 'studying' | 'mastered';

// 単語カードの型定義
export interface WordCard {
  id: number;
  word: string;        // 英単語
  meaning: string;     // 日本語の意味
  pronunciation: string; // 発音記号
  example: string;     // 例文
  category: '基礎の400語' | '頻出の300語' | '必須の200語' | '発展の100語' | '設問に出る単語・表現' | 'パート1重要語' | 'Supplement'; // カテゴリ
  learningStatus: 'not_studied' | 'studying' | 'mastered'; // 学習ステータス
}
```

この型定義が、アプリ全体の「設計図」となります。すべての単語データは`WordCard`型に従って管理され、学習状態は3段階で管理されます。

🎯 **設計のポイント**
- **`LearningStatus`**: union型で学習状態を限定（タイプセーフ）
- **`WordCard`**: 必要最小限の情報をまとめた単語カード
- **`category`**: 銀フレの分類に従った具体的なカテゴリ定義

## 2. 複数状態の同期管理（useState）

フラッシュカードは複数の状態を「連携」させて動作します。

```typescript
const [words, setWords] = useState<WordCard[]>(toeicWords); // 単語データ
const [currentIndex, setCurrentIndex] = useState(0); // 現在表示中のカードインデックス
const [isRevealed, setIsRevealed] = useState(false); // カードの裏面表示状態
const [filterMode, setFilterMode] = useState<'all' | 'studying'>('all'); // フィルターモード
```

これらの状態は「チームワーク」で動作します。一つの状態が変わると、他の状態も連鎖的に影響を受けます。

### 🔍 状態間の連携の仕組み

```typescript
// 例: フィルターモード変更時の連鎖反応
const handleFilterChange = (mode: 'all' | 'studying') => {
  setFilterMode(mode);        // 1. フィルターモードを変更
  setCurrentIndex(0);         // 2. インデックスを最初に戻す
  setIsRevealed(false);       // 3. カードを表面に戻す
}
```

**なぜ状態をリセットするの？**
- フィルター変更で表示される単語リストが変わる
- 古いインデックスが新しいリストでは無効になる可能性
- ユーザーの混乱を防ぐため、常に最初から表示

### 🎯 状態管理のベストプラクティス

```typescript
// ❌ 状態を直接変更（Reactでは禁止）
words[0].learningStatus = 'mastered'  // これはNG

// ✅ 新しいオブジェクトを作成して更新
setWords(prevWords =>
  prevWords.map(word =>
    word.id === wordId ? { ...word, learningStatus: status } : word
  )
)
```

Reactでは「不変性」が重要です。既存のオブジェクトを変更するのではなく、新しいオブジェクトを作成して更新します。

## 3. useMemoによる計算の最適化

表示するデータや統計は、依存する値が変わったときのみ再計算されます。

```typescript
// フィルタリングされた単語リスト
const filteredWords = useMemo(() => {
  if (filterMode === 'studying') {
    return words.filter(word => word.learningStatus === 'studying');
  }
  return words;
}, [words, filterMode]);

// 学習統計の計算
const learningStats: LearningStats = useMemo(() => {
  const total = words.length;
  const mastered = words.filter(word => word.learningStatus === 'mastered').length;
  const studying = words.filter(word => word.learningStatus === 'studying').length;
  const notStudied = words.filter(word => word.learningStatus === 'not_studied').length;
  
  return { total, mastered, studying, notStudied };
}, [words]);
```

`useMemo`は「メモ化」という技術で、同じ計算を何度も繰り返すのを防ぎます。

### 🧮 useMemoの仕組み

```typescript
// useMemo なしの場合
const expensiveCalculation = () => {
  console.log('重い計算を実行中...')  // 毎回実行される
  return words.filter(/* 複雑な処理 */)
}

// useMemo ありの場合
const expensiveCalculation = useMemo(() => {
  console.log('重い計算を実行中...')  // 依存配列の値が変わったときのみ実行
  return words.filter(/* 複雑な処理 */)
}, [words])  // wordsが変わったときのみ再計算
```

**useMemoを使う判断基準**
- 配列のフィルタリングや複雑な計算
- 子コンポーネントに渡すpropsの生成
- 毎回計算するとパフォーマンスが気になる処理

## 4. 配列フィルタリングの実装

学習状態に基づいて表示する単語を動的に切り替えます。

```typescript
const filteredWords = useMemo(() => {
  if (filterMode === 'studying') {
    return words.filter(word => word.learningStatus === 'studying');
  }
  return words;  // 'all'モードではすべての単語を表示
}, [words, filterMode]);
```

`filter`メソッドは「条件に合う要素だけを集める」ために使います。

### 🔍 filterメソッドの詳細解説

```typescript
// 基本的な使い方
const numbers = [1, 2, 3, 4, 5]
const evenNumbers = numbers.filter(num => num % 2 === 0)  // [2, 4]

// 単語フィルタリングの例
const studyingWords = words.filter(word => word.learningStatus === 'studying')
// → 学習中の単語のみを含む新しい配列を返す

// 複数条件でのフィルタリング
const basicStudyingWords = words.filter(word => 
  word.learningStatus === 'studying' && word.category === '基礎の400語'
)
```

**filterの重要な特徴**
- 元の配列は変更されない（非破壊的）
- 条件に合う要素だけを含む新しい配列を返す
- 条件はboolean値を返す関数で指定

## 5. イミュータブルな状態更新

React の状態更新は「不変性」を保つ必要があります。

```typescript
// 単語の学習状態を更新する関数
const updateWordStatus = (wordId: number, status: LearningStatus) => {
  setWords(prevWords =>
    prevWords.map(word =>
      word.id === wordId 
        ? { ...word, learningStatus: status }  // 該当する単語のみ更新
        : word                                  // その他の単語はそのまま
    )
  );
};
```

この処理は「1つの単語だけを更新したいけど、配列全体を新しく作る」というパターンです。

### 🔧 mapメソッドによる更新パターン

```typescript
// ステップ1: 元の配列
const originalWords = [
  { id: 1, word: 'begin', learningStatus: 'not_studied' },
  { id: 2, word: 'work', learningStatus: 'studying' },
  { id: 3, word: 'company', learningStatus: 'not_studied' }
]

// ステップ2: id=2の単語をmasteredに更新
const updatedWords = originalWords.map(word =>
  word.id === 2 
    ? { ...word, learningStatus: 'mastered' }  // スプレッド構文で新オブジェクト作成
    : word                                      // 変更不要な単語はそのまま
)

// 結果: id=2の単語のみがmasteredに変更された新しい配列
```

**スプレッド構文（...）の役割**
```typescript
const original = { id: 1, word: 'begin', status: 'not_studied' }

// ❌ 直接変更（危険）
original.status = 'mastered'  // 元のオブジェクトを変更

// ✅ スプレッド構文で新オブジェクト作成
const updated = { ...original, status: 'mastered' }
// → 元のオブジェクトは保持、新しいオブジェクトを作成
```

## 6. 条件付きレンダリングの活用

状態に応じてUIを動的に変更し、ユーザーに適切な情報を表示します。

```typescript
// カードの表面・裏面の切り替え
{!isRevealed ? (
  // 英単語表示面
  <div className="space-y-6">
    <div className="text-5xl font-bold text-blue-600 mb-4">
      {word.word}
    </div>
    <div className="text-lg text-gray-600 font-mono">
      {word.pronunciation}
    </div>
  </div>
) : (
  // 意味表示面
  <div className="space-y-6">
    <div className="text-2xl font-bold text-gray-800 mb-2">
      {word.word}
    </div>
    <div className="text-3xl font-bold text-green-600 mb-6">
      {word.meaning}
    </div>
    <div className="bg-gray-50 rounded-lg p-4 text-left">
      <div className="text-sm text-gray-500 mb-2">例文:</div>
      <div className="text-gray-700 italic">
        {word.example}
      </div>
    </div>
  </div>
)}
```

同じ場所に異なる内容を表示する「切り替え式UI」です。

### 🎨 動的スタイリングの実装

```typescript
// 学習状態に応じたバッジの色分け
const getStatusColor = (status: string) => {
  switch (status) {
    case 'mastered':
      return 'bg-green-500 text-white';
    case 'studying':
      return 'bg-orange-500 text-white';
    default:
      return 'bg-gray-400 text-white';
  }
};

// カテゴリに応じた色分け
const getCategoryColor = (category: string) => {
  switch (category) {
    case '基礎の400語':
      return 'bg-green-100 text-green-800 border-green-200';
    case '頻出の300語':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    // ... 他のカテゴリ
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

// 使用例
<div className={`px-3 py-1 rounded-full ${getStatusColor(word.learningStatus)}`}>
  {getStatusIcon(word.learningStatus)}
</div>
```

関数を使って「状態→スタイル」の変換を行い、コードの重複を避けています。

## 7. シャッフル機能の実装（Fisher-Yates法）

配列をランダムにシャッフルする標準的なアルゴリズムです。

```typescript
const handleShuffle = () => {
  const shuffledWords = [...words];  // 元の配列をコピー
  
  // Fisher-Yates シャッフルアルゴリズム
  for (let i = shuffledWords.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));  // 0からiまでのランダムな整数
    [shuffledWords[i], shuffledWords[j]] = [shuffledWords[j], shuffledWords[i]];  // 要素を交換
  }
  
  setWords(shuffledWords);
  setCurrentIndex(0);      // 最初のカードに戻る
  setIsRevealed(false);    // カードを表面に戻す
};
```

このアルゴリズムは「均等にランダム」な結果を保証します。

### 🎲 Fisher-Yatesアルゴリズムの仕組み

```typescript
// 配列 [A, B, C, D] をシャッフルする例

// ステップ1: i=3（最後の要素）
// j = Math.floor(Math.random() * 4)  // 0〜3のランダム値、例: j=1
// [A, B, C, D] → [A, D, C, B]  // B と D を交換

// ステップ2: i=2
// j = Math.floor(Math.random() * 3)  // 0〜2のランダム値、例: j=0
// [A, D, C, B] → [C, D, A, B]  // A と C を交換

// ステップ3: i=1
// j = Math.floor(Math.random() * 2)  // 0〜1のランダム値、例: j=1
// [C, D, A, B] → [C, D, A, B]  // D と D を交換（変化なし）

// 結果: [C, D, A, B]
```

**なぜこのアルゴリズムが優秀？**
- すべての順列が等しい確率で出現
- 効率的（O(n)の時間計算量）
- 実装がシンプル

### 🔄 配列の分割代入による要素交換

```typescript
// 従来の要素交換（一時変数を使用）
const temp = array[i];
array[i] = array[j];
array[j] = temp;

// ES6の分割代入による要素交換（エレガント）
[array[i], array[j]] = [array[j], array[i]];
```

分割代入を使うことで、一時変数なしで2つの値を簡単に交換できます。

## 8. キーボードイベントハンドリング

ユーザビリティ向上のため、キーボード操作に対応します。

```typescript
useEffect(() => {
  const handleKeyDown = (event: KeyboardEvent) => {
    switch (event.code) {
      case 'Space':
        event.preventDefault();  // デフォルトのスクロール動作を防ぐ
        handleCardClick();
        break;
      case 'ArrowLeft':
        event.preventDefault();
        handlePrevious();
        break;
      case 'ArrowRight':
        event.preventDefault();
        handleNext();
        break;
      case 'Digit1':
        if (isRevealed) {  // 意味表示時のみ有効
          event.preventDefault();
          handleStatusChange('mastered');
        }
        break;
      case 'Digit2':
        if (isRevealed) {
          event.preventDefault();
          handleStatusChange('studying');
        }
        break;
    }
  };

  window.addEventListener('keydown', handleKeyDown);
  
  // クリーンアップ関数
  return () => {
    window.removeEventListener('keydown', handleKeyDown);
  };
}, [currentIndex, filteredWords.length, isRevealed]);
```

キーボードイベントは「グローバル」なイベントなので、適切にクリーンアップが必要です。

### ⌨️ イベント処理の詳細解説

**`event.preventDefault()`の重要性**
```typescript
case 'Space':
  event.preventDefault();  // これがないとページがスクロールしてしまう
  handleCardClick();
  break;
```

ブラウザにはキーに対するデフォルト動作があります。`preventDefault()`でその動作を無効にし、アプリ独自の動作を実装します。

**イベントリスナーのクリーンアップ**
```typescript
// useEffect内でイベントリスナーを追加
window.addEventListener('keydown', handleKeyDown);

// クリーンアップ関数でイベントリスナーを削除
return () => {
  window.removeEventListener('keydown', handleKeyDown);
};
```

コンポーネントが削除されるときに、イベントリスナーも一緒に削除しないとメモリリークの原因になります。

**依存配列の管理**
```typescript
useEffect(() => {
  // ... イベントハンドラー
}, [currentIndex, filteredWords.length, isRevealed]);
```

イベントハンドラー内で使用している値を依存配列に含めることで、最新の値でイベント処理が実行されます。

## 9. コンポーネントの責務分離

機能ごとにコンポーネントを分離し、保守性を向上させます。

### FlashCard コンポーネント
```typescript
interface FlashCardProps {
  word: WordCard;
  isRevealed: boolean;
  onCardClick: () => void;
}

export default function FlashCard({ word, isRevealed, onCardClick }: FlashCardProps) {
  // カードの表示ロジックのみに集中
  return (
    <div onClick={onCardClick} className="...">
      {!isRevealed ? (
        // 英単語面
      ) : (
        // 意味面
      )}
    </div>
  );
}
```

### LearningButtons コンポーネント
```typescript
interface LearningButtonsProps {
  onStatusChange: (status: LearningStatus) => void;
}

export default function LearningButtons({ onStatusChange }: LearningButtonsProps) {
  // 学習状態変更ボタンのみに集中
  return (
    <div className="grid grid-cols-2 gap-3">
      <button onClick={() => onStatusChange('mastered')}>
        マスター!
      </button>
      <button onClick={() => onStatusChange('studying')}>
        学習中
      </button>
    </div>
  );
}
```

**責務分離の利点**
- 各コンポーネントが単一の責任を持つ
- テストが書きやすい
- 再利用しやすい
- バグの特定が容易

### 🎯 Props設計のベストプラクティス

```typescript
// ❌ 大きすぎるprops（責務が曖昧）
interface BadProps {
  words: WordCard[];
  currentIndex: number;
  isRevealed: boolean;
  filterMode: string;
  onCardClick: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onStatusChange: (status: LearningStatus) => void;
}

// ✅ 必要最小限のprops（責務が明確）
interface GoodProps {
  word: WordCard;
  isRevealed: boolean;
  onCardClick: () => void;
}
```

コンポーネントには「必要最小限」の情報だけを渡すことで、依存関係を少なくし、再利用性を高めます。

## 10. TypeScriptによる型安全性

型定義により、コンパイル時にエラーを検出できます。

```typescript
// 学習状態の型を限定
type LearningStatus = 'not_studied' | 'studying' | 'mastered';

// ❌ 型エラー（存在しない状態）
const status: LearningStatus = 'completed';  // TypeScriptエラー

// ✅ 正しい使用
const status: LearningStatus = 'mastered';   // OK

// 関数の型定義
const updateWordStatus = (wordId: number, status: LearningStatus) => {
  // wordId は必ず number 型
  // status は必ず LearningStatus の値のみ
};
```

### 🛡️ 型安全性の利点

**1. コンパイル時エラー検出**
```typescript
// ❌ 実行時エラーになる可能性
const word = words[currentIndex];
word.meanings;  // typo: meaning ではなく meanings

// ✅ TypeScriptがコンパイル時に検出
const word: WordCard = words[currentIndex];
word.meanings;  // Property 'meanings' does not exist on type 'WordCard'
```

**2. インテリセンス（自動補完）**
```typescript
const word: WordCard = words[currentIndex];
word.  // ここで自動的に id, word, meaning, pronunciation... が候補表示
```

**3. リファクタリングの安全性**
```typescript
// インターフェースの変更時、すべての使用箇所でエラーが出る
interface WordCard {
  id: number;
  englishWord: string;  // word → englishWord に変更
  meaning: string;
  // ...
}

// 変更が必要な箇所が一目でわかる
const displayWord = word.word;  // TypeScriptエラー: Property 'word' does not exist
```

## 11. パフォーマンス最適化のポイント

大量のデータを扱うため、パフォーマンスを意識した実装を行います。

### メモ化の活用
```typescript
// 重い計算をメモ化
const learningStats = useMemo(() => {
  const mastered = words.filter(word => word.learningStatus === 'mastered').length;
  const studying = words.filter(word => word.learningStatus === 'studying').length;
  const notStudied = words.filter(word => word.learningStatus === 'not_studied').length;
  
  return { mastered, studying, notStudied, total: words.length };
}, [words]);  // words が変わったときのみ再計算
```

### 効率的な状態更新
```typescript
// ❌ 非効率（毎回全配列を検索）
const updateWord = (id: number, status: LearningStatus) => {
  const newWords = [...words];
  const index = newWords.findIndex(word => word.id === id);
  newWords[index] = { ...newWords[index], learningStatus: status };
  setWords(newWords);
};

// ✅ 効率的（mapで一度だけ走査）
const updateWord = (id: number, status: LearningStatus) => {
  setWords(prevWords =>
    prevWords.map(word =>
      word.id === id ? { ...word, learningStatus: status } : word
    )
  );
};
```

### イベントハンドラーの最適化
```typescript
// useCallback でイベントハンドラーをメモ化（必要に応じて）
const handleStatusChange = useCallback((status: LearningStatus) => {
  const currentWord = filteredWords[currentIndex];
  updateWordStatus(currentWord.id, status);
}, [filteredWords, currentIndex, updateWordStatus]);
```

## 12. ユーザビリティ（UX）の改善

学習アプリとして使いやすくするためのUX配慮。

### 視覚的フィードバック
```typescript
// ホバー効果とアニメーション
<button className="transition-all duration-200 hover:scale-105 hover:shadow-lg">
  マスター!
</button>

// 状態に応じた色分け
<div className={`px-3 py-1 rounded-full ${
  word.learningStatus === 'mastered' 
    ? 'bg-green-500 text-white'
    : 'bg-orange-500 text-white'
}`}>
```

### 進捗の可視化
```typescript
// 学習統計の表示
<div className="bg-white rounded-lg p-4">
  <div className="text-sm text-gray-600">
    進捗: {learningStats.mastered} / {learningStats.total} 語
  </div>
  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
    <div 
      className="bg-green-500 h-2 rounded-full transition-all duration-300"
      style={{ width: `${(learningStats.mastered / learningStats.total) * 100}%` }}
    />
  </div>
</div>
```

### 空状態の適切な処理
```typescript
// 学習中の単語がない場合の表示
if (filteredWords.length === 0) {
  return (
    <div className="text-center py-8">
      <div className="text-6xl mb-4">🎉</div>
      <h2 className="text-2xl font-bold text-green-600 mb-4">
        おめでとうございます！
      </h2>
      <p className="text-gray-600 mb-6">
        学習中の単語がありません。
      </p>
      <button onClick={() => setFilterMode('all')}>
        全ての単語に戻る
      </button>
    </div>
  );
}
```

## まとめ

このフラッシュカードアプリで学べるReactの重要概念：

1. **複数状態の連携管理**: useState による状態の同期
2. **useMemo**: 計算の最適化とパフォーマンス向上
3. **配列操作**: filter、map、スプレッド構文の活用
4. **イミュータブル更新**: 不変性を保った状態更新
5. **条件付きレンダリング**: 状態に応じた動的UI表示
6. **キーボードイベント**: ユーザビリティ向上のための操作対応
7. **コンポーネント分離**: 責務の分離と再利用性
8. **TypeScript活用**: 型安全性によるコード品質向上
9. **Fisher-Yatesアルゴリズム**: 効率的なシャッフル実装
10. **UX配慮**: 視覚的フィードバックと適切なエラーハンドリング

## 次のステップ

- 💾 ローカルストレージでの学習進捗保存
- 📊 学習履歴とグラフ表示
- 🔔 復習タイミングのリマインダー機能
- 🎵 音声読み上げ機能
- 📱 PWA対応とオフライン学習
- 🏆 ゲーミフィケーション要素（レベル、バッジ）
- 📈 学習効率の分析機能
- 🌙 ダークモード対応

複雑な状態管理とデータ操作が学べる実践的なアプリです！
実際の学習ツールとして使える本格的な機能を持っています 🚀


