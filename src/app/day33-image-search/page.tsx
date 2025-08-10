'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';

type UnsplashPhoto = {
  id: string;
  alt_description: string | null;
  description: string | null;
  width: number;
  height: number;
  urls: { small: string; regular: string; thumb: string };
  user: { name: string };
};

type UnsplashSearchResponse = {
  total: number;
  total_pages: number;
  results: UnsplashPhoto[];
};

const PAGE_SIZE = 24;

async function searchUnsplash(query: string, page: number, perPage: number): Promise<UnsplashSearchResponse> {
  const accessKey = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;
  if (!accessKey) {
    throw new Error('UNSPLASH_ACCESS_KEY_MISSING');
  }
  const res = await fetch(
    `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&page=${page}&per_page=${perPage}&lang=ja`,
    {
      headers: {
        Authorization: `Client-ID ${accessKey}`,
        'Accept-Language': 'ja',
      },
    },
  );
  if (!res.ok) throw new Error('Failed to fetch');
  return res.json();
}

export default function Day33Page() {
  const [photos, setPhotos] = useState<UnsplashPhoto[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [keyword, setKeyword] = useState('風景');
  const [input, setInput] = useState('風景');
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const canLoadMore = useMemo(() => {
    if (totalPages == null) return true;
    return page <= totalPages;
  }, [page, totalPages]);

  const load = useCallback(async () => {
    if (loading || !keyword || !canLoadMore) return;
    setLoading(true);
    setError(null);
    try {
      const data = await searchUnsplash(keyword, page, PAGE_SIZE);
      setPhotos((prev) => [...prev, ...data.results]);
      setTotalPages(data.total_pages);
      setPage((p) => p + 1);
    } catch (e: unknown) {
      if (e instanceof Error && e.message === 'UNSPLASH_ACCESS_KEY_MISSING') {
        setError('環境変数 NEXT_PUBLIC_UNSPLASH_ACCESS_KEY を設定してください。');
      } else {
        setError('データ取得に失敗しました。再度お試しください。');
      }
    } finally {
      setLoading(false);
    }
  }, [loading, keyword, page, canLoadMore]);

  // 初回ロード
  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 監視してロード
  useEffect(() => {
    if (!sentinelRef.current) return;
    const el = sentinelRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          load();
        }
      },
      { root: null, rootMargin: '400px 0px', threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [load]);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const q = input.trim();
    if (!q) return;
    setPhotos([]);
    setPage(1);
    setTotalPages(null);
    setKeyword(q);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 pb-28"> {/* 最大幅, 中央寄せ, 横余白, フッター分の下余白 */}
      <div className="bg-white rounded-xl shadow p-4 sm:p-6 mt-6"> {/* 白背景, 角丸, 影, パディング可変, 上余白 */}
        <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between"> {/* 縦→横, 余白, アイテム中央, 両端寄せ */}
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="キーワードで画像検索"
            className="w-full sm:w-96 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" // 幅可変, 余白, 枠線, 角丸, フォーカスリング
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors" // 横パディング, 縦パディング, 青背景, 白文字, 角丸, ホバー色
          >
            検索
          </button>
        </form>

        {error && (
          <p className="mt-4 text-sm text-red-600">{error}</p> // 上余白, 小さめ, 赤文字
        )}

        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4"> {/* レスポンシブグリッド */}
          {photos.map((p) => (
            <figure key={p.id} className="group relative overflow-hidden rounded-xl bg-gray-100"> {/* グループ, はみ出し隠し, 角丸, 灰背景 */}
              <Image
                src={p.urls.small}
                alt={p.alt_description ?? p.description ?? 'image'}
                width={400}
                height={400}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" // 全幅/全高, トリミング, ホバー拡大
              />
              <figcaption className="absolute bottom-0 left-0 right-0 bg-black/60 text-white px-2 py-1 sm:px-3 sm:py-2 space-y-0.5"> {/* 下部帯(やや濃い), 白文字, 余白, 縦間隔 */}
                <div className="text-xs sm:text-sm truncate"> {/* 小さめ文字, 省略表示 */}
                  {p.alt_description ?? p.description ?? '写真'}
                </div>
                <div className="text-[10px] sm:text-xs opacity-90"> {/* さらに小さめ, やや薄く */}
                  撮影: {p.user.name}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>

        <div ref={sentinelRef} className="h-10" /> {/* 無限スクロール監視用スペーサ */}

        <div className="flex items-center justify-center mt-4"> {/* 中央寄せ */}
          {loading && <span className="text-sm text-gray-600">読み込み中…</span>} {/* 小さめ, 灰色 */}
          {!loading && totalPages !== null && page > totalPages && (
            <span className="text-sm text-gray-500">これ以上はありません</span> // 小さめ, 灰色
          )}
        </div>
      </div>
    </div>
  );
}


