"use client";

import { useEffect, useState } from "react";

type HelloResponse = {
  message: string;
};

export default function Day41Page() {
  const [data, setData] = useState<HelloResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchHello = async () => {
      setLoading(true);
      setError(null);
      try {
        // CORS回避のため、Next.js API経由でGoサーバーへプロキシ
        const res = await fetch("/api/day41-hello");
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        const json = (await res.json()) as unknown;
        // 型ガード
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
        if (e instanceof Error) setError(e.message);
        else setError("Unknown error");
      } finally {
        setLoading(false);
      }
    };

    void fetchHello();
  }, []);

  return (
    <div className="max-w-2xl mx-auto px-4 pb-24"> {/* 中央寄せ, 横パディング, 下部余白でFooterと重なり回避 */}
      <section className="bg-white rounded-xl shadow p-6"> {/* 白背景, 角丸, 影, 余白 */}
        <h2 className="text-xl font-semibold mb-4"> {/* 中見出し */}
          Goサーバーからのレスポンス
        </h2>

        {loading && (
          <p className="text-gray-600">読み込み中...</p>
        )}

        {error && (
          <p className="text-red-600">エラー: {error}</p>
        )}

        {data && (
          <div className="space-y-2"> {/* 縦間隔 */}
            <p className="text-gray-800">メッセージ:</p>
            <pre className="bg-gray-50 p-3 rounded border text-sm overflow-x-auto"> {/* 背景, 余白, 角丸, 枠線, 小さめ文字 */}
{JSON.stringify(data, null, 2)}
            </pre>
          </div>
        )}

        {!loading && !error && !data && (
          <p className="text-gray-600">Goサーバーが起動していない可能性があります。http://localhost:8080/hello を確認してください。</p>
        )}
      </section>
    </div>
  );
}



