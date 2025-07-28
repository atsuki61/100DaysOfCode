import { TypingText } from '../types'

export const typingTexts: TypingText[] = [
  {
    id: '1',
    title: '基本練習（英語）',
    content: 'The quick brown fox jumps over the lazy dog. This sentence contains every letter of the alphabet.',
    difficulty: 'easy'
  },
  {
    id: '2', 
    title: 'プログラミング用語',
    content: 'function useState() { return [state, setState]; } const handleClick = (event) => { console.log("Hello World"); };',
    difficulty: 'medium'
  },
  {
    id: '3',
    title: 'ひらがな練習（基本）',
    content: 'あいうえお かきくけこ さしすせそ たちつてと なにぬねの はひふへほ まみむめも やゆよ らりるれろ わをん',
    difficulty: 'easy'
  },
  {
    id: '4',
    title: '技術文書',
    content: 'React.useEffect(() => { document.title = "Typing Speed Test"; }, []); TypeScript provides static type checking.',
    difficulty: 'hard'
  },
  {
    id: '5',
    title: '日本語（混合）',
    content: 'WebアプリケーションはHTML, CSS, JavaScriptで作成されます。Next.jsはReactのフレームワークです。',
    difficulty: 'medium'
  },
  {
    id: '6',
    title: '英数記号混合',
    content: 'API_KEY="abc123"; const response = await fetch("/api/data"); if (response.ok) { return response.json(); }',
    difficulty: 'hard'
  },
  {
    id: '7',
    title: 'ことわざ（ひらがな）',
    content: 'けいぞくはちからなり。せんりのみちもいっぽから。いしのうえにもさんねん。どりょくはかならずむくわれる。',
    difficulty: 'easy'
  },
  {
    id: '8',
    title: '長文英語',
    content: 'In the world of technology, continuous learning is essential for growth. Programming requires patience, practice, and persistence. Every developer must embrace the mindset of lifelong learning.',
    difficulty: 'medium'
  },
  {
    id: '9',
    title: 'ひらがな文章（日常）',
    content: 'きょうはとてもいいてんきですね。あさからはれていて、きもちがよいです。こうえんでさんぽをしたいとおもいます。',
    difficulty: 'easy'
  },
  {
    id: '10',
    title: '拗音練習（きゃきゅきょ）',
    content: 'きゃく きゅうり きょうしつ しゃしん しゅっぱつ しょうがっこう ちゃいろ ちゅうい ちょうし にゃんこ',
    difficulty: 'medium'
  },
  {
    id: '11',
    title: '促音練習（っ）',
    content: 'がっこう きっぷ さっか とっきゅう はっぴょう ぶっか まっしろ やっぱり らっぱ',
    difficulty: 'medium'
  },
  {
    id: '12',
    title: 'プログラミング（ひらがな説明）',
    content: 'ぷろぐらみんぐはろんりてきなしこうりょくをようきゅうします。もんだいをしょうさいにぶんかつし、ひとつずつかいけつしていきます。',
    difficulty: 'hard'
  },
  {
    id: '13',
    title: 'タイピング説明（ひらがな）',
    content: 'たいぴんぐれんしゅうはけいぞくがたいせつです。まいにちすこしずつでもれんしゅうすれば、かならずじょうたつします。',
    difficulty: 'medium'
  },
  {
    id: '14',
    title: 'ビジネス用語（ひらがな）',
    content: 'かいぎ けいかく ほうこく しりょう ぷれぜんてーしょん ちーむわーく こらぼれーしょん いのべーしょん',
    difficulty: 'medium'
  },
  {
    id: '15',
    title: '季節の表現（ひらがな）',
    content: 'はるにはさくらがさき、なつにはひまわりがさいて、あきにはもみじがあかくなり、ふゆにはゆきがふります。',
    difficulty: 'medium'
  },
  {
    id: '16',
    title: '数字とひらがな混合',
    content: 'いち に さん し ご ろく なな はち きゅう じゅう 10 20 30 100 1000',
    difficulty: 'easy'
  },
  {
    id: '17',
    title: '複雑なローマ字（上級）',
    content: 'きょうしつ しゅっちょう ちょうちょう じゅぎょう りょこう ひゃくねん びょういん みょうじ',
    difficulty: 'hard'
  },
  {
    id: '18',
    title: 'カタカナ練習',
    content: 'アプリケーション データベース インターネット コンピューター プログラミング',
    difficulty: 'medium'
  },
  {
    id: '19',
    title: '実用的な文章（ひらがな）',
    content: 'でんしゃのじかんをしらべて、えきまでいきます。きっぷをかって、ほーむでまちます。でんしゃがきたら、のります。',
    difficulty: 'medium'
  },
  {
    id: '20',
    title: '技術用語（ひらがな）',
    content: 'あるごりずむ でーたこうぞう おぶじぇくとしこう かんすうがたぷろぐらみんぐ ばーじょんかんり',
    difficulty: 'hard'
  }
]

// 難易度別の文章を取得する関数
export const getTextsByDifficulty = (difficulty: TypingText['difficulty']): TypingText[] => {
  return typingTexts.filter(text => text.difficulty === difficulty)
}

// 日本語文章のみを取得する関数
export const getJapaneseTexts = (): TypingText[] => {
  return typingTexts.filter(text => 
    text.content.match(/[ひらがなカタカナ]/) || 
    text.title.includes('ひらがな') || 
    text.title.includes('カタカナ') ||
    text.title.includes('日本語')
  )
}

// 英語文章のみを取得する関数
export const getEnglishTexts = (): TypingText[] => {
  return typingTexts.filter(text => 
    !text.content.match(/[ひらがなカタカナ漢字]/) &&
    !text.title.includes('ひらがな') &&
    !text.title.includes('カタカナ') &&
    !text.title.includes('日本語')
  )
}

// ローマ字練習向けの文章を取得する関数
export const getRomajiPracticeTexts = (): TypingText[] => {
  return typingTexts.filter(text => 
    text.title.includes('ひらがな') ||
    text.title.includes('拗音') ||
    text.title.includes('促音') ||
    text.id === '3' || text.id === '7' || text.id === '9' ||
    text.id === '10' || text.id === '11' || text.id === '12'
  )
}

// ランダムな文章を取得する関数
export const getRandomText = (): TypingText => {
  const randomIndex = Math.floor(Math.random() * typingTexts.length)
  return typingTexts[randomIndex]
}

// 特定のIDの文章を取得する関数
export const getTextById = (id: string): TypingText | undefined => {
  return typingTexts.find(text => text.id === id)
} 