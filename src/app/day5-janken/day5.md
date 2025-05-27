

## はじめに

100DaysOfCodeチャレンジのDay5として、Reactでじゃんけんゲームを作成しました！
この記事では、初心者の方にも分かりやすく、じゃんけんゲームの**ロジック部分**を詳しく解説していきます。

## 完成したアプリの機能

- ✊ グー、✌️ チョキ、✋ パーから選択
- 🤖 コンピュータがランダムに手を選択
- 🏆 勝敗判定とスコア管理
- 🎮 ゲームリセット機能

## 1. データ構造の設計

まず、ゲームで使用するデータの「型」を定義します。

```typescript
type Choice = 'rock' | 'paper' | 'scissors'
type Result = 'win' | 'lose' | 'draw' | null

interface GameState {
  userChoice: Choice | null      // ユーザーが選んだ手
  computerChoice: Choice | null  // コンピュータが選んだ手
  result: Result                 // 勝敗結果
  score: {                      // スコア情報
    user: number                // ユーザーの勝利数
    computer: number            // コンピュータの勝利数
    draws: number               // 引き分け数
  }
}
```



- **`Choice`型**: じゃんけんの手を文字列で管理
- **`Result`型**: 勝敗結果を4パターンで管理（勝ち・負け・引き分け・未決定）
- **`GameState`**: ゲーム全体の状態をまとめて管理

## 2. 選択肢データの定義

じゃんけんの手の情報を配列で管理します。

```typescript
const choices: { value: Choice; label: string; emoji: string }[] = [
  { value: 'rock', label: 'グー', emoji: '✊' },
  { value: 'scissors', label: 'チョキ', emoji: '✌️' },
  { value: 'paper', label: 'パー', emoji: '✋' }
]
```



- **オブジェクトの配列**: 各手の情報（内部値・表示名・絵文字）をセットで管理
- **再利用性**: ボタン生成やemoji表示で同じデータを使い回し

## 3. 状態管理（useState）

Reactの`useState`でゲームの状態を管理します。

```typescript
const [gameState, setGameState] = useState<GameState>({
  userChoice: null,
  computerChoice: null,
  result: null,
  score: {
    user: 0,
    computer: 0,
    draws: 0
  }
})

const [isPlaying, setIsPlaying] = useState(false)
```



- **`gameState`**: ゲームのメイン状態（手・結果・スコア）
- **`isPlaying`**: ゲーム実行中かどうかのフラグ（ボタン無効化に使用）

## 4. コンピュータの手をランダム生成

```typescript
const getComputerChoice = (): Choice => {
  const randomIndex = Math.floor(Math.random() * choices.length)
  return choices[randomIndex].value
}
```



- **`Math.random()`**: 0以上1未満のランダムな小数を生成
- **`Math.floor()`**: 小数点以下を切り捨てて整数に変換
- **`choices.length`**: 配列の長さ（3）を掛けることで0〜2の整数を生成

### 🎯 具体例
```
Math.random() = 0.7234...
0.7234... × 3 = 2.1702...
Math.floor(2.1702...) = 2
choices[2].value = 'paper' (パー)
```

## 5. 勝敗判定ロジック

じゃんけんのルールをコードで表現します。

```typescript
const determineWinner = (userChoice: Choice, computerChoice: Choice): Result => {
  // 同じ手なら引き分け
  if (userChoice === computerChoice) {
    return 'draw'
  }
  
  // ユーザーが勝つパターン
  if (
    (userChoice === 'rock' && computerChoice === 'scissors') ||     // グー vs チョキ
    (userChoice === 'paper' && computerChoice === 'rock') ||        // パー vs グー
    (userChoice === 'scissors' && computerChoice === 'paper')       // チョキ vs パー
  ) {
    return 'win'
  }
  
  // 上記以外は負け
  return 'lose'
}
```



