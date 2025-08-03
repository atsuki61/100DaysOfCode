import { Metadata } from 'next'
import Header from '@/components/common/Header'
import PageHeader from '@/components/common/PageHeader'
import Footer from '@/components/common/Footer'

export const metadata: Metadata = {
  title: 'Day 31: Redux Toolkit ToDoアプリ | 100 Days of Code',
  description: 'Redux Toolkitを用いてグローバルに状態管理するToDoリストアプリケーション',
}

export default function Day31Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header title="Day 31: Redux Toolkit ToDoアプリ" />
      <main className="bg-gray-50 min-h-screen">
        <PageHeader 
          title="📝 Redux Toolkit ToDoアプリ" 
          description="Redux Toolkitを用いてグローバルに状態管理するToDoリストアプリケーション"
        />
        {children}
      </main>
      <Footer currentDay={31} />
    </>
  )
} 