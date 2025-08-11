import Header from '@/components/common/Header';
import PageHeader from '@/components/common/PageHeader';
import Footer from '@/components/common/Footer';

export default function Day35Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50"> {/* 画面全体の最小高さ, 薄いグレー背景 */}
      <Header title="Day 35: スネークゲーム" />
      <PageHeader
        icon="🐍"
        title="スネークゲーム"
        description="矢印キー/WASDでヘビを操作してエサを食べるクラシックゲーム。キーボード入力、ゲームループ、当たり判定を学ぶ"
      />
      <main className="bg-gray-50 min-h-screen"> {/* メイン背景統一, 最小高さ確保 */}
        {children}
      </main>
      <Footer currentDay={35} />
    </div>
  );
}

