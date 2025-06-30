'use client'

import { useState, useCallback } from 'react';
import { WordData, SearchState } from '../types';
import { searchWord } from '../utils/dictionaryApi';

export function useDictionary() {
  const [wordData, setWordData] = useState<WordData | null>(null);
  const [searchState, setSearchState] = useState<SearchState>({
    status: 'idle'
  });

  const searchDictionary = useCallback(async (word: string) => {
    if (!word.trim()) {
      setSearchState({
        status: 'error',
        error: '検索する単語を入力してください。'
      });
      return;
    }

    setSearchState({
      status: 'loading',
      lastSearchedWord: word.trim()
    });

    try {
      const result = await searchWord(word);
      setWordData(result);
      setSearchState({
        status: 'success',
        lastSearchedWord: word.trim()
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '検索中にエラーが発生しました。';
      setSearchState({
        status: 'error',
        error: errorMessage,
        lastSearchedWord: word.trim()
      });
      setWordData(null);
    }
  }, []);

  const clearSearch = useCallback(() => {
    setWordData(null);
    setSearchState({ status: 'idle' });
  }, []);

  return {
    wordData,
    searchState,
    searchDictionary,
    clearSearch,
    isLoading: searchState.status === 'loading',
    isError: searchState.status === 'error',
    isSuccess: searchState.status === 'success',
  };
} 