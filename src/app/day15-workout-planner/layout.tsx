import { Metadata } from 'next';
import Header from '@/components/common/Header';
import PageHeader from '@/components/common/PageHeader';
import Footer from '@/components/common/Footer';

export const metadata: Metadata = {
  title: 'Day15 - ワークアウトプランナー | 100DaysOfCode',
  description: 'トレーニング種目をリストに追加し管理するワークアウトプランナーアプリ。複数フィールドのフォーム処理とlocalStorageによるデータ永続化を学習します。',
};

export default function Day15Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header 
        title="Day15: ワークアウトプランナー" 
        showPortfolioLink={true} 
        showHomeLink={true} 
      />
      <main className="bg-gradient-to-br from-blue-50 via-white to-green-50 min-h-screen"> {/* メインコンテンツ, グラデーション背景 */}
        <div className="pb-8 px-4"> {/* 上パディング20, 下パディング8, 横パディング4 */}
          <div className="max-w-6xl mx-auto"> {/* 最大横幅6xl, 中央寄せ */}
            <PageHeader
              icon="💪"
              title="ワークアウトプランナー"
              description="トレーニング種目を管理し、自分だけのワークアウトプランを作成しましょう"
            />
          </div>
          {children}
        </div>
      </main>
      <Footer currentDay={15} />
    </>
  );
} 