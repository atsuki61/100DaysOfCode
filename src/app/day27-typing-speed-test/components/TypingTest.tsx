'use client';

import { useState, useEffect, useRef } from 'react';
import { TypingTestProps } from '../types';

const SAMPLE_TEXTS = [
  "プログラミングは現代社会において非常に重要なスキルです。コンピュータは私たちの生活のあらゆる場面で使われており、プログラミングの知識を持つことで、より効率的に問題を解決できるようになります。",
  "ReactはJavaScriptライブラリの一つで、ユーザーインターフェースを構築するために使用されます。コンポーネントベースのアーキテクチャにより、再利用可能で保守しやすいコードを書くことができます。",
  "TypeScriptはJavaScriptに静的型付けを追加したプログラミング言語です。型安全性により、開発時のエラーを減らし、コードの可読性と保守性を向上させることができます。",
  "Next.jsはReactベースのフレームワークで、サーバーサイドレンダリングや静的サイト生成などの機能を提供します。これにより、パフォーマンスとSEOの両方を最適化できます。",
  "Tailwind CSSはユーティリティファーストのCSSフレームワークです。事前に定義されたクラスを使用することで、迅速にレスポンシブなデザインを構築できます。"
];

export function TypingTest({ onComplete }: TypingTestProps) {
  const [currentText, setCurrentText] = useState('');
  const [userInput, setUserInput] = useState('');
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // ランダムなテキストを選択
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * SAMPLE_TEXTS.length);
    setCurrentText(SAMPLE_TEXTS[randomIndex]);
  }, []);

  // タイマーの処理
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive) {
      interval = setInterval(() => {
        setTimeElapsed(prev => {
          const newTime = prev + 0.1;
          // 1分（60秒）でテスト終了
          if (newTime >= 60) {
            setIsActive(false);
            calculateResults();
            return 60;
          }
          return newTime;
        });
      }, 100);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isActive]);

  // 入力フィールドのフォーカス
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setUserInput(value);

    // 初回入力でタイマー開始
    if (!isActive && value.length === 1) {
      setIsActive(true);
      setStartTime(Date.now());
    }

    // テキスト完了時の処理
    if (value.length >= currentText.length) {
      setIsActive(false);
      calculateResults();
    }
  };

  const calculateResults = () => {
    const words = currentText.split(' ').length;
    const userWords = userInput.split(' ').length;
    
    // 正確性の計算（文字レベル）
    let correctChars = 0;
    const minLength = Math.min(currentText.length, userInput.length);
    
    for (let i = 0; i < minLength; i++) {
      if (currentText[i] === userInput[i]) {
        correctChars++;
      }
    }
    
    const accuracy = (correctChars / currentText.length) * 100;
    
    // WPM計算（1分間の単語数）
    const timeInMinutes = timeElapsed / 60;
    const wpm = timeInMinutes > 0 ? Math.round(userWords / timeInMinutes) : 0;

    onComplete({
      wpm,
      accuracy: Math.round(accuracy * 100) / 100,
      timeElapsed: Math.round(timeElapsed * 10) / 10,
      totalWords: words,
      correctWords: Math.round((correctChars / currentText.length) * words)
    });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    const tenths = Math.floor((seconds % 1) * 10);
    return `${mins}:${secs.toString().padStart(2, '0')}.${tenths}`;
  };

  return (
    <div className="space-y-6">
      {/* タイマー */}
      <div className="text-center">
        <div className="text-3xl font-mono font-bold text-red-600 mb-2">
          {formatTime(timeElapsed)}
        </div>
        <div className="text-sm text-gray-600">
          残り時間: {formatTime(60 - timeElapsed)}
        </div>
      </div>

      {/* 課題テキスト */}
      <div className="bg-gray-100 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">
          タイピングしてください:
        </h3>
        <div className="text-gray-800 leading-relaxed whitespace-pre-wrap">
          {currentText}
        </div>
      </div>

      {/* 入力フィールド */}
      <div>
        <label htmlFor="typing-input" className="block text-sm font-medium text-gray-700 mb-2">
          入力欄:
        </label>
        <textarea
          ref={inputRef}
          id="typing-input"
          value={userInput}
          onChange={handleInputChange}
          disabled={!isActive && timeElapsed >= 60}
          className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          placeholder="ここにタイピングしてください..."
        />
      </div>

      {/* 進捗表示 */}
      <div className="flex justify-between text-sm text-gray-600">
        <span>入力文字数: {userInput.length}</span>
        <span>目標文字数: {currentText.length}</span>
        <span>進捗: {Math.round((userInput.length / currentText.length) * 100)}%</span>
      </div>

      {/* リアルタイムフィードバック */}
      {userInput.length > 0 && (
        <div className="bg-gray-50 p-3 rounded-lg">
          <h4 className="font-medium text-gray-700 mb-2">入力内容:</h4>
          <div className="text-sm text-gray-600">
            {userInput.split('').map((char, index) => {
              const isCorrect = index < currentText.length && char === currentText[index];
              const isExtra = index >= currentText.length;
              
              return (
                <span
                  key={index}
                  className={`${
                    isCorrect ? 'text-green-600' : 
                    isExtra ? 'text-red-600 bg-red-100' : 'text-red-600'
                  }`}
                >
                  {char}
                </span>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
} 