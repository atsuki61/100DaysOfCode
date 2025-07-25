# Day 25: 現在地マップアプリ

## 概要

このプロジェクトでは、ブラウザのGeolocation APIとReact-Leafletライブラリを使用して、ユーザーの現在地を地図上に表示するシンプルなウェブアプリケーションを作成します。

### 学習目標

- Geolocation APIを用いた現在地情報の取得
- `react-leaflet`ライブラリの基本的な使い方
- Next.jsでのクライアントサイドレンダリングの重要性 (`"use client"` と `dynamic` インポート)

## 技術スタック

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- Leaflet (地図ライブラリ)
- React-Leaflet (LeafletのReactバインディング)

## 実装の詳細

### 1. プロジェクトのセットアップ

まず、新しい日（Day 25）のディレクトリを作成しました。

- `src/app/day25-current-location-map/`

必要なライブラリをインストールします。

```bash
npm install leaflet react-leaflet
npm install -D @types/leaflet
```

### 2. Geolocation API で現在地を取得

ブラウザの `navigator.geolocation` オブジェクトを使用して、ユーザーの現在地（緯度と経度）を取得します。`useEffect` フック内でこのAPIを呼び出し、`useState` で座標を管理します。

```typescript jsx
// src/app/day25-current-location-map/page.tsx
"use client"; // クライアントサイドコンポーネントとして宣言

import { useState, useEffect } from "react";

export default function CurrentLocationMapPage() {
  const [coords, setCoords] = useState<{ latitude: number; longitude: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (navigator.geolocation) {
      // Geolocation APIが利用可能かチェック
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // 成功時のコールバック
          setCoords({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setLoading(false);
        },
        (err) => {
          // エラー時のコールバック
          setError(err.message);
          setLoading(false);
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 } // オプション
      );
    } else {
      setError("Geolocation is not supported by this browser."); // ブラウザが対応していない場合
      setLoading(false);
    }
  }, []); // 初回マウント時のみ実行
  // ... レンダリング部分
}
```

### 3. `react-leaflet` で地図を表示

`react-leaflet` は、LeafletというJavaScriptの地図ライブラリをReactで使いやすくするためのラッパーです。

-   `MapContainer`: 地図全体を囲むコンポーネント。中心座標とズームレベルを設定します。
-   `TileLayer`: 地図のベースとなるタイル画像（OpenStreetMapなど）を設定します。
-   `Marker` & `Popup`: 地図上の特定の場所にマーカーを置き、クリックで情報表示するポップアップを設定します。

**重要な注意点**: `react-leaflet` はブラウザの `window` オブジェクトにアクセスするため、Next.jsのサーバーサイドレンダリング（SSR）環境ではエラーになります。そのため、`dynamic` インポートと `ssr: false` オプションを使って、クライアントサイドでのみレンダリングされるように設定します。

```typescript jsx
// src/app/day25-current-location-map/components/MapDisplay.tsx
"use client"; // クライアントサイドコンポーネントとして宣言

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css"; // LeafletのCSSをインポート

// Leafletのデフォルトアイコン設定 (Next.jsで必要)
import L from "leaflet";
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

interface MapDisplayProps {
  position: [number, number]; // [緯度, 経度]
  zoom?: number; // オプションのズームレベル
}

export default function MapDisplay({ position, zoom = 13 }: MapDisplayProps) {
  return (
    <MapContainer
      center={position} // 地図の中心座標
      zoom={zoom} // ズームレベル
      scrollWheelZoom={false} // スクロールでのズーム無効化
      className="h-full w-full" // 親要素いっぱいに表示
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}> {/* マーカーの設置 */}
        <Popup>現在地</Popup> {/* ポップアップメッセージ */}
      </Marker>
    </MapContainer>
  );
}
```

### 4. Next.js `page.tsx` と `layout.tsx` の設定

-   `layout.tsx`: ページ共通のヘッダー、フッター、背景色などを設定します。
-   `page.tsx`: 取得した現在地情報 (`coords`) を `MapDisplay` コンポーネントに渡し、ローディング状態やエラー表示を管理します。`dynamic` インポートを使って `MapDisplay` がクライアントサイドでのみロードされるようにします。

```typescript jsx
// src/app/day25-current-location-map/page.tsx (抜粋)
const MapDisplay = dynamic(
  () => import("./components/MapDisplay"),
  { ssr: false } // ここが重要！
);
// ...
```

### 5. ホームページとフッターの更新

最後に、新しいDay 25のアプリがホームページに表示され、フッターのナビゲーションで前後の日へ移動できるように、`src/app/page.tsx` と `src/components/common/Footer.tsx` を更新します。

これにより、ユーザーはチャレンジ全体の進捗を把握しやすくなります。
