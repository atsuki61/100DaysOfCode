import React from 'react';
import { Song } from '../types';

interface MusicCardProps {
  song: Song;
}

const MusicCard: React.FC<MusicCardProps> = ({ song }) => {
  return (
    <div className="flex items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"> {/* フレックスボックス, 中央揃え, パディング4, 白背景, 角丸, 影, ホバー時の影拡大, 影変化のトランジション */}
      <img 
        src={song.artworkUrl100} 
        alt={song.trackName} 
        className="w-20 h-20 rounded-lg mr-4 flex-shrink-0" // 幅20, 高さ20, 角丸, 右マージン4, 縮小しない
      />
      <div className="flex-1 min-w-0"> {/* 幅を可変に, 最小幅0 */}
        <h3 className="font-bold text-lg mb-1 truncate">{song.trackName}</h3> {/* 太字, 大きい文字, 下マージン1, 長い文字は省略 */}
        <p className="text-gray-600 mb-2 truncate">{song.artistName}</p> {/* グレー文字, 下マージン2, 長い文字は省略 */}
        {song.previewUrl && (
          <div className="mt-2"> {/* 上マージン2 */}
            <audio 
              controls 
              src={song.previewUrl}
              className="w-full max-w-xs" // 幅100%, 最大幅xs
            >
              お使いのブラウザはオーディオ要素をサポートしていません。
            </audio>
          </div>
        )}
      </div>
    </div>
  );
};

export default MusicCard; 