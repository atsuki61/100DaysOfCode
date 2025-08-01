import Header from '@/components/common/Header';
import PageHeader from '@/components/common/PageHeader';
import Footer from '@/components/common/Footer';

export default function Day27Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <PageHeader title="Day 27: タイピング速度テスト" />
      <main className="bg-gray-50 min-h-screen">
        {children}
      </main>
      <Footer />
    </div>
  );
} 