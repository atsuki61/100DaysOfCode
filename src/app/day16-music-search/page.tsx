'use client';

import React, { useState, useCallback } from 'react';
import { SearchBar, MusicCard, ErrorMessage, LoadingSpinner, ResultsInfo } from './components';
import { searchMusic } from './utils/musicApi';
import { SearchParams, SearchState, iTunesItem } from './types';

export default function MusicSearchPage() {
  const [searchState, setSearchState] = useState<SearchState>({
    isLoading: false,
    error: null,
    results: [],
    totalResults: 0,
    currentPage: 1,
    searchTerm: '',
    hasSearched: false
  });

  // 検索実行関数
  const handleSearch = useCallback(async (params: SearchParams) => {
    setSearchState(prev => ({
      ...prev,
      isLoading: true,
      error: null,
      searchTerm: params.term,
      hasSearched: true
    }));

    try {
      const response = await searchMusic(params);
      
      setSearchState(prev => ({
        ...prev,
        isLoading: false,
        results: response.results,
        totalResults: response.resultCount,
        currentPage: 1
      }));
    } catch (error) {
      setSearchState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : '検索中にエラーが発生しました'
      }));
    }
  }, []);

  // エラー時の再試行
  const handleRetry = useCallback(() => {
    if (searchState.searchTerm) {
      handleSearch({
        term: searchState.searchTerm,
        media: 'music',
        limit: 50
      });
    }
  }, [searchState.searchTerm, handleSearch]);

  return (
    <div className="space-y-6"> {/* 縦間隔6 */}
      <div className="max-w-6xl mx-auto px-4"> {/* 最大幅6xl, 中央配置, 横パディング4 */}

        {/* 検索バー */}
        <SearchBar
          onSearch={handleSearch}
          isLoading={searchState.isLoading}
          initialSearchTerm={searchState.searchTerm}
        />

        {/* 検索結果情報 */}
        {searchState.hasSearched && !searchState.error && (
          <ResultsInfo
            searchTerm={searchState.searchTerm}
            totalResults={searchState.totalResults}
            displayedResults={searchState.results.length}
            isLoading={searchState.isLoading}
          />
        )}

        {/* ローディング状態 */}
        {searchState.isLoading && <LoadingSpinner />}

        {/* エラー状態 */}
        {searchState.error && (
          <ErrorMessage message={searchState.error} onRetry={handleRetry} />
        )}

        {/* 検索結果 */}
        {!searchState.isLoading && !searchState.error && searchState.results.length > 0 && (
          <div className="space-y-4"> {/* 縦間隔4 */}
            {searchState.results.map((item: iTunesItem, index: number) => (
              <MusicCard
                key={`${item.trackId || item.collectionId || item.artistId}-${index}`}
                item={item}
              />
            ))}
          </div>
        )}

        {/* 検索開始前のメッセージ */}
        {!searchState.hasSearched && (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 mx-auto mb-6 bg-blue-100 rounded-full flex items-center justify-center"> {/* 幅24, 高さ24, 中央配置, 下マージン6, 青背景, 円形, 中央揃え */}
                <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2"> {/* 文字xl, 太字, 黒文字, 下マージン2 */}
                音楽を検索してみましょう
              </h3>
              <p className="text-gray-600 mb-6"> {/* グレー文字, 下マージン6 */}
                上の検索バーに好きなアーティスト名や曲名を入力して、音楽を探してみてください。
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm"> {/* グリッド2列, 間隔4, 小文字 */}
                <div className="bg-white p-3 rounded-lg shadow-sm"> {/* 白背景, パディング3, 角丸, 小さい影 */}
                  <div className="font-medium text-gray-900 mb-1">人気アーティスト</div>
                  <div className="text-gray-500">Taylor Swift, Ed Sheeran</div>
                </div>
                <div className="bg-white p-3 rounded-lg shadow-sm"> {/* 白背景, パディング3, 角丸, 小さい影 */}
                  <div className="font-medium text-gray-900 mb-1">アニメ音楽</div>
                  <div className="text-gray-500">One Piece, Naruto</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 