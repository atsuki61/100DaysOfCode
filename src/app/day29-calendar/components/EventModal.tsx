'use client'

import { useEffect } from 'react'
import { CalendarEvent } from '../types'
import { getHolidayByDate } from '../data/holidays'

interface EventModalProps {
  isOpen: boolean
  selectedDate: Date | null
  events: CalendarEvent[]
  onClose: () => void
}

export default function EventModal({ isOpen, selectedDate, events, onClose }: EventModalProps) {
  // Escキーでモーダルを閉じる
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen || !selectedDate) {
    return null
  }

  const dayOfWeek = ['日', '月', '火', '水', '木', '金', '土'][selectedDate.getDay()]
  const dateString = selectedDate.toISOString().split('T')[0]
  const holiday = getHolidayByDate(dateString)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-10"> {/* 固定位置, 全画面, z-index50, フレックス中央, 黒背景10% */}
      {/* 背景オーバーレイ */}
      <div
        className="absolute inset-0 cursor-pointer" // 絶対位置, 全体覆う, カーソルポインタ
        onClick={onClose}
      />

      {/* モーダルコンテンツ */}
      <div className="relative z-10 bg-white rounded-lg shadow-xl max-w-md w-full mx-4 max-h-[80vh] overflow-hidden"> {/* 相対位置, z-index10, 白背景, 角丸, 影xl, 最大幅md, 幅100%, 横マージン4, 最大高さ80vh, オーバーフロー隠し */}
        {/* ヘッダー */}
        <div className="flex items-center justify-between p-4 border-b"> {/* フレックス, アイテム中央, 両端配置, パディング4, 下ボーダー */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900"> {/* 大文字, セミボールド, グレー900 */}
              {selectedDate.getFullYear()}年{selectedDate.getMonth() + 1}月{selectedDate.getDate()}日
            </h2>
            <div className="flex items-center gap-2"> {/* フレックス, アイテム中央, ギャップ2 */}
              <p className="text-sm text-gray-600"> {/* 小文字, グレー文字 */}
                {dayOfWeek}曜日
              </p>
              {holiday && (
                <span className="text-sm text-red-600 font-medium"> {/* 小文字, 赤文字, ミディアム */}
                  {holiday.name}
                </span>
              )}
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors" // パディング2, 角丸, ホバー効果, トランジション
          >
            <svg
              className="w-5 h-5 text-gray-600" // 幅5, 高さ5, グレー文字
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* イベント一覧 */}
        <div className="p-4 max-h-96 overflow-y-auto"> {/* パディング4, 最大高さ96, 縦スクロール */}
          {events.length > 0 ? (
            <div className="space-y-3"> {/* 縦間隔3 */}
              {events.map((event) => (
                <div
                  key={event.id}
                  className="border rounded-lg p-3 hover:bg-gray-50 transition-colors" // ボーダー, 角丸, パディング3, ホバー効果, トランジション
                >
                  <div className="flex items-start gap-3"> {/* フレックス, アイテム開始, ギャップ3 */}
                    {/* カテゴリカラー */}
                    <div
                      className={`w-3 h-3 rounded-full mt-1 flex-shrink-0 ${ // 幅3, 高さ3, 円形, 上マージン1, 縮小しない
                        event.color
                      }`}
                    />
                    
                    <div className="flex-1 min-w-0"> {/* フレックス1, 最小幅0 */}
                      <h3 className="font-medium text-gray-900 mb-1"> {/* ミディアム, グレー900, 下マージン1 */}
                        {event.title}
                      </h3>
                      
                      {/* カテゴリ */}
                      <div className="flex items-center gap-2 mb-2"> {/* フレックス, アイテム中央, ギャップ2, 下マージン2 */}
                        <span className="inline-flex px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded"> {/* インラインフレックス, 横パディング2, 縦パディング1, 超小文字, ミディアム, グレー背景, グレー文字, 角丸 */}
                          {getCategoryLabel(event.category)}
                        </span>
                      </div>
                      
                      {/* 説明 */}
                      {event.description && (
                        <p className="text-sm text-gray-600"> {/* 小文字, グレー文字 */}
                          {event.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8"> {/* 中央配置, 縦パディング8 */}
              <div className="text-6xl mb-4">📅</div> {/* 6xl文字, 下マージン4 */}
              <h3 className="text-lg font-medium text-gray-700 mb-2"> {/* 大文字, ミディアム, グレー700, 下マージン2 */}
                この日にイベントはありません
              </h3>
              <p className="text-sm text-gray-500"> {/* 小文字, グレー文字 */}
                新しいイベントを追加してみませんか？
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// カテゴリの日本語表示
function getCategoryLabel(category: string): string {
  switch (category) {
    case 'work':
      return '仕事'
    case 'personal':
      return '個人'
    case 'holiday':
      return '祝日'
    case 'reminder':
      return 'リマインダー'
    default:
      return 'その他'
  }
}