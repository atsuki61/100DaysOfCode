// iTunes Search APIの型定義

export interface iTunesSearchResponse {
  resultCount: number;
  results: iTunesItem[];
}

export interface iTunesItem {
  wrapperType: 'track' | 'collection' | 'artist';
  kind: 'song' | 'music-video' | 'feature-movie' | 'album' | 'artist' | 'podcast' | 'audiobook' | 'short-film' | 'tv-episode' | 'software' | 'ebook';
  artistId?: number;
  collectionId?: number;
  trackId?: number;
  artistName?: string;
  collectionName?: string;
  trackName?: string;
  collectionCensoredName?: string;
  trackCensoredName?: string;
  artistViewUrl?: string;
  collectionViewUrl?: string;
  trackViewUrl?: string;
  previewUrl?: string;
  artworkUrl30?: string;
  artworkUrl60?: string;
  artworkUrl100?: string;
  collectionPrice?: number;
  trackPrice?: number;
  releaseDate?: string;
  collectionExplicitness?: 'explicit' | 'cleaned' | 'notExplicit';
  trackExplicitness?: 'explicit' | 'cleaned' | 'notExplicit';
  discCount?: number;
  discNumber?: number;
  trackCount?: number;
  trackNumber?: number;
  trackTimeMillis?: number;
  country?: string;
  currency?: string;
  primaryGenreName?: string;
  contentAdvisoryRating?: string;
  shortDescription?: string;
  longDescription?: string;
  isStreamable?: boolean;
}

export interface SearchParams {
  term: string;
  media?: 'music' | 'musicVideo' | 'movie' | 'podcast' | 'audiobook' | 'shortFilm' | 'tvShow' | 'software' | 'ebook' | 'all';
  entity?: string;
  limit?: number;
  country?: string;
  lang?: 'en_us' | 'ja_jp';
  explicit?: 'Yes' | 'No';
}

export interface SearchState {
  isLoading: boolean;
  error: string | null;
  results: iTunesItem[];
  totalResults: number;
  currentPage: number;
  searchTerm: string;
  hasSearched: boolean;
} 