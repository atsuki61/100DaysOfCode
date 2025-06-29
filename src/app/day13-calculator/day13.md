# Day 13: 電卓アプリ

## 📋 今日の目標
四則演算ができるシンプルな電卓アプリを作成し、複数の状態管理とUIイベントの詳細な制御を学習する。

## 🛠️ 実装した機能

### ✅ 基本機能
- [x] 数字入力（0-9）
- [x] 四則演算（+, -, *, /）
- [x] 小数点入力
- [x] 計算実行（=）
- [x] 全体クリア（C）
- [x] 連続計算機能

### ✅ 高度な機能
- [x] ０除算エラー処理
- [x] 計算状態の管理
- [x] レスポンシブデザイン
- [x] ホバーエフェクト
- [x] TypeScript型安全性

## 💡 技術学習ポイント

### 1. 複数状態管理 (useState複数利用)
```typescript
interface CalculatorState {
  display: string;           // 現在の表示値
  previousValue: number | null;  // 前の値
  operation: Operation;      // 選択された演算子
  waitingForNewValue: boolean;   // 新しい値を待機中かどうか
}
```

### 2. ボタンクリックによる計算ロジック
- 数字ボタン処理
- 演算子ボタン処理
- イコールボタン処理
- クリアボタン処理
- 小数点ボタン処理

### 3. UIイベントの詳細な制御

#### useCallbackによる最適化
```typescript
const handleNumber = useCallback((num: string) => {
  setState(prevState => {
    if (prevState.waitingForNewValue) {
      return {
        ...prevState,
        display: num,
        waitingForNewValue: false,
      };
    }
    return {
      ...prevState,
      display: prevState.display === '0' ? num : prevState.display + num,
    };
  });
}, []);
```

#### 条件分岐による状態管理
```typescript
const handleOperator = useCallback((nextOperation: string) => {
  const inputValue = parseFloat(state.display);

  setState(prevState => {
    if (prevState.previousValue === null) {
      // 最初の値の場合
      return {
        ...prevState,
        previousValue: inputValue,
        operation: nextOperation as Operation,
        waitingForNewValue: true,
      };
    }

    if (prevState.operation && !prevState.waitingForNewValue) {
      // 連続計算の場合
      const currentValue = prevState.previousValue || 0;
      const result = calculate(currentValue, inputValue, prevState.operation);

      return {
        ...prevState,
        display: String(result),
        previousValue: result,
        operation: nextOperation as Operation,
        waitingForNewValue: true,
      };
    }

    // 演算子変更の場合
    return {
      ...prevState,
      operation: nextOperation as Operation,
      waitingForNewValue: true,
    };
  });
}, [state.display]);
```

## 🎨 UI/UXデザイン

### ボタンデザイン
- **数字ボタン**: グレー系（bg-gray-100）
- **演算子ボタン**: ブルー系（bg-blue-500）
- **イコールボタン**: グリーン系（bg-green-500）
- **クリアボタン**: レッド系（bg-red-500）

### インタラクション
- ホバーエフェクト
- スケール変換（transform hover:scale-105）
- アクティブ状態（active:scale-95）
- 影効果（shadow-md）

### レスポンシブデザイン
- グリッドレイアウト（grid grid-cols-4）
- 適切なGap設定（gap-3）
- モバイル対応サイズ

## 🔍 TypeScript活用ポイント

### 型定義
```typescript
export type Operation = '+' | '-' | '*' | '/' | null;
export type ButtonType = 'number' | 'operator' | 'equals' | 'clear' | 'decimal';

interface CalculatorState {
  display: string;
  previousValue: number | null;
  operation: Operation;
  waitingForNewValue: boolean;
}
```

### 型安全な関数
```typescript
const calculate = useCallback((
  firstValue: number, 
  secondValue: number, 
  operation: Operation
): number => {
  switch (operation) {
    case '+': return firstValue + secondValue;
    case '-': return firstValue - secondValue;
    case '*': return firstValue * secondValue;
    case '/': return secondValue !== 0 ? firstValue / secondValue : firstValue;
    default: return secondValue;
  }
}, []);
```

## 🧪 エラーハンドリング

### ０除算対策
```typescript
case '/':
  return secondValue !== 0 ? firstValue / secondValue : firstValue;
```

### 小数点重複防止
```typescript
if (prevState.display.indexOf('.') === -1) {
  return {
    ...prevState,
    display: prevState.display + '.',
  };
}
```

## 📚 学んだこと

### React Hooks
- **useState**: 複数状態の効率的な管理
- **useCallback**: 関数のメモ化によるパフォーマンス最適化

### 状態設計
- 計算機の状態を適切に分離
- 待機状態の概念（waitingForNewValue）
- 前の値と現在の値の管理

### イベント処理
- ボタンタイプによる処理の分岐
- 連続計算のロジック
- 入力値の検証と制御

### CSS/Tailwind
- グリッドレイアウトの活用
- コンポーネント指向のスタイリング
- インタラクティブなエフェクト

## 🚀 今後の改善案
- [ ] キーボード入力対応
- [ ] 計算履歴機能
- [ ] より高度な演算（%, √など）
- [ ] メモリ機能（M+, M-, MR, MC）
- [ ] アニメーション効果の追加

## 💭 振り返り
電卓アプリの実装を通じて、React における複雑な状態管理とイベント処理を深く理解できました。特に、複数の useCallback フックを使った最適化や、条件分岐による状態の制御は非常に勉強になりました。TypeScript の型システムにより、バグの少ない安全なコードを書くことができました。 