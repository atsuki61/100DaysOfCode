import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import PageHeader from '@/components/common/PageHeader';
import Footer from '@/components/common/Footer';

export const metadata: Metadata = {
  title: 'Day 24: ポケモン図鑑 | 100 Days of Code',
  description: 'Next.jsの動的ルーティングとgetStaticPathsを学習しながら作成したポケモン図鑑アプリ。PokéAPIを使用してポケモンの詳細情報を表示します。',
  openGraph: {
    title: 'Day 24: ポケモン図鑑',
    description: 'Next.jsの動的ルーティングを使ったポケモン図鑑アプリ',
    type: 'website',
  },
};

interface Day24LayoutProps {
  children: React.ReactNode;
}

export default function Day24Layout({ children }: Day24LayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"> {/* 最小高さ画面, グラデーション背景 */}
      <Header title="ポケモン図鑑" />
      <PageHeader
        icon="🔍"
        title="ポケモン図鑑"
        description="Next.jsの動的ルーティングでポケモン詳細ページを実装"
      />
      <main className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 min-h-screen"> {/* グラデーション背景, 最小高さ画面 */}
        {children}
      </main>
      <Footer currentDay={24} />
    </div>
  );
} 