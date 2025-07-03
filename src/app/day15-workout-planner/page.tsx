'use client';

import React, { useState, useEffect } from 'react';
import { WorkoutExercise, ExerciseFormData } from './types';
import { loadExercises, addExercise } from './utils/localStorage';
import ExerciseForm from './components/ExerciseForm';
import ExerciseList from './components/ExerciseList';

type ViewMode = 'exercises' | 'create-plan' | 'plans';

export default function WorkoutPlannerPage() {
  const [exercises, setExercises] = useState<WorkoutExercise[]>([]);
  const [viewMode, setViewMode] = useState<ViewMode>('exercises');

  // Load data from localStorage on component mount
  useEffect(() => {
    setExercises(loadExercises());
  }, []);

  // Handle Exercise Operations
  const handleAddExercise = async (exerciseData: ExerciseFormData) => {
    const newExercise: WorkoutExercise = {
      id: crypto.randomUUID(),
      name: exerciseData.name,
      category: exerciseData.category,
      sets: exerciseData.sets !== '' ? Number(exerciseData.sets) : undefined,
      reps: exerciseData.reps !== '' ? Number(exerciseData.reps) : undefined,
      weight: exerciseData.weight !== '' ? Number(exerciseData.weight) : undefined,
      duration: exerciseData.duration !== '' ? Number(exerciseData.duration) : undefined,
      distance: exerciseData.distance !== '' ? Number(exerciseData.distance) : undefined,
      notes: exerciseData.notes || undefined,
      createdAt: new Date().toISOString(),
    };

    addExercise(newExercise);
    setExercises(loadExercises());
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8"> {/* 最大横幅6xl, 中央寄せ, 横パディング4, 縦パディング8 */}
      {/* Navigation Tabs */}
      <div className="mb-8"> {/* 下マージン8 */}
        <div className="border-b border-gray-200"> {/* 下ボーダー, グレーボーダー */}
          <nav className="-mb-px flex space-x-8"> {/* 下マージン負, フレックス表示, 横スペース8 */}
            <button
              onClick={() => setViewMode('exercises')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                viewMode === 'exercises'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`} // 縦パディング2, 横パディング1, 下ボーダー2, フォント中, 小文字, アクティブ時青色, 非アクティブ時グレー
            >
              💪 エクササイズ管理
            </button>
            <button
              onClick={() => setViewMode('create-plan')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                viewMode === 'create-plan'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              📋 プラン作成
            </button>
            <button
              onClick={() => setViewMode('plans')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                viewMode === 'plans'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              📁 保存済みプラン
            </button>
          </nav>
        </div>
      </div>

      {/* Exercise Management View */}
      {viewMode === 'exercises' && (
        <div className="space-y-8"> {/* 縦スペース8 */}
          {/* Exercise Form */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"> {/* 白背景, 角丸, 影, ボーダー, パディング6 */}
            <h2 className="text-xl font-semibold text-gray-900 mb-4"> {/* 文字大, フォント中太, グレー文字, 下マージン4 */}
              新しいエクササイズを追加
            </h2>
            <ExerciseForm onSubmit={handleAddExercise} />
          </div>

          {/* Exercise List */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              エクササイズ一覧 ({exercises.length}個)
            </h2>
            <ExerciseList exercises={exercises} />
          </div>
        </div>
      )}

      {/* Placeholder for other views */}
      {viewMode === 'create-plan' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">プラン作成</h2>
          <p className="text-gray-600">プラン作成機能は開発中です...</p>
        </div>
      )}

      {viewMode === 'plans' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">保存済みプラン</h2>
          <p className="text-gray-600">保存済みプラン表示機能は開発中です...</p>
        </div>
      )}
    </div>
  );
} 