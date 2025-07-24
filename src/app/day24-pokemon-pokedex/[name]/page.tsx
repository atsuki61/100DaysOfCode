'use client';

import { useState, useEffect, use } from 'react';
import { notFound } from 'next/navigation';
import { FormattedPokemon } from '../types';
import { getPokemonDetails, formatPokemonData, getPokemonSpecies } from '../utils/pokemonApi';
import PokemonDetail from '../components/PokemonDetail';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

interface PokemonDetailPageProps {
  params: Promise<{
    name: string;
  }>;
}

export default function PokemonDetailPage({ params }: PokemonDetailPageProps) {
  // Next.js 15での新しい仕様に対応: paramsをアンラップ
  const resolvedParams = use(params);
  
  const [pokemon, setPokemon] = useState<FormattedPokemon | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ポケモンの詳細データを取得
  const fetchPokemonDetail = async () => {
    try {
      setLoading(true);
      setError(null);

      // URLパラメータからポケモン名を取得してAPIで詳細情報を取得
      const pokemonData = await getPokemonDetails(resolvedParams.name);
      
      // species APIから日本語名を取得
      const speciesData = await getPokemonSpecies(pokemonData.id);
      
      const formattedData = formatPokemonData(pokemonData, speciesData);
      
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
    if (resolvedParams.name) {
      fetchPokemonDetail();
    }
  }, [resolvedParams.name]);

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