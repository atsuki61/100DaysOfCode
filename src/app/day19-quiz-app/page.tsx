import { QuizApp } from './components';
import { animeQuizData } from './data/quizData';

export default function Day19QuizPage() {
  return (
    <div className="bg-gray-50 min-h-screen"> {/* グレー50背景、最小高さ画面 */}
      <QuizApp questions={animeQuizData} />
    </div>
  );
} 