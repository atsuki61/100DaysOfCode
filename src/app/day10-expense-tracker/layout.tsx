"use client";


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
      {/* Day10専用ネオンヘッダー */}
      <nav className="neon-nav">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <BackToHomeButton className="neon-button" />
            </div>
            <div className="flex items-center">
              <h1 className="neon-title">
                [Day10: 支出管理アプリ]
              </h1>
            </div>
            <div className="flex items-center">
              <div className="neon-status">
                <span className="status-text">ONLINE</span>
                <div className="status-dot"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="scan-line"></div>
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
      
      {/* Day10専用ネオンFooter */}
      <footer className="neon-footer">
        <div className="neon-footer-grid"></div>
        <div className="neon-footer-scan"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex justify-between items-center py-4">
            <div className="flex-1">
              <a href="/day9-anime-quote-generator" className="neon-footer-nav">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Day 9
              </a>
            </div>
            
            <div className="flex-1 text-center">
              <p className="neon-footer-text">
                [100DaysOfCode] - Day 10 / 100
              </p>
            </div>
            
            <div className="flex-1 text-right">
              <a href="/day11-weather" className="neon-footer-nav">
                Day 11
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
      
      {/* Day10専用サイバーパンクスタイル */}
      <style jsx>{`
        .neon-nav {
          background: linear-gradient(135deg, rgba(0, 0, 0, 0.95), rgba(20, 20, 40, 0.95));
          backdrop-filter: blur(12px);
          border-bottom: 2px solid #00FFFF;
          box-shadow: 
            0 0 20px rgba(0, 255, 255, 0.5),
            0 0 40px rgba(255, 0, 255, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
          position: relative;
          overflow: hidden;
        }
        
        .neon-nav::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(45deg, 
            transparent 30%, 
            rgba(0, 255, 255, 0.1) 50%, 
            transparent 70%
          );
          animation: gridPulse 4s ease-in-out infinite;
        }
        
        .scan-line {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, 
            transparent,
            #00FFFF,
            #FF00FF,
            #00FFFF,
            transparent
          );
          animation: scanMove 3s linear infinite;
        }
        
        @keyframes scanMove {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes gridPulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.7; }
        }
        
        .neon-title {
          color: #ffffff;
          font-family: 'Courier New', monospace;
          font-size: 1.25rem;
          font-weight: 700;
          text-shadow: 
            0 0 10px #00FFFF,
            0 0 20px #00FFFF,
            0 0 30px #00FFFF;
          letter-spacing: 1px;
          animation: titleGlow 2s ease-in-out infinite alternate;
        }
        
        @keyframes titleGlow {
          from { 
            text-shadow: 
              0 0 10px #00FFFF,
              0 0 20px #00FFFF,
              0 0 30px #00FFFF;
          }
          to { 
            text-shadow: 
              0 0 20px #FF00FF,
              0 0 30px #FF00FF,
              0 0 40px #FF00FF;
          }
        }
        
        .neon-status {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .status-text {
          color: #00FF00;
          font-family: 'Courier New', monospace;
          font-size: 0.875rem;
          font-weight: 600;
          text-shadow: 0 0 8px #00FF00;
          animation: statusPulse 1.5s ease-in-out infinite;
        }
        
        .status-dot {
          width: 8px;
          height: 8px;
          background: #00FF00;
          border-radius: 50%;
          box-shadow: 
            0 0 10px #00FF00,
            0 0 20px #00FF00;
          animation: statusPulse 1.5s ease-in-out infinite;
        }
        
        @keyframes statusPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        :global(.neon-button) {
          background: linear-gradient(135deg, rgba(0, 255, 255, 0.2), rgba(255, 0, 255, 0.2));
          color: #ffffff;
          border: 1px solid #00FFFF;
          border-radius: 8px;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
          box-shadow: 
            0 0 10px rgba(0, 255, 255, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
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
            rgba(255, 255, 255, 0.3),
            transparent
          );
          transition: left 0.5s;
        }
        
        :global(.neon-button:hover::before) {
          left: 100%;
        }
        
        :global(.neon-button:hover) {
          background: linear-gradient(135deg, rgba(0, 255, 255, 0.4), rgba(255, 0, 255, 0.4));
          text-shadow: 0 0 8px #00FFFF;
          transform: translateY(-2px) scale(1.05);
          box-shadow: 
            0 0 20px rgba(0, 255, 255, 0.6),
            0 0 40px rgba(255, 0, 255, 0.3),
            0 8px 16px rgba(0, 0, 0, 0.3);
          border-color: #FF00FF;
        }
        
        :global(.neon-button svg) {
          filter: drop-shadow(0 0 5px #00FFFF);
        }
        
        /* ネオンFooterスタイル */
        .neon-footer {
          background: linear-gradient(135deg, rgba(0, 0, 0, 0.95), rgba(20, 20, 40, 0.95));
          backdrop-filter: blur(12px);
          border-top: 2px solid #00FFFF;
          box-shadow: 
            0 -10px 30px rgba(0, 255, 255, 0.3),
            0 -5px 15px rgba(255, 0, 255, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
          position: relative;
          overflow: hidden;
        }
        
        .neon-footer-grid {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          opacity: 0.1;
          background-image: 
            linear-gradient(rgba(0, 255, 255, 0.2) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 255, 0.2) 1px, transparent 1px);
          background-size: 15px 15px;
          animation: gridPulse 4s ease-in-out infinite;
        }
        
        .neon-footer-scan {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, 
            transparent,
            #00FFFF,
            #FF00FF,
            #00FFFF,
            transparent
          );
          animation: scanMove 3s linear infinite;
        }
        
        .neon-footer-text {
          color: #ffffff;
          font-family: 'Courier New', monospace;
          font-size: 0.875rem;
          font-weight: 600;
          letter-spacing: 1px;
          text-shadow: 
            0 0 8px #00FFFF,
            0 0 15px #00FFFF;
          animation: titleGlow 2s ease-in-out infinite alternate;
        }
        
        .neon-footer-nav {
          display: inline-flex;
          align-items: center;
          padding: 0.75rem 1rem;
          font-size: 0.875rem;
          font-weight: 500;
          color: #ffffff;
          background: linear-gradient(135deg, rgba(0, 255, 255, 0.2), rgba(255, 0, 255, 0.2));
          border: 1px solid #00FFFF;
          border-radius: 8px;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          text-decoration: none;
          position: relative;
          overflow: hidden;
          box-shadow: 
            0 0 10px rgba(0, 255, 255, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
        }
        
        .neon-footer-nav::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, 
            transparent,
            rgba(255, 255, 255, 0.3),
            transparent
          );
          transition: left 0.5s;
        }
        
        .neon-footer-nav:hover::before {
          left: 100%;
        }
        
        .neon-footer-nav:hover {
          background: linear-gradient(135deg, rgba(0, 255, 255, 0.4), rgba(255, 0, 255, 0.4));
          text-shadow: 0 0 8px #00FFFF;
          transform: translateY(-2px) scale(1.05);
          box-shadow: 
            0 0 20px rgba(0, 255, 255, 0.6),
            0 0 40px rgba(255, 0, 255, 0.3),
            0 8px 16px rgba(0, 0, 0, 0.3);
          border-color: #FF00FF;
        }
        
        .neon-footer-nav svg {
          filter: drop-shadow(0 0 5px #00FFFF);
        }
      `}</style>

    </div>
  );
}
