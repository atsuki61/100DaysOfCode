# Day 21: ショッピングカートアプリ

## 📚 学習内容

今日は**Context API**を使ったグローバル状態管理を学習し、本格的なショッピングカートアプリケーションを実装しました。

## 🎯 学習目標

- **Context API**によるグローバル状態管理
- 複数コンポーネント間のデータ共有
- 合計計算ロジックの実装
- カート内商品の数量変更機能

## 🛠️ 技術スタック

- **React**: UI構築
- **Next.js**: フレームワーク
- **TypeScript**: 型安全性
- **TailwindCSS**: スタイリング
- **Context API**: グローバル状態管理

## 📖 実装のポイント

### 1. Context APIによる状態管理

```typescript
// CartContext.tsx
const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  // ...
};
```

**なぜContext API？**
- Reduxよりもシンプルで学習コストが低い
- 小中規模のアプリケーションに最適
- Reactの標準機能なので追加ライブラリ不要

### 2. useReducerによる複雑な状態管理

```typescript
const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART':
      // 商品追加ロジック
    case 'REMOVE_FROM_CART': 
      // 商品削除ロジック
    case 'UPDATE_QUANTITY':
      // 数量更新ロジック
  }
};
```

**useReducerのメリット：**
- 複数の関連する状態を一箇所で管理
- 状態の変更パターンが明確
- デバッグしやすい

### 3. 合計金額の自動計算

```typescript
const calculateTotals = (state: CartState): CartState => {
  const totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = state.items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  
  return { ...state, totalItems, totalPrice };
};
```

**ポイント：**
- `reduce`関数で効率的に集計
- 状態変更のたびに自動で再計算
- 一箇所で計算ロジックを管理

### 4. TypeScriptでの型安全性

```typescript
export interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}

export type CartAction =
  | { type: 'ADD_TO_CART'; payload: Product }
  | { type: 'REMOVE_FROM_CART'; payload: number }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: number; quantity: number } };
```

**型定義のメリット：**
- バグを事前に防止
- IDEでの自動補完
- リファクタリング時の安全性

## 🎨 UI/UXの工夫

### 1. レスポンシブレイアウト
- デスクトップ：商品一覧（2/3）+ カート（1/3）
- モバイル：縦並びレイアウト

### 2. リアルタイムフィードバック
- ボタンクリック時の視覚的フィードバック
- カートアイコンに商品数表示
- 合計金額の即座更新

### 3. ユーザビリティ
- スティッキーカート（スクロールしても固定）
- 直感的な数量変更ボタン
- 価格の日本円フォーマット

## 💡 学んだこと

### Context APIの基本パターン

1. **Context作成**: `createContext()`
2. **Provider提供**: 状態とアクションを提供
3. **カスタムフック**: `useContext`をラップして使いやすく
4. **エラーハンドリング**: Providerの外で使用時のエラー処理

### 状態管理のベストプラクティス

1. **単一責任**: 各アクションは一つの責任のみ
2. **イミュータブル**: 常に新しいオブジェクトを返す
3. **計算の分離**: 副作用のない純粋関数で計算
4. **型安全性**: TypeScriptで型を明確に定義

## 🔄 実際の開発での応用

このパターンは以下のような場面で活用できます：

- **ユーザー認証状態の管理**
- **テーマ（ダーク/ライトモード）の管理**
- **多言語対応の言語設定**
- **通知システムの状態管理**

## 📈 次のステップ

今後の改善案：
1. **永続化**: LocalStorageでカート内容を保存
2. **最適化**: React.memoでレンダリング最適化
3. **テスト**: カート操作のユニットテスト
4. **API連携**: バックエンドとの連携

## ✨ 感想

Context APIを使った状態管理は、Reduxより直感的で理解しやすく、小規模なアプリケーションには非常に適していることがわかりました。useReducerと組み合わせることで、複雑な状態ロジックも綺麗に整理できるのが印象的でした。

今回の実装で、Reactアプリケーションにおける状態管理の重要性と、適切なパターンの選択方法を学ぶことができました。 