'use client';

import React, { useState, useEffect } from 'react';
import { Card as CardType } from '../types';

// ... initialCardsは変更なし ...
const initialCards: Omit<CardType, 'id' | 'isFlipped' | 'isMatched'>[] = [
  { pairId: 1, content: '🍓' },
  { pairId: 2, content: '🍉' },
  { pairId: 3, content: '🍌' },
  { pairId: 4, content: '🍍' },
  { pairId: 5, content: '🍇' },
  { pairId: 6, content: '🍑' },
];

/**
 * Fisher-Yatesアルゴリズムを使って配列をシャッフルする関数
 * @param array シャッフルしたい配列
 * @returns シャッフル後の新しい配列
 */
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
    const duplicatedCards = initialCards.flatMap((card, index) => {
      const pairId = index + 1;
      return [
        { ...card, id: pairId * 2 - 1, pairId, isFlipped: false, isMatched: false },
        { ...card, id: pairId * 2, pairId, isFlipped: false, isMatched: false },
      ];
    });

    // 2. カードをシャッフルする
    const shuffled = shuffleArray(duplicatedCards);

    // 3. stateを更新してゲーム盤面に反映する
    setCards(shuffled);
  }, []); // 空の依存配列[]を指定することで、コンポーネントの初回マウント時にのみ実行される

  // ... return文は変更なし ...
  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-4">Memory Game</h2>
      <div className="grid grid-cols-4 gap-4">
        {/* TODO: ここにカードコンポーネントを並べる */}
        <p>カードがここに表示されます</p>
      </div>
    </div>
  );
};

export default MemoryGame;