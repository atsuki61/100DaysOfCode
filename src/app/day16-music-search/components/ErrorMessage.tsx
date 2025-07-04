import React from 'react';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="max-w-md mx-auto text-center py-8">
      <div className="bg-red-50 border border-red-200 rounded-lg p-6"> {/* 赤背景, 赤ボーダー, 角丸, パディング6 */}
        <div className="flex items-center justify-center mb-4">
          <svg className="w-12 h-12 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        
        <h3 className="text-lg font-semibold text-red-800 mb-2"> {/* 文字大, 太字, 赤文字, 下マージン2 */}
          エラーが発生しました
        </h3>
        
        <p className="text-sm text-red-700 mb-4"> {/* 小文字, 赤文字, 下マージン4 */}
          {message}
        </p>
        
        {onRetry && (
          <button
            onClick={onRetry}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium" // 横パディング4, 縦パディング2, 赤背景, 白文字, 角丸, ホバー時濃い赤
          >
            再試行
          </button>
        )}
      </div>
    </div>
  );
} 