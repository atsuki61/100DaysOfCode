"use client";

import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import PageHeader from "@/components/common/PageHeader";
import React from "react";

export default function Day10Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="neon-header-override">
        <Header title="Day10: 支出管理アプリ" />
      </div>
      <div className="bg-gradient-to-r from-gray-900/80 to-gray-800/80 backdrop-blur-sm border-b border-purple-500/30 text-center pb-8">
        <h1 className="text-4xl font-bold text-white mb-2 pt-8">
          支出管理アプリ
        </h1>
        <p className="text-gray-300">
          収入と支出を記録・管理するシンプルなアプリです。
        </p>
      </div>
      <main className="flex-grow">{children}</main>
      <div className="fixed bottom-0 left-0 right-0 bg-gray-900/90 backdrop-blur-sm border-t border-purple-500/30 shadow-lg z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex-1">
              <a href="/day9-anime-quote-generator" className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-300 hover:text-purple-400 transition-colors">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Day 9
              </a>
            </div>
            <div className="flex-1 text-center">
              <p className="text-gray-400 text-sm font-medium">
                100DaysOfCodeチャレンジ - Day 10 / 100
              </p>
            </div>
            <div className="flex-1 text-right">
              <span className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500">
                Day 11 (準備中)
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .neon-header-override nav {
          background: rgba(17, 24, 39, 0.9) !important;
          backdrop-filter: blur(8px) !important;
          border-bottom: 1px solid rgba(168, 85, 247, 0.3) !important;
          box-shadow: none !important;
        }
        
        .neon-header-override h1 {
          color: white !important;
        }
        
        .neon-header-override a {
          background: rgba(168, 85, 247, 0.2) !important;
          color: rgb(209, 213, 219) !important;
          border: 1px solid rgba(168, 85, 247, 0.3) !important;
          transition: all 0.3s ease !important;
        }
        
        .neon-header-override a:hover {
          background: rgba(168, 85, 247, 0.4) !important;
          color: rgb(34, 211, 238) !important;
          transform: translateY(-1px) !important;
          box-shadow: 0 4px 12px rgba(168, 85, 247, 0.3) !important;
        }
      `}</style>
    </div>
  );
}
