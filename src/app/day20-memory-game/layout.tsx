import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import PageHeader from '@/components/common/PageHeader';
import React from 'react';

// アプリのレイアウトを定義
export default function Day20Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen"> {/* 画面全体の高さを確保 */}
      <Header title="Day20: 神経衰弱ゲーム" />
      <main className="flex-grow bg-gray-50"> {/* メインコンテンツ */}
        <PageHeader
          title="🍎神経衰弱ゲーム🍌"
          description="カードをめくって同じ絵柄を当てる記憶ゲームです。"
        />
        {children}
      </main>
      <Footer currentDay={20} />
    </div>
  );
}