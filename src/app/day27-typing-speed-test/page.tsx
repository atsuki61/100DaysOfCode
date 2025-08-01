'use client';

import { useState, useEffect, useRef } from 'react';
import { TypingTest } from './components/TypingTest';
import { Results } from './components/Results';
import { LearningPoints } from './components/LearningPoints';

export default function TypingSpeedTestPage() {
  const [isTestActive, setIsTestActive] = useState(false);
  const [testCompleted, setTestCompleted] = useState(false);
  const [results, setResults] = useState<{
    wpm: number;
    accuracy: number;
    timeElapsed: number;
    totalWords: number;
    correctWords: number;
  } | null>(null);

  const handleTestStart = () => {
    setIsTestActive(true);
    setTestCompleted(false);
    setResults(null);
  };

  const handleTestComplete = (testResults: {
    wpm: number;
    accuracy: number;
    timeElapsed: number;
    totalWords: number;
    correctWords: number;
  }) => {
    setResults(testResults);
    setIsTestActive(false);
    setTestCompleted(true);
  };

  const handleRestart = () => {
    setIsTestActive(false);
    setTestCompleted(false);
    setResults(null);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          タイピング速度テスト
        </h1>
        <p className="text-lg text-gray-600">
          表示された文章を正確にタイピングして、あなたのWPM（1分間の単語数）を測定しましょう
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        {!isTestActive && !testCompleted && (
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              テストを開始しますか？
            </h2>
            <p className="text-gray-600 mb-6">
              制限時間は1分間です。できるだけ正確に、そして速くタイピングしてください。
            </p>
            <button
              onClick={handleTestStart}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
            >
              テスト開始
            </button>
          </div>
        )}

        {isTestActive && (
          <TypingTest onComplete={handleTestComplete} />
        )}

        {testCompleted && results && (
          <Results results={results} onRestart={handleRestart} />
        )}
      </div>

      <LearningPoints />
    </div>
  );
} 