'use client';
import { useState } from 'react'; // 状態管理に使う useState を読み込む
import Button from './ui/Button'; // 共通のButtonコンポーネントをインポート

// コンポーネント本体を定義
export default function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => setCount(prevCount => prevCount + 1);
  const decrement = () => setCount(prevCount => prevCount - 1);
  const reset = () => setCount(0); // リセット関数を追加

  return (
    
    // カウンター表示エリア: 白カード、パディング、角丸、影、中央揃え、固定幅で正方形に近い見た目
    <div className="bg-white dark:bg-gray-800 p-8 sm:p-12 rounded-xl shadow-xl text-center w-80 sm:w-96 min-h-[320px] sm:min-h-[384px] flex flex-col justify-center">
      {/* カウンター数値表示エリア */}
      
      <div className="mb-8"> {/* 下マージン */}
        
        {/* カウンター数値: 超大文字、太字、グレー */}
        <span className="text-8xl sm:text-9xl font-bold text-slate-700 dark:text-slate-200">
          {count}
        </span>
        {/* 補助テキスト: 小文字、薄グレー、上マージン */}
        <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 mt-2 sm:mt-3">現在のカウント</p>
      </div>

      {/* ボタンエリア: 縦並び(モバイル)→横並び(PC)、間隔調整 */}
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        {/* デクリメントボタン: 全幅(モバイル)→自動幅(PC) */}
        <Button onClick={decrement} variant="secondary" size="lg" className="w-full sm:w-auto">
          減らす (-)
        </Button>

        {/* インクリメントボタン */}
        <Button onClick={increment} variant="default" size="lg" className="w-full sm:w-auto">
          増やす (+)
        </Button>
      </div>
      {/* リセットボタン: 上マージン */}
      <Button onClick={reset} variant="outline" size="lg" className="w-full sm:w-auto mt-4">
        リセット
      </Button>
    </div>
  );
}
