import { Metadata } from 'next';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import PageHeader from '@/components/common/PageHeader';

export const metadata: Metadata = {
  title: 'Day16: 音楽検索アプリ - 100 Days of Code',
  description: 'iTunes Search APIを使用してアーティスト名や曲名で音楽を検索し、結果一覧を表示するアプリ。プレビューの試聴やiTunesでの購入も可能です。',
  keywords: ['音楽検索', 'iTunes API', 'React', 'Next.js', 'TypeScript'],
};

export default function Day16Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header 
        title="Day16: 音楽検索アプリ" 
        showPortfolioLink={true} 
        showHomeLink={true} 
      />
      <main className="bg-gray-50 min-h-screen"> {/* メインコンテンツ, グレー背景, 最小高さフルスクリーン */}
        <div className="pb-8 px-4"> {/* 上パディング20, 下パディング8, 横パディング4 */}
          <div className="max-w-6xl mx-auto"> {/* 最大横幅6xl, 中央寄せ */}
            <PageHeader
              icon="🎵"
              title="音楽検索アプリ"
              description="iTunes Search APIを使用して音楽を検索・試聴できるアプリ"
            />
          </div>
          {children}
        </div>
      </main>
      <Footer currentDay={16} />
    </>
  );
} 