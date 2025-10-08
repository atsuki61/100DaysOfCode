import { ReactNode } from 'react';
import Header from '../../components/common/Header';
import PageHeader from '../../components/common/PageHeader';
import Footer from '../../components/common/Footer';

type Day48LayoutProps = {
  children: ReactNode;
};

export default function Day48Layout({ children }: Day48LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 pt-16"> {/* 縦配置, 画面高, 薄い背景, ヘッダー余白 */}
      <Header title="Day 48: 大量リスト表示 (仮想レンダリング)" />
      <PageHeader 
        title="📜 大量リスト表示"
        description="仮想レンダリングで1万件規模のリストを高速表示。スクロール体験を最適化します。"
      />
      <main className="flex-1 flex justify-center items-start p-4 sm:p-6 pb-20"> {/* 残り高, 中央寄せ, 余白, 下にフッター分余白 */}
        {children}
      </main>
      <Footer currentDay={48} />
    </div>
  );
}


