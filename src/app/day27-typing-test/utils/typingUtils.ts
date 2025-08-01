import { TypingStats, CharStatus, SampleText } from '../types';

/**
 * WPM（Words Per Minute）を計算
 * @param correctChars 正しく入力された文字数
 * @param timeElapsed 経過時間（秒）
 * @returns WPM値
 */
export function calculateWPM(correctChars: number, timeElapsed: number): number {
  if (timeElapsed === 0) return 0;
  // 一般的に1単語 = 5文字として計算
  const words = correctChars / 5;
  const minutes = timeElapsed / 60;
  return Math.round(words / minutes);
}

/**
 * 正確性を計算
 * @param correctChars 正しく入力された文字数
 * @param totalChars 総入力文字数
 * @returns 正確性（％）
 */
export function calculateAccuracy(correctChars: number, totalChars: number): number {
  if (totalChars === 0) return 100;
  return Math.round((correctChars / totalChars) * 100);
}

/**
 * 文字ごとの状態を更新
 * @param text 課題テキスト
 * @param userInput ユーザー入力
 * @param currentIndex 現在の入力位置
 * @returns 文字状態の配列
 */
export function updateCharStatuses(
  text: string,
  userInput: string,
  currentIndex: number
): CharStatus[] {
  return text.split('').map((char, index) => {
    if (index < userInput.length) {
      const userChar = userInput[index];
      return {
        char,
        status: char === userChar ? 'correct' : 'incorrect',
        userChar: char === userChar ? undefined : userChar,
      };
    } else if (index === currentIndex) {
      return {
        char,
        status: 'current',
      };
    } else {
      return {
        char,
        status: 'pending',
      };
    }
  });
}

/**
 * タイピング統計を計算
 * @param text 課題テキスト
 * @param userInput ユーザー入力
 * @param timeElapsed 経過時間（秒）
 * @returns 統計情報
 */
export function calculateStats(
  text: string,
  userInput: string,
  timeElapsed: number
): TypingStats {
  const totalTyped = userInput.length;
  let correctChars = 0;
  let incorrectChars = 0;

  for (let i = 0; i < userInput.length && i < text.length; i++) {
    if (text[i] === userInput[i]) {
      correctChars++;
    } else {
      incorrectChars++;
    }
  }

  // 余分に入力された文字は間違いとしてカウント
  if (userInput.length > text.length) {
    incorrectChars += userInput.length - text.length;
  }

  const wpm = calculateWPM(correctChars, timeElapsed);
  const accuracy = calculateAccuracy(correctChars, totalTyped);

  return {
    wpm,
    accuracy,
    totalTyped,
    correctChars,
    incorrectChars,
    timeElapsed,
  };
}

/**
 * タイピングが完了したかチェック
 * @param text 課題テキスト
 * @param userInput ユーザー入力
 * @returns 完了フラグ
 */
export function isTypingComplete(text: string, userInput: string): boolean {
  return userInput.length >= text.length && userInput === text;
}

/**
 * 経過時間を秒で計算
 * @param startTime 開始時刻（ミリ秒）
 * @param endTime 終了時刻（ミリ秒、省略時は現在時刻）
 * @returns 経過時間（秒）
 */
export function calculateTimeElapsed(startTime: number, endTime?: number): number {
  const currentTime = endTime || Date.now();
  return Math.floor((currentTime - startTime) / 1000);
}

/**
 * タイピング結果をフォーマット
 * @param stats 統計情報
 * @returns フォーマットされた結果
 */
export function formatResult(stats: TypingStats): string {
  const minutes = Math.floor(stats.timeElapsed / 60);
  const seconds = stats.timeElapsed % 60;
  const timeStr = minutes > 0 ? `${minutes}分${seconds}秒` : `${seconds}秒`;
  
  return `時間: ${timeStr} / WPM: ${stats.wpm} / 正確性: ${stats.accuracy}% / 総文字数: ${stats.totalTyped}`;
}