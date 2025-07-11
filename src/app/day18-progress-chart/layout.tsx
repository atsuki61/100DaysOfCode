import Header from '@/components/common/Header';
import PageHeader from '@/components/common/PageHeader';
import Footer from '@/components/common/Footer';

export default function Day18Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header title="Day 18: 学習進捗チャート" />
      <PageHeader 
        icon="📊" 
        title="学習進捗チャート" 
        description="TOEICスコア推移をグラフで可視化して学習効果を確認しましょう" 
      />
      <main className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50"> {/* 最小画面高さ, 緑から青、紫のグラデーション背景 */}
        {children}
      </main>
      <Footer currentDay={18} />
    </>
  );
} 