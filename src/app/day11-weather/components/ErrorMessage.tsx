import { WeatherError } from '../types';

interface ErrorMessageProps {
  error: WeatherError;
  onRetry?: () => void;
}

export default function ErrorMessage({ error, onRetry }: ErrorMessageProps) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto"> {/* 薄赤背景, 赤ボーダー, 角丸lg, パディング6, 最大幅md, 中央寄せ */}
      <div className="flex"> {/* Flexコンテナ */}
        <div className="flex-shrink-0"> {/* 縮小しない */}
          <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"> {/* 高さ5, 幅5, 赤色 */}
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3"> {/* 左マージン3 */}
          <h3 className="text-sm font-medium text-red-800"> {/* 文字サイズsm, 太字, 濃い赤文字 */}
            エラーが発生しました
          </h3>
          <div className="mt-2 text-sm text-red-700"> {/* 上マージン2, 文字サイズsm, 赤文字 */}
            <p>{error.message}</p>
          </div>
          {onRetry && (
            <div className="mt-4"> {/* 上マージン4 */}
              <button
                type="button"
                onClick={onRetry}
                className="bg-red-100 hover:bg-red-200 text-red-800 text-sm font-medium px-3 py-2 rounded-md transition-colors" // 薄赤背景, ホバー時薄い赤, 濃い赤文字, 文字サイズsm, 太字, 横パディング3, 縦パディング2, 角丸md, 色のトランジション
              >
                もう一度試す
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 