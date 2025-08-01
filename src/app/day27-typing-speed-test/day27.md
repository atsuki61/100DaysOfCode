# Day 27: タイピング速度テスト 初心者向け完全解説

## 🎯 このアプリで何ができるの？

**簡単に言うと**: 課題文章を見ながらタイピングして、あなたのタイピング速度（WPM）と正確性を測定できるアプリです！

### アプリの動作の流れ
1. **課題テキストを選択** → 難易度やカテゴリから選択可能
2. **タイピング開始** → 入力エリアに文字を入力すると自動でタイマースタート
3. **リアルタイム計測** → 入力中にWPMと正確性をリアルタイム表示
4. **結果表示** → 完了後に詳細な統計と評価を表示

---

## 📁 ファイル構成の役割

このアプリは、タイピングテストの複雑な機能を役割ごとに分けて管理しています。

```
src/app/day27-typing-test/
├── page.tsx              # 1. メイン画面（状態管理とタイマー制御）
├── layout.tsx            # アプリ全体のレイアウト
├── types.ts              # 2. データ型の定義（統計情報、文字状態など）
├── day27.md             # この学習記録
├── components/          # 3. 再利用可能な部品（コンポーネント）置き場
│   ├── TextDisplay.tsx       # 課題文章表示（文字ごとの色分け）
│   ├── TypingInput.tsx       # 入力エリア（コピペ防止機能付き）
│   ├── StatsDisplay.tsx      # 統計情報表示（WPM、正確性など）
│   ├── TextSelector.tsx      # テキスト選択画面
│   └── ResultDisplay.tsx     # 結果画面（評価とアクション）
└── utils/               # 4. 計算や処理の便利機能
    ├── typingUtils.ts        # WPM計算、正確性計算、文字状態管理
    └── sampleTexts.ts        # サンプルテキストデータと管理機能
```

---

## 🧠 重要な概念と実装解説

### 1. **WPM（Words Per Minute）とは？**

**WPMとは**: 1分間に入力できる単語数のことです。

#### 🏠 身近な例で理解しよう
- **レストランのオーダー例**: ウェイターが1分間に5つの注文を取れたら「5 orders per minute」
- **タイピングでは**: 1分間に50単語打てたら「50 WPM」

#### 💻 実際の計算方法
```typescript
// 一般的に「1単語 = 5文字」として計算
export function calculateWPM(correctChars: number, timeElapsed: number): number {
  if (timeElapsed === 0) return 0;
  const words = correctChars / 5;     // 正しい文字数 ÷ 5 = 単語数
  const minutes = timeElapsed / 60;   // 秒 → 分に変換
  return Math.round(words / minutes); // 単語数 ÷ 分 = WPM
}
```

**例**: 100文字を2分で正確に入力した場合
- 単語数: 100文字 ÷ 5 = 20単語
- WPM: 20単語 ÷ 2分 = 10 WPM

---

### 2. **リアルタイム文字状態管理**

#### 🎨 色分けシステム
各文字は4つの状態を持ちます：

```typescript
type CharStatus = 'pending' | 'correct' | 'incorrect' | 'current';
```

#### 🚦 信号機で理解しよう
- **pending（グレー）**: まだ入力されていない文字（信号待ち）
- **current（黄色）**: 今入力しようとしている文字（黄信号）
- **correct（緑）**: 正しく入力された文字（青信号）
- **incorrect（赤）**: 間違って入力された文字（赤信号）

#### 💻 実装のポイント
```typescript
export function updateCharStatuses(
  text: string,           // 課題テキスト "Hello"
  userInput: string,      // ユーザー入力 "Helo"
  currentIndex: number    // 現在位置 4
): CharStatus[] {
  return text.split('').map((char, index) => {
    if (index < userInput.length) {
      // 既に入力済みの文字をチェック
      const userChar = userInput[index];
      return {
        char,
        status: char === userChar ? 'correct' : 'incorrect',
        userChar: char === userChar ? undefined : userChar,
      };
    } else if (index === currentIndex) {
      // 現在入力しようとしている文字
      return { char, status: 'current' };
    } else {
      // まだ入力されていない文字
      return { char, status: 'pending' };
    }
  });
}
```

---

### 3. **useEffectを使ったタイマー制御**

#### ⏰ 時計の針のように動く仕組み

