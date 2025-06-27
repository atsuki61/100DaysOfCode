'use client';

import { useTheme } from '../contexts/ThemeContext';
import { Theme } from '../types';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const themes: { value: Theme; label: string; icon: string }[] = [
    { value: 'light', label: 'ライト', icon: '☀️' },
    { value: 'dark', label: 'ダーク', icon: '🌙' },
    { value: 'system', label: 'システム', icon: '💻' },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
        テーマ設定
      </h2>
      <div className="space-y-3">
        {themes.map((themeOption) => (
          <button
            key={themeOption.value}
            onClick={() => setTheme(themeOption.value)}
            className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 flex items-center justify-center space-x-3 ${
              theme === themeOption.value
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:border-blue-300 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/10'
            }`}
          >
            <span className="text-xl">{themeOption.icon}</span>
            <span className="font-medium">{themeOption.label}</span>
            {theme === themeOption.value && (
              <span className="text-blue-500">✓</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
} 