import { CalendarEvent } from '../types'

export const calendarEvents: CalendarEvent[] = [
  {
    id: '1',
    title: '新年',
    date: '2025-01-01',
    category: 'holiday',
    color: 'bg-red-500',
    description: '新しい年の始まり'
  },
  {
    id: '2', 
    title: '成人の日',
    date: '2025-01-13',
    category: 'holiday',
    color: 'bg-red-500',
    description: '成人を祝う日'
  },
  {
    id: '3',
    title: '建国記念の日',
    date: '2025-02-11',
    category: 'holiday',
    color: 'bg-red-500',
    description: '日本の建国を記念する日'
  },
  {
    id: '4',
    title: '天皇誕生日',
    date: '2025-02-23',
    category: 'holiday',
    color: 'bg-red-500',
    description: '天皇陛下の誕生日'
  },
  {
    id: '5',
    title: '春分の日',
    date: '2025-03-20',
    category: 'holiday',
    color: 'bg-red-500',
    description: '春の訪れを告げる日'
  },
  {
    id: '6',
    title: '昭和の日',
    date: '2025-04-29',
    category: 'holiday',
    color: 'bg-red-500',
    description: '昭和天皇の誕生日'
  },
  {
    id: '7',
    title: '憲法記念日',
    date: '2025-05-03',
    category: 'holiday',
    color: 'bg-red-500',
    description: '日本国憲法の施行を記念'
  },
  {
    id: '8',
    title: 'みどりの日',
    date: '2025-05-04',
    category: 'holiday',
    color: 'bg-green-500',
    description: '自然に親しむ日'
  },
  {
    id: '9',
    title: 'こどもの日',
    date: '2025-05-05',
    category: 'holiday',
    color: 'bg-blue-500',
    description: '子どもの健やかな成長を願う日'
  },
  {
    id: '10',
    title: 'プロジェクト会議',
    date: '2025-01-15',
    category: 'work',
    color: 'bg-purple-500',
    description: '月次プロジェクト進捗会議'
  },
  {
    id: '11',
    title: 'チーム食事会',
    date: '2025-01-20',
    category: 'work',
    color: 'bg-orange-500',
    description: 'チームビルディング'
  },
  {
    id: '12',
    title: '友人の誕生日',
    date: '2025-01-25',
    category: 'personal',
    color: 'bg-pink-500',
    description: '大切な友人の誕生日'
  },
  {
    id: '13',
    title: '歯医者の予約',
    date: '2025-02-05',
    category: 'reminder',
    color: 'bg-yellow-500',
    description: '定期検診'
  },
  {
    id: '14',
    title: 'ジムの更新',
    date: '2025-02-15',
    category: 'reminder',
    color: 'bg-yellow-500',
    description: 'ジム会員更新手続き'
  },
  {
    id: '15',
    title: '旅行計画会議',
    date: '2025-03-01',
    category: 'personal',
    color: 'bg-indigo-500',
    description: '春の旅行プラン相談'
  },
  {
    id: '16',
    title: '確定申告',
    date: '2025-03-15',
    category: 'reminder',
    color: 'bg-yellow-500',
    description: '税務申告期限前'
  }
]

export const getEventsByDate = (date: string): CalendarEvent[] => {
  return calendarEvents.filter(event => event.date === date)
}

export const getEventsByMonth = (year: number, month: number): CalendarEvent[] => {
  const monthStr = String(month + 1).padStart(2, '0')
  const yearMonth = `${year}-${monthStr}`
  return calendarEvents.filter(event => event.date.startsWith(yearMonth))
}

export const getEventCategories = (): string[] => {
  const categories = calendarEvents.map(event => event.category)
  return [...new Set(categories)]
}