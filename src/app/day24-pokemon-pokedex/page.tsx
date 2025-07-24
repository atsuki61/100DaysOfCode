'use client';

import { useState, useEffect } from 'react';
import { PokemonListItem, FormattedPokemon } from './types';
import { 
  getPokemonList, 
  getPokemonDetails, 
  formatPokemonData, 
  extractPokemonIdFromUrl 
} from './utils/pokemonApi';
import PokemonCard from './components/PokemonCard';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';

export default function PokemonPokedexPage() {
  const [pokemonList, setPokemonList] = useState<FormattedPokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // ポケモンデータを取得
  const fetchPokemonData = async () => {
    try {
      setLoading(true);
      setError(null);

      // まずポケモンの一覧を取得
      const list: PokemonListItem[] = await getPokemonList(50); // 最初は50匹に制限
      
      // 各ポケモンの詳細データを並行取得
      const pokemonDetailsPromises = list.map(async (pokemon) => {
        const id = extractPokemonIdFromUrl(pokemon.url);
        const details = await getPokemonDetails(id);
        return formatPokemonData(details);
      });

      const formattedPokemon = await Promise.all(pokemonDetailsPromises);
      
      // IDでソート
      formattedPokemon.sort((a, b) => a.id - b.id);
      
      setPokemonList(formattedPokemon);
    } catch (err) {
      console.error('Error fetching Pokemon data:', err);
      setError(err instanceof Error ? err.message : 'ポケモンデータの取得に失敗しました');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemonData();
  }, []);

  // 検索フィルタリング
  const filteredPokemon = pokemonList.filter(pokemon =>
    pokemon.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pokemon.id.toString().includes(searchTerm)
  );

  // リトライ処理
  const handleRetry = () => {
    fetchPokemonData();
  };

  return (
    <div className="container mx-auto px-4 py-8"> {/* コンテナ, 中央寄せ, 横パディング, 縦パディング */}
      {/* ヘッダー */}
      <div className="text-center mb-8"> {/* テキスト中央, 下マージン */}
        <h1 className="text-4xl font-bold text-gray-800 mb-4"> {/* 特大文字, 太字, 濃いグレー, 下マージン */}
          ポケモン図鑑
        </h1>
        <p className="text-gray-600 text-lg"> {/* グレー文字, 大文字 */}
          お気に入りのポケモンを見つけよう！
        </p>
      </div>

      {/* 検索バー */}
      <div className="max-w-md mx-auto mb-8"> {/* 最大幅制限, 中央寄せ, 下マージン */}
        <div className="relative"> {/* 相対位置 */}
          <input
            type="text"
            placeholder="ポケモンを検索... (名前、番号)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" // 全幅, パディング, 左パディング12, ボーダー, 角丸, フォーカス時リング, アウトライン無し
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center"> {/* 絶対位置, 縦全体, 左0, 左パディング, アイテム中央 */}
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"> {/* 幅高さ5, グレー色 */}
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* 検索結果数 */}
      {!loading && !error && (
        <div className="text-center mb-6"> {/* テキスト中央, 下マージン */}
          <span className="text-gray-600"> {/* グレー文字 */}
            {searchTerm ? `「${searchTerm}」の検索結果: ${filteredPokemon.length}匹` : `${pokemonList.length}匹のポケモン`}
          </span>
        </div>
      )}

      {/* コンテンツ */}
      {loading && <LoadingSpinner message="ポケモンを読み込み中..." />}
      
      {error && <ErrorMessage message={error} onRetry={handleRetry} />}
      
      {!loading && !error && (
        <>
          {filteredPokemon.length === 0 ? (
            <div className="text-center py-12"> {/* テキスト中央, 縦パディング */}
              <div className="text-gray-500 text-lg"> {/* グレー文字, 大文字 */}
                {searchTerm ? '検索条件に一致するポケモンが見つかりませんでした' : 'ポケモンが見つかりませんでした'}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"> {/* グリッドレイアウト, レスポンシブ列数, 間隔 */}
              {filteredPokemon.map((pokemon) => (
                <PokemonCard
                  key={pokemon.id}
                  id={pokemon.id}
                  name={pokemon.name}
                  displayName={pokemon.displayName}
                  image={pokemon.image}
                  types={pokemon.types}
                />
              ))}
            </div>
          )}
        </>
      )}

      {/* フッター */}
      {!loading && !error && pokemonList.length > 0 && (
        <div className="text-center mt-12 pt-8 border-t border-gray-200"> {/* テキスト中央, 上マージン, 上パディング, 上ボーダー */}
          <p className="text-gray-500 text-sm"> {/* グレー文字, 小文字 */}
            データ提供: <a href="https://pokeapi.co/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">PokéAPI</a>
          </p>
        </div>
      )}
    </div>
  );
} 