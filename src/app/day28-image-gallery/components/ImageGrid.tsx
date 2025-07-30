import { GalleryImage } from '../types'
import ImageCard from './ImageCard'

interface ImageGridProps {
  images: GalleryImage[]
  onImageClick: (index: number) => void
}

export default function ImageGrid({ images, onImageClick }: ImageGridProps) {
  if (images.length === 0) {
    return (
      <div className="flex items-center justify-center h-64"> {/* フレックス, 中央配置, 高さ64 */}
        <p className="text-gray-500 text-lg"> {/* グレー文字, 大文字 */}
          画像が見つかりません
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"> {/* グリッド, レスポンシブ列数, ギャップ6 */}
      {images.map((image, index) => (
        <ImageCard
          key={image.id}
          image={image}
          onClick={() => onImageClick(index)}
        />
      ))}
    </div>
  )
} 