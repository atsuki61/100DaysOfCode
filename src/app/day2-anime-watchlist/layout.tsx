import Header from '../../components/common/Header'; // 共通ヘッダーをインポート
import Footer from '../../components/common/Footer';

export default function Day2Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header title="Day 2: アニメ視聴リスト" /> 

      {/* メインコンテンツ */}
      <main className="flex-1 pb-20">
        {children}
      </main>

      <Footer currentDay={2} />
    </div>
  )
} 