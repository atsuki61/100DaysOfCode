import { WorkoutPlan, WorkoutExercise } from '../types';

const PLANS_STORAGE_KEY = 'workout-planner-plans';
const EXERCISES_STORAGE_KEY = 'workout-planner-exercises';

// Workout Plans LocalStorage Operations
export const loadPlans = (): WorkoutPlan[] => {
  if (typeof window === 'undefined') return [];
  
  try {
    const stored = localStorage.getItem(PLANS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Failed to load plans from localStorage:', error);
    return [];
  }
};

export const savePlans = (plans: WorkoutPlan[]): void => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(PLANS_STORAGE_KEY, JSON.stringify(plans));
  } catch (error) {
    console.error('Failed to save plans to localStorage:', error);
  }
};

export const addPlan = (plan: WorkoutPlan): void => {
  const plans = loadPlans();
  plans.push(plan);
  savePlans(plans);
};

export const updatePlan = (updatedPlan: WorkoutPlan): void => {
  const plans = loadPlans();
  const index = plans.findIndex(plan => plan.id === updatedPlan.id);
  if (index !== -1) {
    plans[index] = updatedPlan;
    savePlans(plans);
  }
};

export const deletePlan = (planId: string): void => {
  const plans = loadPlans();
  const filteredPlans = plans.filter(plan => plan.id !== planId);
  savePlans(filteredPlans);
};

// Workout Exercises LocalStorage Operations
export const loadExercises = (): WorkoutExercise[] => {
  if (typeof window === 'undefined') return [];
  
  try {
    const stored = localStorage.getItem(EXERCISES_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Failed to load exercises from localStorage:', error);
    return [];
  }
};

export const saveExercises = (exercises: WorkoutExercise[]): void => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(EXERCISES_STORAGE_KEY, JSON.stringify(exercises));
  } catch (error) {
    console.error('Failed to save exercises to localStorage:', error);
  }
};

export const addExercise = (exercise: WorkoutExercise): void => {
  const exercises = loadExercises();
  exercises.push(exercise);
  saveExercises(exercises);
};

export const updateExercise = (updatedExercise: WorkoutExercise): void => {
  const exercises = loadExercises();
  const index = exercises.findIndex(exercise => exercise.id === updatedExercise.id);
  if (index !== -1) {
    exercises[index] = updatedExercise;
    saveExercises(exercises);
  }
};

export const deleteExercise = (exerciseId: string): void => {
  const exercises = loadExercises();
  const filteredExercises = exercises.filter(exercise => exercise.id !== exerciseId);
  saveExercises(filteredExercises);
};

// Clear all data
export const clearAllData = (): void => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.removeItem(PLANS_STORAGE_KEY);
    localStorage.removeItem(EXERCISES_STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear localStorage:', error);
  }
}; 