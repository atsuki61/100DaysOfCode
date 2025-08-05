"use client";

import { useState, useCallback } from 'react';
import { SearchState } from './types';
import { searchImages } from './utils/unsplashApi';
import SearchForm from './components/SearchForm';
import ImageGrid from './components/ImageGrid';

const ITEMS_PER_PAGE = 20;

export default function ImageSearchPage() {
  const [searchState, setSearchState] = useState<SearchState>({
    images: [],
    loading: false,
    error: null,
    hasMore: false,
    page: 1,
    query: ''
  });

  // 新しい検索を開始
  const handleNewSearch = useCallback(async (query: string) => {
    setSearchState(prev => ({
      ...prev,
      loading: true,
      error: null,
      images: [],
      page: 1,
      query
    }));

    try {
      const data = await searchImages(query, 1, ITEMS_PER_PAGE);
      setSearchState(prev => ({
        ...prev,
        loading: false,
        images: data.results,
        hasMore: data.total_pages > 1,
        page: 2 // 次に読み込むページ
      }));
    } catch (error) {
      setSearchState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : '検索中にエラーが発生しました'
      }));
    }
  }, []);

  // 追加の画像を読み込み（無限スクロール用）
  const handleLoadMore = useCallback(async () => {
    if (searchState.loading || !searchState.hasMore || !searchState.query) {
      return;
    }

    setSearchState(prev => ({ ...prev, loading: true }));

    try {
      const data = await searchImages(searchState.query, searchState.page, ITEMS_PER_PAGE);
      
      setSearchState(prev => ({
        ...prev,
        loading: false,
        images: [...prev.images, ...data.results],
        hasMore: data.total_pages > prev.page,
        page: prev.page + 1
      }));
    } catch (error) {
      setSearchState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : '画像の読み込み中にエラーが発生しました'
      }));
    }
  }, [searchState.loading, searchState.hasMore, searchState.query, searchState.page]);

  return (
    <div className="container mx-auto px-4 py-8"> {/* コンテナ、中央寄せ、横パディング、縦パディング */}
      {/* 検索フォーム */}
      <SearchForm 
        onSearch={handleNewSearch}
        loading={searchState.loading && searchState.page === 1}
      />

      {/* アプリの説明 */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8"> {/* 薄青背景、青ボーダー、角丸、パディング、下マージン */}
        <h2 className="text-lg font-semibold text-blue-800 mb-2">🖼️ 画像検索アプリ（無限スクロール）</h2> {/* 大文字、中太、青テキスト、下マージン */}
        <div className="text-blue-700 space-y-2"> {/* 青テキスト、縦スペース */}
          <p><strong>機能:</strong> キーワードで画像を検索し、スクロールで自動的に追加読み込み</p>
          <p><strong>技術:</strong> IntersectionObserver API、ページネーション、非同期処理制御</p>
          <p><strong>操作方法:</strong> 検索欄にキーワードを入力して検索ボタンを押してください</p>
        </div>
      </div>

      {/* 画像グリッド */}
      <ImageGrid 
        images={searchState.images}
        loading={searchState.loading}
        hasMore={searchState.hasMore}
        onLoadMore={handleLoadMore}
        error={searchState.error}
      />

      {/* 初期状態のメッセージ */}
      {searchState.images.length === 0 && !searchState.loading && !searchState.error && (
        <div className="text-center py-12"> {/* 中央寄せ、上下パディング */}
          <div className="text-gray-500 text-lg mb-4">🔍 画像を検索してみましょう</div> {/* グレーテキスト、大文字、下マージン */}
          <p className="text-gray-600">上の検索欄にキーワードを入力して、美しい画像を見つけてください</p> {/* グレーテキスト */}
        </div>
      )}
    </div>
  );
}