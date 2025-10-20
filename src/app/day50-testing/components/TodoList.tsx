'use client'

import React, { useState } from 'react'

interface Todo {
  id: number
  text: string
  completed: boolean
}

export const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([])
  const [inputValue, setInputValue] = useState('')

  const addTodo = () => {
    if (inputValue.trim()) {
      const newTodo: Todo = {
        id: Date.now(),
        text: inputValue.trim(),
        completed: false,
      }
      setTodos([...todos, newTodo])
      setInputValue('')
    }
  }

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addTodo()
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex space-x-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="新しいタスクを入力..."
          className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
          aria-label="New todo input"
        />
        <button
          onClick={addTodo}
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          追加
        </button>
      </div>

      {todos.length === 0 ? (
        <p className="text-gray-500 text-center py-8" data-testid="empty-message">
          タスクがありません
        </p>
      ) : (
        <ul className="space-y-2" role="list">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded border border-gray-200"
              data-testid="todo-item"
            >
              <div className="flex items-center flex-1">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                  className="mr-3 w-4 h-4"
                  aria-label={`Toggle ${todo.text}`}
                />
                <span
                  className={`${
                    todo.completed
                      ? 'line-through text-gray-400'
                      : 'text-gray-800'
                  }`}
                >
                  {todo.text}
                </span>
              </div>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="text-red-500 hover:text-red-700 ml-2"
                aria-label={`Delete ${todo.text}`}
              >
                削除
              </button>
            </li>
          ))}
        </ul>
      )}

      {todos.length > 0 && (
        <div className="text-sm text-gray-600" data-testid="todo-stats">
          合計: {todos.length} 個 | 完了: {todos.filter((t) => t.completed).length} 個
        </div>
      )}
    </div>
  )
}

