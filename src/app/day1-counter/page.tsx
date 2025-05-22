'use client';
import Counter from './components/Counter'; // Counterコンポーネントをインポート

export default function HomePage() { //ページの中身を定義
  return (
    // flex: Flexboxコンテナ
    // justify-center: 子要素を水平方向中央に配置
    // items-center: 子要素を垂直方向中央に配置
    // h-full: 親要素の高さ全体を使用 (layout.tsxのmainがflex-1なので、メインコンテンツ領域全体)
    <div className="flex justify-center items-center h-full">
      {/* Counterコンポーネントを呼び出す */}
      <Counter />
    </div>
  );
}
