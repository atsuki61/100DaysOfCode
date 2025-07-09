import { Player } from '../types';

interface CellProps {
  value: Player;
  onClick: () => void;
  isWinningCell?: boolean;
}

export default function Cell({ value, onClick, isWinningCell = false }: CellProps) {
  return (
    <button
      onClick={onClick}
      disabled={value !== null}
      className={`
        w-20 h-20 sm:w-24 sm:h-24 
        border-2 border-gray-400 
        text-2xl sm:text-3xl font-bold 
        transition-all duration-200 
        ${isWinningCell 
          ? 'bg-green-200 border-green-500 text-green-800' // 勝利セル: 緑色ハイライト
          : value !== null 
            ? 'bg-white text-gray-800 cursor-default' // 埋まっているセル: 白背景
            : 'bg-gray-100 hover:bg-gray-200 cursor-pointer hover:scale-105' // 空セル: グレー背景、ホバー効果
        }
        ${value === 'X' ? 'text-blue-600' : value === 'O' ? 'text-red-600' : ''} 
        focus:outline-none focus:ring-2 focus:ring-blue-500
        rounded-lg shadow-sm
      `} // Xは青、Oは赤, フォーカスリング, 角丸, 軽い影
    >
      {value === 'X' && '❌'}
      {value === 'O' && '⭕'}
    </button>
  );
} 