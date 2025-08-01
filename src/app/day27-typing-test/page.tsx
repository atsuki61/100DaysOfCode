'use client';

import React from 'react';
import { TypingTestState, SampleText } from './types';
import { 
  updateCharStatuses, 
  calculateStats, 
  isTypingComplete, 
  calculateTimeElapsed 
} from './utils/typingUtils';
import { getRandomText, sampleTexts } from './utils/sampleTexts';
import TextSelector from './components/TextSelector';
import TextDisplay from './components/TextDisplay';
import TypingInput from './components/TypingInput';
import StatsDisplay from './components/StatsDisplay';
import ResultDisplay from './components/ResultDisplay';

export default function TypingTestPage() {
  // 初期状態
  const [selectedText, setSelectedText] = React.useState<SampleText | null>(null);
  const [typingState, setTypingState] = React.useState<TypingTestState>({
    text: '',
    userInput: '',
    currentIndex: 0,
    isStarted: false,
    isFinished: false,
    startTime: null,
    endTime: null,
    stats: {
      wpm: 0,
      accuracy: 100,
      totalTyped: 0,
      correctChars: 0,
      incorrectChars: 0,
      timeElapsed: 0,
    },
    charStatuses: [],
  });

  // タイマー用のRef
  const timerRef = React.useRef<NodeJS.Timeout | null>(null);

  // テキスト選択時の処理
  const handleTextSelect = React.useCallback((text: SampleText) => {
    setSelectedText(text);
    setTypingState(prev => ({
      ...prev,
      text: text.text,
      userInput: '',
      currentIndex: 0,
      isStarted: false,
      isFinished: false,
      startTime: null,
      endTime: null,
      stats: {
        wpm: 0,
        accuracy: 100,
        totalTyped: 0,
        correctChars: 0,
        incorrectChars: 0,
        timeElapsed: 0,
      },
      charStatuses: updateCharStatuses(text.text, '', 0),
    }));
  }, []);

  // ランダムテキスト選択
  const handleRandomSelect = React.useCallback(() => {
    const randomText = getRandomText();
    handleTextSelect(randomText);
  }, [handleTextSelect]);

  // 入力処理
  const handleInputChange = React.useCallback((value: string) => {
    if (typingState.isFinished) return;

    const now = Date.now();
    
    setTypingState(prev => {
      // 最初の入力でタイマー開始
      const startTime = prev.startTime || now;
      const isStarted = true;
      
      // 文字状態を更新
      const charStatuses = updateCharStatuses(prev.text, value, value.length);
      
      // 統計を計算
      const timeElapsed = calculateTimeElapsed(startTime, now);
      const stats = calculateStats(prev.text, value, timeElapsed);
      
      // 完了チェック
      const isComplete = isTypingComplete(prev.text, value);
      
      return {
        ...prev,
        userInput: value,
        currentIndex: value.length,
        isStarted,
        isFinished: isComplete,
        startTime,
        endTime: isComplete ? now : null,
        stats,
        charStatuses,
      };
    });
  }, [typingState.isFinished]);

  // タイマー更新
  React.useEffect(() => {
    if (typingState.isStarted && !typingState.isFinished && typingState.startTime) {
      timerRef.current = setInterval(() => {
        setTypingState(prev => {
          if (!prev.startTime || prev.isFinished) return prev;
          
          const timeElapsed = calculateTimeElapsed(prev.startTime);
          const stats = calculateStats(prev.text, prev.userInput, timeElapsed);
          
          return {
            ...prev,
            stats,
          };
        });
      }, 100); // 100ms間隔で更新

      return () => {
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
      };
    }
  }, [typingState.isStarted, typingState.isFinished, typingState.startTime]);

  // コンポーネントのクリーンアップ
  React.useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  // 再開始
  const handleRestart = React.useCallback(() => {
    if (!selectedText) return;
    
    setTypingState(prev => ({
      ...prev,
      userInput: '',
      currentIndex: 0,
      isStarted: false,
      isFinished: false,
      startTime: null,
      endTime: null,
      stats: {
        wpm: 0,
        accuracy: 100,
        totalTyped: 0,
        correctChars: 0,
        incorrectChars: 0,
        timeElapsed: 0,
      },
      charStatuses: updateCharStatuses(prev.text, '', 0),
    }));
  }, [selectedText]);

  // 新しいテキスト選択
  const handleNewText = React.useCallback(() => {
    setSelectedText(null);
    setTypingState({
      text: '',
      userInput: '',
      currentIndex: 0,
      isStarted: false,
      isFinished: false,
      startTime: null,
      endTime: null,
      stats: {
        wpm: 0,
        accuracy: 100,
        totalTyped: 0,
        correctChars: 0,
        incorrectChars: 0,
        timeElapsed: 0,
      },
      charStatuses: [],
    });
  }, []);

  // 初回ランダムテキスト選択
  React.useEffect(() => {
    if (!selectedText) {
      handleRandomSelect();
    }
  }, [selectedText, handleRandomSelect]);

  return (
    <div className="min-h-screen bg-gray-50 py-8"> {/* 最小高さ画面, グレー50背景, 縦パディング8 */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"> {/* 最大横幅6xl, 水平中央, 横パディング4(sm以上で6・lg以上で8) */}
        
        {/* ヘッダー */}
        <div className="text-center mb-8"> {/* テキスト中央, 下マージン8 */}
          <h1 className="text-4xl font-bold text-gray-900 mb-2">⚡ タイピング速度テスト</h1> {/* 文字サイズ4xl, 太字, グレー900テキスト, 下マージン2 */}
          <p className="text-lg text-gray-600 max-w-2xl mx-auto"> {/* 文字サイズlg, グレー600テキスト, 最大横幅2xl, 水平中央 */}
            WPM（Words Per Minute）を計測して、あなたのタイピング速度と正確性をチェックしましょう！
          </p>
        </div>

        <div className="space-y-8"> {/* 縦方向スペース8 */}
          
          {/* テキスト選択（未完了時のみ表示） */}
          {!typingState.isFinished && (
            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6"> {/* 白背景, 角丸xl, 影md, ボーダー, グレー200ボーダー, パディング6 */}
              <h2 className="text-xl font-semibold text-gray-800 mb-4">📝 練習テキストを選択</h2> {/* 文字サイズxl, 太字, グレー800テキスト, 下マージン4 */}
              <TextSelector
                selectedText={selectedText}
                onTextSelect={handleTextSelect}
                onRandomSelect={handleRandomSelect}
                disabled={typingState.isStarted}
              />
            </div>
          )}

          {/* 統計情報表示（開始後） */}
          {typingState.isStarted && !typingState.isFinished && (
            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6"> {/* 白背景, 角丸xl, 影md, ボーダー, グレー200ボーダー, パディング6 */}
              <h2 className="text-xl font-semibold text-gray-800 mb-4">📊 リアルタイム統計</h2> {/* 文字サイズxl, 太字, グレー800テキスト, 下マージン4 */}
              <StatsDisplay stats={typingState.stats} isLive={true} />
            </div>
          )}

          {/* テキスト表示（テキスト選択後） */}
          {selectedText && !typingState.isFinished && (
            <TextDisplay 
              charStatuses={typingState.charStatuses}
              className="animate-fade-in" // フェードインアニメーション
            />
          )}

          {/* 入力エリア（テキスト選択後かつ未完了時） */}
          {selectedText && !typingState.isFinished && (
            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6"> {/* 白背景, 角丸xl, 影md, ボーダー, グレー200ボーダー, パディング6 */}
              <TypingInput
                value={typingState.userInput}
                onChange={handleInputChange}
                disabled={typingState.isFinished}
                placeholder={typingState.isStarted ? "入力中..." : "入力を開始してください..."}
                autoFocus={true}
              />
              
              {!typingState.isStarted && (
                <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200"> {/* 上マージン4, パディング4, 青50背景, 角丸lg, ボーダー, 青200ボーダー */}
                  <div className="flex items-center text-blue-700"> {/* Flexコンテナ, アイテム中央寄せ, 青700テキスト */}
                    <span className="text-2xl mr-3">💡</span> {/* 文字サイズ2xl, 右マージン3 */}
                    <div>
                      <div className="font-semibold">開始方法</div> {/* 太字 */}
                      <div className="text-sm">入力エリアに文字を入力すると自動的にタイマーが開始されます</div> {/* 文字サイズsm */}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 結果表示（完了時） */}
          {typingState.isFinished && (
            <ResultDisplay
              stats={typingState.stats}
              onRestart={handleRestart}
              onNewText={handleNewText}
              className="animate-fade-in" // フェードインアニメーション
            />
          )}

        </div>
      </div>
    </div>
  );
}