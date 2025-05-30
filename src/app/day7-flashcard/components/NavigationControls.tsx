interface NavigationControlsProps {
  currentIndex: number;
  totalCards: number;
  onPrevious: () => void;
  onNext: () => void;
  onShuffle: () => void;
}

export default function NavigationControls({ 
  currentIndex, 
  totalCards, 
  onPrevious, 
  onNext, 
  onShuffle 
}: NavigationControlsProps) {
  const progress = ((currentIndex + 1) / totalCards) * 100;

  return (
    // 幅制限, 中央寄せ, 上マージン6
    <div className="w-full max-w-md mx-auto mt-6">
      
      {/* 進捗バー */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">進捗</span>
          <span className="text-sm text-gray-600">{currentIndex + 1} / {totalCards}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-500 h-2 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* ナビゲーションボタン */}
      <div className="flex justify-between items-center gap-4">
        
        {/* 前へボタン */}
        <button
          onClick={onPrevious}
          disabled={currentIndex === 0}
          className="flex-1 px-4 py-3 bg-gray-500 text-white rounded-lg font-semibold transition-all duration-200 hover:bg-gray-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          ← 前へ
        </button>

        {/* シャッフルボタン */}
        <button
          onClick={onShuffle}
          className="px-4 py-3 bg-purple-500 text-white rounded-lg font-semibold transition-all duration-200 hover:bg-purple-600"
        >
          🔀
        </button>

        {/* 次へボタン */}
        <button
          onClick={onNext}
          disabled={currentIndex === totalCards - 1}
          className="flex-1 px-4 py-3 bg-blue-500 text-white rounded-lg font-semibold transition-all duration-200 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          次へ →
        </button>
      </div>

      {/* ヒント表示 */}
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-500">
          💡 ヒント: スペースキーでもカードをめくれます
        </p>
      </div>
    </div>
  );
} 