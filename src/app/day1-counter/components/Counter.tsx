'use client';
import { useState } from 'react'; // 状態管理に使う useState を読み込む
//コンポーネント本体を定義
export default function Counter() {
  // count: 現在の数値、setCount: 更新用関数
  const [count, setCount] = useState(0);

  return (
    //テキスト中央揃え　ボタン縦に1remの隙間
    <div className="text-center space-y-4">
      {/* サイズ5倍　前景(文字)色　太字*/}
      <h2 className="text-5xl text-foreground font-bold">{count}</h2>
      {/*ボタン同士を横方向に0.5rem 離す */}
      <div className="space-x-2">
        <button
          className="px-4 py-2 bg-destructive text-destructive-foreground rounded" //横余白4, 縦余白2, 破壊的アクション背景, 破壊的アクション前景(文字), 角丸
          onClick={() => setCount(count - 1)} // ボタンを押す　setCountをcount-1で更新
        >
          -1
        </button>
        <button
          className="px-4 py-2 bg-primary text-primary-foreground rounded" //横余白4, 縦余白2, プライマリ背景, プライマリ前景(文字), 角丸
          onClick={() => setCount(count + 1)} // ボタンを押す　setCountをcount+1で更新
        >
          +1
        </button>
      </div>
    </div>
  );
}
