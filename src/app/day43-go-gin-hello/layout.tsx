import Header from '@/components/common/Header'
import PageHeader from '@/components/common/PageHeader'
import Footer from '@/components/common/Footer'

export default function Day43Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Day 43: Go Webフレームワーク (Gin) - Hello World" />
      <PageHeader
        icon="🍸"
        title="Go: Gin/Echo 入門 - Hello World"
        description="GoのWebフレームワーク(Gin)で/helloを返すAPIを作り、Next.jsから取得して表示します。"
      />
      <main className="bg-gray-50 min-h-screen"> {/* 背景色統一, 画面高 */}
        {children}
      </main>
      <Footer currentDay={43} />
    </div>
  )
}


