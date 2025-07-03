import { ValidationError, ExerciseFormData, PlanFormData } from '../types';

// Exercise Form Validation
export const validateExerciseForm = (data: ExerciseFormData): ValidationError[] => {
  const errors: ValidationError[] = [];

  // Name validation
  if (!data.name.trim()) {
    errors.push({ field: 'name', message: 'エクササイズ名は必須です' });
  } else if (data.name.trim().length < 2) {
    errors.push({ field: 'name', message: 'エクササイズ名は2文字以上で入力してください' });
  } else if (data.name.trim().length > 50) {
    errors.push({ field: 'name', message: 'エクササイズ名は50文字以内で入力してください' });
  }

  // Category-specific validation
  switch (data.category) {
    case 'strength':
      // Sets validation
      if (data.sets !== '' && (Number(data.sets) < 1 || Number(data.sets) > 20)) {
        errors.push({ field: 'sets', message: 'セット数は1〜20の範囲で入力してください' });
      }
      
      // Reps validation
      if (data.reps !== '' && (Number(data.reps) < 1 || Number(data.reps) > 100)) {
        errors.push({ field: 'reps', message: '回数は1〜100の範囲で入力してください' });
      }
      
      // Weight validation
      if (data.weight !== '' && (Number(data.weight) < 0 || Number(data.weight) > 500)) {
        errors.push({ field: 'weight', message: '重量は0〜500kgの範囲で入力してください' });
      }
      break;

    case 'cardio':
      // Duration validation for cardio
      if (data.duration !== '' && (Number(data.duration) < 1 || Number(data.duration) > 300)) {
        errors.push({ field: 'duration', message: '時間は1〜300分の範囲で入力してください' });
      }
      
      // Distance validation
      if (data.distance !== '' && (Number(data.distance) < 0 || Number(data.distance) > 100)) {
        errors.push({ field: 'distance', message: '距離は0〜100kmの範囲で入力してください' });
      }
      break;

    case 'flexibility':
    case 'sports':
      // Duration validation for flexibility and sports
      if (data.duration !== '' && (Number(data.duration) < 1 || Number(data.duration) > 120)) {
        errors.push({ field: 'duration', message: '時間は1〜120分の範囲で入力してください' });
      }
      break;
  }

  // Notes validation
  if (data.notes.length > 200) {
    errors.push({ field: 'notes', message: 'メモは200文字以内で入力してください' });
  }

  return errors;
};

// Plan Form Validation
export const validatePlanForm = (data: PlanFormData): ValidationError[] => {
  const errors: ValidationError[] = [];

  // Name validation
  if (!data.name.trim()) {
    errors.push({ field: 'name', message: 'プラン名は必須です' });
  } else if (data.name.trim().length < 2) {
    errors.push({ field: 'name', message: 'プラン名は2文字以上で入力してください' });
  } else if (data.name.trim().length > 30) {
    errors.push({ field: 'name', message: 'プラン名は30文字以内で入力してください' });
  }

  // Description validation
  if (data.description.length > 100) {
    errors.push({ field: 'description', message: '説明は100文字以内で入力してください' });
  }

  return errors;
};

// Helper function to get error message for a specific field
export const getFieldError = (errors: ValidationError[], fieldName: string): string | undefined => {
  const error = errors.find(error => error.field === fieldName);
  return error?.message;
};

// Helper function to check if form has any errors
export const hasErrors = (errors: ValidationError[]): boolean => {
  return errors.length > 0;
}; 