'use client';

import React, { useState } from 'react';
import { PlanFormData, ValidationError, WorkoutExercise } from '../types';
import { validatePlanForm, getFieldError } from '../utils/validation';

interface PlanFormProps {
  onSubmit: (planData: PlanFormData, exercises: WorkoutExercise[]) => void;
  onCancel?: () => void;
  initialData?: Partial<PlanFormData>;
  selectedExercises?: WorkoutExercise[];
  isEdit?: boolean;
}

const PlanForm: React.FC<PlanFormProps> = ({
  onSubmit,
  onCancel,
  initialData,
  selectedExercises = [],
  isEdit = false
}) => {
  const [formData, setFormData] = useState<PlanFormData>({
    name: initialData?.name || '',
    description: initialData?.description || '',
    difficulty: initialData?.difficulty || 'beginner',
  });

  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field when user starts typing
    if (errors.some(error => error.field === name)) {
      setErrors(prev => prev.filter(error => error.field !== name));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate form
    const validationErrors = validatePlanForm(formData);
    
    // Check if at least one exercise is selected (only for new plans)
    if (!isEdit && selectedExercises.length === 0) {
      validationErrors.push({ 
        field: 'exercises', 
        message: '少なくとも1つのエクササイズを選択してください' 
      });
    }
    
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      await onSubmit(formData, selectedExercises);
      
      // Reset form if not editing
      if (!isEdit) {
        setFormData({
          name: '',
          description: '',
          difficulty: 'beginner',
        });
      }
      
      setErrors([]);
    } catch (error) {
      console.error('Failed to save plan:', error);
      setErrors([{ field: 'general', message: 'プランの保存に失敗しました。もう一度お試しください。' }]);
    } finally {
      setIsSubmitting(false);
    }
  };

  const calculateTotalDuration = () => {
    return selectedExercises.reduce((total, exercise) => {
      if (exercise.duration) {
        return total + exercise.duration;
      }
      // Estimate duration for strength exercises (assuming 2 minutes per set)
      if (exercise.sets) {
        return total + (exercise.sets * 2);
      }
      return total + 5; // Default estimate
    }, 0);
  };

  const categoryLabels = {
    strength: '筋トレ',
    cardio: '有酸素運動',
    flexibility: 'ストレッチ・柔軟性',
    sports: 'スポーツ'
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6"> {/* 縦スペース6 */}
      {/* General Error Message */}
      {getFieldError(errors, 'general') && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md"> {/* 赤背景, 赤ボーダー, 赤文字, パディング, 角丸 */}
          {getFieldError(errors, 'general')}
        </div>
      )}

      {/* Plan Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1"> {/* ブロック表示, 小文字, フォント中, グレー文字, 下マージン1 */}
          プラン名 <span className="text-red-500">*</span> {/* 赤文字の必須マーク */}
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
          className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            getFieldError(errors, 'name') ? 'border-red-500' : ''
          }`} // 横幅全体, パディング, ボーダー, 角丸, フォーカス効果, エラー時赤ボーダー
          placeholder="例: 初心者向け筋トレプラン"
        />
        {getFieldError(errors, 'name') && (
          <p className="text-red-500 text-sm mt-1">{getFieldError(errors, 'name')}</p> // 赤文字, 小文字, 上マージン1
        )}
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          説明・目的
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          rows={3}
          className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            getFieldError(errors, 'description') ? 'border-red-500' : ''
          }`}
          placeholder="例: 全身の基礎筋力を向上させる初心者向けのプランです"
        />
        {getFieldError(errors, 'description') && (
          <p className="text-red-500 text-sm mt-1">{getFieldError(errors, 'description')}</p>
        )}
      </div>

      {/* Difficulty */}
      <div>
        <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700 mb-1">
          難易度
        </label>
        <select
          id="difficulty"
          name="difficulty"
          value={formData.difficulty}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="beginner">初心者</option>
          <option value="intermediate">中級者</option>
          <option value="advanced">上級者</option>
        </select>
      </div>

      {/* Selected Exercises Summary */}
      {selectedExercises.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-md p-4"> {/* 青背景, 青ボーダー, 角丸, パディング4 */}
          <h3 className="font-semibold text-lg text-blue-900 mb-3"> {/* フォント中太, 大文字, 青文字, 下マージン3 */}
            選択されたエクササイズ ({selectedExercises.length}個)
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4"> {/* グリッドレイアウト, 中画面以上は2列, ギャップ3, 下マージン4 */}
            {selectedExercises.map((exercise, index) => (
              <div key={exercise.id} className="bg-white rounded-md p-3 shadow-sm"> {/* 白背景, 角丸, パディング3, 影 */}
                <div className="flex justify-between items-start"> {/* フレックス表示, 両端寄せ, アイテム上寄せ */}
                  <div className="flex-1"> {/* フレックス1 */}
                    <p className="font-medium text-gray-900">{exercise.name}</p> {/* フォント中, グレー文字 */}
                    <p className="text-sm text-gray-600">{categoryLabels[exercise.category]}</p> {/* 小文字, グレー文字 */}
                  </div>
                  <span className="text-xs text-gray-400 ml-2">{index + 1}</span> {/* 極小文字, グレー文字, 左マージン2 */}
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center"> {/* グリッドレイアウト, 2列または4列, ギャップ4, 中央寄せ */}
            <div className="bg-white rounded-md p-2"> {/* 白背景, 角丸, パディング2 */}
              <p className="text-sm text-gray-600">合計エクササイズ</p> {/* 小文字, グレー文字 */}
              <p className="font-semibold text-lg text-blue-600">{selectedExercises.length}個</p> {/* フォント中太, 大文字, 青文字 */}
            </div>
            
            <div className="bg-white rounded-md p-2">
              <p className="text-sm text-gray-600">推定時間</p>
              <p className="font-semibold text-lg text-blue-600">{calculateTotalDuration()}分</p>
            </div>
            
            <div className="bg-white rounded-md p-2">
              <p className="text-sm text-gray-600">筋トレ</p>
              <p className="font-semibold text-lg text-red-600">
                {selectedExercises.filter(e => e.category === 'strength').length}個
              </p>
            </div>
            
            <div className="bg-white rounded-md p-2">
              <p className="text-sm text-gray-600">有酸素</p>
              <p className="font-semibold text-lg text-green-600">
                {selectedExercises.filter(e => e.category === 'cardio').length}個
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Exercises Error */}
      {getFieldError(errors, 'exercises') && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
          {getFieldError(errors, 'exercises')}
        </div>
      )}

      {/* Submit Buttons */}
      <div className="flex gap-4 pt-4"> {/* フレックス表示, ギャップ4, 上パディング4 */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition duration-200" // フレックス1, 青背景, 白文字, パディング, 角丸, ホバー効果, 無効時グレー, トランジション
        >
          {isSubmitting ? '保存中...' : isEdit ? 'プランを更新' : 'プランを作成'}
        </button>
        
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-200" // 横パディング6, ボーダー, グレー文字, ホバー効果
          >
            キャンセル
          </button>
        )}
      </div>
    </form>
  );
};

export default PlanForm; 