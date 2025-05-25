import { ReactNode } from 'react';
import Header from '../../components/common/Header'; // 共通ヘッダーをインポート
import Footer from '../../components/common/Footer';

// RootLayout コンポーネントの props 型定義
type Day1LayoutProps = {
  children: ReactNode; // ReactNodeの型注釈ページの中身を受け取る
};
// コンポーネント本体を定義
export default function Day1Layout({ children }: Day1LayoutProps) {
  return (
    // flex flex-col min-h-screen  bg-slate-50: フレックスボックスコンテナを縦に配置, 最小高さ画面全体, 背景色
    
    <div className="flex flex-col min-h-screen  bg-slate-50">
    <Header title="Day 1: カウンターアプリ" /> {/* 共通ヘッダーを使用 */}

      <main className="flex-1 flex justify-center items-center p-4 sm:p-6 pb-20">
        {children}
      </main>

      <Footer currentDay={1} />
    </div>
  );
}
