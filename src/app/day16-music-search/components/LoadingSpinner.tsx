import React from 'react';

interface LoadingSpinnerProps {
  message?: string;
}

export default function LoadingSpinner({ message = '検索中...' }: LoadingSpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative">
        {/* 外側のスピナー */}
        <div className="w-16 h-16 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div> {/* 幅16, 高さ16, ボーダー4, グレーボーダー, 上青, 円形, 回転アニメーション */}
        
        {/* 内側のスピナー */}
        <div className="absolute inset-0 w-16 h-16 border-4 border-gray-100 border-b-blue-400 rounded-full animate-spin" style={{ animationDirection: 'reverse' }}></div> {/* 絶対位置, 全体に配置, 幅16, 高さ16, ボーダー4, 薄いグレーボーダー, 下青, 円形, 逆回転 */}
      </div>
      
      <div className="mt-4 text-center">
        <p className="text-lg font-medium text-gray-700 mb-2"> {/* 文字大, 太字, グレー文字, 下マージン2 */}
          {message}
        </p>
        
        <div className="flex justify-center space-x-1"> {/* 中央揃え, 横間隔1 */}
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div> {/* 幅2, 高さ2, 青背景, 円形, バウンスアニメーション */}
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div> {/* 幅2, 高さ2, 青背景, 円形, バウンスアニメーション, 遅延 */}
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div> {/* 幅2, 高さ2, 青背景, 円形, バウンスアニメーション, 遅延 */}
        </div>
      </div>
    </div>
  );
} 