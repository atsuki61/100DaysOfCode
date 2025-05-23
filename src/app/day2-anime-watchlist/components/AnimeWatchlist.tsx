'use client'

import { useState } from 'react'

// アニメの型定義
interface Anime {
  id: number
  title: string
  genre: string
  year: number
  episodes: number
  watched: boolean
}

// 初期アニメデータ
const initialAnimeList: Anime[] = [
  { id: 1, title: '鬼滅の刃', genre: 'アクション', year: 2019, episodes: 26, watched: false },
  { id: 2, title: '呪術廻戦', genre: 'アクション', year: 2020, episodes: 24, watched: false },
  { id: 3, title: '進撃の巨人', genre: 'アクション', year: 2013, episodes: 25, watched: true },
  { id: 4, title: 'ワンピース', genre: 'アドベンチャー', year: 1999, episodes: 1000, watched: false },
  { id: 5, title: '君の名は。', genre: 'ロマンス', year: 2016, episodes: 1, watched: true },
  { id: 6, title: 'スパイファミリー', genre: 'コメディ', year: 2022, episodes: 12, watched: false },
  { id: 7, title: '東京リベンジャーズ', genre: 'アクション', year: 2021, episodes: 24, watched: false },
  { id: 8, title: 'チェンソーマン', genre: 'アクション', year: 2022, episodes: 12, watched: false },
  { id: 9, title: 'アニメ映画「すずめの戸締まり」', genre: 'アドベンチャー', year: 2022, episodes: 1, watched: true },
  { id: 10, title: '僕のヒーローアカデミア', genre: 'アクション', year: 2016, episodes: 138, watched: false },
]

export default function AnimeWatchlist() {
  const [animeList, setAnimeList] = useState<Anime[]>(initialAnimeList)

  // 視聴済み状態を切り替える関数
  const toggleWatched = (id: number) => {//idはアニメのid
    setAnimeList(prevList =>//prevListはアニメリストの前の状態
      prevList.map(anime =>//animeはアニメリストの各アニメ
        anime.id === id ? { ...anime, watched: !anime.watched } : anime//idが一致するアニメのwatchedを切り替える
      )
    )
  }

  // 統計情報を計算
  const totalAnime = animeList.length//totalAnimeはアニメリストの総数
  const watchedCount = animeList.filter(anime => anime.watched).length//watchedCountは視聴済みのアニメの数
  const watchedPercentage = Math.round((watchedCount / totalAnime) * 100)//watchedPercentageは視聴率

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl"> {/* コンテナ, 中央寄せ, パディング, 最大幅制限 */}
      {/* ヘッダー部分 */}
      <div className="text-center mb-8"> {/* 中央寄せ, 下マージン */}
        <h2 className="text-3xl font-bold text-gray-800 mb-4"> {/* 大きい文字, 太字, 濃いグレー文字 */}
          🎬 アニメ視聴リスト
        </h2>
        <div className="bg-white rounded-lg shadow-md p-6"> {/* 白背景, 角丸, 影, パディング */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center"> {/* グリッドレイアウト, レスポンシブ列数, 間隔, 中央寄せ */}
            <div className="p-4 bg-purple-50 rounded-lg"> {/* パディング, 紫背景, 角丸 */}
              <div className="text-2xl font-bold text-purple-800">{totalAnime}</div> {/* 大きい文字, 太字, 紫文字 */}
              <div className="text-sm text-gray-600">総作品数</div> {/* 小さい文字, グレー文字 */}
            </div>
            <div className="p-4 bg-green-50 rounded-lg"> {/* パディング, 緑背景, 角丸 */}
              <div className="text-2xl font-bold text-green-800">{watchedCount}</div> {/* 大きい文字, 太字, 緑文字 */}
              <div className="text-sm text-gray-600">視聴済み</div> {/* 小さい文字, グレー文字 */}
            </div>
            <div className="p-4 bg-blue-50 rounded-lg"> {/* パディング, 青背景, 角丸 */}
              <div className="text-2xl font-bold text-blue-800">{watchedPercentage}%</div> {/* 大きい文字, 太字, 青文字 */}
              <div className="text-sm text-gray-600">視聴率</div> {/* 小さい文字, グレー文字 */}
            </div>
          </div>
        </div>
      </div>

      {/* アニメリスト */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"> {/* グリッドレイアウト, レスポンシブ列数, 間隔 */}
        {animeList.map(anime => (
          <div
            key={anime.id}
            className={`bg-white rounded-lg shadow-md p-6 transition-all duration-200 hover:shadow-lg border-l-4 ${
              anime.watched 
                ? 'border-l-green-500 bg-green-50' 
                : 'border-l-gray-300 hover:border-l-purple-400'
            }`} /* 白背景, 角丸, 影, パディング, 変化アニメーション, ホバー効果, 左境界線, 条件付きスタイル */
          >
            <div className="flex items-start justify-between mb-3"> {/* フレックス, 上寄せ, 両端寄せ, 下マージン */}
              <div className="flex-1"> {/* フレックス成長 */}
                <h3 className="text-lg font-semibold text-gray-800 mb-1"> {/* 大きい文字, 太字, 濃いグレー */}
                  {anime.title}
                </h3>
                <div className="flex flex-wrap gap-2 mb-2"> {/* フレックス, 折り返し, 間隔, 下マージン */}
                  <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full"> {/* 小パディング, 紫背景, 紫文字, 極小文字, 完全角丸 */}
                    {anime.genre}
                  </span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"> {/* 小パディング, グレー背景, グレー文字, 極小文字, 完全角丸 */}
                    {anime.year}年
                  </span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"> {/* 小パディング, 青背景, 青文字, 極小文字, 完全角丸 */}
                    {anime.episodes}話
                  </span>
                </div>
              </div>
              <label className="flex items-center cursor-pointer ml-4"> {/* フレックス, アイテム中央寄せ, ポインターカーソル, 左マージン */}
                <input
                  type="checkbox"
                  checked={anime.watched}
                  onChange={() => toggleWatched(anime.id)}
                  className="sr-only" // スクリーンリーダー専用（視覚的には隠す）
                />
                <div className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${
                  anime.watched
                    ? 'bg-green-500 border-green-500'
                    : 'bg-white border-gray-300 hover:border-green-400'
                }`}> {/* 幅高さ6, 角丸, 境界線2, フレックス中央寄せ, 色変化アニメーション, 条件付きスタイル */}
                  {anime.watched && (
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20"> {/* アイコンサイズ, 白色 */}
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <span className="ml-2 text-sm text-gray-600"> {/* 左マージン, 小さい文字, グレー文字 */}
                  {anime.watched ? '視聴済み' : '未視聴'}
                </span>
              </label>
            </div>
          </div>
        ))}
      </div>

      {/* フッター */}
      <div className="text-center mt-8 text-gray-600"> {/* 中央寄せ, 上マージン, グレー文字 */}
        <p className="text-sm">チェックボックスをクリックして視聴状況を更新できます。</p> {/* 小さい文字 */}
      </div>
    </div>
  )
} 