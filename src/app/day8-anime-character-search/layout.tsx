import { Metadata } from 'next'
import Header from '@/components/common/Header'
import PageHeader from '@/components/common/PageHeader'
import Footer from '@/components/common/Footer'

export const metadata: Metadata = {
  title: 'Day8: アニメキャラ検索 | 100DaysOfCode',
  description: 'アニメキャラクターのリストを名前でフィルタ検索できるアプリケーション',
}

export default function Day8Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <Header 
        title="Day8: アニメキャラクター検索"
        showHomeLink={true}
        showPortfolioLink={false}
      />
      <main className="pb-20">
        <div className="container mx-auto px-4 py-8">
          <PageHeader 
            icon="🎭"
            title="アニメキャラクター検索"
            description="人気アニメのキャラクターを検索してみよう！"
          />
          {children}
        </div>
      </main>
      <Footer 
        currentDay={8}
        totalDays={100}
        showNavigation={true}
      />
    </div>
  )
}
