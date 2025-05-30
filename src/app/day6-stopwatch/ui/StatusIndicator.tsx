/**
 * 状態表示コンポーネント
 * 
 * ストップウォッチの現在の実行状態を視覚的に表示
 * 実行中は緑色で点滅アニメーション、停止中は灰色で表示
 */

// プロパティ型定義
interface StatusIndicatorProps {
  isRunning: boolean;        // タイマーの実行状態（true: 実行中, false: 停止中）
  className?: string;        // 追加のCSSクラス（省略可能）
}

export default function StatusIndicator({ 
  isRunning,                 // 実行状態
  className = ''            // デフォルト: 空文字
}: StatusIndicatorProps) {
  
  return (
    // 状態表示コンテナ
    <div className={`text-center ${className}`}> {/* 中央揃え + 追加クラス */}
      
      {/* 状態バッジ */}
      <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${ // インラインフレックス, アイテム中央, 横パディング3, 縦パディング1, 完全角丸, 小文字, 中太字
        isRunning 
          ? 'bg-green-100 text-green-800'  // 実行中: 薄い緑背景, 濃い緑文字
          : 'bg-gray-100 text-gray-800'    // 停止中: 薄いグレー背景, 濃いグレー文字
      }`}>
        
        {/* 状態インジケーター（点） */}
        <div className={`w-2 h-2 rounded-full mr-2 ${ // 幅2, 高さ2, 完全円形, 右マージン2
          isRunning 
            ? 'bg-green-500 animate-pulse'   // 実行中: 緑色 + 点滅アニメーション
            : 'bg-gray-400'                  // 停止中: グレー色（静止）
        }`}></div>
        
        {/* 状態テキスト */}
        {isRunning ? '動作中' : '停止中'}
      </div>
    </div>
  );
} 