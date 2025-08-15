import { MusicPlayer } from './components';

export default function Day39Page() {
  return (
    <div className="max-w-6xl mx-auto px-4 pb-28"> {/* 最大幅, 中央寄せ, 横余白, フッター分下余白 */}
      <div className="bg-white rounded-xl shadow p-6 mt-6"> {/* 白背景, 角丸, 影, 余白, 上余白 */}
        <MusicPlayer />
      </div>
    </div>
  );
}


