import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'

export default function Day5Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col min-h-screen pt-16"> {/* pt-16: Header分の上部パディング追加 */}
      <Header title="Day5:じゃんけんゲーム" />
      <main className="flex-1 bg-gradient-to-br from-blue-50 to-purple-50"> {/* flex-1: 残り空間を占有 */}
        {children}
      </main>
      <Footer currentDay={5} />
    </div>
  )
}