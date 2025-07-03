'use client';

import React, { useState } from 'react';
import { WorkoutExercise, FilterCategory, SortOption } from '../types';

interface ExerciseListProps {
  exercises: WorkoutExercise[];
  onEdit?: (exercise: WorkoutExercise) => void;
  onDelete?: (exerciseId: string) => void;
  onAddToPlan?: (exercise: WorkoutExercise) => void;
}

const ExerciseList: React.FC<ExerciseListProps> = ({
  exercises,
  onEdit,
  onDelete,
  onAddToPlan
}) => {
  const [filterCategory, setFilterCategory] = useState<FilterCategory>('all');
  const [sortBy, setSortBy] = useState<SortOption>('createdAt');
  const [searchTerm, setSearchTerm] = useState('');

  // Category labels mapping
  const categoryLabels = {
    strength: '筋トレ',
    cardio: '有酸素運動',
    flexibility: 'ストレッチ・柔軟性',
    sports: 'スポーツ'
  };

  // Filter and sort exercises
  const filteredAndSortedExercises = exercises
    .filter(exercise => {
      const matchesCategory = filterCategory === 'all' || exercise.category === filterCategory;
      const matchesSearch = exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           exercise.notes?.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name, 'ja');
        case 'category':
          return a.category.localeCompare(b.category);
        case 'createdAt':
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const renderExerciseDetails = (exercise: WorkoutExercise) => {
    const details = [];
    
    if (exercise.sets && exercise.reps) {
      details.push(`${exercise.sets}セット × ${exercise.reps}回`);
    }
    if (exercise.weight) {
      details.push(`${exercise.weight}kg`);
    }
    if (exercise.duration) {
      details.push(`${exercise.duration}分`);
    }
    if (exercise.distance) {
      details.push(`${exercise.distance}km`);
    }
    
    return details.length > 0 ? details.join(' | ') : '詳細なし';
  };

  if (exercises.length === 0) {
    return (
      <div className="text-center py-12"> {/* 中央寄せ, 縦パディング12 */}
        <div className="text-gray-500 text-lg mb-4">📝</div> {/* グレー文字, 大文字, 下マージン4 */}
        <p className="text-gray-600 text-lg">まだエクササイズが登録されていません</p> {/* グレー文字, 大文字 */}
        <p className="text-gray-500 text-sm mt-2">上のフォームから新しいエクササイズを追加してみましょう！</p> {/* グレー文字, 小文字, 上マージン2 */}
      </div>
    );
  }

  return (
    <div className="space-y-6"> {/* 縦スペース6 */}
      {/* Filter and Search Controls */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200"> {/* 白背景, パディング4, 角丸, 影, ボーダー */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4"> {/* グリッドレイアウト, 中画面以上は3列, ギャップ4 */}
          {/* Search */}
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1"> {/* ブロック表示, 小文字, フォント中, グレー文字, 下マージン1 */}
              検索
            </label>
            <input
              type="text"
              id="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="エクササイズ名やメモで検索..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" // 横幅全体, パディング, ボーダー, 角丸, フォーカス効果
            />
          </div>

          {/* Category Filter */}
          <div>
            <label htmlFor="category-filter" className="block text-sm font-medium text-gray-700 mb-1">
              カテゴリーで絞り込み
            </label>
            <select
              id="category-filter"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value as FilterCategory)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">すべて</option>
              <option value="strength">筋トレ</option>
              <option value="cardio">有酸素運動</option>
              <option value="flexibility">ストレッチ・柔軟性</option>
              <option value="sports">スポーツ</option>
            </select>
          </div>

          {/* Sort */}
          <div>
            <label htmlFor="sort-by" className="block text-sm font-medium text-gray-700 mb-1">
              並び順
            </label>
            <select
              id="sort-by"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="createdAt">作成日時（新しい順）</option>
              <option value="name">名前順</option>
              <option value="category">カテゴリー順</option>
            </select>
          </div>
        </div>

        {/* Results count */}
        <div className="mt-4 text-sm text-gray-600"> {/* 上マージン4, 小文字, グレー文字 */}
          {filteredAndSortedExercises.length} 件のエクササイズが見つかりました
        </div>
      </div>

      {/* Exercise Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"> {/* グリッドレイアウト, 中画面は2列, 大画面は3列, ギャップ4 */}
        {filteredAndSortedExercises.map((exercise) => (
          <div
            key={exercise.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow duration-200" // 白背景, 角丸, 影, ボーダー, パディング4, ホバー効果, トランジション
          >
            {/* Header */}
            <div className="flex justify-between items-start mb-3"> {/* フレックス表示, 両端寄せ, アイテム上寄せ, 下マージン3 */}
              <div className="flex-1"> {/* フレックス1 */}
                <h3 className="font-semibold text-lg text-gray-900 mb-1"> {/* フォント中太, 大文字, グレー文字, 下マージン1 */}
                  {exercise.name}
                </h3>
                <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                  exercise.category === 'strength' ? 'bg-red-100 text-red-800' :
                  exercise.category === 'cardio' ? 'bg-blue-100 text-blue-800' :
                  exercise.category === 'flexibility' ? 'bg-green-100 text-green-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}> {/* インラインブロック, パディング, 極小文字, 角丸, カテゴリー別色分け */}
                  {categoryLabels[exercise.category]}
                </span>
              </div>
            </div>

            {/* Details */}
            <div className="mb-3"> {/* 下マージン3 */}
              <p className="text-sm text-gray-600 mb-2"> {/* 小文字, グレー文字, 下マージン2 */}
                {renderExerciseDetails(exercise)}
              </p>
              {exercise.notes && (
                                 <p className="text-sm text-gray-500 italic"> {/* 小文字, グレー文字, 斜体 */}
                   &ldquo;{exercise.notes}&rdquo;
                 </p>
              )}
            </div>

            {/* Date */}
            <div className="text-xs text-gray-400 mb-3"> {/* 極小文字, グレー文字, 下マージン3 */}
              {formatDate(exercise.createdAt)}
            </div>

            {/* Actions */}
            <div className="flex gap-2"> {/* フレックス表示, ギャップ2 */}
              {onAddToPlan && (
                <button
                  onClick={() => onAddToPlan(exercise)}
                  className="flex-1 bg-green-600 text-white text-sm py-1 px-2 rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200" // フレックス1, 緑背景, 白文字, 小文字, パディング, 角丸, ホバー効果
                >
                  プランに追加
                </button>
              )}
              
              {onEdit && (
                <button
                  onClick={() => onEdit(exercise)}
                  className="bg-blue-600 text-white text-sm py-1 px-3 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200" // 青背景, 白文字, 小文字, パディング, 角丸, ホバー効果
                >
                  編集
                </button>
              )}
              
              {onDelete && (
                <button
                  onClick={() => {
                    if (window.confirm(`「${exercise.name}」を削除しますか？`)) {
                      onDelete(exercise.id);
                    }
                  }}
                  className="bg-red-600 text-white text-sm py-1 px-3 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-200" // 赤背景, 白文字, 小文字, パディング, 角丸, ホバー効果
                >
                  削除
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* No results message */}
      {filteredAndSortedExercises.length === 0 && exercises.length > 0 && (
        <div className="text-center py-8"> {/* 中央寄せ, 縦パディング8 */}
          <p className="text-gray-500 text-lg">条件に一致するエクササイズが見つかりませんでした</p> {/* グレー文字, 大文字 */}
          <p className="text-gray-400 text-sm mt-2">検索条件やフィルターを変更してみてください</p> {/* グレー文字, 小文字, 上マージン2 */}
        </div>
      )}
    </div>
  );
};

export default ExerciseList; 