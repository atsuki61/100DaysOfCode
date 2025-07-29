import { TypingResult, CharacterStatus, KeyStroke, TypingError } from '../types'

/**
 * WPM (Words Per Minute) を計算する
 * @param charactersTyped 入力された文字数
 * @param timeInSeconds 経過時間（秒）
 * @returns WPM値
 */
export const calculateWPM = (charactersTyped: number, timeInSeconds: number): number => {
  if (timeInSeconds === 0) return 0
  // 標準的な単語の長さを5文字として計算
  const words = charactersTyped / 5
  const minutes = timeInSeconds / 60
  return Math.round(words / minutes)
}

/**
 * CPM (Characters Per Minute) を計算する
 * @param charactersTyped 入力された文字数
 * @param timeInSeconds 経過時間（秒）
 * @returns CPM値
 */
export const calculateCPM = (charactersTyped: number, timeInSeconds: number): number => {
  if (timeInSeconds === 0) return 0
  const minutes = timeInSeconds / 60
  return Math.round(charactersTyped / minutes)
}

/**
 * 正確性を計算する
 * @param correctCharacters 正しく入力された文字数
 * @param totalCharacters 総文字数
 * @returns 正確性（パーセンテージ）
 */
export const calculateAccuracy = (correctCharacters: number, totalCharacters: number): number => {
  if (totalCharacters === 0) return 100
  return Math.round((correctCharacters / totalCharacters) * 100)
}

/**
 * タイピング結果を計算する（レガシー版 - 簡易計算）
 * @param targetText 課題文章
 * @param userInput ユーザー入力
 * @param startTime 開始時間
 * @param endTime 終了時間
 * @param keyStrokes キー入力履歴（オプション）
 * @param errors エラー履歴（オプション）
 * @returns TypingResult
 */
export const calculateTypingResult = (
  targetText: string,
  userInput: string,
  startTime: number,
  endTime: number,
  keyStrokes: KeyStroke[] = [],
  errors: TypingError[] = []
): TypingResult => {
  const timeElapsed = (endTime - startTime) / 1000 // ミリ秒から秒に変換
  const totalCharacters = Math.min(userInput.length, targetText.length)
  
  let correctCharacters = 0
  let incorrectCharacters = 0
  
  for (let i = 0; i < totalCharacters; i++) {
    if (userInput[i] === targetText[i]) {
      correctCharacters++
    } else {
      incorrectCharacters++
    }
  }
  
  const wpm = calculateWPM(correctCharacters, timeElapsed)
  const cpm = calculateCPM(correctCharacters, timeElapsed)
  const accuracy = calculateAccuracy(correctCharacters, totalCharacters)
  
  // 拡張プロパティの計算
  const totalKeyStrokes = keyStrokes.length
  const errorCount = errors.length
  const averageSpeed = timeElapsed > 0 ? totalCharacters / timeElapsed : 0
  const errorRate = totalKeyStrokes > 0 ? (errorCount / totalKeyStrokes) * 100 : 0
  
  return {
    wpm,
    cpm,
    accuracy,
    timeElapsed,
    totalCharacters,
    correctCharacters,
    incorrectCharacters,
    totalKeyStrokes,
    errorCount,
    keyStrokes,
    errors,
    averageSpeed,
    errorRate
  }
}

/**
 * 文字の状態を判定する
 * @param targetChar 課題文字
 * @param userChar ユーザー入力文字
 * @param index 文字のインデックス
 * @param currentIndex 現在のインデックス
 * @param userInputLength ユーザー入力の長さ
 * @returns CharacterStatus
 */
export const getCharacterStatus = (
  targetChar: string,
  userChar: string | undefined,
  index: number,
  currentIndex: number,
  userInputLength: number
): CharacterStatus => {
  if (index === currentIndex && userInputLength === index) {
    return 'current'
  } else if (index < userInputLength) {
    return userChar === targetChar ? 'correct' : 'incorrect'
  } else {
    return 'pending'
  }
}

/**
 * 時間を mm:ss 形式でフォーマットする
 * @param seconds 秒数
 * @returns フォーマットされた時間文字列
 */
export const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
}

/**
 * 進捗率を計算する
 * @param userInputLength ユーザー入力の長さ
 * @param targetTextLength 課題文章の長さ
 * @returns 進捗率（パーセンテージ）
 */
export const calculateProgress = (userInputLength: number, targetTextLength: number): number => {
  if (targetTextLength === 0) return 0
  return Math.round((userInputLength / targetTextLength) * 100)
} 