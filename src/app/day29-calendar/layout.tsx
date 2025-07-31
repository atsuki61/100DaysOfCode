import { Metadata } from 'next'
import Header from '@/components/common/Header'
import PageHeader from '@/components/common/PageHeader'
import Footer from '@/components/common/Footer'

export const metadata: Metadata = {
  title: 'Day 29: カレンダーアプリ | 100 Days of Code',
  description: '当月の日付をカレンダー形式で表示し、イベントの日を強調表示するカレンダーアプリ',
}

export default function Day29Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header title="Day 29: カレンダーアプリ" />
      <main className="bg-gray-50 min-h-screen"> {/* 背景色統一 */}
        <PageHeader
          title="📅 カレンダーアプリ"
          description="当月の日付をカレンダー形式で表示し、イベントの日を強調表示するカレンダーアプリ"
        />
        {children}
      </main>
      <Footer currentDay={29} />
    </>
  )
}