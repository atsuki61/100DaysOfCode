import Link from 'next/link';
import Image from 'next/image';
import { TYPE_COLORS, TYPE_NAMES_JA } from '../types';

interface PokemonCardProps {
  id: number;
  name: string;
  displayName: string;
  image: string;
  types: string[];
}

export default function PokemonCard({
  id,
  name,
  displayName,
  image,
  types
}: PokemonCardProps) {
  return (
    <Link 
      href={`/day24-pokemon-pokedex/${name}`}
      className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300" // 白背景, 角丸, 影, ホバー効果
    >
      <div className="p-4"> {/* 内側パディング */}
        {/* ポケモン画像 */}
        <div className="flex justify-center mb-3"> {/* 中央寄せ, 下マージン */}
          <div className="relative w-20 h-20"> {/* 相対位置, 幅高さ20 */}
            {image ? (
              <Image
                src={image}
                alt={displayName}
                fill
                className="object-contain" // 画像の縦横比を保持
                sizes="(max-width: 768px) 80px, 80px"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center"> {/* グレー背景のプレースホルダー */}
                <span className="text-gray-500 text-xs">No Image</span> {/* グレー文字, 小文字 */}
              </div>
            )}
          </div>
        </div>

        {/* ポケモン番号 */}
        <div className="text-center mb-2"> {/* 中央寄せ, 下マージン */}
          <span className="text-sm text-gray-500 font-medium"> {/* 小文字, グレー色, ミディアム太字 */}
            #{id.toString().padStart(3, '0')}
          </span>
        </div>

        {/* ポケモン名 */}
        <h3 className="text-center text-lg font-bold text-gray-800 mb-3"> {/* 中央寄せ, 大文字, 太字, 濃いグレー, 下マージン */}
          {displayName}
        </h3>

        {/* タイプ表示 */}
        <div className="flex justify-center gap-2"> {/* 中央寄せ, 水平フレックス, 間隔2 */}
          {types.map((type) => (
            <span
              key={type}
              className={`px-2 py-1 rounded-full text-xs font-medium text-white ${TYPE_COLORS[type] || 'bg-gray-400'}`} // 横パディング2, 縦パディング1, 完全角丸, 小文字, ミディアム太字, 白文字
            >
              {TYPE_NAMES_JA[type] || type.charAt(0).toUpperCase() + type.slice(1)}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
} 