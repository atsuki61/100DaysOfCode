'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';

type Photo = {
  id: string;
  author: string;
  width: number;
  height: number;
  download_url: string;
};

const PAGE_SIZE = 18;

async function fetchPhotos(page: number): Promise<Photo[]> {
  const res = await fetch(`https://picsum.photos/v2/list?page=${page}&limit=${PAGE_SIZE}`);
  if (!res.ok) throw new Error('Failed to fetch');
  return res.json();
}

export default function Day33Page() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const canLoadMore = useRef(true);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return photos;
    return photos.filter((p) => p.author.toLowerCase().includes(q));
  }, [photos, query]);

  const load = useCallback(async () => {
    if (loading || !canLoadMore.current) return;
    setLoading(true);
    setError(null);
    try {
      const data = await fetchPhotos(page);
      if (data.length === 0) {
        canLoadMore.current = false;
      } else {
        setPhotos((prev) => [...prev, ...data]);
        setPage((p) => p + 1);
      }
    } catch (e) {
      setError('データ取得に失敗しました。再度お試しください。');
    } finally {
      setLoading(false);
    }
  }, [loading, page]);

  useEffect(() => {
    // 初回ロード
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  return (
    <div className="max-w-7xl mx-auto px-4 pb-28"> {/* 最大幅, 中央寄せ, 横余白, フッター分の下余白 */}
      <div className="bg-white rounded-xl shadow p-4 sm:p-6 mt-6"> {/* 白背景, 角丸, 影, パディング可変, 上余白 */}
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between"> {/* 縦→横, 余白, アイテム中央, 両端寄せ */}
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="著者名でフィルタ"
            className="w-full sm:w-80 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" // 幅可変, 余白, 枠線, 角丸, フォーカスリング
          />
          <div className="text-sm text-gray-500"> {/* 小さめ文字, 灰色 */}
            {filtered.length} / {photos.length}
          </div>
        </div>

        {error && (
          <p className="mt-4 text-sm text-red-600">{error}</p> // 上余白, 小さめ, 赤文字
        )}

        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4"> {/* レスポンシブグリッド */}
          {filtered.map((p) => (
            <figure key={p.id} className="group relative overflow-hidden rounded-xl bg-gray-100"> {/* グループ, はみ出し隠し, 角丸, 灰背景 */}
              <Image
                src={`https://picsum.photos/id/${p.id}/400/400`}
                alt={p.author}
                width={400}
                height={400}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" // 全幅/全高, トリミング, ホバー拡大
              />
              <figcaption className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs sm:text-sm px-2 py-1 sm:px-3 sm:py-1.5"> {/* 下部帯, 半透明黒, 白文字, 小さめ, 余白 */}
                {p.author}
              </figcaption>
            </figure>
          ))}
        </div>

        <div ref={sentinelRef} className="h-10" /> {/* 無限スクロール監視用スペーサ */}

        <div className="flex items-center justify-center mt-4"> {/* 中央寄せ */}
          {loading && <span className="text-sm text-gray-600">読み込み中…</span>} {/* 小さめ, 灰色 */}
          {!loading && !canLoadMore.current && (
            <span className="text-sm text-gray-500">これ以上はありません</span> // 小さめ, 灰色
          )}
        </div>
      </div>
    </div>
  );
}


