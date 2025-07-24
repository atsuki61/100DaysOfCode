import Image from 'next/image';
import Link from 'next/link';
import { FormattedPokemon } from '../types';

interface PokemonDetailProps {
  pokemon: FormattedPokemon;
}

export default function PokemonDetail({ pokemon }: PokemonDetailProps) {
  // ステータスの最大値（一般的なポケモンの最大値の目安）
  const maxStatValue = 200;

  return (
    <div className="max-w-4xl mx-auto"> {/* 最大幅制限, 中央寄せ */}
      {/* 戻るボタン */}
      <div className="mb-6"> {/* 下マージン */}
        <Link 
          href="/day24-pokemon-pokedex"
          className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors" // インラインフレックス, アイテム中央, パディング, 青背景, 白文字, 角丸, ホバー効果
        >
          ← 一覧に戻る
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden"> {/* 白背景, 角丸, 影, オーバーフロー隠す */}
        {/* ヘッダー部分 */}
        <div className="bg-gradient-to-r from-blue-400 to-purple-500 px-6 py-8 text-white"> {/* グラデーション背景, パディング, 白文字 */}
          <div className="flex flex-col md:flex-row items-center gap-6"> {/* 縦並び→横並び(md), アイテム中央, 間隔 */}
            {/* ポケモン画像 */}
            <div className="relative w-48 h-48 flex-shrink-0"> {/* 相対位置, 大きいサイズ, 縮小しない */}
              {pokemon.image ? (
                <Image
                  src={pokemon.image}
                  alt={pokemon.displayName}
                  fill
                  className="object-contain" // 画像の縦横比を保持
                  sizes="(max-width: 768px) 192px, 192px"
                  priority
                />
              ) : (
                <div className="w-full h-full bg-white bg-opacity-20 rounded-lg flex items-center justify-center"> {/* 半透明白背景 */}
                  <span className="text-white text-lg">No Image</span>
                </div>
              )}
            </div>

            {/* ポケモン情報 */}
            <div className="flex-1 text-center md:text-left"> {/* フレックス1, 中央寄せ→左寄せ */}
              <div className="text-lg font-medium opacity-90 mb-2"> {/* 大文字, ミディアム太字, 半透明, 下マージン */}
                #{pokemon.id.toString().padStart(3, '0')}
              </div>
              <h1 className="text-4xl font-bold mb-4"> {/* 特大文字, 太字, 下マージン */}
                {pokemon.displayName}
              </h1>
              <div className="text-xl opacity-90 mb-6"> {/* 大文字, 半透明, 下マージン */}
                {pokemon.name}
              </div>
              
              {/* タイプ */}
              <div className="flex justify-center md:justify-start gap-3"> {/* 中央寄せ→左寄せ, 間隔 */}
                {pokemon.types.map((type) => (
                  <span
                    key={type}
                    className="px-4 py-2 bg-white bg-opacity-20 rounded-full text-lg font-medium" // パディング, 半透明白背景, 完全角丸, 大文字, ミディアム太字
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 詳細情報 */}
        <div className="p-6"> {/* パディング */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8"> {/* 1列→2列(lg), 間隔 */}
            
            {/* 基本情報 */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4"> {/* 大文字, 太字, 濃いグレー, 下マージン */}
                基本情報
              </h2>
              <div className="space-y-4"> {/* 縦間隔 */}
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"> {/* 横並び, 間隔調整, パディング, 薄グレー背景, 角丸 */}
                  <span className="font-medium text-gray-600">身長</span> {/* ミディアム太字, グレー */}
                  <span className="font-bold text-lg">{pokemon.height}</span> {/* 太字, 大文字 */}
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium text-gray-600">体重</span>
                  <span className="font-bold text-lg">{pokemon.weight}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium text-gray-600">基礎経験値</span>
                  <span className="font-bold text-lg">{pokemon.baseExperience}</span>
                </div>
              </div>

              {/* 特性 */}
              <div className="mt-6"> {/* 上マージン */}
                <h3 className="text-xl font-bold text-gray-800 mb-3">特性</h3>
                <div className="flex flex-wrap gap-2"> {/* フレックス折り返し, 間隔 */}
                  {pokemon.abilities.map((ability, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium" // パディング, 青系背景, 完全角丸, 小文字, ミディアム太字
                    >
                      {ability.charAt(0).toUpperCase() + ability.slice(1)}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* ステータス */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">ステータス</h2>
              <div className="space-y-4">
                {Object.entries({
                  'HP': pokemon.stats.hp,
                  '攻撃': pokemon.stats.attack,
                  '防御': pokemon.stats.defense,
                  '特攻': pokemon.stats.specialAttack,
                  '特防': pokemon.stats.specialDefense,
                  '素早さ': pokemon.stats.speed,
                }).map(([statName, value]) => (
                  <div key={statName} className="space-y-2"> {/* 縦間隔 */}
                    <div className="flex justify-between text-sm"> {/* 横並び, 間隔調整, 小文字 */}
                      <span className="font-medium text-gray-600">{statName}</span>
                      <span className="font-bold">{value}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3"> {/* プログレスバー背景 */}
                      <div 
                        className="bg-gradient-to-r from-green-400 to-blue-500 h-3 rounded-full transition-all duration-1000" // グラデーション, プログレスバー, アニメーション
                        style={{ width: `${Math.min((value / maxStatValue) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* 合計値 */}
              <div className="mt-6 p-4 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-lg"> {/* 上マージン, パディング, グラデーション背景, 角丸 */}
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-800">合計</span>
                  <span className="text-2xl font-bold text-orange-600"> {/* 特大文字, 太字, オレンジ色 */}
                    {Object.values(pokemon.stats).reduce((total, stat) => total + stat, 0)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 