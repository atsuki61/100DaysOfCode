"use client";

import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import PageHeader from "@/components/common/PageHeader";
import BackToHomeButton from "@/components/BackToHomeButton";
import React from "react";

export default function Day10Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* カスタムネオンヘッダー */}
      <nav className="neon-nav">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <BackToHomeButton className="neon-button" />
            </div>
            <div className="flex items-center">
              <h1 className="neon-title">
                Day10: 支出管理アプリ
              </h1>
            </div>
          </div>
        </div>
      </nav>
      
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
        .neon-nav {
          background: linear-gradient(135deg, rgba(17, 24, 39, 0.95), rgba(30, 41, 59, 0.95)) !important;
          backdrop-filter: blur(12px) !important;
          border-bottom: 2px solid rgba(168, 85, 247, 0.5) !important;
          box-shadow: 
            0 0 20px rgba(168, 85, 247, 0.3),
            0 0 40px rgba(168, 85, 247, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.1) !important;
          position: relative !important;
        }
        
        .neon-nav::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, 
            transparent,
            rgba(34, 211, 238, 0.8),
            rgba(168, 85, 247, 0.8),
            rgba(34, 211, 238, 0.8),
            transparent
          );
          animation: neonScan 3s linear infinite;
        }
        
        @keyframes neonScan {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        .neon-title {
          color: #ffffff !important;
          font-size: 1.25rem !important;
          font-weight: 700 !important;
          text-shadow: 
            0 0 10px rgba(34, 211, 238, 0.8),
            0 0 20px rgba(34, 211, 238, 0.5),
            0 0 30px rgba(34, 211, 238, 0.3) !important;
          letter-spacing: 0.5px !important;
        }
        
        :global(.neon-button) {
          background: linear-gradient(135deg, rgba(168, 85, 247, 0.3), rgba(34, 211, 238, 0.2)) !important;
          color: rgb(209, 213, 219) !important;
          border: 1px solid rgba(168, 85, 247, 0.5) !important;
          border-radius: 8px !important;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
          position: relative !important;
          overflow: hidden !important;
          box-shadow: 
            0 0 10px rgba(168, 85, 247, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.1) !important;
        }
        
        :global(.neon-button::before) {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, 
            transparent,
            rgba(255, 255, 255, 0.2),
            transparent
          );
          transition: left 0.5s !important;
        }
        
        :global(.neon-button:hover::before) {
          left: 100% !important;
        }
        
        :global(.neon-button:hover) {
          background: linear-gradient(135deg, rgba(168, 85, 247, 0.5), rgba(34, 211, 238, 0.4)) !important;
          color: #ffffff !important;
          text-shadow: 0 0 8px rgba(34, 211, 238, 0.8) !important;
          transform: translateY(-2px) scale(1.02) !important;
          box-shadow: 
            0 0 20px rgba(168, 85, 247, 0.6),
            0 0 40px rgba(34, 211, 238, 0.3),
            0 8px 16px rgba(0, 0, 0, 0.3) !important;
          border-color: rgba(34, 211, 238, 0.8) !important;
        }
        
        :global(.neon-button svg) {
          filter: drop-shadow(0 0 3px rgba(34, 211, 238, 0.8)) !important;
        }
      `}</style>
    </div>
  );
}
