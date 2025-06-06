'use client';

import { useAnimeQuote } from './components/hooks/useAnimeQuote';

export default function AnimeQuoteGeneratorPage() {
  const { quote, loading, error, getRandomQuote } = useAnimeQuote();

  return (
    <div className="max-w-3xl mx-auto"> {/* 最大幅を少し広げ、よりゆとりのあるレイアウトに */}
      
      {/* 名言表示エリア */}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl p-8 sm:p-12 mb-8 min-h-[400px] flex flex-col justify-center items-center transition-all duration-500"> {/* 半透明背景、ぼかし効果、角丸大、影大、パディング増、最小高さ増 */}
        
        {/* Error State */}
        {error && (
          <div className="text-center">
            <div className="text-red-600 text-lg mb-4"> {/* 赤文字 */}
              <span className="text-3xl mr-2">😥</span> {error}
            </div>
            <button
              onClick={getRandomQuote}
              className="px-6 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors shadow" // ボタンスタイル
            >
              再試行
            </button>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center text-blue-600">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div> {/* スピナー大 */}
            <p className="mt-4 text-lg font-semibold">名言を探しています...</p> {/* ローディングメッセージ */}
          </div>
        )}

        {/* Quote Display State */}
        {!loading && !error && quote && (
          <div className="text-center w-full relative"> {/* 相対配置 */}
            <p className="text-gray-200 text-8xl font-serif absolute -top-4 -left-4 opacity-80 select-none">“</p> {/* 装飾的な引用符 */}
            <blockquote className="text-2xl md:text-3xl font-medium text-gray-800 mb-8 leading-relaxed relative z-10"> {/* 引用文 */}
              {quote.quote}
            </blockquote>
            <div className="text-right w-full mt-4"> {/* 右寄せコンテナ */}
              <p className="text-lg font-semibold text-gray-700">
                — {quote.character}
              </p>
              <p className="text-md text-gray-500 italic">
                『{quote.anime}』
              </p>
            </div>
            <p className="text-gray-200 text-8xl font-serif absolute -bottom-12 -right-4 opacity-80 select-none">”</p> {/* 装飾的な引用符 */}
          </div>
        )}
        
        {/* Initial State */}
        {!loading && !error && !quote && (
          <div className="text-center text-gray-700">
            <div className="text-7xl mb-4">
              🎭
            </div>
            <h2 className="text-2xl font-semibold mb-2">アニメ名言ジェネレーター</h2>
            <p className="text-lg text-gray-600">
              下のボタンを押して、心に残る名言を見つけよう
            </p>
          </div>
        )}
      </div>

      {/* 操作ボタンエリア */}
      <div className="text-center">
        <button
          onClick={getRandomQuote}
          disabled={loading}
          className="px-10 py-4 bg-blue-600 text-white text-xl font-bold rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl" // 大きく、丸いボタンスタイル
        >
          {loading ? '...' : '新しい名言を引く'}
        </button>
      </div>
    </div>
  );
}
