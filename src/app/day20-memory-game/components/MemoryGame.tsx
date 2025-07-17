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
  { pairId: 7, content: '🍎' },
  { pairId: 8, content: '🍊' },
  { pairId: 9, content: '🍋' },
  { pairId: 10, content: '🍈' },
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
  const [flippedCards, setFlippedCards] = useState<number[]>([]);  // 現在めくられているカードのIDを保持するstate（最大2つ）
  const [isChecking, setIsChecking] = useState(false);  // ペアが一致しているかチェック中の状態かを管理するstate
  const [isGameClear, setIsGameClear] = useState(false); // ゲームがクリアしたかどうかを管理するstate
  
  // ゲームを初期化する関数
  const initializeGame = () => {
    const duplicatedCards = initialCards.flatMap((card, index) => {
      const pairId = index + 1;
      return [
        { ...card, id: pairId * 2 - 1, pairId, isFlipped: false, isMatched: false },
        { ...card, id: pairId * 2, pairId, isFlipped: false, isMatched: false },
      ];
    });
    setCards(shuffleArray(duplicatedCards));
    setFlippedCards([]);
    setIsChecking(false);
    setIsGameClear(false);
  };

   // 初回マウント時にゲームを初期化
   useEffect(() => {
    initializeGame();
  }, []);

  // ペア判定ロジック
  useEffect(() => {
    if (flippedCards.length === 2) { // 2枚のカードがめくられたら判定処理を開始
      setIsChecking(true); // チェック状態にする

      const [firstCardId, secondCardId] = flippedCards;//めくられたカードのIDを取得
      const firstCard = cards.find((c) => c.id === firstCardId);//カードの配列から、めくられたカードのIDに一致するカードを取得
      const secondCard = cards.find((c) => c.id === secondCardId);//カードの配列から、めくられたカードのIDに一致するカードを取得

      // ペアが一致した場合
      if (firstCard && secondCard && firstCard.pairId === secondCard.pairId) {
        setCards((prevCards) =>//カードの配列を更新
          prevCards.map((card) =>//カードの配列を更新
            card.pairId === firstCard.pairId//ペアIDが一致しているかどうかをチェック
              ? { ...card, isMatched: true } // isMatchedをtrueに更新
              : card
          )
        );

        // 次のペア選択のために、めくられたカード情報をリセット
        setFlippedCards([]);
        setIsChecking(false); // チェック状態を解除
      } else {
        // ペアが不一致だった場合、1秒後にカードを裏返す
        setTimeout(() => {
          setCards((prevCards) =>//カードの配列を更新
            prevCards.map((card) =>//カードの配列を更新
              flippedCards.includes(card.id)//カードのIDがめくられたカードのIDに一致しているかどうかをチェック
                ? { ...card, isFlipped: false } // isFlippedをfalseに戻す
                : card // クリックされていないカードはそのまま
            )
          );
          // 次のペア選択のために、めくられたカード情報をリセット
          setFlippedCards([]);
          setIsChecking(false); // チェック状態を解除
        }, 1000); // 1000ms = 1秒
      }
    }
  }, [flippedCards, cards]); // flippedCardsかcardsの状態が変わるたびに実行

// ゲームクリアを判定するロジック
    // ゲームクリアを判定するロジック
    useEffect(() => {
      // カードが0枚の場合は何もしない（初期化中の誤判定を防ぐ）
      if (cards.length === 0) return;
      
      // 全てのカードがマッチしたらクリア
      const allMatched = cards.every(card => card.isMatched);
      if (allMatched) {
        setIsGameClear(true);
      }
    }, [cards]); // ★★★ useEffectはここで正しく閉じられます ★★★


    // カードがクリックされたときの処理
    const handleCardClick = (clickedId: number) => {
      if (isChecking || flippedCards.length === 2) {
        return;
      }
      setCards((prevCards) =>
        prevCards.map((card) =>
          card.id === clickedId ? { ...card, isFlipped: true } : card
        )
      );
      setFlippedCards((prev) => [...prev, clickedId]);
    };

    // ★★★ コンポーネントが画面に表示する内容（JSX）はここから始まります ★★★
    return (
      <div className="text-center">
        {/* ゲームクリアメッセージ */}
        {isGameClear && (
          <div className="mb-4 p-4 bg-green-200 text-green-800 rounded-lg">
            <p className="font-bold text-lg">🎉 クリア！おめでとうございます！ 🎉</p>
          </div>
        )}

        {/* ゲーム盤面 */}
        <div
          className={`grid grid-cols-5 gap-4 max-w-xl mx-auto perspective-1000 ${ // grid-cols-4 -> 5, max-w-md -> xl に変更
            isGameClear ? 'opacity-50' : ''
          }`}
        >
          {cards.map((card) => (
            <Card 
              key={card.id} 
              card={card} 
              onClick={handleCardClick} 
              isChecking={isChecking} 
            />
          ))}
        </div>

        {/* リセットボタン */}
        <button
          onClick={initializeGame}
          className="mt-8 px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75"
          // mt-8:上マージン8, px-6 py-2:パディング, bg-indigo-600:背景色, text-white font-semibold:文字スタイル, rounded-lg shadow-md:角丸と影, hover:bg-indigo-700:ホバー時背景色
        >
          リセット
        </button>
      </div>
    );
  };
export default MemoryGame;