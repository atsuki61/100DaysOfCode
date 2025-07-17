import React from 'react';
import { Card as CardType } from '../types';

interface CardProps {
  card: CardType;
  onClick: (id: number) => void; // クリック時にカードのIDを渡す関数
  isChecking: boolean;
}

const Card: React.FC<CardProps> = ({ card, onClick }) => {
  const { content, isFlipped, isMatched } = card;

  const handleClick = () => {
    // まだめくられていない、かつマッチしていないカードのみクリック可能
    if (!isFlipped && !isMatched) {
      onClick(card.id);
    }
  };
 // 3D回転アニメーションのための基本的なコンテナ
 return (
  <div
    className="w-full h-24 rounded-lg cursor-pointer perspective-1000"
    onClick={handleClick}
  >
    <div
      className={`
        relative w-full h-full transition-transform duration-500 transform-style-preserve-3d
        ${isFlipped || isMatched ? 'rotate-y-180' : ''}
      `}
    >
      {/* カードの裏面 (最初はこれが表示される) */}
      <div className="absolute w-full h-full backface-hidden rounded-lg flex items-center justify-center bg-indigo-500">
        {/* 裏面のデザイン。お好みでアイコンなどを入れてもOK */}
      </div>

      {/* カードの表面 (回転後に表示される) */}
      <div className="absolute w-full h-full backface-hidden rounded-lg flex items-center justify-center bg-white text-4xl rotate-y-180 text-slate-900"> {/* text-slate-900: 濃い文字色を追加 */}
        {content}
      </div>
    </div>
  </div>
);
};

export default Card;