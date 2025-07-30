import { Metadata } from 'next'
import Header from '@/components/common/Header'
import PageHeader from '@/components/common/PageHeader'
import Footer from '@/components/common/Footer'

export const metadata: Metadata = {
  title: 'Day 28: 画像ギャラリー | 100 Days of Code',
  description: '複数画像を一覧表示し、クリックで拡大表示できるモーダル付きギャラリーアプリ',
}

export default function Day28Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header title="Day 28: 画像ギャラリー" />
      <main className="bg-gray-50 min-h-screen"> {/* 背景色統一 */}
        <PageHeader
          title="🖼️ 画像ギャラリー"
          description="複数画像を一覧表示し、クリックで拡大表示できるモーダル付きギャラリーアプリ"
        />
        {children}
      </main>
      <Footer currentDay={28} />
    </>
  )
} 