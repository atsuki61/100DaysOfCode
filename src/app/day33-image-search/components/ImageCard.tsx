"use client";

import Image from 'next/image';
import { UnsplashImage } from '../types';
import { useState } from 'react';

interface ImageCardProps {
  image: UnsplashImage;
}

const ImageCard = ({ image }: ImageCardProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleImageError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  const handleImageClick = () => {
    // 新しいタブで画像の詳細ページを開く
    window.open(image.urls.full, '_blank');
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"> {/* 背景白、角丸、影、オーバーフロー隠し、ホバー影、トランジション、カーソルポインタ */}
      <div className="relative aspect-square"> {/* 相対位置、正方形アスペクト比 */}
        {isLoading && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center"> {/* 絶対位置、全体、グレー背景、パルスアニメーション、中央寄せ */}
            <div className="text-gray-500 text-sm">読み込み中...</div> {/* グレーテキスト、小文字 */}
          </div>
        )}
        
        {hasError ? (
          <div className="absolute inset-0 bg-gray-100 flex items-center justify-center"> {/* 絶対位置、全体、薄グレー背景、中央寄せ */}
            <div className="text-gray-500 text-sm text-center p-4"> {/* グレーテキスト、小文字、中央寄せ、パディング */}
              <div className="mb-2">📷</div>
              <div>画像を読み込めませんでした</div>
            </div>
          </div>
        ) : (
          <Image
            src={image.urls.small}
            alt={image.alt_description || 'Unsplash image'}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105" // オブジェクトカバー、トランジション、ホバー拡大
            onLoad={handleImageLoad}
            onError={handleImageError}
            onClick={handleImageClick}
          />
        )}
      </div>

      <div className="p-4"> {/* パディング */}
        <div className="flex items-center justify-between mb-2"> {/* フレックス、アイテム中央、間隔調整、下マージン */}
          <span className="text-sm font-medium text-gray-700"> {/* 小文字、中太、グレーテキスト */}
            by {image.user.name}
          </span>
          <div className="flex items-center gap-1 text-red-500"> {/* フレックス、アイテム中央、ギャップ、赤テキスト */}
            <span>❤️</span>
            <span className="text-sm">{image.likes}</span> {/* 小文字 */}
          </div>
        </div>

        {image.description && (
          <p className="text-sm text-gray-600 line-clamp-2"> {/* 小文字、グレーテキスト、行制限2行 */}
            {image.description}
          </p>
        )}

        {image.alt_description && !image.description && (
          <p className="text-sm text-gray-600 line-clamp-2"> {/* 小文字、グレーテキスト、行制限2行 */}
            {image.alt_description}
          </p>
        )}
      </div>
    </div>
  );
};

export default ImageCard;