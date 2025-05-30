/**
 * 時間表示コンポーネント
 * 
 * ストップウォッチの経過時間を大きなフォントで表示
 * サイズ調整可能で、モノスペースフォントで数字を揃えて表示
 */

// プロパティ型定義
interface TimeDisplayProps {
  time: string;              // 表示する時間文字列（MM:SS.CC形式）
  label?: string;            // 時間形式の説明ラベル（省略可能）
  size?: 'sm' | 'md' | 'lg' | 'xl'; // 表示サイズ（デフォルト: xl）
  className?: string;        // 追加のCSSクラス（省略可能）
}

export default function TimeDisplay({ 
  time,                      // 必須: 表示時間
  label = '分:秒.センチ秒',    // デフォルト: 時間形式の説明
  size = 'xl',              // デフォルト: 最大サイズ
  className = ''            // デフォルト: 空文字
}: TimeDisplayProps) {
  
  // サイズごとのTailwind CSSクラス定義
  const sizeClasses = {
    sm: 'text-2xl',   // 小: 24px
    md: 'text-4xl',   // 中: 36px  
    lg: 'text-5xl',   // 大: 48px
    xl: 'text-6xl'    // 特大: 60px
  };

  return (
    // 時間表示コンテナ
    <div className={`text-center ${className}`}> {/* 中央揃え + 追加クラス */}
      
      {/* メイン時間表示 */}
      <div className={`font-mono font-bold text-gray-800 mb-2 ${sizeClasses[size]}`}> {/* モノスペース, 太字, 濃いグレー, 下マージン, 動的サイズ */}
        {time}
      </div>
      
      {/* 時間形式ラベル（条件付き表示） */}
      {label && (
        <div className="text-sm text-gray-500"> {/* 小文字, 薄いグレー */}
          {label}
        </div>
      )}
    </div>
  );
} 