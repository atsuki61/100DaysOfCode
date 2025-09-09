"use client";

import { useEffect, useState } from "react";

type Item = { id: number; name: string };
type Day42Response = { title: string; items: Item[] };

export default function Day42Page() {
  const [data, setData] = useState<Day42Response | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/day42-data");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = (await res.json()) as unknown;
        // 型ガード
        if (
          typeof json === "object" &&
          json !== null &&
          "title" in json &&
          typeof (json as Record<string, unknown>).title === "string" &&
          "items" in json &&
          Array.isArray((json as Record<string, unknown>).items)
        ) {
          const { title, items } = json as { title: string; items: unknown[] };
          const validItems: Item[] = items.filter(
            (it: unknown): it is Item =>
              typeof it === "object" &&
              it !== null &&
              "id" in it &&
              typeof (it as Record<string, unknown>).id === "number" &&
              "name" in it &&
              typeof (it as Record<string, unknown>).name === "string"
          );
          setData({ title, items: validItems });
        } else {
          throw new Error("Unexpected response shape");
        }
      } catch (e: unknown) {
        setError(e instanceof Error ? e.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    void fetchData();
  }, []);

  return (
    <div className="max-w-2xl mx-auto px-4 pb-24"> {/* 中央寄せ, 横パディング, 下部余白 */}
      <section className="bg-white rounded-xl shadow p-6"> {/* 白背景, 角丸, 影, 余白 */}
        <h2 className="text-xl font-semibold mb-4"> {/* 中見出し */}
          Day42: Go JSON API のレスポンス
        </h2>

        {loading && <p className="text-gray-600">読み込み中...</p>}
        {error && <p className="text-red-600">エラー: {error}</p>}

        {data && (
          <div className="space-y-3"> {/* 縦間隔 */}
            <p className="text-gray-800">タイトル: {data.title}</p>
            <ul className="list-disc pl-5 space-y-1"> {/* 箇条書き, 左パディング, 縦間隔 */}
              {data.items.map((it) => (
                <li key={it.id} className="text-gray-700"> {/* グレー文字 */}
                  {it.id}. {it.name}
                </li>
              ))}
            </ul>
          </div>
        )}

        {!loading && !error && !data && (
          <p className="text-gray-600">APIの応答が取得できませんでした。</p>
        )}
      </section>
    </div>
  );
}


