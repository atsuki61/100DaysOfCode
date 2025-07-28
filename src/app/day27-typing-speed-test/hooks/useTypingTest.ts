'use client'

import { useState, useEffect, useCallback } from 'react'
import { TypingState, TypingResult, TypingText } from '../types'
import { calculateTypingResult } from '../utils/typingUtils'

const initialState: TypingState = {
  status: 'idle',
  selectedText: null,
  userInput: '',
  currentIndex: 0,
  startTime: null,
  endTime: null,
  errors: []
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

  // テスト開始
  const startTest = useCallback((selectedText: TypingText) => {
    const startTime = Date.now()
    setState({
      ...initialState,
      status: 'running',
      selectedText,
      startTime
    })
    setResult(null)
    setElapsedTime(0)
  }, [])

  // ユーザー入力処理
  const handleInput = useCallback((input: string) => {
    if (state.status !== 'running' || !state.selectedText) return

    // 最初の文字入力で開始時間を記録（まだ記録されていない場合）
    if (!state.startTime) {
      const startTime = Date.now()
      setState(prev => ({
        ...prev,
        startTime,
        userInput: input,
        currentIndex: input.length
      }))
      return
    }

    // 入力が課題文章の長さを超えた場合、テスト完了
    if (input.length >= state.selectedText.content.length) {
      const endTime = Date.now()
      const finalResult = calculateTypingResult(
        state.selectedText.content,
        input,
        state.startTime,
        endTime
      )
      
      setState(prev => ({
        ...prev,
        status: 'completed',
        userInput: input,
        currentIndex: input.length,
        endTime
      }))
      setResult(finalResult)
    } else {
      // 通常の入力処理
      setState(prev => ({
        ...prev,
        userInput: input,
        currentIndex: input.length,
        // エラーのインデックスを記録
        errors: input.split('').reduce((errors: number[], char, index) => {
          if (char !== state.selectedText!.content[index]) {
            errors.push(index)
          }
          return errors
        }, [])
      }))
    }
  }, [state.status, state.selectedText, state.startTime])

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
      const finalResult = calculateTypingResult(
        state.selectedText.content,
        state.userInput,
        state.startTime,
        endTime
      )
      
      setState(prev => ({
        ...prev,
        status: 'completed',
        endTime
      }))
      setResult(finalResult)
    }
  }, [state.status, state.selectedText, state.startTime, state.userInput])

  // 現在の進捗率を計算
  const progress = state.selectedText 
    ? Math.round((state.userInput.length / state.selectedText.content.length) * 100)
    : 0

  // 現在のWPMをリアルタイムで計算
  const currentWPM = state.startTime && state.userInput.length > 0 && elapsedTime > 0
    ? Math.round((state.userInput.length / 5) / (elapsedTime / 60))
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
    handleInput,
    resetTest,
    stopTest
  }
} 