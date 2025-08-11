import Header from '@/components/common/Header';
import PageHeader from '@/components/common/PageHeader';
import Footer from '@/components/common/Footer';

export default function Day36Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50"> {/* 画面全体の最小高さ, 薄いグレー背景 */}
      <Header title="Day 36: QRコード生成アプリ" />
      <PageHeader
        icon="🔳"
        title="QRコード生成アプリ"
        description="テキストからQRコードを生成し、色やサイズを調整してダウンロードできます"
      />
      <main className="bg-gray-50 min-h-screen"> {/* メイン背景統一, 最小高さ確保 */}
        {children}
      </main>
      <Footer currentDay={36} />
    </div>
  );
}


