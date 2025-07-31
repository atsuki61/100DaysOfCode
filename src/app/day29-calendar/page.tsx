'use client'

import { useCalendar } from './hooks/useCalendar'
import CalendarHeader from './components/CalendarHeader'
import CalendarGrid from './components/CalendarGrid'
import EventModal from './components/EventModal'

export default function Day29Page() {
  const {
    currentYear,
    currentMonth,
    selectedDate,
    isEventModalOpen,
    calendarMonth,
    selectedDateEvents,
    goToPreviousMonth,
    goToNextMonth,
    goToToday,
    handleDateClick,
    closeEventModal
  } = useCalendar()

  return (
    <div className="container mx-auto px-4 py-8"> {/* コンテナ, 中央配置, 横パディング4, 縦パディング8 */}
  
      {/* カレンダーヘッダー */}
      <CalendarHeader
        year={currentYear}
        month={currentMonth}
        onPreviousMonth={goToPreviousMonth}
        onNextMonth={goToNextMonth}
        onToday={goToToday}
      />

      {/* カレンダーグリッド */}
      <CalendarGrid
        calendarMonth={calendarMonth}
        onDateClick={handleDateClick}
      />

      {/* 凡例 */}
      <div className="mt-8 bg-white rounded-lg shadow-sm p-4"> {/* 上マージン8, 白背景, 角丸, 影, パディング4 */}
        <h3 className="text-lg font-semibold text-gray-900 mb-4"> {/* 大文字, セミボールド, グレー900, 下マージン4 */}
          イベントカテゴリ
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4"> {/* グリッド2列, md以上で4列, ギャップ4 */}
          <div className="flex items-center gap-2"> {/* フレックス, アイテム中央, ギャップ2 */}
            <div className="w-3 h-3 bg-red-500 rounded-full" /> {/* 幅3, 高さ3, 赤背景, 円形 */}
            <span className="text-sm text-gray-700">祝日</span> {/* 小文字, グレー文字 */}
          </div>
          
          <div className="flex items-center gap-2"> {/* フレックス, アイテム中央, ギャップ2 */}
            <div className="w-3 h-3 bg-purple-500 rounded-full" /> {/* 幅3, 高さ3, 紫背景, 円形 */}
            <span className="text-sm text-gray-700">仕事</span> {/* 小文字, グレー文字 */}
          </div>
          
          <div className="flex items-center gap-2"> {/* フレックス, アイテム中央, ギャップ2 */}
            <div className="w-3 h-3 bg-pink-500 rounded-full" /> {/* 幅3, 高さ3, ピンク背景, 円形 */}
            <span className="text-sm text-gray-700">個人</span> {/* 小文字, グレー文字 */}
          </div>
          
          <div className="flex items-center gap-2"> {/* フレックス, アイテム中央, ギャップ2 */}
            <div className="w-3 h-3 bg-yellow-500 rounded-full" /> {/* 幅3, 高さ3, 黄背景, 円形 */}
            <span className="text-sm text-gray-700">リマインダー</span> {/* 小文字, グレー文字 */}
          </div>
        </div>
      </div>

      {/* 操作ガイド */}
      <div className="mt-8 text-center text-sm text-gray-400"> {/* 上マージン8, 中央配置, 小文字, グレー400 */}
        <p>💡 ヒント: 日付をクリックでイベント詳細表示、矢印ボタンで月移動、今日ボタンで現在月表示</p>
      </div>

      {/* イベントモーダル */}
      <EventModal
        isOpen={isEventModalOpen}
        selectedDate={selectedDate}
        events={selectedDateEvents}
        onClose={closeEventModal}
      />
    </div>
  )
}