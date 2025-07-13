# Day 19: クイズアプリ

## 📝 今日の目標
アニメに関するクイズアプリを作成し、useStateによる複数状態管理、配列操作、条件分岐による結果表示を学習する。

## 🎯 作成したもの
選択式のアニメクイズアプリ（全10問）

### 主な機能
- **クイズ開始画面**: クイズの説明とスタートボタン
- **質問画面**: 選択肢付きの質問表示、進捗バー
- **結果画面**: スコア表示、詳細結果、解説付き
- **リスタート機能**: 最初から再挑戦可能
- **ランダム出題**: 毎回質問順序をシャッフル

## 🔧 使用した技術
- **React**: useState、コンポーネント分割
- **TypeScript**: インターフェース定義、型安全性
- **Tailwind CSS**: レスポンシブデザイン、条件付きスタイル
- **Next.js**: App Router、ファイル構成

## 📚 学習ポイント

### 1. 状態管理の複雑性
```typescript
const [gameState, setGameState] = useState<'start' | 'playing' | 'finished'>('start');
const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
const [answers, setAnswers] = useState<number[]>([]);
```

**理解しやすい例**: 本のページをめくる作業
- `gameState`: 「本を開く前」「読んでいる」「読み終わった」の3つの状態
- `currentQuestionIndex`: 現在のページ番号
- `selectedAnswer`: そのページで選んだ答え
- `answers`: これまでに選んだ答えの履歴

### 2. 配列操作と状態更新
```typescript
const nextQuestion = () => {
  const newAnswers = [...answers, selectedAnswer];
  setAnswers(newAnswers);
  // 新しい配列を作成してから状態を更新
};
```

**理解しやすい例**: 買い物リストに商品を追加
- 既存のリストはそのまま残し、新しい商品を追加した新しいリストを作成
- React の状態更新は、元の配列を変更するのではなく、新しい配列を作成する

### 3. 条件分岐による表示制御
```typescript
{gameState === 'start' && <QuizStart />}
{gameState === 'playing' && <QuestionCard />}
{gameState === 'finished' && <QuizResult />}
```

**理解しやすい例**: 自動販売機の画面
- 「商品選択画面」「お金投入画面」「商品取り出し画面」
- 現在の状態に応じて、表示する画面が変わる

### 4. 配列のシャッフル（Fisher-Yates アルゴリズム）
```typescript
const shuffleQuestions = (questions: QuizQuestion[]) => {
  const shuffled = [...questions];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};
```

**理解しやすい例**: カードをシャッフル
- 一番後ろのカードから順番に、ランダムに選んだカードと位置を交換
- 全てのカードが平等にランダムな位置に配置される

### 5. 結果計算ロジック
```typescript
const answeredQuestions: AnsweredQuestion[] = shuffledQuestions.map((question, index) => ({
  question,
  selectedAnswer: finalAnswers[index],
  isCorrect: finalAnswers[index] === question.correctAnswer
}));

const score = answeredQuestions.filter(answer => answer.isCorrect).length;
const percentage = Math.round((score / shuffledQuestions.length) * 100);
```

**理解しやすい例**: テストの採点
- 各問題の正解・不正解を判定
- 正解数を数えて、パーセンテージを計算

## 🎨 デザインのポイント

### 1. 進捗バーの実装
```typescript
<div className="w-full bg-gray-200 rounded-full h-2">
  <div 
    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
    style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
  />
</div>
```

### 2. 選択肢のインタラクティブデザイン
```typescript
className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
  selectedAnswer === index
    ? 'border-blue-500 bg-blue-50 text-blue-700'
    : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
}`}
```

### 3. 結果表示の色分け
```typescript
const getScoreColor = (percentage: number) => {
  if (percentage >= 80) return 'text-green-600';
  if (percentage >= 60) return 'text-yellow-600';
  return 'text-red-600';
};
```

## 💡 重要な実装パターン

### 1. 型安全な状態管理
```typescript
interface QuizState {
  currentQuestionIndex: number;
  questions: QuizQuestion[];
  answers: number[];
  isFinished: boolean;
}
```

### 2. コンポーネント分割
- `QuizStart`: 開始画面
- `QuestionCard`: 質問表示
- `QuizResult`: 結果表示
- `QuizApp`: 全体の統合

### 3. イベントハンドリング
```typescript
const selectAnswer = (answerIndex: number) => {
  setSelectedAnswer(answerIndex);
};

const nextQuestion = () => {
  if (selectedAnswer === null) return;
  // 処理を続行
};
```

## 🔍 つまずいたポイント

### 1. 状態更新のタイミング
**問題**: 状態を更新した直後にその値を使おうとすると、古い値が参照される
**解決**: 状態更新は非同期なので、更新された値を直接使用

### 2. 配列の変更
**問題**: 配列を直接変更すると、React が変更を検知できない
**解決**: スプレッド演算子で新しい配列を作成

### 3. 条件付きレンダリング
**問題**: 複数の条件を同時に満たす場合の表示制御
**解決**: 明確な状態管理と条件分岐

## 📈 今後の改善点

### 1. 機能拡張
- [ ] 制限時間の追加
- [ ] 難易度レベルの設定
- [ ] カテゴリー別クイズ
- [ ] ランキング機能

### 2. UI/UX改善
- [ ] アニメーション効果
- [ ] 音効果
- [ ] タッチ操作の改善
- [ ] ダークモード対応

### 3. データ管理
- [ ] 外部APIからの問題取得
- [ ] 問題の動的更新
- [ ] ユーザー履歴の保存
- [ ] 問題の難易度分析

## 🎯 次のステップ

1. **神経衰弱ゲーム（Day 20）**: より複雑な状態管理
2. **ショッピングカート（Day 21）**: グローバル状態管理
3. **Next.js 本格導入（Day 22）**: ルーティングとSSG

## 💭 振り返り

クイズアプリを作成することで、React の状態管理の複雑さと重要性を実感できました。単純に見えるアプリでも、ユーザー体験を考慮すると多くの状態を管理する必要があることを学びました。

特に、配列操作、条件分岐、状態の連携など、実際のアプリケーション開発で必要となる実践的なスキルを身につけることができました。

次回は、より高度な状態管理を学習していきます！ 