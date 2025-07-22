import { ReactNode } from 'react';
import Header from '@/components/common/Header';
import PageHeader from '@/components/common/PageHeader';
import Footer from '@/components/common/Footer';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50"> {/* 最小高さ画面全体, 薄灰背景 */}
      <Header title="100DaysOfCode" />
      <PageHeader 
        title="Day 22: ブログサイト" 
        description="Next.js App Routerを使用した静的ブログサイト"
      />
      <main className="bg-gray-50 min-h-screen"> {/* 薄灰背景, 最小高さ画面全体 */}
        {children}
      </main>
      <Footer currentDay={22} />
    </div>
  );
} 