import { UnsplashSearchResponse } from '../types';

const UNSPLASH_API_URL = 'https://api.unsplash.com';

// Unsplash Access Key (本来は環境変数から取得)
// Demo用のアクセスキーを使用
const ACCESS_KEY = 'YOUR_UNSPLASH_ACCESS_KEY';

// 開発時用のモックデータ
const createMockImage = (id: number, query: string) => ({
  id: `mock-${id}`,
  urls: {
    regular: `https://picsum.photos/800/600?random=${id}`,
    small: `https://picsum.photos/400/300?random=${id}`,
    thumb: `https://picsum.photos/200/150?random=${id}`,
    full: `https://picsum.photos/1200/800?random=${id}`
  },
  alt_description: `Beautiful ${query} image ${id}`,
  user: {
    name: `Photographer ${id}`,
    username: `user${id}`
  },
  likes: Math.floor(Math.random() * 1000),
  description: `This is a beautiful ${query} photograph from Unsplash`
});

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
    
    const startId = (page - 1) * perPage;
    const mockImages = Array.from({ length: perPage }, (_, i) => 
      createMockImage(startId + i + 1, query)
    );

    return {
      total: 1000, // 総画像数（モック）
      total_pages: 50, // 総ページ数（モック）
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