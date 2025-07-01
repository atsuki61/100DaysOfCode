'use client'

import { useState, useCallback } from 'react';
import { WordData, SearchState, TranslationState, Language } from '../types';
import { searchWord } from '../utils/dictionaryApi';
import { translateWordData, isGeminiApiAvailable } from '../utils/geminiApi';

export function useDictionary() {
  const [wordData, setWordData] = useState<WordData | null>(null);
  const [searchState, setSearchState] = useState<SearchState>({
    status: 'idle'
  });
  const [translationState, setTranslationState] = useState<TranslationState>({
    status: 'idle',
    isTranslated: false
  });
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');

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
      // 新しい検索時は翻訳状態をリセット
      setTranslationState({
        status: 'idle',
        isTranslated: false
      });
      setCurrentLanguage('en');
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

  const translateToJapanese = useCallback(async () => {
    if (!wordData || translationState.isTranslated) return;

    setTranslationState({
      status: 'translating',
      isTranslated: false
    });

    try {
      const translations = await translateWordData(wordData);
      setWordData(prevData => prevData ? { ...prevData, ...translations } : null);
      setTranslationState({
        status: 'success',
        isTranslated: true
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '翻訳中にエラーが発生しました。';
      
      // レート制限エラーの場合は特別な状態に設定
      if (errorMessage.includes('利用制限に達しました')) {
        const rateLimitedUntil = new Date(Date.now() + 10 * 60 * 1000); // 10分後
        setTranslationState({
          status: 'rate-limited',
          error: errorMessage,
          isTranslated: false,
          rateLimitedUntil
        });
      } else {
        setTranslationState({
          status: 'error',
          error: errorMessage,
          isTranslated: false
        });
      }
    }
  }, [wordData, translationState.isTranslated]);

  const switchLanguage = useCallback(async (language: Language) => {
    if (language === currentLanguage) return;

    // レート制限中の場合は日本語切り替えを無効化
    if (language === 'ja' && translationState.status === 'rate-limited') {
      return;
    }

    setCurrentLanguage(language);

    // 日本語に切り替える場合で、まだ翻訳されていない場合は翻訳を実行
    if (language === 'ja' && !translationState.isTranslated && wordData) {
      await translateToJapanese();
    }
  }, [currentLanguage, translationState.isTranslated, translationState.status, wordData, translateToJapanese]);

  const clearSearch = useCallback(() => {
    setWordData(null);
    setSearchState({ status: 'idle' });
    setTranslationState({
      status: 'idle',
      isTranslated: false
    });
    setCurrentLanguage('en');
  }, []);

  const retryTranslation = useCallback(async () => {
    if (!wordData) return;
    
    setTranslationState({
      status: 'idle',
      isTranslated: false
    });
    
    await translateToJapanese();
  }, [wordData, translateToJapanese]);

  const canTranslateValue = isGeminiApiAvailable() && 
                           !!wordData && 
                           translationState.status !== 'rate-limited';

  return {
    wordData,
    searchState,
    translationState,
    currentLanguage,
    searchDictionary,
    translateToJapanese,
    switchLanguage,
    clearSearch,
    retryTranslation,
    isLoading: searchState.status === 'loading',
    isError: searchState.status === 'error',
    isSuccess: searchState.status === 'success',
    isTranslating: translationState.status === 'translating',
    isTranslationError: translationState.status === 'error',
    isRateLimited: translationState.status === 'rate-limited',
    canTranslate: canTranslateValue,
  };
} 