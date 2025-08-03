'use client'

import { useSelector, useDispatch } from 'react-redux'
import { RootState, AppDispatch } from '../store'
import { setFilter } from '../store/todoSlice'
import { TodoFilter } from '../types'

export default function TodoFilter() {
  const dispatch = useDispatch<AppDispatch>()
  const { todos, filter } = useSelector((state: RootState) => state.todos)

  // 統計情報を計算
  const totalTodos = todos.length
  const activeTodos = todos.filter(todo => !todo.completed).length
  const completedTodos = todos.filter(todo => todo.completed).length

  // フィルターを設定
  const handleFilterChange = (newFilter: TodoFilter) => {
    dispatch(setFilter(newFilter))
  }

  // フィルターボタンのスタイルを取得
  const getButtonStyle = (buttonFilter: TodoFilter) => {
    const baseStyle = "px-4 py-2 text-sm font-medium rounded-lg transition-colors"
    return filter === buttonFilter
      ? `${baseStyle} bg-blue-500 text-white`
      : `${baseStyle} text-gray-600 hover:text-gray-900 hover:bg-gray-100`
  }

  // ToDoが存在しない場合は何も表示しない
  if (totalTodos === 0) {
    return null
  }

  return (
    <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg">
      {/* フィルターボタン */}
      <div className="flex gap-1">
        <button
          onClick={() => handleFilterChange('all')}
          className={getButtonStyle('all')}
        >
          全て ({totalTodos})
        </button>
        <button
          onClick={() => handleFilterChange('active')}
          className={getButtonStyle('active')}
        >
          アクティブ ({activeTodos})
        </button>
        <button
          onClick={() => handleFilterChange('completed')}
          className={getButtonStyle('completed')}
        >
          完了 ({completedTodos})
        </button>
      </div>

      {/* 進捗バー */}
      <div className="flex items-center gap-2">
        <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-blue-500 transition-all duration-300"
            style={{ 
              width: totalTodos > 0 ? `${(completedTodos / totalTodos) * 100}%` : '0%' 
            }}
          />
        </div>
        <span className="text-xs text-gray-500">
          {Math.round((completedTodos / totalTodos) * 100)}%
        </span>
      </div>
    </div>
  )
} 