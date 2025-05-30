import { LearningStats } from '../types';

interface FilterControlsProps {
  filterMode: 'all' | 'need_review';
  onFilterChange: (mode: 'all' | 'need_review') => void;
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

          {/* 復習モード */}
          <button
            onClick={() => onFilterChange('need_review')}
            className={`py-3 px-4 rounded-lg font-semibold text-sm transition-all duration-200 ${
              filterMode === 'need_review'
                ? 'bg-orange-500 text-white shadow-md'
                : 'bg-orange-100 text-orange-700 hover:bg-orange-200 border-2 border-orange-300'
            }`}
            disabled={stats.needReview === 0}
          >
            <div className="flex flex-col items-center space-y-1">
              <span className="text-lg">🔄</span>
              <span>復習</span>
              <span className="text-xs opacity-75">({stats.needReview}単語)</span>
            </div>
          </button>
        </div>

        {/* 復習単語がない場合のメッセージ */}
        {stats.needReview === 0 && filterMode === 'need_review' && (
          <div className="mt-3 p-3 bg-green-50 rounded-lg border border-green-200">
            <p className="text-sm text-green-700 text-center">
              🎉 復習が必要な単語はありません！
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 