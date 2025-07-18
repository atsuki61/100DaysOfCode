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
  const [moves, setMoves] = useState(0); // 試行回数をカウント
  const [isPreviewMode, setIsPreviewMode] = useState(false); // プレビューモード（開始時に全カードを1秒表示）
  
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
    setMoves(0); // 試行回数もリセット
    setIsPreviewMode(true); // プレビューモードを開始
  };

   // 初回マウント時にゲームを初期化
   useEffect(() => {
    initializeGame();
  }, []);

  // プレビューモードのタイマー制御
  useEffect(() => {
    if (isPreviewMode) {
      const timer = setTimeout(() => {
        setIsPreviewMode(false); // 1秒後にプレビューモードを終了
      }, 1000); // 1000ms = 1秒

      return () => clearTimeout(timer); // クリーンアップ関数
    }
  }, [isPreviewMode]);

  // ペア判定ロジック
  useEffect(() => {
    // 2枚のカードがめくられたら判定処理を開始
    if (flippedCards.length === 2) {
      setIsChecking(true); // チェック状態にする
      setMoves((prev) => prev + 1); // 2枚目がめくられた時に試行回数を増やす

      const [firstCardId, secondCardId] = flippedCards;
      const firstCard = cards.find((c) => c.id === firstCardId);
      const secondCard = cards.find((c) => c.id === secondCardId);

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
      if (isChecking || flippedCards.length === 2 || isPreviewMode) {
        return;
      }
      setCards((prevCards) =>
        prevCards.map((card) =>
          card.id === clickedId ? { ...card, isFlipped: true } : card
        )
      );
      setFlippedCards((prev) => [...prev, clickedId]);
      // setMoves((prev) => prev + 1); // カードをめくるたびに試行回数を増やす
    };

    // ★★★ コンポーネントが画面に表示する内容（JSX）はここから始まります ★★★
  return (
    <div className="text-center">
        {/* ゲームクリアメッセージ */}
        {isGameClear && (
          <div className="mb-6 p-6 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 text-white rounded-xl shadow-2xl animate-bounce">
            <div className="text-center">
              <div className="text-6xl mb-4 animate-pulse">🎉</div>
              <h3 className="text-3xl font-bold mb-2 drop-shadow-lg">
                おめでとうございます！
              </h3>
              <p className="text-xl mb-3 font-semibold">
                ゲームクリア！
              </p>
                             <div className="bg-slate-800 bg-opacity-80 rounded-lg p-3 mb-4">
                 <p className="text-lg font-bold text-white">
                   試行回数: <span className="text-yellow-300 text-xl">{moves}</span> 回
                 </p>
                 <p className="text-sm mt-1 text-gray-100">
                   {moves <= 10 ? '素晴らしい記憶力です！🏆' : 
                    moves <= 15 ? 'よくできました！👏' : 
                    'お疲れ様でした！💪'}
                 </p>
               </div>
              <div className="flex justify-center items-center space-x-2 text-4xl animate-pulse">
                <span>🌟</span>
                <span>✨</span>
                <span>🎊</span>
                <span>✨</span>
                <span>🌟</span>
              </div>
            </div>
          </div>
        )}

        {/* 試行回数表示 */}
        <div className="mb-4 text-lg font-bold text-gray-800 bg-gray-100 rounded-lg px-4 py-2 inline-block">
          試行回数: <span className="text-indigo-600">{moves}</span> 回
        </div>

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
              isPreviewMode={isPreviewMode}
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