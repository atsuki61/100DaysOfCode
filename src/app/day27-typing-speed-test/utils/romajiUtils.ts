// ローマ字マッピング（複数パターン対応）
export const ROMAJI_MAP: { [key: string]: string[] } = {
  'あ': ['a'],
  'い': ['i'],
  'う': ['u'],
  'え': ['e'],
  'お': ['o'],
  'か': ['ka'],
  'き': ['ki'],
  'く': ['ku'],
  'け': ['ke'],
  'こ': ['ko'],
  'が': ['ga'],
  'ぎ': ['gi'],
  'ぐ': ['gu'],
  'げ': ['ge'],
  'ご': ['go'],
  'さ': ['sa'],
  'し': ['si', 'shi'],
  'す': ['su'],
  'せ': ['se'],
  'そ': ['so'],
  'ざ': ['za'],
  'じ': ['zi', 'ji'],
  'ず': ['zu'],
  'ぜ': ['ze'],
  'ぞ': ['zo'],
  'た': ['ta'],
  'ち': ['ti', 'chi'],
  'つ': ['tu', 'tsu'],
  'て': ['te'],
  'と': ['to'],
  'だ': ['da'],
  'ぢ': ['di'],
  'づ': ['du'],
  'で': ['de'],
  'ど': ['do'],
  'な': ['na'],
  'に': ['ni'],
  'ぬ': ['nu'],
  'ね': ['ne'],
  'の': ['no'],
  'は': ['ha'],
  'ひ': ['hi'],
  'ふ': ['hu', 'fu'],
  'へ': ['he'],
  'ほ': ['ho'],
  'ば': ['ba'],
  'び': ['bi'],
  'ぶ': ['bu'],
  'べ': ['be'],
  'ぼ': ['bo'],
  'ぱ': ['pa'],
  'ぴ': ['pi'],
  'ぷ': ['pu'],
  'ぺ': ['pe'],
  'ぽ': ['po'],
  'ま': ['ma'],
  'み': ['mi'],
  'む': ['mu'],
  'め': ['me'],
  'も': ['mo'],
  'や': ['ya'],
  'ゆ': ['yu'],
  'よ': ['yo'],
  'ら': ['ra'],
  'り': ['ri'],
  'る': ['ru'],
  'れ': ['re'],
  'ろ': ['ro'],
  'わ': ['wa'],
  'ゐ': ['wi'],
  'ゑ': ['we'],
  'を': ['wo'],
  'ん': ['n', 'nn'],
  // 拗音
  'きゃ': ['kya'],
  'きゅ': ['kyu'],
  'きょ': ['kyo'],
  'しゃ': ['sya', 'sha'],
  'しゅ': ['syu', 'shu'],
  'しょ': ['syo', 'sho'],
  'ちゃ': ['tya', 'cha'],
  'ちゅ': ['tyu', 'chu'],
  'ちょ': ['tyo', 'cho'],
  'にゃ': ['nya'],
  'にゅ': ['nyu'],
  'にょ': ['nyo'],
  'ひゃ': ['hya'],
  'ひゅ': ['hyu'],
  'ひょ': ['hyo'],
  'みゃ': ['mya'],
  'みゅ': ['myu'],
  'みょ': ['myo'],
  'りゃ': ['rya'],
  'りゅ': ['ryu'],
  'りょ': ['ryo'],
  'ぎゃ': ['gya'],
  'ぎゅ': ['gyu'],
  'ぎょ': ['gyo'],
  'じゃ': ['zya', 'ja'],
  'じゅ': ['zyu', 'ju'],
  'じょ': ['zyo', 'jo'],
  'びゃ': ['bya'],
  'びゅ': ['byu'],
  'びょ': ['byo'],
  'ぴゃ': ['pya'],
  'ぴゅ': ['pyu'],
  'ぴょ': ['pyo'],
  // 小さいつ（促音）
  'っ': ['xtu', 'ltu'],
  // カタカナも対応
  'ア': ['a'],
  'イ': ['i'],
  'ウ': ['u'],
  'エ': ['e'],
  'オ': ['o'],
  // 記号・数字・英字はそのまま
  ' ': [' '],
  '。': ['.'],
  '、': [','],
  '！': ['!'],
  '？': ['?'],
  '「': ['['],
  '」': [']'],
}

