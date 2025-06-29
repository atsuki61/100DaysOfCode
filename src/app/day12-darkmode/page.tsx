'use client';

import { ThemeProvider } from './contexts/ThemeContext';
import ThemeToggle from './components/ThemeToggle';
import DemoCard from './components/DemoCard';
import DarkModeHeader from './components/DarkModeHeader';
import DarkModePageHeader from './components/DarkModePageHeader';
import Footer from '@/components/common/Footer';

function DarkModeAppContent() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <DarkModeHeader 
        title="Day 12: ダークモード切替アプリ"
        showHomeLink={true}
      />
      
      <div className="container mx-auto px-4 pt-20 pb-24">
        <DarkModePageHeader
          icon="🌙"
          title="Day 12: ダークモード切替アプリ"
          description="Context APIとTailwind CSSを使ってダークモードを実装"
        />
        
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ThemeToggle />
            <DemoCard />
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
              学習ポイント
            </h2>
            <div className="space-y-3 text-gray-600 dark:text-gray-400">
              <div className="flex items-start space-x-3">
                <span className="text-blue-500 mt-1">💡</span>
                <div>
                  <strong className="text-gray-900 dark:text-white">Context API:</strong>
                  <span className="ml-2">React Context APIを使ってテーマ状態をグローバルに管理</span>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-blue-500 mt-1">🎨</span>
                <div>
                  <strong className="text-gray-900 dark:text-white">Tailwind CSS Dark Mode:</strong>
                  <span className="ml-2">dark:プレフィックスを使ってダークモード対応のスタイリング</span>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-blue-500 mt-1">💾</span>
                <div>
                  <strong className="text-gray-900 dark:text-white">localStorage:</strong>
                  <span className="ml-2">テーマ設定をブラウザに永続化して次回訪問時に復元</span>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-blue-500 mt-1">🖥️</span>
                <div>
                  <strong className="text-gray-900 dark:text-white">システムテーマ連携:</strong>
                  <span className="ml-2">prefers-color-schemeメディアクエリでOSの設定に追従</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer currentDay={12} />
    </div>
  );
}

export default function DarkModeApp() {
  return (
    <ThemeProvider>
      <DarkModeAppContent />
    </ThemeProvider>
  );
} 