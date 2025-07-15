'use client';

import React, { useState, useEffect } from 'react';
import { Card as CardType } from '../types';

// ゲームの初期カードデータ。ペアになるカードは同じpairIdを持つ
const initialCards: Omit<CardType, 'id' | 'isFlipped' | 'isMatched'>[] = [
  { pairId: 1, content: '🍓' },
  { pairId: 2, content: '🍉' },
  { pairId: 3, content: '🍌' },
  { pairId: 4, content: '🍍' },
  { pairId: 5, content: '🍇' },
  { pairId: 6, content: '🍑' },
];

const MemoryGame = () => {
  const [cards, setCards] = useState<CardType[]>([]);

  // TODO: ここにカードのシャッフルやクリック処理のロジックを追加していく

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-4"> {/* 文字サイズ2xl, 太字, 下マージン4 */}
        Memory Game
      </h2>
      <div className="grid grid-cols-4 gap-4"> {/* 4列グリッド, 要素間の隙間4 */}
        {/* TODO: ここにカードコンポーネントを並べる */}
        <p>カードがここに表示されます</p>
      </div>
    </div>
  );
};

export default MemoryGame;