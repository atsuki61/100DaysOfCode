import { CalendarDay, CalendarWeek, CalendarMonth } from '../types'
import { getEventsByDate } from '../data/events'

// 月の名前（日本語）
export const MONTH_NAMES = [
  '1月', '2月', '3月', '4月', '5月', '6月',
  '7月', '8月', '9月', '10月', '11月', '12月'
]

// 曜日名（日本語）
export const DAY_NAMES = ['日', '月', '火', '水', '木', '金', '土']

// 日付をYYYY-MM-DD形式にフォーマット
export const formatDateToString = (date: Date): string => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

// 今日の日付を取得
export const getToday = (): Date => {
  return new Date()
}

// 今日の日付文字列を取得
export const getTodayString = (): string => {
  return formatDateToString(getToday())
}

// 指定された日付が今日かどうか判定
export const isToday = (date: Date): boolean => {
  const today = getToday()
  return date.getFullYear() === today.getFullYear() &&
         date.getMonth() === today.getMonth() &&
         date.getDate() === today.getDate()
}

// 指定された日付が週末かどうか判定
export const isWeekend = (date: Date): boolean => {
  const dayOfWeek = date.getDay()
  return dayOfWeek === 0 || dayOfWeek === 6 // 日曜日または土曜日
}

// 月の最初の日を取得
export const getFirstDayOfMonth = (year: number, month: number): Date => {
  return new Date(year, month, 1)
}

// 月の最後の日を取得
export const getLastDayOfMonth = (year: number, month: number): Date => {
  return new Date(year, month + 1, 0)
}

// 月の日数を取得
export const getDaysInMonth = (year: number, month: number): number => {
  return getLastDayOfMonth(year, month).getDate()
}

// CalendarDayオブジェクトを生成
export const createCalendarDay = (
  date: Date,
  isCurrentMonth: boolean
): CalendarDay => {
  const dateString = formatDateToString(date)
  const events = getEventsByDate(dateString)

  return {
    date,
    day: date.getDate(),
    isCurrentMonth,
    isToday: isToday(date),
    isWeekend: isWeekend(date),
    events
  }
}

// カレンダーの週を生成
export const generateCalendarWeeks = (year: number, month: number): CalendarWeek[] => {
  const weeks: CalendarWeek[] = []
  const firstDay = getFirstDayOfMonth(year, month)
  const lastDay = getLastDayOfMonth(year, month)
  
  // 月の最初の週の開始日を計算（日曜日始まり）
  const startDate = new Date(firstDay)
  startDate.setDate(firstDay.getDate() - firstDay.getDay())
  
  // 月の最後の週の終了日を計算
  const endDate = new Date(lastDay)
  endDate.setDate(lastDay.getDate() + (6 - lastDay.getDay()))
  
  // 週ごとにカレンダーを生成
  const currentDate = new Date(startDate)
  
  while (currentDate <= endDate) {
    const week: CalendarWeek = { days: [] }
    
    // 1週間分の日付を生成
    for (let i = 0; i < 7; i++) {
      const isCurrentMonth = currentDate.getMonth() === month
      const calendarDay = createCalendarDay(new Date(currentDate), isCurrentMonth)
      week.days.push(calendarDay)
      
      // 次の日に進む
      currentDate.setDate(currentDate.getDate() + 1)
    }
    
    weeks.push(week)
  }
  
  return weeks
}

// CalendarMonthオブジェクトを生成
export const generateCalendarMonth = (year: number, month: number): CalendarMonth => {
  const weeks = generateCalendarWeeks(year, month)
  
  return {
    year,
    month,
    monthName: MONTH_NAMES[month],
    weeks
  }
}

// 前月を取得
export const getPreviousMonth = (year: number, month: number): { year: number, month: number } => {
  if (month === 0) {
    return { year: year - 1, month: 11 }
  }
  return { year, month: month - 1 }
}

// 次月を取得
export const getNextMonth = (year: number, month: number): { year: number, month: number } => {
  if (month === 11) {
    return { year: year + 1, month: 0 }
  }
  return { year, month: month + 1 }
}