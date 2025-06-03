/**
 * カタカナをひらがなに変換する関数
 * @param str 変換する文字列
 * @returns ひらがなに変換された文字列
 */
export function katakanaToHiragana(str: string): string {
  return str.replace(/[\u30A1-\u30F6]/g, (match) => {
    const char = match.charCodeAt(0) - 0x60
    return String.fromCharCode(char)
  })
}

/**
 * ひらがなをカタカナに変換する関数
 * @param str 変換する文字列
 * @returns カタカナに変換された文字列
 */
export function hiraganaToKatakana(str: string): string {
  return str.replace(/[\u3041-\u3096]/g, (match) => {
    const char = match.charCodeAt(0) + 0x60
    return String.fromCharCode(char)
  })
}

/**
 * 検索クエリを正規化する関数（ひらがな・カタカナの区別をなくす）
 * @param query 検索クエリ
 * @returns 正規化されたクエリ
 */
export function normalizeSearchQuery(query: string): string {
  const lowercased = query.toLowerCase().trim()
  return katakanaToHiragana(lowercased)
}

/**
 * 文字列がひらがな・カタカナでマッチするかチェックする関数
 * @param text 対象文字列
 * @param query 検索クエリ
 * @returns マッチするかどうか
 */
export function matchesWithKanaConversion(text: string, query: string): boolean {
  const normalizedText = katakanaToHiragana(text.toLowerCase())
  const normalizedQuery = katakanaToHiragana(query.toLowerCase())
  
  // ひらがな変換後の文字列で検索
  if (normalizedText.includes(normalizedQuery)) {
    return true
  }
  
  // カタカナ変換後の文字列でも検索（元がひらがなの場合）
  const katakanaText = hiraganaToKatakana(text.toLowerCase())
  const katakanaQuery = hiraganaToKatakana(query.toLowerCase())
  
  return katakanaText.includes(katakanaQuery)
} 