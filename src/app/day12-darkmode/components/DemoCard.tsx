'use client';

import { useTheme } from '../contexts/ThemeContext';

export default function DemoCard() {
  const { resolvedTheme } = useTheme();

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
        テーマデモ
      </h2>
      
      <div className="space-y-4">
        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
            現在のテーマ
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            {resolvedTheme === 'dark' ? 'ダークモード' : 'ライトモード'}が適用されています
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <h4 className="font-medium text-blue-900 dark:text-blue-200 mb-2">
              プライマリカラー
            </h4>
            <p className="text-blue-700 dark:text-blue-300 text-sm">
              テーマに応じて色が変化します
            </p>
          </div>

          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
            <h4 className="font-medium text-green-900 dark:text-green-200 mb-2">
              セカンダリカラー
            </h4>
            <p className="text-green-700 dark:text-green-300 text-sm">
              ダークモードでも見やすい色調
            </p>
          </div>
        </div>

        <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
          <h4 className="font-medium text-yellow-900 dark:text-yellow-200 mb-2">
            注意事項
          </h4>
          <p className="text-yellow-700 dark:text-yellow-300 text-sm">
            テーマの設定はlocalStorageに保存され、次回訪問時も維持されます
          </p>
        </div>

        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors">
            プライマリボタン
          </button>
          <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 rounded-lg transition-colors">
            セカンダリボタン
          </button>
        </div>
      </div>
    </div>
  );
} 