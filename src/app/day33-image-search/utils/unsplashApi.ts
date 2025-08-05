import { UnsplashSearchResponse } from '../types';

const UNSPLASH_API_URL = 'https://api.unsplash.com';

// Unsplash Access Key (本来は環境変数から取得)
// Demo用のアクセスキーを使用
const ACCESS_KEY = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY || 'YOUR_UNSPLASH_ACCESS_KEY';
// 文字列から簡単なハッシュ値を生成
const simpleHash = (str: string): number => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
   const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // 32bit整数に変換
  }
  return Math.abs(hash);
};

// 開発時用のモックデータ
const createMockImage = (id: number, query: string, index: number) => {
  // クエリからシード値を生成
  const queryHash = simpleHash(query.toLowerCase());
  
  // クエリとインデックスを組み合わせて一意のIDを生成
  const uniqueId = queryHash + (index * 1000) + id;
  
  return {
    id: `mock-${query}-${id}`,
    urls: {
      regular: `https://picsum.photos/800/600?random=${uniqueId}`,
      small: `https://picsum.photos/400/300?random=${uniqueId}`,
      thumb: `https://picsum.photos/200/150?random=${uniqueId}`,
      full: `https://picsum.photos/1200/800?random=${uniqueId}`
    },
    alt_description: `Beautiful ${query} image ${id}`,
    user: {
      name: `${query.charAt(0).toUpperCase() + query.slice(1)} Photographer ${id}`,
      username: `${query.toLowerCase()}_photographer_${id}`
    },
    likes: Math.floor(Math.random() * 1000) + 50,
    description: `This is a beautiful ${query} photograph from Unsplash`
  };
};

// 画像検索API呼び出し
export const searchImages = async (
  query: string, 
  page: number = 1, 
  perPage: number = 20
): Promise<UnsplashSearchResponse> => {
  // APIキーが設定されていない場合はモックデータを返す
  if (ACCESS_KEY === 'YOUR_UNSPLASH_ACCESS_KEY') {
    // モックデータを返す（開発時用）
    await new Promise(resolve => setTimeout(resolve, 500)); // 遅延をシミュレート
    
    const startIndex = (page - 1) * perPage;
    const mockImages = Array.from({ length: perPage }, (_, i) => 
      createMockImage(startIndex + i + 1, query, startIndex + i)
    );

    // クエリに応じた総数を調整（異なるクエリで異なる総数）
    const queryHash = simpleHash(query.toLowerCase());
    const baseTotal = 50 + (queryHash % 150); // 50-200の範囲
    const totalPages = Math.ceil(baseTotal / perPage);

    return {
      total: baseTotal,
      total_pages: totalPages,
      results: mockImages
    };
  }

  // 実際のUnsplash API呼び出し
  try {
    const response = await fetch(
      `${UNSPLASH_API_URL}/search/photos?query=${encodeURIComponent(query)}&page=${page}&per_page=${perPage}`,
      {
        headers: {
          'Authorization': `Client-ID ${ACCESS_KEY}`
        }
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch images');
    }

    const data: UnsplashSearchResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching images:', error);
    throw error;
  }
};