```typescript
React.useEffect(() => {
  if (typingState.isStarted && !typingState.isFinished && typingState.startTime) {
    // 100ms間隔でタイマーを更新（時計の秒針のように）
    timerRef.current = setInterval(() => {
      setTypingState(prev => {
        if (!prev.startTime || prev.isFinished) return prev;
        
        const timeElapsed = calculateTimeElapsed(prev.startTime);
        const stats = calculateStats(prev.text, prev.userInput, timeElapsed);
        
        return { ...prev, stats };
      });
    }, 100); // 0.1秒ごとに更新

    // クリーンアップ：コンポーネントが消える時に時計を止める
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }
}, [typingState.isStarted, typingState.isFinished, typingState.startTime]);
```

#### 🎬 映画撮影で例えると
- **setInterval**: カメラが0.1秒ごとに撮影（フレーム更新）
- **clearInterval**: 「カット！」と言って撮影停止
- **cleanup**: 撮影機材を片付ける

---

### 4. **状態管理のベストプラクティス**

#### 📊 統計情報の構造
```typescript
interface TypingStats {
  wpm: number;                    // 速度（Words Per Minute）
  accuracy: number;               // 正確性（％）
  totalTyped: number;             // 総入力文字数
  correctChars: number;           // 正しく入力された文字数
  incorrectChars: number;         // 間違って入力された文字数
  timeElapsed: number;            // 経過時間（秒）
}
```

#### 🎯 家計簿で例えると
- **totalTyped**: 今月の総支出
- **correctChars**: 予算内の支出
- **incorrectChars**: 予算オーバーの支出
- **accuracy**: 予算達成率（％）

---

### 5. **キーボードイベント処理**

#### 🛡️ コピペ防止機能
```typescript
const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
  const isCtrlKey = e.ctrlKey || e.metaKey;
  
  // Ctrl+V（ペースト）を防止
  if (isCtrlKey && (e.key === 'v' || e.key === 'V')) {
    e.preventDefault(); // イベントをキャンセル
    return;
  }
};
```

#### 🏫 学校のテストで例えると
- **通常の入力**: 自分で問題を解く
- **コピペ**: カンニングペーパーを使う（禁止！）
- **preventDefault()**: 先生がカンニングを止める

---

## 🎨 UIデザインのポイント

### 1. **色による視覚的フィードバック**
```typescript
function getCharClassName(status: CharStatus['status']): string {
  switch (status) {
    case 'correct':
      return 'bg-green-100 text-green-800 border-b-2 border-green-400';
    case 'incorrect':
      return 'bg-red-100 text-red-800 border-b-2 border-red-400 animate-pulse';
    case 'current':
      return 'bg-yellow-200 text-yellow-900 border-b-2 border-yellow-500 animate-pulse';
    case 'pending':
    default:
      return 'text-gray-600';
  }
}
```

### 2. **進捗バーによる視覚化**
```typescript
// 入力進捗を％で表示
const progressPercentage = (completedChars / totalChars) * 100;
```

---

## 🚀 学習のポイント

### 1. **タイマー処理**
- `useEffect`でタイマーを管理
- `setInterval`でリアルタイム更新
- クリーンアップ処理の重要性

### 2. **リアルタイム計算**
- 入力のたびに統計を再計算
- パフォーマンスを考慮した更新頻度

### 3. **ユーザビリティ**
- 直感的な色分け
- コピペ防止
- 自動フォーカス

### 4. **状態管理**
- 複雑な状態を構造化
- useCallbackでの最適化

---

## 💡 実用的な応用例

### 1. **eラーニングシステム**
- タイピング練習コース
- 進捗管理機能
- スコアランキング

### 2. **採用試験システム**
- データ入力職の適性検査
- 客観的な能力評価
- 自動評価システム

### 3. **リハビリ支援ツール**
- 手指機能回復訓練
- 進捗の数値化
- モチベーション維持

---

## 🎉 今日の達成項目

✅ **WPM計算アルゴリズムの理解**  
✅ **リアルタイムタイマー処理**  
✅ **キーボードイベントの制御**  
✅ **文字単位での状態管理**  
✅ **ユーザビリティを考慮したUI設計**  
✅ **統計情報の計算と表示**  

---

## 🌟 まとめ

Day 27では、**タイピング速度テスト**を通して以下の重要な技術を学びました：

1. **リアルタイム処理**: useEffectとsetIntervalを使った継続的な状態更新
2. **複雑な状態管理**: 複数の状態を統合的に管理する方法
3. **ユーザーインタラクション**: キーボードイベントの細かい制御
4. **数学的計算**: WPMや正確性などの統計計算
5. **視覚的フィードバック**: 色や進捗バーによる直感的なUI

これらの技術は、ゲーム開発、データ入力システム、教育アプリなど、多くの分野で応用できる実用的なスキルです！

次回も新しい技術にチャレンジしていきましょう！ 🚀