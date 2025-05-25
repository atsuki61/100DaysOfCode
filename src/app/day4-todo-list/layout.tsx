import type { Metadata } from 'next';
import Header from '../../components/common/Header';

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
    <main>
      <Header title="Day 4: ToDoリスト" />
      {children}
    </main>
  );
}
