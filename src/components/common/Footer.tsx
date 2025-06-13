"use client";

import Link from "next/link";

interface FooterProps {
  currentDay: number;
}

const Footer = ({ currentDay }: FooterProps) => {
  const prevDay = currentDay > 1 ? currentDay - 1 : null;
  const nextDay = currentDay < 100 ? currentDay + 1 : null;

  const getDayPath = (day: number) => {
    const dayRoutes: { [key: number]: string } = {
      1: "/day1-counter",
      2: "/day2-anime-watchlist", 
      3: "/day3-bmi-calculator",
      4: "/day4-todo-list",
      5: "/day5-janken",
      6: "/day6-stopwatch",
      7: "/day7-flashcard",
      8: "/day8-anime-character-search",
      9: "/day9-anime-quote-generator",
      10: "/day10-expense-tracker",
      11: "/day11-weather"
    };
    return dayRoutes[day] || `/day${day}`;
  };

  return (
    <>
      <footer className="fixed bottom-0 left-0 right-0 z-50 modern-footer">
        <div className="footer-gradient"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex justify-between items-center py-4">
            <div className="flex-1">
              {prevDay && (
                <Link
                  href={getDayPath(prevDay)}
                  className="nav-button nav-prev"
                >
                  <div className="button-icon">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </div>
                  <span className="button-text">Day {prevDay}</span>
                </Link>
              )}
            </div>
            
            <div className="text-center progress-container">
              <div className="progress-text">
                100DaysOfCode チャレンジ
              </div>
              <div className="progress-bar-container">
                <div 
                  className="progress-bar"
                  style={{ width: `${(currentDay / 100) * 100}%` }}
                ></div>
                <div className="progress-label">
                  Day {currentDay} / 100
                </div>
              </div>
            </div>
            
            <div className="flex-1 flex justify-end">
              {nextDay && (
                <Link
                  href={getDayPath(nextDay)}
                  className="nav-button nav-next"
                >
                  <span className="button-text">Day {nextDay}</span>
                  <div className="button-icon">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>
      </footer>
      
      <style jsx>{`
        .modern-footer {
          background: linear-gradient(135deg, 
            rgba(255, 255, 255, 1) 0%,
            rgba(248, 250, 252, 1) 100%
          );
          backdrop-filter: blur(20px);
          border-top: 1px solid rgba(0, 0, 0, 0.08);
          box-shadow: 
            0 -10px 30px rgba(0, 0, 0, 0.1),
            0 -1px 0 rgba(255, 255, 255, 0.5);
          position: fixed !important;
          bottom: 0 !important;
          left: 0 !important;
          right: 0 !important;
          z-index: 50 !important;
          overflow: hidden;
          height: 80px;
        }
        
        .footer-gradient {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, 
            transparent,
            rgba(59, 130, 246, 0.5),
            rgba(147, 51, 234, 0.5),
            rgba(236, 72, 153, 0.5),
            transparent
          );
          animation: shimmer 3s ease-in-out infinite;
        }
        
        @keyframes shimmer {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        
        .nav-button {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.25rem;
          font-size: 0.875rem;
          font-weight: 600;
          color: #374151;
          background: linear-gradient(135deg, #f8fafc, #f1f5f9);
          border: 1px solid rgba(0, 0, 0, 0.08);
          border-radius: 12px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          text-decoration: none;
          position: relative;
          overflow: hidden;
          box-shadow: 
            0 2px 8px rgba(0, 0, 0, 0.04),
            0 1px 0 rgba(255, 255, 255, 0.8);
        }
        
        .nav-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, 
            transparent,
            rgba(255, 255, 255, 0.4),
            transparent
          );
          transition: left 0.6s;
        }
        
        .nav-button:hover::before {
          left: 100%;
        }
        
        .nav-button:hover {
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          color: white;
          transform: translateY(-2px) scale(1.02);
          box-shadow: 
            0 8px 25px rgba(59, 130, 246, 0.25),
            0 4px 12px rgba(0, 0, 0, 0.1);
          border-color: transparent;
        }
        
        .button-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 20px;
          height: 20px;
          border-radius: 6px;
          background: rgba(255, 255, 255, 0.2);
          transition: all 0.3s ease;
        }
        
        .nav-button:hover .button-icon {
          background: rgba(255, 255, 255, 0.3);
          transform: scale(1.1);
        }
        
        .button-text {
          font-weight: 600;
          letter-spacing: 0.025em;
        }
        
        .progress-container {
          flex: 0 0 300px;
        }
        
        .progress-text {
          font-size: 0.75rem;
          font-weight: 600;
          color: #6b7280;
          margin-bottom: 0.5rem;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }
        
        .progress-bar-container {
          position: relative;
          width: 100%;
          height: 8px;
          background: linear-gradient(90deg, #f1f5f9, #e2e8f0);
          border-radius: 4px;
          overflow: hidden;
          box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
        }
        
        .progress-bar {
          height: 100%;
          background: linear-gradient(90deg, 
            #3b82f6,
            #8b5cf6,
            #ec4899,
            #f59e0b
          );
          border-radius: 4px;
          transition: width 0.5s ease;
          position: relative;
          overflow: hidden;
        }
        
        .progress-bar::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(90deg, 
            transparent,
            rgba(255, 255, 255, 0.3),
            transparent
          );
          animation: progressShine 2s ease-in-out infinite;
        }
        
        @keyframes progressShine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        .progress-label {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 0.75rem;
          font-weight: 700;
          color: #374151;
          text-shadow: 0 1px 2px rgba(255, 255, 255, 0.8);
          letter-spacing: 0.025em;
        }
        
        /* レスポンシブ対応 */
        @media (max-width: 768px) {
          .progress-container {
            flex: 0 0 200px;
          }
          
          .nav-button {
            padding: 0.5rem 0.75rem;
            font-size: 0.8rem;
          }
          
          .button-text {
            display: none;
          }
          
          .progress-text {
            font-size: 0.7rem;
          }
          
          .progress-label {
            font-size: 0.7rem;
          }
        }
      `}</style>
    </>
  );
};

export default Footer; 