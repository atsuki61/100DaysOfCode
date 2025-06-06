import Link from 'next/link';

type FooterProps = {
  currentDay: number;
  totalDays?: number;
  showNavigation?: boolean;
};

export default function Footer({ 
  currentDay, 
  totalDays = 100, 
  showNavigation = true 
}: FooterProps) {
  const previousDay = currentDay - 1;
  const nextDay = currentDay + 1;
  
  const hasPrevious = previousDay >= 1;
  const hasNext = nextDay <= totalDays;

  // day番号からパスを生成する関数
  const generateDayPath = (day: number): string => {
    const dayRoutes: { [key: number]: string } = {
      1: '/day1-counter',
      2: '/day2-anime-watchlist',
      3: '/day3-bmi-calculator',
      4: '/day4-todo-list',
      5: '/day5-janken',
      6: '/day6-stopwatch',
      7: '/day7-flashcard',
      8: '/day8-anime-character-search',
      9: '/day9-anime-quote-generator',
      // 今後のdayを追加していく
    };
    
    return dayRoutes[day] || `#day${day}`;
  };

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* 前の日への移動 */}
          <div className="flex-1">
            {showNavigation && hasPrevious ? (
              <Link 
                href={generateDayPath(previousDay)}
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
              >
                <svg 
                  className="w-4 h-4 mr-1" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Day {previousDay}
              </Link>
            ) : (
              <div></div>
            )}
          </div>

          {/* 中央のチャレンジ表示 */}
          <div className="flex-1 text-center">
            <p className="text-gray-500 text-sm font-medium">
              100DaysOfCodeチャレンジ - Day {currentDay} / {totalDays}
            </p>
          </div>

          {/* 次の日への移動 */}
          <div className="flex-1 text-right">
            {showNavigation && hasNext ? (
              <Link 
                href={generateDayPath(nextDay)}
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
              >
                Day {nextDay}
                <svg 
                  className="w-4 h-4 ml-1" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
} 