'use client';

type ControlPanelProps = {
  score: number;
  isRunning: boolean;
  onStart: () => void;
  onTogglePause: () => void;
};

export default function ControlPanel({ score, isRunning, onStart, onTogglePause }: ControlPanelProps) {
  return (
    <div className="w-full md:w-72 space-y-4"> {/* 幅固定, 縦の間隔 */}
      <div className="bg-gray-50 border rounded-lg p-4"> {/* 薄灰背景, 枠線, 角丸, 余白 */}
        <p className="text-sm text-gray-600 mb-2">スコア</p> {/* 小文字, 灰色, 下余白 */}
        <p className="text-3xl font-bold">{score}</p> {/* 大文字, 太字 */}
      </div>
      <div className="flex gap-3"> {/* 横並び, 余白 */}
        <button
          onClick={onStart}
          className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors"
        >{/* 横パディング, 縦パディング, 角丸, 青背景, 白文字, ホバー色 */}
          スタート/リスタート
        </button>
        <button
          onClick={onTogglePause}
          className="px-4 py-2 rounded-md bg-gray-700 text-white hover:bg-gray-800 transition-colors"
        >{/* 横パディング, 縦パディング, 角丸, 濃灰背景, 白文字, ホバー色 */}
          {isRunning ? '一時停止' : '再開'}
        </button>
      </div>
      <ul className="text-sm text-gray-600 list-disc pl-5 space-y-1"> {/* 小文字, 灰色, 箇条書き, 左パディング, 行間 */}
        <li>矢印キー/WASDで操作</li>
        <li>壁 or 自分に当たるとゲームオーバー</li>
        <li>食べるほどスピードアップ</li>
      </ul>
    </div>
  );
}


