import { QuizApp } from './components';
import { quizDataByCategory } from './data/quizData';

export default function Day19QuizPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-8"> {/* グレー50背景、最小高さ画面、縦パディング8 */}
      <QuizApp quizzes={quizDataByCategory} />
    </div>
  );
} 