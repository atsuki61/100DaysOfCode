'use client';

import { useState } from 'react';
import { Todo } from './types';
import { TodoForm } from './components/TodoForm';
import { TodoItem } from './components/TodoItem';
import PageHeader from '../../components/common/PageHeader';

export default function TodoListPage() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now(), // 簡易的なID生成
      text,
      createdAt: new Date(),
    };
    setTodos([...todos, newTodo]);
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="py-8">
      <div className="max-w-2xl mx-auto px-4">
        <PageHeader 
          icon="📝"
          title="ToDoリスト"
          description="Day 4: タスクを追加・削除できるシンプルなToDoアプリ"
        />

        <TodoForm onAdd={addTodo} />

        <main>
          {todos.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg mb-4">
                まだタスクがありません
              </p>
              <p className="text-gray-400 text-sm">
                上のフォームから新しいタスクを追加してみましょう！
              </p>
            </div>
          ) : (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-700">
                  タスク一覧
                </h2>
                <span className="text-sm text-gray-500 bg-gray-200 px-3 py-1 rounded-full">
                  {todos.length}件
                </span>
              </div>
              <ul className="space-y-3">
                {todos.map((todo) => (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    onDelete={deleteTodo}
                  />
                ))}
              </ul>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
