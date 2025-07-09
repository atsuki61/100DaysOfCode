import { ReactNode } from 'react';
import Header from '@/components/common/Header';
import PageHeader from '@/components/common/PageHeader';
import Footer from '@/components/common/Footer';

export default function Day13Layout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <Header title="Day 13: 電卓アプリ" />
      <PageHeader 
        icon="🧮" 
        title="電卓アプリ" 
        description="四則演算ができるシンプルな電卓" 
      />
      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100"> {/* 最小画面高さ, 青からインディゴのグラデーション背景 */}
        {children}
      </main>
      <Footer currentDay={13} />
    </>
  );
} 