import Header from '@/components/common/Header';
import PageHeader from '@/components/common/PageHeader';
import Footer from '@/components/common/Footer';

export default function Day32Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Day 32: ユーザー登録フォーム" />
      <PageHeader 
        title="ユーザー登録フォーム" 
        description="React Hook Form + Yup による高度なバリデーション機能付きフォーム"
      />
      <main className="bg-gray-50 min-h-screen">
        {children}
      </main>
      <Footer currentDay={32} />
    </div>
  );
} 