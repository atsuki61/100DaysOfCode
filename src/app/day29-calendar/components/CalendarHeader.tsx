import { MONTH_NAMES } from '../utils/calendarUtils'

interface CalendarHeaderProps {
  year: number
  month: number
  onPreviousMonth: () => void
  onNextMonth: () => void
  onToday: () => void
}

export default function CalendarHeader({
  year,
  month,
  onPreviousMonth,
  onNextMonth,
  onToday
}: CalendarHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6 bg-white rounded-lg shadow-sm p-4"> {/* フレックス, アイテム中央, 両端配置, 下マージン6, 白背景, 角丸, 影, パディング4 */}
      {/* 前月ボタン */}
      <button
        onClick={onPreviousMonth}
        className="p-2 rounded-lg hover:bg-gray-100 transition-colors group" // パディング2, 角丸, ホバー効果, トランジション, グループ
        title="前月"
      >
        <svg
          className="w-5 h-5 text-gray-600 group-hover:text-gray-900" // 幅5, 高さ5, グレー文字, グループホバー時ダーク
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      {/* 年月表示 */}
      <div className="text-center"> {/* 中央配置 */}
        <h1 className="text-2xl font-bold text-gray-900 mb-1"> {/* 2xl文字, ボールド, グレー900, 下マージン1 */}
          {year}年 {MONTH_NAMES[month]}
        </h1>
        <p className="text-sm text-gray-600"> {/* 小文字, グレー文字 */}
          {new Date().getFullYear() === year && new Date().getMonth() === month && '今月'}
        </p>
      </div>

      {/* ナビゲーションボタン群 */}
      <div className="flex items-center gap-2"> {/* フレックス, アイテム中央, ギャップ2 */}
        {/* 今日ボタン */}
        <button
          onClick={onToday}
          className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors" // 横パディング3, 縦パディング1, 小文字, 青背景, 白文字, 角丸, ホバー効果, トランジション
        >
          今日
        </button>

        {/* 次月ボタン */}
        <button
          onClick={onNextMonth}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors group" // パディング2, 角丸, ホバー効果, トランジション, グループ
          title="次月"
        >
          <svg
            className="w-5 h-5 text-gray-600 group-hover:text-gray-900" // 幅5, 高さ5, グレー文字, グループホバー時ダーク
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}