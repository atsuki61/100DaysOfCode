interface LoadingSpinnerProps {
  message?: string;
}

export default function LoadingSpinner({ message = "読み込み中..." }: LoadingSpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px]"> {/* フレックス縦, アイテム中央, 中央寄せ, 最小高さ */}
      {/* スピナー */}
      <div className="relative"> {/* 相対位置 */}
        <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin"> {/* 幅高さ16, ボーダー4, 薄青ボーダー, 上部青, 完全円, スピンアニメーション */}
        </div>
        {/* 中央のポケボール風アイコン */}
        <div className="absolute inset-0 flex items-center justify-center"> {/* 絶対位置, 全体覆う, アイテム中央 */}
          <div className="w-6 h-6 bg-red-500 rounded-full border-2 border-white shadow-sm"> {/* 幅高さ6, 赤背景, 完全円, 白ボーダー, 影 */}
            <div className="w-2 h-2 bg-white rounded-full mx-auto mt-1"> {/* 幅高さ2, 白背景, 完全円, 中央寄せ, 上マージン */}
            </div>
          </div>
        </div>
      </div>
      
      {/* ローディングメッセージ */}
      <p className="mt-4 text-gray-600 text-lg font-medium"> {/* 上マージン, グレー文字, 大文字, ミディアム太字 */}
        {message}
      </p>
      
      {/* ドット */}
      <div className="flex space-x-1 mt-2"> {/* フレックス横, 横間隔, 上マージン */}
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}> {/* 幅高さ2, 青背景, 完全円, バウンスアニメーション */}
        </div>
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}>
        </div>
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}>
        </div>
      </div>
    </div>
  );
} 