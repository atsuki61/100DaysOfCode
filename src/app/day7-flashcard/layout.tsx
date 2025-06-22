/**
 * Day 7: 単語フラッシュカードアプリ専用レイアウト
 * 
 * TOEIC単語学習のためのフラッシュカード機能
 */

import { ReactNode } from 'react';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';

type Day7LayoutProps = {
  children: ReactNode;
};

export default function Day7Layout({ children }: Day7LayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex flex-col pt-16"> {/* pt-16: Header分の上部パディング追加 */}
      
      {/* ヘッダーセクション */}
      <Header 
        title="Day 7: 単語フラッシュカード" 
        showHomeLink={true} 
        showPortfolioLink={false} 
      />
      
      {/* メインコンテンツセクション */}
      <main className="flex-grow flex items-center justify-center p-4 pb-20"> {/* フレックス拡張, 中央配置, パディング, 下部余白 */}
        {children}
      </main> 

      {/* フッターセクション */}
      <Footer 
        currentDay={7}

      />
    </div>
  );
}
