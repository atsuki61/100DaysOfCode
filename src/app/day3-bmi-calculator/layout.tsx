import Header from '../../components/common/Header'; // 共通ヘッダーをインポート

export default function Day3Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <Header title="Day 3: BMI計算機" /> 

      {/* メインコンテンツ */}
      <main>
        {children}
      </main>
    </div>
  )
} 