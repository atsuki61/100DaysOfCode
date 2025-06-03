'use client'

import SearchBar from './components/SearchBar'
import CharacterCard from './components/CharacterCard'
import { animeCharacters } from './data/characters'
import { useCharacterSearch } from './hooks/useCharacterSearch'
import { Search as SearchIcon } from 'lucide-react'

export default function Day8Page() {
  const {
    searchQuery,
    setSearchQuery,
    filteredCharacters,
    searchStats
  } = useCharacterSearch(animeCharacters)

  return (
    <>
      {/* 検索バー */}
      <div className="mb-8">
        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
      </div>

      {/* 検索結果の統計 */}
      <div className="mb-6">
        <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
          <SearchIcon className="w-4 h-4" />
          {searchStats.isSearching ? (
            <span>
              「{searchQuery}」の検索結果: {searchStats.filtered}件 
              （全{searchStats.total}件中）
            </span>
          ) : (
            <span>全{searchStats.total}件のキャラクターを表示中</span>
          )}
        </div>
      </div>

      {/* キャラクターリスト */}
      {filteredCharacters.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCharacters.map((character) => (
            <CharacterCard
              key={character.id}
              character={character}
            />
          ))}
        </div>
      ) : (
        /* 検索結果なしの場合 */
        <div className="text-center py-12">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 max-w-md mx-auto shadow-sm">
            <SearchIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              検索結果が見つかりません
            </h3>
            <p className="text-gray-500 mb-4">
              「{searchQuery}」に一致するキャラクターがありません。
            </p>
            <button
              onClick={() => setSearchQuery('')}
              className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
            >
              検索をリセット
            </button>
          </div>
        </div>
      )}
    </>
  )
}
