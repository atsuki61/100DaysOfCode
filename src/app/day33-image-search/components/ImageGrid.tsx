"use client";

import { useEffect, useRef } from 'react';
import { UnsplashImage } from '../types';
import ImageCard from './ImageCard';

interface ImageGridProps {
  images: UnsplashImage[];
  loading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
  error: string | null;
}

const ImageGrid = ({ images, loading, hasMore, onLoadMore, error }: ImageGridProps) => {
  const observerRef = useRef<HTMLDivElement>(null);

  // IntersectionObserver APIを使用した無限スクロール
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && hasMore && !loading) {
          onLoadMore();
        }
      },
      {
        threshold: 0.1, // 10%が表示されたら発火
        rootMargin: '100px', // 100px手前から発火
      }
    );

    const currentRef = observerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [hasMore, loading, onLoadMore]);

  if (error) {
    return (
      <div className="text-center py-12"> {/* 中央寄せ、上下パディング */}
        <div className="text-red-500 text-lg mb-4">⚠️ エラーが発生しました</div> {/* 赤テキスト、大文字、下マージン */}
        <p className="text-gray-600">{error}</p> {/* グレーテキスト */}
      </div>
    );
  }

  if (images.length === 0 && !loading) {
    return (
      <div className="text-center py-12"> {/* 中央寄せ、上下パディング */}
        <div className="text-gray-500 text-lg mb-4">🔍 検索結果がありません</div> {/* グレーテキスト、大文字、下マージン */}
        <p className="text-gray-600">別のキーワードで検索してみてください</p> {/* グレーテキスト */}
      </div>
    );
  }

  return (
    <div>
      {/* 画像グリッド */}
      <div 
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" /* グリッド、レスポンシブ列数、ギャップ */
        role="grid"
        aria-label="検索結果の画像一覧"
      >
        {images.map((image) => (
          <ImageCard key={image.id} image={image} />
        ))}
      </div>

      {/* 無限スクロール用のトリガー要素 */}
      <div ref={observerRef} className="h-20 flex items-center justify-center"> {/* 高さ、中央寄せ */}
        {loading && (
          <div className="flex items-center gap-3 text-gray-600" aria-live="polite"> {/* フレックス、アイテム中央、ギャップ、グレーテキスト、ライブリージョン */}
            <div className="w-6 h-6 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin" aria-hidden="true"></div> {/* スピナー：幅高さ、ボーダー、青上ボーダー、回転アニメーション、支援技術から隠す */}
            <span>更に画像を読み込み中...</span>
          </div>
        )}
        {!hasMore && images.length > 0 && !loading && (
          <div className="text-gray-500 text-sm"> {/* グレーテキスト、小文字 */}
            すべての画像を表示しました
          </div>
        )}
      </div>

      {/* 統計情報 */}
      {images.length > 0 && (
        <div className="text-center mt-8 text-sm text-gray-600"> {/* 中央寄せ、上マージン、小文字、グレーテキスト */}
          現在 <strong>{images.length}</strong> 枚の画像を表示中
        </div>
      )}
    </div>
  );
};

export default ImageGrid;