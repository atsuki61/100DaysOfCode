'use client'

import { useSelector, useDispatch } from 'react-redux'
import { RootState, AppDispatch } from '../store'
import { toggleAll, clearCompleted } from '../store/todoSlice'
import TodoItem from './TodoItem'

export default function TodoList() {
  const dispatch = useDispatch<AppDispatch>()
  const { todos, filter } = useSelector((state: RootState) => state.todos)

  // フィルタリングされたToDoリストを取得
  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case 'active':
        return !todo.completed
      case 'completed':
        return todo.completed
      default:
        return true
    }
  })

  // 統計情報を計算
  const totalTodos = todos.length
  const completedTodos = todos.filter(todo => todo.completed).length
  const activeTodos = totalTodos - completedTodos
  const allCompleted = totalTodos > 0 && completedTodos === totalTodos

  // 全てのToDoを完了/未完了に設定
  const handleToggleAll = () => {
    dispatch(toggleAll(!allCompleted))
  }

  // 完了済みのToDoを全て削除
  const handleClearCompleted = () => {
    dispatch(clearCompleted())
  }

  // 空の状態の表示
  if (totalTodos === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-4">
          <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">タスクがありません</h3>
        <p className="text-gray-500">新しいタスクを追加して始めましょう！</p>
      </div>
    )
  }

  // フィルタリング結果が空の場合
  if (filteredTodos.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">
          {filter === 'active' ? 'アクティブなタスクがありません' : '完了したタスクがありません'}
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* 一括操作バー */}
      {totalTodos > 0 && (
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={allCompleted}
              onChange={handleToggleAll}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="text-sm text-gray-600">
              {completedTodos} / {totalTodos} 完了
            </span>
          </div>
          
          {completedTodos > 0 && (
            <button
              onClick={handleClearCompleted}
              className="text-sm text-red-600 hover:text-red-700 transition-colors"
            >
              完了済みを削除
            </button>
          )}
        </div>
      )}

      {/* ToDoリスト */}
      <div className="space-y-2">
        {filteredTodos.map(todo => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </div>

      {/* 統計情報 */}
      <div className="text-center text-sm text-gray-500 pt-4 border-t">
        <p>
          合計: {totalTodos} | アクティブ: {activeTodos} | 完了: {completedTodos}
        </p>
      </div>
    </div>
  )
} 