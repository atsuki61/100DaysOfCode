import React from 'react';

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onSearch: (e: React.FormEvent) => void;
  loading: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  searchTerm, 
  setSearchTerm, 
  onSearch, 
  loading 
}) => {
  return (
    <div className="mb-8 p-6 bg-white rounded-lg shadow-md"> {/* 下マージン8, パディング6, 白背景, 角丸, 影 */}
      <h1 className="text-2xl font-bold mb-4">音楽検索アプリ</h1> {/* 大きい文字, 太字, 下マージン4 */}
      <p className="text-gray-600 mb-6">iTunes APIを使って、好きな音楽を検索してみましょう。</p> {/* グレー文字, 下マージン6 */}
      
      <form onSubmit={onSearch} className="flex gap-4"> {/* フレックスボックス, 要素間の間隔4 */}
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="アーティスト名や曲名を入力..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" // 幅を可変に, 横パディング4, 縦パディング2, 境界線, 角丸, フォーカス時のスタイル
        />
        <button 
          type="submit" 
          disabled={loading}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors" // 横パディング6, 縦パディング2, 青背景, 白文字, 角丸, ホバー効果, 無効時のスタイル, 色変化のトランジション
        >
          {loading ? '検索中...' : '検索'}
        </button>
      </form>
    </div>
  );
};

export default SearchBar; 