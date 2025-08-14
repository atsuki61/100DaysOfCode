'use client';

import { useDrawing } from '../hooks/useDrawing';

export default function Toolbar() {
  const { style, setStyle, clear } = useDrawing();
  return (
    <div className="flex items-center gap-3 flex-wrap"> {/* 横並び, 中央寄せ, 間隔, 折返し */}
      <div className="flex items-center gap-2 bg-white border rounded-lg px-3 py-2"> {/* ツールボックス */}
        <label className="text-sm text-gray-600">色</label>
        <input
          type="color"
          value={style.color}
          onChange={(e) => setStyle((s) => ({ ...s, color: e.target.value }))}
          className="w-9 h-9 border rounded"
        />
        <label className="text-sm text-gray-600 ml-3">太さ</label>
        <input
          type="range"
          min={1}
          max={24}
          value={style.width}
          onChange={(e) => setStyle((s) => ({ ...s, width: Number(e.target.value) }))}
        />
        <span className="text-sm text-gray-700 w-8 text-right">{style.width}</span>
      </div>
      <button onClick={clear} className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900 transition-colors"> {/* クリアボタン */}
        クリア
      </button>
    </div>
  );
}


