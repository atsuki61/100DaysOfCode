'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { Theme, ThemeContextType } from '../types';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('system');
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');

  // システムテーマを検出
  const getSystemTheme = (): 'light' | 'dark' => {
    if (typeof window === 'undefined') return 'light';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  // テーマを解決（system の場合はシステムテーマを使用）
  const resolveTheme = useCallback((currentTheme: Theme): 'light' | 'dark' => {
    if (currentTheme === 'system') {
      return getSystemTheme();
    }
    return currentTheme;
  }, []);

  // テーマを設定してlocalStorageに保存
  const updateTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    
    // localStorageに保存
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', newTheme);
    }
    
    const resolved = resolveTheme(newTheme);
    setResolvedTheme(resolved);
    
    // HTMLのclassを更新
    if (typeof window !== 'undefined') {
      const root = window.document.documentElement;
      root.classList.remove('light', 'dark');
      root.classList.add(resolved);
    }
  };

  useEffect(() => {
    // 初期化時にlocalStorageからテーマを読み込み
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme') as Theme;
      const initialTheme = savedTheme || 'system';
      
      setTheme(initialTheme);
      const resolved = resolveTheme(initialTheme);
      setResolvedTheme(resolved);
      
      // HTMLのclassを設定
      const root = window.document.documentElement;
      root.classList.remove('light', 'dark');
      root.classList.add(resolved);
      
      // システムテーマの変更を監視
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => {
        if (theme === 'system') {
          const newResolved = getSystemTheme();
          setResolvedTheme(newResolved);
          root.classList.remove('light', 'dark');
          root.classList.add(newResolved);
        }
      };
      
      mediaQuery.addEventListener('change', handleChange);
      return () => {
        mediaQuery.removeEventListener('change', handleChange);
        if (typeof window !== 'undefined') {
          const root = window.document.documentElement;
          root.classList.remove('dark');
        }
      };
    }
  }, [theme, resolveTheme]);

  const value = {
    theme,
    setTheme: updateTheme,
    resolvedTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
} 