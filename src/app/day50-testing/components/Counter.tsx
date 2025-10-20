'use client'

import React, { useState } from 'react'

export const Counter: React.FC = () => {
  const [count, setCount] = useState(0)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center space-x-4">
        <button
          onClick={() => setCount(count - 1)}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
          aria-label="Decrement"
        >
          -
        </button>
        <span
          className="text-3xl font-bold text-gray-800 w-24 text-center"
          data-testid="count-value"
        >
          {count}
        </span>
        <button
          onClick={() => setCount(count + 1)}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
          aria-label="Increment"
        >
          +
        </button>
      </div>
      <button
        onClick={() => setCount(0)}
        className="w-full bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
      >
        リセット
      </button>
    </div>
  )
}

