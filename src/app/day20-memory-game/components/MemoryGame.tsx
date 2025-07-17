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
  const [flippedCards, setFlippedCards] = useState<number[]>([]);  // 現在めくられているカードのIDを保持するstate（最大2つ）
  const [isChecking, setIsChecking] = useState(false);  // ペアが一致しているかチェック中の状態かを管理するstate

  // 初回マウント時の処理 ゲーム開始時にカードを初期化してシャッフルする
  useEffect(() => {
    const duplicatedCards = initialCards.flatMap((card, index) => {//flatMap:配列の各要素に対して処理を行い、新しい配列を返す
      const pairId = index + 1;//ペアIDを生成
      return [
        { ...card, id: pairId * 2 - 1, pairId, isFlipped: false, isMatched: false },//ペアIDを2倍して1を引くことで、奇数と偶数のIDを生成
        { ...card, id: pairId * 2, pairId, isFlipped: false, isMatched: false },//ペアIDを2倍することで、偶数と奇数のIDを生成
      ];
    });
    // 2. カードをシャッフルする
    setCards(shuffleArray(duplicatedCards));
  }, []); // 空の依存配列[]を指定することで、コンポーネントの初回マウント時にのみ実行される

  // flippedCards（めくられたカード）の状態が変わった時に実行される
  useEffect(() => {
    // 2枚のカードがめくられたら判定処理を開始
    if (flippedCards.length === 2) {
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
          setCards((prevCards) =>
            prevCards.map((card) =>
              flippedCards.includes(card.id)
                ? { ...card, isFlipped: false } // isFlippedをfalseに戻す
                : card
            )
          );
          // 次のペア選択のために、めくられたカード情報をリセット
          setFlippedCards([]);
          setIsChecking(false); // チェック状態を解除
        }, 1000); // 1000ms = 1秒
      }
    }
  }, [flippedCards, cards]); // flippedCardsかcardsの状態が変わるたびに実行

  // カードがクリックされたときの処理
  const handleCardClick = (clickedId: number) => {
    console.log(`カード${clickedId}がクリックされました`); //
     if (isChecking || flippedCards.length === 2) {//チェック中、または既に2枚めくられている場合は何もしない
      return;//何もしない
    }
    // 1. クリックされたカードを `isFlipped = true` にする
    setCards((prevCards) =>//カードの配列を更新
      prevCards.map((card) =>//カードの配列を更新
        card.id === clickedId ? { ...card, isFlipped: true } : card//クリックされたカードをめくる
      )
    );
    setFlippedCards((prev) => [...prev, clickedId]);//めくられたカードのIDをstateに追加する

    // TODO: 次のステップで、ここにペア判定のロジックを追加
  };

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