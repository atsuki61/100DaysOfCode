"use client";



import BackToHomeButton from "@/components/BackToHomeButton";
import React from "react";

export default function Day10Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col">
      {/* Day10専用ネオンヘッダー */}
      <nav className="neon-nav">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <BackToHomeButton className="neon-button" />
            </div>
            <div className="flex items-center">
              <h1 className="neon-title">
                Day10:支出管理アプリ
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
      
      <div className="neon-page-header">
        <div className="neon-header-grid"></div>
        <div className="neon-header-scan"></div>
        <div className="relative z-10 text-center pb-8">
          <h1 className="neon-page-title">
            支出管理アプリ
          </h1>
          <p className="neon-page-description">
            収入と支出を記録・管理するシンプルなアプリです。
          </p>
        </div>
      </div>
      <main className="flex-1 neon-main">{children}</main>
      
      {/* Day10専用ネオンFooter */}
      <footer className="neon-footer">
        <div className="neon-footer-grid"></div>
        <div className="neon-footer-scan"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 h-full">
          <div className="flex justify-between items-center py-4 h-full">
            <div className="flex-1">
              <a href="/day9-anime-quote-generator" className="neon-footer-nav">
                <div className="flex items-center justify-center w-5 h-5 rounded-md bg-cyan-500/20 transition-all duration-300 group-hover:bg-cyan-500/30 group-hover:scale-110">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </div>
                <span className="font-semibold tracking-wide hidden sm:block">Day 9</span>
              </a>
            </div>

            <div className="text-center flex-shrink-0 w-80">
              <div className="neon-footer-title">
                100 Days Of Code Projects
              </div>
              <div className="neon-progress-bar">
                                 <div className="neon-progress-fill">
                   <div className="neon-progress-shimmer"></div>
                 </div>
                <div className="neon-progress-text">
                  Day 10 / 100
                </div>
              </div>
            </div>

            <div className="flex-1 flex justify-end">
              <a href="/day11-weather" className="neon-footer-nav">
                <span className="font-semibold tracking-wide hidden sm:block">Day 11</span>
                <div className="flex items-center justify-center w-5 h-5 rounded-md bg-cyan-500/20 transition-all duration-300 group-hover:bg-cyan-500/30 group-hover:scale-110">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </a>
            </div>
          </div>
        </div>
      </footer>
      
      {/* Day10専用サイバーパンクスタイル */}
      <style jsx global>{`
        /* Day10専用のbody背景色上書き */
        body {
          background: linear-gradient(135deg, #0f172a, #581c87, #0f172a) !important;
          min-height: 100vh;
          margin: 0;
          padding: 0;
        }
        
        /* Day10専用のスタイル */
        .neon-page-header {
          background: linear-gradient(135deg, rgba(0, 0, 0, 0.95), rgba(20, 20, 40, 0.95));
          backdrop-filter: blur(12px);
          border-bottom: 2px solid #00FFFF;
          box-shadow: 
            0 0 20px rgba(0, 255, 255, 0.3),
            0 0 40px rgba(255, 0, 255, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
          position: relative;
          overflow: hidden;
        }
        
        .neon-header-grid {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          opacity: 0.1;
          background-image: 
            linear-gradient(rgba(0, 255, 255, 0.2) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 255, 0.2) 1px, transparent 1px);
          background-size: 20px 20px;
          animation: gridPulse 4s ease-in-out infinite;
        }
        
        .neon-header-scan {
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
        
        .neon-page-title {
          color: #ffffff;
          font-family: 'Courier New', monospace;
          font-size: 2.25rem;
          font-weight: 700;
          text-shadow: 
            0 0 15px #00FFFF,
            0 0 30px #00FFFF,
            0 0 45px #00FFFF;
          letter-spacing: 2px;
          margin-bottom: 0.5rem;
          padding-top: 2rem;
          animation: titleGlow 2s ease-in-out infinite alternate;
        }
        
        .neon-page-description {
          color: #00FFFF;
          font-family: 'Courier New', monospace;
          font-size: 1rem;
          font-weight: 400;
          text-shadow: 0 0 10px #00FFFF;
          letter-spacing: 1px;
          opacity: 0.8;
        }
        
        .neon-main {
          background: linear-gradient(135deg, rgba(0, 0, 0, 0.8), rgba(20, 20, 40, 0.8));
          backdrop-filter: blur(8px);
          position: relative;
          overflow-y: auto; /* 縦スクロールを有効化 */
          padding: 1.5rem;
          flex: 1; /* flex-growを維持 */
        }
        
        .neon-main::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          opacity: 0.05;
          background-image: 
            linear-gradient(rgba(0, 255, 255, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 255, 0.3) 1px, transparent 1px);
          background-size: 25px 25px;
          animation: gridPulse 6s ease-in-out infinite;
          pointer-events: none;
        }
        
        :global(.neon-container) {
          background: linear-gradient(135deg, rgba(0, 0, 0, 0.9), rgba(20, 20, 40, 0.9));
          backdrop-filter: blur(12px);
          border: 2px solid rgba(0, 255, 255, 0.3);
          border-radius: 16px;
          padding: 2rem;
          box-shadow: 
            0 0 30px rgba(0, 255, 255, 0.2),
            0 0 60px rgba(255, 0, 255, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
          position: relative;
          overflow: hidden;
        }
        
        :global(.neon-container::before) {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(45deg, 
            transparent 30%, 
            rgba(0, 255, 255, 0.05) 50%, 
            transparent 70%
          );
          animation: gridPulse 8s ease-in-out infinite;
          pointer-events: none;
        }
        
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
          height: 5rem; /* h-20と同じ */
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
        

        
        .neon-footer-nav {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.25rem; /* px-5 py-3と同じ */
          font-size: 0.875rem;
          font-weight: 600;
          color: #ffffff;
          background: linear-gradient(135deg, rgba(0, 255, 255, 0.2), rgba(255, 0, 255, 0.2));
          border: 1px solid #00FFFF;
          border-radius: 0.75rem; /* rounded-xlと同じ */
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
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
          transform: translateY(-0.125rem) scale(1.05); /* -translate-y-0.5と同じ */
          box-shadow: 
            0 0 20px rgba(0, 255, 255, 0.6),
            0 0 40px rgba(255, 0, 255, 0.3),
            0 8px 25px rgba(0, 255, 255, 0.25);
          border-color: #FF00FF;
        }
        
        .neon-footer-nav svg {
          filter: drop-shadow(0 0 5px #00FFFF);
        }
        
        .neon-footer-title {
          font-size: 0.75rem;
          font-weight: 600;
          color: #00FFFF;
          margin-bottom: 0.5rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          text-shadow: 0 0 8px #00FFFF;
          font-family: 'Courier New', monospace;
        }
        
        .neon-progress-bar {
          position: relative;
          width: 100%;
          height: 0.75rem;
          background: linear-gradient(135deg, rgba(0, 0, 0, 0.8), rgba(20, 20, 40, 0.8));
          border: 1px solid #00FFFF;
          border-radius: 0.375rem;
          overflow: hidden;
          box-shadow: 
            inset 0 2px 4px rgba(0, 0, 0, 0.5),
            0 0 10px rgba(0, 255, 255, 0.3);
        }
        
        .neon-progress-fill {
          height: 100%;
          width: 10%;
          background: linear-gradient(90deg, #00FFFF, #FF00FF, #00FFFF);
          border-radius: 0.25rem;
          position: relative;
          overflow: hidden;
          transition: width 0.5s ease;
        }
        
        .neon-progress-shimmer {
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, 
            transparent,
            rgba(255, 255, 255, 0.4),
            transparent
          );
          animation: shimmerMove 2s ease-in-out infinite;
          transform: translateX(-100%);
        }
        
        .neon-progress-text {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
          font-weight: 700;
          color: #ffffff;
          text-shadow: 0 0 8px #000000;
          letter-spacing: 0.05em;
          font-family: 'Courier New', monospace;
        }
        
        @keyframes shimmerMove {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>

    </div>
  );
}
