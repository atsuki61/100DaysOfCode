import React from 'react';
import { Card as CardType } from '../types';

interface CardProps {
  card: CardType;
  onClick: (id: number) => void;
  isChecking: boolean;
}

const Card: React.FC<CardProps> = ({ card, onClick, isChecking }) => {
  const { content, isFlipped, isMatched } = card;

  const handleClick = () => {
    // チェック中でなく、まだめくられていない、かつマッチしていないカードのみクリック可能
    if (!isChecking && !isFlipped && !isMatched) {
      onClick(card.id);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`
        w-full h-24 rounded-lg flex items-center justify-center text-4xl cursor-pointer
        text-slate-900 font-bold shadow-md
        transition-all duration-300 ease-in-out transform
        ${!isChecking && !isFlipped && !isMatched ? 'hover:scale-105 hover:shadow-lg' : ''}
        ${isFlipped || isMatched 
          ? 'bg-white scale-105 border-2 border-green-400' // めくれている時は白背景、少し大きく、緑の枠
          : 'bg-indigo-500 hover:bg-indigo-600'             // 裏向きは藍色、ホバーで少し濃く
        }
        ${isMatched ? 'animate-pulse' : ''} // マッチしたカードは点滅
      `}
    >
      {/* isFlippedかisMatchedがtrueの時だけ中身を表示 */}
      {isFlipped || isMatched ? content : ''}
    </div>
  );
};

export default Card;