import { useState, useRef, useEffect } from 'react';
import { searchCitiesByHiragana, CityData } from '../utils/cityData';

interface AutoCompleteSearchProps {
  onSearch: (city: string) => void;
  isLoading: boolean;
}

export default function AutoCompleteSearch({ onSearch, isLoading }: AutoCompleteSearchProps) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<CityData[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // 検索候補を更新
  useEffect(() => {
    if (query.length > 0) {
      const results = searchCitiesByHiragana(query);
      setSuggestions(results);
      setShowSuggestions(results.length > 0);
      setSelectedIndex(-1);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [query]);

  // キーボード操作
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0) {
          selectSuggestion(suggestions[selectedIndex]);
        } else if (query.trim()) {
          handleSearch(query.trim());
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedIndex(-1);
        break;
    }
  };

  // 候補選択
  const selectSuggestion = (city: CityData) => {
    const cityName = city.kanji;
    setQuery(cityName);
    setShowSuggestions(false);
    setSelectedIndex(-1);
    handleSearch(cityName);
  };

  // 検索実行
  const handleSearch = (searchTerm: string) => {
    if (searchTerm.trim()) {
      onSearch(searchTerm.trim());
      // 検索後は候補を閉じる
      setShowSuggestions(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(query);
  };

  // 外部クリックで候補を閉じる
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current && 
        !inputRef.current.contains(event.target as Node) &&
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="w-full max-w-md mx-auto mb-8 relative"> {/* 全幅, 最大幅md, 中央寄せ, 下マージン8, 相対位置 */}
      <form onSubmit={handleSubmit}>
        <div className="relative"> {/* 相対位置 */}
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="ひらがな・漢字で検索（例: こうか、甲賀、名古屋）"
            className="w-full px-6 py-4 text-lg border-2 border-gray-300 rounded-full focus:border-blue-500 focus:outline-none transition-colors" // 全幅, 横パディング6, 縦パディング4, 文字サイズlg, ボーダー2, グレーボーダー, 角丸円形, フォーカス時青ボーダー, アウトライン無し, 色のトランジション
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !query.trim()}
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
      </form>

      {/* 検索候補ドロップダウン */}
      {showSuggestions && suggestions.length > 0 && (
        <div 
          ref={suggestionsRef}
          className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto" // 絶対位置, 上端から全体, 左右0, 上マージン1, 白背景, グレーボーダー, 角丸lg, 影lg, z-index50, 最大高さ60, 縦スクロール
        >
          {suggestions.map((city, index) => (
            <button
              key={city.id}
              type="button"
              onClick={() => selectSuggestion(city)}
              className={`w-full px-4 py-3 text-left hover:bg-gray-100 focus:bg-gray-100 border-b border-gray-100 last:border-b-0 transition-colors ${
                index === selectedIndex ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
              }`} // 全幅, 横パディング4, 縦パディング3, 左寄せ, ホバー時薄いグレー, フォーカス時薄いグレー, 下ボーダー, 最後はボーダーなし, 色のトランジション
            >
              <div className="flex items-center justify-between"> {/* Flex, アイテム中央寄せ, 両端揃え */}
                <div>
                  <span className="font-medium text-lg"> {/* 太字, 文字サイズlg */}
                    {city.kanji}{city.suffix}
                  </span>
                  <span className="ml-2 text-sm text-gray-500"> {/* 左マージン2, 文字サイズsm, グレー文字 */}
                    ({city.hiragana})
                  </span>
                </div>
                <span className="text-sm font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded"> {/* 文字サイズsm, 太字, 青文字, 薄青背景, 横パディング2, 縦パディング1, 角丸 */}
                  {city.prefecture}
                </span>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* 人気都市の候補 */}
      <div className="mt-4 text-center"> {/* 上マージン4, 中央揃え */}
        <p className="text-gray-600 text-sm mb-3"> {/* グレー文字, 文字サイズsm, 下マージン3 */}
          人気の都市：
        </p>
        <div className="flex flex-wrap justify-center gap-2"> {/* Flex, 折り返し, 中央寄せ, ギャップ2 */}
          {['名古屋', '豊田', '岡崎', '大津', '草津', '彦根', '東京', '大阪'].map((popularCity) => (
            <button
              key={popularCity}
              type="button"
              onClick={() => {
                setQuery(popularCity);
                handleSearch(popularCity);
              }}
              disabled={isLoading}
              className="px-3 py-1 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 text-gray-700 text-sm rounded-full transition-colors" // 横パディング3, 縦パディング1, グレー背景, ホバー時薄いグレー, 無効時透明度50%, グレー文字, 文字サイズsm, 角丸円形, 色のトランジション
            >
              {popularCity}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
} 