import Header from '../../components/common/Header';
import PageHeader from '../../components/common/PageHeader';
import Footer from '../../components/common/Footer';

export default function Day19Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50"> {/* 最小高さ画面、グレー50背景 */}
      <Header title="Day 19: クイズアプリ" />
      <PageHeader 
        icon="🎌" 
        title="クイズアプリ" 
        description="人気アニメに関するクイズに挑戦しよう！" 
      />
      <main className="bg-gray-50 min-h-screen"> {/* グレー50背景、最小高さ画面 */}
        {children}
      </main>
      <Footer currentDay={19} />
    </div>
  );
} 