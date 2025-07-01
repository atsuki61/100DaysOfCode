import type { Metadata } from 'next';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import PageHeader from '@/components/common/PageHeader';

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
        <div className="pt-20 pb-8 px-4"> {/* 上パディング20(80px), 下パディング8, 横パディング4 */}
          <div className="max-w-6xl mx-auto"> {/* 最大横幅6xl, 中央寄せ */}
            
            <PageHeader
              icon=""
              title=""
              description=""
            />
          </div>
          {children}
        </div>
      </main>
      <Footer currentDay={14} />
    </>
  );
} 