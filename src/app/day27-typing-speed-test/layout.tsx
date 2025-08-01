import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import PageHeader from '@/components/common/PageHeader';
import Footer from '@/components/common/Footer';

export const metadata: Metadata = {
  title: 'Day 27: タイピング速度テスト | 100 Days of Code',
  description: '出された文章を入力してWPM(打鍵数/分)を計測するタイピング速度テストアプリです。キー入力イベント処理、useEffectによるタイマー計測、速度と正確性の計算を練習しました。',
  keywords: ['タイピング', 'WPM', 'タイピング速度', 'タイピング練習', 'React', 'Next.js', 'TypeScript'],
  authors: [{ name: '100 Days of Code Challenge' }],
  openGraph: {
    title: 'Day 27: タイピング速度テスト',
    description: 'WPM計測機能付きのタイピング速度テストアプリ',
    type: 'website',
  },
};

export default function Day27Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50"> {/* 最小高さ画面, グレー50背景 */}
      <Header title="Day 27: タイピング速度テスト" />
      <PageHeader
        title="⚡タイピング速度テスト"
        description="WPM（Words Per Minute）を計測してタイピング速度をチェック！"
      />
      
      <main className="bg-gray-50 min-h-screen"> {/* グレー50背景, 最小高さ画面 */}
        {children}
      </main>
      
      <Footer currentDay={27} />
    </div>
  );
}