import { iTunesSearchResponse, SearchParams } from '../types';

// iTunes Search APIのベースURL
const ITUNES_API_BASE_URL = 'https://itunes.apple.com/search';

/**
 * iTunes Search APIを呼び出して音楽を検索する
 * @param params 検索パラメータ
 * @returns 検索結果のPromise
 */
export async function searchMusic(params: SearchParams): Promise<iTunesSearchResponse> {
  // URLパラメータを構築
  const searchParams = new URLSearchParams();
  
  // 必須パラメータ
  searchParams.append('term', params.term);
  
  // オプションパラメータ
  if (params.media) searchParams.append('media', params.media);
  if (params.entity) searchParams.append('entity', params.entity);
  if (params.limit) searchParams.append('limit', params.limit.toString());
  if (params.country) searchParams.append('country', params.country);
  if (params.lang) searchParams.append('lang', params.lang);
  if (params.explicit) searchParams.append('explicit', params.explicit);
  
  const url = `${ITUNES_API_BASE_URL}?${searchParams.toString()}`;
  
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: iTunesSearchResponse = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`検索中にエラーが発生しました: ${error.message}`);
    } else {
      throw new Error('検索中に予期しないエラーが発生しました');
    }
  }
}

/**
 * 検索語をURL用にエンコードする
 * @param term 検索語
 * @returns エンコードされた検索語
 */
export function encodeSearchTerm(term: string): string {
  return encodeURIComponent(term.trim());
}

/**
 * 時間をミリ秒から分:秒の形式に変換する
 * @param timeMillis 時間（ミリ秒）
 * @returns 分:秒の形式の文字列
 */
export function formatTrackTime(timeMillis: number): string {
  const totalSeconds = Math.floor(timeMillis / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

/**
 * 価格を通貨記号付きで表示する
 * @param price 価格
 * @param currency 通貨コード
 * @returns 通貨記号付きの価格文字列
 */
export function formatPrice(price: number, currency: string = 'USD'): string {
  const currencySymbol = currency === 'USD' ? '$' : currency === 'JPY' ? '¥' : currency;
  return `${currencySymbol}${price.toFixed(2)}`;
}

/**
 * デフォルトの検索パラメータ
 */
export const defaultSearchParams: Partial<SearchParams> = {
  media: 'music',
  limit: 50,
  country: 'US',
  lang: 'en_us',
  explicit: 'Yes'
}; 