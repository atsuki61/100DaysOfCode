interface QuizStartProps {
  onStart: () => void;
  totalQuestions: number;
}

export const QuizStart: React.FC<QuizStartProps> = ({ onStart, totalQuestions }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl mx-auto text-center"> {/* 背景白、影付き、角丸、パディング8、最大幅2xl、中央寄せ、テキスト中央寄せ */}
      <div className="mb-8"> {/* 下マージン8 */}
        <h1 className="text-3xl font-bold text-gray-800 mb-4"> {/* 文字3xl、太字、グレー800、下マージン4 */}
          🎌 アニメクイズ 🎌
        </h1>
        <p className="text-lg text-gray-600 mb-6"> {/* 文字lg、グレー600、下マージン6 */}
          人気アニメに関するクイズに挑戦してみませんか？
        </p>
      </div>

      <div className="bg-blue-50 rounded-lg p-6 mb-8"> {/* 青50背景、角丸、パディング6、下マージン8 */}
        <h2 className="text-xl font-semibold text-blue-800 mb-4"> {/* 文字xl、太字、青800、下マージン4 */}
          クイズの内容
        </h2>
        <div className="space-y-3 text-left"> {/* 縦間隔3、左寄せ */}
          <div className="flex items-center"> {/* フレックス、縦中央揃え */}
            <span className="text-blue-600 mr-3 text-lg">📝</span> {/* 青600、右マージン3、文字lg */}
            <span className="text-gray-700">全{totalQuestions}問の選択問題</span> {/* グレー700 */}
          </div>
          <div className="flex items-center"> {/* フレックス、縦中央揃え */}
            <span className="text-blue-600 mr-3 text-lg">🎯</span> {/* 青600、右マージン3、文字lg */}
            <span className="text-gray-700">人気アニメ作品からの出題</span> {/* グレー700 */}
          </div>
          <div className="flex items-center"> {/* フレックス、縦中央揃え */}
            <span className="text-blue-600 mr-3 text-lg">⏱️</span> {/* 青600、右マージン3、文字lg */}
            <span className="text-gray-700">制限時間なし（自分のペースで）</span> {/* グレー700 */}
          </div>
          <div className="flex items-center"> {/* フレックス、縦中央揃え */}
            <span className="text-blue-600 mr-3 text-lg">🏆</span> {/* 青600、右マージン3、文字lg */}
            <span className="text-gray-700">結果発表時に解説も表示</span> {/* グレー700 */}
          </div>
        </div>
      </div>

      <div className="bg-yellow-50 rounded-lg p-4 mb-8"> {/* 黄50背景、角丸、パディング4、下マージン8 */}
        <p className="text-yellow-800 text-sm"> {/* 黄800、小文字 */}
          💡 ヒント: 最近のアニメから定番の名作まで幅広く出題します。
          <br />
          どなたでも楽しめる内容になっています！
        </p>
      </div>

      <button
        onClick={onStart}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors duration-200 shadow-md hover:shadow-lg" /* 青500背景、ホバー時青600、白文字、太字、縦パディング4、横パディング8、角丸、文字lg、色トランジション、影md、ホバー時影lg */
      >
        クイズを始める
      </button>
    </div>
  );
}; 