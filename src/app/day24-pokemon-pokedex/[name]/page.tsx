'use client';

import { useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import { FormattedPokemon } from '../types';
import { getPokemonDetails, formatPokemonData } from '../utils/pokemonApi';
import PokemonDetail from '../components/PokemonDetail';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

interface PokemonDetailPageProps {
  params: {
    name: string;
  };
}

export default function PokemonDetailPage({ params }: PokemonDetailPageProps) {
  const [pokemon, setPokemon] = useState<FormattedPokemon | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ポケモンの詳細データを取得
  const fetchPokemonDetail = async () => {
    try {
      setLoading(true);
      setError(null);

      // URLパラメータからポケモン名を取得してAPIで詳細情報を取得
      const pokemonData = await getPokemonDetails(params.name);
      const formattedData = formatPokemonData(pokemonData);
      
      setPokemon(formattedData);
    } catch (err) {
      console.error('Error fetching Pokemon detail:', err);
      if (err instanceof Error && err.message.includes('404')) {
        // 404エラーの場合は Not Found ページを表示
        notFound();
      } else {
        setError(err instanceof Error ? err.message : 'ポケモンの詳細データの取得に失敗しました');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (params.name) {
      fetchPokemonDetail();
    }
  }, [params.name]);

  // リトライ処理
  const handleRetry = () => {
    fetchPokemonDetail();
  };

  // ローディング状態
  if (loading) {
    return <LoadingSpinner message="ポケモンの詳細を読み込み中..." />;
  }

  // エラー状態
  if (error) {
    return <ErrorMessage message={error} onRetry={handleRetry} />;
  }

  // ポケモンが見つからない場合
  if (!pokemon) {
    return <ErrorMessage message="ポケモンが見つかりませんでした" />;
  }

  return <PokemonDetail pokemon={pokemon} />;
} 