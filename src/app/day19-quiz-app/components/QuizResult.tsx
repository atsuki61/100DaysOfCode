import { QuizResult } from '../types';

interface QuizResultProps {
  result: QuizResult;
  onRestart: () => void;
}

export const QuizResultComponent: React.FC<QuizResultProps> = ({ result, onRestart }) => {
  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-600'; // 80%以上は緑
    if (percentage >= 60) return 'text-yellow-600'; // 60%以上は黄
    return 'text-red-600'; // 60%未満は赤
  };

  const getScoreMessage = (percentage: number) => {
    if (percentage >= 90) return 'パーフェクト！アニメ博士ですね！🎉';
    if (percentage >= 80) return 'すばらしい！アニメの知識が豊富ですね！✨';
    if (percentage >= 70) return 'よくできました！アニメ好きですね！👍';
    if (percentage >= 60) return 'まずまずです！もう少し頑張りましょう！💪';
    if (percentage >= 50) return 'もう少し！アニメをもっと見てみましょう！📺';
    return 'これから一緒にアニメを楽しんでいきましょう！🌟';
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto"> {/* 背景白、影付き、角丸、パディング6、最大幅2xl、中央寄せ */}
      <div className="text-center mb-6"> {/* 中央寄せ、下マージン6 */}
        <h2 className="text-2xl font-bold text-gray-800 mb-4"> {/* 文字2xl、太字、グレー800、下マージン4 */}
          クイズ結果
        </h2>
        
        {/* スコア表示 */}
        <div className="bg-gray-50 rounded-lg p-6 mb-6"> {/* グレー50背景、角丸、パディング6、下マージン6 */}
          <div className={`text-4xl font-bold mb-2 ${getScoreColor(result.percentage)}`}> {/* 文字4xl、太字、下マージン2、動的色 */}
            {result.score} / {result.totalQuestions}
          </div>
          <div className={`text-xl font-semibold mb-3 ${getScoreColor(result.percentage)}`}> {/* 文字xl、太字、下マージン3、動的色 */}
            {result.percentage}%
          </div>
          <p className="text-gray-700 text-lg"> {/* グレー700、文字lg */}
            {getScoreMessage(result.percentage)}
          </p>
        </div>
      </div>

      {/* 詳細結果 */}
      <div className="mb-6"> {/* 下マージン6 */}
        <h3 className="text-lg font-semibold text-gray-800 mb-4"> {/* 文字lg、太字、グレー800、下マージン4 */}
          詳細結果
        </h3>
        <div className="space-y-4"> {/* 縦間隔4 */}
          {result.answeredQuestions.map((answer, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border-l-4 ${ /* パディング4、角丸、左ボーダー4 */
                answer.isCorrect
                  ? 'bg-green-50 border-green-500' /* 正解：緑50背景、緑500ボーダー */
                  : 'bg-red-50 border-red-500' /* 不正解：赤50背景、赤500ボーダー */
              }`}
            >
              <div className="flex items-start justify-between"> {/* フレックス、上寄せ、両端寄せ */}
                <div className="flex-1"> {/* フレックス1 */}
                  <p className="font-semibold text-gray-800 mb-2"> {/* 太字、グレー800、下マージン2 */}
                    問題 {index + 1}: {answer.question.question}
                  </p>
                  <p className="text-sm text-gray-600 mb-1"> {/* 小文字、グレー600、下マージン1 */}
                    あなたの回答: {answer.question.options[answer.selectedAnswer]}
                  </p>
                  <p className="text-sm text-gray-600 mb-2"> {/* 小文字、グレー600、下マージン2 */}
                    正解: {answer.question.options[answer.question.correctAnswer]}
                  </p>
                  {answer.question.explanation && (
                    <p className="text-sm text-gray-500 italic"> {/* 小文字、グレー500、斜体 */}
                      解説: {answer.question.explanation}
                    </p>
                  )}
                </div>
                <div className={`ml-4 text-2xl ${ /* 左マージン4、文字2xl */
                  answer.isCorrect ? 'text-green-500' : 'text-red-500' /* 正解：緑500、不正解：赤500 */
                }`}>
                  {answer.isCorrect ? '✓' : '✗'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 再挑戦ボタン */}
      <div className="text-center"> {/* 中央寄せ */}
        <button
          onClick={onRestart}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200" /* 青500背景、ホバー時青600、白文字、太字、縦パディング3、横パディング6、角丸、色トランジション */
        >
          もう一度挑戦する
        </button>
      </div>
    </div>
  );
}; 