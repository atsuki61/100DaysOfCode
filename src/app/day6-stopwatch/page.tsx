'use client';

import { useState, useEffect, useRef } from 'react';
import Header from '../../components/common/Header';
import PageHeader from '../../components/common/PageHeader';
import Footer from '../../components/common/Footer';
import { TimeDisplay, ControlButtons, StatusIndicator, LearningPoints } from './ui';

export default function StopwatchPage() {
  const [time, setTime] = useState(0); // 経過時間（ミリ秒）
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // タイマー処理
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime(prevTime => prevTime + 10); // 10ms間隔で更新
      }, 10);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    // クリーンアップ関数
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  // 時間のフォーマット関数
  const formatTime = (timeInMs: number) => {
    const totalSeconds = Math.floor(timeInMs / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const centiseconds = Math.floor((timeInMs % 1000) / 10);

    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}.${centiseconds.toString().padStart(2, '0')}`;
  };

  // 開始/停止
  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  // リセット
  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
  };

  // 学習ポイントのデータ
  const learningPoints = [
    'useEffectによるタイマー処理',
    'setInterval/clearIntervalの使用',
    'クリーンアップ関数',
    '時間のフォーマット',
    'useRefによる値の保持'
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* ヘッダー */}
      <Header 
        title="Day 6: ストップウォッチ" 
        showHomeLink={true} 
        showPortfolioLink={false} 
      />
      
      {/* メインコンテンツ */}
      <div className="flex-grow flex items-center justify-center p-4 pb-20">
        <div className="w-full max-w-md">
          {/* ページヘッダー */}
          <PageHeader
            icon="⏱️"
            title="ストップウォッチ"
            description="開始・停止・リセットができるタイマーアプリ"
            className="mb-8"
          />

          {/* ストップウォッチ本体 */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 text-center">
            
            {/* タイム表示 */}
            <TimeDisplay 
              time={formatTime(time)}
              label="分:秒.センチ秒"
              size="xl"
              className="mb-8"
            />

            {/* コントロールボタン */}
            <ControlButtons 
              isRunning={isRunning}
              onStartStop={handleStartStop}
              onReset={handleReset}
              className="mb-6"
            />

            {/* 状態表示 */}
            <StatusIndicator 
              isRunning={isRunning} 
              className="mb-6"
            />

            {/* 学習ポイント */}
            <LearningPoints 
              dayNumber={6}
              points={learningPoints}
            />
          </div>
        </div>
      </div>

      {/* フッター */}
      <Footer 
        currentDay={6} 
        totalDays={100} 
        showNavigation={true} 
      />
    </div>
  );
} 