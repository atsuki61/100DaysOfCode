import { Metadata } from 'next'
import Header from '@/components/common/Header'
import PageHeader from '@/components/common/PageHeader'
import Footer from '@/components/common/Footer'

export const metadata: Metadata = {
  title: 'Day 30: 15パズルゲーム | 100 Days of Code',
  description: '数字タイルをスライドして正しい順序に並べる15パズルゲーム',
}

export default function Day30Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header title="Day 30: 15パズルゲーム" />
      <main className="bg-gray-50 min-h-screen"> {/* 背景色統一 */}
        <PageHeader 
          title="🧩 15パズルゲーム" 
          description="数字タイルをスライドして正しい順序に並べるパズルゲーム" 
        />
        {children}
      </main>
      <Footer currentDay={30} />
    </>
  )
}