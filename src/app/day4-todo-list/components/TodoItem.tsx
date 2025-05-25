import { TodoItemProps } from '../types';

export const TodoItem = ({ todo, onDelete }: TodoItemProps) => {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('ja-JP', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <li className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex-1 mr-4">
        <p className="text-gray-800 font-medium text-lg">
          {todo.text}
        </p>
        <p className="text-gray-500 text-sm mt-1">
          作成日時: {formatDate(todo.createdAt)}
        </p>
      </div>
      <button
        onClick={() => onDelete(todo.id)}
        className="px-3 py-1 bg-red-500 text-white text-sm font-medium rounded hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        aria-label={`タスク「${todo.text}」を削除`}
      >
        削除
      </button>
    </li>
  );
}; 