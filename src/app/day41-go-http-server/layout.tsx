import Header from '@/components/common/Header'
import PageHeader from '@/components/common/PageHeader'
import Footer from '@/components/common/Footer'

export default function Day41Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Day 41: Go HTTPサーバー (net/http)" />
      <PageHeader
        icon="🧪"
        title="GoのHTTPサーバーとNext.jsの連携"
        description="Goのnet/httpで/helloエンドポイントを用意し、Next.jsからフェッチして表示します"
      />
      <main className="bg-gray-50 min-h-screen"> {/* 背景色統一, 画面高 */}
        {children}
      </main>
      <Footer currentDay={41} />
    </div>
  )
}



