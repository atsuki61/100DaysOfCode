'use client';

import { useState, useEffect, useRef } from 'react';

interface StopwatchProps {
  className?: string;
  showMilliseconds?: boolean;
  onTimeChange?: (time: number) => void;
}

export default function Stopwatch({ 
  className = '', 
  showMilliseconds = true,
  onTimeChange 
}: StopwatchProps) {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime(prevTime => {
          const newTime = prevTime + 10;
          onTimeChange?.(newTime);
          return newTime;
        });
      }, 10);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, onTimeChange]);

  const formatTime = (timeInMs: number) => {
    const totalSeconds = Math.floor(timeInMs / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    
    if (showMilliseconds) {
      const centiseconds = Math.floor((timeInMs % 1000) / 10);
      return `${minutes.toString().padStart(2, '0')}:${seconds
        .toString()
        .padStart(2, '0')}.${centiseconds.toString().padStart(2, '0')}`;
    } else {
      return `${minutes.toString().padStart(2, '0')}:${seconds
        .toString()
        .padStart(2, '0')}`;
    }
  };

  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
    onTimeChange?.(0);
  };

  return (
    <div className={`${className}`}>
      <div className="text-center">
        <div className="text-4xl md:text-6xl font-mono font-bold text-gray-800 mb-4">
          {formatTime(time)}
        </div>
        
        <div className="flex gap-4 justify-center">
          <button
            onClick={handleStartStop}
            className={`px-6 py-2 rounded-lg font-semibold text-white transition-colors duration-200 ${
              isRunning
                ? 'bg-red-500 hover:bg-red-600'
                : 'bg-green-500 hover:bg-green-600'
            }`}
          >
            {isRunning ? '⏸️ 停止' : '▶️ 開始'}
          </button>
          
          <button
            onClick={handleReset}
            className="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-semibold transition-colors duration-200"
          >
            🔄 リセット
          </button>
        </div>

        <div className="mt-4">
          <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
            isRunning 
              ? 'bg-green-100 text-green-800' 
              : 'bg-gray-100 text-gray-800'
          }`}>
            <div className={`w-2 h-2 rounded-full mr-2 ${
              isRunning ? 'bg-green-500 animate-pulse' : 'bg-gray-400'
            }`}></div>
            {isRunning ? '動作中' : '停止中'}
          </div>
        </div>
      </div>
    </div>
  );
} 