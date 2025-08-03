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

// 新規ToDo作成時のペイロード型定義
export interface AddTodoPayload {
  text: string
}

// ToDo更新時のペイロード型定義
export interface UpdateTodoPayload {
  id: string
  text?: string
  completed?: boolean
}

// ルート状態の型定義（将来的な拡張を考慮）
export interface RootState {
  todos: TodoState
} 