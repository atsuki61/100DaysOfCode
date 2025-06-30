import type { Metadata } from 'next';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';

export const metadata: Metadata = {
  title: 'Day 14: 英単語辞書アプリ - 100 Days Of Code',
  description: '英単語を入力すると意味を表示する辞書アプリです。外部辞書APIの利用、非同期データ取得、複雑なJSONデータの表示、ローディング状態の管理を練習しました。',
};

export default function Day14Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header title="Day 14: 英単語辞書アプリ" showPortfolioLink={true} showHomeLink={true} />
      <main className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen"> {/* グラデーション背景, 最小高さ画面全体 */}
        {children}
      </main>
      <Footer currentDay={14} />
    </>
  );
} 