import { ReactNode } from 'react';
import Header from '../../components/common/Header';
import PageHeader from '../../components/common/PageHeader';
import Footer from '../../components/common/Footer';

type Day50LayoutProps = {
  children: ReactNode;
};

export default function Day50Layout({ children }: Day50LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 pt-16"> {/* 縦配置, 画面高, 薄い背景, ヘッダー余白 */}
      <Header title="Day 50: フロントエンドテスト入門" />
      <PageHeader 
        title="🧪 フロントエンドテスト入門"
        description="Jest + React Testing Library を使ったコンポーネントテストの基本。ユニットテスト、統合テスト、ユーザーイベントのテストを実践します。"
      />
      <main className="flex-1 flex justify-center items-start p-4 sm:p-6 pb-20"> {/* 残り高, 中央寄せ, 余白, 下にフッター分余白 */}
        {children}
      </main>
      <Footer currentDay={50} />
    </div>
  );
}

