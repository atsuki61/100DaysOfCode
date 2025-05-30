/**
 * コントロールボタンコンポーネント
 * 
 * ストップウォッチの操作ボタン（開始・停止・リセット）を表示
 * 実行状態に応じてボタンの色とテキストを動的に変更
 */

// プロパティ型定義
interface ControlButtonsProps {
  isRunning: boolean;        // タイマーの実行状態（true: 実行中, false: 停止中）
  onStartStop: () => void;   // 開始・停止ボタンのクリックハンドラー
  onReset: () => void;       // リセットボタンのクリックハンドラー
  className?: string;        // 追加のCSSクラス（省略可能）
}

export default function ControlButtons({ 
  isRunning,                 // 実行状態
  onStartStop,              // 開始・停止処理
  onReset,                  // リセット処理
  className = ''            // デフォルト: 空文字
}: ControlButtonsProps) {
  
  return (
    // ボタンコンテナ
    <div className={`flex gap-4 justify-center ${className}`}> {/* フレックス, 間隔4, 中央揃え + 追加クラス */}
      
      {/* 開始・停止ボタン（状態により動的変化） */}
      <button
        onClick={onStartStop}
        className={`px-8 py-3 rounded-lg font-semibold text-white transition-colors duration-200 ${ // 横パディング8, 縦パディング3, 角丸, 太字, 白文字, 色変化アニメーション200ms
          isRunning
            ? 'bg-red-500 hover:bg-red-600'      // 実行中: 赤背景, ホバー時濃い赤
            : 'bg-green-500 hover:bg-green-600'  // 停止中: 緑背景, ホバー時濃い緑
        }`}
      >
        {/* 実行状態に応じてアイコンとテキストを変更 */}
        {isRunning ? '⏸️ 停止' : '▶️ 開始'}
      </button>
      
      {/* リセットボタン（常に同じスタイル） */}
      <button
        onClick={onReset}
        className="px-8 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-semibold transition-colors duration-200" // 横パディング8, 縦パディング3, グレー背景, ホバー時濃いグレー, 白文字, 角丸, 太字, 色変化アニメーション
      >
        🔄 リセット
      </button>
    </div>
  );
} 