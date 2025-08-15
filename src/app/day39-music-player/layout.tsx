import Header from '@/components/common/Header';
import PageHeader from '@/components/common/PageHeader';
import Footer from '@/components/common/Footer';

export default function Day39Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50"> {/* 画面全体の最小高さ, 薄いグレー背景 */}
      <Header title="Day 39: 音楽プレーヤー" />
      <PageHeader
        icon="🎵"
        title="音楽プレーヤー"
        description="曲の再生/一時停止/スキップ、進捗表示とシークに対応したシンプルなプレーヤー"
      />
      <main className="bg-gray-50 min-h-screen"> {/* メイン背景統一, 最小高さ確保 */}
        {children}
      </main>
      <Footer currentDay={39} />
    </div>
  );
}


