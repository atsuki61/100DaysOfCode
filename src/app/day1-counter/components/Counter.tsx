'use client';
import { useState } from 'react'; // 状態管理に使う useState を読み込む
//コンポーネント本体を定義
export default function Counter() {
  // count: 現在の数値、setCount: 更新用関数
  const [count, setCount] = useState(0);

  return (
    //テキスト中央揃え　ボタン縦に1remの隙間
    <div className="text-center space-y-4">
      {/* サイズ5倍　黒文字　太字*/}
      <h2 className="text-5xl text-black font-bold">{count}</h2>
      {/*ボタン同士を横方向に0.5rem 離す */}
      <div className="space-x-2">
        <button
          className="px-4 py-2 bg-red-500 text-white rounded" //縦余白4.横2.赤色、白文字、角を丸く。
          onClick={() => setCount(count - 1)} // ボタンを押す　setCountをcount-1で更新
        >
          -1
        </button>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded" //縦余白4.横2.青色、白文字、角を丸く。
          onClick={() => setCount(count + 1)} // ボタンを押す　setCountをcount+1で更新
        >
          +1
        </button>
      </div>
    </div>
  );
}
