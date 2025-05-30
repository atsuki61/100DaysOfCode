/**
 * Day 7: 単語フラッシュカードアプリ（学習進捗管理機能付き）
 * 
 * 機能概要:
 * - TOEIC頻出単語のフラッシュカード表示
 * - クリックで英単語と日本語意味を切り替え
 * - 覚えた・覚えてないの学習状態管理
 * - 復習モード（覚えてない単語のみ表示）
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
  const [filterMode, setFilterMode] = useState<'all' | 'need_review'>('all'); // フィルターモード

  // === フィルタリングされた単語リスト ===
  const filteredWords = useMemo(() => {
    if (filterMode === 'need_review') {
      return words.filter(word => word.learningStatus === 'need_review');
    }
    return words;
  }, [words, filterMode]);

  // === 学習統計の計算 ===
  const learningStats: LearningStats = useMemo(() => {
    const total = words.length;
    const learned = words.filter(word => word.learningStatus === 'learned').length;
    const needReview = words.filter(word => word.learningStatus === 'need_review').length;
    const notStudied = words.filter(word => word.learningStatus === 'not_studied').length;
    
    return { total, learned, needReview, notStudied };
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
  const handleFilterChange = (mode: 'all' | 'need_review') => {
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
            handleStatusChange('learned');
          }
          break;
        case 'Digit2':
          if (isRevealed) {
            event.preventDefault();
            handleStatusChange('need_review');
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
          title="TOEIC 単語フラッシュカード"
          description="復習が必要な単語はありません！"
          className="mb-8"
        />
        <div className="bg-white rounded-lg p-8 text-center shadow-md">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-green-600 mb-4">おめでとうございます！</h2>
          <p className="text-gray-600 mb-6">すべての単語を覚えました。</p>
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
        title="TOEIC 単語フラッシュカード"
        description={`${filterMode === 'all' ? '全ての単語' : '復習モード'} - クリックで意味を確認`}
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
        
        {/* 現在のカード表示 */}
        <FlashCard
          word={currentWord}
          isRevealed={isRevealed}
          onCardClick={handleCardClick}
        />

        {/* 学習状態選択ボタン */}
        <LearningButtons
          currentStatus={currentWord.learningStatus}
          onStatusChange={handleStatusChange}
          isRevealed={isRevealed}
        />

        {/* ナビゲーションコントロール */}
        <NavigationControls
          currentIndex={currentIndex}
          totalCards={filteredWords.length}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onShuffle={handleShuffle}
        />

        {/* 操作ガイド */}
        <div className="bg-white rounded-lg p-4 shadow-md">
          <h3 className="text-lg font-semibold mb-3 text-gray-800">📖 操作方法</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-600">
            <div>• <strong>スペースキー:</strong> カードを裏返す</div>
            <div>• <strong>1キー:</strong> 覚えた（裏面時）</div>
            <div>• <strong>2キー:</strong> 要復習（裏面時）</div>
            <div>• <strong>←/→ キー:</strong> 前/次のカードへ</div>
            <div>• <strong>クリック:</strong> カードを裏返す</div>
            <div>• <strong>Ctrl+S:</strong> カードをシャッフル</div>
          </div>
        </div>

        {/* 学習統計 */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-3 text-gray-800">📊 学習統計</h3>
          <div className="grid grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600">{learningStats.total}</div>
              <div className="text-sm text-gray-600">総数</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">{learningStats.learned}</div>
              <div className="text-sm text-gray-600">習得済み</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-600">{learningStats.needReview}</div>
              <div className="text-sm text-gray-600">要復習</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-600">{learningStats.notStudied}</div>
              <div className="text-sm text-gray-600">未学習</div>
            </div>
          </div>
          <div className="mt-3 text-center">
            <div className="text-sm text-gray-600">
              習得率: <span className="font-bold text-green-600">
                {Math.round((learningStats.learned / learningStats.total) * 100)}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
