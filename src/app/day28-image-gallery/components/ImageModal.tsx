'use client'

import { useEffect, useCallback } from 'react'
import Image from 'next/image'
import { GalleryImage } from '../types'

interface ImageModalProps {
  isOpen: boolean
  currentImage: GalleryImage | null
  currentIndex: number
  totalImages: number
  onClose: () => void
  onPrevious: () => void
  onNext: () => void
}

export default function ImageModal({
  isOpen,
  currentImage,
  currentIndex,
  totalImages,
  onClose,
  onPrevious,
  onNext
}: ImageModalProps) {
  // キーボードイベントの処理
  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (!isOpen) return

    switch (event.key) {
      case 'Escape':
        onClose()
        break
      case 'ArrowLeft':
        onPrevious()
        break
      case 'ArrowRight':
        onNext()
        break
    }
  }, [isOpen, onClose, onPrevious, onNext])

  // キーボードイベントリスナーの設定
  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyPress)
      // ボディのスクロールを無効化
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleKeyPress)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, handleKeyPress])

  if (!isOpen || !currentImage) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90"> {/* 固定位置, 全画面, z-index50, フレックス中央, 黒背景90% */}
      {/* 背景オーバーレイ（クリックで閉じる） */}
      <div 
        className="absolute inset-0 cursor-pointer" // 絶対位置, 全体覆う, カーソルポインタ
        onClick={onClose}
      />

      {/* モーダルコンテンツ */}
      <div className="relative z-10 max-w-6xl max-h-[90vh] w-full mx-4"> {/* 相対位置, z-index10, 最大幅6xl, 最大高さ90vh, 幅100%, 横マージン4 */}
        {/* 閉じるボタン */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 rounded-full bg-black bg-opacity-50 p-2 text-white transition-all hover:bg-opacity-70" // 絶対位置, 右上, z-index20, 円形, 黒背景50%, パディング2, 白文字, トランジション, ホバー効果
        >
          <svg
            className="h-6 w-6" // 高さ6, 幅6
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* ナビゲーションボタン（前へ） */}
        {totalImages > 1 && (
          <button
            onClick={onPrevious}
            className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black bg-opacity-50 p-3 text-white transition-all hover:bg-opacity-70" // 絶対位置, 左4, 上50%, z-index20, Y軸中央移動, 円形, 黒背景50%, パディング3, 白文字
          >
            <svg
              className="h-6 w-6" // 高さ6, 幅6
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        )}

        {/* ナビゲーションボタン（次へ） */}
        {totalImages > 1 && (
          <button
            onClick={onNext}
            className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black bg-opacity-50 p-3 text-white transition-all hover:bg-opacity-70" // 絶対位置, 右4, 上50%, z-index20, Y軸中央移動, 円形, 黒背景50%, パディング3, 白文字
          >
            <svg
              className="h-6 w-6" // 高さ6, 幅6
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        )}

        {/* 画像とコンテンツ */}
        <div className="flex flex-col bg-white rounded-lg overflow-hidden shadow-2xl"> {/* フレックス縦, 白背景, 角丸, オーバーフロー隠し, 大きな影 */}
          {/* 画像 */}
          <div className="relative flex-1 min-h-[400px] max-h-[70vh]"> {/* 相対位置, フレックス1, 最小高さ400px, 最大高さ70vh */}
            <Image
              src={currentImage.src}
              alt={currentImage.alt}
              fill
              className="object-contain" // オブジェクトコンテイン
              sizes="(max-width: 768px) 100vw, 90vw"
              priority
            />
          </div>

          {/* 画像情報 */}
          <div className="p-6 bg-white"> {/* パディング6, 白背景 */}
            <div className="flex items-center justify-between mb-4"> {/* フレックス, アイテム中央, 両端配置, 下マージン4 */}
              <h2 className="text-2xl font-bold text-gray-900"> {/* 2xl文字, ボールド, グレー900 */}
                {currentImage.title}
              </h2>
              
              {totalImages > 1 && (
                <span className="text-sm text-gray-500"> {/* 小文字, グレー500 */}
                  {currentIndex + 1} / {totalImages}
                </span>
              )}
            </div>

            {currentImage.category && (
              <p className="text-blue-600 font-medium mb-2"> {/* 青文字, ミディアム, 下マージン2 */}
                {currentImage.category}
              </p>
            )}

            {currentImage.description && (
              <p className="text-gray-700 leading-relaxed"> {/* グレー700, 行間ゆったり */}
                {currentImage.description}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 