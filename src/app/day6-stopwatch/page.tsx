/**
 * Day 6: ストップウォッチアプリ
 * 
 * 機能概要:
 * - 高精度タイマー（10ms間隔で更新）
 * - 開始・停止・リセット機能
 * - MM:SS.CC形式での時間表示
 * - リアルタイム状態表示
 * 
 * 技術ポイント:
 * - useEffect + setInterval によるタイマー制御
 * - useRef による interval ID の管理
 * - クリーンアップ関数による メモリリーク防止
 */
'use client';

// React Hooks: 状態管理、副作用処理、参照管理
import { useState, useEffect, useRef } from 'react';
// 共通コンポーネント: ページヘッダー
import PageHeader from '../../components/common/PageHeader';
// ストップウォッチ専用UIコンポーネント
import { TimeDisplay, ControlButtons, StatusIndicator } from './ui';

export default function StopwatchPage() {
  // === 状態管理 ===
  const [time, setTime] = useState(0); // 経過時間（ミリ秒単位で管理）
  const [isRunning, setIsRunning] = useState(false); // タイマー実行状態（開始/停止）
  // useRef: setInterval のIDを保持（再レンダリングされても値を保持）
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // === タイマー制御ロジック ===
  // isRunning の変化を監視してタイマーを開始/停止
  useEffect(() => {
    if (isRunning) {
      // タイマー開始: 10ms間隔で時間を更新（高精度）
      intervalRef.current = setInterval(() => {
        setTime(prevTime => prevTime + 10); // 前の値に10ms追加
      }, 10);
    } else {
      // タイマー停止: interval をクリアして ID をリセット
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    // クリーンアップ関数: コンポーネントのアンマウント時やdeps変更時に実行
    // メモリリーク防止のため、必ずintervalをクリア
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]); // isRunning が変化した時のみ実行

  // === 時間フォーマット関数 ===
  // ミリ秒を MM:SS.CC 形式に変換
  const formatTime = (timeInMs: number) => {
    // 総秒数を計算（小数点以下切り捨て）
    const totalSeconds = Math.floor(timeInMs / 1000);
    // 分を計算（60秒で割った商）
    const minutes = Math.floor(totalSeconds / 60);
    // 秒を計算（60秒で割った余り）
    const seconds = totalSeconds % 60;
    // センチ秒を計算（ミリ秒の下2桁、1/100秒単位）
    const centiseconds = Math.floor((timeInMs % 1000) / 10);

    // ゼロパディングして2桁表示に統一
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}.${centiseconds.toString().padStart(2, '0')}`;
  };

  // === イベントハンドラー ===
  // 開始・停止ボタンのクリック処理
  const handleStartStop = () => {
    setIsRunning(!isRunning); // 現在の状態を反転
  };

  // リセットボタンのクリック処理
  const handleReset = () => {
    setIsRunning(false); // タイマーを停止
    setTime(0); // 時間を0にリセット
  };

  return (
    // コンテンツ幅制限コンテナ
    <div className="w-full max-w-md"> {/* 全幅, 最大幅md */}
      
      {/* ページタイトル・説明エリア */}
      <PageHeader
        icon="⏱️"
        title="ストップウォッチ"
        description="開始・停止・リセットができるタイマーアプリ"
        className="mb-8" // 下マージン8
      />

      {/* === ストップウォッチメイン機能エリア === */}
      <div className="bg-white rounded-2xl shadow-2xl p-8 text-center"> {/* 白背景, 大きな角丸, 大きな影, パディング8, 中央揃え */}
        
        {/* 時間表示コンポーネント */}
        <TimeDisplay 
          time={formatTime(time)} // フォーマット済み時間文字列
          label="分:秒.センチ秒" // 表示形式の説明
          size="xl" // 大きなサイズ
          className="mb-8" // 下マージン8
        />

        {/* 操作ボタンコンポーネント */}
        <ControlButtons 
          isRunning={isRunning} // 現在の実行状態
          onStartStop={handleStartStop} // 開始・停止処理
          onReset={handleReset} // リセット処理
          className="mb-6" // 下マージン6
        />

        {/* 状態表示コンポーネント */}
        <StatusIndicator 
          isRunning={isRunning} // 現在の実行状態
          className="mb-6" // 下マージン6
        />
      </div>
    </div>
  );
} 