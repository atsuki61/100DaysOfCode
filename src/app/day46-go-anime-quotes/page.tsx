"use client";

import { useCallback, useEffect, useState } from "react";

type AnimeQuote = {
  anime: string;
  character: string;
  quote: string;
};

export default function Day46Page() {
  const [quote, setQuote] = useState<AnimeQuote | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchQuote = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // キャッシュを無効化して毎回新しい名言を取得
      const res = await fetch("/api/day46-quotes", {
        cache: 'no-store',
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = (await res.json()) as unknown;

      if (
        typeof json === "object" &&
        json !== null &&
        "anime" in json &&
        typeof (json as Record<string, unknown>).anime === "string" &&
        "character" in json &&
        typeof (json as Record<string, unknown>).character === "string" &&
        "quote" in json &&
        typeof (json as Record<string, unknown>).quote === "string"
      ) {
        const q = json as AnimeQuote;
        setQuote({ anime: q.anime, character: q.character, quote: q.quote });
      } else {
        throw new Error("Unexpected response shape");
      }
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchQuote();
  }, [fetchQuote]);

  return (
    <div className="max-w-2xl mx-auto px-4 pb-24"> {/* 最大幅, 中央寄せ, 横パディング, 下余白でフッターと間隔 */}
      <section className="bg-white rounded-xl shadow p-6 space-y-6"> {/* 白背景, 角丸, 影, 余白, 縦間隔 */}
        <div className="flex items-center justify-between"> {/* 横並び, 垂直中央, 両端寄せ */}
          <h2 className="text-xl font-semibold"> {/* 中見出し, 太字 */}
            ランダム名言
          </h2>
          {/* ボタン基本, ホバー, 無効時半透明 */}
          <button
            onClick={fetchQuote}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "取得中..." : "名言を取得"}
          </button>
        </div>

        {error && (
          <p className="text-red-600">エラー: {error}</p>
        )}

        {quote && (
          <div className="space-y-2"> {/* 縦間隔 */}
            <blockquote className="bg-gray-50 border-l-4 border-blue-500 p-4 rounded"> {/* 引用風, 左線, 余白, 角丸 */}
              <p className="text-lg text-gray-800">“{quote.quote}”</p>
            </blockquote>
            <div className="text-sm text-gray-600"> {/* 小さめ文字, グレー */}
              <span className="mr-3">アニメ: <span className="font-medium">{quote.anime}</span></span>
              <span>キャラ: <span className="font-medium">{quote.character}</span></span>
            </div>
          </div>
        )}

        {!loading && !error && !quote && (
          <p className="text-gray-600">名言を読み込めませんでした。</p>
        )}
      </section>
    </div>
  );
}


