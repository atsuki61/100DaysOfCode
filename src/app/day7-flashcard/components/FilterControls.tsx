import { LearningStats } from '../types';

interface FilterControlsProps {
  filterMode: 'all' | 'studying';
  onFilterChange: (mode: 'all' | 'studying') => void;
  stats: LearningStats;
}

export default function FilterControls({ 
  filterMode, 
  onFilterChange, 
  stats 
}: FilterControlsProps) {
  return (
    <div className="w-full max-w-md mx-auto mb-6">
      <div className="bg-white rounded-xl shadow-lg p-4">
        <h3 className="text-sm font-semibold text-gray-700 mb-3 text-center">
          学習モード
        </h3>
        
        <div className="grid grid-cols-2 gap-3">
          {/* 全ての単語モード */}
          <button
            onClick={() => onFilterChange('all')}
            className={`py-3 px-4 rounded-lg font-semibold text-sm transition-all duration-200 ${
              filterMode === 'all'
                ? 'bg-blue-500 text-white shadow-md'
                : 'bg-blue-100 text-blue-700 hover:bg-blue-200 border-2 border-blue-300'
            }`}
          >
            <div className="flex flex-col items-center space-y-1">
              <span className="text-lg">📚</span>
              <span>全て</span>
              <span className="text-xs opacity-75">({stats.total}単語)</span>
            </div>
          </button>

          {/* 学習中モード */}
          <button
            onClick={() => onFilterChange('studying')}
            className={`py-3 px-4 rounded-lg font-semibold text-sm transition-all duration-200 ${
              filterMode === 'studying'
                ? 'bg-orange-500 text-white shadow-md'
                : 'bg-orange-100 text-orange-700 hover:bg-orange-200 border-2 border-orange-300'
            }`}
            disabled={stats.studying === 0}
          >
            <div className="flex flex-col items-center space-y-1">
              <span className="text-lg">📖</span>
              <span>学習中</span>
              <span className="text-xs opacity-75">({stats.studying}単語)</span>
            </div>
          </button>
        </div>

        {/* 学習中単語がない場合のメッセージ */}
        {stats.studying === 0 && filterMode === 'studying' && (
          <div className="mt-3 p-3 bg-green-50 rounded-lg border border-green-200">
            <p className="text-sm text-green-700 text-center">
              🎉 学習中の単語はありません！
            </p>
          </div>
        )}

        {/* 学習統計表示 */}
        <div className="mt-4 grid grid-cols-3 gap-2 text-center">
          <div className="bg-green-50 rounded-lg p-2">
            <div className="text-lg font-bold text-green-600">{stats.mastered}</div>
            <div className="text-xs text-green-700">マスター</div>
          </div>
          <div className="bg-orange-50 rounded-lg p-2">
            <div className="text-lg font-bold text-orange-600">{stats.studying}</div>
            <div className="text-xs text-orange-700">学習中</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-2">
            <div className="text-lg font-bold text-gray-600">{stats.notStudied}</div>
            <div className="text-xs text-gray-700">未学習</div>
          </div>
        </div>

        {/* 進捗率表示 */}
        <div className="mt-3 text-center">
          <div className="text-xs text-gray-600">
            マスター率: <span className="font-bold text-green-600">
              {Math.round((stats.mastered / stats.total) * 100)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
} 