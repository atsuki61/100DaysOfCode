import { useState, useEffect, useRef, useCallback } from 'react';

interface UseStopwatchOptions {
  interval?: number; // 更新間隔（ミリ秒）
  autoStart?: boolean; // 自動開始
  onTimeChange?: (time: number) => void; // 時間変更時のコールバック
}

interface UseStopwatchReturn {
  time: number;
  isRunning: boolean;
  start: () => void;
  stop: () => void;
  reset: () => void;
  toggle: () => void;
  formatTime: (showMilliseconds?: boolean) => string;
}

export const useStopwatch = (options: UseStopwatchOptions = {}): UseStopwatchReturn => {
  const { interval = 10, autoStart = false, onTimeChange } = options;
  
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(autoStart);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime(prevTime => {
          const newTime = prevTime + interval;
          onTimeChange?.(newTime);
          return newTime;
        });
      }, interval);
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
  }, [isRunning, interval, onTimeChange]);

  const start = useCallback(() => {
    setIsRunning(true);
  }, []);

  const stop = useCallback(() => {
    setIsRunning(false);
  }, []);

  const reset = useCallback(() => {
    setIsRunning(false);
    setTime(0);
    onTimeChange?.(0);
  }, [onTimeChange]);

  const toggle = useCallback(() => {
    setIsRunning(prev => !prev);
  }, []);

  const formatTime = useCallback((showMilliseconds = true) => {
    const totalSeconds = Math.floor(time / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    
    if (showMilliseconds) {
      const centiseconds = Math.floor((time % 1000) / 10);
      return `${minutes.toString().padStart(2, '0')}:${seconds
        .toString()
        .padStart(2, '0')}.${centiseconds.toString().padStart(2, '0')}`;
    } else {
      return `${minutes.toString().padStart(2, '0')}:${seconds
        .toString()
        .padStart(2, '0')}`;
    }
  }, [time]);

  return {
    time,
    isRunning,
    start,
    stop,
    reset,
    toggle,
    formatTime,
  };
}; 