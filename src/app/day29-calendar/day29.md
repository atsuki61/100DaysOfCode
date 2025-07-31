# Day 29: カレンダーアプリ

## 📋 プロジェクト概要

当月の日付をカレンダー形式で表示し、イベントの日を強調表示するカレンダーアプリを作成しました。

### 🎯 主な機能

1. **月間カレンダー表示** - 7列×6行のグリッドレイアウト
2. **イベント表示** - 各日付にイベントを3件まで表示（省略機能付き）
3. **今日の日付ハイライト** - 現在の日付を青色でハイライト
4. **週末の色分け** - 日曜日（赤）、土曜日（青）の色分け表示
5. **月間ナビゲーション** - 前月・次月への移動
6. **今日ボタン** - 現在の月へ瞬時に戻る機能
7. **イベント詳細モーダル** - 日付クリックでその日のイベント詳細を表示
8. **カテゴリ別色分け** - 祝日、仕事、個人、リマインダーの4カテゴリ

## 🛠️ 使用技術

- **React**: 18.0+ (useState, useMemo, useEffect)
- **Next.js**: 15.3.2 (App Router)
- **TypeScript**: 型安全性の確保
- **Tailwind CSS**: グリッドレイアウト、レスポンシブデザイン

## 📁 ファイル構成

```
src/app/day29-calendar/
├── page.tsx              # メインページ
├── layout.tsx            # レイアウト設定
├── types.ts              # 型定義
├── day29.md             # 学習記録（このファイル）
├── data/
│   └── events.ts        # イベントデータとユーティリティ関数
├── utils/
│   └── calendarUtils.ts # カレンダー生成ユーティリティ関数
├── hooks/
│   └── useCalendar.ts   # カレンダー状態管理フック
└── components/
    ├── CalendarHeader.tsx # ナビゲーションヘッダー
    ├── CalendarGrid.tsx  # カレンダーグリッド
    ├── CalendarCell.tsx  # 日付セル
    └── EventModal.tsx    # イベント詳細モーダル
```

## 🔧 主要な技術実装

### 1. 型定義（types.ts）

```typescript
export interface CalendarEvent {
  id: string
  title: string
  date: string // YYYY-MM-DD format
  category: 'work' | 'personal' | 'holiday' | 'reminder'
  color: string
  description?: string
}

export interface CalendarDay {
  date: Date
  day: number
  isCurrentMonth: boolean
  isToday: boolean
  isWeekend: boolean
  events: CalendarEvent[]
}

export interface CalendarMonth {
  year: number
  month: number // 0-11 (JavaScript Date format)
  monthName: string
  weeks: CalendarWeek[]
}
```

### 2. カレンダー生成ロジック（calendarUtils.ts）

```typescript
// カレンダーの週を生成
export const generateCalendarWeeks = (year: number, month: number): CalendarWeek[] => {
  const weeks: CalendarWeek[] = []
  const firstDay = getFirstDayOfMonth(year, month)
  const lastDay = getLastDayOfMonth(year, month)
  
  // 月の最初の週の開始日を計算（日曜日始まり）
  const startDate = new Date(firstDay)
  startDate.setDate(firstDay.getDate() - firstDay.getDay())
  
  // 月の最後の週の終了日を計算
  const endDate = new Date(lastDay)
  endDate.setDate(lastDay.getDate() + (6 - lastDay.getDay()))
  
  // 週ごとにカレンダーを生成
  const currentDate = new Date(startDate)
  
  while (currentDate <= endDate) {
    const week: CalendarWeek = { days: [] }
    
    // 1週間分の日付を生成
    for (let i = 0; i < 7; i++) {
      const isCurrentMonth = currentDate.getMonth() === month
      const calendarDay = createCalendarDay(new Date(currentDate), isCurrentMonth)
      week.days.push(calendarDay)
      
      // 次の日に進む
      currentDate.setDate(currentDate.getDate() + 1)
    }
    
    weeks.push(week)
  }
  
  return weeks
}
```

### 3. 日付判定ロジック（calendarUtils.ts）

```typescript
// 指定された日付が今日かどうか判定
export const isToday = (date: Date): boolean => {
  const today = getToday()
  return date.getFullYear() === today.getFullYear() &&
         date.getMonth() === today.getMonth() &&
         date.getDate() === today.getDate()
}

// 指定された日付が週末かどうか判定
export const isWeekend = (date: Date): boolean => {
  const dayOfWeek = date.getDay()
  return dayOfWeek === 0 || dayOfWeek === 6 // 日曜日または土曜日
}
```

### 4. レスポンシブカレンダーグリッド（CalendarGrid.tsx）

