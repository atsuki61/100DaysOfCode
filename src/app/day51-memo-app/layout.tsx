import Header from '@/components/common/Header';
import PageHeader from '@/components/common/PageHeader';
import Footer from '@/components/common/Footer';

export const metadata = {
  title: "Day51: メモ保存アプリ | 100DaysOfCode",
  description: "Go + SQLite + GORMを使用したメモ保存アプリ（Create, Read）",
};

export default function Day51Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Day 51: メモ保存アプリ" />
      <PageHeader 
        title="📝 メモ保存アプリ" 
        description="Go + SQLite + GORMを使用したメモ保存アプリのバックエンド実装（Create, Read）"
      />
      <main className="bg-gray-50 min-h-screen">
        {children}
      </main>
      <Footer currentDay={51} />
    </div>
  );
}

