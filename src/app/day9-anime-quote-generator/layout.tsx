import Header from '@/components/common/Header';
import PageHeader from '@/components/common/PageHeader';
import Footer from '@/components/common/Footer';

export default function Day9Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header title="Day9:アニメ名言ジェネレーター" />
      <div className="flex-1 bg-gradient-to-br from-purple-50 to-blue-50">
        <PageHeader 
          icon="🎭"
          title="Day 9: アニメ名言ジェネレーター"
          description="ランダムなアニメの名言を表示します"
        />
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
      </div>
      <Footer currentDay={9} />
    </div>
  );
}
