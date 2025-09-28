import Header from '@/components/common/Header'
import PageHeader from '@/components/common/PageHeader'
import Footer from '@/components/common/Footer'

export default function Day46Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Day 46: Go アニメ名言ジェネレーター API" />
      <PageHeader
        icon="🎬💬"
        title="Goで作るアニメ名言ジェネレーターAPIをNext.jsから利用"
        description="固定データまたは外部APIをGo経由で呼び出す想定。ここではモックAPIを用い、Next.jsで取得・表示まで行います。"
      />
      <main className="bg-gray-50 min-h-screen"> {/* 背景色統一, 画面高 */}
        {children}
      </main>
      <Footer currentDay={46} />
    </div>
  )
}


