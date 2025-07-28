'use client'

import { useState, useEffect, useCallback } from 'react'
import { TypingState, TypingResult, TypingText, KeyStroke, TypingError, KeyInputEvent } from '../types'
import { validateRomajiInput, isJapanese, convertToRomaji, generateRomajiCombinations } from '../utils/romajiUtils'

const initialState: TypingState = {
  status: 'idle',
  selectedText: null,
  userInput: '',
  romajiInput: '',
  currentIndex: 0,
  startTime: null,
  endTime: null,
  errors: [],
  keyStrokes: [],
  currentPosition: 0,
  expectedKeys: []
}

export const useTypingTest = () => {
  const [state, setState] = useState<TypingState>(initialState)
  const [result, setResult] = useState<TypingResult | null>(null)
  const [elapsedTime, setElapsedTime] = useState<number>(0)

  // タイマー機能
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (state.status === 'running' && state.startTime) {
      interval = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - state.startTime!) / 1000))
      }, 1000)
    } else {
      if (interval) clearInterval(interval)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [state.status, state.startTime])

  // 期待されるキーを計算
  const calculateExpectedKeys = useCallback((text: string, position: number, romajiBuffer: string): string[] => {
    if (position >= text.length) return []
    
    const currentChar = text[position]
    
    // 日本語の場合はローマ字変換
    if (isJapanese(currentChar)) {
      const remainingText = text.slice(position)
      const validation = validateRomajiInput(remainingText, romajiBuffer)
      return validation.expectedChars
    } else {
      // 英数字・記号の場合はそのまま
      return [currentChar]
    }
  }, [])

  // テスト開始
  const startTest = useCallback((selectedText: TypingText) => {
    const startTime = Date.now()
    const expectedKeys = calculateExpectedKeys(selectedText.content, 0, '')
    
    setState({
      ...initialState,
      status: 'running',
      selectedText,
      startTime,
      expectedKeys
    })
    setResult(null)
    setElapsedTime(0)
  }, [calculateExpectedKeys])

  // キー入力処理（厳密制御）
  const handleKeyInput = useCallback((keyEvent: KeyInputEvent) => {
    if (state.status !== 'running' || !state.selectedText) return false

    const { key, timestamp } = keyEvent
    const currentTime = timestamp || Date.now()

    // 制御キーは無視
    if (keyEvent.ctrlKey || keyEvent.metaKey || keyEvent.altKey) {
      return false
    }

    // バックスペース等の制御キーは無効
    if (key === 'Backspace' || key === 'Delete' || key === 'ArrowLeft' || key === 'ArrowRight') {
      return false
    }

    setState(prev => {
      const currentChar = prev.selectedText!.content[prev.currentPosition]
      const isCurrentJapanese = isJapanese(currentChar)
      
      let newRomajiInput = prev.romajiInput
      let newPosition = prev.currentPosition
      let newUserInput = prev.userInput
      let isCorrectInput = false
      let shouldAdvance = false

      // 日本語文字の処理
      if (isCurrentJapanese) {
        const testRomajiInput = prev.romajiInput + key
        const remainingText = prev.selectedText!.content.slice(prev.currentPosition)
        const validation = validateRomajiInput(remainingText, testRomajiInput)

        if (validation.isValid) {
          newRomajiInput = testRomajiInput
          isCorrectInput = true

          // 文字が完成した場合
          if (validation.isComplete) {
            // 完成した文字数を計算
            const romajiPatterns = convertToRomaji(remainingText)
            const combinations = generateRomajiCombinations(romajiPatterns)
            const matchedCombination = combinations.find(combo => combo === testRomajiInput)
            
            if (matchedCombination) {
              // 対応する日本語文字を追加
              const completedChars = remainingText.slice(0, 1) // 最初の1文字
              newUserInput = prev.userInput + completedChars
              newPosition = prev.currentPosition + 1
              newRomajiInput = '' // バッファをクリア
              shouldAdvance = true
            }
          }
        } else {
          isCorrectInput = false
        }
      } else {
        // 英数字・記号の処理
        if (key === currentChar) {
          newUserInput = prev.userInput + key
          newPosition = prev.currentPosition + 1
          isCorrectInput = true
          shouldAdvance = true
        } else {
          isCorrectInput = false
        }
      }

      // キーストローク記録
      const newKeyStroke: KeyStroke = {
        key,
        timestamp: currentTime,
        isCorrect: isCorrectInput,
        expectedKey: prev.expectedKeys[0] || null,
        position: prev.currentPosition
      }

      // エラー記録
      const newErrors = [...prev.errors]
      if (!isCorrectInput) {
        const existingError = newErrors.find(err => err.position === prev.currentPosition)
        if (existingError) {
          existingError.attempts += 1
        } else {
          const newError: TypingError = {
            position: prev.currentPosition,
            expectedChar: currentChar,
            inputChar: key,
            timestamp: currentTime,
            attempts: 1
          }
          newErrors.push(newError)
        }
      }

      // 次に期待されるキーを計算
      const nextExpectedKeys = shouldAdvance && newPosition < prev.selectedText!.content.length
        ? calculateExpectedKeys(prev.selectedText!.content, newPosition, newRomajiInput)
        : isCurrentJapanese 
          ? validateRomajiInput(prev.selectedText!.content.slice(prev.currentPosition), newRomajiInput).expectedChars
          : prev.expectedKeys

      // テスト完了チェック
      let newStatus = prev.status
      let endTime = prev.endTime
      if (newPosition >= prev.selectedText!.content.length) {
        newStatus = 'completed'
        endTime = currentTime
      }

      return {
        ...prev,
        userInput: newUserInput,
        romajiInput: newRomajiInput,
        currentPosition: newPosition,
        keyStrokes: [...prev.keyStrokes, newKeyStroke],
        errors: newErrors,
        expectedKeys: nextExpectedKeys,
        status: newStatus,
        endTime,
        currentIndex: newPosition // 後方互換性のため
      }
    })

    // 正しい入力のみ受け付ける
    return true
  }, [state.status, state.selectedText, calculateExpectedKeys])

  // 従来のhandleInput（後方互換性のため残す）
  const handleInput = useCallback(() => {
    // この関数は使用を推奨しない（厳密制御のためhandleKeyInputを使用）
    console.warn('handleInput is deprecated. Use handleKeyInput for strict input control.')
  }, [])

  // テストリセット
  const resetTest = useCallback(() => {
    setState(initialState)
    setResult(null)
    setElapsedTime(0)
  }, [])

  // テスト停止
  const stopTest = useCallback(() => {
    if (state.status === 'running' && state.selectedText && state.startTime) {
      const endTime = Date.now()
      
      setState(prev => ({
        ...prev,
        status: 'completed',
        endTime
      }))
    }
  }, [state.status, state.selectedText, state.startTime])

  // 結果計算（テスト完了時）
  useEffect(() => {
    if (state.status === 'completed' && state.selectedText && state.startTime && state.endTime) {
      const timeElapsed = (state.endTime - state.startTime) / 1000
      const totalCharacters = state.currentPosition
      const correctKeyStrokes = state.keyStrokes.filter(ks => ks.isCorrect).length
      const totalKeyStrokes = state.keyStrokes.length
      
      const enhancedResult: TypingResult = {
        wpm: Math.round((totalCharacters / 5) / (timeElapsed / 60)),
        cpm: Math.round(totalCharacters / (timeElapsed / 60)),
        accuracy: totalCharacters > 0 ? Math.round((totalCharacters / totalKeyStrokes) * 100) : 0,
        timeElapsed,
        totalCharacters,
        correctCharacters: totalCharacters,
        incorrectCharacters: totalKeyStrokes - correctKeyStrokes,
        totalKeyStrokes,
        errorCount: state.errors.length,
        keyStrokes: state.keyStrokes,
        errors: state.errors,
        averageSpeed: totalCharacters / timeElapsed,
        errorRate: totalKeyStrokes > 0 ? (state.errors.length / totalKeyStrokes) * 100 : 0
      }
      
      setResult(enhancedResult)
    }
  }, [state.status, state.selectedText, state.startTime, state.endTime, state.currentPosition, state.keyStrokes, state.errors])

  // テキスト選択
  const selectText = useCallback((selectedText: TypingText) => {
    const expectedKeys = calculateExpectedKeys(selectedText.content, 0, '')
    setState({
      ...initialState,
      selectedText,
      expectedKeys
    })
    setResult(null)
    setElapsedTime(0)
  }, [calculateExpectedKeys])

  // 現在の進捗率を計算
  const progress = state.selectedText 
    ? Math.round((state.currentPosition / state.selectedText.content.length) * 100)
    : 0

  // 現在のWPMをリアルタイムで計算
  const currentWPM = state.startTime && state.currentPosition > 0 && elapsedTime > 0
    ? Math.round((state.currentPosition / 5) / (elapsedTime / 60))
    : 0

  return {
    // 状態
    state,
    result,
    elapsedTime,
    progress,
    currentWPM,
    
    // アクション
    startTest,
    handleInput, // 非推奨
    handleKeyInput, // 推奨
    resetTest,
    stopTest,
    selectText
  }
} 