import React from 'react';
import { TypingStats } from '../types';
import StatsDisplay from './StatsDisplay';

interface ResultDisplayProps {
  stats: TypingStats; // 統計情報
  onRestart: () => void; // 再開始時のコールバック
  onNewText: () => void; // 新しいテキスト選択時のコールバック
  className?: string; // 追加クラス
}

export default function ResultDisplay({ stats, onRestart, onNewText, className = '' }: ResultDisplayProps) {
  // 評価を計算
  const evaluation = getEvaluation(stats);

  return (
    <div className={`bg-white rounded-xl shadow-lg border border-gray-200 p-6 ${className}`}> {/* 白背景, 角丸xl, 影lg, ボーダー, グレー200ボーダー, パディング6 */}
      {/* ヘッダー */}
      <div className="text-center mb-6"> {/* テキスト中央, 下マージン6 */}
        <div className="text-4xl mb-2">{evaluation.emoji}</div> {/* 文字サイズ4xl, 下マージン2 */}
        <h2 className="text-2xl font-bold text-gray-800 mb-2">タイピング完了！</h2> {/* 文字サイズ2xl, 太字, グレー800テキスト, 下マージン2 */}
        <p className="text-lg text-gray-600">{evaluation.message}</p> {/* 文字サイズlg, グレー600テキスト */}
      </div>

      {/* 統計情報 */}
      <div className="mb-6"> {/* 下マージン6 */}
        <h3 className="text-lg font-semibold text-gray-700 mb-4 text-center">結果詳細</h3> {/* 文字サイズlg, 太字, グレー700テキスト, 下マージン4, テキスト中央 */}
        <StatsDisplay stats={stats} />
      </div>

      {/* 詳細情報 */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6"> {/* グレー50背景, 角丸lg, パディング4, 下マージン6 */}
        <h4 className="text-md font-semibold text-gray-700 mb-3">詳細分析</h4> {/* 文字サイズmd, 太字, グレー700テキスト, 下マージン3 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm"> {/* グリッド1列(md以上で2列), ギャップ4, 文字サイズsm */}
          <div className="flex justify-between"> {/* Flexコンテナ, 横揃え両端 */}
            <span className="text-gray-600">正しい文字数:</span> {/* グレー600テキスト */}
            <span className="font-semibold text-green-600">{stats.correctChars}</span> {/* 太字, 緑600テキスト */}
          </div>
          <div className="flex justify-between"> {/* Flexコンテナ, 横揃え両端 */}
            <span className="text-gray-600">間違った文字数:</span> {/* グレー600テキスト */}
            <span className="font-semibold text-red-600">{stats.incorrectChars}</span> {/* 太字, 赤600テキスト */}
          </div>
          <div className="flex justify-between"> {/* Flexコンテナ, 横揃え両端 */}
            <span className="text-gray-600">総文字数:</span> {/* グレー600テキスト */}
            <span className="font-semibold text-blue-600">{stats.totalTyped}</span> {/* 太字, 青600テキスト */}
          </div>
          <div className="flex justify-between"> {/* Flexコンテナ, 横揃え両端 */}
            <span className="text-gray-600">所要時間:</span> {/* グレー600テキスト */}
            <span className="font-semibold text-purple-600">{formatTime(stats.timeElapsed)}</span> {/* 太字, 紫600テキスト */}
          </div>
        </div>
      </div>

      {/* WPMレベル表示 */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 mb-6"> {/* グラデーション青50から藍50, 角丸lg, パディング4, 下マージン6 */}
        <h4 className="text-md font-semibold text-gray-700 mb-2">WPMレベル</h4> {/* 文字サイズmd, 太字, グレー700テキスト, 下マージン2 */}
        <div className="flex items-center"> {/* Flexコンテナ, アイテム中央寄せ */}
          <div className="flex-1"> {/* フレックス1 */}
            <div className="text-lg font-bold text-indigo-600">{getWPMLevel(stats.wpm)}</div> {/* 文字サイズlg, 太字, 藍600テキスト */}
            <div className="text-sm text-gray-600">{getWPMDescription(stats.wpm)}</div> {/* 文字サイズsm, グレー600テキスト */}
          </div>
          <div className="text-2xl">{getWPMLevelEmoji(stats.wpm)}</div> {/* 文字サイズ2xl */}
        </div>
      </div>

      {/* アクションボタン */}
      <div className="flex flex-col sm:flex-row gap-3"> {/* Flexコンテナ(縦・sm以上で横), ギャップ3 */}
        <button
          onClick={onRestart}
          className="flex-1 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 font-semibold" // フレックス1, 横パディング6, 縦パディング3, 青500背景, 白テキスト, 角丸lg, ホバー時青600背景, フォーカス時アウトラインなし青500リング2, 色にトランジション, 太字
        >
          🔄 同じテキストで再挑戦
        </button>
        <button
          onClick={onNewText}
          className="flex-1 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors duration-200 font-semibold" // フレックス1, 横パディング6, 縦パディング3, 緑500背景, 白テキスト, 角丸lg, ホバー時緑600背景, フォーカス時アウトラインなし緑500リング2, 色にトランジション, 太字
        >
          ✨ 新しいテキストに挑戦
        </button>
      </div>
    </div>
  );
}

interface Evaluation {
  emoji: string;
  message: string;
}

function getEvaluation(stats: TypingStats): Evaluation {
  const { wpm, accuracy } = stats;

  if (accuracy >= 98 && wpm >= 60) {
    return { emoji: '🏆', message: '素晴らしい！完璧なタイピングです！' };
  } else if (accuracy >= 95 && wpm >= 50) {
    return { emoji: '🎉', message: 'とても良い結果です！' };
  } else if (accuracy >= 90 && wpm >= 40) {
    return { emoji: '👏', message: '良い結果です！' };
  } else if (accuracy >= 85 && wpm >= 30) {
    return { emoji: '👍', message: 'まずまずの結果です。' };
  } else if (accuracy >= 80) {
    return { emoji: '📚', message: 'もう少し練習が必要です。' };
  } else {
    return { emoji: '💪', message: 'まだまだ伸びしろがありますね！' };
  }
}

function getWPMLevel(wpm: number): string {
  if (wpm >= 70) return '上級者';
  if (wpm >= 50) return '中級者';
  if (wpm >= 30) return '初級者';
  if (wpm >= 15) return '練習中';
  return '初心者';
}

function getWPMDescription(wpm: number): string {
  if (wpm >= 70) return 'プロレベルの速度です！';
  if (wpm >= 50) return '十分実用的な速度です';
  if (wpm >= 30) return '基本的な速度をマスター';
  if (wpm >= 15) return 'もう少しで実用レベル';
  return 'まずは正確性を重視しましょう';
}

function getWPMLevelEmoji(wpm: number): string {
  if (wpm >= 70) return '🚀';
  if (wpm >= 50) return '⚡';
  if (wpm >= 30) return '🎯';
  if (wpm >= 15) return '📈';
  return '🌱';
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  if (minutes > 0) {
    return `${minutes}分${remainingSeconds}秒`;
  }
  return `${remainingSeconds}秒`;
}