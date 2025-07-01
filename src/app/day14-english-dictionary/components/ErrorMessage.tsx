interface ErrorMessageProps {// エラーメッセージを表示するコンポーネントのprops
  error: string;// エラーメッセージ
  onRetry?: () => void;// 再検索ボタンのクリックイベント
  lastSearchedWord?: string;// 最後の検索語
}

export default function ErrorMessage({ error, onRetry, lastSearchedWord }: ErrorMessageProps) {// エラーメッセージを表示するコンポーネント, エラーメッセージ, 再検索ボタン, 最後の検索語
  return (
    <div className="bg-red-50 border border-red-200 rounded-2xl p-6 max-w-2xl mx-auto"> {/* レッド50背景, レッド200ボーダー, 角丸2xl, 全方向パディング6, 最大横幅2xl, 中央寄せ */}
      <div className="flex items-start gap-4"> {/* Flexコンテナ, アイテム開始位置, ギャップ4 */}
        <div className="flex-shrink-0"> {/* 縮小しない */}
          <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center"> {/* 横幅10, 高さ10, レッド100背景, 角丸円形, Flexコンテナ, アイテム中央寄せ(垂直・水平) */}
            <span className="text-xl">⚠️</span>
          </div>
        </div>
        
        <div className="flex-1"> {/* Flex伸長1 */}
          <h3 className="text-lg font-semibold text-red-800 mb-2"> {/* 文字サイズlg, 太字, レッド800文字, 下マージン2 */}
            エラーが発生しました
          </h3>
          <div className="text-red-700 mb-4 whitespace-pre-line"> {/* レッド700文字, 下マージン4, 改行保持 */}
            {error}
          </div>
          
          {onRetry && lastSearchedWord && (// 再検索ボタンが存在し、最後の検索語が存在する場合
            <button
              onClick={onRetry}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-100 transition-all duration-200 font-medium" // 横パディング4, 縦パディング2, レッド600背景, 白文字, 角丸lg, ホバー時レッド700背景, フォーカス時アウトラインなし・リング4・レッド100リング, 全プロパティトランジション, 中太字 */}
            >
              「{lastSearchedWord}」を再検索
            </button>
          )}
        </div>
      </div>
    </div>
  );
} 