// アニメ名言の型定義
export interface AnimeQuote {
  id: number;
  quote: string; // 名言
  character: string; // キャラクター名
  anime: string; // アニメ作品名
}

// APIレスポンスの型定義
export interface ApiResponse {
  success: boolean;
  data?: AnimeQuote;
  error?: string;
} 