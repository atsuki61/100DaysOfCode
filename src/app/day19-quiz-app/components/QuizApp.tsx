'use client';

import { useState } from 'react';
import { QuizQuestion, QuizResult, AnsweredQuestion } from '../types';
import { QuizStart } from './QuizStart';
import { QuestionCard } from './QuestionCard';
import { QuizResultComponent } from './QuizResult';

interface QuizAppProps {
  quizzes: Record<string, QuizQuestion[]>;
}

export const QuizApp: React.FC<QuizAppProps> = ({ quizzes }) => {
  const [gameState, setGameState] = useState<'selecting' | 'playing' | 'finished'>('selecting');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
  const [shuffledQuestions, setShuffledQuestions] = useState<QuizQuestion[]>([]);
  
  // クイズカテゴリを選択して開始する
  const handleStartQuiz = (category: string) => {
    const questions = quizzes[category];
    // 問題をシャッフル
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    setShuffledQuestions(shuffled);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setAnswers([]);
    setQuizResult(null);
    setGameState('playing');
  };
  
  // 回答を選択
  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };
  
  // 次の問題へ進む、または結果を表示する
  const handleNextQuestion = () => {
    if (selectedAnswer === null) return;

    const newAnswers = [...answers, selectedAnswer];
    setAnswers(newAnswers);

    if (currentQuestionIndex < shuffledQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
    } else {
      // クイズ終了
      const score = newAnswers.reduce((acc, answer, index) => {
        return acc + (answer === shuffledQuestions[index].correctAnswer ? 1 : 0);
      }, 0);
      
      const answeredQuestions: AnsweredQuestion[] = shuffledQuestions.map((question, index) => ({
        question,
        selectedAnswer: newAnswers[index],
        isCorrect: newAnswers[index] === question.correctAnswer,
      }));

      setQuizResult({
        score,
        totalQuestions: shuffledQuestions.length,
        percentage: (score / shuffledQuestions.length) * 100,
        answeredQuestions,
      });
      setGameState('finished');
    }
  };
  
  // クイズを最初からやり直す
  const handleRestart = () => {
    setGameState('selecting');
    setShuffledQuestions([]);
  };

  if (gameState === 'selecting') {
    return <QuizStart categories={Object.keys(quizzes)} onStart={handleStartQuiz} />;
  }

  if (gameState === 'playing' && shuffledQuestions.length > 0) {
    const currentQuestion = shuffledQuestions[currentQuestionIndex];
    return (
      <>
        <QuestionCard 
          question={currentQuestion}
          selectedAnswer={selectedAnswer}
          onAnswerSelect={handleAnswerSelect}
          questionNumber={currentQuestionIndex + 1}
          totalQuestions={shuffledQuestions.length}
        />
        <div className="text-center mt-6"> {/* 中央寄せ、上マージン6 */}
          <button 
            onClick={handleNextQuestion} 
            disabled={selectedAnswer === null}
            className="bg-green-500 text-white font-bold py-3 px-8 rounded-lg hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            // 緑背景、白文字、太字、縦横パディング、角丸、ホバー時緑背景、無効時グレー背景とカーソル変更、色トランジション
          >
            {currentQuestionIndex === shuffledQuestions.length - 1 ? '結果を見る' : '次の問題へ'}
          </button>
        </div>
      </>
    );
  }
  
  if (gameState === 'finished' && quizResult) {
    return <QuizResultComponent result={quizResult} onRestart={handleRestart} />;
  }

  return null; // or a loading spinner
}; 