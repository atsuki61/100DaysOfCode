import { ReactNode } from 'react';
import Header from '../../components/common/Header';
import PageHeader from '../../components/common/PageHeader';
import Footer from '../../components/common/Footer';

type Day47LayoutProps = {
  children: ReactNode;
};

export default function Day47Layout({ children }: Day47LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 pt-16"> {/* 縦配置, 画面高, 薄い背景, ヘッダー余白 */}
      <Header title="Day 47: オフラインメモ帳 (PWA)" />
      <PageHeader 
        title="📝 オフラインメモ帳"
        description="Service Worker と Manifest によるオフライン対応。ローカル保存＆インストール対応。"
      />
      <main className="flex-1 flex justify-center items-start p-4 sm:p-6 pb-20"> {/* 残り高, 中央寄せ, 余白, 下にフッター分余白 */}
        {children}
      </main>
      <Footer currentDay={47} />
    </div>
  );
}




