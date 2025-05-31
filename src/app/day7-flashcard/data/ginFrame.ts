import { WordCard } from '../types'

// 銀フレの単語データ - 基礎の400語（1-400）
export const basicWords: WordCard[] = [
  { id: 1, word: 'begin', meaning: '始まる、始める', pronunciation: '/bɪˈɡɪn/', example: 'The meeting will begin at 9 AM.', category: '基礎の400語', learningStatus: 'not_studied' },
  { id: 2, word: 'work', meaning: '働く、仕事', pronunciation: '/wɜːrk/', example: 'I work at a technology company.', category: '基礎の400語', learningStatus: 'not_studied' },
  { id: 3, word: 'company', meaning: '会社', pronunciation: '/ˈkʌmpəni/', example: 'Our company has 500 employees.', category: '基礎の400語', learningStatus: 'not_studied' },
  { id: 4, word: 'order', meaning: '注文、命令', pronunciation: '/ˈɔːrdər/', example: 'I need to place an order for office supplies.', category: '基礎の400語', learningStatus: 'not_studied' },
  { id: 5, word: 'employee', meaning: '従業員', pronunciation: '/ɪmˈplɔɪiː/', example: 'Every employee receives health benefits.', category: '基礎の400語', learningStatus: 'not_studied' },
  { id: 6, word: 'information', meaning: '情報', pronunciation: '/ˌɪnfərˈmeɪʃn/', example: 'Please provide more information about the project.', category: '基礎の400語', learningStatus: 'not_studied' },
  { id: 7, word: 'receive', meaning: '受け取る', pronunciation: '/rɪˈsiːv/', example: 'Did you receive my email yesterday?', category: '基礎の400語', learningStatus: 'not_studied' },
  { id: 8, word: 'last', meaning: '最後の、続く', pronunciation: '/læst/', example: 'The conference will last three days.', category: '基礎の400語', learningStatus: 'not_studied' },
  { id: 9, word: 'need', meaning: '必要とする', pronunciation: '/niːd/', example: 'We need to finish this by Friday.', category: '基礎の400語', learningStatus: 'not_studied' },
  { id: 10, word: 'travel', meaning: '旅行する', pronunciation: '/ˈtrævl/', example: 'Business travel can be exhausting.', category: '基礎の400語', learningStatus: 'not_studied' },
  { id: 11, word: 'job', meaning: '仕事', pronunciation: '/dʒɑːb/', example: 'She got a new job at the bank.', category: '基礎の400語', learningStatus: 'not_studied' },
  { id: 12, word: 'find', meaning: '見つける', pronunciation: '/faɪnd/', example: 'Can you find the sales report?', category: '基礎の400語', learningStatus: 'not_studied' },
  { id: 13, word: 'department', meaning: '部署', pronunciation: '/dɪˈpɑːrtmənt/', example: 'Which department do you work in?', category: '基礎の400語', learningStatus: 'not_studied' },
  { id: 14, word: 'let', meaning: 'させる、許可する', pronunciation: '/let/', example: 'Let me know when you arrive.', category: '基礎の400語', learningStatus: 'not_studied' },
  { id: 15, word: 'visit', meaning: '訪問する', pronunciation: '/ˈvɪzɪt/', example: 'We will visit the factory next week.', category: '基礎の400語', learningStatus: 'not_studied' },
  { id: 16, word: 'also', meaning: 'また、同様に', pronunciation: '/ˈɔːlsoʊ/', example: 'We also need to review the budget.', category: '基礎の400語', learningStatus: 'not_studied' },
  { id: 17, word: 'sure', meaning: '確信して', pronunciation: '/ʃʊr/', example: 'Are you sure about the deadline?', category: '基礎の400語', learningStatus: 'not_studied' },
  { id: 18, word: 'leave', meaning: '去る、残す', pronunciation: '/liːv/', example: 'Please leave your contact information.', category: '基礎の400語', learningStatus: 'not_studied' },
  { id: 19, word: 'sales', meaning: '販売、売上', pronunciation: '/seɪlz/', example: 'Sales increased by 15% this quarter.', category: '基礎の400語', learningStatus: 'not_studied' },
  { id: 20, word: 'move', meaning: '動く、移動する', pronunciation: '/muːv/', example: 'We need to move quickly on this project.', category: '基礎の400語', learningStatus: 'not_studied' }
]

// 頻出の300語（401-700）
export const frequentWords: WordCard[] = [
  { id: 401, word: 'achieve', meaning: '達成する', pronunciation: '/əˈtʃiːv/', example: 'We achieved our sales target this year.', category: '頻出の300語', learningStatus: 'not_studied' },
  { id: 402, word: 'advertising', meaning: '広告', pronunciation: '/ˈædvərtaɪzɪŋ/', example: 'Our advertising budget was increased.', category: '頻出の300語', learningStatus: 'not_studied' },
  { id: 403, word: 'advice', meaning: 'アドバイス', pronunciation: '/ədˈvaɪs/', example: 'Thank you for your valuable advice.', category: '頻出の300語', learningStatus: 'not_studied' },
  { id: 404, word: 'announce', meaning: '発表する', pronunciation: '/əˈnaʊns/', example: 'The CEO will announce the merger tomorrow.', category: '頻出の300語', learningStatus: 'not_studied' },
  { id: 405, word: 'application', meaning: '申し込み、応用', pronunciation: '/ˌæplɪˈkeɪʃn/', example: 'Please submit your application by Friday.', category: '頻出の300語', learningStatus: 'not_studied' }
]

