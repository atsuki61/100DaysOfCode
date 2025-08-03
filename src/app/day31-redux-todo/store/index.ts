import { configureStore } from '@reduxjs/toolkit'
import todoReducer from './todoSlice'
import { RootState } from '../types'

// Reduxストアの設定
export const store = configureStore({
  reducer: {
    todos: todoReducer,
  },
  // 開発環境でのDevTools有効化
  devTools: process.env.NODE_ENV !== 'production',
})

// 型安全なストアの型定義
export type AppStore = typeof store
export type AppDispatch = typeof store.dispatch

// ルート状態の型定義（RootStateを再エクスポート）
export type { RootState } 