import Header from '@/components/common/Header'
import PageHeader from '@/components/common/PageHeader'
import Footer from '@/components/common/Footer'

export default function Day44Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Day 44: Go パス/クエリパラメータ (Gin)" />
      <PageHeader
        icon="🧭"
        title="Go: パスパラメータとクエリパラメータ"
        description="Gin で /users/:id と /search?q=keyword を処理し、Next.js から取得して表示します。"
      />
      <main className="bg-gray-50 min-h-screen"> {/* 背景色統一, 画面高 */}
        {children}
      </main>
      <Footer currentDay={44} />
    </div>
  )
}


