"use client";

import { useEffect, useState } from "react";

type User = { id: number; name: string };
type SearchResult = { q: string; count: number };

export default function Day44Page() {
  const [user, setUser] = useState<User | null>(null);
  const [search, setSearch] = useState<SearchResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const run = async () => {
      setLoading(true);
      setError(null);
      try {
        const [uRes, sRes] = await Promise.all([
          fetch("/api/day44-users/123"),
          fetch("/api/day44-search?q=hello"),
        ]);
        if (!uRes.ok) throw new Error(`user HTTP ${uRes.status}`);
        if (!sRes.ok) throw new Error(`search HTTP ${sRes.status}`);

        const uJson = (await uRes.json()) as unknown;
        const sJson = (await sRes.json()) as unknown;

        if (
          typeof uJson === "object" &&
          uJson !== null &&
          "id" in uJson &&
          typeof (uJson as Record<string, unknown>).id === "number" &&
          "name" in uJson &&
          typeof (uJson as Record<string, unknown>).name === "string"
        ) {
          setUser({ id: (uJson as { id: number }).id, name: (uJson as { name: string }).name });
        } else {
          throw new Error("Unexpected user shape");
        }

        if (
          typeof sJson === "object" &&
          sJson !== null &&
          "q" in sJson &&
          typeof (sJson as Record<string, unknown>).q === "string" &&
          "count" in sJson &&
          typeof (sJson as Record<string, unknown>).count === "number"
        ) {
          setSearch({ q: (sJson as { q: string }).q, count: (sJson as { count: number }).count });
        } else {
          throw new Error("Unexpected search shape");
        }
      } catch (e: unknown) {
        setError(e instanceof Error ? e.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };
    void run();
  }, []);

  return (
    <div className="max-w-2xl mx-auto px-4 pb-24"> {/* 中央寄せ, 横パディング, 下部余白 */}
      <section className="bg-white rounded-xl shadow p-6 space-y-6"> {/* 白背景, 角丸, 影, 余白, 縦間隔 */}
        <h2 className="text-xl font-semibold">パス/クエリパラメータの結果</h2>

        {loading && <p className="text-gray-600">読み込み中...</p>}
        {error && <p className="text-red-600">エラー: {error}</p>}

        {user && (
          <div>
            <p className="text-gray-800">ユーザー</p>
            <pre className="bg-gray-50 p-3 rounded border text-sm overflow-x-auto">{JSON.stringify(user, null, 2)}</pre>
          </div>
        )}

        {search && (
          <div>
            <p className="text-gray-800">検索</p>
            <pre className="bg-gray-50 p-3 rounded border text-sm overflow-x-auto">{JSON.stringify(search, null, 2)}</pre>
          </div>
        )}
      </section>
    </div>
  );
}


