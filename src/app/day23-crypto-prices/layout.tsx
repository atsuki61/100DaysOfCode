import Header from '@/components/common/Header'
import PageHeader from '@/components/common/PageHeader'
import Footer from '@/components/common/Footer'

export default function Day23Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50"> {/* 背景グラデーション */}
      <Header title="暗号通貨価格表示" />
      <PageHeader
        icon="₿"
        title="暗号通貨価格表示"
        description="Next.js SSRで暗号通貨の現在価格をリアルタイム取得・表示"
      />
      <main className="bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen pt-8 pb-16"> {/* メイン背景統一 */}
        {children}
      </main>
      <Footer currentDay={23} />
    </div>
  )
} 