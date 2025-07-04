import React from 'react';

interface ResultsInfoProps {
  count: number;
  searchTerm: string;
}

const ResultsInfo: React.FC<ResultsInfoProps> = ({ count, searchTerm }) => {
  if (count === 0) {
    return (
      <div className="text-center py-8 text-gray-600"> {/* 中央揃え, 縦パディング8, グレー文字 */}
        <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"> {/* 幅16, 高さ16, 左右マージン自動, 下マージン4, グレー文字 */}
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <p>「{searchTerm}」に関する検索結果が見つかりませんでした。</p>
        <p className="mt-2 text-sm">別のキーワードで検索してみてください。</p> {/* 上マージン2, 小さい文字 */}
      </div>
    );
  }

  return (
    <div className="mb-4 text-gray-600"> {/* 下マージン4, グレー文字 */}
      <p>「{searchTerm}」の検索結果: {count}件</p>
    </div>
  );
};

export default ResultsInfo; 