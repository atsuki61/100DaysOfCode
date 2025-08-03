'use client'

import { useState, useRef, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { toggleTodo, deleteTodo, updateTodo } from '../store/todoSlice'
import { Todo } from '../types'
import { AppDispatch } from '../store'

interface TodoItemProps {
  todo: Todo
}

export default function TodoItem({ todo }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(todo.text)
  const editInputRef = useRef<HTMLInputElement>(null)
  const dispatch = useDispatch<AppDispatch>()

  // 編集モード開始時のフォーカス
  useEffect(() => {
    if (isEditing && editInputRef.current) {
      editInputRef.current.focus()
      editInputRef.current.select()
    }
  }, [isEditing])

  // 完了状態の切り替え
  const handleToggle = () => {
    dispatch(toggleTodo(todo.id))
  }

  // ToDoの削除
  const handleDelete = () => {
    dispatch(deleteTodo(todo.id))
  }

  // 編集モードの開始
  const handleEdit = () => {
    setIsEditing(true)
    setEditText(todo.text)
  }

  // 編集の保存
  const handleSave = () => {
    const trimmedText = editText.trim()
    if (trimmedText && trimmedText !== todo.text) {
      dispatch(updateTodo({ id: todo.id, text: trimmedText }))
    } else if (!trimmedText) {
      // 空文字列の場合は削除
      dispatch(deleteTodo(todo.id))
    }
    setIsEditing(false)
  }

  // 編集のキャンセル
  const handleCancel = () => {
    setIsEditing(false)
    setEditText(todo.text)
  }

  // Enterキーで保存、Escapeキーでキャンセル
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave()
    } else if (e.key === 'Escape') {
      handleCancel()
    }
  }

  // 作成日時のフォーマット
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    
    if (diffInHours < 1) {
      return '数分前'
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}時間前`
    } else {
      return date.toLocaleDateString('ja-JP')
    }
  }

  return (
    <div className={`flex items-center gap-3 p-4 border rounded-lg transition-colors ${
      todo.completed 
        ? 'bg-gray-50 border-gray-200' 
        : 'bg-white border-gray-300 hover:border-gray-400'
    }`}>
      {/* チェックボックス */}
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={handleToggle}
        className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
      />

      {/* ToDo内容 */}
      <div className="flex-1 min-w-0">
        {isEditing ? (
          <input
            ref={editInputRef}
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleSave}
            className="w-full px-2 py-1 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            maxLength={100}
          />
        ) : (
          <div className="flex items-center gap-2">
            <span 
              className={`flex-1 ${
                todo.completed 
                  ? 'line-through text-gray-500' 
                  : 'text-gray-900'
              }`}
              onDoubleClick={handleEdit}
            >
              {todo.text}
            </span>
            <span className="text-xs text-gray-400">
              {formatDate(todo.updatedAt)}
            </span>
          </div>
        )}
      </div>

      {/* アクションボタン */}
      <div className="flex gap-1">
        {!isEditing && (
          <button
            onClick={handleEdit}
            className="p-1 text-gray-400 hover:text-blue-500 transition-colors"
            title="編集"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
        )}
        <button
          onClick={handleDelete}
          className="p-1 text-gray-400 hover:text-red-500 transition-colors"
          title="削除"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  )
} 