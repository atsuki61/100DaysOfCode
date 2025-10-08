"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";

type VirtualListProps<T> = {
  items: T[];
  itemHeight: number; // px の固定高さ
  height: number; // コンテナ高さ(px)
  overscan?: number; // 先読み行数
  renderItem: (item: T, index: number) => ReactNode;
};

export default function VirtualList<T>({
  items,
  itemHeight,
  height,
  overscan = 8,
  renderItem,
}: VirtualListProps<T>) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [scrollTop, setScrollTop] = useState(0);

  const totalHeight = items.length * itemHeight;
  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
  const viewportCount = Math.ceil(height / itemHeight) + overscan * 2;
  const endIndex = Math.min(items.length, startIndex + viewportCount);

  const visibleItems = useMemo(() => items.slice(startIndex, endIndex), [items, startIndex, endIndex]);
  const offsetY = startIndex * itemHeight;

  const onScroll = useCallback(() => {
    if (!containerRef.current) return;
    setScrollTop(containerRef.current.scrollTop);
  }, []);

  return (
    <div
      ref={containerRef}
      onScroll={onScroll}
      className="w-full overflow-auto rounded-lg border border-slate-200 bg-white dark:bg-gray-900 dark:border-gray-700"
      style={{ height }}
    >
      <div style={{ height: totalHeight, position: "relative" }}>
        <div style={{ position: "absolute", top: offsetY, left: 0, right: 0 }}>
          {visibleItems.map((item, i) => {
            const index = startIndex + i;
            return (
              <div key={index} style={{ height: itemHeight }} className="border-b border-slate-100 dark:border-gray-800">
                {renderItem(item, index)}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}


