interface CategoryFilterProps {
  categories: string[]
  selectedCategory: string | null
  onCategoryChange: (category: string | null) => void
}

export default function CategoryFilter({
  categories,
  selectedCategory,
  onCategoryChange
}: CategoryFilterProps) {
  return (
    <div className="mb-8"> {/* 下マージン8 */}
      <h3 className="text-lg font-semibold text-gray-900 mb-4"> {/* 大文字, セミボールド, グレー900, 下マージン4 */}
        カテゴリで絞り込み
      </h3>
      
      <div className="flex flex-wrap gap-2"> {/* フレックス, 折り返し, ギャップ2 */}
        {/* 全て表示ボタン */}
        <button
          onClick={() => onCategoryChange(null)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${ // 横パディング4, 縦パディング2, 円形, 小文字, ミディアム, トランジション
            selectedCategory === null
              ? 'bg-blue-600 text-white shadow-md' // 青背景, 白文字, 影
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300' // グレー背景, グレー文字, ホバー効果
          }`}
        >
          すべて ({categories.reduce((total, cat) => total + categories.filter(c => c === cat).length, categories.length)})
        </button>

        {/* カテゴリボタン */}
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${ // 横パディング4, 縦パディング2, 円形, 小文字, ミディアム, トランジション
              selectedCategory === category
                ? 'bg-blue-600 text-white shadow-md' // 青背景, 白文字, 影
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300' // グレー背景, グレー文字, ホバー効果
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  )
} 