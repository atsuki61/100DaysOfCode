'use client';
import { useState } from 'react'; // 状態管理に使う useState を読み込む
import Button from '../../../components/Button'; // 共通のButtonコンポーネントをインポート

//コンポーネント本体を定義
export default function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => setCount(prevCount => prevCount + 1);
  const decrement = () => setCount(prevCount => prevCount - 1);
  const reset = () => setCount(0); // リセット関数を追加

  return (
    // --- カウンター表示とボタンをまとめる白いカード風の箱 ---
    // bg-white dark:bg-gray-800: 背景色 (ライトモード: 白, ダークモード: 少し明るいグレー)
    // p-8 sm:p-12: 内側の余白 (通常時は1.5rem, smサイズ以上の画面では2rem)
    // rounded-xl: 角を大きく丸めます (extra large)
    // shadow-xl: 大きな影をつけて立体的に見せます
    // text-center: この要素内のテキストコンテンツを中央揃え
    <div className="bg-white dark:bg-gray-800 p-8 sm:p-12 rounded-xl shadow-xl text-center">
      {/* --- カウンターの数値を表示する部分 --- */}
      {/* mb-10: 下方向へのマージン (2rem)。要素間のスペース作りのため。 */}
      <div className="mb-10">
        {/* --- カウンターの数値そのもの --- */}
        {/* text-9xl: 文字のサイズを非常に大きくします。 */}
        {/* font-bold: 文字を太字にします。 */}
        {/* text-slate-700 dark:text-slate-200: 文字色を指定します。 */}
        <span className="text-9xl font-bold text-slate-700 dark:text-slate-200">
          {count}
        </span>
        {/* --- 「現在のカウント」という補助テキスト --- */}
        {/* text-base: 文字サイズを小さくします。 */}
        {/* text-slate-500 dark:text-slate-400: 文字色を少し薄めにします。 */}
        {/* mt-3: 上方向へのマージン (0.75rem)。数値との間隔調整。 */}
        <p className="text-base text-slate-500 dark:text-slate-400 mt-3">現在のカウント</p>
      </div>

      {/* --- ボタンをまとめる箱 --- */}
      {/* flex: ボタンを横並びにするためにFlexboxを使います (smサイズ以上の画面で)。 */}
      {/* flex-col: スマートフォンなどの小さい画面ではボタンを縦に並べます (これがデフォルト)。 */}
      {/* sm:flex-row: smサイズ (640px) 以上の画面では、'flex-col' を上書きして横並び (row) にします。*/}
      {/* space-y-5: 縦並びの時 (flex-col の時) に、ボタンの間に縦方向のスペースを設けます (1rem)。*/}
      {/* sm:space-y-0: 横並びになるsmサイズ以上では、縦方向のスペースを0にします。 */}
      {/* sm:space-x-5: 横並びの時 (sm:flex-row の時) に、ボタンの間に横方向のスペースを設けます (1rem)。 */}
      <div className="flex flex-col sm:flex-row space-y-5 sm:space-y-0 sm:space-x-5">
        {/* --- デクリメントボタン --- */}
        {/* w-full sm:w-auto: モバイルでは幅いっぱい、sm以上では自動幅 */}
        <Button onClick={decrement} variant="secondary" size="xl" className="w-full sm:w-auto">
          減らす (-)
        </Button>

        {/* --- インクリメントボタン --- */}
        <Button onClick={increment} variant="default" size="xl" className="w-full sm:w-auto">
          増やす (+)
        </Button>
      </div>
      {/* リセットボタンを追加、上マージン (mt-5) */}
      <Button onClick={reset} variant="outline" size="lg" className="w-full sm:w-auto mt-5">
        リセット
      </Button>
    </div>
  );
}
