import Link from 'next/link';
import Image from 'next/image';
import { FormattedPokemon, TYPE_COLORS } from '../types';

interface PokemonCardProps {
  pokemon: FormattedPokemon;
}

export default function PokemonCard({ pokemon }: PokemonCardProps) {
  return (
    <Link 
      href={`/day24-pokemon-pokedex/${pokemon.id}`}
      className="block group"
    >
      {/* 白背景、角丸、影、ホバー効果 */}
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
        {/* ポケモン画像部分 */}
        {/* 高さ48、グラデーション背景 */}
        <div className="relative h-48 bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
          {/* 右上にID表示 */}
          <div className="absolute top-2 right-2 text-xs font-semibold text-gray-500">
            #{pokemon.id.toString().padStart(3, '0')}
          </div>
          {/* 画像コンテナ */}
          <div className="relative w-32 h-32">
            {/* 画像フィット、ホバー時拡大 */}
            <Image
              src={pokemon.image}
              alt={pokemon.displayName}
              fill
              className="object-contain group-hover:scale-110 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </div>

        {/* ポケモン情報部分 */}
        {/* パディング4 */}
        <div className="p-4">
          {/* タイトル、中央揃え */}
          <h3 className="text-lg font-bold text-gray-800 mb-2 text-center">
            {pokemon.displayName}
          </h3>
          
          {/* 英語名、中央揃え */}
          <p className="text-sm text-gray-500 text-center mb-3">
            {pokemon.name}
          </p>

          {/* タイプ表示 */}
          {/* 中央揃え、間隔2 */}
          <div className="flex justify-center gap-2 mb-3">
            {pokemon.types.map((type) => (
              <span
                key={type}
                className={`px-3 py-1 rounded-full text-white text-xs font-medium ${
                  TYPE_COLORS[type] || 'bg-gray-400'
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </span>
            ))}
          </div>

          {/* 基本ステータス */}
          {/* 2列グリッド、間隔3 */}
          <div className="grid grid-cols-2 gap-3 text-sm">
            {/* 中央揃え */}
            <div className="text-center">
              <div className="text-gray-500">Height</div>
              <div className="font-semibold">{pokemon.height}</div>
            </div>
            {/* 中央揃え */}
            <div className="text-center">
              <div className="text-gray-500">Weight</div>
              <div className="font-semibold">{pokemon.weight}</div>
            </div>
          </div>

          {/* HPバー */}
          {/* 上余白3 */}
          <div className="mt-3">
            {/* 横並び、間隔調整 */}
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>HP</span>
              <span>{pokemon.stats.hp}</span>
            </div>
            {/* プログレスバー背景 */}
            <div className="w-full bg-gray-200 rounded-full h-2">
              {/* プログレスバー */}
              <div 
                className="bg-green-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${Math.min((pokemon.stats.hp / 150) * 100, 100)}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
} 