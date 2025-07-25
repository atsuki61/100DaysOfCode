"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // shadcn/uiのCardコンポーネントをインポート

// SSRを無効にしてMapDisplayコンポーネントを動的にインポート
const MapDisplay = dynamic(
  () => import("./components/MapDisplay"),
  { ssr: false }
);

export default function CurrentLocationMapPage() {
  const [coords, setCoords] = useState<{ latitude: number; longitude: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoords({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setLoading(false);
        },
        (err) => {
          setError(err.message);
          setLoading(false);
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
      setLoading(false);
    }
  }, []);

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg rounded-lg"> {/* カード全体のスタイル */}
      <CardHeader className="text-center bg-blue-500 text-white p-4 rounded-t-lg"> {/* カードヘッダーのスタイル */}
        <CardTitle className="text-2xl font-bold"> {/* カードタイトルのスタイル */}
          現在地マップ
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6"> {/* カードコンテンツのスタイル */}
        {loading && <p className="text-center text-gray-600">現在地を取得中...</p>} {/* ロード中のテキスト */}
        {error && <p className="text-center text-red-500">エラー: {error}</p>} {/* エラーメッセージ */}
        {coords && (
          <div className="space-y-4"> {/* コンテンツ間のスペース */}
            <p className="text-lg font-semibold text-gray-800"> {/* 座標テキストのスタイル */}
              緯度: {coords.latitude.toFixed(6)}, 経度: {coords.longitude.toFixed(6)}
            </p>
            <div className="h-96 w-full rounded-md overflow-hidden border border-gray-300 shadow-md"> {/* 地図コンテナのスタイル */}
              <MapDisplay position={[coords.latitude, coords.longitude]} />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
