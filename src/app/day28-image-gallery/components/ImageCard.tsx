import Image from 'next/image'
import { GalleryImage } from '../types'

interface ImageCardProps {
  image: GalleryImage
  onClick: () => void
}

export default function ImageCard({ image, onClick }: ImageCardProps) {
  return (
    <div
      className="group relative cursor-pointer overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 hover:shadow-xl hover:scale-105" // グループ, 相対位置, カーソルポインタ, オーバーフロー隠し, 角丸, 白背景, 影, トランジション, ホバー効果
      onClick={onClick}
    >
      {/* 画像コンテナ */}
      <div className="relative h-64 w-full overflow-hidden"> {/* 相対位置, 高さ64, 幅100%, オーバーフロー隠し */}
        <Image
          src={image.src}
          alt={image.alt}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110" // オブジェクトカバー, トランジション, グループホバー時拡大
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* オーバーレイ */}
        <div className="absolute inset-0 bg-black bg-opacity-0 transition-all duration-300 group-hover:bg-opacity-30" /> {/* 絶対位置, 全体覆う, 黒背景, 透明度0→30% */}
        
        {/* 拡大アイコン */}
        <div className="absolute top-2 right-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100"> {/* 絶対位置, 右上, 透明→不透明 */}
          <div className="rounded-full bg-white p-2 shadow-md"> {/* 円形, 白背景, パディング2, 影 */}
            <svg
              className="h-4 w-4 text-gray-600" // 高さ4, 幅4, グレー文字
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* 画像情報 */}
      <div className="p-4"> {/* パディング4 */}
        <h3 className="font-semibold text-gray-900 mb-1 truncate"> {/* セミボールド, グレー900, 下マージン1, 省略 */}
          {image.title}
        </h3>
        
        {image.category && (
          <p className="text-sm text-blue-600 mb-2"> {/* 小文字, 青文字, 下マージン2 */}
            {image.category}
          </p>
        )}
        
        {image.description && (
          <p className="text-sm text-gray-600 line-clamp-2"> {/* 小文字, グレー文字, 2行制限 */}
            {image.description}
          </p>
        )}
      </div>
    </div>
  )
} 