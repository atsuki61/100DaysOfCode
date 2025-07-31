'use client'

import { useState, useMemo } from 'react'
import { CalendarMonth } from '../types'
import { 
  generateCalendarMonth, 
  getPreviousMonth, 
  getNextMonth, 
  getToday 
} from '../utils/calendarUtils'

export function useCalendar() {
  const today = getToday()
  const [currentYear, setCurrentYear] = useState(today.getFullYear())
  const [currentMonth, setCurrentMonth] = useState(today.getMonth())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [isEventModalOpen, setIsEventModalOpen] = useState(false)

  // カレンダー月データを生成
  const calendarMonth: CalendarMonth = useMemo(() => {
    return generateCalendarMonth(currentYear, currentMonth)
  }, [currentYear, currentMonth])

  // 選択された日のイベント
  const selectedDateEvents = useMemo(() => {
    if (!selectedDate) return []
    
    return calendarMonth.weeks
      .flatMap(week => week.days)
      .find(day => day.date.getTime() === selectedDate.getTime())?.events || []
  }, [selectedDate, calendarMonth])

  // 前月に移動
  const goToPreviousMonth = () => {
    const { year, month } = getPreviousMonth(currentYear, currentMonth)
    setCurrentYear(year)
    setCurrentMonth(month)
  }

  // 次月に移動
  const goToNextMonth = () => {
    const { year, month } = getNextMonth(currentYear, currentMonth)
    setCurrentYear(year)
    setCurrentMonth(month)
  }

  // 今日に移動
  const goToToday = () => {
    const today = getToday()
    setCurrentYear(today.getFullYear())
    setCurrentMonth(today.getMonth())
  }

  // 日付をクリック
  const handleDateClick = (date: Date) => {
    setSelectedDate(date)
    setIsEventModalOpen(true)
  }

  // イベントモーダルを閉じる
  const closeEventModal = () => {
    setIsEventModalOpen(false)
    setSelectedDate(null)
  }

  return {
    // State
    currentYear,
    currentMonth,
    selectedDate,
    isEventModalOpen,
    
    // Computed
    calendarMonth,
    selectedDateEvents,
    
    // Actions
    goToPreviousMonth,
    goToNextMonth,
    goToToday,
    handleDateClick,
    closeEventModal
  }
}