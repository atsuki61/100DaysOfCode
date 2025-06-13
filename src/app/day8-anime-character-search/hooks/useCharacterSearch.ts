'use client'

import { useState, useMemo } from 'react'
import { AnimeCharacter } from '../types'
import { matchesWithKanaConversion } from '../utils/searchUtils'

export function useCharacterSearch(characters: AnimeCharacter[]) {
  const [searchQuery, setSearchQuery] = useState('')

  // 検索クエリに基づいてキャラクターをフィルタリング（ひらがな対応）
  const filteredCharacters = useMemo(() => {
    if (!searchQuery.trim()) {
      return characters
    }

    const query = searchQuery.trim()
    
    return characters.filter(character => 
      matchesWithKanaConversion(character.name, query) ||
      matchesWithKanaConversion(character.animeName, query) ||
      matchesWithKanaConversion(character.description, query) ||
      matchesWithKanaConversion(character.series, query)
    )
  }, [characters, searchQuery])

  // 検索結果の統計情報
  const searchStats = useMemo(() => ({
    total: characters.length,
    filtered: filteredCharacters.length,
    isSearching: searchQuery.trim().length > 0
  }), [characters.length, filteredCharacters.length, searchQuery])

  return {
    searchQuery,
    setSearchQuery,
    filteredCharacters,
    searchStats
  }
} 