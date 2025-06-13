import { useState } from 'react';

interface CitySearchFormProps {
  onSearch: (city: string) => void;
  isLoading: boolean;
}

export default function CitySearchForm({ onSearch, isLoading }: CitySearchFormProps) {
  const [city, setCity] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto mb-8"> {/* 全幅, 最大幅md, 中央寄せ, 下マージン8 */}
      <div className="relative"> {/* 相対位置 */}
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="都市名を入力してください（例: Tokyo, London）"
          className="w-full px-6 py-4 text-lg border-2 border-gray-300 rounded-full focus:border-blue-500 focus:outline-none transition-colors" // 全幅, 横パディング6, 縦パディング4, 文字サイズlg, ボーダー2, グレーボーダー, 角丸円形, フォーカス時青ボーダー, アウトライン無し, 色のトランジション
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !city.trim()}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white px-6 py-2 rounded-full font-semibold transition-colors" // 絶対位置, 右2, 上50%, 変形, Y軸50%上移動, 青背景, ホバー時濃い青, 無効時グレー, 白文字, 横パディング6, 縦パディング2, 角丸円形, 太字, 色のトランジション
        >
          {isLoading ? (
            <div className="flex items-center"> {/* Flexコンテナ, アイテム中央寄せ */}
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"> {/* スピンアニメーション, 左マージン-1, 右マージン2, 高さ4, 幅4, 白色 */}
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              検索中...
            </div>
          ) : (
            '検索'
          )}
        </button>
      </div>
      
      {/* 人気都市の候補 */}
      <div className="mt-4 text-center"> {/* 上マージン4, 中央揃え */}
        <p className="text-gray-600 text-sm mb-3"> {/* グレー文字, 文字サイズsm, 下マージン3 */}
          人気の都市：
        </p>
        <div className="flex flex-wrap justify-center gap-2"> {/* Flex, 折り返し, 中央寄せ, ギャップ2 */}
          {['Tokyo', 'London', 'New York', 'Paris', 'Sydney'].map((popularCity) => (
            <button
              key={popularCity}
              type="button"
              onClick={() => setCity(popularCity)}
              disabled={isLoading}
              className="px-3 py-1 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 text-gray-700 text-sm rounded-full transition-colors" // 横パディング3, 縦パディング1, グレー背景, ホバー時薄いグレー, 無効時透明度50%, グレー文字, 文字サイズsm, 角丸円形, 色のトランジション
            >
              {popularCity}
            </button>
          ))}
        </div>
      </div>
    </form>
  );
} 