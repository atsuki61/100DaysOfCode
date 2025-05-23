'use client';
import Counter from './components/Counter'; // Counterコンポーネントをインポート

export default function HomePage() { //ページの中身を定義
  return (
    // h-full: 親要素の高さ全体を使用 (layout.tsxのmainがflex-1なので、メインコンテンツ領域全体)
    <div className="flex justify-center items-center h-full">
      <Counter />
    </div>
  );
}
