'use client';

import React, { useState } from 'react';
import { ExerciseMaster, BodyPart, SelectedExercise } from '../types';
import { exerciseMasterData, bodyPartLabels } from '../data/exerciseMasterData';

interface ExerciseSelectorProps {
  selectedExercises: SelectedExercise[];
  onExerciseToggle: (exercise: ExerciseMaster) => void;
  onSelectedExercisesChange: (exercises: SelectedExercise[]) => void;
}

const ExerciseSelector: React.FC<ExerciseSelectorProps> = ({
  selectedExercises,
  onExerciseToggle,
  onSelectedExercisesChange
}) => {
  const [activeBodyPart, setActiveBodyPart] = useState<BodyPart>('chest');
  const [searchTerm, setSearchTerm] = useState('');

  // 現在の部位のエクササイズを取得
  const currentExercises = exerciseMasterData.filter(exercise => 
    exercise.bodyPart === activeBodyPart &&
    exercise.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 選択されているエクササイズのIDセット
  const selectedExerciseIds = new Set(selectedExercises.map(ex => ex.id));

  // 部位別タブの表示
  const bodyParts: BodyPart[] = ['chest', 'back', 'shoulders', 'arms', 'legs', 'abs', 'cardio', 'flexibility', 'sports'];

  // 部位別の色分け
  const getBodyPartColor = (bodyPart: BodyPart) => {
    const colors = {
      chest: 'bg-red-500 text-white',
      back: 'bg-blue-500 text-white',
      shoulders: 'bg-green-500 text-white',
      arms: 'bg-yellow-500 text-white',
      legs: 'bg-purple-500 text-white',
      abs: 'bg-orange-500 text-white',
      cardio: 'bg-pink-500 text-white',
      flexibility: 'bg-teal-500 text-white',
      sports: 'bg-indigo-500 text-white',
    };
    return colors[bodyPart] || 'bg-gray-500 text-white';
  };

  // エクササイズの詳細値を更新
  const updateExerciseDetails = (exerciseId: string, field: string, value: number | string) => {
    const updatedExercises = selectedExercises.map(ex => 
      ex.id === exerciseId ? { ...ex, [field]: value } : ex
    );
    onSelectedExercisesChange(updatedExercises);
  };

  return (
    <div className="space-y-6"> {/* 縦スペース6 */}
      {/* 部位別タブ */}
      <div className="border-b border-gray-200"> {/* 下ボーダー */}
        <div className="flex flex-wrap gap-2 pb-4"> {/* フレックス表示, 折り返し, ギャップ2, 下パディング4 */}
          {bodyParts.map((bodyPart) => (
            <button
              key={bodyPart}
              onClick={() => setActiveBodyPart(bodyPart)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeBodyPart === bodyPart
                  ? getBodyPartColor(bodyPart)
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`} // パディング, 角丸, 小文字, フォント中, トランジション, アクティブ時色分け
            >
              {bodyPartLabels[bodyPart]}
            </button>
          ))}
        </div>
      </div>

      {/* 検索フィールド */}
      <div className="mb-4"> {/* 下マージン4 */}
        <input
          type="text"
          placeholder="エクササイズを検索..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" // 横幅全体, パディング, ボーダー, 角丸, フォーカス効果
        />
      </div>

      {/* エクササイズリスト */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> {/* グリッドレイアウト, 中画面以上は2列, ギャップ4 */}
        {currentExercises.map((exercise) => {
          const isSelected = selectedExerciseIds.has(exercise.id);
          const selectedExercise = selectedExercises.find(ex => ex.id === exercise.id);

          return (
            <div
              key={exercise.id}
              className={`border rounded-lg p-4 transition-all duration-200 cursor-pointer ${
                isSelected
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`} // ボーダー, 角丸, パディング4, トランジション, カーソルポインタ, 選択時スタイル
            >
              {/* エクササイズヘッダー */}
              <div
                className="flex items-center justify-between mb-3" // フレックス表示, アイテム中央寄せ, 両端寄せ, 下マージン3
                onClick={() => onExerciseToggle(exercise)}
              >
                <div className="flex-1"> {/* フレックス1 */}
                  <h3 className="font-semibold text-lg text-gray-900"> {/* フォント中太, 大文字, グレー文字 */}
                    {exercise.name}
                  </h3>
                  {exercise.description && (
                    <p className="text-sm text-gray-600 mt-1"> {/* 小文字, グレー文字, 上マージン1 */}
                      {exercise.description}
                    </p>
                  )}
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  isSelected
                    ? 'bg-blue-500 border-blue-500'
                    : 'border-gray-300'
                }`}> {/* 幅6, 高さ6, 丸型, ボーダー2, フレックス中央寄せ, 選択時スタイル */}
                  {isSelected && (
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20"> {/* 幅3, 高さ3, 白文字 */}
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
              </div>

              {/* 選択時の詳細設定 */}
              {isSelected && (
                <div className="border-t border-gray-200 pt-3 space-y-3"> {/* 上ボーダー, 上パディング3, 縦スペース3 */}
                  {exercise.category === 'strength' && (
                    <div className="grid grid-cols-3 gap-3"> {/* グリッド3列, ギャップ3 */}
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1"> {/* ブロック表示, 極小文字, フォント中, グレー文字, 下マージン1 */}
                          セット数
                        </label>
                        <input
                          type="number"
                          min="1"
                          max="10"
                          value={selectedExercise?.sets || exercise.defaultSets || 3}
                          onChange={(e) => updateExerciseDetails(exercise.id, 'sets', Number(e.target.value))}
                          className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500" // 横幅全体, パディング, 小文字, ボーダー, 角丸, フォーカス効果
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          回数
                        </label>
                        <input
                          type="number"
                          min="1"
                          max="50"
                          value={selectedExercise?.reps || exercise.defaultReps || 10}
                          onChange={(e) => updateExerciseDetails(exercise.id, 'reps', Number(e.target.value))}
                          className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          重量 (kg)
                        </label>
                        <input
                          type="number"
                          min="0"
                          step="0.5"
                          value={selectedExercise?.weight || ''}
                          onChange={(e) => updateExerciseDetails(exercise.id, 'weight', Number(e.target.value))}
                          className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                          placeholder="0"
                        />
                      </div>
                    </div>
                  )}

                  {exercise.category === 'cardio' && (
                    <div className="grid grid-cols-2 gap-3"> {/* グリッド2列, ギャップ3 */}
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          時間 (分)
                        </label>
                        <input
                          type="number"
                          min="1"
                          max="120"
                          value={selectedExercise?.duration || 30}
                          onChange={(e) => updateExerciseDetails(exercise.id, 'duration', Number(e.target.value))}
                          className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          距離 (km)
                        </label>
                        <input
                          type="number"
                          min="0"
                          step="0.1"
                          value={selectedExercise?.distance || ''}
                          onChange={(e) => updateExerciseDetails(exercise.id, 'distance', Number(e.target.value))}
                          className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                          placeholder="0"
                        />
                      </div>
                    </div>
                  )}

                  {(exercise.category === 'flexibility' || exercise.category === 'sports') && (
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        時間 (分)
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="120"
                        value={selectedExercise?.duration || 20}
                        onChange={(e) => updateExerciseDetails(exercise.id, 'duration', Number(e.target.value))}
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                  )}

                  {/* メモ欄 */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      メモ
                    </label>
                    <textarea
                      value={selectedExercise?.notes || ''}
                      onChange={(e) => updateExerciseDetails(exercise.id, 'notes', e.target.value)}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                      rows={2}
                      placeholder="メモを入力..."
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 選択されたエクササイズの数 */}
      <div className="text-center text-sm text-gray-600 bg-gray-50 py-3 px-4 rounded-lg"> {/* 中央寄せ, 小文字, グレー文字, グレー背景, パディング, 角丸 */}
        選択済み: {selectedExercises.length} 個のエクササイズ
      </div>
    </div>
  );
};

export default ExerciseSelector; 