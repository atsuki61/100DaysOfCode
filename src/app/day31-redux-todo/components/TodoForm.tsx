'use client'

import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addTodo } from '../store/todoSlice'
import { AppDispatch } from '../store'

export default function TodoForm() {
  const [text, setText] = useState('')
  const dispatch = useDispatch<AppDispatch>()

  // フォーム送信処理
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // 空文字列の場合は何もしない
    if (!text.trim()) return
    
    // 新しいToDoを追加
    dispatch(addTodo({ text: text.trim() }))
    
    // 入力フィールドをクリア
    setText('')
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex gap-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="新しいタスクを入力してください..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          maxLength={100}
        />
        <button
          type="submit"
          disabled={!text.trim()}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          追加
        </button>
      </div>
    </form>
  )
} 