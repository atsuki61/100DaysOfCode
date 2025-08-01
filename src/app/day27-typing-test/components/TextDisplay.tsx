import React from 'react';
import { CharStatus } from '../types';

interface TextDisplayProps {
  charStatuses: CharStatus[]; // 文字ごとの状態
  className?: string; // 追加クラス
}

export default function TextDisplay({ charStatuses, className = '' }: TextDisplayProps) {
  return (
    <div className={`p-6 bg-white rounded-lg shadow-md border-2 border-gray-100 ${className}`}> {/* パディング6, 白背景, 角丸lg, 影md, ボーダー2, グレー100ボーダー */}
      <h3 className="text-lg font-semibold mb-4 text-gray-700">課題文章</h3> {/* 文字サイズlg, 太字, 下マージン4, グレー700テキスト */}
      <div className="text-xl leading-relaxed font-mono break-words"> {/* 文字サイズxl, 行間ゆったり, 等幅フォント, 改行可能 */}
        {charStatuses.map((charStatus, index) => (
          <span
            key={index}
            className={`
              transition-all duration-200 ease-in-out
              ${getCharClassName(charStatus.status)}
              ${charStatus.char === ' ' ? 'whitespace-pre' : ''}
            `}
          >
            {charStatus.char === ' ' ? '·' : charStatus.char}
          </span>
        ))}
      </div>
      
      {/* 進捗バー */}
      <div className="mt-4 w-full bg-gray-200 rounded-full h-2"> {/* 上マージン4, 横幅いっぱい, グレー200背景, 角丸完全, 高さ2 */}
        <div 
          className="bg-blue-500 h-2 rounded-full transition-all duration-300 ease-out" // 青500背景, 高さ2, 角丸完全, 全プロパティにトランジション
          style={{ 
            width: `${(charStatuses.filter(cs => cs.status === 'correct' || cs.status === 'incorrect').length / charStatuses.length) * 100}%` 
          }}
        />
      </div>
    </div>
  );
}

/**
 * 文字の状態に応じたクラス名を取得
 * @param status 文字の状態
 * @returns クラス名
 */
function getCharClassName(status: CharStatus['status']): string {
  switch (status) {
    case 'correct':
      return 'bg-green-100 text-green-800 border-b-2 border-green-400'; // 緑100背景, 緑800テキスト, 下ボーダー2, 緑400ボーダー
    case 'incorrect':
      return 'bg-red-100 text-red-800 border-b-2 border-red-400 animate-pulse'; // 赤100背景, 赤800テキスト, 下ボーダー2, 赤400ボーダー, パルスアニメーション
    case 'current':
      return 'bg-yellow-200 text-yellow-900 border-b-2 border-yellow-500 animate-pulse'; // 黄200背景, 黄900テキスト, 下ボーダー2, 黄500ボーダー, パルスアニメーション
    case 'pending':
    default:
      return 'text-gray-600'; // グレー600テキスト
  }
}