```typescript
return (
  <div className="bg-white rounded-lg shadow-sm overflow-hidden">
    {/* 曜日ヘッダー */}
    <div className="grid grid-cols-7 bg-gray-100 border-b">
      {DAY_NAMES.map((dayName, index) => (
        <div
          key={dayName}
          className={`p-3 text-center text-sm font-semibold ${
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
    <div className="grid grid-cols-7">
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
```

### 5. 日付セルのスタイリング（CalendarCell.tsx）

```typescript
// セルのベーススタイル
const baseClasses = "relative h-24 p-2 border-b border-r border-gray-200 cursor-pointer transition-all duration-200"

// 当月でない日のスタイル
const notCurrentMonthClasses = !isCurrentMonth 
  ? "bg-gray-50 text-gray-400"
  : "bg-white hover:bg-gray-50"

// 今日のスタイル
const todayClasses = isToday 
  ? "bg-blue-50 border-blue-200"
  : ""

// 週末のテキストカラー
const weekendTextClasses = isCurrentMonth
  ? isSunday 
    ? "text-red-600" // 日曜日は赤
    : isSaturday 
      ? "text-blue-600" // 土曜日は青
      : "text-gray-900" // 平日は黒
  : ""
```

### 6. 状態管理カスタムフック（useCalendar.ts）

```typescript
export function useCalendar() {
  const today = getToday()
  const [currentYear, setCurrentYear] = useState(today.getFullYear())
  const [currentMonth, setCurrentMonth] = useState(today.getMonth())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [isEventModalOpen, setIsEventModalOpen] = useState(false)

  // カレンダー月データを生成
  const calendarMonth: CalendarMonth = useMemo(() => {
    return generateCalendarMonth(currentYear, currentMonth)
  }, [currentYear, currentMonth])

  // 選択された日のイベント
  const selectedDateEvents = useMemo(() => {
    if (!selectedDate) return []
    
    return calendarMonth.weeks
      .flatMap(week => week.days)
      .find(day => day.date.getTime() === selectedDate.getTime())?.events || []
  }, [selectedDate, calendarMonth])

  return {
    currentYear, currentMonth, selectedDate, isEventModalOpen,
    calendarMonth, selectedDateEvents,
    goToPreviousMonth, goToNextMonth, goToToday,
    handleDateClick, closeEventModal
  }
}
```

### 7. イベントモーダル（EventModal.tsx）

```typescript
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
```

## 🎨 デザインとUX特徴

### 日本の週表示
- 日曜日始まりのカレンダー
- 日曜日（赤）、土曜日（青）の色分け
- 平日はグレー系統で統一

### 今日のハイライト
- 青色の背景とボーダーで強調
- 右上に青い丸印を表示
- フォント太字で視認性向上

### イベント表示
- 最大3件のイベントをカード形式で表示
- 3件を超える場合は「+N件」で省略表示
- カテゴリ別の色分け（祝日:赤、仕事:紫、個人:ピンク、リマインダー:黄）

### インタラクティブ要素
- セルホバー時の微妙な背景変化
- クリック時のモーダル表示
- ESCキーでモーダル閉鎖
- スムーズなトランジション効果

## 📅 Date API活用

### 基本的な日付操作
- `new Date()` - 現在日時の取得
- `getFullYear()`, `getMonth()`, `getDate()` - 年月日の取得
- `getDay()` - 曜日の取得（0:日曜〜6:土曜）

### 月の境界計算
- `new Date(year, month, 1)` - 月初日
- `new Date(year, month + 1, 0)` - 月末日
- 前月・次月の跨ぎ計算

### 日付比較とフォーマット
- `getTime()` - ミリ秒での日付比較
- `YYYY-MM-DD`形式への変換
- 日付の加算・減算処理

## 🎓 学習ポイント

### 新しく学んだこと

1. **二次元配列でのカレンダー生成**
   - 週単位での日付配列作成
   - 前月・当月・次月の日付混在処理

2. **Date APIの活用**
   - 月の境界日の計算
   - 曜日判定と週末検出
   - 日付比較とフォーマット

3. **条件付きレンダリング**
   - 当月/非当月の表示切り替え
   - 今日/過去/未来の状態管理
   - イベント有無による表示分岐

4. **UIコンポーネント設計**
   - 責任分離（ヘッダー、グリッド、セル、モーダル）
   - プロップスインターフェース設計
   - 再利用可能なコンポーネント作成

5. **複雑な状態管理**
   - カスタムフックでの状態集約
   - useMemoによる計算値キャッシュ
   - イベント連携とモーダル制御

### 改善できる点

1. **イベント管理機能** - CRUD操作の実装
2. **カレンダービュー** - 週表示、日表示の追加
3. **イベント繰り返し** - 毎週、毎月の繰り返しイベント
4. **外部カレンダー連携** - Google Calendar API連携
5. **ドラッグ&ドロップ** - イベントの日付変更機能
6. **エクスポート機能** - iCal形式でのデータ出力

## 🔗 関連リンク

- [Date - JavaScript MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Date)
- [Tailwind CSS Grid](https://tailwindcss.com/docs/grid-template-columns)
- [React useMemo](https://react.dev/reference/react/useMemo)

## 📝 感想

Day29では、カレンダーアプリの実装を通じてDate APIの活用とグリッドレイアウトの設計方法を深く学ぶことができました。特に、二次元配列でのカレンダー生成ロジックと、条件付きレンダリングを組み合わせたUI表現は非常に実用的な知識となりました。

日付計算の複雑さ（月末の日数の違い、曜日計算、前月・次月との境界処理）を体感し、Date APIの重要性を実感しました。また、useMemoを活用した計算値のキャッシュ化により、パフォーマンスを意識した実装の重要性も学びました。

カレンダーアプリは多くのアプリケーションで基本的な機能として使われるため、今回の実装経験は今後の開発で大いに活用できると思います。