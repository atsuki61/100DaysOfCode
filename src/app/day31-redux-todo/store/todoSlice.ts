import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TodoState, Todo, AddTodoPayload, UpdateTodoPayload, TodoFilter } from '../types'

// 初期状態の定義
const initialState: TodoState = {
  todos: [
    {
      id: '1',
      text: 'Redux Toolkitを学ぶ',
      completed: false,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
    {
      id: '2',
      text: 'ToDoアプリを作成する',
      completed: true,
      createdAt: Date.now() - 86400000, // 1日前
      updatedAt: Date.now() - 3600000, // 1時間前
    },
  ],
  filter: 'all',
  loading: false,
  error: null,
}

// ToDoスライスの作成
export const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    // 新しいToDoを追加
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

    // ToDoの完了状態を切り替え
    toggleTodo: (state, action: PayloadAction<string>) => {
      const todo = state.todos.find(t => t.id === action.payload)
      if (todo) {
        todo.completed = !todo.completed
        todo.updatedAt = Date.now()
      }
    },

    // ToDoを削除
    deleteTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload)
    },

    // ToDoを更新
    updateTodo: (state, action: PayloadAction<UpdateTodoPayload>) => {
      const todo = state.todos.find(t => t.id === action.payload.id)
      if (todo) {
        if (action.payload.text !== undefined) {
          todo.text = action.payload.text
        }
        if (action.payload.completed !== undefined) {
          todo.completed = action.payload.completed
        }
        todo.updatedAt = Date.now()
      }
    },

    // フィルターを設定
    setFilter: (state, action: PayloadAction<TodoFilter>) => {
      state.filter = action.payload
    },

    // 完了済みのToDoを全て削除
    clearCompleted: (state) => {
      state.todos = state.todos.filter(todo => !todo.completed)
    },

    // 全てのToDoを完了/未完了に設定
    toggleAll: (state, action: PayloadAction<boolean>) => {
      state.todos.forEach(todo => {
        todo.completed = action.payload
        todo.updatedAt = Date.now()
      })
    },

    // ローディング状態を設定
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },

    // エラー状態を設定
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
  },
})

// アクションのエクスポート
export const {
  addTodo,
  toggleTodo,
  deleteTodo,
  updateTodo,
  setFilter,
  clearCompleted,
  toggleAll,
  setLoading,
  setError,
} = todoSlice.actions

// リデューサーのエクスポート
export default todoSlice.reducer 