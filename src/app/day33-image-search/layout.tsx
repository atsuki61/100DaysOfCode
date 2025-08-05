import Header from '@/components/common/Header';
import PageHeader from '@/components/common/PageHeader';
import Footer from '@/components/common/Footer';

export default function Day33Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50"> {/* 画面全体の最小高さと背景色 */}
      <Header title="Day 33: 画像検索アプリ（無限スクロール）" />
      <PageHeader 
        title="画像検索アプリ（無限スクロール）" 
        description="Unsplash APIを使用した画像検索とIntersectionObserver APIによる無限スクロール機能"
      />
      <main className="bg-gray-50 min-h-screen"> {/* メインコンテンツ背景統一 */}
        {children}
      </main>
      <Footer currentDay={33} />
    </div>
  );
}