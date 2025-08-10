import Header from '@/components/common/Header';
import PageHeader from '@/components/common/PageHeader';
import Footer from '@/components/common/Footer';

export default function Day34Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50"> {/* 画面全体の最小高さ, 薄いグレー背景 */}
      <Header title="Day 34: 英単語当てゲーム (ハングマン)" />
      <PageHeader
        title="英単語当てゲーム (ハングマン)"
        description="文字入力またはオンスクリーンキーボードで英単語を推測するゲーム。配列・文字列操作とゲームロジックを学ぶ"
      />
      <main className="bg-gray-50 min-h-screen"> {/* メイン背景統一, 最小高さ確保 */}
        {children}
      </main>
      <Footer currentDay={34} />
    </div>
  );
}


