"use client";

import { useMemo, useState } from "react";
import VirtualList from "./components/VirtualList";

type Row = { id: number; title: string; desc: string };

export default function Day48VirtualListPage() {
  const [count] = useState(10000);
  const rows = useMemo<Row[]>(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i + 1,
      title: `アイテム #${i + 1}`,
      desc: `仮想レンダリングのデモ行です。インデックス: ${i + 1}`,
    }));
  }, [count]);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4">
      <Controls />
      <VirtualList<Row>
        items={rows}
        itemHeight={56}
        height={520}
        overscan={10}
        renderItem={(item) => (
          <div className="px-4 flex items-center justify-between"> {/* 横パディング, 高さ固定の行 */}
            <div>
              <div className="text-sm font-semibold text-gray-800 dark:text-gray-100">{item.title}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">{item.desc}</div>
            </div>
            <span className="text-[10px] px-2 py-1 rounded bg-slate-100 dark:bg-gray-800 text-slate-600 dark:text-gray-300">{/* 小さなバッジ */}
              ID: {item.id}
            </span>
          </div>
        )}
      />
    </div>
  );
}

function Controls() {
  return (
    <div className="mb-2 text-xs text-gray-600 dark:text-gray-300">{/* 下マージン, 小サイズ, 補足テキスト */}
      スクロールして可視領域のみが描画されることを確認してください。
    </div>
  );
}


