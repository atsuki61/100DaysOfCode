export interface Holiday {
  date: string // YYYY-MM-DD format
  name: string
  description?: string
}

export const japaneseHolidays: Holiday[] = [
  // 1月
  { date: '2025-01-01', name: '元日', description: '新しい年の始まり' },
  { date: '2025-01-13', name: '成人の日', description: '成人を祝う日' },
  
  // 2月
  { date: '2025-02-11', name: '建国記念の日', description: '日本の建国を記念する日' },
  { date: '2025-02-23', name: '天皇誕生日', description: '天皇陛下の誕生日' },
  
  // 3月
  { date: '2025-03-20', name: '春分の日', description: '春の訪れを告げる日' },
  
  // 4月
  { date: '2025-04-29', name: '昭和の日', description: '昭和天皇の誕生日' },
  
  // 5月
  { date: '2025-05-03', name: '憲法記念日', description: '日本国憲法の施行を記念' },
  { date: '2025-05-04', name: 'みどりの日', description: '自然に親しむ日' },
  { date: '2025-05-05', name: 'こどもの日', description: '子どもの健やかな成長を願う日' },
  { date: '2025-05-06', name: '振替休日', description: 'こどもの日の振替休日' },
  
  // 7月
  { date: '2025-07-21', name: '海の日', description: '海の恩恵に感謝する日' },
  
  // 8月
  { date: '2025-08-11', name: '山の日', description: '山に親しむ機会を得て、山の恩恵に感謝する日' },
  
  // 9月
  { date: '2025-09-15', name: '敬老の日', description: '老人を敬愛し、長寿を祝う日' },
  { date: '2025-09-23', name: '秋分の日', description: '秋の訪れを告げる日' },
  
  // 10月
  { date: '2025-10-13', name: 'スポーツの日', description: 'スポーツを楽しみ、他者を尊重する精神を培う日' },
  
  // 11月
  { date: '2025-11-03', name: '文化の日', description: '自由と平和を愛し、文化をすすめる日' },
  { date: '2025-11-23', name: '勤労感謝の日', description: '勤労をたっとび、生産を祝い、国民がたがいに感謝しあう日' },
  
  // 12月
  { date: '2025-12-23', name: '天皇誕生日', description: '天皇陛下の誕生日' }
]

export const getHolidayByDate = (date: string): Holiday | undefined => {
  return japaneseHolidays.find(holiday => holiday.date === date)
}

export const getHolidaysByMonth = (year: number, month: number): Holiday[] => {
  const monthStr = String(month + 1).padStart(2, '0')
  const yearMonth = `${year}-${monthStr}`
  return japaneseHolidays.filter(holiday => holiday.date.startsWith(yearMonth))
} 