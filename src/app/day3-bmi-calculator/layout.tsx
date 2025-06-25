import Header from '../../components/common/Header'; // 共通ヘッダーをインポート
import Footer from '../../components/common/Footer';

export default function Day3Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header title="Day 3: BMI計算機" /> 

      {/* メインコンテンツ */}
      <main className="flex-1 pb-20 bg-gradient-to-br from-blue-50 to-indigo-100">
        {children}
      </main>

      <Footer currentDay={3} />
    </div>
  )
} 