import { Metadata } from 'next';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';

export const metadata: Metadata = {
  title: 'Day 11: 天気予報アプリ | 100DaysOfCode',
  description: '都市名から現在の天気を表示するシンプルなアプリです。外部APIの利用、非同期処理と状態更新、APIキーの扱い（環境変数基礎）、TypeScriptでのAPIレスポンスの型定義を練習しました。',
};

export default function WeatherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col pt-16"> {/* 最小高さ画面, Flexコンテナ(縦), Header分の上部パディング */}
      <Header 
        title="Day 11: 天気予報アプリ" 
        showPortfolioLink={true} 
        showHomeLink={true} 
      />
      
      <main className="flex-1 bg-gradient-to-br from-blue-50 to-cyan-50 px-4 sm:px-6 lg:px-8"> {/* Flex拡張, 青からシアンのグラデーション背景, レスポンシブ横パディング */}
        <div className="max-w-7xl mx-auto"> {/* 最大幅7xl, 中央寄せ */}
          {children}
        </div>
      </main>
      
      <Footer currentDay={11} />
    </div>
  );
}
