import { CalendarMonth } from '../types'
import { DAY_NAMES } from '../utils/calendarUtils'
import CalendarCell from './CalendarCell'

interface CalendarGridProps {
  calendarMonth: CalendarMonth
  onDateClick: (date: Date) => void
}

export default function CalendarGrid({ calendarMonth, onDateClick }: CalendarGridProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden"> {/* 白背景, 角丸, 影, オーバーフロー隠し */}
      {/* 曜日ヘッダー */}
      <div className="grid grid-cols-7 bg-gray-100 border-b"> {/* グリッド7列, グレー背景, 下ボーダー */}
        {DAY_NAMES.map((dayName, index) => (
          <div
            key={dayName}
            className={`p-3 text-center text-sm font-semibold ${ // パディング3, 中央配置, 小文字, セミボールド
              index === 0 ? 'text-red-600' : // 日曜日は赤
              index === 6 ? 'text-blue-600' : // 土曜日は青
              'text-gray-700' // 平日はグレー
            }`}
          >
            {dayName}
          </div>
        ))}
      </div>

      {/* カレンダーグリッド */}
      <div className="grid grid-cols-7"> {/* グリッド7列 */}
        {calendarMonth.weeks.map((week, weekIndex) =>
          week.days.map((day, dayIndex) => (
            <CalendarCell
              key={`${weekIndex}-${dayIndex}`}
              calendarDay={day}
              onClick={() => onDateClick(day.date)}
            />
          ))
        )}
      </div>
    </div>
  )
}