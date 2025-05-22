'use client';
import Counter from './components/Counter'; // ← 相対パスに変更

export default function HomePage() {//ページの中身を定義
  return (
    <div className="flex justify-center items-center h-full">
      {/* 抽出したコンポーネントを呼び出すだけ */}
      <Counter />
    </div>
  );
}
