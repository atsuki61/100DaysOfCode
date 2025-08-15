'use client';

import { useEffect, useRef, useState } from 'react';

type Track = {
  title: string;
  artist: string;
  src: string;
  duration?: number;
};

const DEMO_PLAYLIST: Track[] = [
  { title: 'Demo Track 1', artist: 'Unknown', src: '/audio/demo1.mp3' },
  { title: 'Demo Track 2', artist: 'Unknown', src: '/audio/demo2.mp3' },
  { title: 'Demo Track 3', artist: 'Unknown', src: '/audio/demo3.mp3' },
];

function formatTime(sec: number): string {
  if (!Number.isFinite(sec)) return '0:00';
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playlist] = useState<Track[]>(DEMO_PLAYLIST);
  const [index, setIndex] = useState(0);
  const current = playlist[index];
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0); // 0..1
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    const onLoaded = () => setDuration(el.duration || 0);
    const onTime = () => {
      setCurrentTime(el.currentTime || 0);
      if (el.duration) setProgress(el.currentTime / el.duration);
    };
    const onEnd = () => setIndex((i) => (i + 1) % playlist.length);
    el.addEventListener('loadedmetadata', onLoaded);
    el.addEventListener('timeupdate', onTime);
    el.addEventListener('ended', onEnd);
    return () => {
      el.removeEventListener('loadedmetadata', onLoaded);
      el.removeEventListener('timeupdate', onTime);
      el.removeEventListener('ended', onEnd);
    };
  }, [index, playlist.length]);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    if (isPlaying) el.play().catch(() => setIsPlaying(false));
    else el.pause();
  }, [isPlaying, index]);

  function toggle() {
    setIsPlaying((p) => !p);
  }

  function seek(p: number) {
    const el = audioRef.current;
    if (!el || !Number.isFinite(el.duration)) return;
    el.currentTime = Math.max(0, Math.min(1, p)) * el.duration;
  }

  function prev() {
    setIndex((i) => (i - 1 + playlist.length) % playlist.length);
    setIsPlaying(true);
  }
  function next() {
    setIndex((i) => (i + 1) % playlist.length);
    setIsPlaying(true);
  }

  return (
    <div className="max-w-xl mx-auto"> {/* 最大幅, 中央寄せ */}
      <div className="bg-white rounded-xl border shadow p-4 space-y-4"> {/* 白背景, 角丸, 枠線, 影, 余白, 縦間隔 */}
        <div>
          <div className="text-sm text-gray-500">現在の曲</div> {/* 小さめ, 灰色 */}
          <div className="text-lg font-semibold">{current.title}</div> {/* 大, 太字 */}
          <div className="text-sm text-gray-600">{current.artist}</div> {/* 小, 灰色 */}
        </div>

        <div className="flex items-center gap-3"> {/* 横並び, 間隔 */}
          <button onClick={prev} className="px-3 py-2 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors"> {/* 小ボタン */}
            ◀
          </button>
          <button onClick={toggle} className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors"> {/* 再生/一時停止 */}
            {isPlaying ? '一時停止' : '再生'}
          </button>
          <button onClick={next} className="px-3 py-2 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors"> {/* 次へ */}
            ▶
          </button>
        </div>

        <div>
          <input
            type="range"
            min={0}
            max={1000}
            value={Math.round(progress * 1000)}
            onChange={(e) => seek(Number(e.target.value) / 1000)}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-600"> {/* 両端揃え, 小さめ, 灰色 */}
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        <audio ref={audioRef} src={current.src} preload="metadata" />
      </div>
    </div>
  );
}


