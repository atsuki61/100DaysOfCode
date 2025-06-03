export interface AnimeCharacter {
  id: number
  name: string
  animeName: string
  description: string
  imageUrl?: string
  category: 'protagonist' | 'antagonist' | 'supporting'
  series: string
}

export interface SearchState {
  query: string
  filteredCharacters: AnimeCharacter[]
} 