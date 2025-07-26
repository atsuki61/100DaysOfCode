import Header from '@/components/common/Header';
import PageHeader from '@/components/common/PageHeader';
import Footer from '@/components/common/Footer';

export default function PasswordGeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header title="Day 26: パスワードジェネレーター" />
      <PageHeader 
        title="🔓パスワードジェネレーター" 
        description="安全で強力なパスワードを簡単に生成できるアプリです。"
      />
      <main className="bg-gray-50 min-h-screen">
        {children}
      </main>
      <Footer currentDay={26} />
    </>
  );
} 