// 必須の200語（701-900）
export const essentialWords: WordCard[] = [
  { id: 701, word: 'forecast', meaning: '予測する', pronunciation: '/ˈfɔːrkæst/', example: 'The weather forecast predicts rain.', category: '必須の200語', learningStatus: 'not_studied' },
  { id: 702, word: 'generous', meaning: '寛大な', pronunciation: '/ˈdʒenərəs/', example: 'The company offers generous benefits.', category: '必須の200語', learningStatus: 'not_studied' },
  { id: 703, word: 'involved', meaning: '関与した', pronunciation: '/ɪnˈvɑːlvd/', example: 'Everyone involved in the project worked hard.', category: '必須の200語', learningStatus: 'not_studied' },
  { id: 704, word: 'shortly', meaning: 'まもなく', pronunciation: '/ˈʃɔːrtli/', example: 'The meeting will start shortly.', category: '必須の200語', learningStatus: 'not_studied' },
  { id: 705, word: 'economic', meaning: '経済の', pronunciation: '/ˌiːkəˈnɑːmɪk/', example: 'Economic conditions are improving.', category: '必須の200語', learningStatus: 'not_studied' }
]

// 発展の100語（901-1000）
export const advancedWords: WordCard[] = [
  { id: 901, word: 'acquire', meaning: '取得する', pronunciation: '/əˈkwaɪər/', example: 'The company plans to acquire new technology.', category: '発展の100語', learningStatus: 'not_studied' },
  { id: 902, word: 'adequate', meaning: '適切な、十分な', pronunciation: '/ˈædɪkwət/', example: 'We need adequate funding for this project.', category: '発展の100語', learningStatus: 'not_studied' },
  { id: 903, word: 'awareness', meaning: '認識、意識', pronunciation: '/əˈwernəs/', example: 'Brand awareness has increased significantly.', category: '発展の100語', learningStatus: 'not_studied' },
  { id: 904, word: 'comprehensive', meaning: '包括的な', pronunciation: '/ˌkɑːmprɪˈhensɪv/', example: 'We need a comprehensive business plan.', category: '発展の100語', learningStatus: 'not_studied' },
  { id: 905, word: 'eliminate', meaning: '排除する', pronunciation: '/ɪˈlɪməneɪt/', example: 'We must eliminate unnecessary expenses.', category: '発展の100語', learningStatus: 'not_studied' }
]

// Supplement 1: 設問に出る単語・表現
export const questionWords: WordCard[] = [
  { id: 1001, word: 'according to', meaning: '〜によると', pronunciation: '/əˈkɔːrdɪŋ tuː/', example: 'According to the report, sales are up.', category: '設問に出る単語・表現', learningStatus: 'not_studied' },
  { id: 1002, word: 'advise', meaning: '助言する', pronunciation: '/ədˈvaɪz/', example: 'I advise you to read the contract carefully.', category: '設問に出る単語・表現', learningStatus: 'not_studied' },
  { id: 1003, word: 'belong', meaning: '属する', pronunciation: '/bɪˈlɔːŋ/', example: 'This equipment belongs to the IT department.', category: '設問に出る単語・表現', learningStatus: 'not_studied' },
  { id: 1004, word: 'caller', meaning: '電話をかけた人', pronunciation: '/ˈkɔːlər/', example: 'The caller left a message about the meeting.', category: '設問に出る単語・表現', learningStatus: 'not_studied' },
  { id: 1005, word: 'concerned', meaning: '関係する、心配な', pronunciation: '/kənˈsɜːrnd/', example: 'As far as the budget is concerned, we are on track.', category: '設問に出る単語・表現', learningStatus: 'not_studied' }
]

// Supplement 2: パート1重要語50
export const part1Words: WordCard[] = [
  { id: 1101, word: 'construction', meaning: '建設', pronunciation: '/kənˈstrʌkʃn/', example: 'Construction work is ongoing.', category: 'パート1重要語', learningStatus: 'not_studied' },
  { id: 1102, word: 'equipment', meaning: '設備、機器', pronunciation: '/ɪˈkwɪpmənt/', example: 'The equipment needs regular maintenance.', category: 'パート1重要語', learningStatus: 'not_studied' },
  { id: 1103, word: 'maintenance', meaning: '保守、整備', pronunciation: '/ˈmeɪntənəns/', example: 'Regular maintenance prevents breakdowns.', category: 'パート1重要語', learningStatus: 'not_studied' },
  { id: 1104, word: 'vehicle', meaning: '車両', pronunciation: '/ˈviːəkl/', example: 'Company vehicles are parked outside.', category: 'パート1重要語', learningStatus: 'not_studied' },
  { id: 1105, word: 'pedestrian', meaning: '歩行者', pronunciation: '/pəˈdestriən/', example: 'Pedestrians must use the crosswalk.', category: 'パート1重要語', learningStatus: 'not_studied' }
]

// 全ての単語を統合
export const allGinFrameWords: WordCard[] = [
  ...basicWords,
  ...frequentWords,
  ...essentialWords,
  ...advancedWords,
  ...questionWords,
  ...part1Words
]

// カテゴリ別の単語セット
export const ginFrameCategories = {
  basic: basicWords,
  frequent: frequentWords,
  essential: essentialWords,
  advanced: advancedWords,
  questions: questionWords,
  part1: part1Words
}

// 統計情報
export const ginFrameStats = {
  totalWords: allGinFrameWords.length,
  basicCount: basicWords.length,
  frequentCount: frequentWords.length,
  essentialCount: essentialWords.length,
  advancedCount: advancedWords.length,
  supplementCount: questionWords.length + part1Words.length
} 