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
    <div className="w-full p-4 bg-gray-50 rounded-lg border"> {/* コンテナ: 幅全快、パディング4、グレー背景、角丸、ボーダー */}
      <h2 className="text-lg font-bold text-center mb-3">残高</h2> {/* 見出し: 大文字、太字、中央寄せ、下マージン3 */}
      <div className="text-2xl font-bold text-center mb-4">¥{total.toLocaleString()}</div> {/* 残高表示、3桁区切り */}
      <div className="flex justify-around text-center"> {/* コンテナ: Flexbox、要素を均等配置、中央寄せ */}
        <div className="flex-1 border-r border-gray-200 pr-4"> {/* コンテナ: フレックス1、右ボーダー、右パディング */}
          <h3 className="text-sm font-semibold text-green-600 mb-1">収入</h3> {/* 収入見出し: 小文字、太字、緑色 */}
          <p className="text-lg font-bold text-green-500">
            +¥{income.toLocaleString()}
          </p> {/* 収入額表示、3桁区切り */}
        </div>
        <div className="flex-1 pl-4"> {/* コンテナ: フレックス1、左パディング */}
          <h3 className="text-sm font-semibold text-red-600 mb-1">支出</h3> {/* 支出見出し: 小文字、太字、赤色 */}
          <p className="text-lg font-bold text-red-500">
            -¥{expense.toLocaleString()}
          </p> {/* 支出額表示、3桁区切り */}
        </div>
      </div>
    </div>
  );
};

export default Balance; 