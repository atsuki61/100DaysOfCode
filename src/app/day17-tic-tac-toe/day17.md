# Day 17: ○×ゲーム（三目並べ）実装記録

## 📅 実装日
2024年

## 🎯 今日の目標
二人対戦の三目並べゲームを作成し、以下の学習ポイントを習得する：
- 二次元配列の状態管理
- 勝利条件の判定ロジック
- 状態リフトアップ
- コンポーネント間の連携

## 🎮 完成したアプリの機能
- 3×3のゲームボードでの対戦
- ❌（X）と⭕（O）の交互プレイ
- 縦・横・斜めの3つ並びで勝利判定
- 勝利セルのハイライト表示
- 引き分け判定
- ゲーム終了後のリスタート機能
- 手数カウント表示

## 🧠 学習内容詳細

### 1. 二次元配列の状態管理

#### なぜ二次元配列が必要？
三目並べのゲームボードは「縦3×横3」の格子状になっています。これは現実世界で言うと、**アパートの部屋**のようなものです。

```typescript
// アパート（ゲームボード）の例
// 1階: [101号室, 102号室, 103号室]
// 2階: [201号室, 202号室, 203号室] 
// 3階: [301号室, 302号室, 303号室]

type Board = Player[][]; // Player = 'X' | 'O' | null
```

#### 実装のポイント
- `Array(3).fill(null).map(() => Array(3).fill(null))` で空のボードを作成
- `board[行][列]` でアクセス（例：`board[0][1]` = 1行目2列目）
- 状態更新時は新しい配列を作成（Reactの原則）

### 2. 勝利条件の判定ロジック

#### 勝利パターンの考え方
三目並べで勝利する方法は全部で8通りあります：

```typescript
const WINNING_PATTERNS = [
  // 横の3つ（いわゆる「横一列」）
  [{ row: 0, col: 0 }, { row: 0, col: 1 }, { row: 0, col: 2 }], // 1行目
  [{ row: 1, col: 0 }, { row: 1, col: 1 }, { row: 1, col: 2 }], // 2行目
  [{ row: 2, col: 0 }, { row: 2, col: 1 }, { row: 2, col: 2 }], // 3行目
  
  // 縦の3つ（いわゆる「縦一列」）
  [{ row: 0, col: 0 }, { row: 1, col: 0 }, { row: 2, col: 0 }], // 1列目
  [{ row: 0, col: 1 }, { row: 1, col: 1 }, { row: 2, col: 1 }], // 2列目
  [{ row: 0, col: 2 }, { row: 1, col: 2 }, { row: 2, col: 2 }], // 3列目
  
  // 斜めの3つ（いわゆる「斜め」）
  [{ row: 0, col: 0 }, { row: 1, col: 1 }, { row: 2, col: 2 }], // 左上から右下
  [{ row: 0, col: 2 }, { row: 1, col: 1 }, { row: 2, col: 0 }], // 右上から左下
];
```

これは**ビンゴゲーム**と同じ考え方です！

#### 判定アルゴリズム
```typescript
const checkWinner = (board: Board) => {
  for (const pattern of WINNING_PATTERNS) {
    const [pos1, pos2, pos3] = pattern;
    const cell1 = board[pos1.row][pos1.col];
    const cell2 = board[pos2.row][pos2.col];
    const cell3 = board[pos3.row][pos3.col];

    // 3つの位置が全て同じプレイヤーで埋まっているかチェック
    if (cell1 && cell1 === cell2 && cell2 === cell3) {
      return { winner: cell1, winningCells: pattern };
    }
  }
  return { winner: null, winningCells: [] };
};
```

### 3. 状態リフトアップ

#### 概念説明
「状態リフトアップ」とは、**家族の共有情報を家の掲示板に貼る**ようなものです。

例：
- 🏠 家（親コンポーネント）= TicTacToe
- 👨‍👩‍👧‍👦 家族（子コンポーネント）= GameBoard, GameStatus
- 📋 掲示板（共有状態）= ゲームボードの状態

