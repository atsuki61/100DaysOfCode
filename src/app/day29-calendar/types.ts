export interface CalendarEvent {
  id: string
  title: string
  date: string // YYYY-MM-DD format
  category: 'work' | 'personal' | 'holiday' | 'reminder'
  color: string
  description?: string
}

export interface CalendarDay {
  date: Date
  day: number
  isCurrentMonth: boolean
  isToday: boolean
  isWeekend: boolean
  events: CalendarEvent[]
}

export interface CalendarWeek {
  days: CalendarDay[]
}

export interface CalendarMonth {
  year: number
  month: number // 0-11 (JavaScript Date format)
  monthName: string
  weeks: CalendarWeek[]
}