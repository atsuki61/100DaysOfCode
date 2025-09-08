import Header from '@/components/common/Header'
import PageHeader from '@/components/common/PageHeader'
import Footer from '@/components/common/Footer'

export default function Day42Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Day 42: Go JSONレスポンス API" />
      <PageHeader
        icon="🧩"
        title="Go: JSONレスポンス API (net/http)"
        description="/api/data で固定JSONを返すGoサーバーを想定し、Next.js側ではモックAPI (/api/day42-data) を叩いて表示します。"
      />
      <main className="bg-gray-50 min-h-screen"> {/* 背景色統一, 画面高 */}
        {children}
      </main>
      <Footer currentDay={42} />
    </div>
  )
}


