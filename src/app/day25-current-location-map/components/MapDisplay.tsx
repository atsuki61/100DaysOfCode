"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Leafletのデフォルトアイコン設定
import L from "leaflet";

// アイコンのURLを設定する正しい方法
L.Marker.prototype.options.icon = L.icon({
  iconUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
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