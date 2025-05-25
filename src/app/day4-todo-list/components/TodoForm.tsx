'use client';

import { useState } from 'react';
import { TodoFormProps } from '../types';

export const TodoForm = ({ onAdd }: TodoFormProps) => {
  const [inputText, setInputText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (inputText.trim() === '') {
      return;
    }

    onAdd(inputText.trim());
    setInputText('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex gap-3">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="新しいタスクを入力してください"
          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          maxLength={100}
        />
        <button
          type="submit"
          className="px-6 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={inputText.trim() === ''}
        >
          追加
        </button>
      </div>
    </form>
  );
}; 