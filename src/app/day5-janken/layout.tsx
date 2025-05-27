import Header from '@/components/common/Header'
import PageHeader from '@/components/common/PageHeader'
import Footer from '@/components/common/Footer'

export default function Day5Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header title="100DaysOfCodeチャレンジ" />
      <PageHeader 
        icon="✂️" 
        title="じゃんけんゲーム" 
        description="ユーザーとコンピュータが対戦するじゃんけんゲーム" 
      />
      <main className="flex-1"> {/* flex-1: 残り空間を占有 */}
        {children}
      </main>
      <Footer currentDay={5} />
    </>
  )
} 