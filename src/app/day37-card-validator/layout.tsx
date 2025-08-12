import Header from '@/components/common/Header';
import PageHeader from '@/components/common/PageHeader';
import Footer from '@/components/common/Footer';

export default function Day37Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50"> {/* 画面全体の最小高さ, 薄いグレー背景 */}
      <Header title="Day 37: カード番号バリデータ" />
      <PageHeader
        icon="💳"
        title="カード番号バリデータ"
        description="Luhnアルゴリズムでカード番号の妥当性をチェックし、ブランド検出と整形を行います"
      />
      <main className="bg-gray-50 min-h-screen"> {/* メイン背景統一, 最小高さ確保 */}
        {children}
      </main>
      <Footer currentDay={37} />
    </div>
  );
}


