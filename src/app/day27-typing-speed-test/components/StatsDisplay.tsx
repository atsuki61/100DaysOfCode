import React from 'react';
import { TypingStats } from '../types';

interface StatsDisplayProps {
  stats: TypingStats; // 統計情報
  isLive?: boolean; // リアルタイム表示かどうか
  className?: string; // 追加クラス
}

export default function StatsDisplay({ stats, isLive = false, className = '' }: StatsDisplayProps) {
  const minutes = Math.floor(stats.timeElapsed / 60);
  const seconds = stats.timeElapsed % 60;
  const timeStr = minutes > 0 ? `${minutes}:${seconds.toString().padStart(2, '0')}` : `${seconds}s`;

  return (
    <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 ${className}`}> {/* グリッド2列(md以上で4列), ギャップ4 */}
      <StatCard
        title="時間"
        value={timeStr}
        icon="⏱️"
        color="blue"
        isAnimated={isLive}
      />
      <StatCard
        title="WPM"
        value={stats.wpm.toString()}
        icon="⚡"
        color="green"
        isAnimated={isLive}
      />
      <StatCard
        title="正確性"
        value={`${stats.accuracy}%`}
        icon="🎯"
        color={stats.accuracy >= 95 ? 'green' : stats.accuracy >= 80 ? 'yellow' : 'red'}
        isAnimated={isLive}
      />
      <StatCard
        title="文字数"
        value={`${stats.correctChars}/${stats.totalTyped}`}
        icon="📝"
        color="purple"
        isAnimated={isLive}
      />
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: string;
  icon: string;
  color: 'blue' | 'green' | 'yellow' | 'red' | 'purple';
  isAnimated?: boolean;
}

function StatCard({ title, value, icon, color, isAnimated = false }: StatCardProps) {
  const colorClasses = {
    blue: 'bg-blue-50 border-blue-200 text-blue-800',
    green: 'bg-green-50 border-green-200 text-green-800',
    yellow: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    red: 'bg-red-50 border-red-200 text-red-800',
    purple: 'bg-purple-50 border-purple-200 text-purple-800',
  };

  return (
    <div 
      className={`
        p-4 rounded-lg border-2 text-center transition-all duration-300
        ${colorClasses[color]}
        ${isAnimated ? 'animate-pulse' : ''}
        hover:shadow-md hover:scale-105
      `} // パディング4, 角丸lg, ボーダー2, テキスト中央, 全プロパティにトランジション, ホバー時影md拡大
    >
      <div className="text-2xl mb-1">{icon}</div> {/* 文字サイズ2xl, 下マージン1 */}
      <div className="text-xs font-medium uppercase tracking-wide opacity-75 mb-1"> {/* 文字サイズxs, 太字, 大文字, 文字間隔wide, 不透明度75, 下マージン1 */}
        {title}
      </div>
      <div className="text-lg font-bold"> {/* 文字サイズlg, 太字 */}
        {value}
      </div>
    </div>
  );
}