- **早期リターン**: 引き分けを最初にチェック
- **論理演算子**: `||`（OR）で複数の勝利条件を結合
- **明確なルール**: じゃんけんの3つの勝利パターンを明示

## 6. ゲーム実行の流れ

ユーザーが手を選んだときの処理です。

```typescript
const playGame = (userChoice: Choice) => {
  setIsPlaying(true)  // ゲーム実行中フラグをON
  
  // 1秒後に結果を表示（ドラマチック演出）
  setTimeout(() => {
    const computerChoice = getComputerChoice()           // コンピュータの手を決定
    const result = determineWinner(userChoice, computerChoice)  // 勝敗判定
    
    // 状態を更新
    setGameState(prevState => ({
      userChoice,
      computerChoice,
      result,
      score: {
        user: prevState.score.user + (result === 'win' ? 1 : 0),
        computer: prevState.score.computer + (result === 'lose' ? 1 : 0),
        draws: prevState.score.draws + (result === 'draw' ? 1 : 0)
      }
    }))
    
    setIsPlaying(false)  // ゲーム実行中フラグをOFF
  }, 1000)
}
```



- **`setTimeout`**: 1秒の遅延でドラマチックな演出
- **三項演算子**: `result === 'win' ? 1 : 0` で条件に応じてスコア加算
- **関数型更新**: `prevState => ({...})` で前の状態を基に新しい状態を作成

## 7. 結果表示のロジック

勝敗に応じてメッセージと色を変更します。

```typescript
// 結果メッセージ
const getResultMessage = () => {
  switch (gameState.result) {
    case 'win':
      return '🎉 あなたの勝ち！'
    case 'lose':
      return '😢 あなたの負け...'
    case 'draw':
      return '🤝 引き分け'
    default:
      return '手を選んでください'
  }
}

// 結果の色
const getResultColor = () => {
  switch (gameState.result) {
    case 'win':
      return 'text-green-600'
    case 'lose':
      return 'text-red-600'
    case 'draw':
      return 'text-yellow-600'
    default:
      return 'text-gray-600'
  }
}
```



- **`switch`文**: 複数の条件分岐を見やすく記述
- **関数の分離**: メッセージと色の処理を別々の関数に分割
- **デフォルト値**: 想定外の状態にも対応

## 8. UIでの状態反映

状態の変化をUIに反映させる部分です。

```typescript
// ボタンの無効化
<button
  onClick={() => playGame(choice.value)}
  disabled={isPlaying}  // ゲーム実行中は無効
  className={`
    ${isPlaying 
      ? 'bg-gray-100 border-gray-300 cursor-not-allowed'  // 無効時のスタイル
      : 'bg-white border-gray-300 hover:border-blue-500'  // 有効時のスタイル
    }
  `}
>

// 動的な絵文字表示
<div className="text-4xl mb-1">
  {isPlaying ? '🤔' :  // ゲーム実行中は考え中
    gameState.computerChoice ? 
      choices.find(c => c.value === gameState.computerChoice)?.emoji : '❓'
  }
</div>
```



- **条件付きレンダリング**: 状態に応じて表示内容を変更
- **`disabled`属性**: ボタンの有効/無効を制御
- **`find`メソッド**: 配列から条件に合う要素を検索

## まとめ

このじゃんけんゲームで学べるReactの重要概念：

1. **型定義**: TypeScriptでデータ構造を明確化
2. **状態管理**: `useState`で複雑な状態を管理
3. **ロジック分離**: 各機能を独立した関数に分割
4. **条件分岐**: `if`文、`switch`文、三項演算子の使い分け
5. **配列操作**: `find`、`map`メソッドの活用
6. **非同期処理**: `setTimeout`でタイミング制御

## 次のステップ

- 🎵 効果音の追加
- 📊 勝率の計算と表示
- 🏆 連勝記録の管理
- 💾 ローカルストレージでスコア保存

初心者の方も、一つずつ理解していけば必ず作れるようになります！
ぜひチャレンジしてみてください 🚀
