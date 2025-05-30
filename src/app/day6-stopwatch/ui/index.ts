/**
 * Day 6 ストップウォッチ UI コンポーネントのエクスポート
 * 
 * ストップウォッチアプリで使用する全てのUIコンポーネントを
 * 一箇所からまとめてエクスポートして、importを簡潔にする
 */

// 時間表示コンポーネント（MM:SS.CC形式での時間表示）
export { default as TimeDisplay } from './TimeDisplay';

// 操作ボタンコンポーネント（開始・停止・リセット）
export { default as ControlButtons } from './ControlButtons';

// 状態表示コンポーネント（動作中・停止中の視覚的表示）
export { default as StatusIndicator } from './StatusIndicator'; 