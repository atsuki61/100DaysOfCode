'use client';

import ThemeToggle from './components/ThemeToggle';
import DemoCard from './components/DemoCard';

export default function DarkModeApp() {
  return (
    <div className="container mx-auto px-4 pb-24"> {/* コンテナ, 中央寄せ, 横パディング4, 下パディング24 */}
      <div className="max-w-4xl mx-auto space-y-8"> {/* 最大横幅4xl, 中央寄せ, 縦間隔8 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8"> {/* グリッド1列, lg以上で2列, 間隔8 */}
            <ThemeToggle />
            <DemoCard />
          </div>
          
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700"> {/* 白背景, ダーク時グレー, パディング6, 角丸, 影, ボーダー */}
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white"> {/* 大文字, セミ太字, 下マージン4, グレー文字, ダーク時白 */}
              学習ポイント
            </h2>
          <div className="space-y-3 text-gray-600 dark:text-gray-400"> {/* 縦間隔3, グレー文字, ダーク時薄グレー */}
            <div className="flex items-start space-x-3"> {/* フレックス, アイテム開始揃え, 横間隔3 */}
                <span className="text-blue-500 mt-1">💡</span>
                <div>
                  <strong className="text-gray-900 dark:text-white">Context API:</strong>
                  <span className="ml-2">React Context APIを使ってテーマ状態をグローバルに管理</span>
                </div>
              </div>
            <div className="flex items-start space-x-3"> {/* フレックス, アイテム開始揃え, 横間隔3 */}
                <span className="text-blue-500 mt-1">🎨</span>
                <div>
                  <strong className="text-gray-900 dark:text-white">Tailwind CSS Dark Mode:</strong>
                  <span className="ml-2">dark:プレフィックスを使ってダークモード対応のスタイリング</span>
                </div>
              </div>
            <div className="flex items-start space-x-3"> {/* フレックス, アイテム開始揃え, 横間隔3 */}
                <span className="text-blue-500 mt-1">💾</span>
                <div>
                  <strong className="text-gray-900 dark:text-white">localStorage:</strong>
                  <span className="ml-2">テーマ設定をブラウザに永続化して次回訪問時に復元</span>
                </div>
              </div>
            <div className="flex items-start space-x-3"> {/* フレックス, アイテム開始揃え, 横間隔3 */}
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
  );
} 