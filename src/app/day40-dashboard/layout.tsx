import Header from '@/components/common/Header'
import PageHeader from '@/components/common/PageHeader'
import Footer from '@/components/common/Footer'

export default function Day40Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Day 40: ダッシュボード (複数API統合)" />
      <PageHeader
        icon="📊"
        title="ダッシュボード"
        description="天気・ニュース・名言など複数APIの情報を一画面に表示"
      />
      <main className="bg-gray-50 min-h-screen">
        {children}
      </main>
      <Footer currentDay={40} />
    </div>
  )
}


