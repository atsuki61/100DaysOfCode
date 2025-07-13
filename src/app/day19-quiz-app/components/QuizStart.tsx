interface QuizStartProps {
  categories: string[];
  onStart: (category: string) => void;
}

export const QuizStart: React.FC<QuizStartProps> = ({ categories, onStart }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl mx-auto text-center"> {/* 背景白、影付き、角丸、パディング8、最大幅2xl、中央寄せ、テキスト中央寄せ */}
      <div className="mb-8"> {/* 下マージン8 */}
        <h1 className="text-3xl font-bold text-gray-800 mb-4"> {/* 文字3xl、太字、グレー800、下マージン4 */}
          🎌 アニメクイズ 🎌
        </h1>
        <p className="text-lg text-gray-600 mb-6"> {/* 文字lg、グレー600、下マージン6 */}
          挑戦したいアニメのクイズを選んでください！
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4"> {/* 1列グリッド、md以上で3列、間隔4 */}
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onStart(category)}
            className="w-full bg-blue-600 text-white font-bold py-4 px-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-transform transform hover:scale-105"
            // 全幅、青背景、白文字、太字、縦横パディング、角丸、ホバー時背景色変更、フォーカス時リング表示、トランジション効果
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}; 