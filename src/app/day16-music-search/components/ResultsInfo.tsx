import React from 'react';

interface ResultsInfoProps {
  searchTerm: string;
  totalResults: number;
  displayedResults: number;
  isLoading: boolean;
}

export default function ResultsInfo({ searchTerm, totalResults, displayedResults, isLoading }: ResultsInfoProps) {
  if (isLoading) {
    return null;
  }

  return (
    <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg"> {/* 下マージン6, パディング4, 青背景, 青ボーダー, 角丸 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span className="text-sm font-medium text-blue-800"> {/* 小文字, 太字, 青文字 */}
              検索結果
            </span>
          </div>
          
          <div className="text-sm text-blue-700"> {/* 小文字, 青文字 */}
            「<span className="font-semibold">{searchTerm}</span>」で検索
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-sm text-blue-700"> {/* 小文字, 青文字 */}
            <span className="font-semibold">{totalResults}</span> 件見つかりました
          </div>
          
          {displayedResults !== totalResults && (
            <div className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded"> {/* 極小文字, 青文字, 青背景, 横パディング2, 縦パディング1, 角丸 */}
              {displayedResults} 件表示中
            </div>
          )}
        </div>
      </div>

      {totalResults === 0 && (
        <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg"> {/* 上マージン3, パディング3, 黄背景, 黄ボーダー, 角丸 */}
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm font-medium text-yellow-800"> {/* 小文字, 太字, 黄文字 */}
              検索結果が見つかりませんでした
            </span>
          </div>
          <p className="text-sm text-yellow-700 mt-2"> {/* 小文字, 黄文字, 上マージン2 */}
            検索語を変更するか、以下をお試しください:
          </p>
          <ul className="text-sm text-yellow-700 mt-2 ml-4 space-y-1"> {/* 小文字, 黄文字, 上マージン2, 左マージン4, 縦間隔1 */}
            <li>• スペルを確認してください</li>
            <li>• より一般的な検索語を使用してください</li>
            <li>• 英語で検索してみてください</li>
            <li>• メディアタイプを「すべて」に変更してみてください</li>
          </ul>
        </div>
      )}
    </div>
  );
} 