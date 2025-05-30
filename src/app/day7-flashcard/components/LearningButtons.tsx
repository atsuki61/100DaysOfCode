import { LearningStatus } from '../types';

interface LearningButtonsProps {
  currentStatus: LearningStatus;
  onStatusChange: (status: LearningStatus) => void;
  isRevealed: boolean;
}

export default function LearningButtons({ 
  currentStatus, 
  onStatusChange, 
  isRevealed 
}: LearningButtonsProps) {
  // 意味が表示されていない時は非表示
  if (!isRevealed) {
    return null;
  }

  return (
    <div className="w-full max-w-md mx-auto mt-4">
      <div className="bg-white rounded-xl shadow-lg p-4">
        <h3 className="text-sm font-semibold text-gray-700 mb-3 text-center">
          この単語の理解度は？
        </h3>
        
        <div className="grid grid-cols-2 gap-3">
          {/* 覚えたボタン */}
          <button
            onClick={() => onStatusChange('learned')}
            className={`py-3 px-4 rounded-lg font-semibold text-sm transition-all duration-200 ${
              currentStatus === 'learned'
                ? 'bg-green-500 text-white shadow-md transform scale-105'
                : 'bg-green-100 text-green-700 hover:bg-green-200 border-2 border-green-300'
            }`}
          >
            <div className="flex flex-col items-center space-y-1">
              <span className="text-lg">✅</span>
              <span>覚えた！</span>
            </div>
          </button>

          {/* 覚えてないボタン */}
          <button
            onClick={() => onStatusChange('need_review')}
            className={`py-3 px-4 rounded-lg font-semibold text-sm transition-all duration-200 ${
              currentStatus === 'need_review'
                ? 'bg-orange-500 text-white shadow-md transform scale-105'
                : 'bg-orange-100 text-orange-700 hover:bg-orange-200 border-2 border-orange-300'
            }`}
          >
            <div className="flex flex-col items-center space-y-1">
              <span className="text-lg">📝</span>
              <span>要復習</span>
            </div>
          </button>
        </div>

        {/* 現在のステータス表示 */}
        {currentStatus !== 'not_studied' && (
          <div className="mt-3 text-center">
            <span className="text-xs text-gray-500">
              {currentStatus === 'learned' ? '✅ この単語は覚えました' : '📝 この単語は復習が必要です'}
            </span>
          </div>
        )}
      </div>
    </div>
  );
} 