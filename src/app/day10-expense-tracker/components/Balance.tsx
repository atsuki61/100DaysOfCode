import React from 'react';
import { Transaction } from '../types';

interface BalanceProps {
  transactions: Transaction[];
}

const Balance: React.FC<BalanceProps> = ({ transactions }) => {// 残高コンポーネント
  const income = transactions // 収入額を計算
    .filter(t => t.type === 'income') // 収入のみを抽出
    .reduce((acc, t) => acc + t.amount, 0); // 収入額を合計

  const expense = transactions // 支出額を計算
    .filter(t => t.type === 'expense') // 支出のみを抽出
    .reduce((acc, t) => acc + t.amount, 0); // 支出額を合計

  const total = income - expense; // 残高を計算

  return (
    <div className="w-full p-4 bg-gray-800/60 backdrop-blur-sm rounded-xl border border-cyan-500/30 shadow-lg shadow-cyan-500/20"> {/* コンテナ: ネオン風背景 */}
      <h2 className="text-lg font-bold text-center mb-3 text-white">残高</h2> {/* 見出し: 白文字 */}
      <div className="text-2xl font-bold text-center mb-4 text-cyan-400">¥{total.toLocaleString()}</div> {/* 残高表示: ネオンシアン */}
      <div className="flex justify-around text-center"> {/* コンテナ: Flexbox、要素を均等配置、中央寄せ */}
        <div className="flex-1 border-r border-gray-600 pr-4"> {/* コンテナ: フレックス1、右ボーダー、右パディング */}
          <h3 className="text-sm font-semibold text-green-400 mb-1">収入</h3> {/* 収入見出し: ネオングリーン */}
          <p className="text-lg font-bold text-green-400 drop-shadow-lg drop-shadow-green-500/50">
            +¥{income.toLocaleString()}
          </p> {/* 収入額表示: ネオングリーン、光る効果 */}
        </div>
        <div className="flex-1 pl-4"> {/* コンテナ: フレックス1、左パディング */}
          <h3 className="text-sm font-semibold text-pink-400 mb-1">支出</h3> {/* 支出見出し: ネオンピンク */}
          <p className="text-lg font-bold text-pink-400 drop-shadow-lg drop-shadow-pink-500/50">
            -¥{expense.toLocaleString()}
          </p> {/* 支出額表示: ネオンピンク、光る効果 */}
        </div>
      </div>
    </div>
  );
};

export default Balance; 