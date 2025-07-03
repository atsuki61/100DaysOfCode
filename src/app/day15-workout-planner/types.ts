// Workout Exercise Type
export interface WorkoutExercise {
  id: string;
  name: string;
  category: 'strength' | 'cardio' | 'flexibility' | 'sports';
  sets?: number;
  reps?: number;
  weight?: number;
  duration?: number; // minutes for cardio
  distance?: number; // km for running
  notes?: string;
  createdAt: string;
}

// Exercise Master Data Type
export interface ExerciseMaster {
  id: string;
  name: string;
  category: 'strength' | 'cardio' | 'flexibility' | 'sports';
  bodyPart: 'chest' | 'back' | 'shoulders' | 'arms' | 'legs' | 'abs' | 'cardio' | 'flexibility' | 'sports';
  description?: string;
  defaultSets?: number;
  defaultReps?: number;
  isSelected?: boolean; // for toggle selection
}

// Body Part Type
export type BodyPart = 'chest' | 'back' | 'shoulders' | 'arms' | 'legs' | 'abs' | 'cardio' | 'flexibility' | 'sports';

// Workout Plan Type
export interface WorkoutPlan {
  id: string;
  name: string;
  description?: string;
  exercises: WorkoutExercise[];
  totalDuration?: number; // estimated total minutes
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  createdAt: string;
  updatedAt: string;
}

// Form Input Types
export interface ExerciseFormData {
  name: string;
  category: 'strength' | 'cardio' | 'flexibility' | 'sports';
  sets: number | '';
  reps: number | '';
  weight: number | '';
  duration: number | '';
  distance: number | '';
  notes: string;
}

export interface PlanFormData {
  name: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

// Selected Exercise for Workout Creation
export interface SelectedExercise extends ExerciseMaster {
  sets?: number;
  reps?: number;
  weight?: number;
  duration?: number;
  distance?: number;
  notes?: string;
}

// Validation Error Type
export interface ValidationError {
  field: string;
  message: string;
}

// Filter and Sort Options
export type SortOption = 'name' | 'category' | 'createdAt';
export type FilterCategory = 'all' | 'strength' | 'cardio' | 'flexibility' | 'sports';
export type FilterDifficulty = 'all' | 'beginner' | 'intermediate' | 'advanced'; 