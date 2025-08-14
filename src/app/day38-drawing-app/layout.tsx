import Header from '@/components/common/Header';
import PageHeader from '@/components/common/PageHeader';
import Footer from '@/components/common/Footer';

export default function Day38Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50"> {/* 画面全体の最小高さ, 薄いグレー背景 */}
      <Header title="Day 38: お絵かきアプリ (簡易ペイント)" />
      <PageHeader
        icon="🎨"
        title="お絵かきアプリ (簡易ペイント)"
        description="マウスで自由に線を描画。色や太さを変更し、キャンバスをクリアできます"
      />
      <main className="bg-gray-50 min-h-screen"> {/* メイン背景統一, 最小高さ確保 */}
        {children}
      </main>
      <Footer currentDay={38} />
    </div>
  );
}


