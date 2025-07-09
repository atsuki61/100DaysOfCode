import Header from '@/components/common/Header';
import PageHeader from '@/components/common/PageHeader';
import Footer from '@/components/common/Footer';

export default function Day17Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header title="Day 17: ○×ゲーム" />
      <div className="bg-blue-50 min-h-screen"> {/* 薄い青背景, 最小画面高さ */}
        <PageHeader
          icon="⭕"
          title="○×ゲーム"
          description="二人対戦の三目並べゲーム。勝敗判定付き。"
          className="pt-16" // Headerの高さ分のトップパディング
        />
        <main>
          {children}
        </main>
      </div>
      <Footer currentDay={17} />
    </>
  );
} 