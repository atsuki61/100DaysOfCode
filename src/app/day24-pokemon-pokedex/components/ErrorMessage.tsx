interface ErrorMessageProps {
  message?: string;
  onRetry?: () => void;
}

export default function ErrorMessage({ 
  message = "データの読み込みに失敗しました",
  onRetry 
}: ErrorMessageProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center"> {/* フレックス縦, アイテム中央, 中央寄せ, 最小高さ, テキスト中央 */}
      {/* エラーアイコン */}
      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4"> {/* 幅高さ16, 薄赤背景, 完全円, アイテム中央, 下マージン */}
        <svg 
          className="w-8 h-8 text-red-500" // 幅高さ8, 赤色
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
          />
        </svg>
      </div>

      {/* エラーメッセージ */}
      <h3 className="text-xl font-bold text-gray-800 mb-2"> {/* 大文字, 太字, 濃いグレー, 下マージン */}
        エラーが発生しました
      </h3>
      <p className="text-gray-600 mb-6 max-w-md"> {/* グレー文字, 下マージン, 最大幅制限 */}
        {message}
      </p>

      {/* リトライボタン */}
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium" // パディング, 青背景, 白文字, 角丸, ホバー効果, ミディアム太字
        >
          再試行
        </button>
      )}

      {/* ポケボール風装飾 */}
      <div className="mt-8 opacity-30"> {/* 上マージン, 半透明 */}
        <div className="w-12 h-12 bg-gray-300 rounded-full border-4 border-gray-400 relative"> {/* 幅高さ12, グレー背景, 完全円, ボーダー, 相対位置 */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-400 transform -translate-y-1/2"> {/* 絶対位置, 上50%, 左右0, 高さ1, グレー背景, 変形で中央移動 */}
          </div>
          <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-white rounded-full border-2 border-gray-400 transform -translate-x-1/2 -translate-y-1/2"> {/* 絶対位置, 上左50%, 幅高さ3, 白背景, 完全円, ボーダー, 変形で中央移動 */}
          </div>
        </div>
      </div>
    </div>
  );
} 