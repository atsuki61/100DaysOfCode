import Header from '@/components/common/Header'
import PageHeader from '@/components/common/PageHeader'
import Footer from '@/components/common/Footer'

export default function Day45Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50"> {/* 画面高/薄い灰背景 */}
      <Header title="Day 45: Go POST JSON (モックAPI)" />
      <PageHeader 
        title="🧮 Go風POST JSONの体験"
        description="Next.jsのAPIルートでPOST JSONを受け取り、演算して返すモックを作成。フロントからリクエスト送信して結果を表示します。"
      />
      <main className="bg-gray-50 min-h-screen"> {/* 背景/画面高 */}
        {children}
      </main>
      <Footer currentDay={45} />
    </div>
  )
}


