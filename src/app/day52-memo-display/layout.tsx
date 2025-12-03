import Header from '@/components/common/Header';
import PageHeader from '@/components/common/PageHeader';
import Footer from '@/components/common/Footer';

export const metadata = {
  title: "Day52: メモ表示アプリ | 100DaysOfCode",
  description: "Next.js + Go API連携: メモ保存アプリの表示機能",
};

export default function Day52Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Day 52: メモ表示アプリ" />
      <PageHeader 
        title="📋 メモ表示アプリ" 
        description="Day51で作成したGo APIからメモ一覧と詳細を取得して表示します"
      />
      <main className="bg-gray-50 min-h-screen">
        {children}
      </main>
      <Footer currentDay={52} />
    </div>
  );
}

