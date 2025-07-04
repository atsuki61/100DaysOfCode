'use client';

import React, { useState, FormEvent } from 'react';
import { SearchParams } from '../types';

interface SearchBarProps {
  onSearch: (params: SearchParams) => void;
  isLoading: boolean;
  initialSearchTerm?: string;
}

export default function SearchBar({ onSearch, isLoading, initialSearchTerm = '' }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [mediaType, setMediaType] = useState<SearchParams['media']>('music');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (searchTerm.trim()) {
      onSearch({
        term: searchTerm.trim(),
        media: mediaType,
        limit: 50
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto mb-8">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* 検索語入力 */}
        <div className="flex-1">
          <label htmlFor="search-term" className="sr-only">
            検索語を入力
          </label>
          <input
            id="search-term"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="アーティスト名、曲名、アルバム名を入力..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors" // 全幅, 横パディング4, 縦パディング3, グレーボーダー, 角丸, フォーカス時青リング
            disabled={isLoading}
          />
        </div>

        {/* メディアタイプ選択 */}
        <div className="sm:w-40">
          <label htmlFor="media-type" className="sr-only">
            メディアタイプを選択
          </label>
          <select
            id="media-type"
            value={mediaType}
            onChange={(e) => setMediaType(e.target.value as SearchParams['media'])}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors bg-white" // 全幅, 横パディング4, 縦パディング3, グレーボーダー, 角丸, フォーカス時青リング, 白背景
            disabled={isLoading}
          >
            <option value="music">音楽</option>
            <option value="musicVideo">ミュージックビデオ</option>
            <option value="movie">映画</option>
            <option value="podcast">ポッドキャスト</option>
            <option value="audiobook">オーディオブック</option>
            <option value="ebook">電子書籍</option>
            <option value="software">ソフトウェア</option>
            <option value="all">すべて</option>
          </select>
        </div>

        {/* 検索ボタン */}
        <button
          type="submit"
          disabled={isLoading || !searchTerm.trim()}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium" // 横パディング6, 縦パディング3, 青背景, 白文字, 角丸, ホバー時濃い青, 無効時グレー
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              検索中...
            </>
          ) : (
            '検索'
          )}
        </button>
      </div>

      {/* 検索のヒント */}
      <div className="mt-4 text-sm text-gray-600">
        <p className="flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          ヒント: 「Taylor Swift」「Ed Sheeran」「One Piece」などで検索してみてください
        </p>
      </div>
    </form>
  );
} 