import { DictionaryResponse, WordData, WordMeaning } from '../types';

// Free Dictionary APIのベースURL
const API_BASE_URL = 'https://api.dictionaryapi.dev/api/v2/entries/en';

/**
 * APIレスポンスをアプリケーション用の型に変換
 */
const mapApiResponseToWordData = (response: DictionaryResponse[]): WordData => {
  const firstEntry = response[0];
  
  // 音声記号を取得（利用可能な最初のものを使用）
  const phonetic = firstEntry.phonetic || 
    firstEntry.phonetics.find(p => p.text)?.text || 
    '';

  // 意味をグループ化
  const meanings: WordMeaning[] = firstEntry.meanings.map(meaning => ({
    partOfSpeech: meaning.partOfSpeech,
    definitions: meaning.definitions.map(def => def.definition)
  }));

  // 例文を収集
  const examples: string[] = firstEntry.meanings
    .flatMap(meaning => meaning.definitions)
    .map(def => def.example)
    .filter((example): example is string => !!example)
    .slice(0, 3); // 最大3つの例文

  // 同義語を収集
  const synonyms: string[] = Array.from(new Set(
    firstEntry.meanings
      .flatMap(meaning => [...(meaning.synonyms || []), ...meaning.definitions.flatMap(def => def.synonyms || [])])
      .slice(0, 5) // 最大5つの同義語
  ));

  // 反義語を収集
  const antonyms: string[] = Array.from(new Set(
    firstEntry.meanings
      .flatMap(meaning => [...(meaning.antonyms || []), ...meaning.definitions.flatMap(def => def.antonyms || [])])
      .slice(0, 5) // 最大5つの反義語
  ));

  return {
    word: firstEntry.word,
    phonetic,
    meanings,
    examples,
    synonyms,
    antonyms,
  };
};

/**
 * 英単語を検索して詳細情報を取得
 */
export const searchWord = async (word: string): Promise<WordData> => {
  try {
    // 単語を正規化（小文字、トリム）
    const normalizedWord = word.toLowerCase().trim();
    
    if (!normalizedWord) {
      throw new Error('検索する単語を入力してください。');
    }

    // 英語以外の文字が含まれているかチェック
    if (!/^[a-zA-Z\s-']+$/.test(normalizedWord)) {
      throw new Error('英語の単語のみ検索できます。');
    }

    const url = `${API_BASE_URL}/${encodeURIComponent(normalizedWord)}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      switch (response.status) {
        case 404:
          throw new Error(`「${word}」は辞書に見つかりませんでした。\nスペルを確認してください。`);
        case 429:
          throw new Error('APIの利用制限に達しました。しばらく待ってから再試行してください。');
        default:
          throw new Error(`辞書データの取得に失敗しました（エラーコード: ${response.status}）`);
      }
    }

    const data: DictionaryResponse[] = await response.json();
    
    if (!data || data.length === 0) {
      throw new Error(`「${word}」の情報が見つかりませんでした。`);
    }

    return mapApiResponseToWordData(data);
    
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    
    // ネットワークエラーなど
    throw new Error('ネットワークエラーが発生しました。インターネット接続を確認してください。');
  }
};

/**
 * 単語の発音音声URLを取得
 */
export const getAudioUrl = async (word: string): Promise<string | null> => {
  try {
    const normalizedWord = word.toLowerCase().trim();
    const url = `${API_BASE_URL}/${encodeURIComponent(normalizedWord)}`;
    
    const response = await fetch(url);
    if (!response.ok) return null;
    
    const data: DictionaryResponse[] = await response.json();
    const audioUrl = data[0]?.phonetics?.find(p => p.audio)?.audio;
    
    return audioUrl || null;
  } catch {
    return null;
  }
}; 