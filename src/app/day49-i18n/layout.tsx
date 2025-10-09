import { ReactNode } from 'react';
import Header from '../../components/common/Header';
import PageHeader from '../../components/common/PageHeader';
import Footer from '../../components/common/Footer';

type Day49LayoutProps = {
  children: ReactNode;
};

export default function Day49Layout({ children }: Day49LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 pt-16"> {/* 縦配置, 画面高, 薄い背景, ヘッダー余白 */}
      <Header title="Day 49: 多言語対応サイト (i18next)" />
      <PageHeader 
        title="🌐 多言語対応サイト"
        description="日本語/英語で表示を切り替えられるWebサイト。翻訳ファイルの管理と言語切り替えUIを実装します。"
      />
      <main className="flex-1 flex justify-center items-start p-4 sm:p-6 pb-20"> {/* 残り高, 中央寄せ, 余白, 下にフッター分余白 */}
        {children}
      </main>
      <Footer currentDay={49} />
    </div>
  );
}

