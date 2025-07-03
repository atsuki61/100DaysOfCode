'use client';

import React, { useState, useEffect } from 'react';
import { WorkoutExercise, ExerciseFormData, ExerciseMaster, SelectedExercise } from './types';
import { loadExercises, addExercise } from './utils/localStorage';
import ExerciseForm from './components/ExerciseForm';
import ExerciseList from './components/ExerciseList';
import ExerciseSelector from './components/ExerciseSelector';

type ViewMode = 'exercises' | 'create-workout' | 'plans';

export default function WorkoutPlannerPage() {
  const [exercises, setExercises] = useState<WorkoutExercise[]>([]);
  const [viewMode, setViewMode] = useState<ViewMode>('create-workout');
  const [selectedExercises, setSelectedExercises] = useState<SelectedExercise[]>([]);
  const [workoutName, setWorkoutName] = useState('');

  // Load data from localStorage on component mount
  useEffect(() => {
    setExercises(loadExercises());
  }, []);

  // Handle Exercise Operations (for legacy manual input)
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

  // Handle Exercise Selection Toggle
  const handleExerciseToggle = (exercise: ExerciseMaster) => {
    const isSelected = selectedExercises.some(ex => ex.id === exercise.id);
    
    if (isSelected) {
      // Remove from selection
      setSelectedExercises(prev => prev.filter(ex => ex.id !== exercise.id));
    } else {
      // Add to selection with default values
      const newSelectedExercise: SelectedExercise = {
        ...exercise,
        sets: exercise.defaultSets || (exercise.category === 'strength' ? 3 : undefined),
        reps: exercise.defaultReps || (exercise.category === 'strength' ? 10 : undefined),
        duration: exercise.category === 'cardio' ? 30 : 
                  (exercise.category === 'flexibility' || exercise.category === 'sports') ? 20 : undefined,
        weight: undefined,
        distance: undefined,
        notes: '',
      };
      setSelectedExercises(prev => [...prev, newSelectedExercise]);
    }
  };

  // Handle Selected Exercises Change
  const handleSelectedExercisesChange = (exercises: SelectedExercise[]) => {
    setSelectedExercises(exercises);
  };

  // Create Workout from Selected Exercises
  const handleCreateWorkout = () => {
    if (selectedExercises.length === 0) {
      alert('エクササイズを選択してください');
      return;
    }

    const workoutDate = new Date().toISOString();

    // Convert selected exercises to workout exercises
    selectedExercises.forEach((selectedEx) => {
      const workoutExercise: WorkoutExercise = {
        id: crypto.randomUUID(),
        name: selectedEx.name,
        category: selectedEx.category,
        sets: selectedEx.sets,
        reps: selectedEx.reps,
        weight: selectedEx.weight,
        duration: selectedEx.duration,
        distance: selectedEx.distance,
        notes: selectedEx.notes,
        createdAt: workoutDate,
      };
      
      addExercise(workoutExercise);
    });

    // Refresh exercises list
    setExercises(loadExercises());
    
    // Clear selection
    setSelectedExercises([]);
    setWorkoutName('');
    
    alert(`ワークアウト「${workoutName || '今日のワークアウト'}」を保存しました！`);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8"> {/* 最大横幅6xl, 中央寄せ, 横パディング4, 縦パディング8 */}
      {/* Navigation Tabs */}
      <div className="mb-8"> {/* 下マージン8 */}
        <div className="border-b border-gray-200"> {/* 下ボーダー, グレーボーダー */}
          <nav className="-mb-px flex space-x-8"> {/* 下マージン負, フレックス表示, 横スペース8 */}
            <button
              onClick={() => setViewMode('create-workout')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                viewMode === 'create-workout'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`} // 縦パディング2, 横パディング1, 下ボーダー2, フォント中, 小文字, アクティブ時青色, 非アクティブ時グレー
            >
              🏋️ ワークアウト作成
            </button>
            <button
              onClick={() => setViewMode('exercises')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                viewMode === 'exercises'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              📋 運動記録
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

      {/* Create Workout View */}
      {viewMode === 'create-workout' && (
        <div className="space-y-8"> {/* 縦スペース8 */}
          {/* Workout Header */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"> {/* 白背景, 角丸, 影, ボーダー, パディング6 */}
            <div className="flex items-center justify-between mb-4"> {/* フレックス表示, アイテム中央寄せ, 両端寄せ, 下マージン4 */}
              <h2 className="text-xl font-semibold text-gray-900"> {/* 文字大, フォント中太, グレー文字 */}
                新しいワークアウトを作成
              </h2>
              <div className="text-sm text-gray-600"> {/* 小文字, グレー文字 */}
                {new Date().toLocaleDateString('ja-JP', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric',
                  weekday: 'long'
                })}
              </div>
            </div>
            
            <div className="mb-4"> {/* 下マージン4 */}
              <label htmlFor="workout-name" className="block text-sm font-medium text-gray-700 mb-2"> {/* ブロック表示, 小文字, フォント中, グレー文字, 下マージン2 */}
                ワークアウト名（任意）
              </label>
              <input
                type="text"
                id="workout-name"
                value={workoutName}
                onChange={(e) => setWorkoutName(e.target.value)}
                placeholder="今日のワークアウト"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" // 横幅全体, パディング, ボーダー, 角丸, フォーカス効果
              />
            </div>

            {selectedExercises.length > 0 && (
              <div className="flex items-center justify-between"> {/* フレックス表示, アイテム中央寄せ, 両端寄せ */}
                <div className="text-sm text-gray-600"> {/* 小文字, グレー文字 */}
                  選択済み: {selectedExercises.length} 個のエクササイズ
                </div>
                <button
                  onClick={handleCreateWorkout}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200" // 緑背景, 白文字, パディング, 角丸, ホバー効果, フォーカス効果, トランジション
                >
                  ワークアウトを保存
                </button>
              </div>
            )}
          </div>

          {/* Exercise Selector */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4"> {/* 大文字, フォント中太, グレー文字, 下マージン4 */}
              エクササイズを選択
            </h3>
            <ExerciseSelector
              selectedExercises={selectedExercises}
              onExerciseToggle={handleExerciseToggle}
              onSelectedExercisesChange={handleSelectedExercisesChange}
            />
          </div>
        </div>
      )}

      {/* Exercise History View */}
      {viewMode === 'exercises' && (
        <div className="space-y-8"> {/* 縦スペース8 */}
          {/* Legacy Exercise Form (for custom exercises) */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"> {/* 白背景, 角丸, 影, ボーダー, パディング6 */}
            <h2 className="text-xl font-semibold text-gray-900 mb-4"> {/* 文字大, フォント中太, グレー文字, 下マージン4 */}
              カスタムエクササイズを追加
            </h2>
            <p className="text-sm text-gray-600 mb-4"> {/* 小文字, グレー文字, 下マージン4 */}
              リストにないエクササイズを手動で追加できます
            </p>
            <ExerciseForm onSubmit={handleAddExercise} />
          </div>

          {/* Exercise List */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              運動記録 ({exercises.length}個)
            </h2>
            <ExerciseList exercises={exercises} />
          </div>
        </div>
      )}

      {/* Placeholder for plans view */}
      {viewMode === 'plans' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">保存済みプラン</h2>
          <p className="text-gray-600">保存済みプラン表示機能は開発中です...</p>
        </div>
      )}
    </div>
  );
} 