export interface TypingResults {
  wpm: number;
  accuracy: number;
  timeElapsed: number;
  totalWords: number;
  correctWords: number;
}

export interface TypingTestProps {
  onComplete: (results: TypingResults) => void;
}

export interface ResultsProps {
  results: TypingResults;
  onRestart: () => void;
} 