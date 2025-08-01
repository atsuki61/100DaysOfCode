import { CalendarDay } from '../types'

interface CalendarCellProps {
  calendarDay: CalendarDay
  onClick: () => void
}

export default function CalendarCell({ calendarDay, onClick }: CalendarCellProps) {
  const { day, isCurrentMonth, isToday, events, date } = calendarDay
  const dayOfWeek = date.getDay()
  const isSunday = dayOfWeek === 0
  const isSaturday = dayOfWeek === 6

  // セルのベーススタイル
  const baseClasses = "relative h-24 p-2 border-b border-r border-gray-200 cursor-pointer transition-all duration-200 z-10" // 相対位置, 高さ24, パディング2, ボーダー, カーソルポインタ, トランジション, z-index 10

  // 当月でない日のスタイル
  const notCurrentMonthClasses = !isCurrentMonth 
    ? "bg-gray-50 text-gray-400" // グレー背景, グレー文字
    : "bg-white hover:bg-gray-50" // 白背景, ホバー効果

  // 今日のスタイル
  const todayClasses = isToday 
    ? "bg-blue-50 border-blue-200" // 薄青背景, 青ボーダー
    : ""

  // 週末のテキストカラー
  const weekendTextClasses = isCurrentMonth
    ? isSunday 
      ? "text-red-600" // 日曜日は赤
      : isSaturday 
        ? "text-blue-600" // 土曜日は青
        : "text-gray-900" // 平日は黒
    : ""

  return (
    <div
      className={`${baseClasses} ${notCurrentMonthClasses} ${todayClasses}`}
      onClick={onClick}
    >
      {/* 日付 */}
      <div className="flex items-center justify-between mb-1 relative z-10"> {/* フレックス, アイテム中央, 両端配置, 下マージン1, 相対位置, z-index 10 */}
        <span
          className={`text-sm font-medium ${ // 小文字, ミディアム
            isToday 
              ? 'text-blue-600 font-bold' // 今日は青太字
              : weekendTextClasses
          }`}
        >
          {day}
        </span>
        
        {/* 今日の印 */}
        {isToday && (
          <div className="w-2 h-2 bg-blue-600 rounded-full" /> // 幅2, 高さ2, 青背景, 円形
        )}
      </div>

      {/* イベント */}
      <div className="space-y-1 relative z-10"> {/* 縦間隔1, 相対位置, z-index 10 */}
        {events.slice(0, 3).map((event) => (
          <div
            key={event.id}
            className={`text-xs px-1 py-0.5 rounded text-white truncate ${ // 超小文字, 横パディング1, 縦パディング0.5, 角丸, 白文字, 省略
              event.color
            }`}
            title={event.title}
          >
            {event.title}
          </div>
        ))}
        
        {/* 3つ以上のイベントがある場合の省略表示 */}
        {events.length > 3 && (
          <div className="text-xs text-gray-500 px-1"> {/* 超小文字, グレー文字, 横パディング1 */}
            +{events.length - 3}件
          </div>
        )}
      </div>

      {/* ホバー時のオーバーレイ - より軽い効果に変更 */}
      {isCurrentMonth && (
        <div className="absolute inset-0 bg-gray-200 bg-opacity-0 hover:bg-opacity-10 transition-all duration-200 pointer-events-none z-0" /> // 絶対位置, 全体覆う, 薄いグレー背景, 透明度0→10%, トランジション, ポインターイベント無効, z-index 0
      )}
    </div>
  )
}