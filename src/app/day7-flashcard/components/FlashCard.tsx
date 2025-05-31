import { WordCard } from '../types';

interface FlashCardProps {
  word: WordCard;
  isRevealed: boolean;
  onCardClick: () => void;
}

export default function FlashCard({ word, isRevealed, onCardClick }: FlashCardProps) {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case '基礎の400語':
        return 'bg-green-100 text-green-800 border-green-200';
      case '頻出の300語':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case '必須の200語':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case '発展の100語':
        return 'bg-red-100 text-red-800 border-red-200';
      case '設問に出る単語・表現':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'パート1重要語':
        return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryDisplay = (category: string) => {
    switch (category) {
      case '基礎の400語':
        return '基礎';
      case '頻出の300語':
        return '頻出';
      case '必須の200語':
        return '必須';
      case '発展の100語':
        return '発展';
      case '設問に出る単語・表現':
        return '設問';
      case 'パート1重要語':
        return 'Part1';
      default:
        return 'その他';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'mastered':
        return '✅';
      case 'studying':
        return '📝';
      default:
        return '';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'mastered':
        return 'bg-green-500 text-white';
      case 'studying':
        return 'bg-orange-500 text-white';
      default:
        return 'bg-gray-400 text-white';
    }
  };

  return (
    <div 
      className="relative w-full max-w-md mx-auto cursor-pointer select-none" // 幅制限, 中央寄せ, クリック可能, テキスト選択不可
      onClick={onCardClick}
    >
      <div className="bg-white rounded-2xl shadow-2xl p-8 min-h-[400px] flex flex-col justify-center items-center text-center transition-all duration-300 hover:shadow-3xl border-2 border-gray-100"> {/* 白背景, 大角丸, 大影, パディング8, 最小高さ400px, フレックス縦配置, 中央寄せ, ホバー時影拡大 */}
        
        {/* カテゴリバッジ */}
        <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold border ${getCategoryColor(word.category)}`}> {/* 絶対位置, 右上, パディング, 角丸, 小文字, 太字, 枠線, 動的色 */}
          {getCategoryDisplay(word.category)}
        </div>

        {/* 学習ステータスバッジ */}
        {word.learningStatus !== 'not_studied' && (
          <div className={`absolute top-4 left-4 px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(word.learningStatus)}`}>
            {getStatusIcon(word.learningStatus)}
          </div>
        )}

        {/* カードクリック指示 */}
        <div className="absolute bottom-4 left-4 text-gray-400 text-sm"> {/* 絶対位置, 左下, 薄灰文字, 小文字 */}
          {isRevealed ? 'クリックで英単語に戻る' : 'クリックで意味を表示'}
        </div>

        {!isRevealed ? (
          // 英単語表示面
          <div className="space-y-6"> {/* 縦間隔6 */}
            <div className="text-5xl font-bold text-blue-600 mb-4"> {/* 超大文字, 太字, 青文字, 下マージン4 */}
              {word.word}
            </div>
            <div className="text-lg text-gray-600 font-mono"> {/* 大文字, 薄灰文字, 等幅フォント */}
              {word.pronunciation}
            </div>
            <div className="text-gray-500 text-sm"> {/* 薄灰文字, 小文字 */}
              タップして意味を確認
            </div>
          </div>
        ) : (
          // 意味表示面
          <div className="space-y-6"> {/* 縦間隔6 */}
            <div className="text-2xl font-bold text-gray-800 mb-2"> {/* 大文字, 太字, 濃灰文字, 下マージン2 */}
              {word.word}
            </div>
            <div className="text-lg text-gray-600 font-mono mb-4"> {/* 大文字, 薄灰文字, 等幅フォント, 下マージン4 */}
              {word.pronunciation}
            </div>
            <div className="text-3xl font-bold text-green-600 mb-6"> {/* 特大文字, 太字, 緑文字, 下マージン6 */}
              {word.meaning}
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-left"> {/* 薄灰背景, 角丸, パディング4, 左寄せ */}
              <div className="text-sm text-gray-500 mb-2">例文:</div> {/* 小文字, 薄灰文字, 下マージン2 */}
              <div className="text-gray-700 italic"> {/* 濃灰文字, 斜体 */}
                {word.example}
              </div>
            </div>
            <div className="text-gray-500 text-sm"> {/* 薄灰文字, 小文字 */}
              下のボタンで理解度を選択
            </div>
          </div>
        )}

        {/* カードフリップアニメーション用の視覚的効果 */}
        <div className={`absolute inset-0 rounded-2xl border-2 transition-all duration-300 pointer-events-none ${
          isRevealed ? 'border-green-300 shadow-green-100' : 'border-blue-300 shadow-blue-100'
        }`}></div> {/* 絶対位置, 全体覆う, 大角丸, 枠線2, アニメーション, ポインターイベント無効, 条件付き色 */}
      </div>
    </div>
  );
} 