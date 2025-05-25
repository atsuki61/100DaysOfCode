'use client';
import Counter from './components/Counter'; // Counterコンポーネントをインポート
import PageHeader from '../../components/common/PageHeader';

export default function Day1Page() { //ページの中身を定義
  return (
    // コンテナ: 縦フレックス、全高、中央寄せ、パディング
    <div className="flex flex-col items-center justify-center h-full space-y-8">
      <PageHeader 
        title="カウンターアプリ"
        description="Day 1: ボタン操作で数値を増減できるシンプルなカウンター"
        className="text-slate-800 dark:text-slate-100"
      />
      
      <Counter />
    </div>
  );
}
