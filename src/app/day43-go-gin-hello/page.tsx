"use client";

import { useEffect, useState } from "react";

type Hello = { message: string };

export default function Day43Page() {
  const [data, setData] = useState<Hello | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchHello = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/day43-hello");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = (await res.json()) as unknown;
        // 型ガード: { message: string }
        if (
          typeof json === "object" &&
          json !== null &&
          "message" in json &&
          typeof (json as Record<string, unknown>).message === "string"
        ) {
          setData({ message: (json as Record<string, string>).message });
        } else {
          throw new Error("Unexpected response shape");
        }
      } catch (e: unknown) {
        setError(e instanceof Error ? e.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    void fetchHello();
  }, []);

  return (
    <div className="max-w-2xl mx-auto px-4 pb-24"> {/* 中央寄せ, 横パディング, 下部余白 */}
      <section className="bg-white rounded-xl shadow p-6"> {/* 白背景, 角丸, 影, 余白 */}
        <h2 className="text-xl font-semibold mb-4">Go (Gin) の Hello レスポンス</h2>

        {loading && <p className="text-gray-600">読み込み中...</p>}
        {error && <p className="text-red-600">エラー: {error}</p>}

        {data && (
          <pre className="bg-gray-50 p-3 rounded border text-sm overflow-x-auto">{/* 背景, 余白, 角丸, 枠線 */}
{JSON.stringify(data, null, 2)}
          </pre>
        )}

        {!loading && !error && !data && (
          <p className="text-gray-600">ローカルの Gin サーバーが未起動の可能性があります。</p>
        )}
      </section>
    </div>
  );
}


