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
}

export interface WordMeaning {
  partOfSpeech: string;
  definitions: string[];
}

// 検索状態の型
export type SearchStatus = 'idle' | 'loading' | 'success' | 'error';

export interface SearchState {
  status: SearchStatus;
  error?: string;
  lastSearchedWord?: string;
} 