# Day 31: Redux Toolkit ToDoアプリ

## 📚 学習内容

### Redux Toolkitとは
Redux Toolkitは、Reduxの公式推奨ライブラリで、Reduxアプリケーションの開発を簡素化するためのツールセットです。従来のReduxと比べて、ボイラープレートコードを大幅に削減し、より直感的なAPIを提供します。

### 主要な特徴
- **createSlice**: アクションとリデューサーを一箇所で定義
- **configureStore**: ストアの設定を簡素化
- **Immer統合**: イミュータブルな状態更新を簡単に
- **DevTools統合**: デバッグツールが標準で利用可能
- **TypeScript対応**: 型安全性を保ちながら開発

## 🛠️ 実装内容

### 1. プロジェクト構造
```
src/app/day31-redux-todo/
├── layout.tsx          # レイアウト設定
├── page.tsx           # メインページ
├── day31.md          # 学習記録
├── types.ts          # 型定義
├── store/            # Reduxストア
│   ├── index.ts      # ストア設定
│   └── todoSlice.ts  # ToDoスライス
└── components/       # UIコンポーネント
    ├── TodoForm.tsx  # タスク追加フォーム
    ├── TodoItem.tsx  # 個別タスク表示
    ├── TodoList.tsx  # タスク一覧
    ├── TodoFilter.tsx # フィルタリング
    └── index.ts      # エクスポート
```

### 2. 型定義（types.ts）
```typescript
// ToDoアイテムの型定義
export interface Todo {
  id: string
  text: string
  completed: boolean
  createdAt: number
  updatedAt: number
}

// フィルターの型定義
export type TodoFilter = 'all' | 'active' | 'completed'

// ToDoスライスの状態型定義
export interface TodoState {
  todos: Todo[]
  filter: TodoFilter
  loading: boolean
  error: string | null
}
```

### 3. Reduxスライス（todoSlice.ts）
```typescript
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<AddTodoPayload>) => {
      const newTodo: Todo = {
        id: Date.now().toString(),
        text: action.payload.text,
        completed: false,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      }
      state.todos.push(newTodo)
    },
    // 他のアクション...
  },
})
```

### 4. ストア設定（store/index.ts）
```typescript
import { configureStore } from '@reduxjs/toolkit'
import todoReducer from './todoSlice'

export const store = configureStore({
  reducer: {
    todos: todoReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
})
```

### 5. コンポーネントでの使用
```typescript
// 状態の取得
const { todos, filter } = useSelector((state: RootState) => state.todos)

// アクションの送信
const dispatch = useDispatch<AppDispatch>()
dispatch(addTodo({ text: '新しいタスク' }))
```

## 🎯 学習ポイント

### Redux Toolkitの利点
1. **ボイラープレート削減**: 従来のReduxより簡潔なコード
2. **Immer統合**: イミュータブルな更新が簡単
3. **DevTools統合**: デバッグが容易
4. **TypeScript対応**: 型安全性

### 状態管理の概念
- **Store**: アプリケーション全体の状態
- **Slice**: 機能ごとの状態管理
- **Actions**: 状態を変更するための指示
- **Reducers**: アクションに基づいて状態を更新
- **Selectors**: 状態からデータを取得

### React-Redux Hooks
- **useSelector**: ストアから状態を取得
- **useDispatch**: アクションを送信
- **Provider**: コンポーネントにストアを提供

## 🔧 実装のポイント

### 1. 型安全性
TypeScriptとRedux Toolkitを組み合わせることで、型安全な状態管理を実現できます。

### 2. イミュータブル更新
Immerにより、直接的な状態変更が可能になり、バグのリスクを減らせます。

### 3. コンポーネント設計
- 関心事の分離
- 再利用可能なコンポーネント
- 適切なprops設計

### 4. パフォーマンス最適化
- 必要な部分のみをsubscribe
- メモ化の活用
- 不要な再レンダリングの防止

## 📖 参考資料
- [Redux Toolkit公式ドキュメント](https://redux-toolkit.js.org/)
- [React-Redux公式ドキュメント](https://react-redux.js.org/)
- [Redux DevTools](https://github.com/reduxjs/redux-devtools)

## 🎉 まとめ
Redux Toolkitを使用することで、従来のReduxよりも簡潔で保守性の高い状態管理を実現できました。特に、TypeScriptとの組み合わせにより、型安全性を保ちながら効率的な開発が可能になりました。

次回は、React Hook Formを使用したフォームバリデーション機能を実装します。 