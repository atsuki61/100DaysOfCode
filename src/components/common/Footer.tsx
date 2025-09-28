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
      11: "/day11-weather",
      12: "/day12-darkmode",
      13: "/day13-calculator",
      14: "/day14-english-dictionary",
      15: "/day15-workout-planner",
      16: "/day16-music-search",
      17: "/day17-tic-tac-toe",
      18: "/day18-progress-chart",
      19: "/day19-quiz-app",
      20: "/day20-memory-game",
      21: "/day21-shopping-cart",
      22: "/day22-blog-site",
      23: "/day23-crypto-prices",
      24: "/day24-pokemon-pokedex",
      25: "/day25-current-location-map", // Day 25のルートを追加
      26: "/day26-password-generator", // Day 26のルートを追加
      27: "/day27-typing-speed-test", // Day 27のルートを追加
      28: "/day28-image-gallery", // Day 28のルートを追加
      29: "/day29-calendar", // Day 29のルートを追加
      30: "/day30-15-puzzle", // Day 30のルートを追加
      31: "/day31-redux-todo", // Day 31のルートを追加
      32: "/day32-user-registration-form", // Day 32のルートを追加
      33: "/day33-image-search", // Day 33のルートを追加
      34: "/day34-hangman", // Day 34のルートを追加
      35: "/day35-snake-game", // Day 35のルートを追加
      36: "/day36-qr-code", // Day 36のルートを追加
      37: "/day37-card-validator", // Day 37のルートを追加
      38: "/day38-drawing-app", // Day 38のルートを追加
      39: "/day39-music-player", // Day 39のルートを追加
      40: "/day40-dashboard", // Day 40のルートを追加
      41: "/day41-go-http-server", // Day 41のルートを追加
      42: "/day42-go-json-api", // Day 42のルートを追加
      43: "/day43-go-gin-hello", // Day 43のルートを追加
      44: "/day44-go-params", // Day 44のルートを追加
      45: "/day45-go-post-json", // Day 45のルートを追加
      46: "/day46-go-anime-quotes", // Day 46のルートを追加
    };
    return dayRoutes[day] || `/day${day}`;
  };

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-white to-slate-50 dark:from-gray-900 dark:to-gray-800 backdrop-blur-xl border-t border-black/5 dark:border-white/10 shadow-[0_-10px_30px_rgba(0,0,0,0.1)] dark:shadow-[0_-10px_30px_rgba(0,0,0,0.3)] h-20 transition-all duration-300">
      {/* Gradient shimmer line */}
      <div 
        className="absolute top-0 left-0 right-0 h-px animate-pulse opacity-70"
        style={{
          background: 'linear-gradient(to right, transparent, rgba(59,130,246,0.5) 25%, rgba(147,51,234,0.5) 50%, rgba(236,72,153,0.5) 75%, transparent)'
        }}
      ></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 h-full">
        <div className="flex justify-between items-center py-4 h-full">
          <div className="flex-1">
          
            {prevDay && (
              <Link 
                href={getDayPath(prevDay)}
                className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-2 sm:px-5 sm:py-3 text-sm font-semibold text-gray-700 dark:text-gray-300 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-800 dark:to-gray-700 border border-black/8 dark:border-white/10 rounded-xl transition-all duration-300 hover:bg-gradient-to-br hover:from-blue-500 hover:to-purple-600 hover:text-white hover:-translate-y-0.5 hover:scale-105 hover:shadow-[0_8px_25px_rgba(59,130,246,0.25)] group relative overflow-hidden"
              >
                <div className="flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5 rounded-md bg-white/20 dark:bg-black/20 transition-all duration-300 group-hover:bg-white/30 group-hover:scale-110">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                </div>
                <span className="font-semibold tracking-wide hidden sm:block">Day {prevDay}</span>
              </Link>
            )}
          </div>

          <div className="text-center flex-shrink-0 w-64 sm:w-80">
            <div className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2 tracking-widest uppercase transition-colors">
              100 Days Of Code Projects
            </div>
            <div className="relative w-full h-3 bg-gradient-to-r from-slate-100 to-slate-200 dark:from-gray-700 dark:to-gray-600 rounded-md overflow-hidden shadow-inner transition-colors">
              <div 
                className="h-full rounded-md transition-all duration-500 relative overflow-hidden"
                style={{ 
                  width: `${(currentDay / 100) * 100}%`,
                  background: 'linear-gradient(to right, #3b82f6, #8b5cf6 33%, #ec4899 66%, #f97316)'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[shimmer_2s_ease-in-out_infinite] translate-x-[-100%]"></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-bold text-gray-800 dark:text-gray-200 tracking-wide transition-colors">
                  Day {currentDay} / 100
                </span>
              </div>
            </div>
          </div>

          <div className="flex-1 flex justify-end">
            {nextDay && (
              <Link 
                href={getDayPath(nextDay)}
                className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-2 sm:px-5 sm:py-3 text-sm font-semibold text-gray-700 dark:text-gray-300 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-800 dark:to-gray-700 border border-black/8 dark:border-white/10 rounded-xl transition-all duration-300 hover:bg-gradient-to-br hover:from-blue-500 hover:to-purple-600 hover:text-white hover:-translate-y-0.5 hover:scale-105 hover:shadow-[0_8px_25px_rgba(59,130,246,0.25)] group relative overflow-hidden"
              >
                <span className="font-semibold tracking-wide hidden sm:block">Day {nextDay}</span>
                <div className="flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5 rounded-md bg-white/20 dark:bg-black/20 transition-all duration-300 group-hover:bg-white/30 group-hover:scale-110">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </footer>
  );
};

export default Footer; 