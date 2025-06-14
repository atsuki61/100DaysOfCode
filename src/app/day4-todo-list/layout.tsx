import type { Metadata } from 'next';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';

export const metadata: Metadata = {
  title: 'ToDoリスト | 100DaysOfCode Day 4',
  description: 'タスクを追加・削除できるシンプルなToDoアプリ。React、TypeScript、TailwindCSSを使用。',
  keywords: ['React', 'TypeScript', 'TailwindCSS', 'ToDoリスト', '100DaysOfCode'],
};

export default function TodoListLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col pt-16"> {/* Header分の上部パディング追加 */}
      <Header title="Day 4: ToDoリスト" />
      <main className="flex-1 pb-20 bg-gray-50 py-8">
        {children}
      </main>
      <Footer currentDay={4} />
    </div>
  );
}
