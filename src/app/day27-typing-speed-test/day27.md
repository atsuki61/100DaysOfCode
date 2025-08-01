# Day 27: タイピング速度テスト

## 今日のアプリ概要

タイピング速度テストアプリを作成しました。ユーザーが表示された文章をタイピングし、WPM（Words Per Minute）と正確性を測定できるアプリです。

## 主な機能

### 1. タイピングテスト
- ランダムな課題テキストの表示
- リアルタイムでの入力検知
- 1分間の制限時間
- 文字単位での正誤判定

### 2. 結果表示
- WPM（1分間の単語数）計算
- 正確性（%）の計算
- レベル別評価（初心者〜エキスパート）
- 詳細な統計情報

### 3. リアルタイムフィードバック
- 入力文字の色分け表示（正解：緑、不正解：赤）
- 進捗状況の表示
- 残り時間の表示

## 技術的な実装ポイント

### キー入力イベント処理
```typescript
const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
  const value = e.target.value;
  setUserInput(value);

  // 初回入力でタイマー開始
  if (!isActive && value.length === 1) {
    setIsActive(true);
    setStartTime(Date.now());
  }
};
```

**学習ポイント**: テキストエリアの`onChange`イベントを使って、ユーザーの入力をリアルタイムで検知します。これは料理人が包丁の動きを感じ取るように、キーボードの一文字一文字の入力を正確に捉える技術です。

### タイマー処理（useEffect）
```typescript
useEffect(() => {
  let interval: NodeJS.Timeout;

  if (isActive) {
    interval = setInterval(() => {
      setTimeElapsed(prev => {
        const newTime = prev + 0.1;
        if (newTime >= 60) {
          setIsActive(false);
          calculateResults();
          return 60;
        }
        return newTime;
      });
    }, 100);
  }

  return () => {
    if (interval) {
      clearInterval(interval);
    }
  };
}, [isActive]);
```

**学習ポイント**: `useEffect`と`setInterval`を使って、0.1秒ごとに時間を更新します。これは時計の秒針が刻一刻と進むように、正確な時間管理を実現する技術です。

### 速度と正確さの計算
```typescript
const calculateResults = () => {
  const words = currentText.split(' ').length;
  const userWords = userInput.split(' ').length;
  
  // 正確性の計算（文字レベル）
  let correctChars = 0;
  const minLength = Math.min(currentText.length, userInput.length);
  
  for (let i = 0; i < minLength; i++) {
    if (currentText[i] === userInput[i]) {
      correctChars++;
    }
  }
  
  const accuracy = (correctChars / currentText.length) * 100;
  
  // WPM計算（1分間の単語数）
  const timeInMinutes = timeElapsed / 60;
  const wpm = timeInMinutes > 0 ? Math.round(userWords / timeInMinutes) : 0;
};
```

**学習ポイント**: WPM（Words Per Minute）と正確性を計算するロジックを実装しました。これは料理の味と見た目を評価するように、タイピングの「速さ」と「正確さ」を数値化する技術です。

### 入力テキストと課題テキストの比較
```typescript
{userInput.split('').map((char, index) => {
  const isCorrect = index < currentText.length && char === currentText[index];
  const isExtra = index >= currentText.length;
  
  return (
    <span
      key={index}
      className={`${
        isCorrect ? 'text-green-600' : 
        isExtra ? 'text-red-600 bg-red-100' : 'text-red-600'
      }`}
    >
      {char}
    </span>
  );
})}
```

**学習ポイント**: 文字レベルで入力内容と正解を比較し、リアルタイムで色分け表示しました。これは校正者が原稿と清書を照合するように、一文字ずつ正確に比較する技術です。

## コンポーネント構成

### 1. TypingTest.tsx
- メインのタイピングテストコンポーネント
- タイマー、入力処理、結果計算を担当

### 2. Results.tsx
- テスト結果の表示コンポーネント
- WPM、正確性、詳細統計を表示

### 3. LearningPoints.tsx
- 学習ポイントの解説コンポーネント
- 技術要素の説明

## 状態管理

複数の状態を適切に管理しました：
- `isTestActive`: テストの進行状況
- `timeElapsed`: 経過時間
- `userInput`: ユーザーの入力内容
- `currentText`: 課題テキスト
- `results`: テスト結果

これは指揮者がオーケストラの各楽器の状態を把握するように、アプリ全体の状態を統合管理する技術です。

## 実用的な機能

1. **リアルタイムの進捗表示**: 入力文字数と目標文字数の比較
2. **文字単位での正誤判定**: 一文字ずつの正確性チェック
3. **詳細な統計情報**: WPM、正確性、効率性の計算
4. **レベル別の評価システム**: 初心者からエキスパートまでの5段階評価
5. **パーソナライズされたフィードバック**: 結果に応じた適切なアドバイス

## 今日学んだこと

1. **イベント処理の重要性**: ユーザーの入力に応じて適切に反応する技術
2. **タイマー処理の実装**: 正確な時間管理とクリーンアップ
3. **文字列操作**: 文字単位での比較と処理
4. **状態管理の複雑さ**: 複数の状態を適切に同期させる技術
5. **ユーザビリティ**: リアルタイムフィードバックの重要性

## 次のステップ

このタイピング速度テストを基に、以下のような機能を追加できます：
- 異なる難易度のテキスト
- 履歴機能（過去の結果保存）
- 統計グラフの表示
- 音声フィードバック
- マルチプレイヤーモード

今日の実装で、Reactのイベント処理、タイマー管理、状態管理の基礎をしっかりと学ぶことができました！ 