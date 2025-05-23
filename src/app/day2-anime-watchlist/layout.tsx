import Header from '../../components/common/Header'; // 共通ヘッダーをインポート

export default function Day2Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <Header title="Day 2: アニメ視聴リスト" /> {/* 共通ヘッダーを使用 */}

      {/* メインコンテンツ */}
      <main>
        {children}
      </main>
    </div>
  )
} 