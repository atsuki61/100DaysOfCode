'use client';

import { useState } from 'react';
import { Song, ITunesResponse } from './types';
import { SearchBar, MusicCard, LoadingSpinner, ErrorMessage, ResultsInfo } from './components';

export default function MusicSearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<Song[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(
        `https://itunes.apple.com/search?term=${encodeURIComponent(searchTerm)}&entity=song&limit=20`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      
      const data: ITunesResponse = await response.json();
      setResults(data.results);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto"> {/* 最大幅設定、中央揃え */}
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onSearch={handleSearch}
        loading={loading}
      />

      {error && <ErrorMessage message={error} />}

      {loading && <LoadingSpinner />}

      {!loading && searchTerm && (
        <ResultsInfo count={results.length} searchTerm={searchTerm} />
      )}

      {!loading && results.length > 0 && (
        <div className="grid gap-4"> {/* グリッドレイアウト, 要素間の間隔4 */}
          {results.map((song: Song) => (
            <MusicCard key={song.trackId} song={song} />
          ))}
        </div>
      )}
    </div>
  );
}
