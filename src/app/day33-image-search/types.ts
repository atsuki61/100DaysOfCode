// Unsplash API レスポンスの型定義

export interface UnsplashImage {
  id: string;
  urls: {
    regular: string;
    small: string;
    thumb: string;
    full: string;
  };
  alt_description: string | null;
  user: {
    name: string;
    username: string;
  };
  likes: number;
  description: string | null;
}

export interface UnsplashSearchResponse {
  total: number;
  total_pages: number;
  results: UnsplashImage[];
}

export interface SearchState {
  images: UnsplashImage[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  page: number;
  query: string;
}