#### 実装例
```typescript
// 親コンポーネント（TicTacToe）で状態を管理
const [gameState, setGameState] = useState<GameState>({
  board: createInitialBoard(),
  currentPlayer: 'X',
  status: 'playing',
  winner: null,
  moveCount: 0,
});

// 子コンポーネントにpropsとして渡す
<GameBoard 
  board={gameState.board}
  onCellClick={handleCellClick}
/>
<GameStatus 
  status={gameState.status}
  currentPlayer={gameState.currentPlayer}
/>
```

### 4. コンポーネント間の連携

#### コンポーネント構成
```
TicTacToe（親）
├── GameStatus（ゲーム状態表示）
├── GameBoard（ボード表示）
│   └── Cell（個別セル）× 9個
└── ルール説明
```

#### データフロー
1. **トップダウン**：親 → 子にpropsで状態を渡す
2. **ボトムアップ**：子 → 親にコールバック関数でイベントを通知

```typescript
// 子から親への通知例
const Cell = ({ value, onClick }: CellProps) => {
  return (
    <button onClick={onClick}> {/* クリック時に親のhandleCellClickが実行される */}
      {value}
    </button>
  );
};
```

## 🤔 実装で苦労した点

### 1. 勝利セルのハイライト
**問題**：どのセルが勝利に貢献したかを視覚的に表示したい
**解決**：勝利パターンの位置情報を状態として保持し、該当セルに特別なスタイルを適用

### 2. ゲーム状態の管理
**問題**：プレイ中・勝利・引き分けの状態をどう管理するか
**解決**：`GameStatus`型を定義し、明確に状態を分離

### 3. 不正な操作の防止
**問題**：既に埋まっているセルをクリックされないようにしたい
**解決**：セルクリック時に早期リターンで不正操作をブロック

## 💡 学んだベストプラクティス

### 1. 型安全性の重要性
```typescript
type Player = 'X' | 'O' | null; // nullも明示的に型に含める
type GameStatus = 'playing' | 'won' | 'draw'; // 有限の状態を表現
```

### 2. useCallbackの活用
```typescript
const handleCellClick = useCallback((row: number, col: number) => {
  // 処理
}, [gameState, checkWinner, isBoardFull]);
```
- 不要な再レンダリングを防ぐ
- パフォーマンス最適化

### 3. 関心事の分離
- `Cell`: 個別セルの表示とクリック処理
- `GameBoard`: ボード全体のレイアウト
- `GameStatus`: ゲーム状態の表示
- `TicTacToe`: ゲームロジックと状態管理

## 🎨 UI/UXの工夫

### 1. 視覚的フィードバック
- 勝利セルを緑色でハイライト
- ホバー時のスケール変化（`hover:scale-105`）
- プレイヤーの色分け（X=青、O=赤）

### 2. レスポンシブ対応
```css
w-20 h-20 sm:w-24 sm:h-24  /* スマホでは小さく、PC では大きく */
text-2xl sm:text-3xl       /* 文字サイズも画面サイズに応じて調整 */
```

### 3. アクセシビリティ
- `focus:outline-none focus:ring-2 focus:ring-blue-500` でキーボード操作対応
- `disabled={value !== null}` で適切な無効化

## 🔄 今後の拡張案

### 1. AI対戦モード
- MinMaxアルゴリズムでコンピュータ対戦
- 難易度設定（初級・中級・上級）

### 2. オンライン対戦
- WebSocketを使ったリアルタイム対戦
- ルーム機能

### 3. アニメーション強化
- セル配置時のアニメーション
- 勝利ライン表示のアニメーション

### 4. 統計機能
- 勝率記録
- 対戦履歴

## 📚 参考資料

- [React公式ドキュメント - State のリフトアップ](https://ja.react.dev/learn/sharing-state-between-components)
- [TypeScript Handbook - Arrays](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#arrays)
- [MDN - Array.prototype.every()](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/every)

## 💭 感想
二次元配列の操作や勝利判定のロジック実装を通じて、**アルゴリズム的思考**が大幅に向上しました。特に、状態管理の複雑さを体感し、Reactの設計思想への理解が深まりました。ゲーム開発は楽しく、UI/UXにもこだわることができて大満足です！

---

**明日の予定**: Day 18では学習進捗チャートアプリの実装を予定。Chart.jsやRechartsなどのグラフライブラリの学習に挑戦します！ 