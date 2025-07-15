'use client';

import React, { useState, useEffect } from 'react';
import { Card as CardType } from '../types';
import Card from './Card'; // Cardコンポーネントをインポート

// ... initialCardsは変更なし ...
const initialCards: Omit<CardType, 'id' | 'isFlipped' | 'isMatched'>[] = [
  { pairId: 1, content: '🍓' },
  { pairId: 2, content: '🍉' },
  { pairId: 3, content: '🍌' },
  { pairId: 4, content: '🍍' },
  { pairId: 5, content: '🍇' },
  { pairId: 6, content: '🍑' },
];

// カードをシャッフルする関数
const shuffleArray = <T,>(array: T[]): T[] => {
  const newArray = [...array]; // 元の配列をコピー
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]]; // 要素を交換
  }
  return newArray;
};

const MemoryGame = () => {
  const [cards, setCards] = useState<CardType[]>([]);

  // ゲーム開始時にカードを初期化してシャッフルする
  useEffect(() => {
    // 1. 各カードを2枚ずつに増やす
    const duplicatedCards = initialCards.flatMap((card, index) => {//flatMap:配列の各要素に対して処理を行い、新しい配列を返す
      const pairId = index + 1;
      return [
        { ...card, id: pairId * 2 - 1, pairId, isFlipped: false, isMatched: false },//ペアIDを2倍して1を引くことで、奇数と偶数のIDを生成
        { ...card, id: pairId * 2, pairId, isFlipped: false, isMatched: false },//ペアIDを2倍することで、偶数と奇数のIDを生成
      ];
    });
    // 2. カードをシャッフルする
    setCards(shuffleArray(duplicatedCards));
  }, []); // 空の依存配列[]を指定することで、コンポーネントの初回マウント時にのみ実行される

  // カードがクリックされた時の処理
  const handleCardClick = (id: number) => {//
    console.log(`カード${id}がクリックされました`); //
    // TODO: ここにカードをめくるロジックを追加
  }

  // ... return文は変更なし ...
  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-4">Memory Game</h2>
      <div className="grid grid-cols-4 gap-4 max-w-md mx-auto perspective-1000"> {/* 4列グリッド, 隙間4, 最大幅md, 中央寄せ */}
        {cards.map((card) => (
          <Card key={card.id} card={card} onClick={handleCardClick} />
        ))}
      </div>
    </div>
  );
};

export default MemoryGame;