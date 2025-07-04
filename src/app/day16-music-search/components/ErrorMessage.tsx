import React from 'react';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg"> {/* 下マージン4, パディング4, 赤背景, 赤境界線, 赤文字, 角丸 */}
      <div className="flex items-center"> {/* フレックスボックス, 中央揃え */}
        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20"> {/* 幅5, 高さ5, 右マージン2 */}
          <path 
            fillRule="evenodd" 
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" 
            clipRule="evenodd" 
          />
        </svg>
        <span className="font-medium">エラー: {message}</span> {/* 中太字 */}
      </div>
    </div>
  );
};

export default ErrorMessage; 