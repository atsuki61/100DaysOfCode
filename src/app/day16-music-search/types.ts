
export interface Song {
  trackId: number;
  trackName: string;
  artistName: string;
  previewUrl: string;
  artworkUrl100: string;
}

export interface ITunesResponse {
  resultCount: number;
  results: Song[];
}
