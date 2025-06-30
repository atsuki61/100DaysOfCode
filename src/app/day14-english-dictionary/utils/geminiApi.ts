import { WordData } from '../types';

// Gemini APIのベースURL
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent';

// APIキーを取得（環境変数から）
const getApiKey = (): string => {
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('Gemini APIキーが設定されていません。NEXT_PUBLIC_GEMINI_API_KEYを設定してください。');
  }
  return apiKey;
};

/**
 * Gemini APIを使ってテキストを翻訳
 */
const translateText = async (text: string, context: string = ''): Promise<string> => {
  try {
    const apiKey = getApiKey();
    
    const prompt = `${context}
以下の英語テキストを自然で正確な日本語に翻訳してください。専門用語や慣用表現は適切に日本語化してください。

英語テキスト: "${text}"

日本語翻訳:`;

    const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.3,
          maxOutputTokens: 1000,
        }
      }),
    });

    if (!response.ok) {
      throw new Error(`Gemini API エラー: ${response.status}`);
    }

    const data = await response.json();
    const translatedText = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
    
    if (!translatedText) {
      throw new Error('翻訳結果が取得できませんでした');
    }

    return translatedText;
  } catch (error) {
    console.error('翻訳エラー:', error);
    throw error;
  }
};

/**
 * 複数のテキストを一括翻訳
 */
const translateMultipleTexts = async (texts: string[], context: string = ''): Promise<string[]> => {
  try {
    const apiKey = getApiKey();
    
    const textList = texts.map((text, index) => `${index + 1}. "${text}"`).join('\n');
    
    const prompt = `${context}
以下の英語テキストリストを自然で正確な日本語に翻訳してください。各項目の番号を保持して翻訳結果を返してください。

英語テキストリスト:
${textList}

日本語翻訳リスト:`;

    const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.3,
          maxOutputTokens: 2000,
        }
      }),
    });

    if (!response.ok) {
      throw new Error(`Gemini API エラー: ${response.status}`);
    }

    const data = await response.json();
    const translatedText = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
    
    if (!translatedText) {
      throw new Error('翻訳結果が取得できませんでした');
    }

    // 番号付きリストから翻訳結果を抽出
    const lines: string[] = translatedText.split('\n');
    const translations: string[] = [];
    
    for (let i = 0; i < texts.length; i++) {
      const linePattern = new RegExp(`${i + 1}\\. "?(.+?)"?$`);
      const matchingLine = lines.find((line: string) => linePattern.test(line.trim()));
      
      if (matchingLine) {
        const match = matchingLine.match(linePattern);
        translations.push(match?.[1]?.replace(/^"|"$/g, '') || texts[i]);
      } else {
        // フォールバック：個別翻訳
        translations.push(await translateText(texts[i], context));
      }
    }
    
    return translations;
  } catch (error) {
    console.error('一括翻訳エラー:', error);
    // エラー時は個別翻訳にフォールバック
    const results: string[] = [];
    for (const text of texts) {
      try {
        const translated = await translateText(text, context);
        results.push(translated);
      } catch {
        results.push(text); // 翻訳失敗時は元のテキストを保持
      }
    }
    return results;
  }
};

/**
 * 単語データ全体を日本語に翻訳
 */
export const translateWordData = async (wordData: WordData): Promise<Partial<WordData>> => {
  try {
    const translations: Partial<WordData> = {};

    // 品詞別の定義を翻訳
    const japaneseMeanings = await Promise.all(
      wordData.meanings.map(async (meaning) => {
        const translatedDefinitions = await translateMultipleTexts(
          meaning.definitions,
          `これは「${wordData.word}」という英単語の${meaning.partOfSpeech}（品詞）としての定義です。`
        );
        
        return {
          partOfSpeech: await translatePartOfSpeech(meaning.partOfSpeech),
          definitions: translatedDefinitions
        };
      })
    );

    translations.japaneseMeanings = japaneseMeanings;

    // 例文を翻訳
    if (wordData.examples.length > 0) {
      translations.japaneseExamples = await translateMultipleTexts(
        wordData.examples,
        `これらは「${wordData.word}」という英単語を使った例文です。`
      );
    }

    // 同義語を翻訳
    if (wordData.synonyms.length > 0) {
      translations.japaneseSynonyms = await translateMultipleTexts(
        wordData.synonyms,
        `これらは「${wordData.word}」の同義語（類義語）です。単語として翻訳してください。`
      );
    }

    // 反義語を翻訳
    if (wordData.antonyms.length > 0) {
      translations.japaneseAntonyms = await translateMultipleTexts(
        wordData.antonyms,
        `これらは「${wordData.word}」の反義語（対義語）です。単語として翻訳してください。`
      );
    }

    return translations;
  } catch (error) {
    console.error('単語データ翻訳エラー:', error);
    throw new Error('翻訳に失敗しました。しばらく待ってから再試行してください。');
  }
};

/**
 * 英語の品詞を日本語に翻訳
 */
const translatePartOfSpeech = async (partOfSpeech: string): Promise<string> => {
  const partOfSpeechMap: { [key: string]: string } = {
    'noun': '名詞',
    'verb': '動詞',
    'adjective': '形容詞',
    'adverb': '副詞',
    'pronoun': '代名詞',
    'preposition': '前置詞',
    'conjunction': '接続詞',
    'interjection': '感嘆詞',
    'article': '冠詞',
    'determiner': '限定詞',
    'exclamation': '感嘆詞',
  };

  return partOfSpeechMap[partOfSpeech.toLowerCase()] || partOfSpeech;
};

/**
 * Gemini APIの利用可能性をチェック
 */
export const isGeminiApiAvailable = (): boolean => {
  try {
    getApiKey();
    return true;
  } catch {
    return false;
  }
};
