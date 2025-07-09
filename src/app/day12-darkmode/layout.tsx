import { ThemeProvider } from './contexts/ThemeContext';
import Header from '@/components/common/Header';
import PageHeader from '@/components/common/PageHeader';
import Footer from '@/components/common/Footer';

export default function Day12Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <Header title="Day 12: ダークモード切替アプリ" />
      <PageHeader 
        icon="🌙" 
        title="ダークモード切替アプリ" 
        description="Context APIとTailwind CSSを使ってダークモードを実装" 
      />
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300"> {/* 薄いグレー背景, ダーク時グレー, 色変化トランジション */}
        {children}
      </main>
      <Footer currentDay={12} />
    </ThemeProvider>
  );
} 