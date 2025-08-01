import { SampleText } from '../types';

export const sampleTexts: SampleText[] = [
  {
    id: 'easy-1',
    title: '基本的な文章',
    text: 'The quick brown fox jumps over the lazy dog. This is a simple sentence that contains every letter of the alphabet.',
    difficulty: 'easy',
    category: '英語基本',
  },
  {
    id: 'easy-2',
    title: '日常会話',
    text: 'Hello, how are you today? I am doing well, thank you for asking. What would you like to do this afternoon?',
    difficulty: 'easy',
    category: '英語基本',
  },
  {
    id: 'medium-1',
    title: 'プログラミング',
    text: 'function calculateSum(a, b) { return a + b; } const result = calculateSum(10, 20); console.log(result);',
    difficulty: 'medium',
    category: 'プログラミング',
  },
  {
    id: 'medium-2',
    title: '技術文書',
    text: 'React is a JavaScript library for building user interfaces. It allows developers to create reusable UI components.',
    difficulty: 'medium',
    category: '技術',
  },
  {
    id: 'hard-1',
    title: '複雑なコード',
    text: 'const users = await fetch("/api/users").then(res => res.json()); const sortedUsers = users.sort((a, b) => a.name.localeCompare(b.name));',
    difficulty: 'hard',
    category: 'プログラミング',
  },
  {
    id: 'hard-2',
    title: '専門用語',
    text: 'Asynchronous programming enables non-blocking operations, improving application performance and user experience significantly.',
    difficulty: 'hard',
    category: '技術',
  },
  {
    id: 'japanese-1',
    title: '日本語基本',
    text: 'こんにちは、今日はいい天気ですね。タイピングの練習をしています。がんばって正確に入力しましょう。',
    difficulty: 'medium',
    category: '日本語',
  },
  {
    id: 'japanese-2',
    title: '日本語技術',
    text: 'Reactは、ユーザーインターフェースを構築するためのJavaScriptライブラリです。コンポーネントベースの開発が可能です。',
    difficulty: 'hard',
    category: '日本語技術',
  },
];

/**
 * 難易度でサンプルテキストをフィルタリング
 * @param difficulty 難易度
 * @returns フィルタリングされたサンプルテキスト
 */
export function getTextsByDifficulty(difficulty: 'easy' | 'medium' | 'hard'): SampleText[] {
  return sampleTexts.filter(text => text.difficulty === difficulty);
}

/**
 * カテゴリでサンプルテキストをフィルタリング
 * @param category カテゴリ
 * @returns フィルタリングされたサンプルテキスト
 */
export function getTextsByCategory(category: string): SampleText[] {
  return sampleTexts.filter(text => text.category === category);
}

/**
 * IDでサンプルテキストを取得
 * @param id テキストID
 * @returns サンプルテキスト（見つからない場合はundefined）
 */
export function getTextById(id: string): SampleText | undefined {
  return sampleTexts.find(text => text.id === id);
}

/**
 * ランダムにサンプルテキストを取得
 * @param difficulty 難易度（省略時は全て）
 * @returns ランダムなサンプルテキスト
 */
export function getRandomText(difficulty?: 'easy' | 'medium' | 'hard'): SampleText {
  const texts = difficulty ? getTextsByDifficulty(difficulty) : sampleTexts;
  const randomIndex = Math.floor(Math.random() * texts.length);
  return texts[randomIndex];
}

/**
 * 利用可能なカテゴリ一覧を取得
 * @returns カテゴリ配列
 */
export function getCategories(): string[] {
  const categories = new Set(sampleTexts.map(text => text.category));
  return Array.from(categories);
}