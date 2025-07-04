'use client';

import React, { useState } from 'react';
import { iTunesItem } from '../types';
import { formatTrackTime, formatPrice } from '../utils/musicApi';

interface MusicCardProps {
  item: iTunesItem;
  isPlaying: boolean;
  onPlay: (trackId: string, previewUrl: string) => void;
  onStop: () => void;
}

export default function MusicCard({ item, isPlaying, onPlay, onStop }: MusicCardProps) {
  const [imageError, setImageError] = useState(false);

  // アートワーク画像の取得
  const getArtworkUrl = () => {
    if (imageError) return null;
    return item.artworkUrl100 || item.artworkUrl60 || item.artworkUrl30 || null;
  };

  // プレビュー再生の制御
  const togglePreview = () => {
    if (!item.previewUrl) return;

    const trackId = item.trackId?.toString() || item.collectionId?.toString() || item.artistId?.toString() || '';

    if (isPlaying) {
      onStop();
    } else {
      onPlay(trackId, item.previewUrl);
    }
  };

  // 外部リンクを開く
  const openInItunes = () => {
    if (item.trackViewUrl) {
      window.open(item.trackViewUrl, '_blank');
    } else if (item.collectionViewUrl) {
      window.open(item.collectionViewUrl, '_blank');
    } else if (item.artistViewUrl) {
      window.open(item.artistViewUrl, '_blank');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden"> {/* 白背景, 角丸, 影, ホバー時影大, トランジション */}
      <div className="flex p-4 space-x-4"> {/* フレックス, パディング4, 横間隔4 */}
        {/* アートワーク画像 */}
        <div className="flex-shrink-0 w-20 h-20 bg-gray-200 rounded-lg overflow-hidden"> {/* 縮小なし, 幅20, 高さ20, グレー背景, 角丸, 溢れ隠し */}
          {getArtworkUrl() && !imageError ? (
            <img
              src={getArtworkUrl()!}
              alt={`${item.trackName || item.collectionName || item.artistName} のアートワーク`}
              className="w-full h-full object-cover"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400"> {/* 全幅, 全高, 中央揃え, グレー文字 */}
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
              </svg>
            </div>
          )}
        </div>

        {/* 情報セクション */}
        <div className="flex-1 min-w-0"> {/* フレックス1, 最小幅0 */}
          {/* タイトル */}
          <h3 className="text-lg font-semibold text-gray-900 truncate mb-1"> {/* 文字大, 太字, 黒文字, 省略, 下マージン1 */}
            {item.trackName || item.collectionName || item.artistName}
          </h3>

          {/* アーティスト名 */}
          <p className="text-sm text-gray-600 truncate mb-1"> {/* 小文字, グレー文字, 省略, 下マージン1 */}
            {item.artistName}
          </p>

          {/* アルバム名 */}
          {item.collectionName && item.collectionName !== item.trackName && (
            <p className="text-sm text-gray-500 truncate mb-2"> {/* 小文字, 薄いグレー文字, 省略, 下マージン2 */}
              {item.collectionName}
            </p>
          )}

          {/* 詳細情報 */}
          <div className="flex flex-wrap gap-3 text-xs text-gray-500"> {/* フレックス折り返し, 間隔3, 極小文字, 薄いグレー文字 */}
            {item.primaryGenreName && (
              <span className="flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2M7 4h10l.9 5.4a1 1 0 01-.9 1.6H7a1 1 0 01-.9-1.6L7 4z" />
                </svg>
                {item.primaryGenreName}
              </span>
            )}

            {item.trackTimeMillis && (
              <span className="flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {formatTrackTime(item.trackTimeMillis)}
              </span>
            )}

            {item.releaseDate && (
              <span className="flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {new Date(item.releaseDate).getFullYear()}
              </span>
            )}
          </div>
        </div>

        {/* アクションボタン */}
        <div className="flex flex-col gap-2"> {/* フレックス縦, 間隔2 */}
          {/* プレビュー再生ボタン */}
          {item.previewUrl && (
            <button
              onClick={togglePreview}
              className={`p-2 text-white rounded-lg transition-colors ${
                isPlaying 
                  ? 'bg-red-600 hover:bg-red-700' 
                  : 'bg-blue-600 hover:bg-blue-700'
              }`} // パディング2, 白文字, 角丸, トランジション, 再生状態に応じた背景色
              title={isPlaying ? 'プレビューを停止' : 'プレビューを再生'}
            >
              {isPlaying ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              )}
            </button>
          )}

          {/* iTunes で開くボタン */}
          <button
            onClick={openInItunes}
            className="p-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors" // パディング2, グレー背景, 白文字, 角丸, ホバー時濃いグレー
            title="iTunes で開く"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </button>

          {/* 価格表示 */}
          {item.trackPrice && (
            <div className="text-xs text-green-600 font-medium text-center"> {/* 極小文字, 緑文字, 太字, 中央揃え */}
              {formatPrice(item.trackPrice, item.currency)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 