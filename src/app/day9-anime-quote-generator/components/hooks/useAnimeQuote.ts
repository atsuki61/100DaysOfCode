import { useState, useCallback } from 'react';
import { AnimeQuote, ApiResponse } from '../../types';
import { animeQuotes } from '../data/quotes';

// 簡易APIモック関数
const fetchRandomQuote = async (): Promise<ApiResponse> => {
  // 実際のAPI呼び出しをシミュレート（遅延を追加）
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // ランダムエラーをシミュレート（10%の確率）
  if (Math.random() < 0.1) {
    return {
      success: false,
      error: 'ネットワークエラーが発生しました'
    };
  }
  
  // ランダムな名言を選択
  const randomIndex = Math.floor(Math.random() * animeQuotes.length);
  const randomQuote = animeQuotes[randomIndex];
  
  return {
    success: true,
    data: randomQuote
  };
};

export const useAnimeQuote = () => {
  const [quote, setQuote] = useState<AnimeQuote | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 名言を取得する関数
  const getRandomQuote = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetchRandomQuote();
      
      if (response.success && response.data) {
        setQuote(response.data);
      } else {
        setError(response.error || '不明なエラーが発生しました');
      }
    } catch (err) {
      setError('予期しないエラーが発生しました');
      console.error('Quote fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    quote,
    loading,
    error,
    getRandomQuote
  };
}; 