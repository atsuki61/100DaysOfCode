import { Metadata } from 'next'
import Header from '@/components/common/Header'
import PageHeader from '@/components/common/PageHeader'
import Footer from '@/components/common/Footer'

export const metadata: Metadata = {
  title: 'Day 27: タイピング速度テスト | 100 Days of Code',
  description: '出された文章を入力してWPM(打鍵数/分)を計測するタイピング速度テストアプリ',
}

export default function Day27Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header title="Day 27: タイピング速度テスト" />
      <PageHeader
        title="⌨️ タイピング速度テスト"
        description="出された文章を入力してWPM(打鍵数/分)を計測するタイピング速度テストアプリ"
      />
      <main className="bg-gray-50 min-h-screen"> {/* 背景色統一 */}
        {children}
      </main>
      <Footer currentDay={27} />
    </>
  )
} 