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
    title: 'ひらがな練習',
    content: 'こんにちは。今日はとても良い天気ですね。タイピングの練習を頑張りましょう。継続は力なりです。',
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
    title: 'ことわざ',
    content: '継続は力なり。千里の道も一歩から。石の上にも三年。努力は必ず報われる。諦めない心が大切です。',
    difficulty: 'easy'
  },
  {
    id: '8',
    title: '長文英語',
    content: 'In the world of technology, continuous learning is essential for growth. Programming requires patience, practice, and persistence. Every developer must embrace the mindset of lifelong learning.',
    difficulty: 'medium'
  }
]

// 難易度別の文章を取得する関数
export const getTextsByDifficulty = (difficulty: TypingText['difficulty']): TypingText[] => {
  return typingTexts.filter(text => text.difficulty === difficulty)
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