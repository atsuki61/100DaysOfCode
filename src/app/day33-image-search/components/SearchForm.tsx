"use client";

import { useState } from 'react';

interface SearchFormProps {
  onSearch: (query: string) => void;
  loading: boolean;
}

const SearchForm = ({ onSearch, loading }: SearchFormProps) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8"> {/* 背景白、影付き、パディング、下マージン */}
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4"> {/* フレックス縦横、ギャップ */}
        <div className="flex-1"> {/* フレックス拡張 */}
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="検索キーワードを入力してください（例: nature, city, animals）"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" // 幅全体、パディング、ボーダー、角丸、フォーカス時青リング
            disabled={loading}
          />
        </div>
        <button
          type="submit"
          disabled={loading || !query.trim()}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors" // パディング、青背景、白文字、角丸、ホバー、フォーカス、無効状態、トランジション
        >
          {loading ? (
            <div className="flex items-center gap-2"> {/* フレックス中央、ギャップ */}
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div> {/* スピナー：幅高さ、ボーダー、回転アニメーション */}
              検索中...
            </div>
          ) : (
            '検索'
          )}
        </button>
      </form>

      {/* 検索のヒント */}
      <div className="mt-4 text-sm text-gray-600"> {/* 上マージン、小文字、グレーテキスト */}
        <p><strong>検索のヒント:</strong> nature, city, animals, technology, food などのキーワードをお試しください</p>
      </div>
    </div>
  );
};

export default SearchForm;