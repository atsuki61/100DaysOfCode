/**
 * Day 6: ストップウォッチアプリ専用レイアウト
 * 
 * ストップウォッチアプリ全体の基本レイアウト構造を定義
 * Header、Footer、メインコンテンツエリアを配置
 */

import { ReactNode } from 'react';
// 共通コンポーネント: ヘッダー、フッター
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';

// レイアウトコンポーネントのプロパティ型定義
type Day6LayoutProps = {
  children: ReactNode; // ページコンテンツを受け取る
};

export default function Day6Layout({ children }: Day6LayoutProps) {
  return (
    // 画面全体のレイアウトコンテナ
    <div className="min-h-screen bg-gray-50 flex flex-col"> {/* 最小高さ100vh, 薄灰背景, フレックス縦配置 */}
      
      {/* === ヘッダーセクション === */}
      <Header 
        title="Day 6: ストップウォッチ" 
        showHomeLink={true} 
        showPortfolioLink={false} 
      />
      
      {/* === メインコンテンツセクション === */}
      {/* flex-grow で残りスペースを占有 */}
      <main className="flex-grow flex items-center justify-center p-4 pb-20"> {/* フレックス拡張, 中央配置, パディング, 下部余白 */}
        {children}
      </main> 

      {/* === フッターセクション === */}
      <Footer 
        currentDay={6} // 現在の日数
        totalDays={100} // 総日数
        showNavigation={true} // ナビゲーション表示
      />
    </div>
  );
} 