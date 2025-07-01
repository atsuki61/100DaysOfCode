// 辞書APIのレスポンス型定義
export interface DictionaryResponse {// 辞書APIのレスポンス型
  word: string;// 単語
  phonetic?: string;// 発音
  phonetics: Phonetic[];// 発音のリスト
  meanings: Meaning[];// 意味のリスト
  license: License;// ライセンス
  sourceUrls: string[];// ソースURLのリスト
}

export interface Phonetic {// 発音の型
  text?: string;// 発音のテキスト
  audio?: string;// 発音の音声URL
  sourceUrl?: string;// 発音のソースURL
  license?: License;// ライセンス
}

export interface Meaning {// 意味の型
  partOfSpeech: string;// 品詞
  definitions: Definition[];// 定義のリスト
  synonyms?: string[];// 同義語のリスト
  antonyms?: string[];// 反義語のリスト
}

export interface Definition {// 定義の型
  definition: string;// 定義
  synonyms?: string[];// 同義語のリスト
  antonyms?: string[];// 反義語のリスト
  example?: string;// 例文
}

export interface License {// ライセンスの型
  name: string;// ライセンス名
  url: string;// ライセンスURL
}

// アプリケーション内で使用する型
export interface WordData {// 単語データの型
  word: string;// 単語
  phonetic: string;// 発音
  meanings: WordMeaning[];// 意味のリスト
  examples: string[];// 例文のリスト
  synonyms: string[];// 同義語のリスト
  antonyms: string[];// 反義語のリスト
  // 翻訳機能で追加される日本語フィールド
  japaneseMeanings?: WordMeaning[];// 日本語の意味のリスト
  japaneseExamples?: string[];// 日本語の例文のリスト
  japaneseSynonyms?: string[];// 日本語の同義語のリスト
  japaneseAntonyms?: string[];// 日本語の反義語のリスト
}

export interface WordMeaning {// 単語の意味の型
  partOfSpeech: string;// 品詞
  definitions: string[];// 定義のリスト
}

// 言語選択の型
export type Language = 'en' | 'ja';// 言語の型

// 翻訳状態の型
export type TranslationStatus = 'idle' | 'translating' | 'success' | 'error' | 'rate-limited';// 翻訳状態の型

export interface TranslationState {// 翻訳状態の型
  status: TranslationStatus;// 翻訳状態
  error?: string;// エラー
  isTranslated: boolean;// 翻訳済みかどうか
  rateLimitedUntil?: Date;// レート制限解除予定時刻
}

// 検索状態の型
export type SearchStatus = 'idle' | 'loading' | 'success' | 'error';// 検索状態の型

export interface SearchState {// 検索状態の型
  status: SearchStatus;// 検索状態
  error?: string;// エラー
  lastSearchedWord?: string;// 最後の検索語
} 