// 英数字はそのまま通す
for (let i = 0; i <= 9; i++) {
  ROMAJI_MAP[i.toString()] = [i.toString()]
}
for (let i = 65; i <= 90; i++) {
  const char = String.fromCharCode(i)
  ROMAJI_MAP[char] = [char.toLowerCase()]
  ROMAJI_MAP[char.toLowerCase()] = [char.toLowerCase()]
}

/**
 * 文字列をローマ字に変換する
 * @param text 変換対象の文字列
 * @returns ローマ字変換結果の配列（複数パターン対応）
 */
export const convertToRomaji = (text: string): string[][] => {
  const result: string[][] = []
  let i = 0
  
  while (i < text.length) {
    let matched = false
    
    // 2文字の組み合わせから優先的にチェック（拗音など）
    if (i < text.length - 1) {
      const twoChar = text.slice(i, i + 2)
      if (ROMAJI_MAP[twoChar]) {
        result.push(ROMAJI_MAP[twoChar])
        i += 2
        matched = true
      }
    }
    
    // 1文字でチェック
    if (!matched) {
      const oneChar = text[i]
      if (ROMAJI_MAP[oneChar]) {
        result.push(ROMAJI_MAP[oneChar])
      } else {
        // マッピングにない文字はそのまま
        result.push([oneChar])
      }
      i += 1
    }
  }
  
  return result
}

/**
 * ローマ字パターンの全組み合わせを生成
 * @param romajiPatterns convertToRomajiの結果
 * @returns 可能なローマ字入力パターンの配列
 */
export const generateRomajiCombinations = (romajiPatterns: string[][]): string[] => {
  if (romajiPatterns.length === 0) return ['']
  
  const combinations: string[] = []
  
  const generate = (index: number, current: string) => {
    if (index === romajiPatterns.length) {
      combinations.push(current)
      return
    }
    
    for (const pattern of romajiPatterns[index]) {
      generate(index + 1, current + pattern)
    }
  }
  
  generate(0, '')
  return combinations
}

/**
 * 入力がローマ字として正しいかチェック
 * @param targetText 目標文字列
 * @param userInput ユーザー入力
 * @returns 正しい入力かどうかと、次に期待される文字
 */
export const validateRomajiInput = (targetText: string, userInput: string): {
  isValid: boolean
  isComplete: boolean
  expectedChars: string[]
  nextChar: string | null
} => {
  const romajiPatterns = convertToRomaji(targetText)
  const combinations = generateRomajiCombinations(romajiPatterns)
  
  // いずれかの組み合わせで入力が有効かチェック
  for (const combination of combinations) {
    if (combination.startsWith(userInput)) {
      const isComplete = combination === userInput
      const nextChar = isComplete ? null : combination[userInput.length]
      
      // 次に入力可能な文字を収集
      const expectedChars = combinations
        .filter(combo => combo.startsWith(userInput))
        .map(combo => combo[userInput.length])
        .filter(char => char !== undefined)
        .filter((char, index, self) => self.indexOf(char) === index) // 重複除去
      
      return {
        isValid: true,
        isComplete,
        expectedChars,
        nextChar
      }
    }
  }
  
  return {
    isValid: false,
    isComplete: false,
    expectedChars: [],
    nextChar: null
  }
}

/**
 * 文字が日本語かどうかを判定
 * @param char 判定する文字
 * @returns 日本語の場合true
 */
export const isJapanese = (char: string): boolean => {
  const code = char.charCodeAt(0)
  return (
    (code >= 0x3040 && code <= 0x309F) || // ひらがな
    (code >= 0x30A0 && code <= 0x30FF) || // カタカナ
    (code >= 0x4E00 && code <= 0x9FAF)    // 漢字
  )
}

/**
 * 促音（っ）の処理
 * @param text 対象文字列
 * @param position 現在位置
 * @returns 促音処理後の情報
 */
export const handleSokuon = (text: string, position: number): {
  isSokuon: boolean
  nextChar: string | null
  expectedInput: string[]
} => {
  if (text[position] === 'っ' && position < text.length - 1) {
    const nextChar = text[position + 1]
    const nextRomaji = ROMAJI_MAP[nextChar]
    
    if (nextRomaji && nextRomaji[0]) {
      const firstChar = nextRomaji[0][0]
      return {
        isSokuon: true,
        nextChar,
        expectedInput: [firstChar] // 促音は次の文字の最初の子音を重ねる
      }
    }
  }
  
  return {
    isSokuon: false,
    nextChar: null,
    expectedInput: []
  }
} 