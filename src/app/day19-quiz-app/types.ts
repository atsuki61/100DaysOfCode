export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number; // 正解のインデックス（0-3）
  explanation?: string;
}

export interface QuizResult {
  score: number;
  totalQuestions: number;
  percentage: number;
  answeredQuestions: AnsweredQuestion[];
}

export interface AnsweredQuestion {
  question: QuizQuestion;
  selectedAnswer: number;
  isCorrect: boolean;
  timeSpent?: number;
}

export interface QuizState {
  currentQuestionIndex: number;
  questions: QuizQuestion[];
  answers: number[];
  isFinished: boolean;
  startTime: number;
  questionStartTime: number;
} 