import { GameStatus, Player } from '../types';

interface GameStatusProps {
  status: GameStatus;
  currentPlayer: Player;
  winner: Player;
  moveCount: number;
  onRestart: () => void;
}

export default function GameStatusComponent({ 
  status, 
  currentPlayer, 
  winner, 
  moveCount, 
  onRestart 
}: GameStatusProps) {
  const getStatusMessage = () => {
    switch (status) {
      case 'won':
        return (
          <div className="text-2xl font-bold text-green-600"> {/* 大文字, 太字, 緑色 */}
            🎉 {winner === 'X' ? '❌' : '⭕'} プレイヤーの勝利！
          </div>
        );
      case 'draw':
        return (
          <div className="text-2xl font-bold text-orange-600"> {/* 大文字, 太字, オレンジ色 */}
            🤝 引き分け！
          </div>
        );
      case 'playing':
      default:
        return (
          <div className="text-xl font-semibold text-blue-600"> {/* 大文字, セミ太字, 青色 */}
            {currentPlayer === 'X' ? '❌' : '⭕'} プレイヤーのターン
          </div>
        );
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 text-center space-y-4"> {/* 白背景, 角丸, 影, パディング6, 中央揃え, 縦間隔4 */}
      {getStatusMessage()}
      
      <div className="text-sm text-gray-600"> {/* 小文字, グレー色 */}
        手数: {moveCount}
      </div>

      {(status === 'won' || status === 'draw') && (
        <button
          onClick={onRestart}
          className="mt-4 px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors duration-200" // 上マージン4, 横パディング6, 縦パディング2, 青背景, 白文字, セミ太字, 角丸, ホバー効果, トランジション
        >
          🔄 もう一度プレイ
        </button>
      )}
    </div>
  );
} 