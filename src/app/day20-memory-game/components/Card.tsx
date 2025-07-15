import React from 'react';
import { Card as CardType } from '../types';

interface CardProps {
  card: CardType;
  onClick: (id: number) => void; // クリック時にカードのIDを渡す関数
}

const Card: React.FC<CardProps> = ({ card, onClick }) => {
  const { content, isFlipped, isMatched } = card;

  const handleClick = () => {
    // まだめくられていない、かつマッチしていないカードのみクリック可能
    if (!isFlipped && !isMatched) {
      onClick(card.id);
    }
  };

  return (
    <div
      className={`
        w-full h-24 rounded-lg flex items-center justify-center text-4xl cursor-pointer 
        transition-transform duration-300 transform-style-preserve-3d
        ${isFlipped || isMatched ? 'bg-white rotate-y-180' : 'bg-indigo-500'}
      `} // w-full:幅100%, h-24:高さ, rounded-lg:角丸, flex items-center justify-center:中央揃え, text-4xl:文字大, cursor-pointer:マウスカーソルがこの要素の上に来たときに指の形（リンクのような）に変わります。
      onClick={handleClick}
    >
      <div className={`absolute backface-hidden ${isFlipped || isMatched ? '' : 'rotate-y-180'}`}>
        {content}
      </div>
      <div className={`absolute backface-hidden ${isFlipped || isMatched ? 'rotate-y-180' : ''}`}>
        {/* カードの裏面のデザイン（今は空） */}
      </div>
    </div>
  );
};

export default Card;