import React from 'react';
import { SampleText } from '../types';
import { sampleTexts, getTextsByDifficulty, getCategories } from '../utils/sampleTexts';

interface TextSelectorProps {
  selectedText: SampleText | null; // 選択されたテキスト
  onTextSelect: (text: SampleText) => void; // テキスト選択時のコールバック
  onRandomSelect: () => void; // ランダム選択時のコールバック
  disabled?: boolean; // 無効状態
  className?: string; // 追加クラス
}

export default function TextSelector({ 
  selectedText, 
  onTextSelect, 
  onRandomSelect, 
  disabled = false, 
  className = '' 
}: TextSelectorProps) {
  const [selectedDifficulty, setSelectedDifficulty] = React.useState<'all' | 'easy' | 'medium' | 'hard'>('all');
  const [selectedCategory, setSelectedCategory] = React.useState<string>('all');

  const filteredTexts = React.useMemo(() => {
    let texts = sampleTexts;
    
    if (selectedDifficulty !== 'all') {
      texts = getTextsByDifficulty(selectedDifficulty);
    }
    
    if (selectedCategory !== 'all') {
      texts = texts.filter(text => text.category === selectedCategory);
    }
    
    return texts;
  }, [selectedDifficulty, selectedCategory]);

  const categories = getCategories();

  return (
    <div className={`space-y-4 ${className}`}> {/* 縦方向スペース4 */}
      <div className="flex flex-col md:flex-row gap-4 items-center"> {/* Flexコンテナ(縦・md以上で横), ギャップ4, アイテム中央寄せ */}
        
        {/* 難易度選択 */}
        <div className="flex items-center gap-2"> {/* Flexコンテナ, アイテム中央寄せ, ギャップ2 */}
          <label className="text-sm font-medium text-gray-700">難易度:</label> {/* 文字サイズsm, 太字, グレー700テキスト */}
          <select 
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value as any)}
            disabled={disabled}
            className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50" // 横パディング3, 縦パディング1, ボーダー, グレー300ボーダー, 角丸md, 文字サイズsm, フォーカス時アウトラインなし青500リング2, 無効時不透明度50
          >
            <option value="all">すべて</option>
            <option value="easy">簡単</option>
            <option value="medium">普通</option>
            <option value="hard">難しい</option>
          </select>
        </div>

        {/* カテゴリ選択 */}
        <div className="flex items-center gap-2"> {/* Flexコンテナ, アイテム中央寄せ, ギャップ2 */}
          <label className="text-sm font-medium text-gray-700">カテゴリ:</label> {/* 文字サイズsm, 太字, グレー700テキスト */}
          <select 
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            disabled={disabled}
            className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50" // 横パディング3, 縦パディング1, ボーダー, グレー300ボーダー, 角丸md, 文字サイズsm, フォーカス時アウトラインなし青500リング2, 無効時不透明度50
          >
            <option value="all">すべて</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        {/* ランダム選択ボタン */}
        <button
          onClick={onRandomSelect}
          disabled={disabled}
          className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200" // 横パディング4, 縦パディング2, 藍500背景, 白テキスト, 角丸md, ホバー時藍600背景, フォーカス時アウトラインなし藍500リング2, 無効時不透明度50カーソルなし, 色にトランジション
        >
          🎲 ランダム選択
        </button>
      </div>

      {/* テキスト一覧 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3"> {/* グリッド1列(md以上で2列・lg以上で3列), ギャップ3 */}
        {filteredTexts.map((text) => (
          <button
            key={text.id}
            onClick={() => onTextSelect(text)}
            disabled={disabled}
            className={`
              p-3 text-left border-2 rounded-lg transition-all duration-200
              hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500
              disabled:opacity-50 disabled:cursor-not-allowed
              ${selectedText?.id === text.id 
                ? 'border-blue-500 bg-blue-50 text-blue-900' 
                : 'border-gray-200 bg-white text-gray-800 hover:border-gray-300'
              }
            `} // パディング3, テキスト左寄せ, ボーダー2, 角丸lg, 全プロパティにトランジション, ホバー時影md, フォーカス時アウトラインなし青500リング2, 無効時不透明度50カーソルなし
          >
            <div className="flex items-center justify-between mb-2"> {/* Flexコンテナ, アイテム中央寄せ, 横揃え両端, 下マージン2 */}
              <span className="text-sm font-semibold">{text.title}</span> {/* 文字サイズsm, 太字 */}
              <span className={`
                px-2 py-1 text-xs rounded-full
                ${getDifficultyColor(text.difficulty)}
              `}> {/* 横パディング2, 縦パディング1, 文字サイズxs, 角丸完全 */}
                {getDifficultyLabel(text.difficulty)}
              </span>
            </div>
            <p className="text-xs text-gray-600 line-clamp-2"> {/* 文字サイズxs, グレー600テキスト, 2行制限 */}
              {text.text.substring(0, 80)}...
            </p>
            <div className="mt-2 text-xs text-gray-500"> {/* 上マージン2, 文字サイズxs, グレー500テキスト */}
              {text.category} • {text.text.length}文字
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function getDifficultyColor(difficulty: string): string {
  switch (difficulty) {
    case 'easy': return 'bg-green-100 text-green-800';
    case 'medium': return 'bg-yellow-100 text-yellow-800';
    case 'hard': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
}

function getDifficultyLabel(difficulty: string): string {
  switch (difficulty) {
    case 'easy': return '簡単';
    case 'medium': return '普通';
    case 'hard': return '難しい';
    default: return difficulty;
  }
}