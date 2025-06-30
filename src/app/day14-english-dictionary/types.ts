// 辞書APIのレスポンス型定義
export interface DictionaryResponse {
  word: string;
  phonetic?: string;
  phonetics: Phonetic[];
  meanings: Meaning[];
  license: License;
  sourceUrls: string[];
}

export interface Phonetic {
  text?: string;
  audio?: string;
  sourceUrl?: string;
  license?: License;
}

export interface Meaning {
  partOfSpeech: string;
  definitions: Definition[];
  synonyms?: string[];
  antonyms?: string[];
}

export interface Definition {
  definition: string;
  synonyms?: string[];
  antonyms?: string[];
  example?: string;
}

export interface License {
  name: string;
  url: string;
}

// アプリケーション内で使用する型
export interface WordData {
  word: string;
  phonetic: string;
  meanings: WordMeaning[];
  examples: string[];
  synonyms: string[];
  antonyms: string[];
  // 翻訳機能で追加される日本語フィールド
  japaneseMeanings?: WordMeaning[];
  japaneseExamples?: string[];
  japaneseSynonyms?: string[];
  japaneseAntonyms?: string[];
}

export interface WordMeaning {
  partOfSpeech: string;
  definitions: string[];
}

// 言語選択の型
export type Language = 'en' | 'ja';

// 翻訳状態の型
export type TranslationStatus = 'idle' | 'translating' | 'success' | 'error';

export interface TranslationState {
  status: TranslationStatus;
  error?: string;
  isTranslated: boolean;
}

// 検索状態の型
export type SearchStatus = 'idle' | 'loading' | 'success' | 'error';

export interface SearchState {
  status: SearchStatus;
  error?: string;
  lastSearchedWord?: string;
} 