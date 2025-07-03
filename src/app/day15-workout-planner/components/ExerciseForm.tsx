'use client';

import React, { useState } from 'react';
import { ExerciseFormData, ValidationError } from '../types';
import { validateExerciseForm, getFieldError } from '../utils/validation';

interface ExerciseFormProps {
  onSubmit: (exerciseData: ExerciseFormData) => void;
  onCancel?: () => void;
  initialData?: Partial<ExerciseFormData>;
  isEdit?: boolean;
}

const ExerciseForm: React.FC<ExerciseFormProps> = ({
  onSubmit,
  onCancel,
  initialData,
  isEdit = false
}) => {
  const [formData, setFormData] = useState<ExerciseFormData>({
    name: initialData?.name || '',
    category: initialData?.category || 'strength',
    sets: initialData?.sets || '',
    reps: initialData?.reps || '',
    weight: initialData?.weight || '',
    duration: initialData?.duration || '',
    distance: initialData?.distance || '',
    notes: initialData?.notes || '',
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
    const validationErrors = validateExerciseForm(formData);
    
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      await onSubmit(formData);
      
      // Reset form if not editing
      if (!isEdit) {
        setFormData({
          name: '',
          category: 'strength',
          sets: '',
          reps: '',
          weight: '',
          duration: '',
          distance: '',
          notes: '',
        });
      }
      
      setErrors([]);
    } catch (error) {
      console.error('Failed to save exercise:', error);
      setErrors([{ field: 'general', message: '保存に失敗しました。もう一度お試しください。' }]);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderCategorySpecificFields = () => {
    switch (formData.category) {
      case 'strength':
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4"> {/* グリッドレイアウト, 中画面以上は3列, ギャップ4 */}
            <div>
              <label htmlFor="sets" className="block text-sm font-medium text-gray-700 mb-1"> {/* ブロック表示, 小文字, フォント中, グレー文字, 下マージン1 */}
                セット数
              </label>
              <input
                type="number"
                id="sets"
                name="sets"
                value={formData.sets}
                onChange={handleInputChange}
                min="1"
                max="20"
                className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  getFieldError(errors, 'sets') ? 'border-red-500' : ''
                }`} // 横幅全体, 横パディング3, 縦パディング2, ボーダー, 角丸, フォーカス時アウトライン, エラー時赤ボーダー
                placeholder="例: 3"
              />
              {getFieldError(errors, 'sets') && (
                <p className="text-red-500 text-sm mt-1">{getFieldError(errors, 'sets')}</p> // 赤文字, 小文字, 上マージン1
              )}
            </div>

            <div>
              <label htmlFor="reps" className="block text-sm font-medium text-gray-700 mb-1">
                回数
              </label>
              <input
                type="number"
                id="reps"
                name="reps"
                value={formData.reps}
                onChange={handleInputChange}
                min="1"
                max="100"
                className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  getFieldError(errors, 'reps') ? 'border-red-500' : ''
                }`}
                placeholder="例: 10"
              />
              {getFieldError(errors, 'reps') && (
                <p className="text-red-500 text-sm mt-1">{getFieldError(errors, 'reps')}</p>
              )}
            </div>

            <div>
              <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-1">
                重量 (kg)
              </label>
              <input
                type="number"
                id="weight"
                name="weight"
                value={formData.weight}
                onChange={handleInputChange}
                min="0"
                max="500"
                step="0.5"
                className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  getFieldError(errors, 'weight') ? 'border-red-500' : ''
                }`}
                placeholder="例: 20"
              />
              {getFieldError(errors, 'weight') && (
                <p className="text-red-500 text-sm mt-1">{getFieldError(errors, 'weight')}</p>
              )}
            </div>
          </div>
        );

      case 'cardio':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> {/* グリッドレイアウト, 中画面以上は2列 */}
            <div>
              <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
                時間 (分)
              </label>
              <input
                type="number"
                id="duration"
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                min="1"
                max="300"
                className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  getFieldError(errors, 'duration') ? 'border-red-500' : ''
                }`}
                placeholder="例: 30"
              />
              {getFieldError(errors, 'duration') && (
                <p className="text-red-500 text-sm mt-1">{getFieldError(errors, 'duration')}</p>
              )}
            </div>

            <div>
              <label htmlFor="distance" className="block text-sm font-medium text-gray-700 mb-1">
                距離 (km)
              </label>
              <input
                type="number"
                id="distance"
                name="distance"
                value={formData.distance}
                onChange={handleInputChange}
                min="0"
                max="100"
                step="0.1"
                className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  getFieldError(errors, 'distance') ? 'border-red-500' : ''
                }`}
                placeholder="例: 5.0"
              />
              {getFieldError(errors, 'distance') && (
                <p className="text-red-500 text-sm mt-1">{getFieldError(errors, 'distance')}</p>
              )}
            </div>
          </div>
        );

      case 'flexibility':
      case 'sports':
        return (
          <div>
            <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
              時間 (分)
            </label>
            <input
              type="number"
              id="duration"
              name="duration"
              value={formData.duration}
              onChange={handleInputChange}
              min="1"
              max="120"
              className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                getFieldError(errors, 'duration') ? 'border-red-500' : ''
              }`}
              placeholder="例: 20"
            />
            {getFieldError(errors, 'duration') && (
              <p className="text-red-500 text-sm mt-1">{getFieldError(errors, 'duration')}</p>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6"> {/* 縦スペース6 */}
      {/* General Error Message */}
      {getFieldError(errors, 'general') && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md"> {/* 赤背景, 赤ボーダー, 赤文字, パディング, 角丸 */}
          {getFieldError(errors, 'general')}
        </div>
      )}

      {/* Exercise Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          エクササイズ名 <span className="text-red-500">*</span> {/* 赤文字の必須マーク */}
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
          }`}
          placeholder="例: スクワット"
        />
        {getFieldError(errors, 'name') && (
          <p className="text-red-500 text-sm mt-1">{getFieldError(errors, 'name')}</p>
        )}
      </div>

      {/* Category */}
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
          カテゴリー
        </label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="strength">筋トレ</option>
          <option value="cardio">有酸素運動</option>
          <option value="flexibility">ストレッチ・柔軟性</option>
          <option value="sports">スポーツ</option>
        </select>
      </div>

      {/* Category Specific Fields */}
      {renderCategorySpecificFields()}

      {/* Notes */}
      <div>
        <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
          メモ・コメント
        </label>
        <textarea
          id="notes"
          name="notes"
          value={formData.notes}
          onChange={handleInputChange}
          rows={3}
          className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            getFieldError(errors, 'notes') ? 'border-red-500' : ''
          }`}
          placeholder="例: フォームに注意、次回は重量を上げる"
        />
        {getFieldError(errors, 'notes') && (
          <p className="text-red-500 text-sm mt-1">{getFieldError(errors, 'notes')}</p>
        )}
      </div>

      {/* Submit Buttons */}
      <div className="flex gap-4 pt-4"> {/* フレックス表示, ギャップ4, 上パディング4 */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition duration-200" // フレックス1, 青背景, 白文字, パディング, 角丸, ホバー効果, 無効時グレー, トランジション
        >
          {isSubmitting ? '保存中...' : isEdit ? '更新' : '追加'}
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

export default ExerciseForm; 