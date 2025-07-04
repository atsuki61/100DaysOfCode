import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center py-8"> {/* フレックスボックス, 中央揃え, 縦パディング8 */}
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div> {/* 回転アニメーション, 円形, 高さ12, 幅12, 下境界線2, 青色 */}
      <span className="ml-3 text-gray-600">検索中...</span> {/* 左マージン3, グレー文字 */}
    </div>
  );
};

export default LoadingSpinner; 