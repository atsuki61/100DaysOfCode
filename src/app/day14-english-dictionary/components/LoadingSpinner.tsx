interface LoadingSpinnerProps {
  searchWord?: string;
}

export default function LoadingSpinner({ searchWord }: LoadingSpinnerProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto"> {/* 白背景, 角丸2xl, 影lg, 全方向パディング8, 最大横幅2xl, 中央寄せ */}
      <div className="flex flex-col items-center gap-6"> {/* Flexコンテナ(縦), アイテム中央寄せ, ギャップ6 */}
        {/* アニメーション付きローディングアイコン */}
        <div className="relative"> {/* 相対位置 */}
          <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div> {/* 横幅16, 高さ16, ボーダー4, インディゴ200ボーダー, 上インディゴ600ボーダー, 角丸円形, 回転アニメーション */}
          <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-indigo-400 rounded-full animate-pulse"></div> {/* 絶対位置, 全方向0, 横幅16, 高さ16, ボーダー4, 透明ボーダー, 右インディゴ400ボーダー, 角丸円形, パルスアニメーション */}
        </div>
        
        {/* ローディングテキスト */}
        <div className="text-center"> {/* 中央揃え */}
          <h3 className="text-xl font-semibold text-gray-800 mb-2"> {/* 文字サイズxl, 太字, グレー800文字, 下マージン2 */}
            辞書を検索中...
          </h3>
          {searchWord && (
            <p className="text-gray-600"> {/* グレー600文字 */}
              「<span className="font-medium text-indigo-600">{searchWord}</span>」の詳細情報を取得しています
            </p>
          )}
        </div>
        
        {/* 進捗バー風アニメーション */}
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden"> {/* 横幅いっぱい, グレー200背景, 角丸円形, 高さ2, はみ出し非表示 */}
          <div className="h-full bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full animate-pulse"></div> {/* 高さいっぱい, グラデーション背景(右向き, インディゴ500からブルー500), 角丸円形, パルスアニメーション */}
        </div>
        
        {/* ヒントテキスト */}
        <p className="text-sm text-gray-500 text-center"> {/* 文字サイズsm, グレー500文字, 中央揃え */}
          💡 Free Dictionary API から詳細な情報を取得中です
        </p>
      </div>
    </div>
  );
} 