'use client';

import { useState } from 'react';
import { QuizQuestion, QuizResult, AnsweredQuestion } from '../types';
import { QuizStart } from './QuizStart';
import { QuestionCard } from './QuestionCard';
import { QuizResultComponent } from './QuizResult';

interface QuizAppProps {
  questions: QuizQuestion[];
}

export const QuizApp: React.FC<QuizAppProps> = ({ questions }) => {
  const [gameState, setGameState] = useState<'start' | 'playing' | 'finished'>('start');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
  const [shuffledQuestions, setShuffledQuestions] = useState<QuizQuestion[]>([]);
  
  // 質問をシャッフルする関数
  const shuffleQuestions = (questions: QuizQuestion[]) => {
    const shuffled = [...questions];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // クイズを開始する
  const startQuiz = () => {
    const shuffled = shuffleQuestions(questions);
    setShuffledQuestions(shuffled);
    setGameState('playing');
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setAnswers([]);
    setQuizResult(null);
  };

  // 回答を選択
  const selectAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  // 次の質問に進む
  const nextQuestion = () => {
    if (selectedAnswer === null) return;
    
    const newAnswers = [...answers, selectedAnswer];
    setAnswers(newAnswers);

    if (currentQuestionIndex < shuffledQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
    } else {
      // クイズ終了
      finishQuiz(newAnswers);
    }
  };

  // クイズを終了し、結果を計算
  const finishQuiz = (finalAnswers: number[]) => {
    const answeredQuestions: AnsweredQuestion[] = shuffledQuestions.map((question, index) => ({
      question,
      selectedAnswer: finalAnswers[index],
      isCorrect: finalAnswers[index] === question.correctAnswer
    }));

    const score = answeredQuestions.filter(answer => answer.isCorrect).length;
    const percentage = Math.round((score / shuffledQuestions.length) * 100);

    const result: QuizResult = {
      score,
      totalQuestions: shuffledQuestions.length,
      percentage,
      answeredQuestions
    };

    setQuizResult(result);
    setGameState('finished');
  };

  // クイズを再開始
  const restartQuiz = () => {
    setGameState('start');
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setAnswers([]);
    setQuizResult(null);
    setShuffledQuestions([]);
  };

  // 現在の質問を取得
  const currentQuestion = shuffledQuestions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-gray-50 py-8"> {/* 最小高さ画面、グレー50背景、縦パディング8 */}
      <div className="container mx-auto px-4"> {/* コンテナ、中央寄せ、横パディング4 */}
        {gameState === 'start' && (
          <QuizStart onStart={startQuiz} totalQuestions={questions.length} />
        )}

        {gameState === 'playing' && currentQuestion && (
          <div className="space-y-6"> {/* 縦間隔6 */}
            <QuestionCard
              question={currentQuestion}
              selectedAnswer={selectedAnswer}
              onAnswerSelect={selectAnswer}
              questionNumber={currentQuestionIndex + 1}
              totalQuestions={shuffledQuestions.length}
            />
            
            {/* ナビゲーションボタン */}
            <div className="flex justify-between items-center max-w-2xl mx-auto px-6"> {/* フレックス、両端寄せ、縦中央揃え、最大幅2xl、中央寄せ、横パディング6 */}
              <button
                onClick={restartQuiz}
                className="text-gray-600 hover:text-gray-800 transition-colors duration-200" /* グレー600、ホバー時グレー800、色トランジション */
              >
                最初からやり直す
              </button>
              
              <div className="flex space-x-3"> {/* フレックス、横間隔3 */}
                <button
                  onClick={nextQuestion}
                  disabled={selectedAnswer === null}
                  className={`px-6 py-2 rounded-lg font-semibold transition-colors duration-200 ${ /* 横パディング6、縦パディング2、角丸、太字、色トランジション */
                    selectedAnswer !== null
                      ? 'bg-blue-500 hover:bg-blue-600 text-white' /* 選択済み：青500背景、ホバー時青600、白文字 */
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed' /* 未選択：グレー300背景、グレー500文字、カーソル無効 */
                  }`}
                >
                  {currentQuestionIndex < shuffledQuestions.length - 1 ? '次の問題' : '結果を見る'}
                </button>
              </div>
            </div>
          </div>
        )}

        {gameState === 'finished' && quizResult && (
          <QuizResultComponent result={quizResult} onRestart={restartQuiz} />
        )}
      </div>
    </div>
  );
}; 