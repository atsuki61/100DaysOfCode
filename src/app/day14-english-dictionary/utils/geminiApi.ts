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

// 遅延用のユーティリティ関数
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// リトライ用の設定
const RETRY_CONFIG = {
  maxRetries: 3,
  baseDelay: 1000, // 1秒
  maxDelay: 10000, // 10秒
};

/**
 * 指数バックオフでリトライ処理を行う
 */
const withRetry = async <T>(
  apiCall: () => Promise<T>,
  retryCount: number = 0
): Promise<T> => {
  try {
    return await apiCall();
  } catch (error: unknown) {
    const errorObj = error as { message?: string; status?: number };
    const isRateLimitError = errorObj.message?.includes('429') || 
                           errorObj.status === 429 ||
                           errorObj.message?.includes('Too Many Requests');
    
    if (isRateLimitError && retryCount < RETRY_CONFIG.maxRetries) {
      // 指数バックオフで遅延時間を計算
      const delayTime = Math.min(
        RETRY_CONFIG.baseDelay * Math.pow(2, retryCount) + Math.random() * 1000,
        RETRY_CONFIG.maxDelay
      );
      
      console.log(`レート制限エラー(${retryCount + 1}/${RETRY_CONFIG.maxRetries + 1}): ${delayTime}ms後にリトライします`);
      await delay(delayTime);
      
      return withRetry(apiCall, retryCount + 1);
    }
    
    // リトライ回数超過またはレート制限以外のエラー
    if (isRateLimitError) {
      throw new Error('Gemini APIの利用制限に達しました。しばらく時間をおいてから再試行してください。（通常5-10分程度で復旧します）');
    }
    
    throw error;
  }
};

/**
 * Gemini APIを使ってテキストを翻訳
 */
const translateText = async (text: string, context: string = ''): Promise<string> => {
  return withRetry(async () => {
    const apiKey = getApiKey();
    
    const prompt = `${context}
以下の英語の辞書定義を日本語に翻訳してください。
- 簡潔で正確な翻訳のみを提供してください
- 余計な説明や補足は一切追加しないでください
- 辞書に載るような標準的な訳語のみを返してください

英語定義: "${text}"

日本語訳:`;

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
          temperature: 0.1, // より一貫した翻訳のために低く設定
          maxOutputTokens: 1000,
        }
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        throw new Error(`Gemini API エラー: 429`);
      }
      throw new Error(`Gemini API エラー: ${response.status}`);
    }

    const data = await response.json();
    const translatedText = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
    
    if (!translatedText) {
      throw new Error('翻訳結果が取得できませんでした');
    }

    return translatedText;
  });
};

/**
 * 複数のテキストを一括翻訳（遅延付き）
 */
const translateMultipleTexts = async (texts: string[], context: string = ''): Promise<string[]> => {
  // テキスト数が少ない場合は一括処理
  if (texts.length <= 3) {
    return withRetry(async () => {
      const apiKey = getApiKey();
      
      const textList = texts.map((text, index) => `${index + 1}. "${text}"`).join('\n');
      
      const prompt = `${context}
以下の英語の辞書定義リストを日本語に翻訳してください。
- 各項目の番号を保持してください
- 簡潔で正確な翻訳のみを提供してください
- 余計な説明や補足は一切追加しないでください
- 辞書に載るような標準的な訳語のみを返してください

英語定義リスト:
${textList}

日本語訳リスト:`;

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
            temperature: 0.1, // より一貫した翻訳のために低く設定
            maxOutputTokens: 2000,
          }
        }),
      });

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error(`Gemini API エラー: 429`);
        }
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
          // フォールバック：元のテキストを保持
          translations.push(texts[i]);
        }
      }
      
      return translations;
    });
  }

  // テキスト数が多い場合は個別処理（遅延付き）
  const results: string[] = [];
  for (const text of texts) {
    try {
      const translated = await translateText(text, context);
      results.push(translated);
      // API呼び出し間に遅延を追加（レート制限対策）
      await delay(500); // 500ms遅延
    } catch (error) {
      console.error('個別翻訳エラー:', error);
      results.push(text); // 翻訳失敗時は元のテキストを保持
    }
  }
  return results;
};

/**
 * 単語データ全体を日本語に翻訳（段階的処理）
 */
export const translateWordData = async (wordData: WordData): Promise<Partial<WordData>> => {
  try {
    const translations: Partial<WordData> = {};

    console.log('翻訳開始:', wordData.word);

    // 段階1: 品詞別の定義を翻訳（逐次処理でレート制限対策）
    const japaneseMeanings = [];
    for (const meaning of wordData.meanings) {
      try {
        console.log(`品詞 "${meaning.partOfSpeech}" の定義を翻訳中...`);
        
        const translatedDefinitions = await translateMultipleTexts(
          meaning.definitions,
          `「${wordData.word}」の${meaning.partOfSpeech}としての定義を翻訳してください。`
        );
        
        japaneseMeanings.push({
          partOfSpeech: await translatePartOfSpeech(meaning.partOfSpeech),
          definitions: translatedDefinitions
        });

        // 品詞間の遅延
        await delay(1000);
      } catch (error) {
        console.error(`品詞 "${meaning.partOfSpeech}" の翻訳エラー:`, error);
        japaneseMeanings.push({
          partOfSpeech: meaning.partOfSpeech,
          definitions: meaning.definitions
        });
      }
    }

    translations.japaneseMeanings = japaneseMeanings;

    // 段階2: 例文を翻訳
    if (wordData.examples.length > 0) {
      try {
        console.log('例文を翻訳中...');
        await delay(1000);
        translations.japaneseExamples = await translateMultipleTexts(
          wordData.examples,
          `「${wordData.word}」を使った例文を自然な日本語に翻訳してください。`
        );
      } catch (error) {
        console.error('例文翻訳エラー:', error);
        translations.japaneseExamples = wordData.examples;
      }
    }

    // 段階3: 同義語を翻訳
    if (wordData.synonyms.length > 0) {
      try {
        console.log('同義語を翻訳中...');
        await delay(1000);
        translations.japaneseSynonyms = await translateMultipleTexts(
          wordData.synonyms,
          `「${wordData.word}」の同義語を日本語の単語のみで翻訳してください。`
        );
      } catch (error) {
        console.error('同義語翻訳エラー:', error);
        translations.japaneseSynonyms = wordData.synonyms;
      }
    }

    // 段階4: 反義語を翻訳
    if (wordData.antonyms.length > 0) {
      try {
        console.log('反義語を翻訳中...');
        await delay(1000);
        translations.japaneseAntonyms = await translateMultipleTexts(
          wordData.antonyms,
          `「${wordData.word}」の反義語を日本語の単語のみで翻訳してください。`
        );
      } catch (error) {
        console.error('反義語翻訳エラー:', error);
        translations.japaneseAntonyms = wordData.antonyms;
      }
    }

    console.log('翻訳完了:', wordData.word);
    return translations;
  } catch (error) {
    console.error('単語データ翻訳エラー:', error);
    throw new Error('翻訳に失敗しました。Gemini APIの利用制限に達している可能性があります。しばらく時間をおいてから再試行してください。');
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
