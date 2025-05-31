/**
 * Day 7: 単語フラッシュカードアプリ（学習進捗管理機能付き）
 * 
 * 機能概要:
 * - 銀フレTOEIC単語のフラッシュカード表示
 * - クリックで英単語と日本語意味を切り替え
 * - 覚えた・学習中の学習状態管理
 * - 学習中モード（学習中の単語のみ表示）
 * - 前後ナビゲーション機能
 * - カードシャッフル機能
 * - 進捗・統計表示
 * - キーボード操作対応（スペースキー、矢印キー）
 * 
 * 技術ポイント:
 * - useState による複数状態管理（フィルターモード、学習統計）
 * - 配列フィルタリング（学習状態に基づく表示制御）
 * - 学習データの永続化準備
 * - リアルタイム統計計算
 */
'use client';

import { useState, useEffect, useMemo } from 'react';
import PageHeader from '../../components/common/PageHeader';
import { FlashCard, NavigationControls, LearningButtons, FilterControls } from './components';
import { toeicWords } from './data/words';
import { WordCard, LearningStatus, LearningStats } from './types';

export default function FlashcardPage() {
  // === 状態管理 ===
  const [words, setWords] = useState<WordCard[]>(toeicWords); // 単語データ
  const [currentIndex, setCurrentIndex] = useState(0); // 現在表示中のカードインデックス
  const [isRevealed, setIsRevealed] = useState(false); // カードの裏面表示状態
  const [filterMode, setFilterMode] = useState<'all' | 'studying'>('all'); // フィルターモード

  // === フィルタリングされた単語リスト ===
  const filteredWords = useMemo(() => {
    if (filterMode === 'studying') {
      return words.filter(word => word.learningStatus === 'studying');
    }
    return words;
  }, [words, filterMode]);

  // === 学習統計の計算 ===
  const learningStats: LearningStats = useMemo(() => {
    const total = words.length;
    const mastered = words.filter(word => word.learningStatus === 'mastered').length;
    const studying = words.filter(word => word.learningStatus === 'studying').length;
    const notStudied = words.filter(word => word.learningStatus === 'not_studied').length;
    
    return { total, mastered, studying, notStudied };
  }, [words]);

  // === フィルター変更時の処理 ===
  useEffect(() => {
    // フィルターモード変更時、インデックスをリセット
    setCurrentIndex(0);
    setIsRevealed(false);
  }, [filterMode]);

  // === 単語の学習状態更新 ===
  const updateWordStatus = (wordId: number, status: LearningStatus) => {
    setWords(prevWords =>
      prevWords.map(word =>
        word.id === wordId ? { ...word, learningStatus: status } : word
      )
    );
  };

  // === カード操作関数 ===
  const handleCardClick = () => {
    setIsRevealed(!isRevealed);
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsRevealed(false);
    }
  };

  const handleNext = () => {
    if (currentIndex < filteredWords.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsRevealed(false);
    }
  };

  // === シャッフル機能 ===
  const handleShuffle = () => {
    const shuffledWords = [...words];
    for (let i = shuffledWords.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledWords[i], shuffledWords[j]] = [shuffledWords[j], shuffledWords[i]];
    }
    setWords(shuffledWords);
    setCurrentIndex(0);
    setIsRevealed(false);
  };

  // === フィルターモード切り替え ===
  const handleFilterChange = (mode: 'all' | 'studying') => {
    setFilterMode(mode);
  };

  // === 学習状態変更 ===
  const handleStatusChange = (status: LearningStatus) => {
    const currentWord = filteredWords[currentIndex];
    updateWordStatus(currentWord.id, status);
  };

  // === キーボード操作 ===
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.code) {
        case 'Space':
          event.preventDefault();
          handleCardClick();
          break;
        case 'ArrowLeft':
          event.preventDefault();
          handlePrevious();
          break;
        case 'ArrowRight':
          event.preventDefault();
          handleNext();
          break;
        case 'KeyS':
          if (event.ctrlKey || event.metaKey) {
            event.preventDefault();
            handleShuffle();
          }
          break;
        case 'Digit1':
          if (isRevealed) {
            event.preventDefault();
            handleStatusChange('mastered');
          }
          break;
        case 'Digit2':
          if (isRevealed) {
            event.preventDefault();
            handleStatusChange('studying');
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentIndex, filteredWords.length, isRevealed]);

  // 表示する単語がない場合の処理
  if (filteredWords.length === 0) {
    return (
      <div className="w-full max-w-2xl mx-auto">
        <PageHeader
          icon="📚"
          title="銀フレ 単語フラッシュカード"
          description="学習中の単語はありません！"
          className="mb-8"
        />
        <div className="bg-white rounded-lg p-8 text-center shadow-md">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-green-600 mb-4">おめでとうございます！</h2>
          <p className="text-gray-600 mb-6">学習中の単語がありません。</p>
          <button
            onClick={() => setFilterMode('all')}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600"
          >
            全ての単語に戻る
          </button>
        </div>
      </div>
    );
  }

  const currentWord = filteredWords[currentIndex];

  return (
    <div className="w-full max-w-2xl mx-auto">
      
      {/* ページヘッダー */}
      <PageHeader
        icon="📚"
        title="銀フレ 単語フラッシュカード"
        description={`${filterMode === 'all' ? '全ての単語' : '学習中モード'} - クリックで意味を確認`}
        className="mb-8"
      />

      {/* フィルターコントロール */}
      <FilterControls
        filterMode={filterMode}
        onFilterChange={handleFilterChange}
        stats={learningStats}
      />

      {/* フラッシュカードメインエリア */}
      <div className="space-y-6">
        {/* フラッシュカード */}
        <FlashCard
          word={currentWord}
          isRevealed={isRevealed}
          onCardClick={handleCardClick}
        />

        {/* ナビゲーションコントロール */}
        <NavigationControls
          currentIndex={currentIndex}
          totalCards={filteredWords.length}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onShuffle={handleShuffle}
        />

        {/* 学習ボタン（意味表示時のみ） */}
        {isRevealed && (
          <LearningButtons
            onStatusChange={handleStatusChange}
          />
        )}
      </div>

      {/* キーボードショートカット説明 */}
      <div className="mt-8 bg-gray-50 rounded-lg p-4"> {/* 上マージン8, 薄灰背景, 角丸, パディング4 */}
        <h3 className="text-sm font-semibold text-gray-700 mb-2">キーボードショートカット:</h3> {/* 小文字, 太字, 濃灰文字, 下マージン2 */}
        <div className="grid grid-cols-2 gap-2 text-xs text-gray-600"> {/* グリッド2列, 間隔2, 極小文字, 薄灰文字 */}
          <div>スペース: カード反転</div>
          <div>←/→: 前後移動</div>
          <div>1: マスター済み</div>
          <div>2: 学習中</div>
        </div>
      </div>
    </div>
  );
}
