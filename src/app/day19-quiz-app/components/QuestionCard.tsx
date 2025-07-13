import { QuizQuestion } from '../types';

interface QuestionCardProps {
  question: QuizQuestion;
  selectedAnswer: number | null;
  onAnswerSelect: (answerIndex: number) => void;
  questionNumber: number;
  totalQuestions: number;
  timeRemaining?: number;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  selectedAnswer,
  onAnswerSelect,
  questionNumber,
  totalQuestions,
  timeRemaining
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto"> {/* 背景白、影付き、角丸、パディング6、最大幅2xl、中央寄せ */}
      {/* 進捗バー */}
      <div className="mb-6"> {/* 下マージン6 */}
        <div className="flex justify-between items-center mb-2"> {/* フレックス、両端寄せ、縦中央揃え、下マージン2 */}
          <span className="text-sm text-gray-600"> {/* 小文字、グレー600 */}
            問題 {questionNumber} / {totalQuestions}
          </span>
          {timeRemaining && (
            <span className="text-sm text-blue-600 font-semibold"> {/* 小文字、青600、太字 */}
              残り時間: {timeRemaining}秒
            </span>
          )}
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2"> {/* 全幅、グレー200背景、角丸、高さ2 */}
          <div 
            className="bg-blue-500 h-2 rounded-full transition-all duration-300" /* 青500背景、高さ2、角丸、トランジション */
            style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      {/* 質問 */}
      <div className="mb-6"> {/* 下マージン6 */}
        <h2 className="text-xl font-bold text-gray-800 mb-4"> {/* 文字xl、太字、グレー800、下マージン4 */}
          {question.question}
        </h2>
      </div>

      {/* 選択肢 */}
      <div className="space-y-3"> {/* 縦間隔3 */}
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => onAnswerSelect(index)}
            className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 hover:shadow-md ${ /* 全幅、パディング4、左寄せ、角丸、ボーダー2、トランジション、ホバー時影 */
              selectedAnswer === index
                ? 'border-blue-500 bg-blue-50 text-blue-700' /* 選択時：青ボーダー、青背景、青文字 */
                : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300' /* 未選択時：グレーボーダー、白背景、グレー文字、ホバー時グレー300ボーダー */
            }`}
          >
            <div className="flex items-center"> {/* フレックス、縦中央揃え */}
              <span className="w-8 h-8 rounded-full border-2 flex items-center justify-center mr-3 text-sm font-semibold"> {/* 幅8、高さ8、角丸、ボーダー2、フレックス中央揃え、右マージン3、小文字、太字 */}
                {String.fromCharCode(65 + index)} {/* A, B, C, D */}
              </span>
              <span className="flex-1"> {/* フレックス1 */}
                {option}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}; 