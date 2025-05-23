'use client';
import Counter from './components/Counter'; // Counterコンポーネントをインポート

export default function HomePage() { //ページの中身を定義
  return (
    // コンテナ: 縦フレックス、全高、中央寄せ、パディング
    <div className="flex flex-col items-center justify-center h-full space-y-8">
      {/* ページタイトル: 大文字、太字、濃いグレー */}
      <h1 className="text-4xl font-bold text-slate-800 dark:text-slate-100">
        カウンターアプリ
      </h1>
      
      <Counter />
    </div>
  );
}
