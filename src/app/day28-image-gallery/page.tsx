'use client'

import { galleryImages } from './data/images'
import { useGallery } from './hooks/useGallery'
import CategoryFilter from './components/CategoryFilter'
import ImageGrid from './components/ImageGrid'
import ImageModal from './components/ImageModal'

export default function Day28Page() {
  const {
    selectedCategory,
    modalState,
    filteredImages,
    categories,
    currentImage,
    openModal,
    closeModal,
    goToPrevious,
    goToNext,
    handleCategoryChange
  } = useGallery({ images: galleryImages })

  return (
    <div className="container mx-auto px-4 py-8"> {/* コンテナ, 中央配置, 横パディング4, 縦パディング8 */}
      {/* ヘッダー情報 */}
     
        
        {/* 統計情報 */}
        <div className="mt-6 flex justify-center gap-8 text-sm text-gray-500"> {/* 上マージン6, フレックス中央, ギャップ8, 小文字, グレー文字 */}
          <span>総画像数: {galleryImages.length}枚</span>
          <span>表示中: {filteredImages.length}枚</span>
          <span>カテゴリ数: {categories.length}個</span>
        </div>

      {/* カテゴリフィルター */}
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />

      {/* 選択中のカテゴリ表示 */}
      {selectedCategory && (
        <div className="mb-6"> {/* 下マージン6 */}
          <div className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"> {/* インラインフレックス, アイテム中央, 横パディング3, 縦パディング1, 円形, 小文字, 薄青背景, 青文字 */}
            <span className="mr-2">📂</span>
            <span>{selectedCategory} ({filteredImages.length}枚)</span>
            <button
              onClick={() => handleCategoryChange(null)}
              className="ml-2 hover:text-blue-600" // 左マージン2, ホバー時青文字
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* 画像グリッド */}
      <ImageGrid
        images={filteredImages}
        onImageClick={openModal}
      />

      {/* 画像が0枚の場合の表示 */}
      {filteredImages.length === 0 && (
        <div className="text-center py-12"> {/* 中央配置, 縦パディング12 */}
          <div className="text-6xl mb-4">🖼️</div> {/* 6xl文字, 下マージン4 */}
          <h3 className="text-xl font-semibold text-gray-700 mb-2"> {/* xl文字, セミボールド, グレー700, 下マージン2 */}
            画像が見つかりません
          </h3>
          <p className="text-gray-500 mb-4"> {/* グレー文字, 下マージン4 */}
            選択したカテゴリには画像がありません。
          </p>
          <button
            onClick={() => handleCategoryChange(null)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors" // 横パディング4, 縦パディング2, 青背景, 白文字, 角丸, ホバー効果, トランジション
          >
            すべての画像を表示
          </button>
        </div>
      )}

      {/* 画像モーダル */}
      <ImageModal
        isOpen={modalState.isOpen}
        currentImage={currentImage}
        currentIndex={modalState.currentImageIndex}
        totalImages={filteredImages.length}
        onClose={closeModal}
        onPrevious={goToPrevious}
        onNext={goToNext}
      />

      {/* 操作ガイド */}
      <div className="mt-12 text-center text-sm text-gray-400"> {/* 上マージン12, 中央配置, 小文字, グレー400 */}
        <p>💡 ヒント: 画像をクリックして拡大表示、ESCキーで閉じる、矢印キーで前後の画像を表示</p>
      </div>
    </div>
  )
} 