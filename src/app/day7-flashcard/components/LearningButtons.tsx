import { LearningStatus } from '../types';

interface LearningButtonsProps {
  onStatusChange: (status: LearningStatus) => void;
}

export default function LearningButtons({ 
  onStatusChange
}: LearningButtonsProps) {
  return (
    <div className="w-full max-w-md mx-auto mt-4">
      <div className="bg-white rounded-xl shadow-lg p-4">
        <h3 className="text-sm font-semibold text-gray-700 mb-3 text-center">
          この単語の理解度は？
        </h3>
        
        <div className="grid grid-cols-2 gap-3">
          {/* マスター済みボタン */}
          <button
            onClick={() => onStatusChange('mastered')}
            className="py-3 px-4 rounded-lg font-semibold text-sm transition-all duration-200 bg-green-100 text-green-700 hover:bg-green-200 border-2 border-green-300 hover:scale-105"
          >
            <div className="flex flex-col items-center space-y-1">
              <span className="text-lg">✅</span>
              <span>マスター!</span>
            </div>
          </button>

          {/* 学習中ボタン */}
          <button
            onClick={() => onStatusChange('studying')}
            className="py-3 px-4 rounded-lg font-semibold text-sm transition-all duration-200 bg-orange-100 text-orange-700 hover:bg-orange-200 border-2 border-orange-300 hover:scale-105"
          >
            <div className="flex flex-col items-center space-y-1">
              <span className="text-lg">📖</span>
              <span>学習中</span>
            </div>
          </button>
        </div>

        {/* ヒントメッセージ */}
        <div className="mt-3 text-center">
          <span className="text-xs text-gray-500">
            キーボード: 1（マスター） / 2（学習中）
          </span>
        </div>
      </div>
    </div>
  );
} 